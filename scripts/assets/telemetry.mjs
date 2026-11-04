import {
  THEMES, FONT_DISPLAY, FONT_SERIF, FONT_MONO, svgDoc, gradient, glowFilter, r2, txt,
} from '../lib/design.mjs';

/* --------------------------------------------------------------- numbers */
export function numbers(themeId = 'dark', data = {}) {
  const t = THEMES[themeId];
  const W = 1200;
  const H = 300;
  const stats = [
    { v: data.commits ?? 0, label: 'COMMITS', sub: 'Every frame counts.', meta: 'SINCE JUL 2025' },
    { v: data.publicRepos ?? 0, label: 'PUBLIC REPOS', sub: 'Built in the open.', meta: 'ON GITHUB' },
    { v: data.liveBuilds ?? 0, label: 'LIVE BUILDS', sub: 'Deployed, not described.', meta: 'CLICKABLE' },
    { v: data.languages ?? 0, label: 'LANGUAGES', sub: 'One stack, many dialects.', meta: 'ACROSS THE WORK' },
  ];
  const colW = W / 4;

  const defs = [
    gradient('shine', [[0, t.gold, 0], [0.5, t.gold, 0.07], [1, t.gold, 0]], { x1: 0, y1: 0, x2: 1, y2: 0 }),
    glowFilter('ng', 3, { merge: false }),
  ].join('\n');

  const cells = stats
    .map((s, i) => {
      const x = i * colW;
      return `<g transform="translate(${x} 0)">
<text x="0" y="152" font-family="${FONT_DISPLAY}" font-size="94" font-weight="800" letter-spacing="-2" fill="${t.ink}">${txt(String(s.v))}</text>
<rect x="0" y="169" width="30" height="2" fill="${t.gold}"><animate attributeName="width" from="0" to="30" dur="1.2s" begin="${r2(0.1 + i * 0.08)}s" fill="freeze"/></rect>
<text x="0" y="196" font-family="${FONT_MONO}" font-size="10" letter-spacing="3.2" fill="${t.gold}">${txt(s.label)}</text>
<text x="0" y="220" font-family="${FONT_SERIF}" font-size="15" font-style="italic" fill="${t.muted}">${txt(s.sub)}</text>
<text x="0" y="244" font-family="${FONT_MONO}" font-size="8" letter-spacing="2.2" fill="${t.faint}">${txt(s.meta)}</text>
${i < 3 ? `<path d="M${colW - 30} 78V250" stroke="${t.line}" stroke-width="1"/>` : ''}
</g>`;
    })
    .join('\n');

  const body = `<text x="0" y="26" font-family="${FONT_MONO}" font-size="10.5" letter-spacing="4" fill="${t.gold}">BOX OFFICE</text>
<text x="${W}" y="26" text-anchor="end" font-family="${FONT_MONO}" font-size="8.5" letter-spacing="2.4" fill="${t.faint}">PULLED FROM THE GITHUB API · BAKED AT BUILD TIME</text>
<path d="M0 44H${W}" stroke="${t.line}" stroke-width="1"/>
${cells}
<rect x="-220" y="60" width="220" height="200" fill="url(#shine)"><animateTransform attributeName="transform" type="translate" from="0 0" to="1420 0" dur="12s" repeatCount="indefinite"/></rect>
<path d="M0 266H${W}" stroke="${t.line}" stroke-width="1"/>
<g font-family="${FONT_MONO}" font-size="8" letter-spacing="2.2" fill="${t.faint}">
<text x="0" y="287">${txt(`${data.totalStars ?? 0} STARS ACROSS PUBLIC WORK`)}</text>
<text x="${W / 2}" y="287" text-anchor="middle" opacity="0.75">UPDATED ${txt(data.updated || '')}</text>
<text x="${W}" y="287" text-anchor="end">AADRITIND · MMXXVI</text>
</g>`;

  return svgDoc({ w: W, h: H, title: 'Box office — commits, repositories, live builds and languages', defs, body });
}

