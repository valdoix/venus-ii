import { expect, test } from 'bun:test'
import { curlDoubleQuotes } from './smart-quotes'

test('curves straight double quotes using prose context', () => {
  expect(curlDoubleQuotes('He said "Hello." Then "Goodbye."').text).toBe('He said “Hello.” Then “Goodbye.”')
  expect(curlDoubleQuotes('"One" and "two"').text).toBe('“One” and “two”')
  expect(curlDoubleQuotes('She cried "Wait—"').text).toBe('She cried “Wait—”')
})

test('preserves existing typographic quotes and non-quote punctuation', () => {
  expect(curlDoubleQuotes('Already “curly”; apostrophe\'s unchanged.').text).toBe('Already “curly”; apostrophe\'s unchanged.')
})

test('keeps quotation context across inline text fragments', () => {
  const first = curlDoubleQuotes('She called it "very')
  const second = curlDoubleQuotes(' important" today.', first.lastCharacter)
  expect(first.text + second.text).toBe('She called it “very important” today.')
})
