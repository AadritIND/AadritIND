import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { hero } from './assets/hero.mjs';
import { principles } from './assets/principles.mjs';

const outDir = 'assets';
mkdirSync(outDir, { recursive: true });

let total = 0;
for (const [theme, prefix] of [
  ['dark', ''],
  ['light', '-light'],
]) {
  for (const [name, build] of [
    ['hero', hero],
    ['principles', principles],
  ]) {
    const file = `${name}${prefix}.svg`;
    const svg = build(theme);
    writeFileSync(join(outDir, file), svg);
    total += Buffer.byteLength(svg);
    console.log(`${file.padEnd(22)} ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
  }
}
console.log(`\n4 files · ${(total / 1024).toFixed(1)} KB`);
