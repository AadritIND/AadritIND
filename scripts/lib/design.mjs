// The look: a black-and-gold film print. Warm ink, paper light theme, no external assets.
export const THEMES = {
  dark: {
    id: 'dark',
    bg0: '#070605',
    bg1: '#0d0a07',
    panel: '#0b0907',
    panel2: '#13100b',
    line: '#2b2319',
    lineSoft: '#1d1812',
    ink: '#f7f2e7',
    muted: '#c2b6a3',
    faint: '#8a7c68',
    gold: '#f0c05a',
    goldBright: '#ffd76e',
    ember: '#e2603a',
    patina: '#8ab0a6',
    paper: '#f7f2e7',
  },
  light: {
    id: 'light',
    bg0: '#f7f1e3',
    bg1: '#efe6d3',
    panel: '#fffaf0',
    panel2: '#f4ecdb',
    line: '#d6c8ae',
    lineSoft: '#e6dac5',
    ink: '#171310',
    muted: '#5d5345',
    faint: '#93866f',
    gold: '#9a6a10',
    goldBright: '#c08a1f',
    ember: '#b64926',
    patina: '#3f6f66',
    paper: '#fffaf0',
  },
};

// Single-quoted stacks stay valid inside double-quoted XML attributes.
export const FONT_DISPLAY = "'Helvetica Neue',Helvetica,Arial,sans-serif";
export const FONT_SERIF = "Georgia,'Times New Roman',serif";
export const FONT_MONO =
  "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono','Courier New',monospace";

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const r2 = (n) => Math.round(n * 100) / 100;
export const attr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
export const txt = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function svgDoc({ w, h, title, defs = '', body, style = '' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img" aria-label="${attr(title)}">
<title>${txt(title)}</title>
<defs>
${defs}
</defs>
${style ? `<style>${style}</style>` : ''}
${body}
</svg>
`;
}

export const gradient = (id, stops, { x1 = 0, y1 = 0, x2 = 1, y2 = 0, units } = {}) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${units ? ` gradientUnits="${units}"` : ''}>${stops
    .map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`)
    .join('')}</linearGradient>`;

export const radial = (id, stops, { cx = 0.5, cy = 0.5, r = 0.5 } = {}) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops
    .map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`)
    .join('')}</radialGradient>`;

export const glowFilter = (id, std = 4, { merge = true } = {}) =>
  `<filter id="${id}" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="${std}" result="b"/>${
    merge ? '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' : ''
  }</filter>`;

export const blurFilter = (id, std) =>
  `<filter id="${id}" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="${std}"/></filter>`;

export const grainFilter = (id, seed = 9, freq = 0.82) =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="${seed}" result="n"/><feColorMatrix in="n" type="saturate" values="0"/></filter>`;

export function grain(w, h, t, { opacity = 0.05, id = 'gr', animate = false } = {}) {
  return `<rect width="${w}" height="${h}" filter="url(#${id})" opacity="${opacity}">${
    animate
      ? `<animate attributeName="opacity" values="${opacity};${r2(opacity * 0.55)};${opacity}" dur="1.1s" repeatCount="indefinite"/>`
      : ''
  }</rect>`;
}

export function vignette(w, h, t, { r = 0.72 } = {}) {
  return `<radialGradient id="vig" cx="0.5" cy="0.46" r="${r}"><stop offset="0.35" stop-color="${t.bg0}" stop-opacity="0"/><stop offset="0.8" stop-color="${t.bg0}" stop-opacity="0.55"/><stop offset="1" stop-color="${t.bg0}" stop-opacity="0.95"/></radialGradient>
<rect width="${w}" height="${h}" fill="url(#vig)"/>`;
}

export function starField(w, h, n, t, { seed = 7, yMax = h, maxR = 1.5, color } = {}) {
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = r2(rnd() * w);
    const y = r2(rnd() * yMax);
    const r = r2(0.35 + rnd() * maxR);
    const o = r2(0.12 + rnd() * 0.5);
    const dur = r2(3 + rnd() * 5);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color || t.ink}" opacity="${o}"><animate attributeName="opacity" values="${o};${r2(
      o * 0.2
    )};${o}" dur="${dur}s" begin="${r2(-rnd() * dur)}s" repeatCount="indefinite"/></circle>`;
  }
  return out;
}

export function dust(w, h, n, t, { seed = 21, color } = {}) {
  let s = seed;
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = r2(rnd() * w);
    const y = r2(rnd() * h);
    const r = r2(0.5 + rnd() * 1.7);
    const dx = r2((rnd() - 0.5) * 70);
    const dy = r2(-30 - rnd() * 90);
    const dur = r2(12 + rnd() * 18);
    const o = r2(0.08 + rnd() * 0.3);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color || t.gold}" opacity="${o}"><animateTransform attributeName="transform" type="translate" values="0 0;${dx} ${dy};0 0" dur="${dur}s" begin="${r2(
      -rnd() * dur
    )}s" repeatCount="indefinite"/><animate attributeName="opacity" values="${o};${r2(o * 1.9)};${o}" dur="${r2(
      dur * 0.42
    )}s" repeatCount="indefinite"/></circle>`;
  }
  return out;
}

