import type { VenusThemeFamily } from './types'
import { a, board, BOARD, ease, fonts, landmark, motion as kitMotion, scenery, sheen, skin, studs, svg, world, type MotionSpec } from './kit'

/** The atlas realms: medieval and fantasy worlds, each with dedicated dark and light artwork. */
const motion = (id: string, m: MotionSpec) => kitMotion('atlas', id, m)
const loop = (n: number, step: number, draw: (i: number) => string) => Array.from({ length: n }, (_, i) => draw(i * step)).join('')

/* ───────────── Reliquary of the Hollow Saint ───────────── */
interface RelicInk { blood: string; deep: string; gold: string; goldShade: string; verdigris: string; glow: string; vellum: string }
const reliquary = world<RelicInk>('reliquary-saint', 'Reliquary of the Hollow Saint', 'Oxblood enamel and tarnished gold: a jewelled casket cradling a glowing relic, a turning halo, and god-rays through a faceless saint.', ['medieval','reliquary','saint','cathedral','gold','oxblood','halo','gothic'],
  { skin: skin('#1a080c','#2a0f15','#3d1520','#fbefd6','#cfae9e','#e2b457','#5aa58f'), ink: { blood: '#4a0f1c', deep: '#1a080c', gold: '#e2b457', goldShade: '#8a6526', verdigris: '#5aa58f', glow: '#fff1c2', vellum: '#f5ecd6' } },
  { skin: skin('#f5ecd6','#fffaf0','#eadcc0','#3a0f18','#7a5a50','#8e1f33','#2d7a66'), ink: { blood: '#9a2639', deep: '#efe3c8', gold: '#b8892a', goldShade: '#7a5a1c', verdigris: '#2d7a66', glow: '#fff6d0', vellum: '#fffaf0' } },
  (k, mode) => {
    const casket = svg(`<path d="M22 120L80 70l58 50z" fill="${k.gold}" stroke="${k.goldShade}" stroke-width="3"/><g fill="${k.blood}">${loop(5, 11, (x) => `<circle cx="${58 + x}" cy="104" r="3"/>`)}</g><rect x="22" y="120" width="116" height="80" fill="${k.blood}" stroke="${k.gold}" stroke-width="4"/><g fill="none" stroke="${k.gold}" stroke-width="3">${[34, 62, 90, 118].map((x) => `<path d="M${x} 196v-40a8 8 0 0 1 16 0v40"/>`).join('')}</g><rect x="54" y="140" width="52" height="40" rx="20" fill="${a(k.glow, .85)}" stroke="${k.gold}" stroke-width="3"/><path d="M62 160h36M68 154v12M92 154v12" stroke="${k.goldShade}" stroke-width="4" stroke-linecap="round"/><rect x="16" y="200" width="128" height="14" fill="${k.gold}"/><g fill="${k.verdigris}"><circle cx="30" cy="128" r="4"/><circle cx="130" cy="128" r="4"/><circle cx="30" cy="192" r="4"/><circle cx="130" cy="192" r="4"/></g><g fill="${k.gold}"><path d="M28 214h14l-4 18h-6zM118 214h14l-4 18h-6z"/></g>`)
    const halo = svg(`<g transform="translate(80 44)"><circle r="22" fill="none" stroke="${k.gold}" stroke-width="4"/><circle r="15" fill="${a(k.glow, .5)}"/><g stroke="${k.gold}" stroke-width="2.4" stroke-linecap="round">${loop(12, 30, (r) => `<path d="M0 -26v-9" transform="rotate(${r})"/>`)}</g><g fill="${k.verdigris}">${loop(4, 90, (r) => `<circle cy="-22" r="2.6" transform="rotate(${r + 45})"/>`)}</g></g>`)
    const saint = svg(`<path d="M20 236V90C20 30 140 30 140 90v146z" fill="${a(k.blood, .85)}" stroke="${k.gold}" stroke-width="5"/><g stroke="${k.goldShade}" stroke-width="3" fill="none"><path d="M20 150h120M80 40v196"/></g><circle cx="80" cy="84" r="28" fill="${a(k.glow, .9)}" stroke="${k.gold}" stroke-width="4"/><ellipse cx="80" cy="92" rx="13" ry="16" fill="${a(k.deep, .5)}"/><path d="M50 236c0-60 10-92 30-104 20 12 30 44 30 104z" fill="${a(k.verdigris, .8)}" stroke="${k.gold}" stroke-width="3"/><path d="M70 170l10-10 10 10" stroke="${k.gold}" stroke-width="3" fill="none"/>`)
    const skyline = `<g fill="${a(k.blood, .92)}"><path d="M520 400V200l80-140 80 140v200zM920 400V200l80-140 80 140v200zM660 400V240h280v160z"/><path d="M660 240l140-110 140 110z"/></g><circle cx="800" cy="270" r="58" fill="${a(k.gold, .45)}" stroke="${a(k.gold, .9)}" stroke-width="6"/><g stroke="${a(k.gold, .8)}" stroke-width="4">${loop(8, 45, (r) => `<path d="M800 270v-56" transform="rotate(${r} 800 270)"/>`)}</g><g fill="${a(k.gold, .85)}"><path d="M596 60h8v-30h-8zM586 40h28v8h-28zM996 60h8v-30h-8zM986 40h28v8h-28z"/></g><g fill="${a(k.verdigris, .5)}">${loop(9, 70, (x) => `<path d="M${40 + x} 400V330l30-40 30 40v70zM${1250 + x / 2} 400V340l20-30 20 30v60z"/>`)}</g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 0,${a(k.gold, .18)},transparent 50%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `${svg(`<g fill="none" stroke="${k.gold}" stroke-width="2" opacity=".14"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="30" r="18"/><circle cx="50" cy="70" r="18"/><circle cx="30" cy="50" r="18"/><circle cx="70" cy="50" r="18"/></g>`, '0 0 100 100')},radial-gradient(circle,${a(k.gold, .45)} 0 1.2px,transparent 2px)`, sceneSize: '100px 100px,29px 37px',
      ornament: `repeating-linear-gradient(115deg,transparent 0 90px,${a(k.glow, .07)} 91px 150px,transparent 151px 260px)`, ornamentSize: 'auto',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 45%,${a(k.deep, .55)})`, line: `linear-gradient(${k.glow},${k.gold} 35%,${k.blood} 65%,${k.verdigris})`, lineSpeed: '4.6s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(casket)},radial-gradient(circle at 50% 20%,${a(k.glow, .25)},transparent 40%),linear-gradient(${k.deep},${a(k.blood, .7)})`,
      panelRight: `${scenery(saint)},linear-gradient(${k.deep},${a(k.blood, .5)})`,
      panelDetail: sheen, panelGlyphs: ['☩', '✣'],
      panelInteriors: { left: { object: board(halo), aspect: BOARD, origin: '50% 18.3%', animation: 'venus-atlas-inner-reliquary-saint 16s linear infinite' }, right: { object: `conic-gradient(from 160deg at 50% 0,transparent 0 12deg,${a(k.glow, .35)} 15deg 19deg,transparent 22deg 34deg,${a(k.glow, .28)} 37deg 41deg,transparent 44deg)`, origin: '50% 0', animation: `venus-atlas-reliquary-rays 9s ${ease} infinite` } },
      panelOverlay: `radial-gradient(circle at 50% 30%,${a(k.glow, .5)},transparent 50%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'soft-light', panelOverlayOpacity: .3,
      portraitRadius: '50% 50% 6% 6% / 70% 70% 6% 6%',
      plaque: `linear-gradient(${k.blood},${mode === 'dark' ? '#2a0810' : '#6e1826'})`, plaqueText: '#fff1c2', plaqueBorder: k.gold, plaqueShadow: `0 0 0 3px ${k.gold},0 0 0 6px ${k.verdigris},0 0 30px ${a(k.gold, .35)}`, plaqueInset: studs(`${k.verdigris} 0 4px,${k.gold} 4.5px 6px,transparent 6.5px`), plaqueRadius: '40px 40px 4px 4px',
      headingFont: fonts.uncial, bodyFont: fonts.garamond, monoFont: fonts.mono,
      ...motion('reliquary-saint', {
        scene: [60, 'linear', 'from{background-position:0 0,0 0}to{background-position:100px 100px,-29px 74px}'],
        world: [14, ease, '0%,100%{transform:translateX(-3%)}50%{transform:translateX(3%)}'],
        inner: [16, 'linear', 'to{transform:rotate(360deg)}'],
        overlay: [5, ease, '0%,100%{transform:scale(.85)}50%{transform:scale(1.15)}'],
        extra: '@keyframes venus-atlas-reliquary-rays{0%,100%{transform:rotate(-8deg);opacity:.7}50%{transform:rotate(8deg);opacity:1}}',
      }),
    }
  })

/* ───────────── The Peacock Sultanate ───────────── */
interface PeacockInk { deep: string; teal: string; sapphire: string; gold: string; eye: string; bronze: string; silk: string; moon: string }
const peacock = world<PeacockInk>('peacock-sultanate', 'The Peacock Sultanate', 'A moonlit jewel court: a peacock unfurling a hundred sapphire eyes behind a carved star lattice, and lantern light sliding through the jali.', ['court','peacock','sultanate','jali','lattice','sapphire','teal','moonlight'],
  { skin: skin('#031a1c','#082a2a','#0e3a38','#f4f0d6','#a9c9bf','#e9c46a','#1fc7a6'), ink: { deep: '#03201f', teal: '#1fc7a6', sapphire: '#2f6fe6', gold: '#e9c46a', eye: '#0b2f7a', bronze: '#8a6a2a', silk: '#0b3d3a', moon: '#fff6d8' } },
  { skin: skin('#eef7f2','#ffffff','#dcefe6','#0b2a28','#4a6a64','#138a74','#9a7411'), ink: { deep: '#dcefe6', teal: '#149a80', sapphire: '#1f4fbf', gold: '#b8892a', eye: '#123a8a', bronze: '#8a6a2a', silk: '#bfe3d6', moon: '#ffffff' } },
  (k, mode) => {
    const star = (x: number, y: number, s: number) => `<path d="M${x} ${y - s}l${s * .3} ${s * .7} ${s * .7} ${s * .3} -${s * .7} ${s * .3} -${s * .3} ${s * .7} -${s * .3} -${s * .7} -${s * .7} -${s * .3} ${s * .7} -${s * .3}z"/>`
    const jali = svg(`<path d="M10 236V100c0-40 30-60 70-80 40 20 70 40 70 80v136z" fill="${k.silk}" stroke="${k.gold}" stroke-width="4"/><g fill="${a(k.deep, .9)}" stroke="${k.gold}" stroke-width="1.2">${[60, 96, 132, 168, 204].map((y) => [34, 62, 90, 118].map((x) => star(x + (y % 72 ? 14 : 0), y, 12)).join('')).join('')}</g><circle cx="80" cy="44" r="8" fill="${k.gold}"/>`)
    const feather = (r: number, len: number) => `<g transform="rotate(${r} 80 214)"><path d="M80 214V${214 - len}" stroke="${k.bronze}" stroke-width="1.4"/><ellipse cx="80" cy="${214 - len}" rx="9" ry="13" fill="${k.teal}"/><ellipse cx="80" cy="${216 - len}" rx="6" ry="8" fill="${k.gold}"/><ellipse cx="80" cy="${218 - len}" rx="3.4" ry="4.6" fill="${k.eye}"/></g>`
    const fan = svg(`${[-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map((r) => feather(r, 118)).join('')}${[-66, -44, -22, 0, 22, 44, 66].map((r) => feather(r, 78)).join('')}<ellipse cx="80" cy="200" rx="10" ry="22" fill="${k.sapphire}"/><circle cx="80" cy="176" r="8" fill="${k.sapphire}"/><path d="M86 176l8 2-8 2z" fill="${k.gold}"/><path d="M78 168l-2-8M82 168l2-8" stroke="${k.sapphire}" stroke-width="1.6"/>`)
    const pavilion = svg(`<circle cx="118" cy="36" r="16" fill="${k.moon}"/><circle cx="126" cy="30" r="14" fill="${k.deep}"/><path d="M34 120c0-34 22-44 46-64 24 20 46 30 46 64z" fill="${k.gold}"/><path d="M80 56v-18" stroke="${k.gold}" stroke-width="3"/><rect x="30" y="120" width="100" height="10" fill="${k.bronze}"/>${[36, 62, 88, 114].map((x) => `<rect x="${x}" y="130" width="10" height="80" fill="${k.gold}"/>`).join('')}<path d="M24 210h112v14H24z" fill="${k.bronze}"/><g fill="${k.moon}" opacity=".85">${[[20, 30], [60, 18], [140, 70], [16, 80]].map(([x, y]) => star(x, y, 4)).join('')}</g>`)
    const lantern = svg(`<path d="M80 130v-40" stroke="${k.gold}" stroke-width="2"/><path d="M68 138l12-10 12 10v22l-12 10-12-10z" fill="${a(k.moon, .9)}" stroke="${k.gold}" stroke-width="2"/><circle cx="80" cy="150" r="24" fill="${a(k.gold, .25)}"/>`)
    const skyline = `<g fill="${a(k.silk, .95)}"><rect x="300" y="250" width="1000" height="150"/>${[[400, 60], [800, 120], [1200, 60]].map(([x, r]) => `<rect x="${x - r * .8}" y="${250 - r}" width="${r * 1.6}" height="${r}"/><path d="M${x - r} ${250 - r}c0-${r * 1.4} ${r}-${r * 1.6} ${r}-${r * 1.9}c0 ${r * .3} ${r} ${r * .5} ${r} ${r * 1.9}z"/>`).join('')}<path d="M180 400V200h30v200zM1390 400V200h30v200zM175 200c0-40 40-40 40 0zM1385 200c0-40 40-40 40 0z"/></g><g fill="${a(k.gold, .75)}">${loop(18, 56, (x) => `<path d="M${320 + x} 400v-80a12 12 0 0 1 24 0v80z"/>`)}</g><g fill="${a(k.teal, .55)}">${[[400, 60], [800, 120], [1200, 60]].map(([x, r]) => `<circle cx="${x}" cy="${250 - r * 2.9}" r="8"/>`).join('')}</g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 80% 0,${a(k.moon, .14)},transparent 40%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: svg(`<g fill="none" stroke="${k.gold}" stroke-width="1.4" opacity=".16">${star(30, 30, 20)}<circle cx="30" cy="30" r="24"/></g>`, '0 0 60 60'), sceneSize: '60px 60px',
      ornament: `radial-gradient(ellipse 9px 13px,${a(k.teal, .35)} 0 60%,${a(k.gold, .35)} 62% 80%,transparent 82%),radial-gradient(circle,${a(k.moon, .4)} 0 1px,transparent 1.8px)`, ornamentSize: '113px 151px,47px 59px',
      paper: `radial-gradient(ellipse at 50% 120%,${a(k.teal, .2)},transparent 55%)`, line: `linear-gradient(${k.teal},${k.gold} 40%,${k.sapphire} 75%,${k.teal})`, lineSpeed: '3.8s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(jali)},radial-gradient(circle at 50% 60%,${a(k.teal, .2)},transparent 60%),linear-gradient(${k.deep},${k.silk})`,
      panelRight: `${scenery(pavilion)},linear-gradient(${k.deep},${k.silk})`,
      panelDetail: sheen, panelGlyphs: ['◈', '☾'],
      panelInteriors: { left: { object: board(fan), aspect: BOARD, origin: '50% 89%', animation: `venus-atlas-inner-peacock-sultanate 7s ${ease} infinite` }, right: { object: board(lantern), aspect: BOARD, origin: '50% 37.5%', animation: `venus-atlas-peacock-lantern 4.2s ${ease} infinite` } },
      panelOverlay: `radial-gradient(circle,${a(k.moon, .5)} 0 2px,transparent 3px) 0 0/22px 22px`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'normal', panelOverlayOpacity: .22,
      portraitRadius: '50% 50% 42% 42% / 72% 72% 28% 28%',
      plaque: `linear-gradient(${k.teal},${mode === 'dark' ? '#0b5a50' : '#0f7a66'})`, plaqueText: '#fff8dc', plaqueBorder: k.gold, plaqueShadow: `0 0 0 3px ${k.gold},0 0 0 6px ${k.sapphire},0 10px 26px ${a('#000000', .45)}`, plaqueInset: `repeating-linear-gradient(90deg,transparent 0 18px,${a(k.gold, .3)} 18px 20px)`, plaqueRadius: '999px 999px 12px 12px',
      headingFont: `"Marcellus SC",${fonts.marcellus}`, bodyFont: fonts.garamond, monoFont: fonts.mono,
      ...motion('peacock-sultanate', {
        scene: [40, 'linear', 'from{background-position:0 0}to{background-position:60px 60px}'],
        world: [26, ease, '0%,100%{background-position:0 0,0 0,0 0}50%{background-position:60px -40px,-20px 30px,0 0}'],
        inner: [7, ease, '0%,100%{transform:scaleX(.42) scaleY(.8)}40%,70%{transform:scaleX(1) scaleY(1)}'],
        overlay: [12, 'linear', 'from{transform:translate(0,0)}to{transform:translate(22px,22px)}'],
        extra: '@keyframes venus-atlas-peacock-lantern{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}',
      }),
    }
  })

