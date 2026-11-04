import {
  THEMES, FONT_DISPLAY, FONT_SERIF, FONT_MONO, svgDoc, gradient, radial, glowFilter,
  blurFilter, grainFilter, grain, starField, dust, flare, eye, sprockets, r2, txt, clamp,
} from '../lib/design.mjs';

const W = 1400;
const H = 760;
const BAR = 62;
const FILM = '#080605';
const FILM_GOLD = '#f0c05a';
const FILM_EMBER = '#e2603a';
const FILM_INK = '#f7f2e7';

/* ------------------------------------------------------------------ hero */
export function hero(themeId = 'dark') {
  const t = THEMES[themeId];
  const dark = themeId !== 'light';
  const tagline = 'I build the whole picture — then break it to see what holds.';
  const roles = 'FULL-STACK ENGINEER   ·   OFFENSIVE SECURITY   ·   AI / ML';
  const fx = flare(700, 372, 1240, t);
  const sun = dark ? '#070605' : '#f4e3ba';

  const defs = [
    gradient('bgGrad', [[0, t.bg1], [0.48, t.bg0], [1, dark ? '#030202' : '#f2e9d7']], { x1: 0, y1: 0, x2: 0.22, y2: 1 }),
    radial('haze', [[0, t.gold, dark ? 0.17 : 0.22], [0.45, t.gold, 0.06], [1, t.gold, 0]], { cx: 0.5, cy: 0.94, r: 0.72 }),
    gradient('sunBody', [[0, sun, dark ? 0.95 : 0.9], [0.55, dark ? '#0b0806' : '#f5e6c5', 0.9], [1, dark ? '#070605' : '#f7f1e3', 0.85]], { x1: 0, y1: 0, x2: 0.15, y2: 1 }),
    gradient('beam', [[0, t.gold, dark ? 0.09 : 0.07], [0.6, t.gold, 0.025], [1, t.gold, 0]]),
    glowFilter('titleGlow', 16, { merge: false }),
    glowFilter('sunGlow', 14, { merge: false }),
    blurFilter('hazeBlur', 34),
    grainFilter('gr', dark ? 9 : 5),
    fx.defs,
  ].join('\n');

  const barText = (y) => `<g font-family="${FONT_MONO}" font-size="9.5" letter-spacing="3.2">
<text x="44" y="${y}" fill="${FILM_GOLD}" opacity="0.8">AADRIT CHANDRAVANCI</text>
<text x="700" y="${y}" fill="${FILM_INK}" opacity="0.55" text-anchor="middle">THE AADRIT CUT · MMXXVI</text>
<text x="1356" y="${y}" fill="${FILM_GOLD}" opacity="0.8" text-anchor="end">MMXXVI · IND</text>
</g>`;

  const lowerBarText = `<g font-family="${FONT_MONO}" font-size="9" letter-spacing="2.6">
<circle cx="44" cy="${H - 29}" r="3.2" fill="${FILM_EMBER}"><animate attributeName="opacity" values="1;0.15;1" dur="1.8s" repeatCount="indefinite"/></circle>
<text x="55" y="${H - 26}" fill="${FILM_INK}" opacity="0.62">REC  00:00:00:00</text>
<text x="700" y="${H - 26}" fill="${FILM_INK}" opacity="0.45" text-anchor="middle">SHOT ON LOCATION IN INDIA</text>
<text x="1356" y="${H - 26}" fill="${FILM_GOLD}" opacity="0.7" text-anchor="end">70MM · COLOR</text>
</g>`;

  const body = `<rect width="${W}" height="${H}" fill="url(#bgGrad)"/>
${starField(W, H, dark ? 74 : 22, t, { seed: 17, yMax: 620, maxR: dark ? 1.5 : 1, color: dark ? t.ink : t.faint })}
<ellipse cx="700" cy="700" rx="760" ry="330" fill="url(#haze)" filter="url(#hazeBlur)"/>
<ellipse cx="700" cy="1230" rx="1180" ry="600" stroke="${t.gold}" stroke-width="1" opacity="${dark ? 0.12 : 0.18}"/>
<ellipse cx="700" cy="1210" rx="960" ry="540" fill="url(#sunBody)" stroke="${t.gold}" stroke-width="1.4" opacity="0.9"/>
<ellipse cx="700" cy="1210" rx="960" ry="540" stroke="${t.goldBright}" stroke-width="2" opacity="${dark ? 0.6 : 0.5}" filter="url(#sunGlow)"/>
<path d="M646 0H754L1044 ${H}H356Z" fill="url(#beam)"/>
${dust(W, 640, 24, t, { seed: 33 })}

<g text-anchor="middle" font-family="${FONT_DISPLAY}">
${eye(700, 118, 15, t.gold, t.ember)}
<text x="700" y="168" font-family="${FONT_MONO}" font-size="11.5" letter-spacing="7.2" fill="${t.muted}" opacity="0.9">A PROFILE IN FOUR ACTS</text>
<path d="M420 162H538" stroke="${t.gold}" stroke-width="1" opacity="0.4"/>
<path d="M862 162H980" stroke="${t.gold}" stroke-width="1" opacity="0.4"/>
<text x="703" y="344" font-size="172" font-weight="800" letter-spacing="8" fill="${t.gold}" opacity="${dark ? 0.38 : 0.18}" filter="url(#titleGlow)">AADRIT</text>
<text x="702" y="341" font-size="172" font-weight="800" letter-spacing="8" fill="${t.gold}" opacity="${dark ? 0.42 : 0.14}">AADRIT</text>
<text x="700" y="338" font-size="172" font-weight="800" letter-spacing="8" fill="${t.ink}">AADRIT</text>
<path d="M666 366H734" stroke="${t.gold}" stroke-width="1" opacity="0.65"/>
<circle cx="700" cy="366" r="2.6" fill="${t.gold}"/>
<text x="700" y="416" font-family="${FONT_SERIF}" font-size="27" font-style="italic" fill="${t.ink}" opacity="0.94">${txt(tagline)}</text>
<text x="700" y="458" font-family="${FONT_MONO}" font-size="12" letter-spacing="4.6" fill="${t.gold}">${txt(roles)}</text>
</g>

<g font-family="${FONT_MONO}" font-size="9" letter-spacing="3" fill="${t.faint}" text-anchor="middle">
<text x="592" y="506">01 / BUILD</text><text x="700" y="506">02 / BREAK</text><text x="808" y="506">03 / SHIP</text>
<path d="M626 502h-10M774 502h-10" stroke="${t.faint}" stroke-width="1" opacity="0.5"/>
</g>

<g text-anchor="middle">
<text x="700" y="608" font-family="${FONT_MONO}" font-size="9.5" letter-spacing="4.4" fill="${t.muted}" opacity="0.85">SCROLL TO BEGIN</text>
<g transform="translate(700 620)">
<path d="M-5 0L0 5L5 0" stroke="${t.gold}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
<animateTransform attributeName="transform" type="translate" values="700 620;700 626;700 620" dur="2.4s" repeatCount="indefinite"/>
</g>
</g>

<g font-family="${FONT_MONO}" font-size="8.5" letter-spacing="2.8" fill="${t.faint}" opacity="0.75">
<text x="44" y="666">DIRECTED BY CURIOSITY</text>
<text x="1356" y="666" text-anchor="end">A ONE-PERSON STUDIO</text>
</g>

${fx.body}

<rect x="0" y="0" width="${W}" height="${BAR}" fill="${FILM}">
<animate attributeName="height" from="0" to="${BAR}" dur="1.4s" fill="freeze"/>
</rect>
<rect x="0" y="${H - BAR}" width="${W}" height="${BAR}" fill="${FILM}">
<animate attributeName="y" from="${H}" to="${H - BAR}" dur="1.4s" fill="freeze"/>
<animate attributeName="height" from="0" to="${BAR}" dur="1.4s" fill="freeze"/>
</rect>
${barText(38)}
${lowerBarText}
${grain(W, H, t, { opacity: dark ? 0.05 : 0.032, animate: true })}
<rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="${FILM_GOLD}" stroke-opacity="0.16" stroke-width="1"/>`;

  return svgDoc({
    w: W,
    h: H,
    title: 'Aadrit Chandravanci — full-stack engineer, offensive security, AI/ML',
    defs,
    body,
  });
}