/* --------------------------------------------------------------- footage */
export function footage(themeId = 'dark', data = {}) {
  const t = THEMES[themeId];
  const W = 1200;
  const H = 340;
  const cols = 52;
  const rows = 7;
  const cell = 14;
  const gap = 4;
  const left = 56;
  const top = 96;
  const step = cell + gap;
  const gridW = cols * step - gap;

  const counts = new Map((data.contributions || []).map((c) => [c.date, c.count]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const start = new Date(end);
  start.setDate(start.getDate() - (cols * 7 - 1));
  const best = Math.max(1, ...(data.contributions || []).map((c) => c.count));

  const ramp = themeId === 'light'
    ? ['#ece1cc', '#c8a257', '#b4862a', '#8d6410', '#5f430a']
    : ['#17130e', '#5e4618', '#9a7428', '#c99a3c', '#f0c05a'];

  let cells = '';
  let months = '';
  let lastMonth = -1;
  let active = 0;
  let idx = 0;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const d = new Date(start);
      d.setDate(start.getDate() + c * 7 + r);
      if (d > today) continue;
      idx++;
      const iso = d.toISOString().slice(0, 10);
      const n = counts.get(iso) || 0;
      if (n > 0) active++;
      const lv = n === 0 ? 0 : Math.min(4, 1 + Math.floor((n / best) * 3.4));
      const x = left + c * step;
      const y = top + r * step;
      const fill = ramp[lv];
      const pulse = n > 0 && idx % 5 === 0
        ? `<animate attributeName="opacity" values="0.55;1;0.55" dur="${r2(4 + (idx % 7))}s" repeatCount="indefinite"/>`
        : '';
      cells += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${fill}" opacity="${n ? 0.92 : 0.55}"><title>${iso} · ${n} commit${n === 1 ? '' : 's'}</title>${pulse}</rect>`;
      if (r === 0) {
        const m = d.getMonth();
        if (m !== lastMonth && c > 0) {
          lastMonth = m;
          months += `<text x="${x}" y="${top - 12}" font-family="${FONT_MONO}" font-size="8" letter-spacing="1.2" fill="${t.faint}">${txt(d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase())}</text>`;
        }
      }
    }
  }

  const labels = ['SUN', 'MON', 'WED', 'FRI']
    .map((d, i) => `<text x="${left - 10}" y="${top + [0, 1, 3, 5][i] * step + 10}" text-anchor="end" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="1.2" fill="${t.faint}">${d}</text>`)
    .join('\n');

  const legend = [0, 1, 2, 3, 4]
    .map((i) => `<rect x="${left + 40 + i * 18}" y="240" width="12" height="12" fill="${ramp[i]}" opacity="${i ? 0.92 : 0.55}"/>`)
    .join('');

  const defs = [
    gradient('playhead', [[0, t.gold, 0], [0.5, t.gold, 0.5], [1, t.gold, 0]], { x1: 0, y1: 0, x2: 0, y2: 1 }),
    glowFilter('fg', 3, { merge: false }),
  ].join('\n');

  const body = `<text x="0" y="26" font-family="${FONT_MONO}" font-size="10.5" letter-spacing="4" fill="${t.gold}">FOOTAGE LOG</text>
<text x="${W}" y="26" text-anchor="end" font-family="${FONT_MONO}" font-size="8.5" letter-spacing="2.4" fill="${t.faint}">52 WEEKS · ${txt(String(data.commits ?? 0))} COMMITS · ${active} ACTIVE DAYS</text>
<path d="M0 44H${W}" stroke="${t.line}" stroke-width="1"/>
${months}
${labels}
${cells}
<g>
<rect x="${left - 8}" y="${top - 8}" width="2" height="${rows * step + 8}" fill="url(#playhead)" filter="url(#fg)"/>
<animateTransform attributeName="transform" type="translate" from="0 0" to="${gridW} 0" dur="26s" repeatCount="indefinite"/>
</g>
<path d="M1000 78V248" stroke="${t.line}" stroke-width="1"/>
<g font-family="${FONT_DISPLAY}">
<text x="1030" y="118" font-size="30" font-weight="800" fill="${t.ink}">${txt(String(data.commits ?? 0))}</text>
<text x="1030" y="136" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="2" fill="${t.gold}">COMMITS</text>
<text x="1030" y="176" font-size="30" font-weight="800" fill="${t.ink}">${active}</text>
<text x="1030" y="194" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="2" fill="${t.gold}">ACTIVE DAYS</text>
<text x="1030" y="234" font-size="30" font-weight="800" fill="${t.ink}">${txt(String(data.streak ?? 0))}</text>
<text x="1030" y="252" font-family="${FONT_MONO}" font-size="7.5" letter-spacing="2" fill="${t.gold}">LONGEST STREAK</text>
</g>
<g font-family="${FONT_MONO}" font-size="7.5" letter-spacing="1.8" fill="${t.faint}">
<text x="${left}" y="250">LESS</text>
${legend}
<text x="${left + 140}" y="250">MORE</text>
</g>
<path d="M0 268H${W}" stroke="${t.line}" stroke-width="1"/>
<text x="0" y="306" font-family="${FONT_SERIF}" font-size="21" font-style="italic" fill="${t.muted}">Every commit is a frame. The cut is the product.</text>
<text x="${W}" y="306" text-anchor="end" font-family="${FONT_MONO}" font-size="8.5" letter-spacing="2.4" fill="${t.faint}">SHOT IN INDIA · SHIPPED EVERYWHERE</text>`;

  return svgDoc({ w: W, h: H, title: 'Footage log — a year of contributions as a film strip', defs, body });
}