/* ───────────── Plague Court Masquerade ───────────── */
interface PlagueInk { deep: string; velvet: string; porcelain: string; crack: string; poison: string; candle: string; ash: string }
const plague = world<PlagueInk>('plague-masquerade', 'Plague Court Masquerade', 'A quarantined ball in mourning violet: a porcelain beak mask drifting over velvet swags, poison-green sand counting down, and ash falling like confetti.', ['masquerade','plague','mask','mourning','velvet','poison','hourglass','ball'],
  { skin: skin('#140d19','#1f1427','#2c1c37','#f3ece2','#b8a9c0','#efe7da','#a4e35a'), ink: { deep: '#170f1c', velvet: '#3a1f48', porcelain: '#efe7da', crack: '#8a7f74', poison: '#a4e35a', candle: '#ffd89a', ash: '#6a6070' } },
  { skin: skin('#f1ecef','#ffffff','#e4dae6','#2a1a32','#6a5a72','#4d2f5c','#5f8f1c'), ink: { deep: '#e4dae6', velvet: '#8a5aa0', porcelain: '#ffffff', crack: '#8a7f74', poison: '#6fa82a', candle: '#e89a2a', ash: '#9a90a0' } },
  (k, mode) => {
    const swags = svg(`${[0, 1, 2].map((i) => `<path d="M${i * 54 - 4} 0q27 34 54 0v-4h-54z" fill="${k.velvet}"/><path d="M${i * 54 - 4} 2q27 30 54 0" fill="none" stroke="${k.candle}" stroke-width="2"/>`).join('')}<path d="M0 0v236h18c-6-60 6-150-4-236zM160 0v236h-18c6-60-6-150 4-236z" fill="${k.velvet}"/><g fill="${k.candle}">${[40, 80, 120].map((x) => `<circle cx="${x}" cy="220" r="3"/><rect x="${x - 3}" y="222" width="6" height="14" fill="${k.porcelain}"/>`).join('')}</g>`)
    const mask = svg(`<g transform="translate(80 110)"><path d="M-34 -20c0-26 68-26 68 0 0 20-10 30-34 34-24-4-34-14-34-34z" fill="${k.porcelain}" stroke="${k.crack}" stroke-width="1.6"/><path d="M-6 8c20 6 40 20 60 44-26-6-46-14-62-28z" fill="${k.porcelain}" stroke="${k.crack}" stroke-width="1.6"/><circle cx="-14" cy="-10" r="10" fill="${k.poison}" stroke="${k.deep}" stroke-width="3"/><circle cx="14" cy="-10" r="10" fill="${k.poison}" stroke="${k.deep}" stroke-width="3"/><path d="M-30 -30c20-10 40-10 60 0" stroke="${k.velvet}" stroke-width="6" fill="none"/><path d="M-20 14l6 -4M4 30l-8 2" stroke="${k.crack}"/></g>`)
    const glass = svg(`<rect x="36" y="30" width="88" height="10" rx="3" fill="${k.candle}"/><rect x="36" y="200" width="88" height="10" rx="3" fill="${k.candle}"/><path d="M44 40v6c0 30 28 44 28 74s-28 44-28 74v6M116 40v6c0 30-28 44-28 74s28 44 28 74v6" fill="${a(k.porcelain, .12)}" stroke="${k.porcelain}" stroke-width="2.5"/><path d="M52 58c6 24 22 36 28 52 6-16 22-28 28-52z" fill="${k.poison}"/><path d="M50 200c4-18 18-30 30-32 12 2 26 14 30 32z" fill="${k.poison}"/><path d="M36 30V210M124 30V210" stroke="${k.candle}" stroke-width="3"/>`)
    const sand = svg(`<rect x="79" y="110" width="2" height="70" fill="${k.poison}"/>${loop(4, 16, (y) => `<circle cx="80" cy="${120 + y}" r="1.6" fill="${k.poison}"/>`)}`)
    const skyline = `<g fill="${a(k.velvet, .95)}"><rect x="200" y="200" width="700" height="200"/><path d="M1100 400V120h80v280zM1090 120l50-70 50 70z"/><rect x="1300" y="260" width="260" height="140"/></g><g fill="${a(k.candle, .6)}">${loop(9, 70, (x) => `<path d="M${240 + x} 280v-40a16 16 0 0 1 32 0v40zM${240 + x} 360v-40a16 16 0 0 1 32 0v40z"/>`)}</g><path d="M1120 180h40v30h-40z" fill="${a(k.porcelain, .85)}"/><path d="M0 400c200-30 400-30 600 0s400 30 600 0 300-20 400 0" fill="${a(k.deep, .9)}"/><g transform="translate(560 120)"><path d="M-34 -20c0-26 68-26 68 0 0 20-10 30-34 34-24-4-34-14-34-34z" fill="${a(k.porcelain, .5)}"/><path d="M-6 8c20 6 40 20 60 44-26-6-46-14-62-28z" fill="${a(k.porcelain, .5)}"/></g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 100%,${a(k.poison, .12)},transparent 45%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: svg(`<g fill="${k.velvet}" opacity=".45"><path d="M30 6c8 10 8 20 0 26-8-6-8-16 0-26zM30 32c-12 4-16 14-10 22 6-4 10-12 10-22zM30 32c12 4 16 14 10 22-6-4-10-12-10-22z"/></g>`, '0 0 60 60'), sceneSize: '60px 60px',
      ornament: `radial-gradient(circle,${a(k.ash, .55)} 0 1.4px,transparent 2.2px),radial-gradient(circle,${a(k.porcelain, .3)} 0 1px,transparent 1.8px)`, ornamentSize: '53px 71px,37px 43px',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 45%,${a(k.deep, .55)})`, line: `linear-gradient(${k.porcelain},${k.poison} 40%,${k.velvet} 75%,${k.porcelain})`, lineSpeed: '5.2s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(swags)},radial-gradient(ellipse at 50% 45%,${a(k.candle, .18)},transparent 55%),linear-gradient(${k.deep},${a(k.velvet, .6)})`,
      panelRight: `${scenery(glass)},radial-gradient(circle at 50% 60%,${a(k.poison, .15)},transparent 50%),linear-gradient(${k.deep},${a(k.velvet, .5)})`,
      panelDetail: sheen, panelGlyphs: ['☽', '⧗'],
      panelInteriors: { left: { object: board(mask), aspect: BOARD, origin: '50% 46%', animation: `venus-atlas-inner-plague-masquerade 8s ${ease} infinite` }, right: { object: scenery(sand), animation: 'venus-atlas-plague-sand 1s linear infinite' } },
      panelOverlay: `radial-gradient(circle,${a(k.ash, .7)} 0 1.4px,transparent 2px) 0 0/19px 27px`, panelOverlayBlend: 'normal', panelOverlayOpacity: .35,
      portraitRadius: '50% / 44%',
      plaque: `linear-gradient(${k.porcelain},${mode === 'dark' ? '#d8cfc2' : '#efe7da'})`, plaqueText: '#2a1a32', plaqueBorder: k.velvet, plaqueShadow: `0 0 0 3px ${k.velvet},0 0 0 5px ${k.poison},0 12px 28px ${a('#000000', .5)}`, plaqueInset: studs(`${k.poison} 0 4px,${k.deep} 4.5px 5.5px,transparent 6px`), plaqueRadius: '50% 50% 50% 50% / 80% 80% 20% 20%',
      headingFont: fonts.cormorant, bodyFont: fonts.garamond, monoFont: fonts.mono,
      ...motion('plague-masquerade', {
        scene: [30, ease, '0%,100%{transform:scale(1.03)}50%{transform:scale(1.06) rotate(.4deg)}'],
        world: [16, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:26px 142px,-18px 86px,0 0}'],
        inner: [8, ease, '0%,100%{transform:translate(-4%,3%) rotate(-7deg)}50%{transform:translate(4%,-4%) rotate(6deg)}'],
        overlay: [8, 'linear', 'from{transform:translateY(-10%)}to{transform:translateY(10%)}'],
        extra: '@keyframes venus-atlas-plague-sand{from{background-position:center 0}to{background-position:center 16px}}',
      }),
    }
  })

