import {
  THEMES, FONT_DISPLAY, FONT_SERIF, FONT_MONO, svgDoc, gradient, radial, glowFilter,
  r2, txt, wrap,
} from '../lib/design.mjs';

const W = 560;
const H = 500;
const ART = 272;
const A_GOLD = '#f0c05a';
const A_GOLD_BRIGHT = '#ffd76e';
const A_INK = '#f7f2e7';
const A_EMBER = '#e2603a';

const polar = (cx, cy, r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
const arcPath = (cx, cy, r, a0, a1) => {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${r2(x0)} ${r2(y0)}A${r} ${r} 0 ${large} 1 ${r2(x1)} ${r2(y1)}`;
};

const ghost = (n) => `<text x="546" y="252" text-anchor="end" font-family="${FONT_DISPLAY}" font-size="198" font-weight="800" fill="${A_GOLD}" opacity="0.055">${String(n).padStart(2, '0')}</text>`;

function grid(cx, cy, w, h, step = 34, opacity = 0.09) {
  let out = '';
  for (let x = cx - (w / 2); x <= cx + w / 2; x += step) out += `<path d="M${r2(x)} ${r2(cy - h / 2)}V${r2(cy + h / 2)}" stroke="${A_GOLD}" stroke-width="1" opacity="${opacity}"/>`;
  for (let y = cy - h / 2; y <= cy + h / 2; y += step) out += `<path d="M${r2(cx - w / 2)} ${r2(y)}H${r2(cx + w / 2)}" stroke="${A_GOLD}" stroke-width="1" opacity="${opacity}"/>`;
  return out;
}

function particle(x, y, r, o, dur, begin = 0) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${A_GOLD}" opacity="${o}"><animate attributeName="opacity" values="${o};${r2(o * 0.2)};${o}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></circle>`;
}

/* --------------------------------------------------------------- key art */
function sceneVault() {
  const cx = 250;
  const cy = 136;
  const plates = [
    { w: 224, h: 152, rot: -7, o: 0.26 },
    { w: 172, h: 118, rot: 5, o: 0.4 },
    { w: 122, h: 84, rot: -3, o: 0.58 },
  ];
  let out = `<ellipse cx="${cx}" cy="${cy}" rx="176" ry="124" fill="url(#aHaze)"/>${grid(cx, cy, 300, 190, 32, 0.07)}`;
  for (const p of plates) {
    out += `<g transform="translate(${cx} ${cy}) rotate(${p.rot})">
<rect x="${-p.w / 2}" y="${-p.h / 2}" width="${p.w}" height="${p.h}" rx="14" stroke="${A_GOLD}" stroke-opacity="${p.o}" fill="${A_GOLD}" fill-opacity="0.015"/>
<path d="M${-p.w / 2 + 18} ${-p.h / 2 + 12}H${-p.w / 2 + p.w * 0.52}" stroke="${A_INK}" stroke-opacity="${r2(p.o * 0.45)}" stroke-width="1.2" stroke-linecap="round"/>
<path d="M${-p.w / 2 + 18} ${-p.h / 2 + 20}H${-p.w / 2 + p.w * 0.32}" stroke="${A_GOLD}" stroke-opacity="${r2(p.o * 0.35)}" stroke-width="1" stroke-linecap="round"/>
</g>`;
  }
  out += `<g transform="translate(${cx} ${cy})">
<circle cx="0" cy="-13" r="15" stroke="${A_GOLD}" stroke-width="1.6" fill="${A_GOLD_BRIGHT}" fill-opacity="0.06"/>
<circle cx="0" cy="-13" r="15" stroke="${A_GOLD_BRIGHT}" stroke-width="2" opacity="0.5" filter="url(#aGlow)"><animate attributeName="opacity" values="0.32;0.72;0.32" dur="4.2s" repeatCount="indefinite"/></circle>
<circle cx="0" cy="-13" r="3.6" fill="${A_GOLD_BRIGHT}"/>
<path d="M-5 -1L5 -1L10 22H-10Z" fill="${A_GOLD}" opacity="0.9"/>
<circle cx="0" cy="-13" r="31" stroke="${A_GOLD}" stroke-width="1" opacity="0.18" stroke-dasharray="2 8"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="34s" repeatCount="indefinite"/></circle>
</g>`;
  out += particle(140, 62, 1.6, 0.7, 4.4) + particle(388, 200, 2.1, 0.55, 5.8, -1.2) + particle(320, 52, 1.3, 0.6, 3.8, -0.6);
  return out;
}

function sceneTimer() {
  const cx = 198;
  const cy = 136;
  let out = `<ellipse cx="${cx}" cy="${cy}" rx="150" ry="120" fill="url(#aHaze)"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="82" stroke="${A_GOLD}" stroke-opacity="0.16" stroke-width="1"/>`;
  for (let i = 0; i < 36; i++) {
    const a = i * 10;
    const [x1, y1] = polar(cx, cy, i % 3 === 0 ? 88 : 91, a);
    const [x2, y2] = polar(cx, cy, 96, a);
    out += `<path d="M${r2(x1)} ${r2(y1)}L${r2(x2)} ${r2(y2)}" stroke="${A_GOLD}" stroke-width="${i % 3 === 0 ? 1.4 : 1}" opacity="${i % 3 === 0 ? 0.5 : 0.24}"/>`;
  }
  out += `<path d="${arcPath(cx, cy, 82, 0, 276)}" stroke="${A_GOLD}" stroke-width="2.6" stroke-linecap="round"/>`;
  out += `<path d="${arcPath(cx, cy, 82, 0, 276)}" stroke="${A_GOLD_BRIGHT}" stroke-width="4" stroke-linecap="round" opacity="0.35" filter="url(#aGlow)"/>`;
  const [dx, dy] = polar(cx, cy, 82, 276);
  out += `<circle cx="${r2(dx)}" cy="${r2(dy)}" r="4" fill="${A_GOLD_BRIGHT}" filter="url(#aGlow)"><animate attributeName="r" values="3.2;5;3.2" dur="2.8s" repeatCount="indefinite"/></circle>`;
  out += `<text x="${cx}" y="${cy + 10}" text-anchor="middle" font-family="${FONT_MONO}" font-size="31" letter-spacing="1" fill="${A_INK}">25:00</text>`;
  out += `<text x="${cx}" y="${cy + 31}" text-anchor="middle" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="2.2" fill="${A_GOLD}">FOCUS ROOM</text>`;
  out += `<g font-family="${FONT_MONO}" font-size="7.5" letter-spacing="1.8" fill="${A_GOLD}">
<text x="334" y="74">ROOM 4F2A</text>
<circle cx="334" cy="88" r="2" fill="${A_GOLD}"/><text x="343" y="91" fill="${A_INK}" opacity="0.55">3 DEVICES</text>
</g>`;
  out += `<path d="M334 112H524" stroke="${A_GOLD}" stroke-width="1" opacity="0.18"/>`;
  const bars = [10, 22, 15, 34, 26, 44, 31, 52, 38, 20];
  bars.forEach((b, i) => {
    out += `<rect x="${334 + i * 19}" y="${228 - b}" width="7" height="${b}" fill="${A_GOLD}" opacity="${r2(0.16 + (b / 52) * 0.55)}"/>`;
  });
  out += `<path d="M334 229H524" stroke="${A_GOLD}" stroke-width="1" opacity="0.3"/>`;
  out += `<text x="334" y="246" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="1.8" fill="${A_INK}" opacity="0.4">SESSION HISTORY</text>`;
  out += particle(392, 84, 1.5, 0.6, 4.6) + particle(474, 62, 1.2, 0.5, 3.8, -1);
  return out;
}

function sceneLattice() {
  const nodes = [
    [74, 78], [154, 140], [96, 218], [246, 62], [292, 136], [262, 224], [432, 88], [482, 190],
  ];
  const edges = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [2, 5], [4, 6], [4, 7], [6, 7], [1, 4]];
  let out = `<ellipse cx="280" cy="140" rx="230" ry="128" fill="url(#aHaze)"/>${grid(280, 140, 380, 200, 38, 0.06)}`;
  for (const [a, b] of edges) {
    out += `<path d="M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}" stroke="${A_GOLD}" stroke-width="1" opacity="0.22"/>`;
  }
  nodes.forEach(([x, y], i) => {
    out += `<circle cx="${x}" cy="${y}" r="${i === 4 ? 4.2 : 3}" fill="${i === 4 ? A_GOLD_BRIGHT : A_GOLD}" opacity="${i === 4 ? 1 : 0.7}"/>`;
    if (i !== 4) out += `<circle cx="${x}" cy="${y}" r="9" stroke="${A_GOLD}" stroke-width="1" opacity="0.2"/>`;
  });
  out += `<g transform="translate(292 136) rotate(45)">
<rect x="-41" y="-41" width="82" height="82" stroke="${A_GOLD}" stroke-width="1.3" fill="#0a0806" fill-opacity="0.85"/>
<rect x="-31" y="-31" width="62" height="62" stroke="${A_GOLD}" stroke-width="1" opacity="0.3"/>
</g>
<g transform="translate(292 136)">
<circle cx="0" cy="-10" r="9" stroke="${A_GOLD_BRIGHT}" stroke-width="1.5" fill="${A_GOLD}" fill-opacity="0.1"/>
<path d="M-4 0L4 0L7 15H-7Z" fill="${A_GOLD}"/>
<circle cx="0" cy="-10" r="20" stroke="${A_GOLD}" stroke-width="1" opacity="0.2"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite"/></circle>
</g>`;
  const packets = [
    { d: 'M74 78L154 140L246 62L292 136', dur: '7s' },
    { d: 'M482 190L292 136L96 218', dur: '9.5s' },
  ];
  for (const p of packets) {
    out += `<circle r="2.6" fill="${A_GOLD_BRIGHT}" filter="url(#aGlow)"><animateMotion path="${p.d}" dur="${p.dur}" begin="-2.4s" repeatCount="indefinite"/></circle>`;
  }
  out += `<g font-family="${FONT_MONO}" font-size="7.5" letter-spacing="2" fill="${A_GOLD}">
<text x="28" y="250">ROOM / EPHEMERAL</text>
<text x="530" y="250" text-anchor="end" fill="${A_INK}" opacity="0.45">E2E · P2P</text>
</g>`;
  return out;
}

