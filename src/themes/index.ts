export type { VenusThemeFamily, VenusSkin, VenusPanelInterior } from './types'
import { FOUNDING_THEMES } from './founding'
import { ATLAS_REALM_THEMES } from './atlas-realms'
import { ATLAS_FUTURE_THEMES } from './atlas-futures'
import { TEN_WORLD_THEMES } from './ten-worlds'
import { PLAYHOUSE_THEMES } from './playhouse'

/** The founding nine, the eighteen-world atlas, the ten worlds, and the Playhouse expansion. */
export const VENUS_THEMES = [...FOUNDING_THEMES, ...ATLAS_REALM_THEMES, ...ATLAS_FUTURE_THEMES, ...TEN_WORLD_THEMES, ...PLAYHOUSE_THEMES]