/* ───────────── Siege Engine Codex ───────────── */
interface SiegeInk { paper: string; line: string; red: string; iron: string; deep: string }
const siege = world<SiegeInk>('siege-codex', 'Siege Engine Codex', 'A war engineer’s notebook: iron-gall trebuchets, measured trajectories in vermilion, and a counterweight that will not stop firing.', ['codex','siege','trebuchet','engineering','parchment','war','diagram','vermilion'],
  { skin: skin('#1e1810','#2a2116','#382c1c','#f2e3bf','#bfa988','#efd9a7','#e0472b'), ink: { paper: '#2a2014', line: '#efd9a7', red: '#e0472b', iron: '#8a7a5a', deep: '#1a140c' } },
  { skin: skin('#efe2bf','#faf1d8','#e3d2a6','#2a1e10','#6a5a3e','#3a2a18','#b3261e'), ink: { paper: '#efe2bf', line: '#3a2a18', red: '#b3261e', iron: '#7a6a4a', deep: '#e0cfa6' } },
  (k, mode) => {
    const frame = svg(`<g fill="none" stroke="${k.line}" stroke-width="2.4" stroke-linejoin="round"><path d="M30 214l50-110 50 110M40 190h80M52 164h56"/><path d="M14 214h132"/><circle cx="40" cy="222" r="8"/><circle cx="120" cy="222" r="8"/></g><circle cx="80" cy="104" r="5" fill="${k.red}"/><g stroke="${k.red}" stroke-width="1" fill="none" stroke-dasharray="3 3"><path d="M8 104h40M112 104h40"/><path d="M146 30v184"/></g><g fill="${k.red}" font-family="Georgia,serif" font-style="italic" font-size="9"><text x="10" y="100">pivot · xii</text><text x="118" y="40">h</text><text x="88" y="236">a · b · c</text></g><g stroke="${a(k.line, .35)}" stroke-width=".6">${loop(12, 20, (y) => `<path d="M0 ${y + 6}h160"/>`)}</g>`)
    const arm = svg(`<g stroke="${k.line}" stroke-width="3" stroke-linecap="round"><path d="M80 104L34 30"/><path d="M80 104l22 36"/></g><rect x="92" y="136" width="22" height="22" fill="${k.iron}" stroke="${k.line}" stroke-width="2" transform="rotate(30 103 147)"/><path d="M34 30q-10 10-4 24" stroke="${k.line}" stroke-width="1.4" fill="none"/><circle cx="30" cy="54" r="4" fill="${k.red}"/>`)
    const chart = svg(`<g stroke="${a(k.line, .3)}" stroke-width=".6">${loop(9, 20, (x) => `<path d="M${x + 4} 20v200"/>`)}${loop(11, 20, (y) => `<path d="M0 ${y + 20}h160"/>`)}</g><path d="M14 200Q70 20 146 150" fill="none" stroke="${k.red}" stroke-width="2" stroke-dasharray="5 4"/><g fill="none" stroke="${k.line}" stroke-width="2"><path d="M128 200v-46h8v8h8v-8h8v46z"/><path d="M8 200h152"/></g><text x="16" y="36" fill="${k.line}" font-family="Georgia,serif" font-style="italic" font-size="10">parabola · lxx passus</text><circle cx="14" cy="200" r="3" fill="${k.red}"/>`)
    const shot = svg(`<circle cx="14" cy="200" r="5" fill="${k.red}"/><circle cx="14" cy="200" r="9" fill="none" stroke="${k.red}" stroke-opacity=".4"/>`)
    const skyline = `<g fill="none" stroke="${a(k.line, .55)}" stroke-width="4"><path d="M900 400V220h40v-30h30v30h40v-30h30v30h40v-30h30v30h40v180M1020 400v-70a30 30 0 0 1 60 0v70M880 220V140h40v-20h20v20h20v80M1180 220V120h40v-20h20v20h20v120"/><path d="M200 400l100-180 100 180M230 340h140M300 220l-140-100M300 220l60 60"/></g><path d="M160 120Q620-40 960 200" fill="none" stroke="${a(k.red, .65)}" stroke-width="4" stroke-dasharray="14 10"/><circle cx="160" cy="120" r="10" fill="${a(k.red, .75)}"/><g fill="${a(k.red, .6)}" font-family="Georgia,serif" font-style="italic" font-size="22"><text x="480" y="80">ccx passus</text><text x="1100" y="90">castellum</text></g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 50%,${a(k.line, .06)},transparent 60%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `linear-gradient(${a(k.line, .08)} 1px,transparent 1px),linear-gradient(90deg,${a(k.line, .08)} 1px,transparent 1px),radial-gradient(circle at 70% 40%,transparent 0 120px,${a(k.red, .12)} 121px 122px,transparent 123px)`, sceneSize: '24px 24px,24px 24px,auto',
      ornament: `repeating-radial-gradient(circle at 20% 80%,transparent 0 58px,${a(k.line, .08)} 59px 60px),linear-gradient(35deg,transparent 49.8%,${a(k.red, .12)} 50% 50.3%,transparent 50.5%)`, ornamentSize: 'auto,auto',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 50%,${a(k.deep, .5)})`, line: `linear-gradient(${k.red},${k.line} 50%,${k.iron})`, lineSpeed: '4s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(frame)},linear-gradient(${k.paper},${a(k.paper, .92)})`,
      panelRight: `${scenery(chart)},linear-gradient(${k.paper},${a(k.paper, .92)})`,
      panelDetail: sheen, panelGlyphs: ['⚙', '⌖'],
      panelInteriors: { left: { object: scenery(arm), origin: '50% 43.3%', animation: 'venus-atlas-inner-siege-codex 4s cubic-bezier(.7,0,.2,1) infinite' }, right: { object: scenery(shot), animation: 'venus-atlas-siege-flight 4s cubic-bezier(.3,0,.7,1) infinite' } },
      panelOverlay: `linear-gradient(90deg,transparent 0 48%,${a(k.red, .25)} 50%,transparent 52%)`, panelOverlayBlend: 'normal', panelOverlayOpacity: .5,
      portraitRadius: '2px',
      plaque: `linear-gradient(${mode === 'dark' ? '#efd9a7' : '#faf1d8'},${mode === 'dark' ? '#d9bf88' : '#e3d2a6'})`, plaqueText: '#2a1e10', plaqueBorder: k.iron, plaqueShadow: `0 0 0 2px ${k.line},4px 4px 0 ${k.red}`, plaqueInset: studs(`${k.red} 0 6px,${a(k.red, .5)} 6.5px 7.5px,transparent 8px`, `transparent 0 1px,transparent 2px`, 16), plaqueRadius: '2px',
      headingFont: '"Stardos Stencil","Stencil","Impact",sans-serif', bodyFont: fonts.libre, monoFont: fonts.typewriter,
      ...motion('siege-codex', {
        scene: [48, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:24px 24px,24px 24px,0 0}'],
        world: [20, ease, '0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg) scale(1.03)}'],
        inner: [4, 'cubic-bezier(.7,0,.2,1)', '0%,40%{transform:rotate(0)}55%{transform:rotate(112deg)}62%{transform:rotate(100deg)}80%,100%{transform:rotate(0)}'],
        overlay: [6, 'linear', 'from{transform:translateX(-40%)}to{transform:translateX(40%)}'],
        extra: '@keyframes venus-atlas-siege-flight{0%,50%{transform:translate(0,0);opacity:0}52%{opacity:1}62%{transform:translate(18%,-24%)}72%{transform:translate(38%,-30%)}84%{transform:translate(62%,-18%)}94%{transform:translate(75%,-7%);opacity:1}100%{transform:translate(75%,-7%) scale(2);opacity:0}}',
      }),
    }
  })

