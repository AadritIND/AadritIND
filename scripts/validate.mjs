import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { runProbe } from './lib/probe.mjs';

const dir = process.argv[2] || 'assets';
const files = readdirSync(dir).filter((f) => f.endsWith('.svg')).sort();

function staticChecks(src) {
  const problems = [];
  if (/NaN|undefined|Infinity/.test(src)) problems.push('contains NaN/undefined/Infinity');
  if ((src.match(/<svg[\s>]/g) || []).length !== 1) problems.push('svg root count != 1');
  if (!/viewBox=/.test(src)) problems.push('missing viewBox');
  for (const m of src.matchAll(/(?:href|url)\(#([^)"']+)\)/g)) {
    if (!new RegExp(`id="${m[1]}"`).test(src)) problems.push(`dangling reference #${m[1]}`);
  }
  for (const m of src.matchAll(/values="([^"]+)"\s+keyTimes="([^"]+)"/g)) {
    if (m[1].split(';').length !== m[2].split(';').length) problems.push(`values/keyTimes mismatch (${m[1].split(';').length} vs ${m[2].split(';').length})`);
  }
  for (const m of src.matchAll(/values="([^"]+)"[^>]*calcMode="spline"[^>]*keySplines="([^"]+)"/g)) {
    const v = m[1].split(';').length, s = m[2].split(';').length;
    if (s !== v - 1) problems.push(`keySplines(${s}) != values-1(${v - 1})`);
  }
  for (const m of src.matchAll(/<(animate|animateTransform|animateMotion)\b[^>]*>/g)) {
    if (!/dur="[^"]+"/.test(m[0])) problems.push(`${m[1]} missing dur`);
  }
  // gradients must reference defined stops and have >=2 stops
  for (const m of src.matchAll(/<(linear|radial)Gradient\b[^>]*>([\s\S]*?)<\/\1Gradient>/g)) {
    if ((m[2].match(/<stop/g) || []).length < 2) problems.push(`gradient ${m[0].slice(0, 60)} has <2 stops`);
  }
  // filters need a result-consuming primitive
  for (const m of src.matchAll(/<filter\b[^>]*>([\s\S]*?)<\/filter>/g)) {
    if (!/fe[A-Z]/.test(m[1])) problems.push('filter with no fe* primitive');
  }
  // unbalanced tags (open = <tag followed by whitespace, >, or /)
  for (const tag of ['g', 'defs', 'text', 'svg', 'mask', 'clipPath']) {
    const openRe = new RegExp('<' + tag + '(?=[\\s>/])', 'g');
    const closeRe = new RegExp('</' + tag + '\\s*>', 'g');
    const o = (src.match(openRe) || []).length;
    const c = (src.match(closeRe) || []).length;
    if (o !== c) problems.push(`<${tag}> ${o} open vs ${c} close`);
  }
  // animating non-animatable / typo'd attributes
  for (const m of src.matchAll(/<animate\b[^>]*attributeName="([^"]+)"/g)) {
    if (!/^(d|x|y|x1|y1|x2|y2|cx|cy|r|rx|ry|width|height|opacity|fill-opacity|stroke-opacity|stroke-width|offset|stop-color|transform|points|visibility|fill|stroke|font-size)$/.test(m[1])) {
      problems.push(`suspicious animate attributeName="${m[1]}"`);
    }
  }
  return [...new Set(problems)];
}

const payloads = files.map((f) => ({ file: f, src: readFileSync(join(dir, f), 'utf8') }));

console.log('=== STATIC CHECKS ===');
const failures = [];
for (const p of payloads) {
  const probs = staticChecks(p.src);
  if (probs.length) failures.push(p.file);
  console.log(
    `${probs.length ? 'FAIL' : 'ok'}`.padEnd(5) +
      `${p.file.padEnd(26)} ${(p.src.length / 1024).toFixed(1).padStart(7)} KB` +
      (probs.length ? '\n      - ' + probs.join('\n      - ') : '')
  );
}

const report = runProbe(dir);
if (!report || !report.length) {
  console.log('\n=== DOM PROBE === failed to produce a report');
  process.exit(1);
}

console.log('\n=== DOM PROBE (real browser parse + layout) ===');
for (const r of report) {
  const bad = [];
  if (r.parseError) bad.push('XML PARSE ERROR: ' + r.parseError);
  if (!r.anim) bad.push('no animations');
  if (r.overflow && r.overflow.length) bad.push('text outside viewBox: ' + r.overflow.join(' | '));
  if (r.fullyClipped) bad.push(`${r.fullyClipped} shape(s) fully outside viewBox`);
  console.log(
    `${bad.length ? 'FAIL' : 'ok'}`.padEnd(5) +
      `${r.file.padEnd(26)} vb=${String(r.viewBox).padEnd(20)} anim=${String(r.anim).padStart(4)} shape=${String(r.shapes).padStart(4)} text=${String(r.texts).padStart(3)} defs=${String(r.defs).padStart(3)}` +
      (bad.length ? '\n      - ' + bad.join('\n      - ') : '')
  );
  if (bad.length) failures.push(r.file);
}
console.log(`\n${failures.length ? 'FAILED: ' + failures.join(', ') : 'ALL CHECKS PASSED'}`);
process.exit(failures.length ? 1 : 0);
