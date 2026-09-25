import type { VenusThemeFamily } from './types'
import { a, board, BOARD, ease, fonts, landmark, motion as kitMotion, scenery, sheen, skin, studs, svg, world, type MotionSpec } from './kit'

/** The ten worlds: séance parlours, opera houses, ministries, kilns, and gardens, each with dedicated dark and light artwork. */
const motion = (id: string, m: MotionSpec) => kitMotion('ten', id, m)
const loop = (n: number, step: number, draw: (i: number) => string) => Array.from({ length: n }, (_, i) => draw(i * step)).join('')
const circle = 'radial-gradient(circle closest-side,#000 97%,transparent 99%)'

/* ───────────── Lacquer Séance ───────────── */
interface LacquerInk { deep: string; lacquer: string; jade: string; pearl: string; gold: string; cinnabar: string; candle: string }
const lacquer = world<LacquerInk>('lacquer-seance', 'Lacquer Séance', 'A séance on a lacquered spirit board: mother-of-pearl letters, a jade planchette gliding by itself, and candles floating in a gilded shrine cabinet.', ['seance','lacquer','spirit board','jade','mother of pearl','candles','occult','maki-e'],
  { skin: skin('#0a0908','#15110e','#201a15','#f6efe2','#b8ab96','#5fc7a0','#f0e4ff'), ink: { deep: '#0a0908', lacquer: '#15110e', jade: '#5fc7a0', pearl: '#f0e4ff', gold: '#d9b36a', cinnabar: '#d8342a', candle: '#ffd28a' } },
  { skin: skin('#f5ede2','#fffaf3','#ecdcc8','#3a120c','#7a5a50','#a82a20','#1e7a5c'), ink: { deep: '#ecdcc8', lacquer: '#a82a20', jade: '#2a9a74', pearl: '#fff6ea', gold: '#e8c46a', cinnabar: '#5a120c', candle: '#ffd28a' } },
  (k, mode) => {
    const letters = 'ABCDEFGHIJKLM'.split('')
    const boardArt = svg(`<rect x="6" y="10" width="148" height="220" rx="10" fill="${k.lacquer}" stroke="${k.gold}" stroke-width="3"/>${letters.map((c, i) => { const t = Math.PI * (0.15 + (i / 12) * 0.7); return `<text x="${(80 - 58 * Math.cos(t)).toFixed(1)}" y="${(120 - 58 * Math.sin(t)).toFixed(1)}" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${k.pearl}">${c}</text>` }).join('')}<text x="30" y="40" font-family="Georgia,serif" font-size="12" fill="${k.gold}">YES</text><text x="110" y="40" font-family="Georgia,serif" font-size="12" fill="${k.gold}">NO</text><circle cx="80" cy="160" r="12" fill="none" stroke="${k.gold}" stroke-width="2"/><path d="M80 148v24M68 160h24" stroke="${k.gold}"/><text x="80" y="210" text-anchor="middle" font-family="Georgia,serif" font-size="11" letter-spacing="3" fill="${k.pearl}">GOODBYE</text><g fill="${a(k.jade, .7)}"><circle cx="20" cy="220" r="3"/><circle cx="140" cy="220" r="3"/></g>`)
    const planchette = svg(`<g transform="translate(80 118)"><path d="M0 -22c16 0 22 16 14 30L0 30-14 8c-8-14-2-30 14-30z" fill="${a(k.jade, .9)}" stroke="${k.gold}" stroke-width="2"/><circle cy="-4" r="7" fill="${a(k.pearl, .6)}" stroke="${k.gold}" stroke-width="2"/></g>`)
    const shrine = svg(`<rect x="14" y="20" width="132" height="200" fill="${k.lacquer}" stroke="${k.gold}" stroke-width="4"/><path d="M14 20l66-16 66 16" fill="${k.cinnabar}" stroke="${k.gold}" stroke-width="3"/><path d="M80 20v200" stroke="${k.gold}" stroke-width="2"/><g fill="none" stroke="${a(k.pearl, .8)}" stroke-width="1.6"><path d="M30 190c10-20 30-24 40-10M34 180l-6-10M96 60c14 10 30 6 36-6M120 56l8-8"/><circle cx="40" cy="80" r="6"/></g><g fill="${k.gold}" opacity=".6">${loop(10, 13, (x) => `<circle cx="${22 + x}" cy="${210 - (x % 3) * 4}" r="1"/>`)}</g>`)
    const candles = svg(`${[[48, 100], [80, 80], [112, 110]].map(([x, y]) => `<rect x="${x - 5}" y="${y}" width="10" height="26" fill="${k.pearl}"/><path d="M${x} ${y - 14}c5 6 5 10 0 13-5-3-5-7 0-13z" fill="${k.candle}"/><circle cx="${x}" cy="${y - 8}" r="11" fill="${a(k.candle, .25)}"/>`).join('')}`)
    const cloud = (x: number, y: number, w: number) => `<path d="M${x} ${y}h${w}a14 14 0 0 0 0-28h-${w * 0.3}a18 18 0 0 0-34-8h-${w * 0.4}a12 12 0 0 0 0 24z" fill="${a(k.jade, .28)}" stroke="${a(k.gold, .9)}" stroke-width="2.5"/>`
    const screen = `<g stroke="${a(k.gold, .55)}" stroke-width="3">${loop(5, 320, (x) => `<path d="M${320 + x} 0v400"/>`)}</g><circle cx="1180" cy="120" r="74" fill="${a(k.gold, .55)}" stroke="${k.gold}" stroke-width="5"/><circle cx="1180" cy="120" r="100" fill="none" stroke="${a(k.gold, .5)}" stroke-width="2" stroke-dasharray="4 10"/>${cloud(180, 150, 160)}${cloud(620, 90, 120)}${cloud(1380, 210, 110)}<path d="M0 400V300c120-90 200-140 300-60s180 10 280-60 200-50 300 30 180 60 300-10 260-80 420 20v180z" fill="${a(k.cinnabar, .45)}"/><path d="M0 400V330c160-110 260-120 380-40s220 20 330-80 220-80 330 20 260 120 560 30v70z" fill="${a(k.lacquer, .9)}"/><g fill="none" stroke="${k.gold}" stroke-width="4"><path d="M0 330c160-110 260-120 380-40s220 20 330-80 220-80 330 20 260 120 560 30"/><path d="M0 370c200-60 340-40 480 0s320-30 520-40 400 30 600 10" stroke-width="2"/></g><g fill="${k.gold}">${loop(40, 40, (x) => `<circle cx="${x + 10}" cy="${340 + ((x * 7) % 50)}" r="2"/>`)}</g>`
    const makie = `<path d="M0 400V330c160-110 260-120 380-40s220 20 330-80 220-80 330 20 260 120 560 30v70z" fill="${a(k.gold, .1)}"/><g fill="none" stroke="${a(k.gold, .8)}" stroke-width="4"><path d="M0 330c160-110 260-120 380-40s220 20 330-80 220-80 330 20 260 120 560 30"/><path d="M0 370c200-60 340-40 480 0s320-30 520-40 400 30 600 10" stroke-width="2"/></g><g fill="${a(k.gold, .4)}">${loop(40, 40, (x) => `<circle cx="${x + 10}" cy="${300 + ((x * 7) % 80)}" r="1.6"/>`)}</g><circle cx="1260" cy="120" r="60" fill="${a(k.pearl, .5)}"/>`
    return {
      backdrop: mode === 'light' ? `${landmark(screen, '0 0 1600 400', 'center bottom')},radial-gradient(ellipse at 74% 22%,${a(k.gold, .45)},transparent 42%),linear-gradient(180deg,#f6dfb4,var(--venus-bg) 55%,#efd3b0)` : `${landmark(makie)},radial-gradient(ellipse at 20% 20%,${a(k.jade, .12)},transparent 45%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `radial-gradient(circle,${a(k.gold, mode === 'light' ? .75 : .35)} 0 1px,transparent 1.6px),radial-gradient(circle,${a(mode === 'light' ? k.lacquer : k.pearl, mode === 'light' ? .35 : .25)} 0 1.4px,transparent 2px)`, sceneSize: '23px 29px,71px 53px',
      ornament: `radial-gradient(circle,${a(k.candle, .5)} 0 2px,${a(k.candle, .12)} 3px 10px,transparent 12px)`, ornamentSize: '181px 223px',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 45%,${a(k.deep, .55)})`, line: `linear-gradient(${k.jade},${k.gold} 40%,${k.pearl} 70%,${k.cinnabar})`, lineSpeed: '5s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(boardArt)},linear-gradient(${k.deep},${k.lacquer})`,
      panelRight: `${scenery(shrine)},radial-gradient(circle at 50% 42%,${a(k.candle, .25)},transparent 45%),linear-gradient(${k.deep},${k.lacquer})`,
      panelDetail: sheen, panelGlyphs: ['☾', '◉'],
      panelInteriors: { left: { object: board(planchette), aspect: BOARD, animation: `venus-ten-seance-glide 11s ${ease} infinite` }, right: { object: board(candles), aspect: BOARD, animation: `venus-ten-inner-lacquer-seance 5s ${ease} infinite` } },
      panelOverlay: `radial-gradient(ellipse at 50% 50%,${a(k.jade, .35)},transparent 55%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'soft-light', panelOverlayOpacity: .3,
      portraitRadius: '0 40px 0 40px',
      plaque: `linear-gradient(${k.lacquer},${mode === 'dark' ? '#050403' : '#7a1c14'})`, plaqueText: k.pearl, plaqueBorder: k.gold, plaqueShadow: `0 0 0 3px ${k.gold},0 0 0 6px ${k.cinnabar},0 12px 26px ${a('#000000', .5)}`, plaqueInset: `radial-gradient(circle,${a(k.pearl, .6)} 0 1px,transparent 1.6px) 0 0/9px 13px`, plaqueRadius: '0 14px',
      headingFont: fonts.cormorant, bodyFont: fonts.garamond, monoFont: fonts.mono,
      ...motion('lacquer-seance', {
        scene: [30, ease, '0%,100%{background-position:0 0,0 0;filter:brightness(.9)}50%{background-position:10px 10px,-10px 6px;filter:brightness(1.2)}'],
        world: [26, ease, '0%,100%{background-position:0 0,0 0}50%{background-position:40px -120px,0 0}'],
        inner: [5, ease, '0%,100%{transform:translateY(3%)}50%{transform:translateY(-4%)}'],
        overlay: [3, ease, '0%,100%{filter:opacity(.6)}50%{filter:opacity(1)}'],
        extra: '@keyframes venus-ten-seance-glide{0%,100%{transform:translate(-26%,-8%) rotate(-10deg)}20%{transform:translate(-10%,-22%) rotate(0)}40%{transform:translate(14%,-20%) rotate(8deg)}60%{transform:translate(26%,-6%) rotate(12deg)}80%{transform:translate(0,14%) rotate(0)}}',
      }),
    }
  })

/* ───────────── Velvet Seismograph ───────────── */
interface OperaInk { deep: string; velvet: string; paper: string; red: string; brass: string; stage: string }
const seismograph = world<OperaInk>('velvet-seismograph', 'Velvet Seismograph', 'An opera house wired for earthquakes: a brass seismograph scribbling every high C in red ink, and a soprano whose voice ripples the plum velvet.', ['opera','seismograph','velvet','plum','soprano','waveform','brass','theatre'],
  { skin: skin('#1c0617','#2a0c22','#3a1230','#fbeef4','#cfa8bf','#ff4d5e','#d9a441'), ink: { deep: '#1f0719', velvet: '#4a0f3a', paper: '#f4e9d8', red: '#ff4d5e', brass: '#d9a441', stage: '#2a0a22' } },
  { skin: skin('#f7eaf1','#fffafc','#efd8e6','#3a0a2a','#7a5470','#c0183a','#a8801f'), ink: { deep: '#efd8e6', velvet: '#b03a7e', paper: '#fffaf2', red: '#d61f3c', brass: '#a8801f', stage: '#f2dcea' } },
  (k, mode) => {
    const machine = svg(`<rect x="10" y="150" width="140" height="70" rx="6" fill="${k.brass}"/><rect x="18" y="158" width="124" height="54" rx="4" fill="${a(k.deep, .5)}"/><circle cx="30" cy="110" r="22" fill="${k.brass}"/><circle cx="130" cy="110" r="22" fill="${k.brass}"/><rect x="18" y="90" width="124" height="40" fill="${k.paper}"/><g stroke="${a(k.red, .3)}" stroke-width=".6">${loop(10, 12, (x) => `<path d="M${x + 22} 90v40"/>`)}</g><path d="M80 30v56" stroke="${k.brass}" stroke-width="4"/><path d="M80 86l-4 10h8z" fill="${k.red}"/><circle cx="80" cy="30" r="10" fill="${k.brass}"/><g fill="${k.paper}" font-family="Georgia,serif" font-size="9"><text x="30" y="200">RICHTER · ACT III</text></g>`)
    const wave = svg(`<path d="M0 20c4 0 4-14 8-14s4 26 8 26 4-18 8-18 4 10 8 10 4-24 8-24 4 30 8 30 4-12 8-12 4 6 8 6 4-16 8-16 4 12 8 12" fill="none" stroke="${k.red}" stroke-width="1.6"/>`, '0 0 80 40')
    const stage = svg(`<rect width="160" height="240" fill="${k.stage}"/><path d="M0 0h160v30H0z" fill="${k.velvet}"/><path d="M0 30q40 30 80 0t80 0" fill="${k.velvet}"/><path d="M0 0v240h26c-10-80 10-150-4-240zM160 0v240h-26c10-80-10-150 4-240z" fill="${k.velvet}"/><g fill="${k.brass}"><circle cx="22" cy="120" r="5"/><circle cx="138" cy="120" r="5"/><path d="M18 125l4 30 4-30zM134 125l4 30 4-30z"/></g><rect x="0" y="206" width="160" height="34" fill="${k.brass}"/><path d="M80 206c-10-10-12-40-4-56 6-4 10-4 12 2 4 16 0 40-8 54z" fill="${k.deep}"/><circle cx="82" cy="140" r="8" fill="${k.deep}"/><path d="M88 150l14-14" stroke="${k.deep}" stroke-width="3"/>`)
    const aria = svg(`<g fill="none" stroke="${k.brass}" stroke-width="2.4" stroke-linecap="round"><path d="M100 130q14 10 0 24M110 122q22 18 0 40M120 114q30 26 0 56"/></g>`)
    const house = `<g fill="${a(k.velvet, .95)}"><path d="M300 400V200l500-120 500 120v200z"/></g><g fill="${a(k.brass, .6)}">${loop(10, 90, (x) => `<rect x="${360 + x}" y="210" width="26" height="190"/>`)}<path d="M290 200l510-126 510 126z" fill="${a(k.brass, .35)}"/></g><path d="M0 330l200 20 60-40 120 50 140-30 180 60 200-50 160 30 220-40 180 40 140-20" fill="none" stroke="${a(k.red, .6)}" stroke-width="4"/>`
    return {
      backdrop: `${landmark(house)},radial-gradient(ellipse at 50% 0,${a(k.brass, .14)},transparent 45%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `repeating-linear-gradient(90deg,${a(k.velvet, .5)} 0 20px,${a(k.deep, .5)} 20px 40px),linear-gradient(180deg,${a(k.deep, .5)},transparent 40%)`, sceneSize: 'auto,auto',
      ornament: `${svg(`<path d="M0 20c5 0 5-16 10-16s5 30 10 30 5-22 10-22 5 12 10 12 5-18 10-18 5 20 10 20 5-8 10-8 5 4 10 4" fill="none" stroke="${k.red}" stroke-width="1.4" opacity=".4"/>`, '0 0 80 40')}`, ornamentSize: '320px 160px',
      paper: `radial-gradient(ellipse at 50% 100%,${a(k.brass, .12)},transparent 55%)`, line: `linear-gradient(${k.red},${k.brass} 45%,${k.paper} 75%,${k.red})`, lineSpeed: '2.4s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(machine)},linear-gradient(${k.velvet},${k.deep})`,
      panelRight: `${scenery(stage)},linear-gradient(${k.velvet},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['♪', '∿'],
      panelInteriors: { left: { object: `${wave} 0 50%/80px 30px repeat-x`, inset: '37.5% 11% 45.8% 11%', animation: 'venus-ten-seismo-scroll 2.6s linear infinite' }, right: { object: board(aria), aspect: BOARD, origin: '62% 58%', animation: `venus-ten-inner-velvet-seismograph 2.2s ${ease} infinite` } },
      panelOverlay: `linear-gradient(180deg,${a(k.brass, .35)},transparent 30%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'soft-light', panelOverlayOpacity: .35,
      portraitRadius: '40% 40% 4px 4px / 16% 16% 4px 4px',
      plaque: `linear-gradient(${k.velvet},${mode === 'dark' ? '#2a0620' : '#8a2a60'})`, plaqueText: '#fff4e6', plaqueBorder: k.brass, plaqueShadow: `0 0 0 3px ${k.brass},0 0 0 6px ${k.deep},0 12px 28px ${a('#000000', .45)}`, plaqueInset: `linear-gradient(${k.brass},${k.brass}) 0 100%/100% 3px no-repeat,${svg(`<path d="M0 10c3 0 3-8 6-8s3 14 6 14 3-10 6-10 3 6 6 6" fill="none" stroke="${k.red}" stroke-width="1.2" opacity=".6"/>`, '0 0 24 20')} 0 50%/40px 20px repeat-x`, plaqueRadius: '14px 14px 2px 2px',
      headingFont: `"Playfair Display",${fonts.dmSerif}`, bodyFont: fonts.garamond, monoFont: fonts.mono,
      ...motion('velvet-seismograph', {
        scene: [9, ease, '0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.04)}'],
        world: [12, 'linear', 'from{background-position:0 0,0 0}to{background-position:-320px 0,0 0}'],
        inner: [2.2, ease, '0%{transform:scale(.6);opacity:0}30%{opacity:1}100%{transform:scale(1.5);opacity:0}'],
        overlay: [5, ease, '0%,100%{filter:opacity(.6)}50%{filter:opacity(1)}'],
        extra: '@keyframes venus-ten-seismo-scroll{from{background-position:0 50%}to{background-position:-160px 50%}}',
      }),
    }
  })

/* ───────────── Moiré Opera ───────────── */
interface MoireInk { deep: string; line: string; blue: string; red: string }
const moire = world<MoireInk>('moire-opera', 'Moiré Opera', 'A pure op-art performance: black and white rings sliding over rings until the air itself shimmers, with one electric blue note and one red.', ['op-art','moire','optical','monochrome','interference','opera','geometric','electric blue'],
  { skin: skin('#000000','#0b0b0b','#161616','#ffffff','#a8a8a8','#ffffff','#2563ff'), ink: { deep: '#000000', line: '#ffffff', blue: '#2563ff', red: '#ff2a4a' } },
  { skin: skin('#ffffff','#f6f6f6','#ececec','#000000','#555555','#000000','#1f4fe0'), ink: { deep: '#ffffff', line: '#000000', blue: '#1f4fe0', red: '#e0103a' } },
  (k) => ({
    backdrop: `repeating-radial-gradient(circle at 0 100%,${a(k.line, .12)} 0 3px,transparent 3px 14px),repeating-radial-gradient(circle at 100% 0,${a(k.line, .1)} 0 3px,transparent 3px 15px),linear-gradient(var(--venus-bg),var(--venus-bg))`,
    scene: `repeating-linear-gradient(90deg,${a(k.line, .1)} 0 2px,transparent 2px 9px)`, sceneSize: 'auto',
    ornament: `repeating-linear-gradient(93deg,${a(k.line, .1)} 0 2px,transparent 2px 9px),radial-gradient(circle at 70% 30%,${a(k.blue, .25)} 0 60px,transparent 62px)`, ornamentSize: 'auto,auto',
    paper: `radial-gradient(circle at 25% 75%,${a(k.red, .18)} 0 30px,transparent 32px)`, line: `linear-gradient(${k.line},${k.blue} 50%,${k.red})`, lineSpeed: '1.8s',
    panelLayout: 'fixed',
    panelLeft: `repeating-radial-gradient(circle at 50% 50%,${k.line} 0 2px,transparent 2px 7px),linear-gradient(${k.deep},${k.deep})`,
    panelRight: `repeating-conic-gradient(from 0deg at 50% 50%,${k.line} 0 3deg,transparent 3deg 6deg),linear-gradient(${k.deep},${k.deep})`,
    panelDetail: 'linear-gradient(transparent,transparent)', panelGlyphs: ['◉', '●'],
    panelInteriors: { left: { object: `repeating-radial-gradient(circle at 50% 50%,${a(k.blue, .95)} 0 2px,transparent 2px 7.4px)`, animation: `venus-ten-inner-moire-opera 6s ${ease} infinite` }, right: { object: `repeating-conic-gradient(from 0deg at 50% 50%,${a(k.red, .9)} 0 3deg,transparent 3deg 6.2deg)`, animation: 'venus-ten-moire-spin 20s linear infinite' } },
    panelOverlay: 'linear-gradient(transparent,transparent)', panelOverlayOpacity: 0,
    portraitRadius: '50%',
    plaque: k.deep, plaqueText: k.line, plaqueBorder: k.line, plaqueShadow: `0 0 0 3px ${k.deep},0 0 0 5px ${k.line},6px 6px 0 5px ${k.blue}`, plaqueInset: `repeating-linear-gradient(90deg,${k.line} 0 2px,transparent 2px 5px) 0 0/14px 100% no-repeat,repeating-linear-gradient(90deg,${k.line} 0 2px,transparent 2px 5px) 100% 0/14px 100% no-repeat`, plaqueRadius: '0',
    headingFont: fonts.bigShoulders, bodyFont: fonts.instrument, monoFont: fonts.mono,
    ...motion('moire-opera', {
      scene: [20, 'linear', 'from{transform:rotate(0) scale(1.3)}to{transform:rotate(360deg) scale(1.3)}'],
      world: [11, ease, '0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}'],
      inner: [6, ease, '0%,100%{transform:translate(-14%,-8%)}50%{transform:translate(14%,8%)}'],
      overlay: [1, 'linear', 'from{opacity:0}to{opacity:0}'],
      extra: '@keyframes venus-ten-moire-spin{to{transform:rotate(360deg) scale(1.2)}}',
    }),
  }))

/* ───────────── The Storm Surveyor (monsoon-cartography) ───────────── */
interface StormInk { deep: string; paper: string; contour: string; isobar: string; rain: string; land: string; red: string }
const storm = world<StormInk>('monsoon-cartography', 'The Storm Surveyor', 'A cartographer chasing the monsoon: isobars coiling around a live cyclone, cold fronts marching across the chart, and a rain gauge that keeps filling.', ['cartography','monsoon','weather map','isobar','cyclone','rain gauge','survey','storm'],
  { skin: skin('#121d27','#1a2835','#223445','#eef5fb','#9fb3c4','#ff8c42','#7fb6ff'), ink: { deep: '#14202b', paper: '#1c2c3a', contour: '#ff8c42', isobar: '#7fb6ff', rain: '#bfe0ff', land: '#2a4a3e', red: '#ff4d4d' } },
  { skin: skin('#f2f3ec','#ffffff','#e3e6da','#1a2a3a','#5a6a70','#d9601a','#2f6fd0'), ink: { deep: '#e3e6da', paper: '#f7f5ec', contour: '#d9601a', isobar: '#2f6fd0', rain: '#4f7fa8', land: '#cfe0c4', red: '#d61f1f' } },
  (k, mode) => {
    const chart = svg(`<rect width="160" height="240" fill="${k.paper}"/><path d="M0 150c20-10 30 10 50 0s30-40 60-30 30 20 50 10v110H0z" fill="${k.land}"/><g fill="none" stroke="${k.isobar}" stroke-width="1.4">${[18, 32, 48, 66].map((r) => `<ellipse cx="96" cy="82" rx="${r}" ry="${r * .8}"/>`).join('')}</g><text x="30" y="200" font-family="Georgia,serif" font-weight="700" font-size="18" fill="${k.isobar}">H</text><path d="M10 40c30 20 50 60 40 110" fill="none" stroke="${k.isobar}" stroke-width="3"/><g fill="${k.isobar}">${[[18, 48], [30, 62], [40, 80], [46, 100], [48, 122]].map(([x, y]) => `<path d="M${x} ${y}l8 -2-4 8z"/>`).join('')}</g><g stroke="${a(k.rain, .3)}" stroke-width=".6">${loop(8, 20, (x) => `<path d="M${x + 10} 0v240"/>`)}${loop(12, 20, (y) => `<path d="M0 ${y + 10}h160"/>`)}</g>`)
    const cyclone = svg(`<g transform="translate(96 82)" fill="none" stroke="${k.red}" stroke-width="3" stroke-linecap="round"><path d="M0 0c10-2 14 8 6 14s-22 0-22-14 16-24 30-18"/><path d="M0 0c-10 2-14-8-6-14s22 0 22 14-16 24-30 18"/></g><text x="92" y="88" font-family="Georgia,serif" font-weight="700" font-size="10" fill="${k.red}">L</text>`)
    const gauge = svg(`<rect x="52" y="30" width="56" height="180" rx="8" fill="${a(k.rain, .15)}" stroke="${k.rain}" stroke-width="3"/><path d="M44 30h72l-10 14H54z" fill="${k.contour}"/><g stroke="${k.rain}" stroke-width="1.4">${loop(15, 11, (y) => `<path d="M52 ${60 + y}h${y % 22 ? 8 : 16}"/>`)}</g><g font-family="Lucida Console,monospace" font-size="8" fill="${k.rain}"><text x="112" y="66">150</text><text x="112" y="132">80</text><text x="112" y="200">0</text></g><g transform="translate(30 220)"><circle r="12" fill="none" stroke="${k.contour}" stroke-width="2"/><path d="M0 -10l4 10-4 10-4-10z" fill="${k.contour}"/></g>`)
    const water = svg(`<rect x="56" y="100" width="48" height="106" rx="4" fill="${a(k.isobar, .75)}"/><path d="M56 100q12 -6 24 0t24 0" fill="${a(k.rain, .6)}"/>`)
    const map = `<g fill="none" stroke="${a(k.isobar, .35)}" stroke-width="2">${[60, 110, 170, 240].map((r) => `<ellipse cx="1300" cy="80" rx="${r * 1.6}" ry="${r}"/>`).join('')}</g><path d="M0 360c140-40 260 20 400-10s260-80 420-40 300 70 460 30 220-40 320-20" fill="none" stroke="${a(k.red, .5)}" stroke-width="4" stroke-dasharray="18 12"/><path d="M0 400V330c120-30 240 10 360-20s240-60 380-30 200 50 320 30v90z" fill="${a(k.land, .6)}"/>`
    return {
      backdrop: `${landmark(map)},linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `linear-gradient(${a(k.isobar, .08)} 1px,transparent 1px),linear-gradient(90deg,${a(k.isobar, .08)} 1px,transparent 1px),repeating-linear-gradient(106deg,transparent 0 30px,${a(k.rain, .12)} 31px 32px)`, sceneSize: '80px 80px,80px 80px,auto',
      ornament: `repeating-radial-gradient(ellipse at 30% 60%,transparent 0 70px,${a(k.contour, .12)} 71px 73px,transparent 74px 100px)`, ornamentSize: 'auto',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 55%,${a(k.deep, .5)})`, line: `linear-gradient(${k.contour},${k.isobar} 50%,${k.red})`, lineSpeed: '3s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(chart)},linear-gradient(${k.paper},${k.paper})`,
      panelRight: `${scenery(gauge)},linear-gradient(${k.paper},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['⌖', '≋'],
      panelInteriors: { left: { object: board(cyclone), aspect: BOARD, origin: '60% 34.2%', animation: 'venus-ten-inner-monsoon-cartography 4s linear infinite' }, right: { object: board(water), aspect: BOARD, origin: '50% 85.8%', animation: `venus-ten-storm-fill 8s ${ease} infinite` } },
      panelOverlay: `repeating-linear-gradient(106deg,transparent 0 10px,${a(k.rain, .35)} 11px 12px)`, panelOverlayBlend: 'normal', panelOverlayOpacity: .3,
      portraitRadius: '3px',
      plaque: mode === 'dark' ? '#eef5fb' : '#ffffff', plaqueText: '#1a2a3a', plaqueBorder: k.contour, plaqueShadow: `0 0 0 2px ${k.isobar},4px 4px 0 2px ${k.contour}`, plaqueInset: `repeating-radial-gradient(ellipse at 100% 50%,transparent 0 8px,${a(k.isobar, .3)} 9px 10px)`, plaqueRadius: '0',
      headingFont: fonts.plexMono, bodyFont: fonts.dmSans, monoFont: fonts.plexMono,
      ...motion('monsoon-cartography', {
        scene: [2.4, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:0 0,0 0,-30px 100px}'],
        world: [30, 'linear', 'from{transform:rotate(0) scale(1.2)}to{transform:rotate(360deg) scale(1.2)}'],
        inner: [4, 'linear', 'to{transform:rotate(-360deg)}'],
        overlay: [1.2, 'linear', 'from{transform:translate(0,0)}to{transform:translate(-3%,10%)}'],
        extra: '@keyframes venus-ten-storm-fill{0%{transform:scaleY(.05)}80%,90%{transform:scaleY(1)}100%{transform:scaleY(.05)}}',
      }),
    }
  })

/* ───────────── Candlewax Ministry ───────────── */
interface MinistryInk { deep: string; manila: string; red: string; carbon: string; steel: string; ink: string; lamp: string }
const ministry = world<MinistryInk>('candlewax-ministry', 'Candlewax Ministry', 'The Ministry of Minor Miracles, after hours: filing cabinets that open themselves, carbon copies in triplicate, and a rubber stamp that approves everything eventually.', ['bureaucracy','ministry','filing','rubber stamp','wax seal','manila','typewriter','ledger'],
  { skin: skin('#171512','#221f1a','#2e2a23','#f6ecd6','#b7ab92','#e8d6a8','#d23a3a'), ink: { deep: '#191612', manila: '#e8d6a8', red: '#d23a3a', carbon: '#5b7bd5', steel: '#5a6068', ink: '#2a2a2a', lamp: '#b6d86a' } },
  { skin: skin('#efe3c4','#fbf4e0','#e3d4ae','#26221a','#6a604a','#a3232a','#2c4f9e'), ink: { deep: '#e3d4ae', manila: '#f6e9c6', red: '#a3232a', carbon: '#2c4f9e', steel: '#8a9098', ink: '#2a2a2a', lamp: '#6a8a2a' } },
  (k, mode) => {
    const cabinet = svg(`<rect x="24" y="14" width="112" height="222" rx="4" fill="${k.steel}" stroke="${a(k.ink, .6)}" stroke-width="2"/>${[20, 74, 128, 182].map((y, i) => `<rect x="32" y="${y}" width="96" height="48" rx="3" fill="${a('#ffffff', .08)}" stroke="${a(k.ink, .6)}"/><rect x="62" y="${y + 10}" width="36" height="14" fill="${k.manila}" stroke="${k.ink}"/><text x="80" y="${y + 21}" text-anchor="middle" font-family="Courier New,monospace" font-size="9" fill="${k.ink}">${['A–F', 'MIR', 'Q–S', 'X–Z'][i]}</text><rect x="70" y="${y + 30}" width="20" height="5" rx="2" fill="${k.ink}"/>`).join('')}`)
    const drawer = svg(`<rect x="28" y="70" width="104" height="52" rx="3" fill="${k.steel}" stroke="${k.ink}" stroke-width="1.5"/><rect x="36" y="58" width="88" height="16" fill="${k.manila}"/><path d="M40 58v-8h20v8M70 58v-12h24v12" fill="${k.manila}" stroke="${a(k.ink, .4)}"/><rect x="62" y="80" width="36" height="14" fill="${k.manila}" stroke="${k.ink}"/><text x="80" y="91" text-anchor="middle" font-family="Courier New,monospace" font-size="9" fill="${k.red}">MIR</text>`)
    const desk = svg(`<rect x="16" y="40" width="128" height="170" fill="${k.manila}" stroke="${a(k.ink, .3)}"/><g stroke="${a(k.carbon, .5)}" stroke-width="1">${loop(9, 12, (y) => `<path d="M28 ${70 + y}h${80 + (y % 24)}"/>`)}</g><text x="28" y="60" font-family="Courier New,monospace" font-weight="700" font-size="10" fill="${k.ink}">FORM 7-B · MIRACLE</text><text x="80" y="176" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="16" fill="${a(k.red, .35)}" transform="rotate(-12 80 176)">APPROVED</text><circle cx="120" cy="196" r="12" fill="${k.red}"/><path d="M112 196l8 8 8-8-8-8z" fill="${a('#000000', .25)}"/>`)
    const stamp = svg(`<g transform="translate(80 130)"><rect x="-22" y="0" width="44" height="12" fill="${k.red}"/><rect x="-16" y="-20" width="32" height="20" fill="#5a3a22"/><rect x="-6" y="-50" width="12" height="30" fill="#7a4a2a"/><ellipse cy="-54" rx="14" ry="8" fill="#5a3a22"/></g>`)
    const building = `<g fill="${a(k.steel, .7)}"><rect x="300" y="120" width="1000" height="280"/><path d="M280 120l520-80 520 80z"/></g><g fill="${a(k.deep, .6)}">${loop(14, 70, (x) => loop(4, 60, (y) => `<rect x="${330 + x}" y="${150 + y}" width="36" height="40"/>`))}</g><rect x="890" y="270" width="36" height="40" fill="${a(k.lamp, .9)}"/><circle cx="800" cy="90" r="30" fill="${a(k.manila, .9)}" stroke="${a(k.ink, .6)}" stroke-width="4"/><path d="M800 90v-20M800 90l14 8" stroke="${a(k.ink, .8)}" stroke-width="4"/>`
    return {
      backdrop: `${landmark(building)},radial-gradient(ellipse at 56% 80%,${a(k.lamp, .15)},transparent 30%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `repeating-linear-gradient(0deg,transparent 0 23px,${a(k.carbon, .12)} 24px 25px),linear-gradient(90deg,transparent 0 60px,${a(k.red, .14)} 61px 62px,transparent 63px)`, sceneSize: 'auto,auto',
      ornament: `${svg(`<g transform="rotate(-14 60 30)"><rect x="12" y="12" width="96" height="30" rx="4" fill="none" stroke="${k.red}" stroke-width="3" opacity=".22"/><text x="60" y="34" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="15" fill="${k.red}" opacity=".22">FILED</text></g>`, '0 0 120 60')}`, ornamentSize: '360px 260px',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 50%,${a(k.deep, .5)})`, line: `linear-gradient(${k.red},${k.manila} 50%,${k.carbon})`, lineSpeed: '6s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(cabinet)},linear-gradient(${k.deep},${a(k.steel, .6)})`,
      panelRight: `${scenery(desk)},radial-gradient(circle at 80% 10%,${a(k.lamp, .25)},transparent 40%),linear-gradient(#4a3424,#2a1c12)`,
      panelDetail: sheen, panelGlyphs: ['§', '⚖'],
      panelInteriors: { left: { object: board(drawer), aspect: BOARD, animation: `venus-ten-ministry-drawer 5s ${ease} infinite` }, right: { object: board(stamp), aspect: BOARD, animation: 'venus-ten-inner-candlewax-ministry 3s cubic-bezier(.7,0,.3,1) infinite' } },
      panelOverlay: `radial-gradient(ellipse at 70% 0,${a(k.lamp, .5)},transparent 45%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .3,
      portraitRadius: '1px',
      plaque: k.manila, plaqueText: '#26221a', plaqueBorder: a(k.ink, .5), plaqueShadow: `0 -6px 0 -2px ${k.manila},0 8px 20px ${a('#000000', .35)}`, plaqueInset: studs(`${k.red} 0 6px,${a(k.red, .6)} 6.5px 8px,transparent 8.5px`, `transparent 0 1px,transparent 2px`, 18), plaqueRadius: '10px 10px 0 0',
      headingFont: fonts.typewriter, bodyFont: fonts.sourceSerif, monoFont: fonts.typewriter,
      ...motion('candlewax-ministry', {
        scene: [40, 'linear', 'from{background-position:0 0,0 0}to{background-position:0 250px,0 0}'],
        world: [45, 'linear', 'from{background-position:0 0,0 0}to{background-position:360px 260px,0 0}'],
        inner: [3, 'cubic-bezier(.7,0,.3,1)', '0%,30%{transform:translateY(-14%)}42%{transform:translateY(14%) scale(1.04)}48%{transform:translateY(12%)}65%,100%{transform:translateY(-14%)}'],
        overlay: [7, ease, '0%,100%{filter:opacity(.7)}50%{filter:opacity(1)}'],
        extra: '@keyframes venus-ten-ministry-drawer{0%,20%,100%{transform:translateY(0) scale(1)}40%,70%{transform:translateY(4%) scale(1.14)}}',
      }),
    }
  })

/* ───────────── Raku Weather Station ───────────── */
interface RakuInk { deep: string; glaze: string; crackle: string; copper: string; smoke: string; clay: string; flame: string }
const raku = world<RakuInk>('raku-weather-station', 'Raku Weather Station', 'A potter’s weather station in the mountains: a turquoise tea bowl crackling in the kiln, copper cups spinning in the wind, and clouds brushed in smoky ink.', ['raku','ceramic','kiln','crackle glaze','weather','copper','anemometer','mountain'],
  { skin: skin('#131313','#1d1d1c','#282826','#f2efe8','#b0aaa0','#3fd0c9','#d9824a'), ink: { deep: '#141414', glaze: '#3fd0c9', crackle: '#0e3a38', copper: '#d9824a', smoke: '#3a3a3a', clay: '#8a5a3a', flame: '#ff8a3d' } },
  { skin: skin('#efe9e0','#fbf8f2','#e3dbcf','#23201c','#6a6258','#1f9a92','#b0602a'), ink: { deep: '#e3dbcf', glaze: '#2fb3ab', crackle: '#0e5a56', copper: '#b0602a', smoke: '#b8b0a4', clay: '#a8744a', flame: '#f07a2a' } },
  (k, mode) => {
    const kiln = svg(`<path d="M20 240V160q60-40 120 0v80z" fill="${k.clay}" stroke="${a('#000000', .3)}" stroke-width="2"/><path d="M50 240v-40q30-20 60 0v40z" fill="${a('#000000', .7)}"/><path d="M36 150c0-40 88-40 88 0-10 30-78 30-88 0z" fill="${k.glaze}" stroke="${k.crackle}" stroke-width="2"/><g stroke="${k.crackle}" stroke-width="1.2" fill="none"><path d="M50 140l10 10 8-6 10 12 12-8 10 10 14-6M60 128l6 10M90 128l-4 12M104 132l6 12"/></g><ellipse cx="80" cy="130" rx="44" ry="10" fill="${a(k.crackle, .6)}"/><path d="M40 150c10 8 70 8 80 0" stroke="${k.copper}" stroke-width="3" fill="none"/>`)
    const flames = svg(`<g transform="translate(80 236)">${[[-20, 26], [0, 34], [20, 24]].map(([x, h]) => `<path d="M${x} 0c-8 -${h / 2} 0 -${h} ${x ? 2 : 0} -${h}c6 ${h / 2} 8 ${h / 2} -2 ${h}z" fill="${k.flame}"/>`).join('')}</g>`)
    const station = svg(`<path d="M80 60v180" stroke="${k.copper}" stroke-width="5"/><path d="M60 236h40" stroke="${k.copper}" stroke-width="6"/><path d="M80 110l30 -6-4 6 4 6z" fill="${k.copper}"/><path d="M80 110l-30 0" stroke="${k.copper}" stroke-width="3"/><path d="M44 104l6 6-6 6" fill="none" stroke="${k.copper}" stroke-width="3"/><g font-family="Georgia,serif" font-size="10" fill="${k.glaze}"><text x="74" y="150">N</text></g><g fill="none" stroke="${a(k.smoke, .9)}" stroke-width="6" stroke-linecap="round"><path d="M10 40c20-10 40 0 60-6M90 28c20-8 40 0 60-4"/></g>`)
    const cups = svg(`<g transform="translate(80 60)"><g stroke="${k.copper}" stroke-width="3">${loop(3, 120, (r) => `<path d="M0 0v-30" transform="rotate(${r})"/>`)}</g>${loop(3, 120, (r) => `<g transform="rotate(${r}) translate(0 -32)"><path d="M-8 0a8 8 0 0 0 16 0z" fill="${k.glaze}" stroke="${k.copper}" stroke-width="2"/></g>`)}<circle r="5" fill="${k.copper}"/></g>`)
    const mountains = `<path d="M0 400L300 150l160 120 260-240 280 260 160-120 440 230z" fill="${a(k.smoke, mode === 'dark' ? .8 : .5)}"/><path d="M660 90l60-60 70 60-40-10-30 20z" fill="${a('#ffffff', .7)}"/><g fill="none" stroke="${a(k.glaze, .4)}" stroke-width="6" stroke-linecap="round"><path d="M200 120c80-30 160 10 240-20M980 80c80-20 150 10 220-10"/></g><path d="M1240 400v-180l30-30 30 30v180z" fill="${a(k.copper, .7)}"/>`
    return {
      backdrop: `${landmark(mountains)},radial-gradient(ellipse at 30% 10%,${a(k.glaze, .12)},transparent 40%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `${svg(`<g fill="none" stroke="${k.glaze}" stroke-width="1.2" opacity=".18"><path d="M0 40l20 10 14-8 20 16 24-10 22 14 20-6M30 0l6 22M70 0l-4 30M100 50l8 30M50 60l-10 40"/></g>`, '0 0 120 100')}`, sceneSize: '240px 200px',
      ornament: `radial-gradient(ellipse 80px 20px,${a(k.smoke, .5)} 0 60%,transparent 70%),radial-gradient(ellipse 50px 14px,${a(k.smoke, .4)} 0 60%,transparent 70%)`, ornamentSize: '420px 260px,300px 190px',
      paper: `radial-gradient(ellipse at 50% 100%,${a(k.flame, .1)},transparent 45%)`, line: `linear-gradient(${k.glaze},${k.copper} 50%,${k.smoke})`, lineSpeed: '4.6s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(kiln)},radial-gradient(circle at 50% 95%,${a(k.flame, .35)},transparent 40%),linear-gradient(${k.deep},${k.smoke})`,
      panelRight: `${scenery(station)},linear-gradient(${a(k.glaze, .15)},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['☁', '◌'],
      panelInteriors: { left: { object: board(flames), aspect: BOARD, origin: '50% 98%', animation: `venus-ten-raku-flame 1.3s ${ease} infinite` }, right: { object: board(cups), aspect: BOARD, origin: '50% 25%', animation: 'venus-ten-inner-raku-weather-station 1.8s linear infinite' } },
      panelOverlay: `radial-gradient(ellipse 60px 16px,${a(k.smoke, .8)} 0 60%,transparent 70%) 0 0/140px 90px`, panelOverlayBlend: 'normal', panelOverlayOpacity: .35,
      portraitRadius: '46% 54% 50% 50% / 50% 50% 50% 50%',
      plaque: `linear-gradient(${k.glaze},${mode === 'dark' ? '#1f8a84' : '#2fb3ab'})`, plaqueText: '#0a2a28', plaqueBorder: k.copper, plaqueShadow: `0 0 0 3px ${k.copper},0 0 0 5px ${k.deep},0 12px 24px ${a('#000000', .4)}`, plaqueInset: `${svg(`<g fill="none" stroke="#0e3a38" stroke-width="1" opacity=".5"><path d="M0 10l10 4 8-6 12 8 10-4 14 6M20 0l4 10M40 0l-2 12"/></g>`, '0 0 60 20')} 0 0/60px 20px`, plaqueRadius: '8px 14px 10px 12px',
      headingFont: fonts.mincho, bodyFont: fonts.literata, monoFont: fonts.mono,
      ...motion('raku-weather-station', {
        scene: [80, 'linear', 'from{background-position:0 0}to{background-position:240px 200px}'],
        world: [40, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:420px 0,-300px 0,0 0}'],
        inner: [1.8, 'linear', 'to{transform:rotate(360deg)}'],
        overlay: [20, 'linear', 'from{transform:translateX(-10%)}to{transform:translateX(10%)}'],
        extra: '@keyframes venus-ten-raku-flame{0%,100%{transform:scale(1,1) skewX(0)}30%{transform:scale(.9,1.15) skewX(-5deg)}60%{transform:scale(1.08,.9) skewX(4deg)}}',
      }),
    }
  })

/* ───────────── Cicada Embassy ───────────── */
interface CicadaInk { deep: string; leaf: string; wing: string; sky: string; bark: string; amber: string; flag: string }
const cicada = world<CicadaInk>('cicada-embassy', 'Cicada Embassy', 'High summer, embassy of the insects: a cicada humming on sun-baked bark, a tiny flag flying from a twig, telephone wires, and heat you can hear.', ['summer','cicada','insect','embassy','bark','heat','sky','amber'],
  { skin: skin('#1a180b','#252212','#322e19','#fbf7df','#bdb58c','#b7e34b','#8fd3ff'), ink: { deep: '#1c1a0c', leaf: '#6a8a2a', wing: '#c6ef5a', sky: '#8fd3ff', bark: '#4a3a22', amber: '#ffc857', flag: '#ff6a4a' } },
  { skin: skin('#f7f3dc','#fffdf0','#ebe5c6','#2a2a12','#6a664a','#5f8a12','#2f86c9'), ink: { deep: '#ebe5c6', leaf: '#5a7a1a', wing: '#a8d43a', sky: '#9ad6ff', bark: '#8a6a42', amber: '#d99a10', flag: '#e0482a' } },
  (k, mode) => {
    const barkArt = svg(`<rect width="160" height="240" fill="${k.bark}"/><g stroke="${a('#000000', .35)}" stroke-width="3" fill="none">${loop(7, 24, (x) => `<path d="M${x + 8} 0c6 40-6 80 2 120s-4 80 4 120"/>`)}</g><g transform="translate(40 190)"><path d="M0 0c-10-20-6-40 6-46 12 6 16 26 6 46z" fill="${a(k.amber, .7)}" stroke="${k.amber}"/></g>`)
    const bug = svg(`<g transform="translate(80 116)"><path d="M0 -40c10 0 14 14 12 30l-4 50c-2 8-14 8-16 0l-4-50c-2-16 2-30 12-30z" fill="${k.leaf}"/><circle cx="-8" cy="-36" r="5" fill="${k.amber}"/><circle cx="8" cy="-36" r="5" fill="${k.amber}"/><g fill="${a(k.wing, .55)}" stroke="${k.wing}" stroke-width="1.2"><path d="M-2 -20c-30 0-40 50-24 70 12-4 22-40 24-70zM2 -20c30 0 40 50 24 70-12-4-22-40-24-70z"/></g></g>`)
    const skyArt = svg(`<rect width="160" height="240" fill="${k.sky}"/><circle cx="130" cy="30" r="22" fill="#fff6c8"/><g stroke="#2a2a2a" stroke-width="1.2" fill="none"><path d="M0 70q80 20 160 -4M0 84q80 22 160 -2"/></g><path d="M20 240c10-40 40-60 60-110" stroke="${k.bark}" stroke-width="6" fill="none"/><path d="M58 150l30-30" stroke="${k.bark}" stroke-width="3"/><g fill="${k.leaf}"><path d="M40 190c-20-4-26-16-24-24 12 2 20 10 24 24zM66 150c10-16 24-18 30-12-6 10-16 14-30 12z"/></g>`)
    const flag = svg(`<path d="M88 120V76" stroke="${k.bark}" stroke-width="2"/><path d="M88 76c10 4 20-4 30 0v18c-10-4-20 4-30 0z" fill="${k.flag}"/><circle cx="103" cy="85" r="4" fill="${k.amber}"/>`)
    const meadow = `<g fill="${a(k.leaf, .85)}">${loop(80, 20, (x) => `<path d="M${x} 400c2-60 ${6 + (x % 30)} -${80 + (x % 60)} ${10 + (x % 12)} -${120 + (x % 80)}c-2 40 0 90 4 120z"/>`)}</g><g fill="${a(k.leaf, .95)}"><circle cx="220" cy="220" r="90"/><circle cx="300" cy="190" r="70"/><circle cx="1360" cy="210" r="100"/></g><path d="M230 400V260M1360 400V260" stroke="${a(k.bark, .9)}" stroke-width="18"/><g stroke="${a('#1a1a1a', .5)}" stroke-width="2" fill="none"><path d="M0 110q400 60 800 0t800 0M0 130q400 60 800 0t800 0"/></g><path d="M800 20v200" stroke="${a('#1a1a1a', .6)}" stroke-width="10"/><path d="M760 40h80" stroke="${a('#1a1a1a', .6)}" stroke-width="8"/>`
    return {
      backdrop: `${landmark(meadow)},radial-gradient(circle at 85% 10%,${a('#fff6c8', .35)},transparent 30%),linear-gradient(180deg,${a(k.sky, mode === 'dark' ? .12 : .55)},var(--venus-bg) 75%)`,
      scene: `repeating-linear-gradient(0deg,transparent 0 6px,${a(k.amber, .06)} 7px 8px)`, sceneSize: 'auto',
      ornament: `radial-gradient(ellipse 4px 10px,${a(k.wing, .5)} 0 70%,transparent),radial-gradient(circle,${a(k.amber, .45)} 0 1.4px,transparent 2px)`, ornamentSize: '101px 131px,53px 67px',
      paper: `radial-gradient(ellipse at 50% 100%,${a(k.amber, .12)},transparent 50%)`, line: `linear-gradient(${k.wing},${k.amber} 45%,${k.sky} 75%,${k.wing})`, lineSpeed: '2s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(barkArt)},linear-gradient(${k.bark},${k.deep})`,
      panelRight: `${scenery(skyArt)},linear-gradient(${k.sky},${k.sky})`,
      panelDetail: sheen, panelGlyphs: ['❧', '☀'],
      panelInteriors: { left: { object: board(bug), aspect: BOARD, origin: '50% 40%', animation: 'venus-ten-cicada-buzz .12s linear infinite' }, right: { object: board(flag), aspect: BOARD, origin: '55% 32%', animation: `venus-ten-inner-cicada-embassy 1.4s ${ease} infinite` } },
      panelOverlay: 'repeating-linear-gradient(0deg,transparent 0 4px,#ffffff22 5px 6px)', panelOverlayBlend: 'soft-light', panelOverlayOpacity: .5,
      portraitRadius: '50% 50% 44% 44% / 58% 58% 42% 42%',
      plaque: `radial-gradient(ellipse at 30% 30%,#ffffff44,transparent 50%),linear-gradient(${k.amber},#b8740a)`, plaqueText: '#2a1a02', plaqueBorder: '#8a5a08', plaqueShadow: `0 0 0 3px ${k.leaf},0 10px 24px ${a('#000000', .35)}`, plaqueInset: `radial-gradient(ellipse 12px 5px at 20px 50%,${a(k.wing, .6)},transparent)`, plaqueRadius: '999px',
      headingFont: `"Kaisei Decol",${fonts.spectral}`, bodyFont: fonts.lora, monoFont: fonts.mono,
      ...motion('cicada-embassy', {
        scene: [2, ease, '0%,100%{transform:translateY(0) skewY(0)}50%{transform:translateY(2px) skewY(.4deg)}'],
        world: [18, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:101px -262px,-53px -134px,0 0}'],
        inner: [1.4, ease, '0%,100%{transform:skewY(-6deg) scaleX(.9)}50%{transform:skewY(6deg) scaleX(1)}'],
        overlay: [3, 'linear', 'from{transform:translateY(0)}to{transform:translateY(12px)}'],
        extra: '@keyframes venus-ten-cicada-buzz{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.97) translateY(-.4%)}}',
      }),
    }
  })

/* ───────────── Bakelite Oracle ───────────── */
interface BakeliteInk { deep: string; shell: string; shade: string; butter: string; dial: string; grill: string; valve: string; eye: string }
const bakelite = world<BakeliteInk>('bakelite-oracle', 'Bakelite Oracle', 'A mint-green kitchen radio that tunes into tomorrow: a butterscotch dial drifting between stations, a magic-eye tube flickering green, and a broadcast tower over the rooftops.', ['bakelite','radio','retro','oracle','magic eye','mint','butterscotch','1950s'],
  { skin: skin('#0e1815','#15231f','#1d302a','#f4fbf6','#a9c4b8','#ffb347','#9fe0c0'), ink: { deep: '#0f1a17', shell: '#9fe0c0', shade: '#5aa888', butter: '#ffb347', dial: '#fff3d6', grill: '#2a3a34', valve: '#ff8a2a', eye: '#5cff9a' } },
  { skin: skin('#eef7f2','#ffffff','#dcefe5','#12241d','#4f6a5e','#c46f00','#2f8a66'), ink: { deep: '#dcefe5', shell: '#8fd6b2', shade: '#3f8a6a', butter: '#e8961a', dial: '#fffaf0', grill: '#3a4a44', valve: '#e06a10', eye: '#1fbf5a' } },
  (k, mode) => {
    const radio = svg(`<path d="M12 224V110c0-60 136-60 136 0v114z" fill="${k.shell}" stroke="${k.shade}" stroke-width="4"/><g fill="${k.grill}">${loop(8, 10, (y) => `<rect x="34" y="${84 + y}" width="92" height="5" rx="2.5"/>`)}</g><rect x="28" y="170" width="104" height="26" rx="6" fill="${k.dial}" stroke="${k.butter}" stroke-width="3"/><g font-family="Arial,sans-serif" font-size="7" fill="${k.grill}">${[55, 70, 90, 110, 140].map((n, i) => `<text x="${36 + i * 20}" y="182">${n}</text>`).join('')}</g><g fill="${k.butter}"><circle cx="40" cy="212" r="8"/><circle cx="120" cy="212" r="8"/></g>`)
    const tuner = svg(`<rect x="44" y="172" width="3" height="22" fill="${k.valve}"/>`)
    const valves = svg(`<g>${[34, 80, 126].map((x) => `<path d="M${x - 12} 214v-60a12 12 0 0 1 24 0v60z" fill="${a(k.dial, .2)}" stroke="${k.shade}" stroke-width="2"/><rect x="${x - 5}" y="170" width="10" height="30" fill="${a(k.valve, .9)}"/><circle cx="${x}" cy="185" r="14" fill="${a(k.valve, .25)}"/>`).join('')}</g><rect x="8" y="214" width="144" height="16" rx="4" fill="${k.shell}"/><circle cx="80" cy="84" r="36" fill="${k.grill}" stroke="${k.shell}" stroke-width="8"/>`)
    const eye = `conic-gradient(from -40deg,${k.eye} 0 80deg,${a(k.eye, .25)} 80deg 280deg,${k.eye} 280deg)`
    const tower = `<path d="M1180 400l40-300 40 300zM1200 250h40M1195 320h50" fill="none" stroke="${a(k.shade, .9)}" stroke-width="8"/><circle cx="1220" cy="96" r="10" fill="${a(k.valve, .9)}"/><g fill="none" stroke="${a(k.butter, .5)}" stroke-width="5">${[40, 80, 120].map((r) => `<path d="M${1220 - r} ${96 - r * .3}a${r} ${r} 0 0 1 ${r * 2} 0"/>`).join('')}</g><g fill="${a(k.shade, .75)}">${loop(12, 90, (x) => `<path d="M${x + 40} 400v-${70 + (x % 50)}l45-40 45 40v${70 + (x % 50)}z"/>`)}</g><g fill="${a(k.butter, .6)}">${loop(12, 90, (x) => `<rect x="${x + 72}" y="${350 - (x % 50)}" width="16" height="18"/>`)}</g>`
    return {
      backdrop: `${landmark(tower)},radial-gradient(ellipse at 76% 30%,${a(k.butter, .12)},transparent 40%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `repeating-conic-gradient(${a(k.shell, .07)} 0 25%,transparent 0 50%)`, sceneSize: '64px 64px',
      ornament: `repeating-radial-gradient(circle at 76% 25%,transparent 0 40px,${a(k.butter, .1)} 41px 44px,transparent 45px 90px)`, ornamentSize: 'auto',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 50%,${a(k.deep, .45)})`, line: `linear-gradient(${k.butter},${k.shell} 45%,${k.eye} 75%,${k.butter})`, lineSpeed: '3.2s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(radio)},linear-gradient(${k.deep},${a(k.shade, .5)})`,
      panelRight: `${scenery(valves)},linear-gradient(${k.deep},${a(k.shade, .45)})`,
      panelDetail: sheen, panelGlyphs: ['⌁', '◎'],
      panelInteriors: { left: { object: board(tuner), aspect: BOARD, animation: `venus-ten-bakelite-tune 6s ${ease} infinite` }, right: { object: eye, inset: '23% 32% 56% 32%', mask: circle, animation: `venus-ten-inner-bakelite-oracle 3s ${ease} infinite` } },
      panelOverlay: `radial-gradient(circle at 50% 80%,${a(k.valve, .45)},transparent 50%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .3,
      portraitRadius: '40% 40% 14px 14px / 40% 40% 14px 14px',
      plaque: `linear-gradient(${k.butter},${mode === 'dark' ? '#d9861a' : '#f0a63a'})`, plaqueText: '#241400', plaqueBorder: k.shade, plaqueShadow: `0 0 0 4px ${k.shell},0 0 0 6px ${k.shade},0 12px 24px ${a('#000000', .4)}`, plaqueInset: studs(`${k.dial} 0 4px,${k.shade} 4.5px 6px,transparent 6.5px`), plaqueRadius: '14px',
      headingFont: `"Limelight","Broadway",${fonts.poiret}`, bodyFont: fonts.workSans, monoFont: fonts.mono,
      ...motion('bakelite-oracle', {
        scene: [60, 'linear', 'from{background-position:0 0}to{background-position:128px 64px}'],
        world: [4, ease, '0%,100%{filter:opacity(.7)}50%{filter:opacity(1)}'],
        inner: [3, ease, '0%,100%{transform:rotate(0) scale(.9)}40%{transform:rotate(40deg) scale(1)}60%{transform:rotate(-10deg)}'],
        overlay: [2, ease, '0%,100%{filter:opacity(.7)}50%{filter:opacity(1)}'],
        extra: '@keyframes venus-ten-bakelite-tune{0%,100%{transform:translateX(0)}30%{transform:translateX(30%)}55%{transform:translateX(12%)}80%{transform:translateX(48%)}}',
      }),
    }
  })

/* ───────────── Quilted Cosmos ───────────── */
interface QuiltInk { deep: string; denim: string; coral: string; mustard: string; teal: string; thread: string }
const quilt = world<QuiltInk>('quilted-cosmos', 'Quilted Cosmos', 'The universe as a patchwork heirloom: denim night, calico planets, a needle stitching new constellations, and a felt rocket on an embroidery hoop.', ['quilt','patchwork','cosmos','embroidery','denim','sewing','handmade','space'],
  { skin: skin('#18203c','#212b4e','#2b3762','#fff4e0','#b8bcd6','#ff7d6d','#f2c14e'), ink: { deep: '#1a2340', denim: '#2a3a66', coral: '#ff7d6d', mustard: '#f2c14e', teal: '#3fb8b0', thread: '#fff4e0' } },
  { skin: skin('#f5f0e6','#fffcf6','#ebe2d2','#22294a','#5e6480','#d85444','#b8860b'), ink: { deep: '#ebe2d2', denim: '#9fb3de', coral: '#e0604f', mustard: '#e0aa2a', teal: '#2a9a92', thread: '#ffffff' } },
  (k, mode) => {
    const stitch = (d: string) => `<path d="${d}" fill="none" stroke="${k.thread}" stroke-width="1.6" stroke-dasharray="5 4"/>`
    const patches = [k.denim, k.coral, k.mustard, k.teal, k.denim, k.mustard]
    const quiltArt = svg(`${[0, 1, 2, 3, 4, 5].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${c * 40}" y="${r * 40}" width="40" height="40" fill="${patches[(r * 3 + c) % 6]}"/>${stitch(`M${c * 40 + 4} ${r * 40 + 4}h32v32h-32z`)}`).join('')).join('')}<circle cx="80" cy="100" r="30" fill="${k.thread}"/><circle cx="92" cy="92" r="26" fill="${k.mustard}"/>${stitch('M50 100a30 30 0 1 0 60 0')}<g fill="${k.thread}">${[[20, 30], [140, 60], [30, 170], [130, 200]].map(([x, y]) => `<path d="M${x} ${y - 5}l1.6 3.4 3.4 1.6-3.4 1.6-1.6 3.4-1.6-3.4-3.4-1.6 3.4-1.6z"/>`).join('')}</g>`)
    const needle = svg(`<path d="M40 180L120 60" stroke="#dfe3ea" stroke-width="3" stroke-linecap="round"/><ellipse cx="118" cy="63" rx="2" ry="4" fill="${k.deep}" transform="rotate(34 118 63)"/><path d="M118 63c20 10 10 40 30 50" fill="none" stroke="${k.coral}" stroke-width="2"/>`)
    const hoop = svg(`<rect width="160" height="240" fill="${k.deep}"/><circle cx="80" cy="120" r="66" fill="${k.thread}" stroke="#c9955a" stroke-width="10"/><circle cx="80" cy="120" r="72" fill="none" stroke="#a8743a" stroke-width="3"/><rect x="72" y="38" width="16" height="12" fill="#a8743a"/><circle cx="104" cy="96" r="16" fill="${k.teal}"/><ellipse cx="104" cy="96" rx="26" ry="6" fill="none" stroke="${k.coral}" stroke-width="3"/>${stitch('M40 150c20-10 40 10 60 0')}<g fill="${k.mustard}">${[[48, 90], [60, 70], [120, 150], [56, 132]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>`)
    const rocket = svg(`<g transform="translate(60 140) rotate(-30)"><path d="M0 -20c8 8 8 26 0 34-8-8-8-26 0-34z" fill="${k.coral}" stroke="${k.deep}" stroke-width="1.5"/><circle cy="-4" r="3.4" fill="${k.teal}"/><path d="M-6 10l-6 8 8-2zM6 10l6 8-8-2z" fill="${k.mustard}"/><path d="M0 16c-3 8 0 12 0 16 0-4 3-8 0-16z" fill="${k.mustard}"/></g>`)
    const hills = `${[[0, 300, k.teal], [350, 280, k.coral], [760, 310, k.mustard], [1150, 290, k.denim]].map(([x, y, c]) => `<path d="M${x} 400c60-${400 - Number(y)} 360-${400 - Number(y)} 460 0z" fill="${a(String(c), .85)}"/><path d="M${Number(x) + 30} 400c60-${380 - Number(y)} 330-${380 - Number(y)} 400 0" fill="none" stroke="${a(k.thread, .7)}" stroke-width="4" stroke-dasharray="16 12"/>`).join('')}<circle cx="1320" cy="90" r="46" fill="${a(k.thread, .85)}"/><g fill="${a(k.deep, .6)}"><circle cx="1308" cy="80" r="5"/><circle cx="1332" cy="80" r="5"/><circle cx="1308" cy="102" r="5"/><circle cx="1332" cy="102" r="5"/></g>`
    return {
      backdrop: `${landmark(hills)},linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `repeating-linear-gradient(45deg,${a(k.denim, .25)} 0 2px,transparent 2px 6px),repeating-linear-gradient(-45deg,${a(k.denim, .2)} 0 2px,transparent 2px 6px)`, sceneSize: 'auto,auto',
      ornament: `${svg(`<g fill="${k.thread}" opacity=".45"><path d="M20 12l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></g><g fill="${k.mustard}" opacity=".5"><circle cx="70" cy="60" r="3"/></g><path d="M20 20l50 40" stroke="${k.thread}" stroke-dasharray="4 4" opacity=".3"/>`, '0 0 100 80')}`, ornamentSize: '200px 160px',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 55%,${a(k.deep, .4)})`, line: `linear-gradient(${k.coral},${k.mustard} 33%,${k.teal} 66%,${k.thread})`, lineSpeed: '4s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(quiltArt)},linear-gradient(${k.denim},${k.denim})`,
      panelRight: `${scenery(hoop)},linear-gradient(${k.deep},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['★', '☾'],
      panelInteriors: { left: { object: board(needle), aspect: BOARD, animation: `venus-ten-quilt-stitch 2.4s ${ease} infinite` }, right: { object: board(rocket), aspect: BOARD, animation: `venus-ten-inner-quilted-cosmos 6s ${ease} infinite` } },
      panelOverlay: `repeating-linear-gradient(90deg,${a(k.thread, .5)} 0 4px,transparent 4px 9px) 0 6px/100% 1.5px no-repeat,repeating-linear-gradient(90deg,${a(k.thread, .5)} 0 4px,transparent 4px 9px) 0 calc(100% - 6px)/100% 1.5px no-repeat`, panelOverlayBlend: 'normal', panelOverlayOpacity: 1,
      portraitRadius: '20px 6px 20px 6px',
      plaque: k.coral, plaqueText: '#fffaf0', plaqueBorder: k.thread, plaqueShadow: `0 0 0 3px ${k.denim},0 10px 22px ${a('#000000', .35)}`, plaqueInset: `repeating-linear-gradient(90deg,${k.thread} 0 6px,transparent 6px 10px) 0 3px/100% 1.5px no-repeat,repeating-linear-gradient(90deg,${k.thread} 0 6px,transparent 6px 10px) 0 calc(100% - 4px)/100% 1.5px no-repeat`, plaqueRadius: '6px',
      headingFont: fonts.handwritten, bodyFont: fonts.atkinson, monoFont: fonts.mono,
      ...motion('quilted-cosmos', {
        scene: [30, ease, '0%,100%{transform:scale(1.03)}50%{transform:scale(1.05) rotate(.5deg)}'],
        world: [40, 'linear', 'from{background-position:0 0}to{background-position:200px -160px}'],
        inner: [6, ease, '0%,100%{transform:translate(-18%,14%) rotate(-6deg)}50%{transform:translate(20%,-18%) rotate(6deg)}'],
        overlay: [8, 'linear', 'from{transform:translateX(0)}to{transform:translateX(9px)}'],
        extra: '@keyframes venus-ten-quilt-stitch{0%,100%{transform:translate(-10%,10%)}45%{transform:translate(6%,-8%)}55%{transform:translate(4%,-6%)}}',
      }),
    }
  })

/* ───────────── The Last Greenhouse ───────────── */
interface GreenInk { deep: string; lime: string; uv: string; glass: string; grid: string; white: string }
const greenhouse = world<GreenInk>('last-greenhouse', 'The Last Greenhouse', 'After the world, one lab keeps growing: seedlings under ultraviolet grow-bars, the final flower sealed in a bell jar, and a geodesic dome glowing in the ruins.', ['post-human','greenhouse','biotech','ultraviolet','laboratory','seedlings','dna','ruins'],
  { skin: skin('#050a06','#0b140d','#122016','#eaffe4','#94b890','#adff55','#e657ff'), ink: { deep: '#050a06', lime: '#adff55', uv: '#e657ff', glass: '#0c1a10', grid: '#1f3a24', white: '#e6ffe0' } },
  { skin: skin('#eef5ea','#ffffff','#dcebd6','#0f1f10','#4a624a','#3f8a12','#a52ab7'), ink: { deep: '#dcebd6', lime: '#4f9e12', uv: '#b03ac4', glass: '#e8f3e4', grid: '#b8d0b0', white: '#1a2a1a' } },
  (k, mode) => {
    const rack = svg(`<rect width="160" height="240" fill="${k.glass}"/>${[40, 110, 180].map((y) => `<rect x="10" y="${y - 20}" width="140" height="6" rx="3" fill="${k.uv}"/><rect x="10" y="${y + 36}" width="140" height="8" fill="${k.grid}"/>${loop(6, 23, (x) => `<path d="M${22 + x} ${y + 36}v-14" stroke="${k.lime}" stroke-width="2"/><path d="M${22 + x} ${y + 24}c-6-4-8-10-4-12 4 2 4 8 4 12zM${22 + x} ${y + 26}c6-4 8-10 4-12-4 2-4 8-4 12z" fill="${k.lime}"/>`)}`).join('')}`)
    const jar = svg(`<rect width="160" height="240" fill="${k.glass}"/><path d="M40 200V100a40 40 0 0 1 80 0v100z" fill="${a(k.lime, .06)}" stroke="${k.white}" stroke-opacity=".6" stroke-width="3"/><circle cx="80" cy="56" r="6" fill="${k.white}" opacity=".6"/><rect x="28" y="200" width="104" height="14" rx="4" fill="${k.grid}"/><path d="M80 200v-60" stroke="${k.lime}" stroke-width="3"/><g fill="${k.uv}">${loop(5, 72, (r) => `<ellipse cx="80" cy="126" rx="6" ry="13" transform="rotate(${r} 80 138)"/>`)}</g><circle cx="80" cy="138" r="5" fill="${k.lime}"/><text x="80" y="232" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="${k.lime}">SPECIMEN 001 · VIABLE</text>`)
    const helix = svg(`<g fill="none" stroke-width="2.4"><path d="M60 30c40 20 40 40 0 60s-40 40 0 60 40 40 0 60" stroke="${k.lime}"/><path d="M100 30c-40 20-40 40 0 60s40 40 0 60-40 40 0 60" stroke="${k.uv}"/></g><g stroke="${a(k.white, .5)}" stroke-width="1.4">${loop(9, 22, (y) => `<path d="M68 ${40 + y}h24"/>`)}</g>`)
    const ruins = `<g fill="${a(k.grid, .95)}">${loop(10, 150, (x) => `<path d="M${x} 400V${220 + (x % 300) / 3}l20 -30 10 20 30 -10v${200}z"/>`)}</g><path d="M600 400a200 200 0 0 1 400 0z" fill="${a(k.lime, .12)}" stroke="${a(k.lime, .7)}" stroke-width="4"/><g fill="none" stroke="${a(k.lime, .5)}" stroke-width="2"><path d="M600 400l100-170 100 170 100-170 100 170M650 290h300M700 230l100 170 100-170"/></g><circle cx="800" cy="330" r="60" fill="${a(k.uv, .15)}"/>`
    return {
      backdrop: `${landmark(ruins)},radial-gradient(ellipse at 50% 100%,${a(k.lime, .12)},transparent 45%),linear-gradient(180deg,var(--venus-bg),var(--venus-raised))`,
      scene: `linear-gradient(${a(k.lime, .06)} 1px,transparent 1px),linear-gradient(90deg,${a(k.lime, .06)} 1px,transparent 1px),linear-gradient(60deg,transparent 49.6%,${a(k.lime, .06)} 50%,transparent 50.4%)`, sceneSize: '48px 48px,48px 48px,96px 56px',
      ornament: `radial-gradient(circle,${a(k.lime, .55)} 0 1.4px,transparent 2.2px),radial-gradient(circle,${a(k.uv, .5)} 0 1.2px,transparent 2px)`, ornamentSize: '59px 83px,97px 61px',
      paper: `linear-gradient(0deg,${a(k.uv, .06)},transparent 40%)`, line: `linear-gradient(${k.lime},${k.uv} 50%,${k.white})`, lineSpeed: '2.8s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(rack)},linear-gradient(${k.glass},${k.glass})`,
      panelRight: `${scenery(jar)},radial-gradient(circle at 50% 56%,${a(k.uv, .25)},transparent 45%),linear-gradient(${k.glass},${k.glass})`,
      panelDetail: sheen, panelGlyphs: ['♧', '▦'],
      panelInteriors: { left: { object: `linear-gradient(180deg,transparent 0 45%,${a(k.uv, .55)} 50%,transparent 55%)`, animation: 'venus-ten-greenhouse-scan 3s linear infinite' }, right: { object: board(helix), inset: '0 0 0 0', aspect: BOARD, animation: `venus-ten-inner-last-greenhouse 3s ${ease} infinite` } },
      panelOverlay: `repeating-linear-gradient(0deg,transparent 0 3px,${a(k.lime, .12)} 3px 4px)`, panelOverlayBlend: 'normal', panelOverlayOpacity: .5,
      portraitRadius: '0 0 50% 50% / 0 0 22% 22%',
      plaque: mode === 'dark' ? '#e6ffe0' : '#ffffff', plaqueText: '#0f1f10', plaqueBorder: k.lime, plaqueShadow: `0 0 0 2px ${k.deep},0 0 22px ${a(k.lime, .5)}`, plaqueInset: `repeating-linear-gradient(90deg,#0f1f10 0 1px,transparent 1px 3px,#0f1f10 3px 4px,transparent 4px 6px) calc(100% - 10px) 50%/28px 60% no-repeat,linear-gradient(90deg,${k.uv} 0 5px,transparent 5px)`, plaqueRadius: '2px',
      headingFont: '"Chakra Petch","Bahnschrift",sans-serif', bodyFont: fonts.spaceGrotesk, monoFont: fonts.plexMono,
      ...motion('last-greenhouse', {
        scene: [20, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:48px 48px,48px 48px,96px 56px}'],
        world: [22, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:0 -166px,0 -122px,0 0}'],
        inner: [3, ease, '0%,100%{transform:scaleX(1)}50%{transform:scaleX(-1)}'],
        overlay: [.3, 'linear', 'from{transform:translateY(0)}to{transform:translateY(4px)}'],
        extra: '@keyframes venus-ten-greenhouse-scan{from{transform:translateY(-50%)}to{transform:translateY(50%)}}',
      }),
    }
  })

export const TEN_WORLD_THEMES: VenusThemeFamily[] = [lacquer, seismograph, moire, storm, ministry, raku, cicada, bakelite, quilt, greenhouse]