/* ───────────── Frostbound Feudal Court ───────────── */
interface FrostInk { deep: string; ice: string; iceShade: string; ember: string; au1: string; au2: string; snow: string; stone: string }
const frost = world<FrostInk>('frost-court', 'Frostbound Feudal Court', 'A glacier court under the aurora: a throne of splintered ice, snow drifting through the great hall, and one ember brazier that refuses to die.', ['winter','frost','ice','aurora','throne','glacier','snow','ember'],
  { skin: skin('#081322','#0e1e33','#152a45','#eef9ff','#a9c2d6','#bfefff','#ff8a3d'), ink: { deep: '#0a1624', ice: '#bfefff', iceShade: '#5a9ec0', ember: '#ff8a3d', au1: '#5cffc8', au2: '#b48cff', snow: '#ffffff', stone: '#23364d' } },
  { skin: skin('#eaf5fb','#ffffff','#d6eaf4','#0f2a3d','#4f6a80','#1f6f93','#c2551c'), ink: { deep: '#d6eaf4', ice: '#ffffff', iceShade: '#5f9fc4', ember: '#e0621c', au1: '#2fbf8f', au2: '#8a5cf0', snow: '#ffffff', stone: '#8fb0c8' } },
  (k, mode) => {
    const throne = svg(`<g fill="${a(k.ice, .9)}" stroke="${k.iceShade}" stroke-width="1.5" stroke-linejoin="round"><path d="M50 150L40 40l14 30 8-50 10 44 8-60 8 60 10-44 8 50 14-30-10 110z"/><path d="M40 150h80v24H40z"/><path d="M30 174h100l8 20H22z"/></g><g stroke="${k.snow}" stroke-width="1.2" opacity=".8"><path d="M62 60l6 60M92 70l-6 60M80 30v100"/></g><rect x="10" y="194" width="140" height="46" fill="${k.stone}"/><g fill="${k.iceShade}">${loop(7, 20, (x) => `<rect x="${x + 12}" y="194" width="16" height="4"/>`)}</g><path d="M70 128h20v22H70z" fill="${a(k.ember, .5)}"/>`)
    const snow = svg(`<g fill="${k.snow}"><circle cx="8" cy="10" r="2"/><circle cx="30" cy="34" r="1.4"/><circle cx="20" cy="54" r="2.4"/><circle cx="36" cy="6" r="1.2"/></g>`, '0 0 40 64')
    const court = svg(`<g fill="${k.stone}"><path d="M0 240V170l20-30 20 30v70zM120 240V160l20-40 20 40v80zM44 240V180l36-60 36 60v60z"/></g><g fill="${k.ember}"><rect x="76" y="196" width="8" height="12"/></g><path d="M80 186c6 6 6 12 0 14-6-2-6-8 0-14z" fill="${k.ember}"/><g stroke="${k.iceShade}" stroke-width="2"><path d="M20 140V110M140 120V88"/></g><path d="M20 110h16l-4 6 4 6H20zM140 88h16l-4 6 4 6h-16z" fill="${k.ember}"/><g fill="${k.snow}" opacity=".7">${[[20, 20], [60, 40], [110, 16], [140, 50], [90, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4"/>`).join('')}</g>`)
    const aurora = svg(`<defs><linearGradient id="au" x2="0" y2="1"><stop offset="0" stop-color="${k.au2}" stop-opacity="0"/><stop offset=".4" stop-color="${k.au2}" stop-opacity=".6"/><stop offset=".8" stop-color="${k.au1}" stop-opacity=".8"/><stop offset="1" stop-color="${k.au1}" stop-opacity="0"/></linearGradient></defs><path d="M-20 30c30 10 50-8 80 4s60 20 120-4v90c-60 20-90 6-120-4s-50 10-80 0z" fill="url(#au)"/><path d="M-20 60c40 6 60-10 90 0s50 16 110-2v40c-60 16-80 2-110-4s-50 8-90 2z" fill="url(#au)" opacity=".7"/>`)
    const skyline = `<path d="M0 400L220 180l140 120 200-220 180 200 160-140 220 200 200-160 280 220z" fill="${a(k.iceShade, .38)}"/><g fill="${a(k.ice, .88)}"><path d="M620 400V200l30-80 30 80v200zM920 400V180l30-100 30 100v220zM680 400V260h240v140z"/></g><g fill="${a(k.ice, .92)}">${loop(10, 24, (x) => `<path d="M${680 + x} 260l6 ${18 + (x % 3) * 6} 6-${18 + (x % 3) * 6}z"/>`)}</g><rect x="780" y="320" width="40" height="80" fill="${a(k.ember, .65)}"/><g fill="none" stroke="${a(k.au1, .35)}" stroke-width="30" stroke-linecap="round"><path d="M100 80c200 40 400-40 700 0s500 40 700-20"/></g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 0,${a(k.au1, .16)},transparent 45%),radial-gradient(ellipse at 20% 10%,${a(k.au2, .14)},transparent 40%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `repeating-linear-gradient(115deg,transparent 0 60px,${a(k.ice, .08)} 61px 63px),repeating-linear-gradient(65deg,transparent 0 90px,${a(k.ice, .06)} 91px 93px)`, sceneSize: 'auto,auto',
      ornament: `radial-gradient(circle,${a(k.snow, .8)} 0 1.6px,transparent 2.4px),radial-gradient(circle,${a(k.snow, .5)} 0 1px,transparent 1.8px)`, ornamentSize: '67px 89px,41px 53px',
      paper: `linear-gradient(180deg,${a(k.au1, .06)},transparent 40%)`, line: `linear-gradient(${k.ice},${k.au1} 35%,${k.au2} 65%,${k.ember})`, lineSpeed: '4.2s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(throne)},radial-gradient(circle at 50% 40%,${a(k.ice, .2)},transparent 55%),linear-gradient(${k.deep},${k.stone})`,
      panelRight: `${scenery(court)},linear-gradient(${k.deep},${a(k.stone, .7)})`,
      panelDetail: sheen, panelGlyphs: ['❄', '✧'],
      panelInteriors: { left: { object: `${snow} 0 0/40px 64px`, animation: 'venus-atlas-frost-snow 6s linear infinite' }, right: { object: board(aurora), aspect: BOARD, animation: `venus-atlas-inner-frost-court 7s ${ease} infinite` } },
      panelOverlay: `linear-gradient(135deg,${a(k.ice, .4)},transparent 30%,transparent 70%,${a(k.ice, .3)})`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'normal', panelOverlayOpacity: .35,
      portraitRadius: '30% / 12%',
      plaque: `linear-gradient(${a(k.ice, .92)},${a(k.iceShade, .85)})`, plaqueText: '#0a1624', plaqueBorder: k.ice, plaqueShadow: `0 0 0 3px ${k.stone},0 0 18px ${a(k.au1, .5)},0 0 0 5px ${a(k.ice, .6)}`, plaqueInset: `linear-gradient(135deg,transparent 45%,${a(k.snow, .6)} 50%,transparent 55%)`, plaqueRadius: '2px 18px 2px 18px',
      headingFont: '"Cinzel","Trajan Pro","Perpetua Titling MT",serif', bodyFont: fonts.spectral, monoFont: fonts.mono,
      ...motion('frost-court', {
        scene: [28, ease, '0%,100%{transform:scale(1.03)}50%{transform:scale(1.06) translate3d(1%,0,0)}'],
        world: [18, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:-67px 178px,41px 106px,0 0}'],
        inner: [7, ease, '0%,100%{transform:skewX(-10deg) translateX(-6%);filter:hue-rotate(0)}50%{transform:skewX(10deg) translateX(6%);filter:hue-rotate(40deg)}'],
        overlay: [10, ease, '0%,100%{transform:translateX(-10%)}50%{transform:translateX(10%)}'],
        extra: '@keyframes venus-atlas-frost-snow{from{background-position:0 0}to{background-position:-20px 128px}}',
      }),
    }
  })