function scenePages() {
  const leftX = 168;
  const rightX = 390;
  const y = 138;
  let out = `<ellipse cx="280" cy="138" rx="210" ry="122" fill="url(#aHaze)"/>${grid(280, 138, 320, 190, 40, 0.05)}`;
  out += `<g transform="translate(${leftX} ${y}) rotate(-6)">
<rect x="-66" y="-84" width="132" height="168" fill="${A_INK}" fill-opacity="0.055" stroke="${A_GOLD}" stroke-width="1.2" stroke-opacity="0.7"/>
<path d="M-46 -58H30M-46 -44H46M-46 -30H18" stroke="${A_GOLD}" stroke-width="1.2" opacity="0.5"/>
<rect x="-46" y="-6" width="92" height="52" fill="none" stroke="${A_GOLD}" stroke-opacity="0.3"/>
<path d="M-46 68H26" stroke="${A_GOLD}" stroke-width="1" opacity="0.35"/>
</g>`;
  out += `<g transform="translate(${rightX} ${y}) rotate(5)">
<rect x="-66" y="-84" width="132" height="168" fill="none" stroke="${A_GOLD}" stroke-width="1.2" stroke-opacity="0.38" stroke-dasharray="5 6"/>
<path d="M-44 -56H20M-44 -42H44M-44 -28H8" stroke="${A_GOLD}" stroke-width="1.1" opacity="0.25"/>
<path d="M-44 62H28" stroke="${A_GOLD}" stroke-width="1" opacity="0.22"/>
</g>`;
  [104, 136, 168].forEach((yy, i) => {
    out += `<path d="M252 ${yy}C284 ${yy - 10} 306 ${yy - 10} 330 ${yy}" stroke="${A_GOLD}" stroke-width="1.4" opacity="${0.65 - i * 0.12}" fill="none" stroke-linecap="round"/>
<path d="M324 ${yy - 5}L332 ${yy}L324 ${yy + 5}" stroke="${A_GOLD}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="${0.65 - i * 0.12}"/>`;
  });
  out += `<circle r="2.8" fill="${A_GOLD_BRIGHT}" filter="url(#aGlow)"><animateMotion path="M252 136C284 126 306 126 330 136" dur="3.4s" repeatCount="indefinite"/></circle>`;
  ['PDF', 'DOCX', 'PNG', 'WAV'].forEach((label, i) => {
    const x = 236 + i * 42;
    out += `<g><rect x="${x}" y="226" width="36" height="17" stroke="${A_GOLD}" stroke-opacity="0.3" fill="${A_GOLD}" fill-opacity="0.04"/><text x="${x + 18}" y="238" text-anchor="middle" font-family="${FONT_MONO}" font-size="6.5" letter-spacing="0.6" fill="${A_GOLD}" opacity="0.8">${label}</text></g>`;
  });
  out += particle(300, 70, 1.4, 0.6, 4.2) + particle(350, 200, 1.8, 0.45, 5.2, -1.4);
  return out;
}