/* ---------------------------------------------------------------- ticker */
export function ticker() {
  const Ht = 92;
  const fs = 15.5;
  const ls = 3.2;
  const adv = (s) => s.length * (fs * 0.602 + ls);
  const phrases = ['FULL-STACK ENGINEER', 'SECURITY RESEARCHER', 'AI / ML EXPLORER', 'PRODUCT SHIPPER', 'REVERSE ENGINEER'];
  let blockW = 0;
  for (const p of phrases) blockW += adv(p) + 34;
  blockW = r2(blockW);
  const copies = 3;
  let content = '';
  for (let k = 0; k < copies; k++) {
    let x = 262 + k * blockW;
    for (const p of phrases) {
      content += `<text x="${r2(x)}" y="56" font-family="${FONT_MONO}" font-size="${fs}" letter-spacing="${ls}" fill="${FILM_INK}" opacity="0.92">${txt(p)}</text>`;
      x += adv(p);
      content += `<g transform="translate(${r2(x + 12)} 50)"><rect x="-3" y="-3" width="6" height="6" fill="${FILM_GOLD}" opacity="0.8" transform="rotate(45)"/><animate attributeName="opacity" values="0.4;0.95;0.4" dur="3.6s" begin="${r2(-k * 0.7)}s" repeatCount="indefinite"/></g>`;
      x += 34;
    }
  }

  const defs = [
    gradient('edge', [[0, '#fff'], [0.9, '#fff'], [1, '#fff', 0]]),
    `<mask id="scrollMask"><rect x="250" y="0" width="1150" height="92" fill="url(#edge)"/></mask>`,
    `<clipPath id="scrollClip"><rect x="250" y="0" width="1150" height="92"/></clipPath>`,
    grainFilter('gr', 4, 1.2),
  ].join('\n');

  const body = `<rect width="1400" height="${Ht}" fill="${FILM}"/>
<path d="M0 1H1400M0 91H1400" stroke="${FILM_GOLD}" stroke-width="1" opacity="0.35"/>
${sprockets(250, 6, 1150, FILM_GOLD, { gap: 58, size: 4, opacity: 0.2 })}
${sprockets(250, 81, 1150, FILM_GOLD, { gap: 58, size: 4, opacity: 0.2 })}
<path d="M236 20V72" stroke="${FILM_GOLD}" stroke-width="1" opacity="0.3"/>
<circle cx="44" cy="44" r="3.4" fill="${FILM_EMBER}"><animate attributeName="opacity" values="1;0.18;1" dur="1.9s" repeatCount="indefinite"/></circle>
<text x="56" y="48" font-family="${FONT_MONO}" font-size="11" letter-spacing="4.2" fill="${FILM_INK}">NOW SHOWING</text>
<text x="56" y="65" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="2.4" fill="${FILM_GOLD}" opacity="0.75">THE AADRIT CUT · 2026</text>
<g clip-path="url(#scrollClip)" mask="url(#scrollMask)">
<g>${content}<animateTransform attributeName="transform" type="translate" from="0 0" to="${-blockW} 0" dur="46s" repeatCount="indefinite"/></g>
</g>
${grain(1400, Ht, THEMES.dark, { opacity: 0.05 })}`;

  return svgDoc({ w: 1400, h: Ht, title: 'Scrolling credits — full-stack engineer, security researcher, AI/ML explorer', defs, body });
}