/* ───────────── The Alchemist-King's Cabinet ───────────── */
interface AlchemyInk { deep: string; gold: string; goldShade: string; mercury: string; elixir: string; glass: string; wood: string; flame: string }
const alchemist = world<AlchemyInk>('alchemist-king', 'The Alchemist-King’s Cabinet', 'A midnight laboratory in violet and gold: an alembic bubbling green elixir over a spirit flame, and an astrolabe turning the heavens by hand.', ['alchemy','laboratory','astrolabe','alembic','elixir','occult','gold','violet'],
  { skin: skin('#130e20','#1d152e','#2a1f40','#f7f0e0','#bfb3d0','#ffd166','#5cf29a'), ink: { deep: '#140f22', gold: '#ffd166', goldShade: '#9a7420', mercury: '#cfd6e0', elixir: '#5cf29a', glass: '#2a2244', wood: '#4a2f1a', flame: '#8ab4ff' } },
  { skin: skin('#f4f0e8','#fffdf8','#e8e1d4','#231a36','#625a72','#6b4fb0','#1f9a5a'), ink: { deep: '#e8e1d4', gold: '#b8860b', goldShade: '#7a5a14', mercury: '#6a7484', elixir: '#1fae5f', glass: '#f6f2fb', wood: '#8a5a34', flame: '#3f6fe0' } },
  (k, mode) => {
    const alembic = svg(`<rect x="10" y="212" width="140" height="10" fill="${k.wood}"/><path d="M40 212l6-26h28l6 26" fill="${k.goldShade}"/><path d="M60 186c-6-8 0-14 0-20 6 6 8 12 0 20z" fill="${k.flame}"/><circle cx="60" cy="140" r="30" fill="${a(k.glass, .6)}" stroke="${k.mercury}" stroke-width="3"/><path d="M34 150a26 26 0 0 0 52 0z" fill="${k.elixir}"/><path d="M52 110V80h16v30" fill="none" stroke="${k.mercury}" stroke-width="3"/><path d="M60 80c30-30 60-24 76 8" fill="none" stroke="${k.mercury}" stroke-width="4"/><path d="M130 80l6 90" stroke="${k.mercury}" stroke-width="3"/><path d="M122 170h28l-4 40h-20z" fill="${a(k.glass, .6)}" stroke="${k.mercury}" stroke-width="2.5"/><path d="M124 190h24l-2 20h-20z" fill="${k.elixir}"/><g fill="${k.gold}" font-family="Georgia,serif" font-size="12"><text x="14" y="40">☿</text><text x="136" y="40">☉</text><text x="20" y="200">△</text></g>`)
    const bubbles = svg(`<g fill="none" stroke="${k.mercury}" stroke-width="1.2"><circle cx="8" cy="8" r="3"/><circle cx="20" cy="22" r="2"/><circle cx="12" cy="34" r="2.6"/></g>`, '0 0 30 40')
    const astrolabe = svg(`<g transform="translate(80 120)"><circle r="62" fill="${a(k.glass, .8)}" stroke="${k.gold}" stroke-width="6"/><g stroke="${k.gold}" stroke-width="1.5">${loop(36, 10, (r) => `<path d="M0 -58v${r % 30 ? 5 : 10}" transform="rotate(${r})"/>`)}</g><circle r="44" fill="none" stroke="${k.goldShade}" stroke-width="2"/><path d="M-44 0h88M0 -44v88" stroke="${k.goldShade}" stroke-width="1.5"/><circle r="4" fill="${k.gold}"/></g><path d="M80 44v-26" stroke="${k.gold}" stroke-width="4"/><circle cx="80" cy="14" r="7" fill="none" stroke="${k.gold}" stroke-width="3"/>`)
    const rete = svg(`<g transform="translate(80 120)"><circle r="34" fill="none" stroke="${k.gold}" stroke-width="3" transform="translate(0 -8)"/><g fill="${k.gold}">${[[-20, -30], [24, -24], [30, 12], [-10, 26], [-32, 4]].map(([x, y]) => `<path d="M${x} ${y}l4 -10 3 10z"/>`).join('')}</g><path d="M-48 0h96" stroke="${k.elixir}" stroke-width="3" stroke-linecap="round"/></g>`)
    const skyline = `<g fill="${a(k.glass, .95)}"><path d="M700 400V150h120v250z"/><path d="M680 150a80 80 0 0 1 160 0z"/><rect x="1000" y="280" width="400" height="120"/><path d="M1060 280a80 60 0 0 1 160 0z"/></g><path d="M820 110l120-60" stroke="${a(k.gold, .85)}" stroke-width="12"/><g fill="${a(k.elixir, .75)}">${[[748, 220], [784, 300], [748, 360]].map(([x, y]) => `<rect x="${x}" y="${y}" width="24" height="34" rx="12"/>`).join('')}</g><g fill="${a(k.gold, .65)}">${loop(12, 120, (x) => `<path d="M${60 + x} ${60 + (x % 360) / 6}l4 12 12 4-12 4-4 12-4-12-12-4 12-4z"/>`)}</g><g fill="none" stroke="${a(k.gold, .3)}" stroke-width="3"><ellipse cx="1220" cy="120" rx="140" ry="40"/><ellipse cx="1220" cy="120" rx="140" ry="40" transform="rotate(60 1220 120)"/></g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 30% 80%,${a(k.elixir, .14)},transparent 45%),radial-gradient(ellipse at 80% 10%,${a(k.gold, .12)},transparent 40%),linear-gradient(170deg,var(--venus-raised),var(--venus-bg) 65%)`,
      scene: svg(`<g fill="${k.gold}" opacity=".16" font-family="Georgia,serif" font-size="18"><text x="6" y="24">☿</text><text x="52" y="60">♄</text><text x="20" y="96">☉</text><text x="70" y="20">♀</text><text x="80" y="100">☽</text></g>`, '0 0 110 110'), sceneSize: '110px 110px',
      ornament: `radial-gradient(circle,${a(k.elixir, .45)} 0 2px,transparent 3px),repeating-radial-gradient(circle at 80% 30%,transparent 0 90px,${a(k.gold, .1)} 91px 93px,transparent 94px 140px)`, ornamentSize: '71px 97px,auto',
      paper: `radial-gradient(ellipse at 50% 100%,${a(k.elixir, .1)},transparent 55%)`, line: `linear-gradient(${k.gold},${k.elixir} 40%,${k.mercury} 70%,${k.gold})`, lineSpeed: '4.4s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(alembic)},radial-gradient(circle at 38% 60%,${a(k.elixir, .2)},transparent 40%),linear-gradient(${k.deep},${k.glass})`,
      panelRight: `${scenery(astrolabe)},linear-gradient(${k.deep},${k.glass})`,
      panelDetail: sheen, panelGlyphs: ['⚗', '☉'],
      panelInteriors: { left: { object: `${bubbles} 0 0/30px 40px`, inset: '45% 50% 26% 26%', mask: 'radial-gradient(circle closest-side,#000 70%,transparent 72%)', animation: 'venus-atlas-alchemy-bubble 1.8s linear infinite' }, right: { object: board(rete), aspect: BOARD, animation: 'venus-atlas-inner-alchemist-king 20s linear infinite' } },
      panelOverlay: `radial-gradient(circle at 40% 60%,${a(k.elixir, .45)},transparent 45%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .3,
      portraitRadius: '40% 40% 50% 50% / 30% 30% 70% 70%',
      plaque: 'linear-gradient(#3a2418,#24150c)', plaqueText: '#ffd98a', plaqueBorder: k.gold, plaqueShadow: `0 0 0 3px ${k.goldShade},0 0 0 5px ${k.elixir},0 12px 26px ${a('#000000', .5)}`, plaqueInset: studs(`${k.gold} 0 3px,transparent 4px`, `${k.elixir} 0 3px,transparent 4px`), plaqueRadius: '3px',
      headingFont: `"Alegreya SC",${fonts.alegreya}`, bodyFont: fonts.crimson, monoFont: fonts.mono,
      ...motion('alchemist-king', {
        scene: [70, 'linear', 'from{background-position:0 0}to{background-position:110px -110px}'],
        world: [20, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:0 -194px,0 0,0 0}'],
        inner: [20, 'linear', 'to{transform:rotate(360deg)}'],
        overlay: [3, ease, '0%,100%{transform:scale(.9)}50%{transform:scale(1.1)}'],
        extra: '@keyframes venus-atlas-alchemy-bubble{from{background-position:0 0}to{background-position:0 -80px}}',
      }),
    }
  })

/* ───────────── The Dragon's Living Treasury ───────────── */
interface DragonInk { deep: string; lava: string; ember: string; gold: string; emerald: string; scale: string; rock: string }
const dragon = world<DragonInk>('dragon-treasury', 'The Dragon’s Living Treasury', 'Obsidian caverns lit by lava seams: an emerald eye opening in the dark, and a hoard that keeps sliding in slow golden avalanches.', ['dragon','hoard','treasure','lava','obsidian','emerald','gold','cavern'],
  { skin: skin('#110806','#1e0f0a','#2c1510','#fff1dc','#c9a68e','#ff5a1f','#2fd17e'), ink: { deep: '#120807', lava: '#ff5a1f', ember: '#ffb13b', gold: '#ffd35c', emerald: '#2fd17e', scale: '#1f5a3a', rock: '#2a1a14' } },
  { skin: skin('#f4ede6','#fffaf5','#e8dcd0','#2a120a','#6e5448','#c2410c','#148a52'), ink: { deep: '#e8dcd0', lava: '#e0470c', ember: '#f59e0b', gold: '#d4a017', emerald: '#148a52', scale: '#2f7a52', rock: '#7a685e' } },
  (k, mode) => {
    const socket = svg(`<rect width="160" height="240" fill="${k.rock}"/><g fill="${k.scale}" stroke="${a(k.emerald, .6)}" stroke-width="1">${[40, 70, 100, 140, 170, 200].map((y, i) => loop(6, 30, (x) => `<path d="M${x + (i % 2) * 15 - 10} ${y}q15 -18 30 0q-15 10 -30 0z"/>`)).join('')}</g><path d="M14 110c30-40 102-40 132 0-30 40-102 40-132 0z" fill="${k.deep}"/><g stroke="${k.lava}" stroke-width="2" fill="none" opacity=".8"><path d="M0 230l30-20 20 10 30-24 30 16 50-20"/></g>`)
    const eye = svg(`<ellipse cx="80" cy="110" rx="56" ry="26" fill="${k.ember}"/><ellipse cx="80" cy="110" rx="46" ry="24" fill="${k.emerald}"/><ellipse cx="80" cy="110" rx="5" ry="22" fill="${k.deep}"/><circle cx="66" cy="100" r="5" fill="#ffffffaa"/>`)
    const hoard = svg(`<path d="M0 240V170c20-20 40-30 60-24s40-26 60-20 40 20 40 20v94z" fill="${k.gold}"/><g fill="${k.ember}">${loop(12, 13, (x) => `<ellipse cx="${x + 8}" cy="${190 + (x % 3) * 12}" rx="6" ry="2.4"/>`)}</g><path d="M96 150l8-24h16l8 24z" fill="${k.gold}" stroke="${k.ember}" stroke-width="2"/><rect x="104" y="112" width="16" height="14" fill="${k.gold}" stroke="${k.ember}" stroke-width="2"/><g fill="${k.emerald}"><path d="M40 176l6-8 6 8-6 8z"/><path d="M130 196l5-7 5 7-5 7z"/></g><path d="M20 150c-6-20 10-26 4-42" stroke="${k.lava}" stroke-width="3" fill="none"/>`)
    const coins = svg(`<g fill="${k.gold}" stroke="${k.ember}" stroke-width=".8"><ellipse cx="10" cy="8" rx="5" ry="2"/><ellipse cx="30" cy="26" rx="4" ry="4"/><ellipse cx="18" cy="44" rx="5" ry="1.6"/></g>`, '0 0 40 56')
    const skyline = `<path d="M400 400L700 160h200l300 240z" fill="${a(k.lava, .3)}" stroke="${a(k.ember, .5)}" stroke-width="4"/><path d="M700 160h200l-40 30-30-10-30 20-40-20z" fill="${a(k.lava, .92)}"/><path d="M780 170l-20 120 30-60 20 100 20-110 30 60-10-110z" fill="${a(k.lava, .7)}"/><path d="M1100 120c60-40 120-40 160 0-40-10-70 10-80 30 40-30 100-30 140 10-60-10-100 10-120 40l-40-20-40 20c-20-30-60-50-120-40 40-40 100-40 140-10-10-20-40-40-80-30z" fill="${a('#000000', .55)}"/><g fill="${a(k.gold, .65)}"><path d="M0 400c100-60 240-60 340 0zM1260 400c100-60 240-60 340 0z"/></g><g fill="${a(k.ember, .5)}"><circle cx="760" cy="110" r="30"/><circle cx="830" cy="70" r="22"/></g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 120%,${a(k.lava, .35)},transparent 55%),linear-gradient(180deg,var(--venus-bg),var(--venus-raised))`,
      scene: `repeating-linear-gradient(28deg,transparent 0 70px,${a(k.lava, .16)} 71px 73px,transparent 74px 140px),repeating-linear-gradient(-34deg,transparent 0 110px,${a(k.ember, .1)} 111px 112px,transparent 113px 200px)`, sceneSize: 'auto,auto',
      ornament: `radial-gradient(circle,${a(k.ember, .7)} 0 1.4px,transparent 2.2px),radial-gradient(circle,${a(k.lava, .6)} 0 1px,transparent 1.8px)`, ornamentSize: '59px 79px,37px 47px',
      paper: `radial-gradient(ellipse at 50% 100%,${a(k.gold, .12)},transparent 50%)`, line: `linear-gradient(${k.lava},${k.ember} 35%,${k.gold} 60%,${k.emerald})`, lineSpeed: '3.2s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(socket)},linear-gradient(${k.rock},${k.deep})`,
      panelRight: `${scenery(hoard)},radial-gradient(circle at 50% 80%,${a(k.gold, .3)},transparent 55%),linear-gradient(${k.deep},${k.rock})`,
      panelDetail: sheen, panelGlyphs: ['◆', '♨'],
      panelInteriors: { left: { object: scenery(eye), origin: '50% 45.8%', animation: `venus-atlas-inner-dragon-treasury 7s ${ease} infinite` }, right: { object: `${coins} 0 0/40px 56px`, inset: '0 0 34%', animation: 'venus-atlas-dragon-coins 2.4s linear infinite' } },
      panelOverlay: `linear-gradient(0deg,${a(k.lava, .55)},transparent 40%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .3,
      portraitRadius: '8% 45% 8% 45%',
      plaque: `linear-gradient(${k.gold},${k.ember})`, plaqueText: '#2a0a02', plaqueBorder: k.lava, plaqueShadow: `0 0 0 3px ${k.rock},0 0 24px ${a(k.lava, .7)}`, plaqueInset: studs(`${k.emerald} 0 4px,${k.scale} 4.5px 5.5px,transparent 6px`), plaqueRadius: '3px',
      headingFont: `"Metamorphous",${fonts.cinzelDeco}`, bodyFont: fonts.alegreya, monoFont: fonts.mono,
      ...motion('dragon-treasury', {
        scene: [9, ease, '0%,100%{filter:brightness(.85)}50%{filter:brightness(1.3)}'],
        world: [10, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:20px -158px,-12px -94px,0 0}'],
        inner: [7, ease, '0%,100%{transform:translateX(0) scaleY(1)}20%{transform:translateX(-6%) scaleY(1)}44%{transform:translateX(6%) scaleY(1)}48%{transform:translateX(6%) scaleY(.06)}52%{transform:translateX(6%) scaleY(1)}75%{transform:translateX(0) scale(1.08)}'],
        overlay: [4, ease, '0%,100%{filter:opacity(.6)}50%{filter:opacity(1)}'],
        extra: '@keyframes venus-atlas-dragon-coins{from{background-position:0 0}to{background-position:0 112px}}',
      }),
    }
  })

/* ───────────── Carnival at the Edge of Reality ───────────── */
interface CarnivalInk { deep: string; pink: string; blue: string; butter: string; red: string; canvas: string; line: string }
const carnival = world<CarnivalInk>('reality-carnival', 'Carnival at the Edge of Reality', 'A cotton-candy carnival floating at the end of the world: a Ferris wheel spinning against the void, a carousel horse bobbing, and tickets for rides that do not exist.', ['carnival','surreal','circus','ferris wheel','carousel','cotton candy','pastel','fairground'],
  { skin: skin('#1a1330','#241b42','#302456','#fff4fa','#cbbde0','#ffb3d9','#9ad8ff'), ink: { deep: '#1b1433', pink: '#ffb3d9', blue: '#9ad8ff', butter: '#ffe7a3', red: '#ff4d6d', canvas: '#fff4fa', line: '#2a1a40' } },
  { skin: skin('#fff4fa','#ffffff','#fbe3f0','#2a1a40','#6a5a7a','#d63384','#2f86c9'), ink: { deep: '#fbe3f0', pink: '#ff8ac4', blue: '#6cc2f0', butter: '#ffd166', red: '#e02d55', canvas: '#ffffff', line: '#2a1a40' } },
  (k, mode) => {
    const fairground = svg(`<path d="M80 134l-40 100M80 134l40 100" stroke="${k.line}" stroke-width="6"/><path d="M20 236h120" stroke="${k.line}" stroke-width="4"/><g fill="${k.butter}">${loop(8, 20, (x) => `<circle cx="${x + 10}" cy="12" r="3"/>`)}</g><path d="M0 8q40 16 80 0t80 0" stroke="${k.pink}" stroke-width="2" fill="none"/>`)
    const wheel = svg(`<g transform="translate(80 134)"><circle r="62" fill="none" stroke="${k.blue}" stroke-width="5"/><circle r="50" fill="none" stroke="${k.pink}" stroke-width="2" stroke-dasharray="4 4"/><g stroke="${k.canvas}" stroke-width="2">${loop(8, 45, (r) => `<path d="M0 0v-62" transform="rotate(${r})"/>`)}</g>${loop(8, 45, (r) => `<g transform="rotate(${r}) translate(0 -62)"><rect x="-8" y="-4" width="16" height="12" rx="4" fill="${r % 90 ? k.red : k.butter}" stroke="${k.line}" stroke-width="1.5"/></g>`)}<circle r="8" fill="${k.butter}" stroke="${k.line}" stroke-width="2"/></g>`)
    const carousel = svg(`<path d="M10 40l70-30 70 30z" fill="${k.pink}" stroke="${k.line}" stroke-width="2"/><g fill="${k.canvas}">${[30, 70, 110].map((x) => `<path d="M${x - 10} 40l${10 + (x - 80) / 7} -18 10 18z"/>`).join('')}</g><rect x="10" y="40" width="140" height="12" fill="${k.red}"/><g fill="${k.butter}">${loop(9, 16, (x) => `<circle cx="${x + 16}" cy="46" r="2.5"/>`)}</g><g stroke="${k.butter}" stroke-width="4">${[34, 126].map((x) => `<path d="M${x} 52v166"/>`).join('')}</g><rect x="4" y="216" width="152" height="18" rx="6" fill="${k.blue}" stroke="${k.line}" stroke-width="2"/><path d="M80 52v170" stroke="${k.butter}" stroke-width="3"/>`)
    const horse = svg(`<g transform="translate(80 132)"><path d="M-30 0c0-14 16-20 34-18l14-16c8 0 12 6 10 12l-8 6c4 10 2 26-6 30h-40c-6 0-6-8-4-14z" fill="${k.canvas}" stroke="${k.line}" stroke-width="2"/><path d="M18 -34c-8 4-16 14-18 22" stroke="${k.pink}" stroke-width="6" stroke-linecap="round"/><path d="M-26 14l-8 22M-8 14l-4 24M10 14l6 22M22 12l12 18" stroke="${k.line}" stroke-width="4" stroke-linecap="round"/><path d="M-30 -2c-12 4-18 14-16 24" stroke="${k.blue}" stroke-width="5" stroke-linecap="round" fill="none"/><rect x="-10" y="-14" width="18" height="10" rx="3" fill="${k.red}"/><circle cx="26" cy="-28" r="2" fill="${k.line}"/></g>`)
    const skyline = `<g transform="translate(1250 190)"><circle r="150" fill="none" stroke="${a(k.blue, .65)}" stroke-width="10"/><g stroke="${a(k.blue, .4)}" stroke-width="4">${loop(12, 30, (r) => `<path d="M0 0v-150" transform="rotate(${r})"/>`)}</g></g><path d="M1250 190l-80 210M1250 190l80 210" stroke="${a(k.line, .6)}" stroke-width="12"/><path d="M0 300c100-200 200-200 300-40s200 140 300-60 200-100 260 60" fill="none" stroke="${a(k.pink, .65)}" stroke-width="8"/>${[[300, 200], [640, 160], [900, 210]].map(([x, h]) => `<path d="M${x - 120} 400V${400 - h * .55}L${x} ${400 - h}l120 ${h * .45}V400z" fill="${a(k.canvas, .92)}"/><path d="M${x - 60} 400V${400 - h * .7}L${x} ${400 - h}V400zM${x + 60} 400V${400 - h * .7}L${x} ${400 - h}V400z" fill="${a(k.red, .78)}"/><path d="M${x} ${400 - h}v-30" stroke="${a(k.butter, .9)}" stroke-width="4"/>`).join('')}`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 110%,${a(k.pink, .3)},transparent 55%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 60%)`,
      scene: `conic-gradient(from 0deg at 50% 50%,${a(k.pink, .06)} 0 25%,transparent 0 50%,${a(k.blue, .06)} 0 75%,transparent 0)`, sceneSize: '120px 120px',
      ornament: `repeating-conic-gradient(from 0deg at 50% 120%,${a(k.pink, .08)} 0 6deg,transparent 6deg 12deg),radial-gradient(circle,${a(k.butter, .6)} 0 2px,transparent 3px)`, ornamentSize: 'auto,73px 97px',
      paper: `radial-gradient(ellipse at 50% 0,${a(k.blue, .12)},transparent 55%)`, line: `linear-gradient(${k.pink},${k.butter} 33%,${k.blue} 66%,${k.red})`, lineSpeed: '2.6s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(fairground)},radial-gradient(circle at 50% 56%,${a(k.pink, .25)},transparent 55%),linear-gradient(${k.deep},${a(k.blue, .25)})`,
      panelRight: `${scenery(carousel)},repeating-linear-gradient(90deg,${a(k.pink, .18)} 0 14px,transparent 14px 28px),linear-gradient(${k.deep},${a(k.pink, .2)})`,
      panelDetail: sheen, panelGlyphs: ['★', '✦'],
      panelInteriors: { left: { object: board(wheel), aspect: BOARD, origin: '50% 55.8%', animation: 'venus-atlas-inner-reality-carnival 18s linear infinite' }, right: { object: board(horse), aspect: BOARD, animation: `venus-atlas-carnival-gallop 2.6s ${ease} infinite` } },
      panelOverlay: `repeating-conic-gradient(from 0deg,${a(k.butter, .4)} 0 10deg,transparent 10deg 30deg)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'soft-light', panelOverlayOpacity: .18,
      portraitRadius: '50% 50% 14px 14px / 30% 30% 14px 14px',
      plaque: k.butter, plaqueText: k.red, plaqueBorder: k.red, plaqueShadow: `0 0 0 3px ${k.line},4px 4px 0 3px ${k.pink}`, plaqueInset: `radial-gradient(circle at 0 50%,${k.deep} 0 7px,transparent 7.5px),radial-gradient(circle at 100% 50%,${k.deep} 0 7px,transparent 7.5px),repeating-linear-gradient(90deg,transparent 0 16px,${a(k.red, .5)} 16px 17px) 18px 0/calc(100% - 36px) 100% no-repeat`, plaqueRadius: '4px',
      headingFont: fonts.rubikMono, bodyFont: fonts.dmSans, monoFont: fonts.mono,
      ...motion('reality-carnival', {
        scene: [16, 'linear', 'from{transform:rotate(0) scale(1.4)}to{transform:rotate(360deg) scale(1.4)}'],
        world: [30, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:0 0,73px -194px,0 0}'],
        inner: [18, 'linear', 'to{transform:rotate(360deg)}'],
        overlay: [9, 'linear', 'to{transform:rotate(360deg)}'],
        extra: '@keyframes venus-atlas-carnival-gallop{0%,100%{transform:translateY(8%) rotate(-3deg)}50%{transform:translateY(-8%) rotate(3deg)}}',
      }),
    }
  })

/* ───────────── Astral Botanica ───────────── */
interface AstralInk { deep: string; moon: string; silver: string; pollen: string; leaf: string; glow: string }
const astral = world<AstralInk>('astral-botanica', 'Astral Botanica', 'A night garden grown from the sky: moonflowers opening on silver vines, constellations that bloom, and shooting stars pollinating the dark.', ['astral','botanical','moonflower','constellation','night garden','silver','pollen','celestial'],
  { skin: skin('#090b1a','#11142a','#1a1e3c','#eef0ff','#a9afd6','#e6e9ff','#f7d774'), ink: { deep: '#0a0c1c', moon: '#e6e9ff', silver: '#aab4e6', pollen: '#f7d774', leaf: '#3a4a8a', glow: '#bfc8ff' } },
  { skin: skin('#eef0fb','#ffffff','#dfe3f6','#1a1e3c','#5a5f85','#3b3f8f','#9a7a10'), ink: { deep: '#dfe3f6', moon: '#ffffff', silver: '#5a64a8', pollen: '#c89a10', leaf: '#4a5aa8', glow: '#ffffff' } },
  (k, mode) => {
    const vine = svg(`<path d="M120 30a18 18 0 1 0 12 30 22 22 0 1 1-12-30z" fill="${k.moon}"/><g fill="none" stroke="${k.silver}" stroke-width="2.4"><path d="M20 240c10-50 50-60 40-110s30-60 50-80"/><path d="M60 170c-20-10-30-4-40-20M52 110c20 0 30-10 40-20"/></g><g fill="${k.leaf}" stroke="${k.silver}" stroke-width="1">${[[30, 200, -30], [50, 150, 30], [34, 150, -40], [78, 96, 20], [96, 70, -30]].map(([x, y, r]) => `<path d="M${x} ${y}c6-10 18-10 22 0-6 8-16 8-22 0z" transform="rotate(${r} ${x} ${y})"/>`).join('')}</g>`)
    const bloom = svg(`<g transform="translate(60 128)"><g fill="${k.moon}" stroke="${k.silver}" stroke-width="1">${loop(5, 72, (r) => `<path d="M0 0c-10-10-10-30 0-38 10 8 10 28 0 38z" transform="rotate(${r})"/>`)}</g><circle r="7" fill="${k.pollen}"/><circle r="26" fill="${a(k.glow, .2)}"/></g>`)
    const sky = svg(`<g stroke="${a(k.silver, .7)}" stroke-width="1.2" fill="none"><path d="M80 60L50 90 60 130 100 130 110 90z"/><path d="M80 60v70M50 90l60 0M60 130l20 40 20-40"/><path d="M80 170v60"/></g><g fill="${k.moon}">${[[80, 60], [50, 90], [110, 90], [60, 130], [100, 130], [80, 170], [80, 230], [20, 40], [140, 30], [30, 200], [130, 190]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i < 7 ? 3.2 : 1.6}"/>`).join('')}</g><g fill="${k.pollen}">${[[80, 95], [70, 110], [92, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2"/>`).join('')}</g>`)
    const comet = svg(`<path d="M20 20L80 60" stroke="${k.pollen}" stroke-width="2.4" stroke-linecap="round" opacity=".9"/><path d="M8 12L80 60" stroke="${k.moon}" stroke-width="1" opacity=".5"/><circle cx="80" cy="60" r="3.6" fill="${k.moon}"/>`)
    const skyline = `<g fill="none" stroke="${a(k.silver, .55)}" stroke-width="6">${loop(5, 340, (x) => `<path d="M${x + 40} 400V240a130 130 0 0 1 260 0v160"/>`)}</g><g fill="${a(k.leaf, .85)}">${loop(20, 80, (x) => `<ellipse cx="${x + 60}" cy="${260 + (x % 120) / 2}" rx="14" ry="6"/>`)}</g><g fill="${a(k.moon, .85)}">${loop(20, 80, (x) => `<circle cx="${x + 40}" cy="${240 + (x % 160) / 2}" r="${6 + (x % 3) * 3}"/>`)}</g>`
    const moonrise = `<circle cx="800" cy="40" r="260" fill="${a(k.moon, .12)}"/><circle cx="800" cy="40" r="180" fill="${a(k.moon, .12)}"/><circle cx="800" cy="40" r="110" fill="${a(k.moon, .2)}"/>`
    return {
      backdrop: `${landmark(skyline)},${landmark(moonrise, '0 0 1600 400', 'center top')},radial-gradient(ellipse at 70% 10%,${a(k.glow, .14)},transparent 40%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 60%)`,
      scene: `radial-gradient(circle,${a(k.moon, .7)} 0 1px,transparent 1.6px),radial-gradient(circle,${a(k.pollen, .5)} 0 1.2px,transparent 2px),radial-gradient(circle,${a(k.moon, .4)} 0 .8px,transparent 1.4px)`, sceneSize: '53px 67px,113px 89px,29px 31px',
      ornament: `radial-gradient(ellipse 5px 11px,${a(k.silver, .35)} 0 70%,transparent),radial-gradient(circle,${a(k.pollen, .45)} 0 1.6px,transparent 2.4px)`, ornamentSize: '97px 131px,61px 83px',
      paper: `radial-gradient(ellipse at 50% 50%,${a(k.leaf, .12)},transparent 60%)`, line: `linear-gradient(${k.moon},${k.silver} 40%,${k.pollen} 70%,${k.moon})`, lineSpeed: '5.4s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(vine)},radial-gradient(circle at 75% 15%,${a(k.glow, .25)},transparent 35%),linear-gradient(${k.deep},${a(k.leaf, .45)})`,
      panelRight: `${scenery(sky)},radial-gradient(circle at 50% 45%,${a(k.leaf, .35)},transparent 60%),linear-gradient(${k.deep},${a(k.leaf, .3)})`,
      panelDetail: sheen, panelGlyphs: ['✿', '☾'],
      panelInteriors: { left: { object: board(bloom), aspect: BOARD, origin: '37.5% 53.3%', animation: `venus-atlas-inner-astral-botanica 7s ${ease} infinite` }, right: { object: board(comet), aspect: BOARD, animation: 'venus-atlas-astral-comet 5s cubic-bezier(.3,0,.6,1) infinite' } },
      panelOverlay: `radial-gradient(circle,${a(k.moon, .6)} 0 1px,transparent 1.8px) 0 0/17px 23px`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'normal', panelOverlayOpacity: .35,
      portraitRadius: '15% 50% 15% 50%',
      plaque: `linear-gradient(${k.leaf},${mode === 'dark' ? '#141a3a' : '#2a3478'})`, plaqueText: '#eef0ff', plaqueBorder: k.silver, plaqueShadow: `0 0 0 3px ${k.deep},0 0 0 4px ${k.silver},0 0 24px ${a(k.glow, .45)}`, plaqueInset: `radial-gradient(circle,${a('#ffffff', .8)} 0 .8px,transparent 1.4px) 0 0/13px 11px`, plaqueRadius: '50% 10% 50% 10% / 50% 50% 50% 50%',
      headingFont: fonts.cormorant, bodyFont: fonts.lora, monoFont: fonts.mono,
      ...motion('astral-botanica', {
        scene: [40, ease, '0%,100%{background-position:0 0,0 0,0 0;filter:brightness(.9)}50%{background-position:10px 6px,-8px 10px,6px -4px;filter:brightness(1.25)}'],
        world: [26, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:97px 262px,-61px 166px,0 0}'],
        inner: [7, ease, '0%,100%{transform:scale(.55) rotate(-20deg)}45%,70%{transform:scale(1.05) rotate(10deg)}'],
        overlay: [6, ease, '0%,100%{filter:opacity(.5)}50%{filter:opacity(1)}'],
        extra: '@keyframes venus-atlas-astral-comet{0%,40%{transform:translate(-40%,-30%);opacity:0}45%{opacity:1}80%{transform:translate(40%,30%);opacity:1}85%,100%{transform:translate(50%,38%);opacity:0}}',
      }),
    }
  })

