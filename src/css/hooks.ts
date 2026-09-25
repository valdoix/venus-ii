// ── Stable DOM hooks ─────────────────────────────────────────────────────────
// Production Lumiverse CSS uses HASHED module class names (e.g. ._card_ab12), so
// Venus must NEVER target bare .card / .name. These are the stable, unhashed
// hooks the app (and the Vellum/Venus packs) expose. This file is the single
// place to fix if the app changes an attribute name.
//
// Verified in source (MinimalMessageDefault.tsx / BubbleMessageDefault.tsx):
//   [data-component="MinimalMessage"|"BubbleMessage"|"MessageContent"]  — set by
//     the message renderers; the same seam the .lumitheme packs target.
//   [data-part="user"|"character"|"streaming"]  — the user/character/streaming
//     discriminator on the card root (NOT data-is-user, which does not exist).
//   [class*="avatar" i]  — loose substring match on the hashed avatar class
//     (the trick the Vellum packs already use in production).

export const MINIMAL = '[data-component="MinimalMessage"]'
export const BUBBLE = '[data-component="BubbleMessage"]'
export const CARD = '[data-component="MinimalMessage"], [data-component="BubbleMessage"]'
export const CONTENT = '[data-component="MessageContent"]'

// Inner hashed sub-elements (substring match, case-insensitive)
export const AVATAR = '[class*="_avatar_" i]:not([class*="_avatarFallback_" i])'
export const AVATAR_BG = '[class*="avatarBg" i]'
export const NAME = '[class*="name" i]'
export const BUBBLE_INNER = '[class*="_bubble_" i]'
export const HEADER = '[class*="header" i]'
export const CONTENT_INNER = '[class*="content" i]'

// user / character discriminators on the card root — CORRECT attribute
export const USER = '[data-part="user"]'
export const CHAR = ':is([data-part="character"],[data-part="streaming"])'
