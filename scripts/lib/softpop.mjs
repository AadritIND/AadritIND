// Soft-pop profile system: warm paper, electric lilac, clay coral and acid lime.
export const THEMES = {
  light: {
    canvas: '#f4efe7',
    canvasBottom: '#ece4dc',
    ink: '#17121d',
    muted: '#6d6578',
    faint: '#82788d',
    line: '#d8cfc2',
    lilac: '#cdb9ff',
    lilacLight: '#f4edff',
    lilacDark: '#6d55d8',
    lilacDeep: '#8a75ff',
    coral: '#ef684b',
    coralLight: '#ffb29e',
    coralDark: '#c5442a',
    acid: '#dcff6a',
    acidDark: '#b1d33a',
    acidLight: '#efffb8',
    mint: '#8ee6c1',
    green: '#119b61',
    card: '#fffaf3',
    card2: '#f2e9ff',
    cardStroke: '#ffffff',
    glass: '#ffffff',
    nameShadow: '#cbb6ff',
    shadow: '#32184d',
    dot: '#f06a4c',
  },
  dark: {
    canvas: '#0f0c16',
    canvasBottom: '#0b0811',
    ink: '#f7f1e8',
    muted: '#b0a6c0',
    faint: '#9288a4',
    line: '#332a42',
    lilac: '#a98cff',
    lilacLight: '#e2d7ff',
    lilacDark: '#4a34a9',
    lilacDeep: '#7b63ff',
    coral: '#ff8d75',
    coralLight: '#ffc1b0',
    coralDark: '#d24d36',
    acid: '#d7ff61',
    acidDark: '#9cbc32',
    acidLight: '#efffb8',
    mint: '#78e6c6',
    green: '#4ee3a0',
    card: '#191224',
    card2: '#241633',
    cardStroke: '#6f5a8d',
    glass: '#ffffff',
    nameShadow: '#7259e8',
    shadow: '#000000',
    dot: '#ff8d75',
  },
};

export const FONT_DISPLAY = "'Arial Black','Helvetica Neue',Arial,sans-serif";
export const FONT_SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
export const FONT_SERIF = "Georgia,'Times New Roman',serif";
export const FONT_MONO =
  "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono','Courier New',monospace";

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const attr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function svgDoc({ w, h, title, defs = '', body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img" aria-label="${attr(title)}">
<title>${esc(title)}</title>
<defs>
${defs}
</defs>
${body}
</svg>
`;
}

export const linear = (id, stops, { x1 = 0, y1 = 0, x2 = 1, y2 = 0 } = {}) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops
    .map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`)
    .join('')}</linearGradient>`;

export const radial = (id, stops, { cx = 0.5, cy = 0.5, r = 0.5 } = {}) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops
    .map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`)
    .join('')}</radialGradient>`;

export const shadowFilter = (
  id,
  { dx = 8, dy = 16, blur = 20, color = '#000000', opacity = 0.25 } = {}
) =>
  `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%">` +
  `<feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${blur}" flood-color="${color}" flood-opacity="${opacity}"/>` +
  `</filter>`;

export const blurFilter = (id, blur = 12) =>
  `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%">` +
  `<feGaussianBlur stdDeviation="${blur}"/></filter>`;

export const grainFilter = (id, seed = 4) =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%">` +
  `<feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" seed="${seed}" stitchTiles="stitch"/>` +
  `<feColorMatrix type="saturate" values="0"/></filter>`;

export const grain = (w, h, opacity, id = 'grain') =>
  `<rect width="${w}" height="${h}" filter="url(#${id})" opacity="${opacity}"/>`;
