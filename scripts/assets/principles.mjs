import {
  THEMES,
  FONT_DISPLAY,
  FONT_SANS,
  FONT_MONO,
  svgDoc,
  linear,
  radial,
  shadowFilter,
  blurFilter,
} from '../lib/softpop.mjs';

const W = 1400;
const H = 390;
const CARD_W = 414;
const CARD_H = 286;

export function principles(themeId = 'dark') {
  const t = THEMES[themeId];
  const dark = themeId !== 'light';

  const defs = [
    radial('trayGlow', [[0, t.lilac, dark ? 0.2 : 0.24], [0.6, t.lilac, 0.05], [1, t.lilac, 0]], {
      cx: 0.5,
      cy: 0.5,
      r: 0.65,
    }),
    linear('cardBuild', [[0, t.card, 0.98], [1, t.lilac, 0.26]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    linear('cardBreak', [[0, t.card, 0.98], [1, t.coral, 0.2]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    linear('cardShip', [[0, t.card, 0.98], [1, t.acid, 0.2]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    linear('cubeTop', [[0, t.lilacLight], [1, t.lilac]], { x1: 0, y1: 0, x2: 0.8, y2: 1 }),
    linear('cubeLeft', [[0, t.lilacDeep], [1, t.lilacDark]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    linear('cubeRight', [[0, t.lilac], [1, t.lilacDeep]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    radial('shieldBody', [[0, t.coralLight], [0.5, t.coral], [1, t.coralDark]], { cx: 0.26, cy: 0.18, r: 0.9 }),
    linear('planeMain', [[0, t.acidLight], [0.5, t.acid], [1, t.acidDark]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    linear('planeFold', [[0, t.acid], [1, t.acidDark]], { x1: 0, y1: 0, x2: 1, y2: 1 }),
    linear('sheen', [[0, '#ffffff', 0], [0.45, '#ffffff', 0.55], [1, '#ffffff', 0]], { x1: 0, y1: 0, x2: 1, y2: 0 }),
    shadowFilter('cardShadow', {
      dx: 0,
      dy: 18,
      blur: 24,
      color: t.shadow,
      opacity: dark ? 0.5 : 0.16,
    }),
    shadowFilter('iconShadow', {
      dx: 3,
      dy: 9,
      blur: 10,
      color: t.shadow,
      opacity: dark ? 0.45 : 0.2,
    }),
    blurFilter('tinyBlur', 4),
    `<clipPath id="clip0"><rect width="${CARD_W}" height="${CARD_H}" rx="32"/></clipPath>`,
    `<clipPath id="clip1"><rect width="${CARD_W}" height="${CARD_H}" rx="32"/></clipPath>`,
    `<clipPath id="clip2"><rect width="${CARD_W}" height="${CARD_H}" rx="32"/></clipPath>`,
  ].join('\n');

  const cubeIcon = `<g transform="translate(292 52) scale(0.78)" filter="url(#iconShadow)">
    <ellipse cx="55" cy="133" rx="46" ry="10" fill="${t.shadow}" opacity="${dark ? '0.46' : '0.14'}" filter="url(#tinyBlur)"/>
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="6.5s" begin="0.5s" repeatCount="indefinite"/>
      <path d="M55 0 L110 30 L55 60 L0 30 Z" fill="url(#cubeTop)" stroke="#ffffff" stroke-opacity="0.7" stroke-width="1.5"/>
      <path d="M0 30 L55 60 L55 126 L0 96 Z" fill="url(#cubeLeft)" stroke="#ffffff" stroke-opacity="0.28" stroke-width="1.2"/>
      <path d="M110 30 L55 60 L55 126 L110 96 Z" fill="url(#cubeRight)" stroke="#ffffff" stroke-opacity="0.36" stroke-width="1.2"/>
      <path d="M16 31 L55 51 L94 31" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.2"/>
      <circle cx="55" cy="30" r="3" fill="${t.acid}"/>
    </g>
  </g>`;

  const shieldIcon = `<g transform="translate(296 48) scale(0.8)" filter="url(#iconShadow)">
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="7.2s" begin="0.8s" repeatCount="indefinite"/>
      <path d="M50 4 L96 20 V50 C96 80 76 98 50 112 C24 98 4 80 4 50 V20 Z" transform="translate(4 7)" fill="${t.coralDark}" opacity="0.8"/>
      <path d="M50 4 L96 20 V50 C96 80 76 98 50 112 C24 98 4 80 4 50 V20 Z" fill="url(#shieldBody)" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
      <path d="M52 30 L41 56 L54 57 L43 86" fill="none" stroke="${t.ink}" stroke-opacity="0.7" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M18 19 L38 13" stroke="#ffffff" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>
    </g>
  </g>`;

  const planeIcon = `<g transform="translate(290 60) scale(0.84)" filter="url(#iconShadow)">
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="6.8s" begin="1.1s" repeatCount="indefinite"/>
      <path d="M0 44 L104 0 L56 70 L42 46 Z" fill="url(#planeMain)" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.4"/>
      <path d="M104 0 L56 70 L48 40 Z" fill="url(#planeFold)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.2"/>
      <path d="M0 44 L42 46 L56 70" fill="none" stroke="${t.acidLight}" stroke-opacity="0.55" stroke-width="1.4"/>
      <circle cx="91" cy="16" r="3" fill="${t.ink}" opacity="0.5"/>
    </g>
  </g>`;

  const card = ({ x, rotate, tint, index, title, line, icon, begin }) => `
<g transform="translate(${x} 48) rotate(${rotate} 207 143)">
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="8s" begin="${begin}s" repeatCount="indefinite"/>
    <rect width="${CARD_W}" height="${CARD_H}" rx="32" fill="url(#${tint})" stroke="${t.cardStroke}" stroke-opacity="${dark ? '0.42' : '0.72'}" filter="url(#cardShadow)"/>
    <g clip-path="url(#clip${index})">
      <circle cx="364" cy="38" r="115" fill="${title === 'BREAK' ? t.coral : title === 'SHIP' ? t.acid : t.lilac}" opacity="0.1">
        <animate attributeName="opacity" values="0.07;0.16;0.07" dur="7s" begin="${begin}s" repeatCount="indefinite"/>
      </circle>
      <path d="M-40 330 L140 0 H228 L48 330 Z" fill="#ffffff" opacity="0.05"/>
      <g opacity="0.38">
        <g>
          <animateTransform attributeName="transform" type="translate" values="-320 0;520 0;520 0" dur="9s" begin="${begin + 0.2}s" repeatCount="indefinite"/>
          <rect x="-80" y="-110" width="60" height="520" fill="url(#sheen)" transform="rotate(18 0 0)"/>
        </g>
      </g>
      <path d="M26 2 H386" stroke="#ffffff" stroke-opacity="${dark ? '0.28' : '0.62'}" stroke-width="1.2" stroke-linecap="round"/>

      <g font-family="${FONT_MONO}" font-size="8.5" letter-spacing="1.8" fill="${t.muted}">
        <text x="28" y="37">0${index + 1}</text>
        <text x="386" y="37" text-anchor="end">MODE</text>
      </g>
      <line x1="28" y1="52" x2="386" y2="52" stroke="${t.line}" stroke-opacity="0.8"/>

      ${icon}

      <text x="28" y="212" font-family="${FONT_DISPLAY}" font-weight="900" font-size="48" letter-spacing="-2" fill="${t.ink}">${title}</text>
      <text x="28" y="238" font-family="${FONT_SANS}" font-size="13.5" letter-spacing="0.1" fill="${t.muted}">${line}</text>
      <line x1="28" y1="258" x2="386" y2="258" stroke="${t.line}" stroke-opacity="0.7"/>
      <circle cx="33" cy="270" r="2.5" fill="${t.green}">
        <animate attributeName="opacity" values="1;0.35;1" dur="5s" begin="${begin + 0.4}s" repeatCount="indefinite"/>
      </circle>
      <text x="42" y="273" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="1.5" fill="${t.muted}">IN THE LOOP</text>
      <text x="386" y="273" text-anchor="end" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="1.5" fill="${t.muted}">AADRiT*</text>
    </g>
  </g>
</g>`;

  const body = `<ellipse cx="700" cy="195" rx="650" ry="185" fill="url(#trayGlow)">
  <animate attributeName="opacity" values="0.65;1;0.65" dur="13s" repeatCount="indefinite"/>
</ellipse>

${card({
  x: 40,
  rotate: -2.4,
  tint: 'cardBuild',
  index: 0,
  title: 'BUILD',
  line: 'interface, api, data',
  icon: cubeIcon,
  begin: 0,
})}

<text x="473" y="196" text-anchor="middle" font-family="${FONT_MONO}" font-size="18" fill="${t.faint}">
  <animate attributeName="opacity" values="0.35;0.9;0.35" dur="5s" repeatCount="indefinite"/>
  →
</text>

${card({
  x: 493,
  rotate: 1.3,
  tint: 'cardBreak',
  index: 1,
  title: 'BREAK',
  line: 'threat model, test, harden',
  icon: shieldIcon,
  begin: 0.6,
})}

<text x="927" y="196" text-anchor="middle" font-family="${FONT_MONO}" font-size="18" fill="${t.faint}">
  <animate attributeName="opacity" values="0.9;0.35;0.9" dur="5s" begin="0.7s" repeatCount="indefinite"/>
  →
</text>

${card({
  x: 946,
  rotate: -1.5,
  tint: 'cardShip',
  index: 2,
  title: 'SHIP',
  line: 'deploy, watch, iterate',
  icon: planeIcon,
  begin: 1.2,
})}

<circle cx="84" cy="128" r="3" fill="${t.coral}">
  <animate attributeName="opacity" values="0.7;0.1;0.7" dur="4.8s" repeatCount="indefinite"/>
</circle>
<circle cx="1312" cy="102" r="2.5" fill="${t.acid}">
  <animate attributeName="opacity" values="0.2;0.85;0.2" dur="6s" begin="1.4s" repeatCount="indefinite"/>
</circle>
<circle cx="486" cy="296" r="2" fill="${t.lilac}">
  <animate attributeName="opacity" values="0.8;0.15;0.8" dur="5.6s" begin="0.9s" repeatCount="indefinite"/>
</circle>`;

  return svgDoc({
    w: W,
    h: H,
    title: 'How Aadrit works — build, break, ship. Three floating glass cards with 3D cube, cracked shield and paper-plane icons.',
    defs,
    body,
  });
}
