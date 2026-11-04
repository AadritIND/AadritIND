// The whole campaign is generated here: hero, ticker, four acts, six posters, telemetry, credits.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hero, ticker, act, footer } from './assets/cinema.mjs';
import { poster } from './assets/posters.mjs';
import { numbers, footage, credits } from './assets/telemetry.mjs';
import { stats } from './data/stats.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'assets');
mkdirSync(outDir, { recursive: true });

const data = stats();
const repoOf = (name) => data.repos.find((r) => r.name.toLowerCase() === name.toLowerCase()) || {};

const CONTRIB = data.contributions || [];
const activeDates = [...new Set(CONTRIB.filter((c) => c.count > 0).map((c) => c.date))].sort();
let streak = 0;
let run = 0;
let prev = null;
for (const date of activeDates) {
  const day = new Date(`${date}T00:00:00Z`).getTime();
  run = prev != null && day - prev === 86400000 ? run + 1 : 1;
  streak = Math.max(streak, run);
  prev = day;
}
const updated = new Date(data.fetchedAt || Date.now())
  .toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
  .toUpperCase();

const boxOffice = {
  commits: data.commits || 0,
  publicRepos: data.publicRepos || 0,
  liveBuilds: data.repos.filter((r) => r.demo).length,
  languages: (data.languages || []).length,
  totalStars: data.totalStars || 0,
  updated,
};

const reelStats = {
  contributions: CONTRIB,
  commits: data.commits || 0,
  streak,
};

const projects = [
  {
    repo: 'Aegis',
    title: 'Aegis',
    scene: 'vault',
    tagline: 'A vault that looks like glass and behaves like a bunker.',
    category: 'SECURITY · DESKTOP',
    lang: 'TypeScript',
  },
  {
    repo: 'focusFlow',
    title: 'focusFlow',
    scene: 'timer',
    tagline: 'Study together across devices. Keep the history.',
    category: 'PRODUCTIVITY · REALTIME',
    lang: 'TypeScript',
  },
  {
    repo: 'conduit',
    title: 'conduit',
    scene: 'lattice',
    tagline: 'Rooms where the server never learns what was said.',
    category: 'PRIVACY · REALTIME',
    lang: 'TypeScript',
  },
  {
    repo: 'filemorph',
    title: 'filemorph',
    scene: 'pages',
    tagline: 'Convert the file. Keep every pixel, table and font.',
    category: 'TOOLS · CONVERSION',
    lang: 'JavaScript',
  },
  {
    repo: 'FormulaVault',
    title: 'FormulaVault',
    scene: 'orbit',
    tagline: '833 formulas. Zero signal required.',
    category: 'EDUCATION · OFFLINE',
    lang: 'JavaScript',
  },
  {
    repo: 'printbridge',
    title: 'printbridge',
    scene: 'print',
    tagline: 'Print from anywhere. Walk over and it is already done.',
    category: 'SELF-HOSTED · HARDWARE',
    lang: 'JavaScript',
  },
].map((p, i) => {
  const repo = repoOf(p.repo);
  return {
    ...p,
    index: i + 1,
    total: 6,
    stars: repo.stars || 0,
    year: (repo.updated || '2026').slice(0, 4),
    status: repo.demo ? 'IN THEATERS' : 'IN PRODUCTION',
  };
});

const acts = [
  { n: 1, roman: 'I', title: 'THE PROTAGONIST', sub: 'WHO / WHERE / WHY' },
  { n: 2, roman: 'II', title: 'SELECTED WORK', sub: 'SIX PRODUCTS · BUILT END TO END' },
  { n: 3, roman: 'III', title: 'THE CRAFT', sub: 'TOOLS OF THE TRADE' },
  { n: 4, roman: 'IV', title: 'THE NUMBERS', sub: 'RECEIPTS, NOT VIBES' },
];

const jobs = [
  ['hero', (t) => hero(t)],
  ...acts.map((a) => [`act-${a.n}`, (t) => act(t, a)]),
  ['numbers', (t) => numbers(t, boxOffice)],
  ['footage', (t) => footage(t, reelStats)],
  ['credits', (t) => credits(t)],
  ['footer', (t) => footer(t)],
  ...projects.map((p) => [`poster-${p.title.toLowerCase()}`, (t) => poster(t, p)]),
];

const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const wanted = only.length ? jobs.filter(([name]) => only.some((o) => name.includes(o))) : jobs;

let total = 0;
let files = 0;
for (const [name, build] of wanted) {
  for (const theme of ['dark', 'light']) {
    const svg = build(theme);
    const file = `${name}${theme === 'light' ? '-light' : ''}.svg`;
    writeFileSync(join(outDir, file), svg);
    total += Buffer.byteLength(svg);
    files++;
    console.log(`${file.padEnd(30)} ${(Buffer.byteLength(svg) / 1024).toFixed(1).padStart(7)} KB`);
  }
}

// The ticker is deliberately the same black film strip in both themes.
if (!only.length || only.some((o) => 'ticker'.includes(o))) {
  const svg = ticker();
  writeFileSync(join(outDir, 'ticker.svg'), svg);
  total += Buffer.byteLength(svg);
  files++;
  console.log(`${'ticker.svg'.padEnd(30)} ${(Buffer.byteLength(svg) / 1024).toFixed(1).padStart(7)} KB`);
}

for (const seal of ['seal-gold.png', 'seal-ink.png']) {
  if (!existsSync(join(outDir, seal))) console.error(`missing ${seal} — run: python scripts/mark.py`);
}

console.log(
  `\n${files} files · ${(total / 1024).toFixed(1)} KB · ${boxOffice.commits} commits · ${boxOffice.liveBuilds} live builds · ${activeDates.length} active days`
);