function sceneOrbit() {
  const cx = 230;
  const cy = 136;
  let out = `<ellipse cx="${cx}" cy="${cy}" rx="170" ry="120" fill="url(#aHaze)"/>${grid(cx, cy, 360, 200, 36, 0.055)}`;
  const orbits = [
    { rx: 116, ry: 38, rot: -18, o: 0.34 },
    { rx: 154, ry: 54, rot: 12, o: 0.2 },
    { rx: 84, ry: 26, rot: -44, o: 0.28 },
  ];
  for (const o of orbits) {
    out += `<ellipse cx="${cx}" cy="${cy}" rx="${o.rx}" ry="${o.ry}" transform="rotate(${o.rot} ${cx} ${cy})" stroke="${A_GOLD}" stroke-width="1" opacity="${o.o}" stroke-dasharray="2 7"/>`;
  }
  out += `<g transform="translate(${cx} ${cy})">
<g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="52s" repeatCount="indefinite"/>
<text x="0" y="-37" text-anchor="middle" font-family="${FONT_SERIF}" font-size="27" font-style="italic" fill="${A_GOLD}">∫</text>
<text x="108" y="8" text-anchor="middle" font-family="${FONT_SERIF}" font-size="24" font-style="italic" fill="${A_GOLD_BRIGHT}" opacity="0.9">Σ</text>
<text x="-66" y="12" text-anchor="middle" font-family="${FONT_SERIF}" font-size="22" font-style="italic" fill="${A_GOLD}" opacity="0.8">π</text>
<text x="24" y="61" text-anchor="middle" font-family="${FONT_SERIF}" font-size="21" font-style="italic" fill="${A_INK}" opacity="0.55">λ</text>
</g>
<path d="M0 -30L26 -15V15L0 30L-26 15V-15Z" stroke="${A_GOLD}" stroke-width="1.2" fill="#0a0806" fill-opacity="0.9"/>
<text x="0" y="5" text-anchor="middle" font-family="${FONT_MONO}" font-size="16" letter-spacing="0.5" fill="${A_INK}">833</text>
<circle cx="0" cy="0" r="52" stroke="${A_GOLD}" stroke-width="1" opacity="0.14"/>
</g>`;
  out += `<g font-family="${FONT_MONO}" font-size="7.5" letter-spacing="2" fill="${A_GOLD}">
<text x="28" y="250">OFFLINE / 62 CHAPTERS</text>
<text x="530" y="250" text-anchor="end" fill="${A_INK}" opacity="0.45">CBSE · JEE</text>
</g>`;
  return out;
}