/* ───────────── Palace of a Thousand Mirrors ───────────── */
interface MirrorInk { deep: string; rose: string; roseShade: string; lilac: string; glass: string; crystal: string }
const mirror = world<MirrorInk>('mirror-palace', 'Palace of a Thousand Mirrors', 'A rose-gold hall of mirrors that never ends: arches folding into arches, a crystal chandelier scattering glints, and your reflection arriving a moment late.', ['mirror','palace','rose gold','chandelier','infinite','reflection','crystal','ballroom'],
  { skin: skin('#1a1517','#251e21','#32292d','#fbeff0','#c8b3b8','#f2b8a0','#c9c3e6'), ink: { deep: '#1c1719', rose: '#f2b8a0', roseShade: '#a86a58', lilac: '#c9c3e6', glass: '#3a3238', crystal: '#ffffff' } },
  { skin: skin('#f7f0ee','#ffffff','#ece0dd','#2a1e20','#6e5e62','#9c4f45','#6a62a0'), ink: { deep: '#ece0dd', rose: '#c97a62', roseShade: '#8a4a3a', lilac: '#8a82c0', glass: '#f6eef0', crystal: '#ffffff' } },
  (k, mode) => {
    const arch = (s: number) => `<path d="M${80 - 64 * s} ${120 + 110 * s}V${120 - 40 * s}a${64 * s} ${70 * s} 0 0 1 ${128 * s} 0V${120 + 110 * s}" fill="none" stroke="${k.rose}" stroke-width="${3 * s + .6}"/>`
    const corridor = svg(`<rect width="160" height="240" fill="${k.glass}"/>${[1, .78, .6, .46, .35, .27, .2].map(arch).join('')}<path d="M0 240L80 150 160 240" fill="${a(k.lilac, .15)}"/><g stroke="${a(k.lilac, .3)}" stroke-width="1">${loop(6, 14, (x) => `<path d="M${80 - x * 2} 240L80 150M${80 + x * 2} 240L80 150"/>`)}</g>`)
    const tunnel = svg(`${arch(.3)}`)
    const chandelier = svg(`<path d="M80 0v40" stroke="${k.rose}" stroke-width="2"/><g fill="none" stroke="${k.rose}" stroke-width="2.4"><path d="M36 90c10 20 78 20 88 0"/><path d="M50 60c8 14 52 14 60 0"/></g><g fill="${a(k.crystal, .9)}" stroke="${k.lilac}" stroke-width="1">${[[36, 90], [58, 102], [80, 106], [102, 102], [124, 90], [50, 60], [80, 72], [110, 60]].map(([x, y]) => `<path d="M${x} ${y}l5 10-5 16-5-16z"/>`).join('')}</g><g fill="${k.rose}">${[40, 64, 96, 120].map((x) => `<rect x="${x - 3}" y="74" width="6" height="12"/>`).join('')}</g><g fill="#fff6d8">${[40, 64, 96, 120].map((x) => `<ellipse cx="${x}" cy="70" rx="3" ry="5"/>`).join('')}</g><rect x="0" y="180" width="160" height="60" fill="${a(k.lilac, .2)}"/><path d="M0 180h160" stroke="${k.rose}" stroke-width="2"/>`)
    const glints = svg(`<g fill="${k.crystal}"><path d="M10 10l1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5 5-1.5z"/><path d="M34 40l1 3.5 3.5 1-3.5 1-1 3.5-1-3.5-3.5-1 3.5-1z"/></g>`, '0 0 48 60')
    const skyline = `<rect x="0" y="120" width="1600" height="280" fill="${a(k.glass, .9)}"/>${loop(8, 200, (x) => `<path d="M${x + 30} 400V200a70 70 0 0 1 140 0v200z" fill="${a(k.lilac, .2)}" stroke="${a(k.rose, .85)}" stroke-width="6"/><path d="M${x + 60} 380V210" stroke="${a('#ffffff', .3)}" stroke-width="8"/>`)}<rect x="0" y="110" width="1600" height="14" fill="${a(k.rose, .85)}"/>${loop(4, 400, (x) => `<g transform="translate(${x + 200} 40)"><path d="M0 0v30" stroke="${a(k.rose, .8)}" stroke-width="4"/><path d="M-40 40c20 20 60 20 80 0" fill="none" stroke="${a(k.rose, .8)}" stroke-width="5"/><g fill="${a('#ffffff', .8)}"><circle cx="-40" cy="46" r="5"/><circle cx="0" cy="56" r="6"/><circle cx="40" cy="46" r="5"/></g></g>`)}`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 30%,${a(k.rose, .16)},transparent 50%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `repeating-linear-gradient(90deg,transparent 0 120px,${a(k.rose, .14)} 121px 124px,transparent 125px 240px),linear-gradient(115deg,transparent 40%,${a(k.crystal, .06)} 50%,transparent 60%)`, sceneSize: 'auto,240px 100%',
      ornament: `${svg(`<g fill="${k.crystal}" opacity=".5"><path d="M20 20l1.4 4.6 4.6 1.4-4.6 1.4-1.4 4.6-1.4-4.6-4.6-1.4 4.6-1.4z"/></g>`, '0 0 60 60')},radial-gradient(circle,${a(k.lilac, .35)} 0 1px,transparent 1.8px)`, ornamentSize: '131px 149px,41px 47px',
      paper: `linear-gradient(90deg,${a(k.rose, .06)},transparent 30%,transparent 70%,${a(k.rose, .06)})`, line: `linear-gradient(${k.rose},${k.lilac} 45%,${k.crystal} 70%,${k.rose})`, lineSpeed: '5s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(corridor)},linear-gradient(${k.glass},${k.deep})`,
      panelRight: `${scenery(chandelier)},radial-gradient(circle at 50% 30%,${a('#fff6d8', .3)},transparent 45%),linear-gradient(${k.glass},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['◇', '♕'],
      panelInteriors: { left: { object: scenery(tunnel), origin: '50% 50%', animation: 'venus-atlas-inner-mirror-palace 4s cubic-bezier(.5,0,.9,.6) infinite' }, right: { object: `${glints} 0 0/48px 60px`, inset: '0 0 30%', animation: `venus-atlas-mirror-glint 3s ${ease} infinite` } },
      panelOverlay: `linear-gradient(110deg,transparent 40%,${a(k.crystal, .6)} 48%,transparent 56%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'soft-light', panelOverlayOpacity: .4,
      portraitRadius: '50% / 44%',
      plaque: 'linear-gradient(135deg,#ffffff,#e8e0e6 40%,#ffffff 55%,#d6ccd6)', plaqueText: '#2a1e20', plaqueBorder: k.rose, plaqueShadow: `0 0 0 3px ${k.rose},0 0 0 5px ${k.roseShade},0 0 26px ${a(k.rose, .45)}`, plaqueInset: `linear-gradient(115deg,transparent 40%,${a(k.lilac, .4)} 50%,transparent 60%)`, plaqueRadius: '20px',
      headingFont: fonts.italiana, bodyFont: fonts.cormorant, monoFont: fonts.mono,
      ...motion('mirror-palace', {
        scene: [18, ease, '0%,100%{background-position:0 0,-240px 0}50%{background-position:60px 0,240px 0}'],
        world: [22, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:131px -149px,-41px 94px,0 0}'],
        inner: [4, 'cubic-bezier(.5,0,.9,.6)', '0%{transform:scale(.4);opacity:0}25%{opacity:1}100%{transform:scale(3.4);opacity:0}'],
        overlay: [7, ease, '0%,100%{transform:translateX(-35%)}50%{transform:translateX(35%)}'],
        extra: '@keyframes venus-atlas-mirror-glint{0%,100%{filter:opacity(.2);background-position:0 0}50%{filter:opacity(1);background-position:12px 8px}}',
      }),
    }
  })

