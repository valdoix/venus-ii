import type { VenusThemeFamily } from './types'
import { a, board, BOARD, ease, fonts, landmark, motion as kitMotion, scenery, sheen, skin, studs, svg, world, type MotionSpec } from './kit'

/**
 * The founding nine, rebuilt: each world paints dedicated dark and light artwork from its own ink,
 * with authored wing scenes and a moving object inside every stationary frame.
 */
const motion = (id: string, m: MotionSpec) => kitMotion('found', id, m)
const loop = (n: number, step: number, draw: (i: number) => string) => Array.from({ length: n }, (_, i) => draw(i * step)).join('')

/* ───────────── The Coronation Machine ───────────── */
interface CrownInk { deep: string; enamel: string; gold: string; ermine: string; ruby: string; steel: string; line: string }
const coronation = world<CrownInk>('coronation-machine', 'The Coronation Machine', 'An imperial crown works: ultramarine enamel, ermine mantles, and a conveyor feeding crowns into the royal press.', ['royal','industrial','crown','ermine','enamel','ultramarine','gold','factory'],
  { skin: skin('#0b1440','#131f55','#1c2b6e','#f7f1e3','#b9bfdc','#f4c542','#e0304f'), ink: { deep: '#070d2a', enamel: '#1f3a9e', gold: '#f4c542', ermine: '#f5efe6', ruby: '#e0304f', steel: '#8e9bc6', line: '#0a0f24' } },
  { skin: skin('#f7f2e8','#fffdf8','#ebe3d2','#17204d','#5b6285','#1f3a9e','#b7860b'), ink: { deep: '#dcd3c0', enamel: '#c7d3f7', gold: '#c8960f', ermine: '#fffdf8', ruby: '#c21d3c', steel: '#5a6796', line: '#1d2a66' } },
  (k, mode) => {
    const crownMark = `<path d="M10 44h40l4-26-12 10-12-18-12 18-12-10z" fill="${k.gold}" stroke="${k.line}" stroke-width="1.5" stroke-linejoin="round"/><rect x="10" y="44" width="40" height="7" fill="${k.gold}" stroke="${k.line}" stroke-width="1.5"/><circle cx="30" cy="9" r="3" fill="${k.ruby}"/><circle cx="20" cy="47.5" r="2" fill="${k.ruby}"/><circle cx="30" cy="47.5" r="2" fill="${k.enamel}"/><circle cx="40" cy="47.5" r="2" fill="${k.ruby}"/>`
    const crown = svg(crownMark, '0 0 60 60')
    const crownTile = svg(`<g opacity=".16" transform="translate(15 15)">${crownMark}</g>`, '0 0 90 90')
    const press = svg(`<rect x="36" y="0" width="88" height="240" fill="${a(k.deep, .55)}"/><g stroke="${k.steel}" stroke-width="2" opacity=".5">${loop(12, 20, (y) => `<path d="M40 ${y + 10}h80"/>`)}</g><path d="M40 0v240M120 0v240" stroke="${k.steel}" stroke-width="5"/><rect x="24" y="0" width="112" height="38" rx="5" fill="${k.enamel}" stroke="${k.gold}" stroke-width="3"/><rect x="70" y="38" width="20" height="16" fill="${k.steel}"/><rect x="54" y="54" width="52" height="9" rx="2" fill="${k.gold}" stroke="${k.line}"/><text x="80" y="25" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="700" fill="${k.gold}">G ♔ R</text><circle cx="40" cy="228" r="9" fill="${k.steel}" stroke="${k.line}"/><circle cx="120" cy="228" r="9" fill="${k.steel}" stroke="${k.line}"/>`)
    const ermineTile = svg(`<path d="M16 15v13M16 22l-5 9M16 22l5 9" stroke="${k.line}" stroke-width="2.6" stroke-linecap="round"/><circle cx="16" cy="9" r="2.2" fill="${k.line}"/><circle cx="11" cy="13" r="2.2" fill="${k.line}"/><circle cx="21" cy="13" r="2.2" fill="${k.line}"/>`, '0 0 32 40')
    const gear = svg(`<circle cx="80" cy="120" r="50" fill="none" stroke="${k.gold}" stroke-width="14" stroke-dasharray="11 10.9"/><circle cx="80" cy="120" r="43" fill="${k.enamel}" stroke="${k.gold}" stroke-width="4"/><circle cx="80" cy="120" r="34" fill="none" stroke="${k.ermine}" stroke-width="1.5" stroke-dasharray="3 4"/><g transform="translate(56 98) scale(.8)">${crownMark}</g>`)
    const skyline = `<g fill="${a(k.steel, .22)}">${loop(8, 200, (x) => `<circle cx="${x + 85}" cy="${86 + (x % 400) / 8}" r="${26 + (x % 3) * 6}"/><circle cx="${x + 110}" cy="${60 + (x % 400) / 8}" r="${18 + (x % 2) * 6}"/>`)}</g><g fill="${a(k.enamel, .95)}"><rect x="0" y="270" width="1600" height="130"/>${loop(8, 200, (x) => `<rect x="${x + 60}" y="${150 + (x % 400) / 8}" width="50" height="260"/>`)}</g><g fill="${a(k.gold, .9)}">${loop(8, 200, (x) => `<path d="M${x + 50} ${150 + (x % 400) / 8}l10-30 12 16 13-24 13 24 12-16 10 30z"/>`)}</g><g fill="none" stroke="${a(k.gold, .55)}" stroke-width="12" stroke-dasharray="15 12"><circle cx="1420" cy="310" r="90"/><circle cx="210" cy="330" r="64"/></g><g fill="${a(k.ruby, .7)}">${loop(20, 80, (x) => `<rect x="${x + 20}" y="300" width="14" height="18"/>`)}</g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% -5%,${a(k.enamel, .6)},transparent 58%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `repeating-linear-gradient(45deg,${a(k.gold, .07)} 0 2px,transparent 2px 28px),repeating-linear-gradient(-45deg,${a(k.gold, .07)} 0 2px,transparent 2px 28px),${crownTile}`, sceneSize: 'auto,auto,90px 90px',
      ornament: `repeating-radial-gradient(circle at 10% 90%,transparent 0 70px,${a(k.gold, .14)} 71px 77px,transparent 78px 112px),repeating-radial-gradient(circle at 92% 8%,transparent 0 48px,${a(k.ruby, .13)} 49px 54px,transparent 55px 80px)`, ornamentSize: 'auto,auto',
      paper: `radial-gradient(ellipse at 50% -10%,${a(k.gold, .16)},transparent 55%)`, line: `linear-gradient(${k.gold},${k.ruby} 45%,${k.ermine} 75%,${k.gold})`, lineSpeed: '3.6s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(press)},linear-gradient(${k.deep},${k.enamel})`,
      panelRight: `linear-gradient(90deg,${k.enamel} 0 9%,${k.gold} 9% 11%,transparent 11% 89%,${k.gold} 89% 91%,${k.enamel} 91%),${ermineTile} 0 0/32px 40px,linear-gradient(${k.ermine},${a(k.ermine, .9)})`,
      panelDetail: sheen, panelGlyphs: ['♛', '⚙'],
      panelInteriors: { left: { object: `${crown} 50% 0/60px 80px repeat-y`, aspect: BOARD, animation: 'venus-found-coronation-belt 5s linear infinite' }, right: { object: board(gear), aspect: BOARD, animation: 'venus-found-inner-coronation-machine 14s linear infinite' } },
      panelOverlay: `linear-gradient(105deg,transparent 42%,${a(k.gold, .6)} 50%,transparent 58%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .35,
      portraitRadius: '14px 14px 50% 50% / 14px 14px 34% 34%',
      plaque: `linear-gradient(${k.enamel},${a(k.enamel, .82)})`, plaqueText: mode === 'dark' ? k.ermine : k.line, plaqueBorder: k.gold, plaqueShadow: `0 0 0 3px ${k.gold},0 0 0 6px ${k.enamel},0 10px 26px ${a(k.line, .5)}`, plaqueInset: studs(`${k.ruby} 0 4px,${k.gold} 4.5px 6px,transparent 6.5px`), plaqueRadius: '4px 4px 22px 22px',
      headingFont: fonts.cinzelDeco, bodyFont: fonts.garamond, monoFont: fonts.mono,
      ...motion('coronation-machine', {
        scene: [40, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:0 0,0 0,90px -90px}'],
        world: [16, ease, '0%,100%{transform:rotate(-1deg) scale(1.02)}50%{transform:rotate(1deg) scale(1.06)}'],
        inner: [14, 'linear', 'to{transform:rotate(360deg)}'],
        overlay: [6, ease, '0%,100%{transform:translateX(-30%)}50%{transform:translateX(30%)}'],
        extra: '@keyframes venus-found-coronation-belt{from{background-position:50% 0}to{background-position:50% -160px}}',
      }),
    }
  })

/* ───────────── Mirage Megaplex ───────────── */
interface MirageInk { sky1: string; sky2: string; sun: string; mesa: string; cactus: string; neon: string; bulb: string; sand: string; line: string; board: string }
const mirage = world<MirageInk>('mirage-megaplex', 'Mirage Megaplex', 'A desert drive-in at sunset: a striped sun on the big screen, saguaros, heat haze, and a motel sign that cannot decide on VACANCY.', ['desert','drive-in','motel','neon','sunset','cactus','marquee','americana'],
  { skin: skin('#1d0e28','#2a1436','#3a1b45','#fff0e6','#d4b3c8','#ff8a3d','#36d6c0'), ink: { sky1: '#2b1440', sky2: '#ff7a4d', sun: '#ffd166', mesa: '#5a1f3a', cactus: '#1f8a6e', neon: '#ff5e7a', bulb: '#ffe28a', sand: '#e9b07a', line: '#140a1e', board: '#2b0f22' } },
  { skin: skin('#fbeedd','#fffaf3','#f6dcc2','#3a1a2a','#7a5a60','#d9531e','#138a74'), ink: { sky1: '#8fd0ff', sky2: '#ffb38a', sun: '#fff1a8', mesa: '#c2552f', cactus: '#1c8a6a', neon: '#e23b62', bulb: '#ffb300', sand: '#f3d6a8', line: '#3a1a2a', board: '#fff3e2' } },
  (k, mode) => {
    const screen = svg(`<defs><linearGradient id="s" x2="0" y2="1"><stop offset="0" stop-color="${k.sky1}"/><stop offset="1" stop-color="${k.sky2}"/></linearGradient></defs><rect x="10" y="30" width="140" height="112" fill="url(#s)" stroke="${k.line}" stroke-width="4"/><circle cx="80" cy="118" r="40" fill="${k.sun}"/><g fill="${k.sky2}">${loop(5, 7, (y) => `<rect x="36" y="${104 + y}" width="88" height="${2 + y / 7}"/>`)}</g><path d="M12 142l20-22h18l10 12 18-24h22l14 18 14-8 20 24z" fill="${k.mesa}"/><path d="M40 142v76M120 142v76" stroke="${k.line}" stroke-width="5"/><rect x="0" y="206" width="160" height="34" fill="${k.sand}"/><g fill="${k.cactus}"><path d="M24 214v-40a6 6 0 0 1 12 0v40zM24 196h-8v-14a4 4 0 0 1 8 0zM36 188h8v-16a4 4 0 0 0-8 0z"/><path d="M132 216v-26a5 5 0 0 1 10 0v26zM142 202h6v-10a3 3 0 0 0-6 0z"/></g><g fill="${k.line}"><rect x="58" y="214" width="22" height="9" rx="4"/><rect x="88" y="216" width="20" height="8" rx="4"/></g>`)
    const sign = svg(`<path d="M34 16h92v150H96l-16 26-16-26H34z" fill="${k.board}" stroke="${k.neon}" stroke-width="3"/><g fill="${k.bulb}">${loop(9, 18, (y) => `<circle cx="40" cy="${24 + y}" r="2.4"/><circle cx="120" cy="${24 + y}" r="2.4"/>`)}</g><g font-family="Arial Black,Impact,sans-serif" font-size="24" text-anchor="middle" fill="${k.neon}" stroke="${k.bulb}" stroke-width=".8">${['M','O','T','E','L'].map((c, i) => `<text x="80" y="${46 + i * 27}">${c}</text>`).join('')}</g><rect x="14" y="200" width="132" height="26" rx="4" fill="${k.board}" stroke="${k.cactus}" stroke-width="2"/><text x="96" y="219" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="14" letter-spacing="1" fill="${k.cactus}">VACANCY</text>`)
    const no = svg(`<text x="38" y="219" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="14" fill="${k.neon}" stroke="${k.bulb}" stroke-width=".6">NO</text>`)
    const skyline = `<circle cx="800" cy="330" r="220" fill="${a(k.sun, .6)}"/>${loop(6, 22, (y) => `<rect x="560" y="${250 + y}" width="480" height="${4 + y / 6}" fill="${a(k.sky1, .55)}"/>`)}<path d="M0 400V300l120-40h160l40 40 200-80h240l60 60 180-30 60 50h200l140-60h200v160z" fill="${a(k.mesa, .95)}"/><g fill="${a(k.cactus, .95)}"><path d="M180 400v-120a16 16 0 0 1 32 0v120zM180 330h-24v-40a12 12 0 0 1 24 0zM212 310h24v-40a12 12 0 0 0-24 0z"/><path d="M1380 400v-90a12 12 0 0 1 24 0v90zM1404 350h18v-30a9 9 0 0 0-18 0z"/></g><path d="M620 400V330h360v70" fill="none" stroke="${a(k.line, .8)}" stroke-width="10"/>`
    return {
      backdrop: `${landmark(skyline)},linear-gradient(180deg,var(--venus-bg) 0,var(--venus-raised) 55%,${a(k.sky2, .45)} 82%,${a(k.mesa, .7)})`,
      scene: `radial-gradient(circle,${a(k.bulb, .55)} 0 1px,transparent 1.7px),radial-gradient(circle,${a(k.sun, .35)} 0 1.4px,transparent 2px)`, sceneSize: '61px 47px,97px 83px',
      ornament: `conic-gradient(from 196deg at 50% 112%,transparent 0 9deg,${a(k.bulb, .12)} 11deg 15deg,transparent 17deg 30deg,${a(k.neon, .1)} 32deg 36deg,transparent 38deg),repeating-linear-gradient(0deg,transparent 0 18px,${a(k.sand, .06)} 19px 21px)`, ornamentSize: 'auto,auto',
      paper: `linear-gradient(transparent 70%,${a(k.sand, .14)})`, line: `linear-gradient(${k.neon},${k.sky2} 40%,${k.cactus} 75%,${k.neon})`, lineSpeed: '2.8s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(screen)},linear-gradient(${k.sky1},${a(k.sky2, .6)})`,
      panelRight: `${scenery(sign)},radial-gradient(ellipse at 50% 40%,${a(k.neon, .22)},transparent 60%),linear-gradient(${a(k.sky1, .9)},${a(k.mesa, .8)})`,
      panelDetail: sheen, panelGlyphs: ['☀', '✦'],
      panelInteriors: { left: { object: `repeating-linear-gradient(0deg,transparent 0 5px,${a(k.bulb, .16)} 6px 7px)`, inset: '56% 0 8%', animation: `venus-found-mirage-haze 3.4s ${ease} infinite` }, right: { object: scenery(no), animation: 'venus-found-inner-mirage-megaplex 5s linear infinite' } },
      panelOverlay: `linear-gradient(180deg,${a(k.bulb, .3)},transparent 45%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'soft-light', panelOverlayOpacity: .5,
      portraitRadius: '24% / 20%',
      plaque: `linear-gradient(${k.line},${k.mesa})`, plaqueText: k.bulb, plaqueBorder: k.neon, plaqueShadow: `0 0 0 3px ${k.line},0 0 22px ${a(k.neon, .7)}`, plaqueInset: `radial-gradient(circle at 50% 4px,${k.bulb} 0 2px,transparent 2.8px) 0 0/14px 100%,radial-gradient(circle at 50% calc(100% - 4px),${k.bulb} 0 2px,transparent 2.8px) 7px 0/14px 100%`, plaqueRadius: '6px',
      headingFont: fonts.erica, bodyFont: fonts.karla, monoFont: fonts.mono,
      ...motion('mirage-megaplex', {
        scene: [30, ease, '0%,100%{background-position:0 0,0 0;filter:brightness(.9)}50%{background-position:30px -10px,-20px 14px;filter:brightness(1.25)}'],
        world: [11, ease, '0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}'],
        inner: [5, 'linear', '0%,100%{opacity:1}12%{opacity:.1}13%{opacity:1}41%{opacity:1}42%{opacity:.05}44%{opacity:.8}45%{opacity:.05}47%{opacity:1}76%{opacity:.2}78%{opacity:1}'],
        overlay: [7, 'linear', '0%,100%{filter:opacity(.9)}48%{filter:opacity(.6)}50%{filter:opacity(1)}'],
        extra: '@keyframes venus-found-mirage-haze{0%,100%{transform:skewX(-7deg) translateY(0);background-position:0 0}50%{transform:skewX(7deg) translateY(-4%);background-position:0 -14px}}',
      }),
    }
  })

/* ───────────── The Impossible Conservatory ───────────── */
interface GlassInk { glass: string; iron: string; mercury: string; coral: string; leaf: string; pot: string; deep: string }
const conservatory = world<GlassInk>('impossible-conservatory', 'The Impossible Conservatory', 'A Victorian glasshouse at night: mercury rain on the panes, cast-iron ribs, and a carnivorous flytrap that snaps at the lamplight.', ['greenhouse','victorian','glass','mercury','rain','carnivorous','flytrap','ironwork'],
  { skin: skin('#111719','#1a2326','#243135','#eef4f5','#a7b7ba','#dfe8ea','#ff7a86'), ink: { glass: '#1d2a2e', iron: '#9fb3b8', mercury: '#dfe8ea', coral: '#ff7a86', leaf: '#6fa58a', pot: '#8a5a44', deep: '#0b1112' } },
  { skin: skin('#eef3f3','#ffffff','#dde8e9','#1c2a2e','#5a6d72','#3f5359','#cc3f54'), ink: { glass: '#dfeaeb', iron: '#3f5359', mercury: '#8fa3a8', coral: '#d23a4f', leaf: '#3f7a5f', pot: '#b0674a', deep: '#c9d7d9' } },
  (k, mode) => {
    const dome = svg(`<path d="M14 232V110a66 66 0 0 1 132 0v122z" fill="${a(k.glass, .8)}" stroke="${k.iron}" stroke-width="4"/><g fill="none" stroke="${k.iron}" stroke-width="2"><path d="M80 44v188M47 53c-12 30-14 110-14 179M113 53c12 30 14 110 14 179M16 140h128M15 186h130"/><path d="M26 76c18 8 90 8 108 0" /></g><path d="M80 44v-24" stroke="${k.iron}" stroke-width="3"/><circle cx="80" cy="16" r="5" fill="${k.mercury}"/><g fill="none" stroke="${k.leaf}" stroke-width="2"><path d="M24 232c10-40-6-70 12-110s36-30 30-60"/><path d="M136 232c-12-34 4-60-10-96"/></g><g fill="${k.leaf}"><ellipse cx="34" cy="150" rx="7" ry="3" transform="rotate(-30 34 150)"/><ellipse cx="50" cy="104" rx="7" ry="3" transform="rotate(30 50 104)"/><ellipse cx="128" cy="170" rx="7" ry="3" transform="rotate(-20 128 170)"/></g><g fill="${k.mercury}">${loop(6, 22, (x) => `<circle cx="${30 + x}" cy="${120 + (x % 3) * 20}" r="1.8"/>`)}</g>`)
    const drop = svg(`<path d="M15 8q4 9 0 15q-4-6 0-15z" fill="${k.mercury}"/><path d="M15 23v22" stroke="${k.mercury}" stroke-opacity=".35" stroke-width="1.4"/>`, '0 0 30 60')
    const pot = svg(`<path d="M44 196h72l-8 40H52z" fill="${k.pot}"/><rect x="40" y="188" width="80" height="12" rx="3" fill="${k.pot}" stroke="${k.deep}"/><g stroke="${k.leaf}" stroke-width="4" stroke-linecap="round" fill="none"><path d="M80 188c0-26-2-34 0-60"/><path d="M70 190c-10-14-22-16-30-30M92 190c10-14 22-18 28-32"/></g><g fill="${k.leaf}"><path d="M34 158c4-8 14-8 16 0-4 6-12 6-16 0z"/><path d="M114 156c4-8 14-8 16 0-4 6-12 6-16 0z"/></g>`)
    const trap = svg(`<g transform="translate(80 128) scale(1.45) translate(-80 -128)"><g stroke="${k.leaf}" stroke-width="2"><path d="M40 128c6-36 74-36 80 0z" fill="${k.coral}"/><path d="M40 128c6 30 74 30 80 0z" fill="${k.coral}" opacity=".85"/></g><g stroke="${k.mercury}" stroke-width="2" stroke-linecap="round">${loop(9, 9, (x) => `<path d="M${44 + x} 128l-3 -12"/><path d="M${44 + x} 128l-3 12"/>`)}</g><g fill="${k.deep}" opacity=".5"><circle cx="70" cy="116" r="2"/><circle cx="90" cy="118" r="2"/></g></g>`)
    // A Kew-style palm house: two barrel-vaulted wings, a tall rotunda with a lantern, lamplit palms behind the glass.
    const wing = (x: number, side: 1 | -1) => { const d = side === 1 ? x - 200 : 1400 - x; return d >= 130 ? 190 : 290 - 100 * Math.sqrt(1 - ((130 - d) / 130) ** 2) }
    const rotunda = (x: number) => 230 - 150 * Math.sqrt(Math.max(0, 1 - ((x - 800) / 180) ** 2))
    const ribs = [...loop(12, 36, (x) => `<path d="M${214 + x} 360V${wing(214 + x, 1).toFixed(0)}M${1386 - x} 360V${wing(1386 - x, -1).toFixed(0)}"/>`), ...loop(11, 32, (x) => `<path d="M${640 + x} 360V${rotunda(640 + x).toFixed(0)}"/>`)].join('')
    const palm = (x: number, h: number, lean: number) => `<path d="M${x} 360q${lean} ${-h / 2} ${lean * 1.6} ${-h}" fill="none" stroke="${a(k.leaf, .75)}" stroke-width="7"/><g fill="none" stroke="${a(k.leaf, .75)}" stroke-width="6" stroke-linecap="round">${[-70, -35, 0, 35, 70].map((d) => `<path d="M${x + lean * 1.6} ${360 - h}q${d / 2} -24 ${d} ${Math.abs(d) / 2 + 6}"/>`).join('')}</g>`
    const skyline = `<defs><linearGradient id="lit" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${a(k.coral, mode === 'dark' ? .28 : .16)}"/><stop offset=".55" stop-color="${a(k.mercury, mode === 'dark' ? .1 : .3)}"/><stop offset="1" stop-color="${a(k.mercury, mode === 'dark' ? .05 : .45)}"/></linearGradient></defs><g fill="url(#lit)" stroke="${a(k.iron, .85)}" stroke-width="5"><path d="M200 360V290A130 100 0 0 1 330 190H630V360z"/><path d="M1400 360V290A130 100 0 0 0 1270 190H970V360z"/><path d="M620 360V230A180 150 0 0 1 980 230V360z"/><path d="M742 86V62A58 28 0 0 1 858 62V86z"/></g>${palm(700, 190, -14)}${palm(800, 250, 8)}${palm(905, 170, 16)}${palm(330, 120, -10)}${palm(1270, 120, 12)}<g stroke="${a(k.iron, .55)}" stroke-width="2.5">${ribs}<path d="M200 300H630M970 300H1400M620 290H980M626 200H974M200 245H630M970 245H1400"/></g><path d="M800 34V6" stroke="${k.iron}" stroke-width="5"/><circle cx="800" cy="6" r="7" fill="${k.mercury}"/>${[330, 1270].map((x) => `<path d="M${x} 190v-18" stroke="${k.iron}" stroke-width="4"/><circle cx="${x}" cy="168" r="5" fill="${k.mercury}"/>`).join('')}<rect x="170" y="360" width="1260" height="40" fill="${a(k.iron, .55)}"/><path d="M170 360h1260" stroke="${k.iron}" stroke-width="4"/><g fill="${a(k.leaf, .85)}"><path d="M120 400c10-100 30-160 60-200-40 10-80 30-110 70 30-50 70-80 120-90-40-20-90-10-120 20 40-40 100-50 140-30 0 60-20 120-40 230z"/><path d="M1480 400c-6-80-20-130-40-160 30 8 56 24 76 56-20-40-48-64-84-72 30-14 64-6 88 18-30-34-76-40-104-24 6 50 18 100 30 182z"/></g>${[560, 1040].map((x) => `<path d="M${x} 400v-70" stroke="${k.iron}" stroke-width="5"/><circle cx="${x}" cy="322" r="11" fill="${a(k.coral, .85)}"/><circle cx="${x}" cy="322" r="26" fill="${a(k.coral, .18)}"/>`).join('')}`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 30% 10%,${a(k.mercury, .16)},transparent 45%),linear-gradient(170deg,var(--venus-raised),var(--venus-bg) 60%)`,
      scene: `linear-gradient(${a(k.iron, .14)} 2px,transparent 2px),linear-gradient(90deg,${a(k.iron, .14)} 2px,transparent 2px),radial-gradient(circle,${a(k.mercury, .35)} 0 1.5px,transparent 2.2px)`, sceneSize: '140px 180px,140px 180px,37px 53px',
      ornament: `repeating-linear-gradient(100deg,transparent 0 40px,${a(k.mercury, .09)} 41px 42px,transparent 43px 90px)`, ornamentSize: 'auto',
      paper: `radial-gradient(ellipse at 50% 120%,${a(k.coral, .12)},transparent 55%)`, line: `linear-gradient(${k.mercury},${k.iron} 45%,${k.coral} 80%,${k.mercury})`, lineSpeed: '4.4s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(dome)},linear-gradient(${k.deep},${k.glass})`,
      panelRight: `${scenery(pot)},radial-gradient(ellipse at 50% 55%,${a(k.coral, .2)},transparent 55%),linear-gradient(${k.glass},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['❋', '⚘'],
      panelInteriors: { left: { object: `${drop} 0 0/30px 60px`, aspect: BOARD, animation: 'venus-found-conservatory-rain 2.6s linear infinite' }, right: { object: board(trap), aspect: BOARD, origin: '50% 53.3%', animation: `venus-found-inner-impossible-conservatory 4.8s ${ease} infinite` } },
      panelOverlay: `linear-gradient(180deg,${a(k.mercury, .35)},transparent 20%,transparent 80%,${a(k.mercury, .2)})`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'normal', panelOverlayOpacity: .4,
      portraitRadius: '50% 50% 6px 6px / 40% 40% 6px 6px',
      plaque: 'linear-gradient(#d3dddf,#8fa3a8)', plaqueText: '#13191b', plaqueBorder: k.iron, plaqueShadow: `0 0 0 3px ${k.deep},0 0 0 5px ${k.coral},0 10px 24px ${a(k.deep, .6)}`, plaqueInset: studs(`#13191b 0 3px,${k.iron} 3.5px 4.5px,transparent 5px`), plaqueRadius: '6px 6px 18px 18px',
      headingFont: fonts.spectral, bodyFont: fonts.sourceSerif, monoFont: fonts.mono,
      ...motion('impossible-conservatory', {
        scene: [34, ease, '0%,100%{transform:scale(1.03)}50%{transform:scale(1.06) translate3d(1%,1%,0)}'],
        world: [2.2, 'linear', 'from{background-position:0 0,0 0}to{background-position:-18px 100px,0 0}'],
        inner: [4.8, ease, '0%,64%,100%{transform:scaleY(1)}70%{transform:scaleY(.18)}86%{transform:scaleY(.24)}'],
        overlay: [9, ease, '0%,100%{transform:translateY(-8%)}50%{transform:translateY(8%)}'],
        extra: '@keyframes venus-found-conservatory-rain{from{background-position:0 0}to{background-position:0 120px}}',
      }),
    }
  })

