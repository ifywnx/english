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

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function loadRows(file, isPrimary) {
  const src = read(file);
  const runtime = isPrimary ? src : "var BROWSE=[];\n" + src;
  const fn = new Function(runtime + '\nreturn BROWSE;');
  return fn();
}

function escapeJs(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
}

function formatRow(row) {
  return "['" + escapeJs(row[0]) + "','" + escapeJs(row[1]) + "','" + escapeJs(row[2]) + "','" + escapeJs(row[3]) + "','" + escapeJs(row[4]) + "']";
}

function formatFile(rows, isPrimary, headerComment) {
  const body = rows.map(formatRow).join(',\n');
  const lines = [];
  if (headerComment) lines.push(headerComment);
  if (isPrimary) {
    lines.push('const BROWSE=[');
    if (body) lines.push(body);
    lines.push('];');
  } else {
    lines.push("if(typeof BROWSE!=='undefined') BROWSE.push(");
    if (body) lines.push(body);
    lines.push(');');
  }
  lines.push('');
  return lines.join('\n');
}

function getHeaderComment(src) {
  const firstLine = src.split('\n')[0].trim();
  return firstLine.startsWith('//') ? firstLine : '';
}

const seen = new Set();
const summary = [];

browseFiles.forEach(function(file, index) {
  const isPrimary = index === 0;
  const src = read(file);
  const rows = loadRows(file, isPrimary);
  const kept = [];
  const removed = [];

  rows.forEach(function(row) {
    const word = String(row[0] || '').trim().toLowerCase();
    if (!word) return;
    if (seen.has(word)) {
      removed.push(word);
      return;
    }
    seen.add(word);
    kept.push(row);
  });

  const out = formatFile(kept, isPrimary, getHeaderComment(src));
  fs.writeFileSync(path.join(ROOT, file), out);
  summary.push({ file, removedCount: removed.length, keptCount: kept.length });
});

summary.forEach(function(item) {
  console.log(item.file + ': kept ' + item.keptCount + ', removed ' + item.removedCount);
});