/* ───────────── Abyssal Pearl Empire ───────────── */
interface AbyssInk { deep: string; pearl: string; jelly: string; glow: string; coral: string; shell: string; sea: string }
const abyssal = world<AbyssInk>('abyssal-empire', 'Abyssal Pearl Empire', 'A court at the bottom of the sea: jellyfish pulsing up through shafts of light, a giant oyster breathing around its pearl, and coral thrones in the dark.', ['ocean','abyss','pearl','jellyfish','oyster','coral','deep sea','bioluminescent'],
  { skin: skin('#020b16','#061626','#0b2238','#f3f7ff','#9ab3c8','#f3efe2','#ff7ad9'), ink: { deep: '#030d18', pearl: '#f3efe2', jelly: '#ff7ad9', glow: '#7af3ff', coral: '#ff8a6a', shell: '#3a4a6a', sea: '#06243a' } },
  { skin: skin('#e6f3f7','#ffffff','#d0e8ef','#0a2a3a','#4a6a7a','#1f6a8a','#c0409e'), ink: { deep: '#d0e8ef', pearl: '#ffffff', jelly: '#e04fb8', glow: '#1fa8c9', coral: '#e0663f', shell: '#8a9ab8', sea: '#a8d4e2' } },
  (k, mode) => {
    const depths = svg(`<g fill="${a(k.glow, .12)}"><path d="M30 0h14L20 240H0zM90 0h10L120 240h-20z"/></g><g fill="${k.coral}"><path d="M10 240c0-30 6-40 4-60 6 10 8 20 6 30 6-14 12-20 10-34 8 16 6 40-2 64z"/><path d="M130 240c2-20 10-26 8-44 6 12 6 24 2 44z"/></g><g fill="${a(k.glow, .6)}">${[[40, 60], [70, 150], [120, 100], [20, 120], [140, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6"/>`).join('')}</g>`)
    const jelly = svg(`<g transform="translate(80 120)"><path d="M-28 0c0-34 56-34 56 0-8 6-48 6-56 0z" fill="${a(k.jelly, .75)}" stroke="${k.glow}" stroke-width="1.5"/><ellipse cx="0" cy="-12" rx="12" ry="8" fill="${a(k.pearl, .4)}"/><g fill="none" stroke="${a(k.jelly, .8)}" stroke-width="2" stroke-linecap="round"><path d="M-20 4c-4 20 6 30 0 50M-8 6c4 24-6 34 2 58M6 6c-4 22 6 32-2 54M18 4c4 18-4 28 2 44"/></g></g>`)
    const oysterBase = svg(`<path d="M20 180c10 30 110 30 120 0z" fill="${k.shell}" stroke="${k.pearl}" stroke-width="2"/><path d="M28 180c10 20 94 20 104 0z" fill="${a(k.jelly, .35)}"/><circle cx="80" cy="176" r="12" fill="${k.pearl}"/><circle cx="76" cy="172" r="4" fill="#ffffff"/><circle cx="80" cy="176" r="28" fill="${a(k.glow, .22)}"/><rect x="0" y="206" width="160" height="34" fill="${a(k.shell, .7)}"/>`)
    const lid = svg(`<path d="M20 180c10-40 110-40 120 0z" fill="${k.shell}" stroke="${k.pearl}" stroke-width="2"/><g stroke="${a(k.pearl, .5)}" stroke-width="1.4" fill="none"><path d="M40 170c10-16 70-16 80 0M52 160c10-10 46-10 56 0"/></g>`)
    const skyline = `<g fill="${a(k.shell, .85)}"><rect x="600" y="240" width="400" height="160"/><path d="M620 240a80 80 0 0 1 160 0zM820 240a80 80 0 0 1 160 0zM780 240V150h40v90zM770 150a30 40 0 0 1 60 0z"/></g><g fill="${a(k.glow, .5)}">${loop(6, 60, (x) => `<rect x="${640 + x}" y="300" width="20" height="40" rx="10"/>`)}</g><g fill="${a(k.coral, .85)}">${loop(10, 160, (x) => `<path d="M${x + 20} 400c-10-60 10-90 0-140 20 30 20 60 14 80 16-40 30-50 26-90 20 40 10 100-10 150z"/>`)}</g><g fill="none" stroke="${a(k.glow, .4)}" stroke-width="6">${loop(8, 200, (x) => `<path d="M${x + 100} 400c-20-60 20-120 0-200s20-100 0-160"/>`)}</g>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% -10%,${a(k.glow, .2)},transparent 45%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 55%)`,
      scene: `repeating-linear-gradient(100deg,transparent 0 80px,${a(k.glow, .05)} 81px 120px,transparent 121px 220px),radial-gradient(circle,${a(k.glow, .45)} 0 1.2px,transparent 2px)`, sceneSize: 'auto,47px 61px',
      ornament: `radial-gradient(circle at 35% 35%,${a(k.pearl, .6)} 0 2px,transparent 5px),radial-gradient(circle,transparent 0 5px,${a(k.glow, .3)} 6px 7px,transparent 8px)`, ornamentSize: '113px 173px,67px 97px',
      paper: `radial-gradient(ellipse at 50% 110%,${a(k.jelly, .12)},transparent 50%)`, line: `linear-gradient(${k.glow},${k.jelly} 40%,${k.pearl} 70%,${k.glow})`, lineSpeed: '4.8s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(depths)},linear-gradient(${k.sea},${k.deep})`,
      panelRight: `${scenery(oysterBase)},linear-gradient(${k.sea},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['♆', '◉'],
      panelInteriors: { left: { object: board(jelly), aspect: BOARD, animation: `venus-atlas-inner-abyssal-empire 5s ${ease} infinite` }, right: { object: scenery(lid), origin: '12.5% 75%', animation: `venus-atlas-abyssal-oyster 6s ${ease} infinite` } },
      panelOverlay: `repeating-linear-gradient(100deg,transparent 0 20px,${a(k.glow, .3)} 21px 30px,transparent 31px 60px)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'soft-light', panelOverlayOpacity: .3,
      portraitRadius: '50%',
      plaque: 'linear-gradient(120deg,#ffffff,#f3e6ff 30%,#e6fbff 60%,#ffffff)', plaqueText: '#0a2a3a', plaqueBorder: k.glow, plaqueShadow: `0 0 0 3px ${k.shell},0 0 26px ${a(k.glow, .5)}`, plaqueInset: `radial-gradient(ellipse at 30% 20%,${a(k.jelly, .2)},transparent 50%)`, plaqueRadius: '999px',
      headingFont: `"Tenor Sans",${fonts.poiret}`, bodyFont: fonts.literata, monoFont: fonts.mono,
      ...motion('abyssal-empire', {
        scene: [18, ease, '0%,100%{background-position:0 0,0 0;transform:scale(1.03)}50%{background-position:60px 0,10px -30px;transform:scale(1.06)}'],
        world: [16, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:0 -346px,0 -194px,0 0}'],
        inner: [5, ease, '0%,100%{transform:translateY(10%) scale(1,1)}20%{transform:translateY(8%) scale(1.14,.86)}50%{transform:translateY(-10%) scale(.94,1.08)}'],
        overlay: [10, ease, '0%,100%{transform:translateX(-10%)}50%{transform:translateX(10%)}'],
        extra: '@keyframes venus-atlas-abyssal-oyster{0%,100%{transform:rotate(0)}40%,70%{transform:rotate(-24deg)}}',
      }),
    }
  })

