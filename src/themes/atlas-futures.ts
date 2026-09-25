import type { VenusThemeFamily } from './types'
import { a, board, BOARD, ease, fonts, landmark, motion as kitMotion, scenery, sheen, skin, studs, svg, world, type MotionSpec } from './kit'

/** The atlas futures: speculative courts, broadcasts, and cities with dedicated dark and light artwork. */
const motion = (id: string, m: MotionSpec) => kitMotion('atlas', id, m)
const loop = (n: number, step: number, draw: (i: number) => string) => Array.from({ length: n }, (_, i) => draw(i * step)).join('')
const circle = 'radial-gradient(circle closest-side,#000 97%,transparent 99%)'

/* ───────────── Orbital Versailles ───────────── */
interface VersaillesInk { deep: string; pink: string; mint: string; gold: string; planet: string; star: string; shade: string }
const versailles = world<VersaillesInk>('orbital-versailles', 'Orbital Versailles', 'A rococo palace adrift in orbit: gilt scrollwork around a ringed planet, pastel pink and mint salons, and macarons floating in zero gravity.', ['rococo','versailles','space','orbit','pastel','gilt','planet','palace'],
  { skin: skin('#0b0a1a','#15132b','#211d3d','#fff3f8','#c9bdd8','#ffb8d1','#a8f0d4'), ink: { deep: '#0b0a1a', pink: '#ffb8d1', mint: '#a8f0d4', gold: '#ffd97a', planet: '#7a8cff', star: '#ffffff', shade: '#2a2450' } },
  { skin: skin('#fdf4f7','#ffffff','#f5e3ec','#2a1a3a','#6a5a7a','#c24f7e','#2f9f7c'), ink: { deep: '#f5e3ec', pink: '#f090b4', mint: '#6fd6b0', gold: '#b8892a', planet: '#6a7ae8', star: '#ffffff', shade: '#e2d2ee' } },
  (k, mode) => {
    const scroll = (x: number, y: number, flip = 1) => `<path d="M${x} ${y}c${10 * flip} -14 ${24 * flip} -6 ${20 * flip} 6s${-14 * flip} 8 ${-12 * flip} -2" fill="none" stroke="${k.gold}" stroke-width="3" stroke-linecap="round"/>`
    const frame = svg(`<circle cx="80" cy="110" r="58" fill="${k.deep}" stroke="${k.gold}" stroke-width="7"/><circle cx="80" cy="110" r="50" fill="none" stroke="${k.pink}" stroke-width="2"/><circle cx="80" cy="110" r="22" fill="${k.planet}"/><ellipse cx="80" cy="110" rx="40" ry="9" fill="none" stroke="${k.mint}" stroke-width="3" transform="rotate(-18 80 110)"/><path d="M58 110a22 22 0 0 0 44 0" fill="${a(k.shade, .45)}"/>${scroll(24, 50)}${scroll(136, 50, -1)}${scroll(24, 176)}${scroll(136, 176, -1)}<path d="M60 44c10-16 30-16 40 0" fill="none" stroke="${k.gold}" stroke-width="4"/><circle cx="80" cy="36" r="6" fill="${k.pink}" stroke="${k.gold}" stroke-width="2"/><g fill="${k.star}">${[[20, 20], [140, 18], [18, 220], [146, 214], [30, 120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4"/>`).join('')}</g>`)
    const moon = svg(`<circle cx="80" cy="66" r="7" fill="${k.pink}" stroke="${k.gold}" stroke-width="1.5"/>`)
    const salon = svg(`<circle cx="120" cy="60" r="26" fill="${a(k.planet, .8)}"/><path d="M94 60a26 26 0 0 0 52 0" fill="${a(k.mint, .5)}"/><g fill="${k.star}">${[[20, 30], [60, 16], [40, 80], [140, 120], [14, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4"/>`).join('')}</g><rect x="0" y="186" width="160" height="10" fill="${k.gold}"/>${loop(8, 20, (x) => `<path d="M${x + 6} 196c-4 10 4 16 0 28h8c-4-12 4-18 0-28z" fill="${k.pink}" stroke="${k.gold}"/>`)}<rect x="0" y="224" width="160" height="16" fill="${k.gold}"/>`)
    const macarons = svg(`<g transform="translate(64 120)">${[[k.pink, 0], [k.mint, -18], [k.gold, -36]].map(([c, y]) => `<g transform="translate(0 ${y})"><ellipse rx="16" ry="6" fill="${c}"/><rect x="-16" y="-3" width="32" height="4" fill="#fff6e8"/><ellipse cy="-4" rx="16" ry="6" fill="${c}"/></g>`).join('')}</g>`)
    const palace = `<ellipse cx="800" cy="390" rx="520" ry="60" fill="${a(k.shade, .9)}"/><path d="M340 380c80-60 180-40 260-70h400c80 30 180 10 260 70z" fill="${a(k.shade, .95)}"/><g fill="${a(k.pink, .75)}"><rect x="520" y="230" width="560" height="90"/><rect x="740" y="190" width="120" height="130"/></g><g fill="${a(k.gold, .9)}"><path d="M760 190a40 40 0 0 1 80 0z"/><path d="M560 230a26 26 0 0 1 52 0zM988 230a26 26 0 0 1 52 0z"/><rect x="510" y="222" width="580" height="8"/></g><g fill="${a(k.mint, .8)}">${loop(12, 44, (x) => `<path d="M${540 + x} 310v-50a10 10 0 0 1 20 0v50z"/>`)}</g><circle cx="800" cy="170" r="6" fill="${k.gold}"/>`
    return {
      backdrop: `${landmark(palace)},${landmark(`<circle cx="260" cy="140" r="110" fill="${a(k.planet, .55)}"/><ellipse cx="260" cy="140" rx="200" ry="34" fill="none" stroke="${a(k.mint, .5)}" stroke-width="10" transform="rotate(-14 260 140)"/><circle cx="1380" cy="80" r="30" fill="${a(k.pink, .5)}"/>`, '0 0 1600 400', 'center top')},radial-gradient(ellipse at 50% 100%,${a(k.pink, .18)},transparent 50%),linear-gradient(180deg,var(--venus-bg),var(--venus-raised))`,
      scene: `radial-gradient(circle,${a(k.star, .8)} 0 1px,transparent 1.6px),radial-gradient(circle,${a(k.pink, .6)} 0 1.4px,transparent 2px),radial-gradient(circle,${a(k.mint, .5)} 0 1.2px,transparent 1.8px)`, sceneSize: '47px 53px,127px 103px,89px 131px',
      ornament: `${svg(`<g fill="none" stroke="${k.gold}" stroke-width="2" opacity=".25"><path d="M20 60c10-20 30-10 26 4s-18 10-14-2M100 60c-10-20-30-10-26 4s18 10 14-2"/><circle cx="60" cy="40" r="4"/></g>`, '0 0 120 100')}`, ornamentSize: '240px 200px',
      paper: `radial-gradient(ellipse at 50% 50%,${a(k.pink, .06)},transparent 60%)`, line: `linear-gradient(${k.pink},${k.gold} 40%,${k.mint} 75%,${k.pink})`, lineSpeed: '4.6s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(frame)},linear-gradient(${k.shade},${k.deep})`,
      panelRight: `${scenery(salon)},linear-gradient(${k.deep},${k.shade})`,
      panelDetail: sheen, panelGlyphs: ['♔', '✧'],
      panelInteriors: { left: { object: board(moon), aspect: BOARD, origin: '50% 45.8%', animation: 'venus-atlas-inner-orbital-versailles 9s linear infinite' }, right: { object: board(macarons), aspect: BOARD, animation: `venus-atlas-versailles-float 7s ${ease} infinite` } },
      panelOverlay: `radial-gradient(circle,${a(k.star, .7)} 0 1px,transparent 1.6px) 0 0/19px 23px`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'normal', panelOverlayOpacity: .3,
      portraitRadius: '50%',
      plaque: `linear-gradient(${k.pink},${mode === 'dark' ? '#e889ad' : '#f7b3cc'})`, plaqueText: '#3a1030', plaqueBorder: k.gold, plaqueShadow: `0 0 0 3px ${k.gold},0 0 0 6px ${k.mint},0 0 28px ${a(k.pink, .5)}`, plaqueInset: studs(`${k.mint} 0 4px,${k.gold} 4.5px 6px,transparent 6.5px`, `${k.mint} 0 4px,${k.gold} 4.5px 6px,transparent 6.5px`, 18), plaqueRadius: '999px',
      headingFont: fonts.bodoni, bodyFont: fonts.cormorant, monoFont: fonts.mono,
      ...motion('orbital-versailles', {
        scene: [30, ease, '0%,100%{background-position:0 0,0 0,0 0;filter:brightness(.9)}50%{background-position:8px 6px,-10px 8px,6px -8px;filter:brightness(1.3)}'],
        world: [60, 'linear', 'from{background-position:0 0,0 0}to{background-position:240px -200px,0 0}'],
        inner: [9, 'linear', 'to{transform:rotate(360deg)}'],
        overlay: [8, ease, '0%,100%{filter:opacity(.5)}50%{filter:opacity(1)}'],
        extra: '@keyframes venus-atlas-versailles-float{0%,100%{transform:translate(-6%,4%) rotate(-10deg)}50%{transform:translate(8%,-8%) rotate(12deg)}}',
      }),
    }
  })

/* ───────────── Neon Kaiju Broadcast ───────────── */
interface KaijuInk { deep: string; red: string; green: string; amber: string; crt: string; city: string; glass: string }
const kaiju = world<KaijuInk>('kaiju-broadcast', 'Neon Kaiju Broadcast', 'Channel 9 emergency coverage: a colossus wading through the skyline on a fizzing CRT, a radar sweeping for the next one, and warnings in phosphor green.', ['kaiju','broadcast','emergency','crt','radar','monster','city','phosphor'],
  { skin: skin('#060808','#0c1210','#131c18','#e8fff0','#8fb8a0','#39ff88','#ff2d2d'), ink: { deep: '#07090a', red: '#ff2d2d', green: '#39ff88', amber: '#ffb000', crt: '#0c1a12', city: '#16261d', glass: '#0a120e' } },
  { skin: skin('#eef2ef','#ffffff','#dde7e0','#0c1a12','#4a5e52','#138a4a','#d61f1f'), ink: { deep: '#dde7e0', red: '#d61f1f', green: '#138a4a', amber: '#c07a00', crt: '#e2efe6', city: '#9ab8a6', glass: '#f4f9f5' } },
  (k, mode) => {
    const tv = svg(`<rect x="8" y="24" width="144" height="150" rx="16" fill="#2a2a2a" stroke="#555" stroke-width="3"/><rect x="18" y="36" width="124" height="112" rx="14" fill="${k.crt}"/><g fill="${k.city}">${[[20, 90], [34, 70], [50, 100], [64, 60], [82, 96], [96, 76], [112, 104], [126, 66]].map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="${148 - y}"/>`).join('')}</g><g fill="${k.amber}" opacity=".7">${loop(10, 12, (x) => `<rect x="${x + 22}" y="${110 + (x % 24)}" width="2" height="3"/>`)}</g><rect x="18" y="130" width="124" height="16" fill="${k.red}"/><text x="24" y="142" font-family="Arial Black,Arial,sans-serif" font-size="10" fill="#fff">⚠ LIVE · SECTOR 12</text><circle cx="130" cy="162" r="5" fill="#555"/><circle cx="114" cy="162" r="5" fill="#555"/><path d="M50 24L30 4M110 24l20-20" stroke="#555" stroke-width="3"/><path d="M40 174l-8 30M120 174l8 30" stroke="#2a2a2a" stroke-width="6"/>`)
    const beast = svg(`<path d="M10 100V70c0-10 6-14 10-20l-4-10 10 6c4-6 10-10 18-10l2-10 6 10c10 2 16 10 16 20 0 10-6 14-8 20h8l4 8-12 2v14h-8V86h-8v14z" fill="${a('#000000', .85)}"/><circle cx="40" cy="42" r="2.4" fill="${k.red}"/>`, '0 0 80 100')
    const radar = svg(`<circle cx="80" cy="120" r="64" fill="${k.crt}" stroke="#555" stroke-width="6"/><g fill="none" stroke="${a(k.green, .45)}" stroke-width="1.2"><circle cx="80" cy="120" r="44"/><circle cx="80" cy="120" r="22"/><path d="M16 120h128M80 56v128"/></g><g fill="${k.red}"><circle cx="112" cy="92" r="4"/><circle cx="54" cy="150" r="2.4"/></g><text x="80" y="214" text-anchor="middle" font-family="Lucida Console,monospace" font-size="11" fill="${k.green}">SWEEP 07 · ACTIVE</text>`)
    const skyline = `<g fill="${a(k.green, mode === 'dark' ? .16 : .3)}" stroke="${a(k.green, .35)}" stroke-width="2">${loop(20, 80, (x) => `<rect x="${x}" y="${220 + ((x * 7) % 120)}" width="64" height="400"/>`)}</g><path d="M980 400V250c0-40 20-60 40-80l-20-40 40 20c20-30 50-40 80-40l10-40 20 44c50 10 80 50 80 100 0 50-30 70-40 100h40l20 40-60 10v86z" fill="${a('#000000', mode === 'dark' ? .9 : .55)}"/><circle cx="1110" cy="120" r="8" fill="${k.red}"/><g fill="${a(k.amber, .6)}">${loop(30, 53, (x) => `<rect x="${x + 10}" y="${260 + ((x * 3) % 100)}" width="6" height="8"/>`)}</g>`
    return {
      backdrop: `${landmark(skyline)},conic-gradient(from 190deg at 20% 100%,transparent 0 6deg,${a(k.green, .12)} 8deg 11deg,transparent 13deg),conic-gradient(from 150deg at 80% 100%,transparent 0 6deg,${a(k.red, .1)} 8deg 11deg,transparent 13deg),linear-gradient(180deg,var(--venus-bg),var(--venus-raised))`,
      scene: `repeating-linear-gradient(0deg,transparent 0 2px,${a(k.green, .05)} 3px 4px),linear-gradient(90deg,${a(k.red, .06)} 1px,transparent 1px)`, sceneSize: 'auto,80px 80px',
      ornament: `repeating-linear-gradient(135deg,${a(k.amber, .1)} 0 16px,transparent 16px 32px) 0 0/100% 18px repeat-x,linear-gradient(transparent 0 49%,${a(k.green, .18)} 50%,transparent 51%)`, ornamentSize: '100% 18px,100% 100%',
      paper: `radial-gradient(ellipse at 50% 50%,transparent 50%,${a('#000000', .45)})`, line: `linear-gradient(${k.red},${k.amber} 40%,${k.green} 75%,${k.red})`, lineSpeed: '1.6s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(tv)},linear-gradient(${k.deep},${k.glass})`,
      panelRight: `${scenery(radar)},linear-gradient(${k.deep},${k.glass})`,
      panelDetail: sheen, panelGlyphs: ['⚠', '⌁'],
      panelInteriors: { left: { object: `${beast} 0 100%/auto 70% no-repeat`, inset: '16% 13% 40% 13%', animation: 'venus-atlas-kaiju-stomp 9s linear infinite' }, right: { object: `conic-gradient(from 0deg,${a(k.green, .65)},transparent 18%)`, inset: '22.5% 10% 24.5% 10%', mask: circle, animation: 'venus-atlas-inner-kaiju-broadcast 3s linear infinite' } },
      panelOverlay: `repeating-linear-gradient(0deg,transparent 0 2px,${a('#000000', .35)} 2px 3px)`, panelOverlayBlend: 'normal', panelOverlayOpacity: .4,
      portraitRadius: '18% / 14%',
      plaque: '#0a0a0a', plaqueText: '#ffb000', plaqueBorder: k.red, plaqueShadow: `0 0 0 3px ${k.amber},0 0 22px ${a(k.red, .5)}`, plaqueInset: `repeating-linear-gradient(135deg,#ffb000 0 6px,#0a0a0a 6px 12px) 0 0/14px 100% no-repeat,repeating-linear-gradient(135deg,#ffb000 0 6px,#0a0a0a 6px 12px) 100% 0/14px 100% no-repeat`, plaqueRadius: '0',
      headingFont: fonts.terminal, bodyFont: fonts.atkinson, monoFont: fonts.terminal,
      ...motion('kaiju-broadcast', {
        scene: [6, 'linear', 'from{background-position:0 0,0 0}to{background-position:0 40px,80px 0}'],
        world: [5, 'linear', 'from{background-position:0 0,0 0,0 0}to{background-position:-64px 0,0 0,0 0}'],
        inner: [3, 'linear', 'to{transform:rotate(360deg)}'],
        overlay: [.2, 'linear', '0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}'],
        extra: '@keyframes venus-atlas-kaiju-stomp{0%{background-position:-60% 100%}25%{background-position:10% 96%}26%{background-position:12% 100%}50%{background-position:50% 96%}51%{background-position:52% 100%}75%{background-position:90% 96%}76%{background-position:92% 100%}100%{background-position:160% 100%}}',
      }),
    }
  })