// Wide anamorphic flare — the signature light of the whole system.
export function flare(cx, cy, w, t, { dur = 9 } = {}) {
  return { defs: `${gradient('flareLine', [[0, t.gold, 0], [0.22, t.gold, 0.55], [0.5, t.goldBright, 0.95], [0.78, t.gold, 0.55], [1, t.gold, 0]])}
${glowFilter('flareGlow', 3, { merge: false })}
${blurFilter('flareBlur', 9)}`, body: `<g opacity="0.9">
<ellipse cx="${cx}" cy="${cy}" rx="${r2(w * 0.46)}" ry="2.4" fill="url(#flareLine)" filter="url(#flareBlur)"/>
<ellipse cx="${cx}" cy="${cy}" rx="${r2(w * 0.2)}" ry="7" fill="${t.goldBright}" opacity="0.35" filter="url(#flareBlur)"/>
<ellipse cx="${cx}" cy="${cy}" rx="86" ry="1.1" fill="${t.ink}" opacity="0.55"/>
<circle cx="${cx}" cy="${cy}" r="2.4" fill="${t.ink}" opacity="0.85" filter="url(#flareGlow)"/>
<circle cx="${r2(cx - w * 0.27)}" cy="${cy}" r="3.2" fill="${t.gold}" opacity="0.22"><animate attributeName="opacity" values="0.12;0.34;0.12" dur="${dur}s" repeatCount="indefinite"/></circle>
<circle cx="${r2(cx + w * 0.31)}" cy="${cy}" r="5.6" fill="${t.ember}" opacity="0.1"><animate attributeName="opacity" values="0.06;0.18;0.06" dur="${r2(
    dur * 1.3
  )}s" repeatCount="indefinite"/></circle>
</g>` };
}

// Film grain, vignette, and warm haze for panels.
export function filmBase(w, h, t, { grainOpacity = 0.045, seed = 9 } = {}) {
  return `${grainFilter('gr', seed)}${grain(w, h, t, { opacity: grainOpacity })}${vignette(w, h, t)}`;
}

export function cornerMarks(w, h, color, { inset = 22, len = 18, opacity = 0.5 } = {}) {
  const p = inset;
  return `<g stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none">
<path d="M${p} ${p + len}V${p}H${p + len}"/><path d="M${w - p - len} ${p}H${w - p}V${p + len}"/>
<path d="M${p} ${h - p - len}V${h - p}H${p + len}"/><path d="M${w - p - len} ${h - p}H${w - p}V${h - p - len}"/>
</g>`;
}

// A reusable dragon-eye motif. Reads as the logo at small sizes without raster.
export function eye(cx, cy, s, color, accent, { blink = true, dur = 9 } = {}) {
  const almond = `M${-s} 0Q${-s * 0.42} ${-s * 0.58} 0 ${-s * 0.58}Q${s * 0.42} ${-s * 0.58} ${s} 0Q${s * 0.42} ${s * 0.58} 0 ${s * 0.58}Q${-s * 0.42} ${s * 0.58} ${-s} 0Z`;
  return `<g transform="translate(${r2(cx)} ${r2(cy)})">
<g>${blink ? `<animateTransform attributeName="transform" type="scale" values="1 1;1 1;1 0.06;1 1" keyTimes="0;0.9;0.94;1" dur="${dur}s" repeatCount="indefinite"/>` : ''}
<path d="${almond}" fill="${color}" fill-opacity="0.08" stroke="${color}" stroke-width="${r2(Math.max(0.8, s * 0.055))}" stroke-linejoin="round"/>
<path d="${almond}" fill="${accent}" fill-opacity="0.1"/>
<ellipse cx="0" cy="0" rx="${r2(s * 0.2)}" ry="${r2(s * 0.42)}" fill="${accent}" opacity="0.85"/>
<ellipse cx="0" cy="0" rx="${r2(s * 0.07)}" ry="${r2(s * 0.32)}" fill="#0a0806"/>
<circle cx="${r2(-s * 0.07)}" cy="${r2(-s * 0.16)}" r="${r2(s * 0.045)}" fill="${color}" opacity="0.9"/>
<path d="M${-s * 0.72} ${s * 0.13}Q${-s * 0.9} ${s * 0.02} ${-s * 1.18} ${s * 0.05}" stroke="${color}" stroke-width="${r2(
    Math.max(0.7, s * 0.04)
  )}" opacity="0.55" stroke-linecap="round"/>
<path d="M${-s * 0.67} ${s * 0.26}Q${-s * 0.88} ${s * 0.24} ${-s * 1.06} ${s * 0.34}" stroke="${color}" stroke-width="${r2(
    Math.max(0.7, s * 0.035)
  )}" opacity="0.35" stroke-linecap="round"/>
</g></g>`;
}

export function sprockets(x, y, width, color, { gap = 64, size = 5, opacity = 0.22 } = {}) {
  let out = '';
  for (let px = x; px < x + width; px += gap) {
    out += `<rect x="${r2(px)}" y="${y}" width="${size}" height="${size + 1}" rx="1" fill="${color}" opacity="${opacity}"/>`;
  }
  return out;
}

export function hairline(x1, y1, x2, y2, color, opacity = 0.6) {
  return `<path d="M${r2(x1)} ${r2(y1)}H${r2(x2)}" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
}

export function wrap(s, max) {
  const words = String(s || '').split(/\s+/);
  const lines = [];
  let cur = '';
  for (const word of words) {
    if ((cur + ' ' + word).trim().length > max) {
      if (cur) lines.push(cur.trim());
      cur = word;
    } else cur += ` ${word}`;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

export function ellipsis(s, max) {
  const str = String(s || '').trim();
  if (str.length <= max) return str;
  const cut = str.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return (sp > max * 0.55 ? cut.slice(0, sp) : cut).replace(/[\s,;:.–—-]+$/, '') + '…';
}

export function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : String(n));