function scenePrint() {
  let out = `<ellipse cx="330" cy="132" rx="210" ry="120" fill="url(#aHaze)"/>${grid(330, 132, 340, 180, 38, 0.05)}`;
  out += `<g transform="translate(420 132)">
<rect x="-66" y="-42" width="132" height="84" rx="3" stroke="${A_GOLD}" stroke-width="1.3" fill="${A_GOLD}" fill-opacity="0.035"/>
<rect x="-46" y="22" width="92" height="13" rx="1" stroke="${A_GOLD}" stroke-width="1" opacity="0.45"/>
<circle cx="42" cy="30" r="2" fill="${A_GOLD}"/>
<path d="M-32 -32H20" stroke="${A_GOLD}" stroke-width="1" opacity="0.4"/>
<rect x="-42" y="-70" width="84" height="62" fill="${A_INK}" fill-opacity="0.92" stroke="${A_GOLD}" stroke-width="1"/>
<path d="M-28 -56H14M-28 -46H26M-28 -36H2" stroke="#0a0806" stroke-width="1.5" opacity="0.6"/>
<g fill="#0a0806" opacity="0.5">${Array.from({ length: 18 }, (_, i) => `<circle cx="${r2(-28 + (i % 6) * 10)}" cy="${r2(-26 + Math.floor(i / 6) * 6)}" r="1.3"/>`).join('')}</g>
<rect x="-66" y="6" width="132" height="2" fill="${A_GOLD}" opacity="0.5"/>
</g>`;
  out += `<g transform="translate(140 170)">
<rect x="-38" y="-26" width="76" height="48" rx="2" stroke="${A_GOLD}" stroke-width="1.2" fill="${A_GOLD}" fill-opacity="0.04"/>
<rect x="-32" y="-20" width="64" height="34" fill="${A_GOLD}" fill-opacity="0.06"/>
<path d="M-38 22H38" stroke="${A_GOLD}" stroke-width="2" opacity="0.7"/>
<text x="0" y="-7" text-anchor="middle" font-family="${FONT_MONO}" font-size="6.5" letter-spacing="1" fill="${A_GOLD}" opacity="0.75">&gt;_</text>
</g>`;
  out += `<path d="M198 142C234 104 280 92 330 104" stroke="${A_GOLD}" stroke-width="1.4" fill="none" stroke-dasharray="3 6" opacity="0.55"/>
<path d="M198 150C238 126 288 120 344 126" stroke="${A_GOLD}" stroke-width="1.2" fill="none" stroke-dasharray="2 6" opacity="0.35"/>
<circle r="2.6" fill="${A_GOLD_BRIGHT}" filter="url(#aGlow)"><animateMotion path="M198 142C234 104 280 92 330 104" dur="4.6s" repeatCount="indefinite"/></circle>
<text x="222" y="102" font-family="${FONT_MONO}" font-size="6.5" letter-spacing="1.4" fill="${A_GOLD}" opacity="0.8">WIFI</text>
<text x="238" y="132" font-family="${FONT_MONO}" font-size="6.5" letter-spacing="1.4" fill="${A_GOLD}" opacity="0.55">USB</text>`;
  out += particle(410, 68, 1.5, 0.6, 4.2) + particle(468, 96, 1.2, 0.5, 5.4, -1) + particle(352, 210, 1.7, 0.45, 4.8, -0.6);
  return out;
}

