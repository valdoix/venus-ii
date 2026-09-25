const MESSAGE_CONTENT = '[data-component="MessageContent"]'
const SKIP_SMART_QUOTES = 'code,pre,kbd,samp,script,style,textarea,[contenteditable="true"],[data-venus2-smart-quotes="off"]'
const OPENING_CONTEXT = /[\s\u00a0([{<\u2014\u2013]/u
const CLOSING_CONTEXT = /[\s\u00a0)\]}>.,!?;:\u2014\u2013]/u

export interface CurledText {
  text: string
  lastCharacter: string
}

/**
 * Curves only straight double quotation marks. The preceding source character
 * makes the conversion stable when a quotation is split across inline markup.
 */
export function curlDoubleQuotes(value: string, previousCharacter = ''): CurledText {
  let text = ''
  let previous = previousCharacter
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index]
    const next = value[index + 1] ?? ''
    const opens = (!previous || OPENING_CONTEXT.test(previous)) && !!next && !CLOSING_CONTEXT.test(next)
    text += character === '"' ? (opens ? '\u201c' : '\u201d') : character
    previous = character
  }
  return { text, lastCharacter: previous }
}

interface TextRecord {
  source: string
  rendered: string
}

/** Keeps the transformation display-only and reversible across virtualized messages. */
export function createSmartQuoteController(doc: Document = document) {
  const records = new WeakMap<Text, TextRecord>()
  const tracked = new Set<Text>()
  let syncScheduled = false

  const sourceFor = (textNode: Text) => {
    const current = textNode.data
    const record = records.get(textNode)
    if (!record) return current
    if (current === record.rendered || current === record.source) return record.source
    // Streaming renderers may append to the text currently visible in the DOM.
    // Recover only curly characters that VENUS generated at the same position;
    // curly punctuation that existed in the original message remains untouched.
    const recovered = [...current]
    const source = [...record.source]
    const rendered = [...record.rendered]
    const limit = Math.min(recovered.length, source.length, rendered.length)
    for (let index = 0; index < limit; index += 1) {
      if (source[index] === '"' && (rendered[index] === '\u201c' || rendered[index] === '\u201d') && recovered[index] === rendered[index]) recovered[index] = '"'
    }
    return recovered.join('')
  }

  const write = (textNode: Text, source: string, rendered: string) => {
    records.set(textNode, { source, rendered })
    tracked.add(textNode)
    if (textNode.data !== rendered) textNode.data = rendered
  }

  const restore = (textNode: Text) => {
    const record = records.get(textNode)
    if (!record) return
    const source = sourceFor(textNode)
    write(textNode, source, source)
  }

  const prune = () => {
    for (const textNode of tracked) {
      if (!textNode.isConnected) tracked.delete(textNode)
    }
  }

  const curl = (content: Element) => {
    const walker = doc.createTreeWalker(content, NodeFilter.SHOW_TEXT)
    let previous = ''
    let current: Node | null
    while ((current = walker.nextNode())) {
      const textNode = current as Text
      const source = sourceFor(textNode)
      if (textNode.parentElement?.closest(SKIP_SMART_QUOTES)) {
        restore(textNode)
        if (source) previous = source[source.length - 1] ?? previous
        continue
      }
      const curled = curlDoubleQuotes(source, previous)
      write(textNode, source, curled.text)
      if (source) previous = curled.lastCharacter
    }
  }

  // Message contents touched since the last pass. A full pass runs when curling is switched on.
  const dirty = new Set<Element>()
  let fullPass = true
  let applied = false

  const noteMutation = (record: MutationRecord): boolean => {
    const target = record.target instanceof Element ? record.target : record.target.parentElement
    const owner = target?.closest(MESSAGE_CONTENT)
    if (owner) { dirty.add(owner); return true }
    let found = false
    for (const node of record.addedNodes) {
      if (!(node instanceof Element)) continue
      if (node.matches(MESSAGE_CONTENT)) { dirty.add(node); found = true }
      for (const content of node.querySelectorAll(MESSAGE_CONTENT)) { dirty.add(content); found = true }
    }
    return found
  }

  const performSync = (enabled: boolean) => {
    prune()
    if (!enabled) {
      if (applied) for (const textNode of tracked) restore(textNode)
      applied = false; fullPass = true; dirty.clear()
      return
    }
    const targets = fullPass || !applied ? Array.from(doc.querySelectorAll(MESSAGE_CONTENT)) : [...dirty]
    dirty.clear(); fullPass = false; applied = true
    for (const content of targets) if (content.isConnected) curl(content)
  }

  let pendingEnabled = false
  const sync = (enabled: boolean) => {
    pendingEnabled = enabled
    if (syncScheduled) return
    // Nothing to do while curling stays off and nothing was ever curled.
    if (!enabled && !applied) { dirty.clear(); return }
    syncScheduled = true
    requestAnimationFrame(() => { syncScheduled = false; performSync(pendingEnabled) })
  }

  const destroy = () => {
    for (const textNode of tracked) restore(textNode)
    tracked.clear()
  }

  return { sync, noteMutation, destroy }
}