/* ───────────── Cathedral of Synthetic Angels ───────────── */
interface AngelInk { deep: string; line: string; red: string; grey: string }
const angels = world<AngelInk>('synthetic-angels', 'Cathedral of Synthetic Angels', 'Clinical seraphim in surgical white and scarlet: wheels within wheels covered in watching eyes, blade-feathered wings, and a halo the size of the sky.', ['angel','seraphim','ophanim','cathedral','clinical','white','scarlet','eyes'],
  { skin: skin('#0c0c11','#15151c','#1f1f29','#f7f7fa','#a3a3b3','#f5f5f7','#ff3344'), ink: { deep: '#0d0d12', line: '#f5f5f7', red: '#ff3344', grey: '#6a6a78' } },
  { skin: skin('#f7f7f9','#ffffff','#eaeaf0','#16161f','#5f5f70','#1b1b24','#d7102b'), ink: { deep: '#eaeaf0', line: '#1b1b24', red: '#d7102b', grey: '#9a9aa8' } },
  (k, mode) => {
    const eye = (x: number, y: number) => `<g transform="translate(${x} ${y})"><path d="M-7 0q7-6 14 0q-7 6-14 0z" fill="${k.deep}" stroke="${k.line}" stroke-width="1.2"/><circle r="2.4" fill="${k.red}"/></g>`
    const ring = (rx: number, ry: number, rot: number) => `<g transform="rotate(${rot} 80 120)"><ellipse cx="80" cy="120" rx="${rx}" ry="${ry}" fill="none" stroke="${k.line}" stroke-width="3"/>${loop(8, 45, (d) => eye(80 + rx * Math.cos((d * Math.PI) / 180), 120 + ry * Math.sin((d * Math.PI) / 180)))}</g>`
    const wheels = svg(`${ring(60, 22, 0)}${ring(60, 22, 60)}${ring(60, 22, 120)}<circle cx="80" cy="120" r="10" fill="${k.red}"/>`)
    const chapel = svg(`<g stroke="${a(k.grey, .6)}" stroke-width="1">${loop(8, 20, (x) => `<path d="M${x + 10} 0v240"/>`)}</g><rect x="72" y="0" width="16" height="240" fill="${a(k.red, .15)}"/><path d="M60 20h40M80 0v40" stroke="${k.red}" stroke-width="3"/>`)
    const wing = svg(`<g transform="translate(40 200)">${loop(7, 12, (r) => `<path d="M0 0L${Math.round(118 * Math.cos(((-80 + r) * Math.PI) / 180))} ${Math.round(118 * Math.sin(((-80 + r) * Math.PI) / 180))}" stroke="${k.line}" stroke-width="${6 - r / 20}" stroke-linecap="round"/>`)}${loop(7, 12, (r) => `<path d="M0 0L${Math.round(84 * Math.cos(((-74 + r) * Math.PI) / 180))} ${Math.round(84 * Math.sin(((-74 + r) * Math.PI) / 180))}" stroke="${k.red}" stroke-width="1.6"/>`)}<circle r="8" fill="${k.red}" stroke="${k.line}" stroke-width="2"/></g>`)
    const halo = `<ellipse cx="800" cy="200" rx="620" ry="120" fill="none" stroke="${a(k.line, .14)}" stroke-width="18"/><ellipse cx="800" cy="200" rx="560" ry="96" fill="none" stroke="${a(k.red, .18)}" stroke-width="3"/>`
    const spires = `<g fill="${a(k.grey, .35)}">${loop(9, 180, (x) => `<rect x="${x + 40}" y="${140 + (x % 360 ? 60 : 0)}" width="90" height="300"/><path d="M${x + 40} ${140 + (x % 360 ? 60 : 0)}l45 -70 45 70z"/>`)}</g><g fill="${a(k.red, .6)}">${loop(9, 180, (x) => `<rect x="${x + 70}" y="${230 + (x % 360 ? 40 : 0)}" width="30" height="4"/>`)}</g>`
    return {
      backdrop: `${landmark(halo, '0 0 1600 400', 'center top')},${landmark(spires)},radial-gradient(ellipse at 50% 0,${a(k.line, .08)},transparent 55%),linear-gradient(180deg,var(--venus-raised),var(--venus-bg) 70%)`,
      scene: `radial-gradient(ellipse 10px 5px,${a(k.line, .18)} 0 60%,transparent 64%),radial-gradient(circle,${a(k.red, .5)} 0 1.4px,transparent 2px)`, sceneSize: '90px 70px,90px 70px',
      ornament: `repeating-radial-gradient(ellipse at 50% 30%,transparent 0 140px,${a(k.line, .06)} 141px 143px,transparent 144px 220px)`, ornamentSize: 'auto',
      paper: `linear-gradient(180deg,${a(k.line, .04)},transparent 40%)`, line: `linear-gradient(${k.line},${k.red} 50%,${k.line})`, lineSpeed: '3s',
      panelLayout: 'fixed',
      panelLeft: `linear-gradient(${a(k.grey, .2)} 1px,transparent 1px) 0 0/20px 20px,linear-gradient(90deg,${a(k.grey, .2)} 1px,transparent 1px) 0 0/20px 20px,linear-gradient(${k.deep},${k.deep})`,
      panelRight: `${scenery(chapel)},linear-gradient(${k.deep},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['✧', '◎'],
      panelInteriors: { left: { object: board(wheels), aspect: BOARD, animation: 'venus-atlas-inner-synthetic-angels 24s linear infinite' }, right: { object: board(wing), aspect: BOARD, origin: '25% 83.3%', animation: `venus-atlas-angels-wing 5s ${ease} infinite` } },
      panelOverlay: `linear-gradient(180deg,transparent 0 48%,${a(k.red, .6)} 50%,transparent 52%)`, panelOverlayBlend: 'normal', panelOverlayOpacity: .5,
      portraitRadius: '50%',
      plaque: `linear-gradient(90deg,${k.red} 0 8px,${mode === 'dark' ? '#f5f5f7' : '#ffffff'} 8px)`, plaqueText: '#16161f', plaqueBorder: k.red, plaqueShadow: `0 0 0 1px ${k.line},0 10px 30px ${a(k.red, .3)}`, plaqueInset: `linear-gradient(90deg,transparent calc(100% - 14px),${a(k.red, .8)} calc(100% - 14px) calc(100% - 10px),transparent calc(100% - 10px))`, plaqueRadius: '0',
      plaqueTransform: 'uppercase',
      headingFont: fonts.instrument, bodyFont: fonts.instrument, monoFont: fonts.plexMono,
      ...motion('synthetic-angels', {
        scene: [18, ease, '0%,100%{background-position:0 0,0 0}50%{background-position:45px 35px,45px 35px}'],
        world: [14, ease, '0%,100%{transform:scale(1)}50%{transform:scale(1.08)}'],
        inner: [24, 'linear', 'to{transform:rotate(360deg)}'],
        overlay: [4, 'linear', 'from{transform:translateY(-50%)}to{transform:translateY(50%)}'],
        extra: '@keyframes venus-atlas-angels-wing{0%,100%{transform:rotate(-18deg) scale(.9)}50%{transform:rotate(6deg) scale(1)}}',
      }),
    }
  })

/* ───────────── Quantum Disco Mausoleum ───────────── */
interface DiscoInk { deep: string; magenta: string; gold: string; uv: string; granite: string; ghost: string }
const disco = world<DiscoInk>('disco-mausoleum', 'Quantum Disco Mausoleum', 'The dead dance on Saturdays: a mirrorball over marble tombs, a light-up crypt floor in magenta and ultraviolet, and a very sociable ghost.', ['disco','mausoleum','mirrorball','ghost','nightlife','ultraviolet','magenta','tomb'],
  { skin: skin('#0a0615','#150d24','#211436','#fff0fb','#c7b3d6','#ff3fb4','#ffd35c'), ink: { deep: '#0b0716', magenta: '#ff3fb4', gold: '#ffd35c', uv: '#8a4bff', granite: '#2a2233', ghost: '#e8e8ff' } },
  { skin: skin('#fbf0f8','#ffffff','#f1e0ee','#2a1036','#6a5478','#c21f82','#a87a0a'), ink: { deep: '#f1e0ee', magenta: '#e0409f', gold: '#c99a1a', uv: '#7a45f0', granite: '#bfb2cc', ghost: '#ffffff' } },
  (k, mode) => {
    const crypt = svg(`<path d="M80 0v26" stroke="${k.gold}" stroke-width="2"/><g fill="${a(k.magenta, .25)}"><path d="M80 60L10 240h30zM80 60L150 240h-30zM80 60L70 240h20z"/></g><g fill="${k.granite}" stroke="${a(k.ghost, .5)}" stroke-width="1.5">${[[14, 196], [58, 186], [102, 200]].map(([x, y]) => `<path d="M${x} 240V${y + 12}a22 14 0 0 1 44 0V240z"/><path d="M${x + 22} ${y + 18}v16M${x + 16} ${y + 24}h12" stroke="${k.gold}"/>`).join('')}</g>`)
    const floor = svg(`${[0, 1, 2, 3, 4, 5].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${c * 40}" y="${120 + r * 20}" width="40" height="20" fill="${[k.magenta, k.uv, k.gold, k.granite][(r + c) % 4]}" opacity="${(r + c) % 2 ? .85 : .35}"/>`).join('')).join('')}<path d="M0 120h160" stroke="${k.gold}" stroke-width="2"/><path d="M20 120V40h120v80" fill="none" stroke="${a(k.ghost, .4)}" stroke-width="2"/><path d="M20 40l60-30 60 30" fill="none" stroke="${a(k.ghost, .4)}" stroke-width="2"/>`)
    const ghost = svg(`<g transform="translate(80 110)"><path d="M-20 30v-34c0-26 40-26 40 0v34l-7-6-6 6-7-6-7 6-6-6z" fill="${a(k.ghost, .92)}"/><circle cx="-7" cy="-6" r="3" fill="${k.deep}"/><circle cx="7" cy="-6" r="3" fill="${k.deep}"/><ellipse cy="6" rx="4" ry="5" fill="${k.deep}"/><path d="M-20 4l-14-16M20 4l14 16" stroke="${a(k.ghost, .92)}" stroke-width="6" stroke-linecap="round"/></g>`)
    const tombs = `<g fill="${a(k.uv, mode === 'dark' ? .38 : .3)}" stroke="${a(k.magenta, .5)}" stroke-width="3"><path d="M560 400V220l240-90 240 90v180z"/>${loop(6, 80, (x) => `<rect x="${580 + x}" y="230" width="30" height="170"/>`)}<rect x="540" y="212" width="520" height="16"/></g><g fill="${a(k.ghost, mode === 'dark' ? .22 : .6)}">${loop(9, 110, (x) => `<path d="M${40 + x} 400v-60a30 26 0 0 1 60 0v60z"/><path d="M${1120 + (x % 440)} 400v-${50 + (x % 30)}a26 22 0 0 1 52 0v60z"/>`)}</g><path d="M800 140v-40" stroke="${a(k.gold, .9)}" stroke-width="4"/>`
    return {
      backdrop: `${landmark(tombs)},conic-gradient(from 150deg at 50% -10%,transparent 0 4deg,${a(k.magenta, .12)} 6deg 9deg,transparent 11deg 20deg,${a(k.uv, .12)} 22deg 25deg,transparent 27deg 38deg,${a(k.gold, .1)} 40deg 43deg,transparent 45deg),linear-gradient(180deg,var(--venus-bg),var(--venus-raised))`,
      scene: `radial-gradient(circle,${a(k.magenta, .5)} 0 2px,transparent 3px),radial-gradient(circle,${a(k.uv, .5)} 0 2px,transparent 3px),radial-gradient(circle,${a(k.gold, .5)} 0 1.4px,transparent 2.2px)`, sceneSize: '83px 61px,61px 97px,47px 71px',
      ornament: `repeating-conic-gradient(from 0deg at 50% 0,${a(k.ghost, .06)} 0 3deg,transparent 3deg 14deg)`, ornamentSize: 'auto',
      paper: `linear-gradient(0deg,${a(k.magenta, .1)},transparent 30%)`, line: `linear-gradient(${k.magenta},${k.uv} 33%,${k.gold} 66%,${k.magenta})`, lineSpeed: '1.2s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(crypt)},radial-gradient(circle at 50% 18%,${a(k.gold, .3)},transparent 35%),linear-gradient(${k.deep},${k.granite})`,
      panelRight: `${scenery(floor)},linear-gradient(${k.deep},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['✦', '◆'],
      panelInteriors: { left: { object: `linear-gradient(90deg,${a('#ffffff', .5)} 1px,transparent 1px) 0 0/9px 9px,linear-gradient(${a('#ffffff', .5)} 1px,transparent 1px) 0 0/9px 9px,radial-gradient(circle at 35% 30%,#ffffff,#c9c9e6 40%,#6a6a8a 78%)`, inset: '8% 22% 62% 22%', mask: circle, animation: 'venus-atlas-disco-ball 2s linear infinite' }, right: { object: board(ghost), aspect: BOARD, animation: `venus-atlas-inner-disco-mausoleum 1.6s ${ease} infinite` } },
      panelOverlay: `repeating-conic-gradient(from 0deg,${a(k.magenta, .5)} 0 8deg,transparent 8deg 20deg,${a(k.uv, .5)} 20deg 28deg,transparent 28deg 40deg)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .22,
      portraitRadius: '50% 50% 10px 10px / 40% 40% 10px 10px',
      plaque: `repeating-linear-gradient(90deg,${k.gold} 0,#fff2b0 4px,${k.gold} 8px)`, plaqueText: '#2a1036', plaqueBorder: k.magenta, plaqueShadow: `0 0 0 3px ${k.magenta},0 0 30px ${a(k.uv, .6)}`, plaqueInset: `radial-gradient(circle,#ffffff 0 1px,transparent 1.6px) 0 0/11px 9px`, plaqueRadius: '999px',
      headingFont: `"Monoton",${fonts.righteous}`, bodyFont: fonts.outfit, monoFont: fonts.mono,
      ...motion('disco-mausoleum', {
        scene: [4, 'linear', '0%,100%{filter:hue-rotate(0)}50%{filter:hue-rotate(60deg) brightness(1.3)}'],
        world: [10, 'linear', 'from{transform:rotate(-8deg)}to{transform:rotate(8deg)}'],
        inner: [1.6, ease, '0%,100%{transform:translate(-8%,2%) rotate(-10deg)}50%{transform:translate(8%,-4%) rotate(10deg)}'],
        overlay: [5, 'linear', 'to{transform:rotate(360deg)}'],
        extra: '@keyframes venus-atlas-disco-ball{from{background-position:0 0,0 0,0 0}to{background-position:18px 0,18px 0,0 0}}',
      }),
    }
  })

/* ───────────── Bioship Court of Flowers ───────────── */
interface BioInk { deep: string; flesh: string; coral: string; foam: string; chitin: string; vein: string; nebula: string }
const bioship = world<BioInk>('bioship-flowers', 'Bioship Court of Flowers', 'A living starship that grew a garden: ribbed flesh portholes onto blooming nebulae, anemone courtiers swaying, and veins that pulse with seafoam light.', ['bioship','organic','flowers','anemone','nebula','living ship','coral','seafoam'],
  { skin: skin('#170b0e','#241216','#331a1f','#fff0ea','#d4aaa6','#ff8c7a','#7ff0c8'), ink: { deep: '#1a0d10', flesh: '#5a2a30', coral: '#ff8c7a', foam: '#7ff0c8', chitin: '#f2e2c4', vein: '#b0405a', nebula: '#6a4aff' } },
  { skin: skin('#fbefec','#fffaf8','#f2dcd6','#3a1418','#7a5458','#d0503c','#12986e'), ink: { deep: '#f2dcd6', flesh: '#e8b4ab', coral: '#e0604a', foam: '#1fb88a', chitin: '#fffaf0', vein: '#c04a64', nebula: '#7a5aff' } },
  (k, mode) => {
    const port = svg(`<rect width="160" height="240" fill="${k.flesh}"/><g fill="none" stroke="${k.vein}" stroke-width="2" opacity=".7"><path d="M0 30c30 10 40-10 70 0s60 20 90 0M0 210c30-10 50 10 80 0s60-20 80 0"/></g><circle cx="80" cy="120" r="58" fill="${k.deep}" stroke="${k.chitin}" stroke-width="8"/><g stroke="${k.chitin}" stroke-width="4">${loop(12, 30, (r) => `<path d="M80 62v10" transform="rotate(${r} 80 120)"/>`)}</g><g fill="${k.foam}">${[[20, 40], [140, 200], [30, 190]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join('')}</g>`)
    const nebula = `conic-gradient(from 0deg,${a(k.nebula, .8)},${a(k.coral, .7)},${a(k.foam, .7)},${a(k.nebula, .8)})`
    const garden = svg(`<path d="M0 240V200c20-10 40 6 60-4s50-12 100 4v40z" fill="${k.flesh}"/><g fill="${k.coral}">${[30, 80, 128].map((x) => `<ellipse cx="${x}" cy="200" rx="16" ry="7"/>`).join('')}</g>`)
    const tendrils = svg(`<g fill="none" stroke-linecap="round" stroke-width="4">${[30, 80, 128].map((x, i) => loop(5, 8, (d) => `<path d="M${x - 16 + d} 198c-6-30 ${i % 2 ? 10 : -10} -40 ${-4 + d / 2} -${70 + d}" stroke="${d % 16 ? k.foam : k.coral}"/>`)).join('')}</g><g fill="${k.chitin}">${[30, 80, 128].map((x) => `<circle cx="${x}" cy="126" r="4"/>`).join('')}</g>`)
    const hull = `<path d="M0 400V260c200-80 500-120 800-120s600 40 800 120v140z" fill="${a(k.flesh, .95)}"/><g fill="none" stroke="${a(k.chitin, .5)}" stroke-width="10">${loop(9, 180, (x) => `<path d="M${40 + x} 400c20-120 60-170 100-190"/>`)}</g><g fill="${a(k.coral, .8)}">${loop(14, 110, (x) => `<circle cx="${60 + x}" cy="${270 - ((x * 3) % 60)}" r="${10 + (x % 5) * 3}"/>`)}</g><g fill="${a(k.foam, .7)}">${loop(14, 110, (x) => `<circle cx="${90 + x}" cy="${300 - ((x * 7) % 50)}" r="5"/>`)}</g>`
    return {
      backdrop: `${landmark(hull)},radial-gradient(ellipse at 30% 20%,${a(k.nebula, .3)},transparent 45%),radial-gradient(ellipse at 80% 30%,${a(k.coral, .2)},transparent 40%),linear-gradient(180deg,var(--venus-bg),var(--venus-raised))`,
      scene: `radial-gradient(circle,${a(k.foam, .5)} 0 1.5px,transparent 2.3px),radial-gradient(circle,${a(k.chitin, .5)} 0 1px,transparent 1.6px)`, sceneSize: '71px 59px,37px 43px',
      ornament: `repeating-radial-gradient(ellipse at 50% 120%,transparent 0 40px,${a(k.vein, .1)} 41px 44px,transparent 45px 80px)`, ornamentSize: 'auto',
      paper: `radial-gradient(ellipse at 50% 50%,${a(k.nebula, .06)},transparent 60%)`, line: `linear-gradient(${k.coral},${k.foam} 40%,${k.nebula} 75%,${k.coral})`, lineSpeed: '3.6s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(port)},linear-gradient(${k.flesh},${k.deep})`,
      panelRight: `${scenery(garden)},radial-gradient(circle at 50% 70%,${a(k.foam, .2)},transparent 55%),linear-gradient(${k.deep},${k.flesh})`,
      panelDetail: sheen, panelGlyphs: ['❀', '◉'],
      panelInteriors: { left: { object: nebula, inset: '26% 14% 26% 14%', mask: circle, animation: 'venus-atlas-inner-bioship-flowers 12s linear infinite' }, right: { object: board(tendrils), aspect: BOARD, origin: '50% 82%', animation: `venus-atlas-bioship-sway 4s ${ease} infinite` } },
      panelOverlay: `radial-gradient(circle,${a(k.foam, .45)},transparent 55%)`, panelOverlayBlend: mode === 'dark' ? 'screen' : 'multiply', panelOverlayOpacity: .28,
      portraitRadius: '58% 42% 55% 45% / 45% 55% 45% 55%',
      plaque: `radial-gradient(ellipse at 30% 30%,#ffffff55,transparent 50%),linear-gradient(${k.chitin},${mode === 'dark' ? '#d9c4a0' : '#f2e2c4'})`, plaqueText: '#3a1418', plaqueBorder: k.vein, plaqueShadow: `0 0 0 3px ${k.flesh},0 0 0 5px ${k.foam},0 10px 26px ${a('#000000', .45)}`, plaqueInset: `repeating-radial-gradient(ellipse at 50% 140%,transparent 0 10px,${a(k.vein, .25)} 11px 12px)`, plaqueRadius: '40% 60% 40% 60% / 60% 40% 60% 40%',
      headingFont: fonts.syne, bodyFont: fonts.figtree, monoFont: fonts.mono,
      ...motion('bioship-flowers', {
        scene: [22, ease, '0%,100%{background-position:0 0,0 0}50%{background-position:30px -20px,-20px 30px}'],
        world: [6, ease, '0%,100%{transform:scale(1);filter:brightness(.9)}50%{transform:scale(1.04);filter:brightness(1.2)}'],
        inner: [12, 'linear', 'from{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(1.15)}to{transform:rotate(360deg) scale(1)}'],
        overlay: [6, ease, '0%,100%{transform:scale(.8)}50%{transform:scale(1.2)}'],
        extra: '@keyframes venus-atlas-bioship-sway{0%,100%{transform:skewX(-10deg)}50%{transform:skewX(10deg)}}',
      }),
    }
  })

/* ───────────── Megacity Memory Bazaar ───────────── */
interface BazaarInk { deep: string; amber: string; cyan: string; pink: string; wet: string; jar: string }
const bazaar = world<BazaarInk>('memory-bazaar', 'Megacity Memory Bazaar', 'A rain-slick night market three hundred floors up: stacked neon signs, delivery drones, and shelves of bottled summers glowing in their jars.', ['cyberpunk','market','memory','neon','megacity','rain','drone','jars'],
  { skin: skin('#0a0e18','#121826','#1a2234','#eef6ff','#9aaac4','#ffb238','#2de2e6'), ink: { deep: '#0b0f1a', amber: '#ffb238', cyan: '#2de2e6', pink: '#ff5ea8', wet: '#1a2438', jar: '#f4ead0' } },
  { skin: skin('#eef1f6','#ffffff','#dde3ee','#101828','#4f5a70','#c26f00','#0f8a90'), ink: { deep: '#dde3ee', amber: '#e08a00', cyan: '#0fa0a6', pink: '#d6337f', wet: '#c3cddd', jar: '#ffffff' } },
  (k, mode) => {
    const signs = svg(`<rect width="160" height="240" fill="${k.wet}"/>${[[12, 20, 30, 90, k.pink], [52, 40, 26, 70, k.cyan], [90, 14, 34, 110, k.amber], [128, 50, 24, 60, k.pink]].map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${a(String(c), .15)}" stroke="${c}" stroke-width="2.4"/>${loop(3, Number(h) / 4, (d) => `<rect x="${Number(x) + 6}" y="${Number(y) + 8 + d}" width="${Number(w) - 12}" height="4" fill="${c}"/>`)}`).join('')}<path d="M0 170h160l-12 18H12z" fill="${k.amber}"/><g fill="${k.deep}">${loop(8, 20, (x) => `<path d="M${x} 170h10l-2 18h-8z" opacity=".35"/>`)}</g><rect x="0" y="188" width="160" height="52" fill="${a(k.deep, .8)}"/><g fill="${k.jar}">${[24, 60, 100, 136].map((x) => `<rect x="${x - 6}" y="200" width="12" height="16" rx="3" opacity=".8"/>`).join('')}</g>`)
    const drone = svg(`<rect x="10" y="12" width="40" height="10" rx="5" fill="${k.deep}" stroke="${k.cyan}" stroke-width="2"/><path d="M6 8h16M38 8h16" stroke="${k.cyan}" stroke-width="2"/><circle cx="30" cy="26" r="3" fill="${k.pink}"/><path d="M30 29v10" stroke="${k.amber}" stroke-dasharray="2 2"/><rect x="24" y="39" width="12" height="10" fill="${k.amber}"/>`, '0 0 60 56')
    const shelf = svg(`<rect width="160" height="240" fill="${k.wet}"/>${[70, 140, 210].map((y) => `<rect x="0" y="${y}" width="160" height="6" fill="${k.deep}"/>${[18, 58, 98, 138].map((x) => `<path d="M${x - 12} ${y}v-34a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v34z" fill="${a(k.jar, .2)}" stroke="${k.jar}" stroke-width="1.5"/><rect x="${x - 6}" y="${y - 46}" width="12" height="6" fill="${k.amber}"/>`).join('')}`).join('')}`)
    const glows = svg(`${[70, 140, 210].map((y, r) => [18, 58, 98, 138].map((x, c) => `<circle cx="${x}" cy="${y - 16}" r="9" fill="${[k.pink, k.cyan, k.amber][(r + c) % 3]}" opacity=".85"/>`).join('')).join('')}`)
    const city = `<g fill="${a(k.cyan, mode === 'dark' ? .1 : .18)}" stroke="${a(k.cyan, .3)}" stroke-width="2">${loop(16, 100, (x) => `<rect x="${x}" y="${60 + ((x * 13) % 200)}" width="${70 + (x % 30)}" height="400"/>`)}</g><g fill="${a(k.amber, .5)}">${loop(60, 27, (x) => `<rect x="${x + 6}" y="${140 + ((x * 11) % 240)}" width="5" height="4"/>`)}</g><g fill="none" stroke="${a(k.cyan, .35)}" stroke-width="2">${loop(6, 280, (x) => `<path d="M${x} 90q140 60 280 0"/>`)}</g><g>${loop(8, 200, (x) => `<rect x="${x + 30}" y="${120 + (x % 400) / 4}" width="16" height="60" rx="3" fill="none" stroke="${[k.pink, k.cyan, k.amber][x / 200 % 3]}" stroke-width="3" opacity=".7"/>`)}</g>`
    return {
      backdrop: `${landmark(city, '0 0 1600 400')},radial-gradient(ellipse at 50% 100%,${a(k.pink, .16)},transparent 50%),linear-gradient(180deg,var(--venus-bg),var(--venus-raised))`,
      scene: `repeating-linear-gradient(100deg,transparent 0 16px,${a(k.cyan, .12)} 17px 18px,transparent 19px 34px)`, sceneSize: 'auto',
      ornament: `radial-gradient(ellipse 20px 4px,${a(k.pink, .4)} 0 60%,transparent),radial-gradient(ellipse 16px 3px,${a(k.cyan, .4)} 0 60%,transparent)`, ornamentSize: '173px 131px,113px 89px',
      paper: `linear-gradient(0deg,${a(k.amber, .08)},transparent 30%)`, line: `linear-gradient(${k.amber},${k.pink} 40%,${k.cyan} 75%,${k.amber})`, lineSpeed: '2.2s',
      panelLayout: 'fixed',
      panelLeft: `${scenery(signs)},linear-gradient(${k.wet},${k.deep})`,
      panelRight: `${scenery(shelf)},linear-gradient(${k.wet},${k.deep})`,
      panelDetail: sheen, panelGlyphs: ['▣', '⌁'],
      panelInteriors: { left: { object: `${drone} 0 30%/60px 56px no-repeat`, animation: 'venus-atlas-bazaar-drone 7s linear infinite' }, right: { object: scenery(glows), animation: 'venus-atlas-inner-memory-bazaar 6s linear infinite' } },
      panelOverlay: `repeating-linear-gradient(100deg,transparent 0 10px,${a(k.cyan, .35)} 11px 12px)`, panelOverlayBlend: 'normal', panelOverlayOpacity: .3,
      portraitRadius: '10%',
      plaque: 'repeating-linear-gradient(0deg,#ffffff 0 2px,#f1f1f1 2px 4px)', plaqueText: '#101828', plaqueBorder: k.cyan, plaqueShadow: `0 0 0 2px ${k.deep},0 0 22px ${a(k.pink, .45)}`, plaqueInset: `repeating-linear-gradient(90deg,#101828 0 1px,transparent 1px 3px,#101828 3px 5px,transparent 5px 6px) calc(100% - 10px) 50%/26px 60% no-repeat`, plaqueRadius: '2px',
      headingFont: fonts.spaceGrotesk, bodyFont: fonts.dmSans, monoFont: fonts.fragment,
      ...motion('memory-bazaar', {
        scene: [.8, 'linear', 'from{background-position:0 0}to{background-position:-12px 68px}'],
        world: [9, ease, '0%,100%{background-position:0 0,0 0,0 0;filter:hue-rotate(0)}50%{background-position:40px 0,-30px 0,0 0;filter:hue-rotate(30deg)}'],
        inner: [6, 'linear', '0%,100%{filter:hue-rotate(0) opacity(.9)}50%{filter:hue-rotate(160deg) opacity(1)}'],
        overlay: [1, 'linear', 'from{transform:translate(0,0)}to{transform:translate(-2%,8%)}'],
        extra: '@keyframes venus-atlas-bazaar-drone{from{background-position:-40% 30%}50%{background-position:50% 20%}to{background-position:140% 30%}}',
      }),
    }
  })

export const ATLAS_FUTURE_THEMES: VenusThemeFamily[] = [versailles, kaiju, angels, disco, bioship, bazaar]
