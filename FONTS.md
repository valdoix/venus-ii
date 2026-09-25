# Bundled fonts

VENUS embeds the Latin subset of the following families in `src/fonts/data.generated.ts` (and so in `dist/frontend.js`). All of them are published on Google Fonts under the [SIL Open Font License 1.1](https://openfontlicense.org). Each file keeps its original name table, which carries the copyright notice, the reserved font names and the license. The fonts are unmodified apart from Google's Latin subsetting. They are not sold separately.

Alegreya, Alegreya SC, Archivo Black, Archivo Narrow, Atkinson Hyperlegible, Big Shoulders Text, Bodoni Moda, Chakra Petch, Cinzel, Cinzel Decorative, Cormorant Garamond, Courier Prime, Crimson Pro, DM Mono, DM Sans, DM Serif Display, EB Garamond, Erica One, Figtree, Fragment Mono, Fraunces, IBM Plex Mono, Instrument Sans, Italiana, Kaisei Decol, Karla, Libre Baskerville, Limelight, Literata, Lora, Manrope, Marcellus, Marcellus SC, Metamorphous, Monoton, Noto Sans, Orbitron, Outfit, Playfair Display, Poiret One, Press Start 2P, Righteous, Rubik Mono One, Sawarabi Mincho, Source Serif 4, Space Grotesk, Space Mono, Spectral, Stardos Stencil, Syne, Tenor Sans, UnifrakturMaguntia, Uncial Antiqua, VT323, Work Sans, Yatra One, Young Serif, Zen Kaku Gothic Antique.

The copyright holders are listed on each family's page at `https://fonts.google.com/specimen/<Family+Name>`.

To change the set, edit `FONT_FAMILIES` in `src/fonts/catalog.ts` and run `bun scripts/bundle-fonts.ts`.