/* ───────────── The Opal Menagerie ───────────── */
interface OpalInk { lead: string; o1: string; o2: string; o3: string; o4: string; gold: string; glass: string }
const opal = world<OpalInk>('opal-menagerie', 'The Opal Menagerie', 'An art nouveau aviary in fire opal: whiplash stained glass, peacock eyes, and a hummingbird hovering inside a jewelled cage.', ['art nouveau','bestiary','opal','stained glass','hummingbird','aviary','iridescent','peacock'],
  { skin: skin('#15102b','#1f1840','#2b2155','#fbf3ff','#c8bde0','#ff9e7a','#8fd3ff'), ink: { lead: '#0b0818', o1: '#ff9e7a', o2: '#8fd3ff', o3: '#9ff0d8', o4: '#d7b8ff', gold: '#e8c36a', glass: '#241a45' } },
  { skin: skin('#f6f1fb','#ffffff','#ece2f7','#2a1f45','#6a5f85','#c4522f','#1f7fb8'), ink: { lead: '#3a2a5a', o1: '#ffb49a', o2: '#9fd6f5', o3: '#a8ead3', o4: '#d9c2fb', gold: '#b8892a', glass: '#f3ecfb' } },
  (k, mode) => {
    const glassWin = svg(`<path d="M12 236V96C12 40 148 40 148 96v140z" fill="${k.glass}" stroke="${k.lead}" stroke-width="6"/><g stroke="${k.lead}" stroke-width="4" stroke-linejoin="round"><path d="M16 236c20-50 60-40 64-100S120 70 146 110" fill="${a(k.o1, .7)}"/><path d="M146 236c-26-40-60-30-62-80" fill="none"/><path d="M16 170c30-10 50 10 70 0s40-30 60-20" fill="none"/><path d="M84 156c-2-36 30-52 60-46v126H84z" fill="${a(k.o2, .6)}"/><path d="M16 236v-66c30-10 50 10 70 0l-2 66z" fill="${a(k.o3, .55)}"/></g><ellipse cx="80" cy="80" rx="26" ry="32" fill="${a(k.o4, .8)}" stroke="${k.lead}" stroke-width="4"/><ellipse cx="80" cy="84" rx="15" ry="19" fill="${k.o2}" stroke="${k.lead}" stroke-width="3"/><ellipse cx="80" cy="88" rx="7" ry="9" fill="${k.lead}"/><g fill="none" stroke="${k.gold}" stroke-width="2"><path d="M40 60c6-16 20-24 40-26M120 60c-6-16-20-24-40-26"/></g>`)
    const cage = svg(`<path d="M80 10v14" stroke="${k.gold}" stroke-width="3"/><circle cx="80" cy="8" r="5" fill="none" stroke="${k.gold}" stroke-width="3"/><path d="M30 200V90c0-40 100-40 100 0v110" fill="none" stroke="${k.gold}" stroke-width="3"/><g stroke="${k.gold}" stroke-width="1.6">${loop(9, 12.5, (x) => `<path d="M${30 + x} 200V${90 - Math.round(Math.sin((x / 100) * Math.PI) * 38)}"/>`)}</g><ellipse cx="80" cy="200" rx="54" ry="10" fill="${k.gold}"/><ellipse cx="80" cy="197" rx="46" ry="6" fill="${a(k.o1, .7)}"/><path d="M40 160h80" stroke="${k.gold}" stroke-width="3"/><g fill="${k.o1}"><circle cx="80" cy="52" r="4"/><circle cx="50" cy="70" r="3"/><circle cx="110" cy="70" r="3"/></g>`)
    const bird = svg(`<ellipse cx="80" cy="116" rx="14" ry="8" fill="${k.o3}" transform="rotate(-18 80 116)"/><path d="M92 110l30-8-30 4z" fill="${k.lead}"/><circle cx="90" cy="110" r="2" fill="${k.lead}"/><path d="M68 120l-16 10 20-4z" fill="${k.o2}"/><ellipse cx="74" cy="104" rx="14" ry="5" fill="${a(k.o4, .85)}" transform="rotate(-50 74 104)"/><ellipse cx="80" cy="120" rx="4" ry="3" fill="${k.o1}"/>`)
    const skyline = `<g fill="none" stroke="${a(k.gold, .65)}" stroke-width="12" stroke-linecap="round"><path d="M500 400V200c0-80 40-120 80-160M1100 400V200c0-80-40-120-80-160M580 40c80 40 360 40 440 0"/><path d="M520 400c-60-40-100-120-60-200s120-80 140-40M1080 400c60-40 100-120 60-200s-120-80-140-40" stroke-width="6"/></g><g fill="${a(k.o1, .85)}"><ellipse cx="580" cy="40" rx="30" ry="40"/><ellipse cx="1020" cy="40" rx="30" ry="40"/></g>${[200, 1400].map((x) => `<g transform="translate(${x} 300)">${loop(7, 25, (r) => `<g transform="rotate(${r - 75})"><path d="M0 0v-170" stroke="${a(k.gold, .45)}" stroke-width="3"/><ellipse cy="-170" rx="18" ry="26" fill="${a(k.o3, .65)}"/><ellipse cy="-168" rx="10" ry="14" fill="${a(k.o2, .85)}"/><ellipse cy="-166" rx="4" ry="6" fill="${a(k.lead, .9)}"/></g>`)}</g>`).join('')}`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 20% 0,${a(k.o4, .3)},transparent 45%),radial-gradient(ellipse at 90% 100%,${a(k.o1, .22)},transparent 45%),linear-gradient(160deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: svg(`<g fill="none" stroke="${k.gold}" stroke-width="2" opacity=".2"><path d="M10 200c40-20 30-80 80-100s60-60 100-70"/><path d="M10 120c30 0 50-40 90-30s60 40 100 20"/><circle cx="160" cy="170" r="16"/></g>`, '0 0 220 220'), sceneSize: '220px 220px',
      ornament: `radial-gradient(circle,${a(k.o1, .55)} 0 1.5px,transparent 2.4px),radial-gradient(circle,${a(k.o2, .5)} 0 1.5px,transparent 2.4px),radial-gradient(circle,${a(k.o3, .5)} 0 1.2px,transparent 2px)`, ornamentSize: '71px 83px,53px 61px,97px 41px',
      paper: `radial-gradient(ellipse at 50% 50%,${a(k.o4, .08)},transparent 60%)`, line: `linear-gradient(${k.o1},${k.o4} 30%,${k.o2} 60%,${k.o3} 85%,${k.o1})`, lineSpeed: '3.8s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(glassWin)},linear-gradient(${k.glass},${k.lead})`,
      panelRight: `${scenery(cage)},radial-gradient(circle at 50% 55%,${a(k.o3, .22)},transparent 55%),linear-gradient(${k.glass},${a(k.lead, .9)})`,
      panelDetail: sheen, panelGlyphs: ['❖', '✧'],
      panelInteriors: { left: { object: `linear-gradient(135deg,${a(k.o1, .28)},${a(k.o2, .28)},${a(k.o3, .28)},${a(k.o4, .28)},${a(k.o1, .28)}) 0 0/400% 400%`, animation: 'venus-found-opal-play 8s linear infinite' }, right: { object: board(bird), aspect: BOARD, animation: `venus-found-inner-opal-menagerie 3.4s ${ease} infinite` } },
      panelOverlay: `radial-gradient(circle,${a(k.o4, .5)},transparent 60%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'normal', panelOverlayOpacity: .25,
      portraitRadius: '50% 50% 50% 50% / 62% 62% 38% 38%',
      plaque: `linear-gradient(100deg,${k.o1},${k.o4} 35%,${k.o2} 65%,${k.o3})`, plaqueText: mode === 'dark' ? k.lead : '#2a1f45', plaqueBorder: k.gold, plaqueShadow: `0 0 0 3px ${k.gold},0 0 22px ${a(k.o4, .6)}`, plaqueInset: studs(`${k.gold} 0 3px,transparent 4px`, `${k.gold} 0 3px,transparent 4px`, 18), plaqueRadius: '999px',
      headingFont: fonts.dmSerif, bodyFont: fonts.lora, monoFont: fonts.mono,
      ...motion('opal-menagerie', {
        scene: [60, 'linear', 'from{background-position:0 0}to{background-position:220px 220px}'],
        world: [24, ease, '0%,100%{background-position:0 0,0 0,0 0,0 0;filter:hue-rotate(0)}50%{background-position:40px -30px,-30px 40px,50px 20px,0 0;filter:hue-rotate(40deg)}'],
        inner: [3.4, ease, '0%,100%{transform:translate(0,0) rotate(-4deg)}25%{transform:translate(8%,-4%) rotate(3deg)}50%{transform:translate(-5%,-8%)}75%{transform:translate(5%,3%) rotate(-2deg)}'],
        overlay: [10, ease, '0%,100%{transform:scale(.8)}50%{transform:scale(1.2)}'],
        extra: '@keyframes venus-found-opal-play{from{background-position:0 0;filter:hue-rotate(0)}to{background-position:100% 100%;filter:hue-rotate(360deg)}}',
      }),
    }
  })

/* ───────────── Velvet Catacomb ───────────── */
interface BoneInk { niche: string; bone: string; shade: string; wax: string; flame: string; stone: string; velvet: string }
const catacomb = world<BoneInk>('velvet-catacomb', 'Velvet Catacomb', 'A candlelit ossuary: ranks of polished skulls, bone filigree rosettes, black velvet, and wax that never stops dripping.', ['gothic','catacomb','ossuary','bone','candle','velvet','wax','baroque'],
  { skin: skin('#0d0b09','#171310','#221c17','#f3eadb','#b3a58c','#ecdfc4','#f2a348'), ink: { niche: '#1c1713', bone: '#ecdfc4', shade: '#a8977a', wax: '#f2e6c9', flame: '#ffb347', stone: '#3a332c', velvet: '#1a1216' } },
  { skin: skin('#f3ede0','#fffaf2','#e7ddca','#2a221b','#6e6252','#4a3b2e','#b3661a'), ink: { niche: '#6f604b', bone: '#fffaf0', shade: '#b8a88c', wax: '#fffaf0', flame: '#f08a2c', stone: '#cfc3ad', velvet: '#8a7a62' } },
  (k, mode) => {
    const skull = (x: number, y: number) => `<g transform="translate(${x} ${y})"><circle cx="0" cy="0" r="9" fill="${k.bone}"/><rect x="-5" y="6" width="10" height="6" rx="2" fill="${k.bone}"/><circle cx="-3.4" cy="-.5" r="2.4" fill="${k.niche}"/><circle cx="3.4" cy="-.5" r="2.4" fill="${k.niche}"/><path d="M-1 4l1-2 1 2z" fill="${k.niche}"/><path d="M-3 9v3M0 9v3M3 9v3" stroke="${k.shade}"/></g>`
    const ossuary = svg(`<path d="M18 236V70a62 62 0 0 1 124 0v166z" fill="${k.niche}" stroke="${k.shade}" stroke-width="3"/>${[60, 88, 116, 144].map((y) => [44, 80, 116].map((x) => skull(x, y)).join('')).join('')}<g stroke="${k.bone}" stroke-width="5" stroke-linecap="round"><path d="M40 176l80 20M40 196l80-20"/></g><rect x="70" y="200" width="20" height="32" fill="${k.wax}"/><path d="M70 204q4 8 0 14" stroke="${k.shade}" fill="none"/><rect x="58" y="230" width="44" height="6" fill="${k.shade}"/><path d="M80 200v-6" stroke="${k.stone}" stroke-width="1.5"/>`)
    const flame = svg(`<defs><radialGradient id="f" cy=".7"><stop offset="0" stop-color="#fff6d8"/><stop offset=".5" stop-color="${k.flame}"/><stop offset="1" stop-color="${k.flame}" stop-opacity="0"/></radialGradient></defs><circle cx="80" cy="184" r="26" fill="${a(k.flame, .18)}"/><path d="M80 170c8 10 8 18 0 24-8-6-8-14 0-24z" fill="url(#f)"/>`)
    const filigree = svg(`<g stroke="${k.bone}" stroke-width="4" stroke-linecap="round" fill="none">${[0, 30, 60, 90, 120, 150].map((r) => `<path d="M80 120l0 -46" transform="rotate(${r} 80 120)"/><path d="M80 120l0 46" transform="rotate(${r} 80 120)"/>`).join('')}</g><g fill="${k.bone}">${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((r) => `<circle cx="80" cy="72" r="5" transform="rotate(${r} 80 120)"/>`).join('')}</g><circle cx="80" cy="120" r="14" fill="${k.velvet}" stroke="${k.bone}" stroke-width="3"/>${skull(80, 120)}<g stroke="${k.shade}" stroke-width="3" stroke-linecap="round"><path d="M12 12h136M12 228h136M12 12v216M148 12v216" stroke-dasharray="14 6"/></g><path d="M40 12q4 14 0 22M120 12q3 10 0 16" stroke="${k.wax}" stroke-width="6" stroke-linecap="round"/>`)
    const drip = svg(`<path d="M80 12c5 14 5 24 0 30-5-6-5-16 0-30z" fill="${k.wax}"/>`)
    const skyline = `<circle cx="1300" cy="90" r="56" fill="${a(k.bone, .55)}"/><g fill="${a(k.shade, mode === 'dark' ? .55 : .8)}"><rect x="0" y="300" width="1600" height="100"/>${loop(6, 260, (x) => `<path d="M${x + 60} 300V200a60 60 0 0 1 120 0v100z"/><rect x="${x + 110}" y="130" width="20" height="30"/><rect x="${x + 100}" y="140" width="40" height="8"/>`)}</g><g fill="${a(k.stone, mode === 'dark' ? .95 : .7)}" stroke="${a(k.shade, .6)}" stroke-width="3">${[40, 330, 700, 1080, 1520].map((x) => `<path d="M${x} 400c-12-120 8-250 22-320 14 70 34 200 22 320z"/>`).join('')}</g><g fill="${a(k.flame, .85)}">${loop(6, 260, (x) => `<circle cx="${x + 120}" cy="270" r="6"/>`)}</g><g fill="${a(k.bone, .5)}">${loop(12, 130, (x) => `<path d="M${x + 30} 400v-40a14 14 0 0 1 28 0v40z"/>`)}</g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 90%,${a(k.flame, .16)},transparent 45%),linear-gradient(180deg,var(--venus-bg),var(--venus-raised) 85%)`,
      scene: svg(`<g fill="${k.shade}" opacity=".12"><path d="M40 10c10 12 10 22 0 30-10-8-10-18 0-30zM40 40c-14 6-20 18-14 30 8-4 12-14 14-30zM40 40c14 6 20 18 14 30-8-4-12-14-14-30z"/></g>`, '0 0 80 80'), sceneSize: '80px 80px',
      ornament: `radial-gradient(circle,${a(k.bone, .35)} 0 1px,transparent 1.8px),radial-gradient(circle,${a(k.flame, .3)} 0 1.4px,transparent 2.2px)`, ornamentSize: '43px 61px,89px 97px',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 40%,${a(k.velvet, .6)})`, line: `linear-gradient(${k.flame},${k.bone} 40%,${k.shade} 70%,${k.flame})`, lineSpeed: '5s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(ossuary)},linear-gradient(${k.velvet},${k.stone})`,
      panelRight: `${scenery(filigree)},radial-gradient(circle at 50% 50%,${a(k.flame, .12)},transparent 60%),linear-gradient(${k.velvet},${k.niche})`,
      panelDetail: sheen, panelGlyphs: ['☠', '✟'],
      panelInteriors: { left: { object: board(flame), aspect: BOARD, origin: '50% 80%', animation: `venus-found-catacomb-flicker 1.9s ${ease} infinite` }, right: { object: board(drip), aspect: BOARD, origin: '50% 5%', animation: 'venus-found-inner-velvet-catacomb 4.6s cubic-bezier(.5,0,.8,.6) infinite' } },
      panelOverlay: `radial-gradient(ellipse at 50% 80%,${a(k.flame, .45)},transparent 55%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .35,
      portraitRadius: '12px 12px 40px 40px / 12px 12px 26px 26px',
      plaque: `linear-gradient(${k.stone},${a(k.stone, .82)})`, plaqueText: mode === 'dark' ? k.bone : '#2a221b', plaqueBorder: k.shade, plaqueShadow: `0 0 0 4px ${k.niche},0 0 0 5px ${k.shade},0 12px 28px ${a(k.velvet, .7)}`, plaqueInset: `linear-gradient(${k.shade},${k.shade}) 0 5px/100% 1px no-repeat,linear-gradient(${k.shade},${k.shade}) 0 calc(100% - 5px)/100% 1px no-repeat`, plaqueRadius: '2px',
      headingFont: fonts.blackletter, bodyFont: fonts.crimson, monoFont: fonts.mono,
      ...motion('velvet-catacomb', {
        scene: [36, ease, '0%,100%{transform:scale(1.03)}50%{transform:scale(1.05) translate3d(-1%,1%,0)}'],
        world: [14, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:20px 122px,-30px 194px,0 0}'],
        inner: [4.6, 'cubic-bezier(.5,0,.8,.6)', '0%{transform:scaleY(.2);opacity:0}15%{opacity:1}55%{transform:scaleY(1.4)}70%{transform:translateY(60%) scaleY(1);opacity:1}100%{transform:translateY(160%) scaleY(.8);opacity:0}'],
        overlay: [2.4, ease, '0%,100%{filter:opacity(.7)}30%{filter:opacity(1)}60%{filter:opacity(.8)}'],
        extra: '@keyframes venus-found-catacomb-flicker{0%,100%{transform:scale(1,1) skewX(0)}20%{transform:scale(.94,1.08) skewX(-4deg)}45%{transform:scale(1.04,.94) skewX(3deg)}70%{transform:scale(.97,1.05) skewX(-2deg)}}',
      }),
    }
  })

/* ───────────── Chrome Basilica ───────────── */
interface ChromeInk { hi: string; lo: string; h1: string; h2: string; h3: string; smoke: string; line: string; base: string }
const chrome = world<ChromeInk>('chrome-basilica', 'Chrome Basilica', 'A liquid-chrome cathedral from the year 2000: a mirror rose window, holographic foil, organ pipes, and incense rising in iridescent curls.', ['cyber','cathedral','chrome','y2k','holographic','iridescent','organ','incense'],
  { skin: skin('#121419','#1b1e25','#252a33','#f2f5fa','#a7afbd','#e3e8ef','#b08bff'), ink: { hi: '#f4f7fb', lo: '#5a6272', h1: '#b08bff', h2: '#6ff7ff', h3: '#ff8ad8', smoke: '#c9d0dc', line: '#0b0c10', base: '#1b1e25' } },
  { skin: skin('#eef0f4','#ffffff','#e1e5ec','#1b1f28','#5a6272','#4a5262','#6c46d6'), ink: { hi: '#ffffff', lo: '#8a93a3', h1: '#8a5cf0', h2: '#1fb8c9', h3: '#e0559f', smoke: '#8a93a3', line: '#2a2f3a', base: '#e6e9ef' } },
  (k, mode) => {
    const metal = `<linearGradient id="m" x2="1" y2="1"><stop offset="0" stop-color="${k.hi}"/><stop offset=".45" stop-color="${k.lo}"/><stop offset=".55" stop-color="${k.hi}"/><stop offset="1" stop-color="${k.lo}"/></linearGradient>`
    const rose = svg(`<defs>${metal}</defs><circle cx="80" cy="80" r="62" fill="${a(k.line, .6)}" stroke="url(#m)" stroke-width="9"/>${[0, 45, 90, 135].map((r) => `<ellipse cx="80" cy="80" rx="12" ry="50" fill="none" stroke="url(#m)" stroke-width="4" transform="rotate(${r} 80 80)"/>`).join('')}<circle cx="80" cy="80" r="16" fill="${k.h1}" stroke="url(#m)" stroke-width="4"/><g fill="${a(k.h2, .7)}"><circle cx="80" cy="36" r="6"/><circle cx="124" cy="80" r="6"/><circle cx="80" cy="124" r="6"/><circle cx="36" cy="80" r="6"/></g><g fill="${a(k.line, .6)}" stroke="url(#m)" stroke-width="5"><path d="M30 236v-66a14 14 0 0 1 28 0v66"/><path d="M102 236v-66a14 14 0 0 1 28 0v66"/></g><path d="M66 236v-80a14 14 0 0 1 28 0v80" fill="${a(k.h3, .4)}" stroke="url(#m)" stroke-width="5"/>`)
    const pipes = svg(`<defs><linearGradient id="p" x2="1" y2="0"><stop offset="0" stop-color="${k.lo}"/><stop offset=".35" stop-color="${k.hi}"/><stop offset=".6" stop-color="${k.lo}"/><stop offset="1" stop-color="${k.hi}"/></linearGradient></defs>${[[18, 90], [38, 60], [58, 30], [80, 14], [102, 30], [122, 60], [142, 90]].map(([x, y]) => `<rect x="${x - 8}" y="${y}" width="16" height="${200 - y}" rx="8" fill="url(#p)"/><path d="M${x - 5} ${y + 40}h10l-5 8z" fill="${k.line}"/>`).join('')}<rect x="4" y="198" width="152" height="40" rx="6" fill="${k.lo}" stroke="${k.hi}" stroke-width="2"/><path d="M70 198c0-10 20-10 20 0" fill="${k.h1}"/><circle cx="80" cy="192" r="7" fill="url(#p)"/>`)
    const smoke = svg(`<g fill="none" stroke-linecap="round" stroke-width="5"><path d="M80 186c-12-18 14-26 0-44s12-28 0-48" stroke="${a(k.h1, .55)}"/><path d="M84 180c10-14-10-24 2-40s-8-26 4-42" stroke="${a(k.h2, .45)}"/><path d="M76 176c-8-16 8-22-2-36" stroke="${a(k.h3, .45)}"/></g>`)
    const skyline = `<defs><linearGradient id="c" x2="1" y2="0"><stop offset="0" stop-color="${k.lo}"/><stop offset=".5" stop-color="${k.hi}"/><stop offset="1" stop-color="${k.lo}"/></linearGradient></defs><g fill="url(#c)" opacity=".75">${loop(9, 180, (x) => `<path d="M${x + 40} 400V${240 - (x % 360) / 6}l40-${130 - (x % 540) / 10} 40 ${130 - (x % 540) / 10}V400z"/>`)}</g><circle cx="800" cy="210" r="120" fill="${a(k.h1, .15)}" stroke="url(#c)" stroke-width="16"/>${loop(8, 45, (r) => `<ellipse cx="800" cy="210" rx="20" ry="100" fill="none" stroke="${a(k.h2, .5)}" stroke-width="5" transform="rotate(${r} 800 210)"/>`)}`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 0,${a(k.h1, .25)},transparent 50%),radial-gradient(ellipse at 100% 100%,${a(k.h2, .16)},transparent 45%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `linear-gradient(${a(k.h2, .09)} 1px,transparent 1px),linear-gradient(90deg,${a(k.h1, .09)} 1px,transparent 1px),linear-gradient(115deg,transparent 30%,${a(k.hi, .06)} 45%,transparent 60%)`, sceneSize: '64px 64px,64px 64px,auto',
      ornament: `radial-gradient(circle at 35% 30%,${a(k.hi, .7)} 0 3px,${a(k.h1, .18)} 5px 16px,transparent 18px),radial-gradient(circle at 35% 30%,${a(k.hi, .6)} 0 2px,${a(k.h2, .16)} 4px 10px,transparent 12px)`, ornamentSize: '190px 230px,110px 150px',
      paper: `conic-gradient(from 0deg at 50% 50%,${a(k.h1, .05)},${a(k.h2, .05)},${a(k.h3, .05)},${a(k.h1, .05)})`, line: `linear-gradient(${k.h1},${k.h2} 33%,${k.h3} 66%,${k.hi})`, lineSpeed: '2.6s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(rose)},linear-gradient(${k.base},${a(k.line, .8)})`,
      panelRight: `${scenery(pipes)},linear-gradient(${a(k.h1, .18)},transparent 50%),linear-gradient(${k.base},${a(k.line, .7)})`,
      panelDetail: sheen, panelGlyphs: ['✧', '⚚'],
      panelInteriors: { left: { object: `linear-gradient(115deg,transparent 30%,${a(k.h1, .5)} 42%,${a(k.h2, .5)} 50%,${a(k.h3, .5)} 58%,transparent 70%) 0 0/300% 100%`, animation: 'venus-found-chrome-foil 5s linear infinite' }, right: { object: board(smoke), aspect: BOARD, origin: '50% 78%', animation: `venus-found-inner-chrome-basilica 5.5s ${ease} infinite` } },
      panelOverlay: `linear-gradient(180deg,${a(k.hi, .4)},transparent 35%)`, panelOverlayBlend: mode === 'dark' ? 'overlay' : 'soft-light', panelOverlayOpacity: .5,
      portraitRadius: '999px',
      plaque: `linear-gradient(180deg,${k.hi},${k.lo} 55%,${k.hi})`, plaqueText: k.line, plaqueBorder: k.h1, plaqueShadow: `0 0 0 2px ${k.h2},0 0 0 5px ${a(k.h1, .5)},0 10px 24px ${a(k.line, .5)}`, plaqueInset: `linear-gradient(90deg,${a(k.h1, .35)},${a(k.h2, .35)},${a(k.h3, .35)})`, plaqueRadius: '999px',
      headingFont: fonts.orbit, bodyFont: fonts.manrope, monoFont: fonts.fragment,
      ...motion('chrome-basilica', {
        scene: [20, 'linear', 'from{background-position:0 0,0 0,-100% 0;filter:hue-rotate(0)}to{background-position:64px 64px,64px 64px,200% 0;filter:hue-rotate(60deg)}'],
        world: [26, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:0 -460px,0 -300px,0 0}'],
        inner: [5.5, ease, '0%{transform:translateY(8%) scale(.8);opacity:0}25%{opacity:1}100%{transform:translateY(-22%) scale(1.25);opacity:0}'],
        overlay: [8, ease, '0%,100%{transform:translateY(-6%)}50%{transform:translateY(6%)}'],
        extra: '@keyframes venus-found-chrome-foil{from{background-position:100% 0;filter:hue-rotate(0)}to{background-position:-100% 0;filter:hue-rotate(90deg)}}',
      }),
    }
  })

