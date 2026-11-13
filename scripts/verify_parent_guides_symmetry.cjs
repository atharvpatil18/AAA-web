const fs = require('fs');

function getKeys(code, exportName) {
  const match = code.match(new RegExp('export const ' + exportName + '[^=]*= \\{([\\s\\S]*?)\\n\\};'));
  if (!match) return [];
  return match[1]
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.includes(':') && !l.startsWith('//'))
    .map(l => l.split(':')[0].trim());
}

const sets = [
  ['hub', fs.readFileSync('src/lib/translations_parent_guides_hub.ts', 'utf-8'), 'hubEn', 'hubHi', 'hubMr'],
  ['g1', fs.readFileSync('src/lib/translations_guide_abacus_vedic.ts', 'utf-8'), 'g1En', 'g1Hi', 'g1Mr'],
  ['g2', fs.readFileSync('src/lib/translations_guide_school_confuse.ts', 'utf-8'), 'g2En', 'g2Hi', 'g2Mr'],
  ['g3', fs.readFileSync('src/lib/translations_guide_finger_counting.ts', 'utf-8'), 'g3En', 'g3Hi', 'g3Mr'],
  ['g4', fs.readFileSync('src/lib/translations_guide_silly_mistakes.ts', 'utf-8'), 'g4En', 'g4Hi', 'g4Mr'],
  ['g5', fs.readFileSync('src/lib/translations_guide_ideal_age.ts', 'utf-8'), 'g5En', 'g5Hi', 'g5Mr'],
];

let totalEn = 0, totalHi = 0, totalMr = 0;
let anyMismatch = false;

sets.forEach(([name, code, enName, hiName, mrName]) => {
  const en = getKeys(code, enName);
  const hi = getKeys(code, hiName);
  const mr = getKeys(code, mrName);
  totalEn += en.length;
  totalHi += hi.length;
  totalMr += mr.length;
  const missHi = en.filter(k => !hi.includes(k));
  const missMr = en.filter(k => !mr.includes(k));
  if (missHi.length > 0 || missMr.length > 0) {
    anyMismatch = true;
    console.error('MISMATCH in ' + name, { missHi, missMr });
  } else {
    console.log(`✓ ${name}: ${en.length} keys in EN, HI, MR`);
  }
});

console.log('---');
console.log('Parent Guides Translation Totals:', { totalEn, totalHi, totalMr });
if (!anyMismatch) {
  console.log('ALL PARENT GUIDES TRANSLATIONS 100% SYMMETRICAL!');
}
