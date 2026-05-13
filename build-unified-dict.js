#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const browseFiles = [
  'dict-data.js',
  'dict-specialized.js',
  'dict-specialized-2.js',
  'dict-specialized-3.js',
  'dict-specialized-4.js',
  'dict-specialized-5.js',
  'dict-specialized-6.js',
  'dict-specialized-7.js',
  'dict-specialized-8.js',
  'dict-specialized-9.js',
  'dict-specialized-10.js',
  'dict-specialized-11.js',
  'dict-specialized-12.js',
  'dict-specialized-13.js'
];

const objectSources = [
  { file: 'dt1-extra.js', varName: 'DT1_EXTRA', source: 'daily-1' },
  { file: 'dt2-extra.js', varName: 'DT2_EXTRA', source: 'daily-2' },
  { file: 'dt3-data.js', varName: 'WORDS3', source: 'topic-advanced' },
  { file: 'ielts1-extra.js', varName: 'IELTS1_EXTRA', source: 'ielts-1' },
  { file: 'ielts2-extra.js', varName: 'IELTS2_EXTRA', source: 'ielts-2' }
];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function loadBrowseRows() {
  let src = '';
  for (const file of browseFiles) {
    src += read(file)
      .replace(/^const BROWSE=/, 'var BROWSE=')
      .replace(/if\(typeof BROWSE!==\'undefined\'\) BROWSE\.push\(/g, 'BROWSE.push(');
    src += '\n';
  }
  const fn = new Function(src + '\nreturn BROWSE;');
  return fn();
}

function loadObjectArray(file, varName) {
  const src = read(file);
  const fn = new Function(src + '\nreturn typeof ' + varName + " !== 'undefined' ? " + varName + ' : [];');
  return fn();
}

function normWord(word) {
  return String(word || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function pushUnique(list, value) {
  if (!value) return;
  if (!list.includes(value)) list.push(value);
}

function ensureEntry(map, word) {
  const key = normWord(word);
  if (!key) return null;
  if (!map.has(key)) {
    map.set(key, {
      word: key,
      display: String(word).trim(),
      ipa: '',
      vietnamese: [],
      levels: [],
      pos: [],
      topics: [],
      sources: [],
      sourceCount: 0
    });
  }
  return map.get(key);
}

function addBrowseEntry(map, row, source) {
  const entry = ensureEntry(map, row[0]);
  if (!entry) return;
  if (!entry.ipa && row[1]) entry.ipa = row[1];
  pushUnique(entry.vietnamese, row[2] || '');
  pushUnique(entry.levels, row[3] || '');
  pushUnique(entry.pos, row[4] || '');
  pushUnique(entry.sources, source);
  entry.sourceCount += 1;
}

function addObjectEntry(map, row, source) {
  const entry = ensureEntry(map, row.w);
  if (!entry) return;
  if (!entry.ipa && row.p) entry.ipa = row.p;
  pushUnique(entry.vietnamese, row.vi || '');
  pushUnique(entry.levels, row.band || '');
  pushUnique(entry.pos, row.type || row.t || '');
  pushUnique(entry.topics, row.topic || '');
  pushUnique(entry.sources, source);
  entry.sourceCount += 1;
}

function buildUnifiedDictionary() {
  const map = new Map();
  const duplicateMap = new Map();
  const sourceWordSets = new Map();
  const sourceReviewMap = new Map();

  function markDuplicate(word, source) {
    const key = normWord(word);
    if (!key) return;
    if (!duplicateMap.has(key)) duplicateMap.set(key, []);
    duplicateMap.get(key).push(source);
  }

  function trackSourceWord(source, word) {
    const key = normWord(word);
    if (!key) return;
    if (!sourceWordSets.has(source)) sourceWordSets.set(source, new Set());
    sourceWordSets.get(source).add(key);
  }

  for (const row of loadBrowseRows()) {
    const key = normWord(row[0]);
    trackSourceWord('browse', key);
    if (map.has(key)) markDuplicate(key, 'browse');
    addBrowseEntry(map, row, 'browse');
  }

  for (const src of objectSources) {
    const rows = loadObjectArray(src.file, src.varName);
    for (const row of rows) {
      const key = normWord(row.w);
      trackSourceWord(src.source, key);
      if (map.has(key)) markDuplicate(key, src.source);
      addObjectEntry(map, row, src.source);
    }
  }

  const records = Array.from(map.values()).sort((a, b) => a.word.localeCompare(b.word));
  const missingIpa = records.filter(r => !r.ipa).map(r => r.word);
  const missingVi = records.filter(r => !r.vietnamese.length).map(r => r.word);
  const multiSource = records.filter(r => r.sources.length > 1).length;
  const duplicateDetails = Array.from(duplicateMap.entries())
    .map(([word, sources]) => ({
      word,
      duplicateCount: sources.length,
      sources: [...new Set(sources)],
      finalSources: (map.get(word) && map.get(word).sources) || []
    }))
    .sort((a, b) => b.duplicateCount - a.duplicateCount || a.word.localeCompare(b.word));
  const topDuplicateWords = duplicateDetails.slice(0, 200);
  const sources = Array.from(sourceWordSets.keys()).sort();
  const duplicatePairs = [];
  const reviewPriority = ['browse', 'topic-advanced', 'ielts-1', 'ielts-2', 'daily-2', 'daily-1'];

  function getPreferredSource(finalSources) {
    for (const source of reviewPriority) {
      if (finalSources.includes(source)) return source;
    }
    return finalSources[0] || null;
  }

  for (let i = 0; i < sources.length; i++) {
    for (let j = i + 1; j < sources.length; j++) {
      const left = sources[i];
      const right = sources[j];
      const leftSet = sourceWordSets.get(left);
      const rightSet = sourceWordSets.get(right);
      const shared = [];
      leftSet.forEach(function(word) {
        if (rightSet.has(word)) shared.push(word);
      });
      if (shared.length) {
        shared.sort();
        duplicatePairs.push({
          pair: [left, right],
          sharedCount: shared.length,
          sampleWords: shared.slice(0, 100)
        });
      }
    }
  }
  duplicatePairs.sort((a, b) => b.sharedCount - a.sharedCount);

  duplicateDetails.forEach(function(item) {
    const preferred = getPreferredSource(item.finalSources);
    item.preferredSource = preferred;
    item.reviewInSources = item.finalSources.filter(function(source) {
      return source !== preferred;
    });
    item.internalOnly = item.reviewInSources.length === 0;
    item.reviewInSources.forEach(function(source) {
      if (!sourceReviewMap.has(source)) sourceReviewMap.set(source, []);
      sourceReviewMap.get(source).push(item.word);
    });
  });

  const sourceReviewLists = Array.from(sourceReviewMap.entries())
    .map(([source, words]) => ({
      source,
      count: words.length,
      words: words.sort().slice(0, 500)
    }))
    .sort((a, b) => b.count - a.count || a.source.localeCompare(b.source));
  const internalDuplicateWords = duplicateDetails
    .filter(function(item) { return item.internalOnly; })
    .map(function(item) { return item.word; });

  const report = {
    generatedAt: new Date().toISOString(),
    totals: {
      uniqueWords: records.length,
      missingIpa: missingIpa.length,
      missingVietnamese: missingVi.length,
      multiSourceWords: multiSource,
      duplicateEvents: Array.from(duplicateMap.values()).reduce((sum, arr) => sum + arr.length, 0),
      duplicateWords: duplicateDetails.length
    },
    sourceFiles: {
      browseFiles,
      objectSources: objectSources.map(s => s.file)
    },
    sampleMissingIpa: missingIpa.slice(0, 100),
    sampleMissingVietnamese: missingVi.slice(0, 100),
    duplicateDetails: topDuplicateWords,
    duplicatePairs: duplicatePairs,
    sourceReviewLists: sourceReviewLists,
    internalDuplicateWords: internalDuplicateWords.slice(0, 300)
  };

  return { records, report };
}

function buildMarkdownSummary(report) {
  const lines = [];
  lines.push('# Dictionary Dedupe Plan');
  lines.push('');
  lines.push('## Totals');
  lines.push('- Unique words: ' + report.totals.uniqueWords);
  lines.push('- Duplicate words: ' + report.totals.duplicateWords);
  lines.push('- Duplicate events: ' + report.totals.duplicateEvents);
  lines.push('- Missing IPA: ' + report.totals.missingIpa);
  lines.push('- Missing Vietnamese: ' + report.totals.missingVietnamese);
  lines.push('');
  lines.push('## Top Duplicate Pairs');
  report.duplicatePairs.slice(0, 12).forEach(function(row) {
    lines.push('- ' + row.pair.join(' <-> ') + ': ' + row.sharedCount + ' words');
  });
  lines.push('');
  lines.push('## Review By Source');
  report.sourceReviewLists.forEach(function(row) {
    lines.push('- ' + row.source + ': ' + row.count + ' duplicated words to review');
  });
  lines.push('');
  lines.push('## Internal Browse Duplicates');
  lines.push('- Count: ' + report.internalDuplicateWords.length);
  lines.push('- Sample: ' + report.internalDuplicateWords.slice(0, 20).join(', '));
  lines.push('');
  lines.push('## Top Duplicate Words');
  report.duplicateDetails.slice(0, 25).forEach(function(row) {
    if (row.internalOnly) {
      lines.push('- ' + row.word + ': internal duplicate inside `' + (row.preferredSource || '') + '`');
    } else {
      lines.push('- ' + row.word + ': keep `' + (row.preferredSource || '') + '`, review `' + row.reviewInSources.join('`, `') + '`');
    }
  });
  lines.push('');
  return lines.join('\n') + '\n';
}

function writeOutputs(records, report) {
  const outJs =
    'var EE_UNIFIED_DICT = ' +
    JSON.stringify(records, null, 2) +
    ';\n';
  fs.writeFileSync(path.join(ROOT, 'dict-unified.js'), outJs);
  fs.writeFileSync(path.join(ROOT, 'dictionary-report.json'), JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(path.join(ROOT, 'dictionary-dedupe-plan.md'), buildMarkdownSummary(report));
}

const { records, report } = buildUnifiedDictionary();
writeOutputs(records, report);

console.log('Built dict-unified.js');
console.log('Unique words:', report.totals.uniqueWords);
console.log('Missing IPA:', report.totals.missingIpa);
console.log('Missing Vietnamese:', report.totals.missingVietnamese);
console.log('Multi-source words:', report.totals.multiSourceWords);
console.log('Duplicate events:', report.totals.duplicateEvents);
