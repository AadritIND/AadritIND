import {
  THEMES,
  FONT_DISPLAY,
  FONT_SANS,
  FONT_SERIF,
  FONT_MONO,
  svgDoc,
  linear,
  radial,
  shadowFilter,
  blurFilter,
  grainFilter,
  grain,
} from '../lib/softpop.mjs';

const W = 1400;
const H = 560;

const STAR =
  'M0 -96 C7 -48 18 -22 44 -15 L88 -5 C98 -3 98 3 88 5 L44 15 C18 22 7 48 0 96 C-7 48 -18 22 -44 15 L-88 5 C-98 3 -98 -3 -88 -5 L-44 -15 C-18 -22 -7 -48 0 -96 Z';

export function hero(themeId = 'dark') {
  const t = THEMES[themeId];
  const dark = themeId !== 'light';

  const defs = [
    linear('canvas', [[0, t.canvas], [1, t.canvasBottom]], { x1: 0, y1: 0, x2: 0.35, y2: 1 }),
    radial('lilacGlow', [[0, t.lilac, dark ? 0.46 : 0.72], [0.55, t.lilac, dark ? 0.16 : 0.28], [1, t.lilac, 0]], {
      cx: 0.48,
      cy: 0.5,
      r: 0.55,
    }),
    radial('coralGlow', [[0, t.coral, dark ? 0.28 : 0.22], [0.6, t.coral, dark ? 0.07 : 0.06], [1, t.coral, 0]], {
      cx: 0.5,
      cy: 0.5,
      r: 0.55,
    }),
    radial('acidGlow', [[0, t.acid, dark ? 0.18 : 0.22], [1, t.acid, 0]], { cx: 0.5, cy: 0.5, r: 0.55 }),
    radial('starFill', [[0, t.coralLight], [0.5, t.coral], [1, t.coralDark]], { cx: 0.22, cy: 0.16, r: 0.9 }),
    radial('sphereBody', [[0, '#fbf9ff'], [0.18, '#d9ceff'], [0.55, t.lilacDeep], [1, dark ? '#40259e' : '#5a3acb']], {
      cx: 0.3,
      cy: 0.24,
      r: 0.8,
    }),
    radial('sphereShade', [[0, '#180b35', dark ? 0.55 : 0.38], [0.62, '#180b35', dark ? 0.08 : 0.04], [1, '#180b35', 0]], {
      cx: 0.55,
      cy: 0.95,
      r: 0.75,
    }),
    linear('ring', [[0, '#ffffff', 0.95], [0.4, t.lilac, 0.85], [1, t.coral, 0.6]], { x1: 0, y1: 0, x2: 1, y2: 0 }),
    linear('lockShackle', [[0, t.coralLight], [1, t.coral]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    radial('lockBody', [[0, t.lilac, 1], [0.55, t.lilacDeep, 1], [1, '#5532bd', 1]], { cx: 0.25, cy: 0.2, r: 0.9 }),
    linear('cardFace', [[0, t.card, 0.97], [0.62, t.card, 0.9], [1, t.card2, 0.84]], {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
    }),
    linear('acidClay', [[0, t.acidLight], [0.45, t.acid], [1, t.acidDark]], { x1: 0, y1: 0, x2: 0.3, y2: 1 }),
    linear('lilacClay', [[0, t.lilacLight], [0.5, t.lilac], [1, t.lilacDark]], { x1: 0, y1: 0, x2: 0.3, y2: 1 }),
    linear('cubeTop', [[0, t.lilacLight], [1, t.lilac]], { x1: 0, y1: 0, x2: 0.8, y2: 1 }),
    linear('cubeLeft', [[0, t.lilacDeep], [1, t.lilacDark]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    linear('cubeRight', [[0, t.lilac], [1, t.lilacDeep]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    linear('shard', [[0, '#ffffff', dark ? 0.16 : 0.34], [1, t.lilac, dark ? 0.025 : 0.08]], {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
    }),
    linear('sheen', [[0, '#ffffff', 0], [0.45, '#ffffff', dark ? 0.32 : 0.58], [1, '#ffffff', 0]], {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 0,
    }),
    shadowFilter('cardShadow', {
      dx: 14,
      dy: 22,
      blur: 26,
      color: t.shadow,
      opacity: dark ? 0.5 : 0.2,
    }),
    shadowFilter('starShadow', {
      dx: 8,
      dy: 18,
      blur: 18,
      color: t.shadow,
      opacity: dark ? 0.45 : 0.22,
    }),
    shadowFilter('pillShadow', {
      dx: 4,
      dy: 12,
      blur: 14,
      color: t.shadow,
      opacity: dark ? 0.42 : 0.18,
    }),
    shadowFilter('chipShadow', {
      dx: 0,
      dy: 8,
      blur: 18,
      color: t.shadow,
      opacity: dark ? 0.3 : 0.1,
    }),
    shadowFilter('lockShadow', {
      dx: 2,
      dy: 8,
      blur: 10,
      color: t.shadow,
      opacity: dark ? 0.45 : 0.2,
    }),
    blurFilter('softBlur', 14),
    blurFilter('tinyBlur', 4),
    grainFilter('grain', 21),
    `<clipPath id="cardClip"><rect width="360" height="236" rx="26"/></clipPath>`,
    `<clipPath id="starClip"><path d="${STAR}"/></clipPath>`,
  ].join('\n');

  const sparkle = (x, y, scale, fill, opacity = 1, dur = 0, begin = 0) =>
    `<g transform="translate(${x} ${y}) scale(${scale})" fill="${fill}" opacity="${opacity}">
      ${dur ? `<animate attributeName="opacity" values="${opacity};0.15;${opacity}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>` : ''}
      <path d="M0 -12 C2 -4 4 -2 12 0 C4 2 2 4 0 12 C-2 4 -4 2 -12 0 C-4 -2 -2 -4 0 -12 Z"/>
    </g>`;

  const twinkle = (x, y, r, fill, dur, begin) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="0.75">
      <animate attributeName="opacity" values="0.75;0.1;0.75" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </circle>`;

  const card = `<g transform="translate(870 156) rotate(3.5 180 118)">
    <rect width="360" height="236" rx="26" fill="${t.card}" filter="url(#cardShadow)"/>
    <g clip-path="url(#cardClip)">
      <rect width="360" height="236" fill="url(#cardFace)"/>
      <circle cx="330" cy="24" r="118" fill="${t.coral}" opacity="${dark ? '0.15' : '0.12'}"/>
      <circle cx="44" cy="230" r="112" fill="${t.lilac}" opacity="${dark ? '0.17' : '0.24'}"/>
      <path d="M-40 184 L182 -40 H250 L28 206 Z" fill="#ffffff" opacity="0.08"/>
      <g opacity="0.5">
        <g>
          <animateTransform attributeName="transform" type="translate" values="-250 0;500 0;500 0" dur="8.5s" repeatCount="indefinite"/>
          <rect x="-100" y="-90" width="64" height="420" fill="url(#sheen)" transform="rotate(18 0 0)"/>
        </g>
      </g>
      <rect x="1" y="1" width="358" height="234" rx="25" stroke="${t.cardStroke}" stroke-opacity="${dark ? '0.38' : '0.8'}"/>
      <path d="M26 2 H334" stroke="#ffffff" stroke-opacity="${dark ? '0.34' : '0.8'}" stroke-width="1.5" stroke-linecap="round"/>

      <g font-family="${FONT_MONO}" font-size="8.5" letter-spacing="1.1">
        <circle cx="26" cy="28" r="4" fill="${t.coral}"/>
        <circle cx="40" cy="28" r="4" fill="${t.acid}"/>
        <circle cx="54" cy="28" r="4" fill="${t.mint}"/>
        <text x="70" y="32" fill="${t.muted}">aadrit.os</text>
        <text x="332" y="32" text-anchor="end" fill="${t.muted}">↗</text>
      </g>
      <line x1="20" y1="50" x2="340" y2="50" stroke="${t.line}" stroke-opacity="0.8"/>

      <text x="28" y="108" font-family="${FONT_DISPLAY}" font-weight="900" font-size="34" letter-spacing="-1.4" fill="${t.ink}">Local-first.</text>
      <text x="28" y="132" font-family="${FONT_SANS}" font-size="13" letter-spacing="0.1" fill="${t.muted}">your data, your machine.</text>

      <g transform="translate(278 66)">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="7s" repeatCount="indefinite"/>
          <circle cx="28" cy="26" r="33" fill="${t.lilac}" opacity="0.24"/>
          <path d="M14 28 V18 a14 14 0 0 1 28 0 V28" fill="none" stroke="url(#lockShackle)" stroke-width="8" stroke-linecap="round"/>
          <rect x="3" y="27" width="50" height="43" rx="12" fill="url(#lockBody)" filter="url(#lockShadow)"/>
          <rect x="8" y="31" width="40" height="10" rx="5" fill="#ffffff" opacity="0.2"/>
          <circle cx="28" cy="47" r="5" fill="#251442" opacity="0.9"/>
          <rect x="25" y="50" width="6" height="10" rx="3" fill="#251442" opacity="0.9"/>
        </g>
      </g>

      <g font-family="${FONT_MONO}" font-size="7.5" letter-spacing="1.2">
        <rect x="28" y="157" width="76" height="25" rx="12.5" fill="${t.glass}" fill-opacity="${dark ? '0.08' : '0.5'}" stroke="${t.cardStroke}" stroke-opacity="${dark ? '0.26' : '0.7'}"/>
        <text x="66" y="173" text-anchor="middle" fill="${t.ink}" fill-opacity="0.8">PRIVATE</text>
        <rect x="112" y="157" width="78" height="25" rx="12.5" fill="${t.glass}" fill-opacity="${dark ? '0.08' : '0.5'}" stroke="${t.cardStroke}" stroke-opacity="${dark ? '0.26' : '0.7'}"/>
        <text x="151" y="173" text-anchor="middle" fill="${t.ink}" fill-opacity="0.8">OFFLINE</text>
      </g>
      <circle cx="31" cy="209" r="2.5" fill="${t.green}">
        <animate attributeName="opacity" values="1;0.35;1" dur="5s" repeatCount="indefinite"/>
      </circle>
      <text x="40" y="212" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="1.6" fill="${t.muted}">DESIGNED TO STAY YOURS</text>
      <text x="332" y="212" text-anchor="end" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="1.6" fill="${t.muted}">v1.0</text>
    </g>
  </g>`;

  const cube = `<g transform="translate(744 104)">
    <ellipse cx="43" cy="106" rx="36" ry="9" fill="${t.shadow}" opacity="${dark ? '0.5' : '0.16'}" filter="url(#softBlur)"/>
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="7s" begin="0.4s" repeatCount="indefinite"/>
      <g transform="scale(0.78)">
        <path d="M55 0 L110 30 L55 60 L0 30 Z" fill="url(#cubeTop)" stroke="#ffffff" stroke-opacity="0.65" stroke-width="1.5"/>
        <path d="M0 30 L55 60 L55 126 L0 96 Z" fill="url(#cubeLeft)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.2"/>
        <path d="M110 30 L55 60 L55 126 L110 96 Z" fill="url(#cubeRight)" stroke="#ffffff" stroke-opacity="0.38" stroke-width="1.2"/>
        <path d="M16 31 L55 51 L94 31" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.2"/>
        <path d="M10 38 L10 88" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1"/>
      </g>
    </g>
  </g>`;

  const body = `<rect width="${W}" height="${H}" fill="url(#canvas)"/>
<ellipse cx="1120" cy="288" rx="430" ry="308" fill="url(#lilacGlow)">
  <animate attributeName="opacity" values="0.72;1;0.72" dur="13s" repeatCount="indefinite"/>
</ellipse>
<ellipse cx="1278" cy="112" rx="232" ry="192" fill="url(#coralGlow)">
  <animate attributeName="opacity" values="0.8;1;0.8" dur="9s" begin="1.2s" repeatCount="indefinite"/>
</ellipse>
<ellipse cx="1270" cy="500" rx="206" ry="152" fill="url(#acidGlow)">
  <animate attributeName="opacity" values="0.7;1;0.7" dur="11s" begin="2.4s" repeatCount="indefinite"/>
</ellipse>

<g opacity="0.55">
  <circle cx="1090" cy="300" r="244" stroke="${t.line}" stroke-opacity="0.7" stroke-dasharray="2 10"/>
  <animateTransform attributeName="transform" type="rotate" from="0 1090 300" to="360 1090 300" dur="55s" repeatCount="indefinite"/>
</g>
<g opacity="0.3">
  <ellipse cx="1090" cy="300" rx="300" ry="186" transform="rotate(-16 1090 300)" stroke="${t.line}" stroke-dasharray="1 8"/>
  <animateTransform attributeName="transform" type="rotate" from="360 1090 300" to="0 1090 300" dur="80s" repeatCount="indefinite"/>
</g>
<g>
  <animateTransform attributeName="transform" type="rotate" from="0 1090 300" to="360 1090 300" dur="28s" repeatCount="indefinite"/>
  <circle cx="1090" cy="75" r="6" fill="${t.acid}"/>
  <circle cx="1315" cy="300" r="4" fill="${t.coral}"/>
  <circle cx="1090" cy="525" r="5" fill="${t.lilac}"/>
  <circle cx="865" cy="300" r="3" fill="${t.acid}"/>
</g>

<text x="64" y="62" font-family="${FONT_DISPLAY}" font-size="29" font-weight="900" letter-spacing="-1.2" fill="${t.ink}">aadrit<tspan fill="${t.coral}">*</tspan></text>
<text x="64" y="86" font-family="${FONT_MONO}" font-size="8.5" letter-spacing="2.4" fill="${t.muted}">PORTFOLIO / 2026</text>

<g transform="translate(1090 30)" filter="url(#chipShadow)">
  <rect width="246" height="42" rx="21" fill="${t.glass}" fill-opacity="${dark ? '0.08' : '0.42'}" stroke="${t.cardStroke}" stroke-opacity="${dark ? '0.25' : '0.8'}"/>
  <path d="M22 1 H224" stroke="#ffffff" stroke-opacity="${dark ? '0.25' : '0.75'}" stroke-width="1"/>
  <circle cx="22" cy="21" r="3.5" fill="${t.green}">
    <animate attributeName="opacity" values="1;0.3;1" dur="4.5s" repeatCount="indefinite"/>
  </circle>
  <text x="34" y="25" font-family="${FONT_MONO}" font-size="9" letter-spacing="1.5" fill="${t.ink}">PRODUCT ENGINEER · INDIA</text>
</g>

<text x="64" y="156" font-family="${FONT_MONO}" font-size="10.5" letter-spacing="3.2" fill="${t.muted}">HEY, I'M</text>

<text x="70" y="320" font-family="${FONT_DISPLAY}" font-weight="900" font-size="172" letter-spacing="-7" fill="${t.nameShadow}" opacity="0.92">AADRiT</text>
<text x="62" y="310" font-family="${FONT_DISPLAY}" font-weight="900" font-size="172" letter-spacing="-7" fill="${t.ink}">AADRiT</text>

<text x="64" y="382" font-family="${FONT_SANS}" font-weight="600" font-size="30" letter-spacing="-0.4" fill="${t.ink}">Useful things,</text>
<text x="64" y="434" font-family="${FONT_SERIF}" font-style="italic" font-size="47" letter-spacing="-0.8" fill="${t.coral}">slightly unexpected.</text>

<g transform="translate(64 458)" filter="url(#pillShadow)">
  <rect y="5" width="196" height="42" rx="21" fill="${t.acidDark}"/>
  <rect width="196" height="42" rx="21" fill="url(#acidClay)" stroke="${t.acidLight}" stroke-opacity="0.55"/>
  <ellipse cx="98" cy="5" rx="78" ry="10" fill="#ffffff" opacity="0.22"/>
  <circle cx="22" cy="21" r="4" fill="${t.ink}">
    <animate attributeName="opacity" values="1;0.45;1" dur="6.5s" repeatCount="indefinite"/>
  </circle>
  <text x="35" y="25" font-family="${FONT_MONO}" font-size="9.5" letter-spacing="1.6" fill="${t.ink}">OPEN TO COLLABS</text>
</g>
<text x="282" y="485" font-family="${FONT_MONO}" font-size="9.5" letter-spacing="1.7" fill="${t.muted}">LOCAL-FIRST · REALTIME · SECURITY</text>

<text x="64" y="536" font-family="${FONT_MONO}" font-size="8.5" letter-spacing="1.7" fill="${t.muted}">INDIA · UTC+05:30</text>
<text x="1336" y="536" text-anchor="end" font-family="${FONT_MONO}" font-size="8.5" letter-spacing="1.7" fill="${t.muted}">AADRIT-IND.VERCEL.APP</text>

<g transform="translate(824 104) rotate(-7 210 130)">
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 5;0 0" dur="11s" repeatCount="indefinite"/>
    <rect width="420" height="260" rx="32" fill="url(#shard)" stroke="${t.cardStroke}" stroke-opacity="${dark ? '0.18' : '0.34'}"/>
    <path d="M30 2 H390" stroke="#ffffff" stroke-opacity="${dark ? '0.18' : '0.5'}" stroke-width="1.2" stroke-linecap="round"/>
  </g>
</g>

<g transform="translate(886 170) rotate(5 180 118)">
  <rect width="360" height="236" rx="26" fill="${t.glass}" fill-opacity="${dark ? '0.04' : '0.16'}" stroke="${t.cardStroke}" stroke-opacity="${dark ? '0.12' : '0.3'}"/>
</g>

<g>
  <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="9s" begin="0.3s" repeatCount="indefinite"/>
  ${card}
</g>

${cube}

<g transform="translate(790 424)">
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-14;-10;-14" dur="10s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
    <g filter="url(#starShadow)">
      <path d="${STAR}" transform="translate(7 11)" fill="${t.coralDark}" opacity="0.85"/>
      <path d="${STAR}" fill="url(#starFill)" stroke="${t.coralLight}" stroke-opacity="0.28" stroke-width="1.5"/>
      <g clip-path="url(#starClip)">
        <ellipse cx="-30" cy="-38" rx="46" ry="25" transform="rotate(-28 -30 -38)" fill="#ffffff" opacity="${dark ? '0.2' : '0.32'}"/>
        <circle cx="-27" cy="-36" r="8" fill="#ffffff" opacity="${dark ? '0.36' : '0.56'}" filter="url(#tinyBlur)"/>
      </g>
    </g>
  </g>
</g>

<g transform="translate(1250 404)">
  <ellipse cx="6" cy="30" rx="76" ry="24" fill="${t.shadow}" opacity="${dark ? '0.45' : '0.16'}" filter="url(#softBlur)"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="8s" begin="1s" repeatCount="indefinite"/>
    <ellipse cx="0" cy="0" rx="112" ry="33" transform="rotate(-20)" fill="none" stroke="url(#ring)" stroke-width="7" opacity="0.8"/>
    <circle cx="102" cy="-22" r="5.5" fill="${t.acid}"/>
    <circle r="72" fill="url(#sphereBody)"/>
    <circle r="72" fill="url(#sphereShade)"/>
    <ellipse cx="-24" cy="-30" rx="27" ry="15" transform="rotate(-28 -24 -30)" fill="#ffffff" opacity="0.5" filter="url(#tinyBlur)"/>
    <circle cx="-33" cy="-42" r="6" fill="#ffffff" opacity="0.85"/>
    <path d="M-54 30 C-28 54 39 54 57 24" fill="none" stroke="${t.lilac}" stroke-opacity="0.45" stroke-width="2"/>
  </g>
</g>

<g transform="translate(1052 92) rotate(-6 100 22)" filter="url(#pillShadow)">
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="6.5s" begin="0.8s" repeatCount="indefinite"/>
    <rect y="5" width="200" height="42" rx="21" fill="${t.lilacDark}"/>
    <rect width="200" height="42" rx="21" fill="url(#lilacClay)" stroke="${t.lilacLight}" stroke-opacity="0.72"/>
    <ellipse cx="100" cy="5" rx="80" ry="10" fill="#ffffff" opacity="0.26"/>
    <circle cx="22" cy="21" r="4" fill="${t.coral}"/>
    <text x="34" y="25" font-family="${FONT_MONO}" font-size="9.5" letter-spacing="1.7" fill="#17121d">DESIGN + CODE</text>
  </g>
</g>

${sparkle(735, 222, 0.42, t.coral, 0.9, 4.2, 0.3)}
${sparkle(1342, 238, 0.3, t.acid, 0.9, 5.5, 1.1)}
${sparkle(910, 96, 0.24, t.lilac, 0.9, 4.8, 2.2)}
${twinkle(762, 488, 4, t.coral, 5.2, 0.7)}
${twinkle(1310, 520, 3, t.acid, 6.1, 1.9)}
${twinkle(1370, 360, 2.5, t.coral, 4.6, 0.4)}
${twinkle(822, 526, 2, t.acid, 5.8, 2.5)}
${twinkle(946, 82, 2, t.lilac, 4.9, 3)}
${twinkle(1270, 196, 2.5, t.acid, 6.8, 1.5)}
${twinkle(890, 404, 2, t.coral, 5.4, 3.2)}

${grain(W, H, dark ? 0.04 : 0.028)}`;

  return svgDoc({
    w: W,
    h: H,
    title:
      'Aadrit Chandravanci — useful things, slightly unexpected. An animated 3D soft-pop scene with a local-first glass card, orbiting rings, a glass cube, clay star and glossy sphere.',
    defs,
    body,
  });
}