const SCENES = {
  vault: sceneVault,
  timer: sceneTimer,
  lattice: sceneLattice,
  pages: scenePages,
  orbit: sceneOrbit,
  print: scenePrint,
};

/* ---------------------------------------------------------------- poster */
export function poster(themeId = 'dark', p) {
  const t = THEMES[themeId];
  const scene = SCENES[p.scene] || sceneVault;
  const status = p.status || 'IN PRODUCTION';
  const chipW = r2(status.length * 6.6 + 26);
  const lines = wrap(p.tagline, 46).slice(0, 2);
  const stars = p.stars ? `★ ${p.stars}` : '';
  const artX = 1;
  const artY = 1;

  const defs = [
    gradient('aBg', [[0, '#0c0a07'], [1, '#070605']], { x1: 0, y1: 0, x2: 0.4, y2: 1 }),
    radial('aHaze', [[0, A_GOLD, 0.16], [0.55, A_GOLD, 0.05], [1, A_GOLD, 0]], { cx: 0.5, cy: 0.5, r: 0.55 }),
    gradient('aGold', [[0, A_GOLD], [1, A_EMBER]], { x1: 0, y1: 0, x2: 1, y2: 0.4 }),
    gradient('aPaper', [[0, A_INK, 0.16], [1, A_INK, 0.03]], { x1: 0, y1: 0, x2: 0.6, y2: 1 }),
    gradient('aFade', [[0, '#0a0806', 0], [1, '#0a0806', 0.94]], { x1: 0, y1: 0, x2: 0, y2: 1 }),
    gradient('aScan', [[0, A_GOLD, 0], [0.5, A_GOLD, 0.16], [1, A_GOLD, 0]], { x1: 0, y1: 0, x2: 1, y2: 0 }),
    glowFilter('aGlow', 4),
    `<clipPath id="artClip"><rect x="${artX}" y="${artY}" width="558" height="${ART}"/></clipPath>`,
  ].join('\n');

  const body = `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="${t.panel}" stroke="${t.line}"/>
<g clip-path="url(#artClip)">
<rect x="${artX}" y="${artY}" width="558" height="${ART}" fill="url(#aBg)"/>
${scene()}
<rect x="1" y="${ART - 52}" width="558" height="52" fill="url(#aFade)"/>
<g opacity="0.9"><g><rect x="-70" y="1" width="70" height="${ART}" fill="url(#aScan)"/><animateTransform attributeName="transform" type="translate" from="0 0" to="630 0" dur="17s" repeatCount="indefinite"/></g></g>
${ghost(p.index)}
<g font-family="${FONT_MONO}" font-size="9" letter-spacing="2.2">
<text x="20" y="30" fill="${A_GOLD}">${String(p.index).padStart(2, '0')} / ${txt(p.title.toUpperCase())}</text>
<text x="540" y="30" fill="${A_INK}" opacity="0.5" text-anchor="end">${txt(p.year || '2026')}</text>
</g>
<g transform="translate(40 240)">
<circle cx="0" cy="0" r="14" stroke="${A_GOLD}" stroke-width="1.1" fill="#0a0806" fill-opacity="0.75"/>
<path d="M-3.4 -6L6 0L-3.4 6Z" fill="${A_GOLD}"/>
<circle cx="0" cy="0" r="19" stroke="${A_GOLD}" stroke-width="1" opacity="0.18"><animate attributeName="opacity" values="0.1;0.32;0.1" dur="3.4s" repeatCount="indefinite"/></circle>
</g>
</g>
<path d="M0 ${ART}H${W}" stroke="${t.line}" stroke-width="1" opacity="0.9"/>

<rect x="0" y="0" width="${W}" height="2" fill="${t.gold}">
<animate attributeName="width" from="0" to="${W}" dur="1.5s" fill="freeze"/>
</rect>

<g font-family="${FONT_MONO}">
<g transform="translate(24 292)">
<rect x="0" y="0" width="${chipW}" height="22" rx="11" fill="${t.gold}" fill-opacity="0.08" stroke="${t.gold}" stroke-opacity="0.45"/>
<circle cx="13" cy="11" r="2.6" fill="${t.gold}"><animate attributeName="opacity" values="1;0.25;1" dur="2.6s" repeatCount="indefinite"/></circle>
<text x="23" y="14.5" font-size="8" letter-spacing="1.7" fill="${t.gold}">${txt(status)}</text>
</g>
<g font-size="9" letter-spacing="1.4" fill="${t.muted}" text-anchor="end">
<text x="${W - 24}" y="307">${txt(p.lang || 'TypeScript')}${stars ? `   ·   ${stars}` : ''}</text>
</g>
</g>

<text x="24" y="356" font-family="${FONT_DISPLAY}" font-size="38" font-weight="800" letter-spacing="0.3" fill="${t.ink}">${txt(p.title)}</text>
<g font-family="${FONT_SERIF}" font-size="16.5" font-style="italic" fill="${t.muted}">
${lines.map((l, i) => `<text x="24" y="${386 + i * 22}">${txt(l)}</text>`).join('\n')}
</g>

<path d="M24 430H${W - 24}" stroke="${t.line}" stroke-width="1"/>
<g font-family="${FONT_MONO}" font-size="9" letter-spacing="1.6">
<text x="24" y="454" fill="${t.faint}">AADRIT PICTURES · FILE ${String(p.index).padStart(2, '0')} / ${String(p.total).padStart(2, '0')}</text>
<text x="${W - 24}" y="454" fill="${t.gold}" text-anchor="end" letter-spacing="2">VIEW CASE ↗</text>
</g>
<g font-family="${FONT_MONO}" font-size="7.5" letter-spacing="2.2" fill="${t.faint}" opacity="0.6">
<text x="24" y="481">${txt(p.category || '')}</text>
<text x="${W - 24}" y="481" text-anchor="end">2026 · COLOR</text>
</g>`;

  return svgDoc({
    w: W,
    h: H,
    title: `${p.title} — ${p.tagline}`,
    defs,
    body,
  });
}