/* --------------------------------------------------------------- credits */
const CREW = [
  {
    title: 'LANGUAGES',
    items: ['TypeScript', 'JavaScript', 'Python', 'HTML + CSS', 'SQL', 'Bash', 'PowerShell'],
  },
  {
    title: 'INTERFACE',
    items: ['React 19', 'Vite', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'WebGL', 'Accessibility'],
  },
  {
    title: 'SYSTEMS',
    items: ['Node.js', 'Fastify', 'PostgreSQL', 'Cloudflare Workers', 'D1', 'WebRTC', 'Docker', 'Linux', 'Proxmox', 'Tailscale'],
  },
  {
    title: 'SECURITY & AI',
    items: ['Burp Suite', 'Nmap', 'Ghidra', 'E2E encryption', 'Reverse engineering', 'LLM applications', 'OpenRouter', 'Gemini', 'Anthropic', 'Ollama'],
  },
];

export function credits(themeId = 'dark') {
  const t = THEMES[themeId];
  const W = 1200;
  const H = 430;
  const colW = 286;
  const colX = [0, 305, 610, 915];

  const cols = CREW.map((c, ci) => `<g transform="translate(${colX[ci]} 0)">
<text x="0" y="70" font-family="${FONT_MONO}" font-size="8.5" letter-spacing="2.4" fill="${t.gold}" opacity="0.8">${String(ci + 1).padStart(2, '0')}</text>
<text x="0" y="98" font-family="${FONT_SERIF}" font-size="23" font-style="italic" fill="${t.ink}">${txt(c.title)}</text>
<rect x="0" y="110" width="34" height="1.5" fill="${t.gold}"><animate attributeName="width" from="0" to="34" dur="1.1s" begin="${r2(0.1 + ci * 0.08)}s" fill="freeze"/></rect>
${c.items
    .map(
      (item, i) => `<g transform="translate(0 ${138 + i * 24})">
<rect x="-9" y="-3" width="3" height="3" fill="${t.gold}" opacity="0.8"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="${r2(3.4 + i * 0.2)}s" begin="${r2(-i * 0.4)}s" repeatCount="indefinite"/></rect>
<text x="0" y="3" font-family="${FONT_MONO}" font-size="12.5" letter-spacing="0.4" fill="${t.muted}">${txt(item)}</text>
</g>`
    )
    .join('\n')}
${ci < 3 ? `<path d="M${colW} 58V370" stroke="${t.line}" stroke-width="1"/>` : ''}
</g>`).join('\n');

  const body = `<text x="0" y="26" font-family="${FONT_MONO}" font-size="10.5" letter-spacing="4" fill="${t.gold}">TECHNICAL CREDITS</text>
<text x="${W}" y="26" text-anchor="end" font-family="${FONT_MONO}" font-size="8.5" letter-spacing="2.4" fill="${t.faint}">CAST &amp; CREW · ONE PERSON · NO SHORTCUTS</text>
<path d="M0 44H${W}" stroke="${t.line}" stroke-width="1"/>
${cols}
<path d="M0 388H${W}" stroke="${t.line}" stroke-width="1"/>
<g font-family="${FONT_MONO}" font-size="8.5" letter-spacing="2.2" fill="${t.faint}">
<text x="0" y="410">PICKED BY HAND. EARNED IN PRODUCTION.</text>
<text x="${W / 2}" y="410" text-anchor="middle" opacity="0.7">NO TEMPLATES · NO SUBSCRIPTIONS</text>
<text x="${W}" y="410" text-anchor="end">AADRIT · MMXXVI</text>
</g>`;

  return svgDoc({ w: W, h: H, title: 'Technical credits — languages, interface, systems, security and AI', body });
}