/* ───────────── The Orchid Engine ───────────── */
interface OrchidInk { pipe: string; pipeShade: string; copper: string; petal: string; petalDeep: string; lip: string; steam: string; glass: string; deep: string }
const orchid = world<OrchidInk>('orchid-engine', 'The Orchid Engine', 'A brass cultivation engine hissing steam through copper pipes to coax one enormous magenta orchid awake under glass.', ['steampunk','orchid','brass','steam','botanical','machinery','cloche','magenta'],
  { skin: skin('#1a0a19','#281027','#381636','#ffeefa','#d2a9c6','#ff6cc8','#d9a441'), ink: { pipe: '#d9a441', pipeShade: '#8a5f1f', copper: '#c96a3a', petal: '#ff6cc8', petalDeep: '#b0187a', lip: '#ffe16a', steam: '#f5e6f0', glass: '#3a1a38', deep: '#12060f' } },
  { skin: skin('#fbeef6','#fffafd','#f2dbe8','#3a0f30','#7a5470','#b0187a','#8a6414'), ink: { pipe: '#c9962f', pipeShade: '#7a5518', copper: '#b5552a', petal: '#ec5bb4', petalDeep: '#8a0f5f', lip: '#f2c200', steam: '#9a8494', glass: '#f6e3ef', deep: '#e9cfe0' } },
  (k, mode) => {
    const works = svg(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-4 200h40v-70h50V60h40" stroke="${k.pipeShade}" stroke-width="16"/><path d="M-4 200h40v-70h50V60h40" stroke="${k.pipe}" stroke-width="10"/><path d="M164 150h-30v60H100" stroke="${k.copper}" stroke-width="12"/></g><g fill="${k.pipeShade}">${[[36, 200], [36, 130], [86, 130], [86, 60], [134, 150], [134, 210]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9"/><circle cx="${x}" cy="${y}" r="4" fill="${k.pipe}"/>`).join('')}</g><circle cx="126" cy="60" r="14" fill="none" stroke="${k.pipe}" stroke-width="4"/><path d="M126 46v28M112 60h28" stroke="${k.pipe}" stroke-width="3"/><circle cx="58" cy="170" r="20" fill="${k.steam}" stroke="${k.pipe}" stroke-width="4"/><path d="M58 170l10-10" stroke="${k.petalDeep}" stroke-width="3"/><g fill="${k.pipe}">${loop(6, 6, (x) => `<circle cx="${43 + x}" cy="${156 + (x % 12 ? 0 : 1)}" r="1.2"/>`)}</g>`)
    const puff = svg(`<g fill="${k.steam}"><circle cx="126" cy="36" r="9"/><circle cx="136" cy="30" r="7"/><circle cx="118" cy="28" r="6"/><circle cx="128" cy="22" r="6"/></g>`)
    const cloche = svg(`<path d="M24 208V110a56 56 0 0 1 112 0v98z" fill="${a(k.glass, .5)}" stroke="${k.steam}" stroke-opacity=".6" stroke-width="3"/><path d="M40 100c4-30 30-44 50-44" stroke="${k.steam}" stroke-opacity=".5" stroke-width="4" fill="none"/><circle cx="80" cy="52" r="6" fill="${k.pipe}"/><rect x="14" y="206" width="132" height="14" rx="4" fill="${k.pipe}"/><rect x="26" y="220" width="108" height="14" rx="3" fill="${k.pipeShade}"/><path d="M80 206c0-30-6-50 0-80" stroke="#4f8a4a" stroke-width="4" fill="none"/><path d="M80 190c-20-6-30-2-36 8 14 4 26 2 36-8zM80 178c18-8 30-4 36 6-14 4-26 2-36-6z" fill="#4f8a4a"/>`)
    const bloom = svg(`<g transform="translate(80 110)"><g fill="${k.petal}" stroke="${k.petalDeep}" stroke-width="1.5">${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="0" cy="-22" rx="12" ry="24" transform="rotate(${r})"/>`).join('')}</g><path d="M-12 4c4 18 20 18 24 0-8 6-16 6-24 0z" fill="${k.lip}" stroke="${k.petalDeep}"/><circle r="6" fill="${k.petalDeep}"/><circle r="2.5" fill="${k.lip}"/></g>`)
    const skyline = `<g fill="none" stroke="${a(k.pipe, .65)}" stroke-width="22" stroke-linecap="round"><path d="M0 330h300v-120h260v60h300M1600 300h-260v-90h-200"/></g><g fill="${a(k.pipeShade, .9)}">${[[300, 330], [560, 210], [1340, 300], [1140, 210]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="22"/>`).join('')}</g><g transform="translate(1000 170)" fill="${a(k.petal, .6)}">${loop(5, 72, (r) => `<ellipse cy="-70" rx="46" ry="90" transform="rotate(${r})"/>`)}<circle r="30" fill="${a(k.lip, .8)}"/></g><path d="M1000 260v140" stroke="${a('#4f8a4a', .8)}" stroke-width="10"/><g fill="${a(k.steam, .22)}"><circle cx="860" cy="250" r="40"/><circle cx="910" cy="215" r="30"/><circle cx="600" cy="170" r="34"/></g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 70% 20%,${a(k.petal, .22)},transparent 45%),linear-gradient(160deg,var(--venus-raised),var(--venus-bg) 65%)`,
      scene: `radial-gradient(circle,${a(k.pipe, .4)} 0 2px,transparent 2.8px),repeating-linear-gradient(0deg,transparent 0 118px,${a(k.pipe, .12)} 119px 127px,transparent 128px 240px)`, sceneSize: '48px 48px,auto',
      ornament: `radial-gradient(ellipse 6px 12px,${a(k.petal, .45)} 0 80%,transparent),radial-gradient(ellipse 5px 9px,${a(k.lip, .3)} 0 80%,transparent)`, ornamentSize: '131px 173px,89px 127px',
      paper: `radial-gradient(ellipse at 50% 100%,${a(k.pipe, .12)},transparent 50%)`, line: `linear-gradient(${k.petal},${k.pipe} 45%,${k.copper} 75%,${k.petal})`, lineSpeed: '4.2s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(works)},radial-gradient(circle at 80% 20%,${a(k.steam, .15)},transparent 40%),linear-gradient(${k.glass},${k.deep})`,
      panelRight: `${scenery(cloche)},radial-gradient(circle at 50% 46%,${a(k.petal, .25)},transparent 45%),linear-gradient(${k.glass},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['⚙', '❀'],
      panelInteriors: { left: { object: board(puff), aspect: BOARD, origin: '80% 13%', animation: `venus-found-orchid-steam 3.2s ${ease} infinite` }, right: { object: board(bloom), aspect: BOARD, origin: '50% 45.8%', animation: `venus-found-inner-orchid-engine 6s ${ease} infinite` } },
      panelOverlay: `linear-gradient(100deg,transparent 40%,${a(k.pipe, .5)} 50%,transparent 60%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .3,
      portraitRadius: '62% 38% 62% 38% / 50% 50% 50% 50%',
      plaque: `linear-gradient(${k.pipe},${k.pipeShade})`, plaqueText: '#2a1206', plaqueBorder: k.pipeShade, plaqueShadow: `0 0 0 3px ${k.petalDeep},0 0 0 5px ${k.pipe},0 10px 24px ${a(k.deep, .7)}`, plaqueInset: studs(`${k.pipeShade} 0 3px,#ffe7a8 3.5px 4.5px,transparent 5px`), plaqueRadius: '18px 4px',
      headingFont: fonts.marcellus, bodyFont: fonts.alegreya, monoFont: fonts.mono,
      ...motion('orchid-engine', {
        scene: [32, ease, '0%,100%{transform:scale(1.03)}50%{transform:scale(1.06) translate3d(-1%,0,0)}'],
        world: [22, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:262px 346px,178px 254px,0 0}'],
        inner: [6, ease, '0%,100%{transform:scale(.84) rotate(-6deg)}50%{transform:scale(1.06) rotate(5deg)}'],
        overlay: [7, ease, '0%,100%{transform:translateX(-30%)}50%{transform:translateX(30%)}'],
        extra: '@keyframes venus-found-orchid-steam{0%{transform:translateY(0) scale(.5);opacity:0}20%{opacity:.95}100%{transform:translateY(-12%) scale(1.6);opacity:0}}',
      }),
    }
  })

/* ───────────── Monsoon Palace ───────────── */
interface MonsoonInk { stone: string; shade: string; saffron: string; rose: string; rain: string; water: string; lotus: string; leaf: string; sky: string }
const monsoonPalace = world<MonsoonInk>('monsoon-palace', 'Monsoon Palace', 'A sandstone palace in the first monsoon: rain slanting through carved jharokha lattices, marigold garlands, and ripples across a lotus pool.', ['monsoon','palace','sandstone','rain','lotus','marigold','jharokha','saffron'],
  { skin: skin('#182025','#212b31','#2c383f','#fbf1e6','#b8b3aa','#ffae1f','#f08a8a'), ink: { stone: '#d98f6f', shade: '#8a4f3f', saffron: '#ffae1f', rose: '#f08a8a', rain: '#b9d3e0', water: '#274652', lotus: '#ffb3c4', leaf: '#3f8a5a', sky: '#34454f' } },
  { skin: skin('#f4efe6','#fffaf2','#eadfcf','#2a2320','#6e635a','#bf6a06','#c2475a'), ink: { stone: '#eaa98a', shade: '#a85a42', saffron: '#f09a00', rose: '#d9536a', rain: '#5f8aa0', water: '#9cc6d3', lotus: '#ff8fab', leaf: '#2f7a4a', sky: '#c8d6dc' } },
  (k, mode) => {
    const arch = 'M36 200V116c0-10 8-12 8-22 0-12 10-14 14-24 6-14 16-16 22-26 6 10 16 12 22 26 4 10 14 12 14 24 0 10 8 12 8 22v84z'
    const jharokha = svg(`<rect x="6" y="20" width="148" height="220" fill="${k.stone}"/><path d="M40 20c0-18 80-18 80 0z" fill="${k.shade}"/><circle cx="80" cy="4" r="4" fill="${k.saffron}"/><path d="${arch}" fill="${k.sky}" stroke="${k.shade}" stroke-width="4"/><g stroke="${a(k.shade, .8)}" stroke-width="1.6">${loop(9, 12, (x) => `<path d="M${36 + x} 200l24 -40M${60 + x} 200l-24 -40"/>`)}</g><rect x="22" y="200" width="116" height="12" fill="${k.shade}"/><g fill="${k.stone}" stroke="${k.shade}" stroke-width="2"><path d="M30 212h16l-6 22h-4zM114 212h16l-6 22h-4zM72 212h16l-6 22h-4z"/></g><g fill="${k.saffron}">${loop(8, 14, (x) => `<circle cx="${31 + x}" cy="${40 + Math.abs(x - 49) / 3}" r="4"/>`)}</g>`)
    const rain = svg(`<path d="M20 0L12 24" stroke="${k.rain}" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>`, '0 0 24 48')
    const pool = svg(`<rect x="0" y="120" width="160" height="120" fill="${k.water}"/><g fill="none" stroke="${a(k.rain, .4)}" stroke-width="1.2">${loop(6, 16, (y) => `<path d="M0 ${130 + y}q40 -6 80 0t80 0"/>`)}</g><g fill="${k.leaf}"><ellipse cx="34" cy="168" rx="22" ry="7"/><ellipse cx="124" cy="196" rx="24" ry="8"/><ellipse cx="60" cy="214" rx="18" ry="6"/></g><g fill="${k.lotus}" stroke="${k.rose}" stroke-width="1">${[[36, 160], [122, 188]].map(([x, y]) => `<path d="M${x} ${y}c-6-10-2-18 0-22 2 4 6 12 0 22z"/><path d="M${x} ${y}c-12-4-16-12-14-16 6 0 12 6 14 16z"/><path d="M${x} ${y}c12-4 16-12 14-16-6 0-12 6-14 16z"/>`).join('')}</g><path d="M0 120h160" stroke="${k.stone}" stroke-width="6"/><g fill="${k.stone}"><rect x="0" y="228" width="160" height="12"/><rect x="0" y="100" width="160" height="20"/></g><path d="M0 100h160" stroke="${k.shade}" stroke-width="2"/>`)
    const ripple = svg(`<g fill="none" stroke="${k.rain}" stroke-width="2"><ellipse cx="80" cy="160" rx="30" ry="8"/><ellipse cx="80" cy="160" rx="18" ry="5" opacity=".7"/></g>`)
    const skyline = `<g fill="${a(k.rain, .25)}"><ellipse cx="300" cy="60" rx="240" ry="54"/><ellipse cx="1300" cy="50" rx="280" ry="58"/><ellipse cx="800" cy="30" rx="200" ry="40"/></g><g fill="${a(k.stone, .9)}"><rect x="200" y="240" width="1200" height="160"/>${[300, 560, 800, 1040, 1300].map((x, i) => `<rect x="${x - 60}" y="${i === 2 ? 150 : 190}" width="120" height="${i === 2 ? 90 : 50}"/><path d="M${x - 60} ${i === 2 ? 150 : 190}c0-${i === 2 ? 90 : 60} 120-${i === 2 ? 90 : 60} 120 0z"/>`).join('')}</g><g stroke="${a(k.saffron, .95)}" stroke-width="6">${[300, 560, 800, 1040, 1300].map((x, i) => `<path d="M${x} ${i === 2 ? 70 : 132}v-22"/>`).join('')}</g><g fill="${a(k.shade, .65)}">${loop(20, 56, (x) => `<path d="M${230 + x} 400v-90a14 14 0 0 1 28 0v90z"/>`)}</g><path d="M200 250h1200" stroke="${a(k.saffron, .6)}" stroke-width="6" stroke-dasharray="4 14"/>`
    return {
      backdrop: `${landmark(skyline)},linear-gradient(180deg,${a(k.sky, .9)},var(--venus-bg) 70%)`,
      scene: `repeating-linear-gradient(104deg,transparent 0 22px,${a(k.rain, .16)} 23px 24px),radial-gradient(circle,${a(k.rain, .3)} 0 1.2px,transparent 2px)`, sceneSize: 'auto,31px 41px',
      ornament: `radial-gradient(ellipse 60px 30px at 50% 0,transparent 0 82%,${a(k.saffron, .45)} 84% 94%,transparent 96%),radial-gradient(circle,${a(k.rose, .4)} 0 2px,transparent 3px)`, ornamentSize: '120px 60px,67px 89px',
      paper: `linear-gradient(transparent 75%,${a(k.water, .3)})`, line: `linear-gradient(${k.saffron},${k.rose} 40%,${k.rain} 75%,${k.saffron})`, lineSpeed: '3.4s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(jharokha)},linear-gradient(${k.sky},${k.water})`,
      panelRight: `${scenery(pool)},linear-gradient(${k.sky},${k.water})`,
      panelDetail: sheen, panelGlyphs: ['☔', '❀'],
      panelInteriors: { left: { object: `${rain} 0 0/24px 48px`, aspect: BOARD, animation: 'venus-found-monsoon-rain .9s linear infinite' }, right: { object: board(ripple), aspect: BOARD, origin: '50% 66.7%', animation: `venus-found-inner-monsoon-palace 2.8s ${ease} infinite` } },
      panelOverlay: `repeating-linear-gradient(104deg,transparent 0 12px,${a(k.rain, .3)} 13px 14px)`, panelOverlayBlend: 'normal', panelOverlayOpacity: .35,
      portraitRadius: '50% 50% 12px 12px / 46% 46% 12px 12px',
      plaque: `linear-gradient(${k.saffron},${a(k.saffron, .85)})`, plaqueText: '#3a1a0a', plaqueBorder: k.rose, plaqueShadow: `0 0 0 3px ${k.shade},0 0 0 6px ${k.rose},0 10px 24px ${a('#000000', .45)}`, plaqueInset: 'repeating-linear-gradient(45deg,#ffffff26 0 1px,transparent 1px 8px),repeating-linear-gradient(-45deg,#ffffff26 0 1px,transparent 1px 8px)', plaqueRadius: '999px 999px 8px 8px',
      headingFont: `"Yatra One",${fonts.alegreya}`, bodyFont: fonts.literata, monoFont: fonts.mono,
      ...motion('monsoon-palace', {
        scene: [3, 'linear', 'from{background-position:0 0,0 0}to{background-position:-60px 240px,-31px 123px}'],
        world: [9, ease, '0%,100%{background-position:0 0,0 0}50%{background-position:30px 4px,20px 40px}'],
        inner: [2.8, ease, '0%{transform:scale(.3);opacity:0}15%{opacity:1}100%{transform:scale(1.7);opacity:0}'],
        overlay: [1.2, 'linear', 'from{transform:translate(0,0)}to{transform:translate(-3%,12%)}'],
        extra: '@keyframes venus-found-monsoon-rain{from{background-position:0 0}to{background-position:-24px 96px}}',
      }),
    }
  })

/* ───────────── Solar Garden of the Ancients ───────────── */
interface SolarInk { white: string; cobalt: string; cobaltDeep: string; lemon: string; terracotta: string; leaf: string; sun: string; ground: string }
const solar = world<SolarInk>('solar-garden', 'Solar Garden of the Ancients', 'A whitewashed Mediterranean courtyard at noon: cobalt majolica tiles, a grinning tile sun, lemon trees in terracotta, and heat that hums.', ['mediterranean','majolica','sun','lemon','terracotta','cobalt','courtyard','summer'],
  { skin: skin('#26100a','#351a10','#462417','#fff4e0','#d9b8a0','#ffe04d','#4f86ff'), ink: { white: '#f6ecd8', cobalt: '#4f86ff', cobaltDeep: '#1f3f9e', lemon: '#ffe04d', terracotta: '#e8683c', leaf: '#5fae5a', sun: '#ffb627', ground: '#3a1c10' } },
  { skin: skin('#fbf7ee','#ffffff','#f1e6d2','#2a1a10','#6e5a48','#1f4fbf','#c24f25'), ink: { white: '#ffffff', cobalt: '#1f4fbf', cobaltDeep: '#12306e', lemon: '#f5c800', terracotta: '#c24f25', leaf: '#3f8a3a', sun: '#f59e0b', ground: '#efe2cc' } },
  (k, mode) => {
    const tile = svg(`<rect width="40" height="40" fill="${k.white}"/><g fill="${k.cobalt}"><circle cx="20" cy="10" r="6"/><circle cx="20" cy="30" r="6"/><circle cx="10" cy="20" r="6"/><circle cx="30" cy="20" r="6"/></g><circle cx="20" cy="20" r="4" fill="${k.lemon}"/><g fill="${k.cobaltDeep}"><path d="M0 0h6L0 6zM40 0h-6l6 6zM0 40h6l-6-6zM40 40h-6l6-6z"/></g><rect width="40" height="40" fill="none" stroke="${k.cobaltDeep}" stroke-width="1"/>`, '0 0 40 40')
    const sunFace = svg(`<g transform="translate(80 120)"><g fill="${k.sun}">${loop(16, 22.5, (r) => `<path d="M-7 -40L0 -62 7 -40z" transform="rotate(${r})"/>`)}</g><circle r="40" fill="${k.lemon}" stroke="${k.terracotta}" stroke-width="4"/><circle cx="-13" cy="-6" r="4" fill="${k.cobaltDeep}"/><circle cx="13" cy="-6" r="4" fill="${k.cobaltDeep}"/><path d="M-16 10q16 16 32 0" stroke="${k.terracotta}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="-22" cy="8" r="5" fill="${a(k.terracotta, .5)}"/><circle cx="22" cy="8" r="5" fill="${a(k.terracotta, .5)}"/></g>`)
    const tree = svg(`<path d="M52 196h56l-8 40H60z" fill="${k.terracotta}"/><rect x="46" y="188" width="68" height="12" rx="3" fill="${k.terracotta}" stroke="${k.cobaltDeep}"/><path d="M58 206h44" stroke="${k.cobalt}" stroke-width="3"/><path d="M80 188V120" stroke="#7a4a2a" stroke-width="6"/><circle cx="80" cy="96" r="50" fill="${k.leaf}"/><circle cx="58" cy="80" r="26" fill="${a(k.leaf, .8)}"/><circle cx="104" cy="104" r="24" fill="${a(k.leaf, .85)}"/><g fill="${k.lemon}" stroke="${a(k.terracotta, .6)}">${[[60, 70], [96, 76], [74, 116], [112, 110], [48, 104]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="5"/>`).join('')}</g>`)
    const lemon = svg(`<ellipse cx="100" cy="92" rx="7" ry="5" fill="${k.lemon}" stroke="${a(k.terracotta, .6)}"/><path d="M100 87l3-4" stroke="${k.leaf}" stroke-width="2"/>`)
    const skyline = `<circle cx="1320" cy="90" r="80" fill="${a(k.sun, .65)}"/><g fill="${a(k.white, .95)}">${[[80, 260, 180, 140], [260, 220, 160, 180], [420, 280, 200, 120], [700, 240, 180, 160], [900, 270, 160, 130], [1080, 230, 200, 170], [1300, 280, 220, 120]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</g><path d="M700 240a90 70 0 0 1 180 0z" fill="${a(k.cobalt, .9)}"/><path d="M790 170v-40M776 150h28" stroke="${a(k.cobalt, .9)}" stroke-width="6"/><g fill="${a(k.cobalt, .75)}">${[[120, 300], [300, 260], [470, 320], [760, 290], [940, 310], [1140, 280], [1360, 320]].map(([x, y]) => `<rect x="${x}" y="${y}" width="30" height="40" rx="15"/>`).join('')}</g><g fill="${a(k.leaf, .9)}"><path d="M620 400c-10-120 0-220 16-280 16 60 26 160 16 280z"/><path d="M1240 400c-10-100 0-180 14-230 14 50 22 130 14 230z"/></g><g fill="${a(k.terracotta, .8)}"><rect x="0" y="390" width="1600" height="10"/></g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(circle at 80% 0,${a(k.sun, .35)},transparent 40%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 75%)`,
      scene: svg(`<g opacity=".13"><rect width="80" height="80" fill="none" stroke="${k.cobalt}" stroke-width="2"/><g fill="${k.cobalt}"><circle cx="40" cy="22" r="10"/><circle cx="40" cy="58" r="10"/><circle cx="22" cy="40" r="10"/><circle cx="58" cy="40" r="10"/></g></g>`, '0 0 80 80'), sceneSize: '80px 80px',
      ornament: `repeating-linear-gradient(118deg,transparent 0 140px,${a(k.sun, .09)} 141px 210px,transparent 211px 330px)`, ornamentSize: 'auto',
      paper: `radial-gradient(ellipse at 50% 0,${a(k.lemon, .12)},transparent 60%)`, line: `linear-gradient(${k.lemon},${k.terracotta} 40%,${k.cobalt} 75%,${k.lemon})`, lineSpeed: '3.2s',
      panelLayout: 'fixed',
      panelLeft: `${tile} 0 0/40px 40px,linear-gradient(${k.white},${k.white})`,
      panelRight: `${scenery(tree)},radial-gradient(circle at 80% 10%,${a(k.sun, .35)},transparent 45%),linear-gradient(${k.ground},${a(k.ground, .85)})`,
      panelDetail: sheen, panelGlyphs: ['☀', '❋'],
      panelInteriors: { left: { object: board(sunFace), aspect: BOARD, animation: 'venus-found-inner-solar-garden 30s linear infinite' }, right: { object: board(lemon), aspect: BOARD, animation: `venus-found-solar-drop 6s ${ease} infinite` } },
      panelOverlay: `radial-gradient(circle at 50% 50%,${a(k.sun, .45)},transparent 55%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .3,
      portraitRadius: '8px 40px 8px 40px',
      plaque: k.white, plaqueText: k.cobaltDeep, plaqueBorder: k.cobalt, plaqueShadow: `0 0 0 3px ${k.cobalt},0 0 0 6px ${k.white},0 0 0 8px ${k.terracotta},0 12px 24px ${a('#000000', .35)}`, plaqueInset: studs(`${k.lemon} 0 4px,${k.cobalt} 4.5px 5.5px,transparent 6px`), plaqueRadius: '4px',
      headingFont: fonts.fraunces, bodyFont: fonts.workSans, monoFont: fonts.mono,
      ...motion('solar-garden', {
        scene: [50, 'linear', 'from{background-position:0 0}to{background-position:80px 80px}'],
        world: [18, ease, '0%,100%{transform:translate3d(-2%,0,0)}50%{transform:translate3d(2%,1%,0)}'],
        inner: [30, 'linear', 'to{transform:rotate(360deg)}'],
        overlay: [6, ease, '0%,100%{transform:scale(.8)}50%{transform:scale(1.25)}'],
        extra: '@keyframes venus-found-solar-drop{0%{transform:translateY(0) rotate(0);opacity:0}6%,50%{transform:translateY(0) rotate(0);opacity:1}70%{transform:translateY(38%) rotate(90deg)}78%{transform:translateY(33%) rotate(110deg)}86%,94%{transform:translateY(38%) rotate(120deg);opacity:1}100%{transform:translateY(38%) rotate(120deg);opacity:0}}',
      }),
    }
  })

export const FOUNDING_THEMES: VenusThemeFamily[] = [coronation, mirage, conservatory, opal, catacomb, chrome, orchid, monsoonPalace, solar]