/* ------------------------------------------------------------ act headers */
export function act(themeId = 'dark', { n, roman, title, sub, scene }) {
  const t = THEMES[themeId];
  const Wd = 1200;
  const Hg = 118;
  const boxes = Array.from({ length: 6 }, (_, i) => {
    const on = i === n - 1;
    return `<rect x="${r2(i * 13)}" y="0" width="8" height="8" rx="1" fill="${on ? t.gold : 'none'}" stroke="${t.gold}" stroke-opacity="${on ? 1 : 0.35}" stroke-width="1"/>`;
  }).join('');

  const defs = [
    gradient('glint', [[0, t.gold, 0], [0.5, t.gold, 0.75], [1, t.gold, 0]]),
    glowFilter('aglow', 2.4, { merge: false }),
  ].join('\n');

  const body = `<g font-family="${FONT_MONO}" font-size="9" letter-spacing="3.4" fill="${t.faint}">
<text x="0" y="26">ACT</text>
<text x="1180" y="26" text-anchor="end">SCENE 0${n} / 04</text>
</g>
<text x="0" y="86" font-family="${FONT_SERIF}" font-size="50" font-style="italic" fill="${t.gold}">${txt(roman)}</text>
<path d="M66 34V96" stroke="${t.gold}" stroke-width="1" opacity="0.4"/>
<text x="96" y="72" font-family="${FONT_DISPLAY}" font-size="38" font-weight="800" letter-spacing="1.2" fill="${t.ink}">${txt(title)}</text>
<text x="98" y="96" font-family="${FONT_MONO}" font-size="10.5" letter-spacing="2.8" fill="${t.muted}">${txt(sub)}</text>
<g transform="translate(1122 62)">${boxes}</g>
<path d="M0 112H1200" stroke="${t.line}" stroke-width="1"/>
<rect x="0" y="111.5" width="160" height="1.5" fill="${t.gold}">
<animate attributeName="width" from="0" to="160" dur="1.6s" fill="freeze"/>
</rect>
<rect x="-140" y="111" width="140" height="2" fill="url(#glint)" opacity="0.8">
<animate attributeName="x" from="-140" to="1200" dur="9s" repeatCount="indefinite"/>
</rect>
<g transform="translate(0 0)" opacity="0.9">
${eye(1160, 92, 7, t.gold, t.ember, { blink: false })}
</g>`;

  return svgDoc({ w: Wd, h: Hg, title: `${title} — ${sub}`, defs, body });
}