/* ───────────── Library of Unwritten Lives ───────────── */
interface LibraryInk { deep: string; wood: string; paper: string; ink: string; gilt: string; s1: string; s2: string; s3: string }
const library = world<LibraryInk>('unwritten-library', 'Library of Unwritten Lives', 'A candlelit stack of books no one has written yet: spines that slide out on their own, and a quill finishing sentences in fresh blue ink.', ['library','books','ink','quill','archive','haunted','scholarly','gilt'],
  { skin: skin('#0e1014','#171a21','#21252e','#f4ead4','#b3ab98','#d8b15f','#6a95dd'), ink: { deep: '#0f1115', wood: '#3a2a1e', paper: '#f1e4c6', ink: '#4d7cc7', gilt: '#d8b15f', s1: '#7a2a3a', s2: '#2a4a6a', s3: '#3a5a3a' } },
  { skin: skin('#f5ecd8','#fffaf0','#e8dcc2','#1d2438','#5e6070','#1d2e57','#8a5a2b'), ink: { deep: '#e8dcc2', wood: '#8a5a3a', paper: '#fffaf0', ink: '#1d2e57', gilt: '#a8801f', s1: '#9a3a4a', s2: '#3a5a8a', s3: '#4a7a4a' } },
  (k, mode) => {
    const spines = [k.s1, k.s2, k.s3, k.gilt, k.s2, k.s1, k.s3]
    const shelf = svg(`<rect width="160" height="240" fill="${k.wood}"/>${[20, 96, 172].map((y) => `<rect x="0" y="${y + 60}" width="160" height="8" fill="${a(k.deep, .6)}"/>${spines.map((c, i) => `<rect x="${8 + i * 21}" y="${y + (i % 3) * 4}" width="18" height="${60 - (i % 3) * 4}" fill="${c}" stroke="${a(k.deep, .5)}"/><path d="M${10 + i * 21} ${y + 14}h14M${10 + i * 21} ${y + 46}h14" stroke="${k.gilt}" stroke-width="1.4"/>`).join('')}`).join('')}`)
    const book = svg(`<rect x="71" y="20" width="18" height="60" fill="${k.gilt}" stroke="${k.deep}"/><path d="M73 34h14M73 66h14" stroke="${k.s1}" stroke-width="2"/>`)
    const open = svg(`<path d="M10 170c30-12 50-8 70 4 20-12 40-16 70-4v-80c-30-12-50-8-70 4-20-12-40-16-70-4z" fill="${k.paper}" stroke="${a(k.deep, .5)}" stroke-width="1.5"/><path d="M80 94v80" stroke="${a(k.deep, .4)}"/><g stroke="${a(k.ink, .45)}" stroke-width="1">${loop(6, 10, (y) => `<path d="M20 ${108 + y}q25 -4 52 2"/>`)}</g><path d="M150 40c-20 10-40 40-52 80" stroke="${k.gilt}" stroke-width="1.6" fill="none"/><path d="M150 40c-4 20-20 40-44 70 4-30 22-56 44-70z" fill="${a(k.paper, .9)}" stroke="${k.gilt}"/><rect x="0" y="176" width="160" height="64" fill="${k.wood}"/><path d="M20 196h30v20H20z" fill="${k.ink}"/>`)
    const writing = svg(`<g stroke="${k.ink}" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M88 108c6-3 8 3 14 0s8 3 14 0 8 3 14 0M88 118c6-3 8 3 14 0s8 3 14 0 8 3 12 0M88 128c6-3 8 3 14 0s8 3 10 0"/></g>`)
    const skyline = `<g fill="${a(k.wood, .95)}">${loop(6, 280, (x) => `<path d="M${x + 20} 400V120a120 120 0 0 1 240 0v280z"/>`)}</g>${loop(6, 280, (x) => loop(4, 60, (y) => loop(10, 22, (b) => `<rect x="${x + 40 + b}" y="${150 + y}" width="18" height="46" fill="${[k.s1, k.s2, k.s3, k.gilt][(b / 22 + y / 60) % 4]}" opacity=".85"/>`)))}<g fill="${a(k.paper, .65)}">${[[300, 50], [900, 30], [1300, 70]].map(([x, y]) => `<path d="M${x} ${y}l40-10 40 10v24l-40-10-40 10z"/>`).join('')}</g><path d="M1500 400L1440 60M1540 400L1480 60" stroke="${a(k.gilt, .6)}" stroke-width="8"/>`
    return {
      backdrop: `${landmark(skyline)},radial-gradient(ellipse at 50% 40%,${a(k.gilt, .1)},transparent 50%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `repeating-linear-gradient(90deg,${a(k.s1, .1)} 0 18px,${a(k.s2, .1)} 18px 34px,${a(k.s3, .08)} 34px 54px,${a(k.gilt, .06)} 54px 62px),repeating-linear-gradient(0deg,transparent 0 110px,${a(k.deep, .5)} 110px 118px)`, sceneSize: '124px 118px,auto',
      ornament: `radial-gradient(ellipse 14px 6px,${a(k.paper, .25)} 0 70%,transparent),radial-gradient(circle,${a(k.gilt, .45)} 0 1.2px,transparent 2px)`, ornamentSize: '151px 173px,43px 59px',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 45%,${a(k.deep, .6)})`, line: `linear-gradient(${k.ink},${k.gilt} 50%,${k.s1})`, lineSpeed: '5s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(shelf)},linear-gradient(${k.wood},${k.deep})`,
      panelRight: `${scenery(open)},radial-gradient(circle at 50% 50%,${a(k.gilt, .2)},transparent 55%),linear-gradient(${k.deep},${k.wood})`,
      panelDetail: sheen, panelGlyphs: ['§', '✒'],
      panelInteriors: { left: { object: board(book), aspect: BOARD, animation: `venus-atlas-inner-unwritten-library 6s ${ease} infinite` }, right: { object: board(writing), aspect: BOARD, origin: '55% 50%', animation: 'venus-atlas-library-write 5s linear infinite' } },
      panelOverlay: `radial-gradient(ellipse at 50% 30%,${a(k.gilt, .45)},transparent 55%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .25,
      portraitRadius: '2px 18px 18px 2px',
      plaque: `linear-gradient(${k.s1},#4a1520)`, plaqueText: '#f1d88f', plaqueBorder: k.gilt, plaqueShadow: `0 0 0 3px ${k.wood},0 0 0 4px ${k.gilt},0 10px 24px ${a('#000000', .5)}`, plaqueInset: `linear-gradient(${k.gilt},${k.gilt}) 0 6px/100% 1px no-repeat,linear-gradient(${k.gilt},${k.gilt}) 0 calc(100% - 6px)/100% 1px no-repeat`, plaqueRadius: '2px',
      headingFont: fonts.libre, bodyFont: fonts.garamond, monoFont: fonts.typewriter,
      ...motion('unwritten-library', {
        scene: [60, 'linear', 'from{background-position:0 0,0 0}to{background-position:124px 0,0 0}'],
        world: [20, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:151px 173px,-43px 118px,0 0}'],
        inner: [6, ease, '0%,20%,100%{transform:translateY(0)}40%,65%{transform:translateY(-10%) rotate(-3deg)}'],
        overlay: [4, ease, '0%,100%{filter:opacity(.6)}50%{filter:opacity(1)}'],
        extra: '@keyframes venus-atlas-library-write{0%{transform:scaleX(0);opacity:1}70%,92%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}',
      }),
    }
  })

export const ATLAS_REALM_THEMES: VenusThemeFamily[] = [reliquary, peacock, plague, siege, frost, alchemist, dragon, carnival, astral, mirror, abyssal, library]