/* ------------------------------------------------------------------ footer */
export function footer(themeId = 'dark') {
  const t = THEMES[themeId];
  const Wf = 1400;
  const Hf = 430;
  const B = 54;
  const defs = [
    gradient('fbg', [[0, t.bg1], [0.5, t.bg0], [1, themeId === 'light' ? '#efe6d3' : '#030202']], { x1: 0, y1: 0, x2: 0.2, y2: 1 }),
    gradient('beam', [[0, t.gold, 0.1], [0.65, t.gold, 0.03], [1, t.gold, 0]]),
    radial('floor', [[0, t.gold, 0.1], [1, t.gold, 0]], { cx: 0.5, cy: 0.95, r: 0.7 }),
    glowFilter('finGlow', 18, { merge: false }),
    blurFilter('soft', 30),
    grainFilter('gr', 11),
  ].join('\n');

  const body = `<rect width="${Wf}" height="${Hf}" fill="url(#fbg)"/>
${dust(Wf, Hf, 18, t, { seed: 71 })}
<path d="M650 0H750L1080 ${Hf}H320Z" fill="url(#beam)"/>
<ellipse cx="700" cy="${Hf}" rx="640" ry="150" fill="url(#floor)" filter="url(#soft)"/>
${eye(700, 82, 13, t.gold, t.ember)}
<text x="700" y="124" text-anchor="middle" font-family="${FONT_MONO}" font-size="10" letter-spacing="7" fill="${t.muted}">THE END</text>
<path d="M470 119H600M800 119H930" stroke="${t.gold}" stroke-width="1" opacity="0.35"/>
<text x="703" y="262" text-anchor="middle" font-family="${FONT_SERIF}" font-size="178" font-style="italic" fill="${t.gold}" opacity="0.35" filter="url(#finGlow)">Fin<tspan fill="${t.ember}">.</tspan></text>
<text x="700" y="259" text-anchor="middle" font-family="${FONT_SERIF}" font-size="178" font-style="italic" fill="${t.ink}">Fin<tspan fill="${t.ember}">.<animate attributeName="opacity" values="1;0.15;1" dur="2.2s" repeatCount="indefinite"/></tspan></text>
<text x="700" y="310" text-anchor="middle" font-family="${FONT_SERIF}" font-size="17" font-style="italic" fill="${t.muted}">thanks for watching. now go build something.</text>
<path d="M420 326H980" stroke="${t.line}" stroke-width="1"/>
<g text-anchor="middle" font-family="${FONT_MONO}" fill="${t.faint}">
<text x="700" y="346" font-size="9" letter-spacing="3.2">WRITTEN, DIRECTED &amp; SHIPPED BY AADRIT CHANDRAVANCI</text>
<text x="700" y="362" font-size="8.5" letter-spacing="2.6" opacity="0.8">INDIA · UTC +05:30 · NO TEMPLATES IN THE MAKING</text>
</g>

<rect x="0" y="0" width="${Wf}" height="${B}" fill="${FILM}">
<animate attributeName="height" from="0" to="${B}" dur="1.2s" fill="freeze"/>
</rect>
<rect x="0" y="${Hf - B}" width="${Wf}" height="${B}" fill="${FILM}">
<animate attributeName="y" from="${Hf}" to="${Hf - B}" dur="1.2s" fill="freeze"/>
<animate attributeName="height" from="0" to="${B}" dur="1.2s" fill="freeze"/>
</rect>
<g font-family="${FONT_MONO}" font-size="9" letter-spacing="3" fill="${FILM_GOLD}">
<text x="44" y="33" opacity="0.8">AADRIT PICTURES</text>
<text x="700" y="33" text-anchor="middle" opacity="0.5">END CREDITS</text>
<text x="1356" y="33" text-anchor="end" opacity="0.8">MMXXVI</text>
<text x="44" y="${Hf - 22}" opacity="0.65">THANK YOU FOR WATCHING</text>
<text x="700" y="${Hf - 22}" text-anchor="middle" opacity="0.4">GITHUB.COM/AADRITIND</text>
<text x="1356" y="${Hf - 22}" text-anchor="end" opacity="0.65">FIN</text>
</g>
${grain(Wf, Hf, t, { opacity: themeId === 'light' ? 0.03 : 0.045, animate: true })}`;

  return svgDoc({ w: Wf, h: Hf, title: 'End credits — thanks for watching', defs, body });
}

void clamp;
