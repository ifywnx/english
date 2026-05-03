#!/usr/bin/env node
/**
 * Batch fix script for EasyEnglish platform
 * Fix #1: Remove orphaned nav-drop code + trailing });
 * Fix #2: Remove duplicate page-transition-js + page-transition style
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const htmlFiles = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

let totalOrphanFixed = 0;
let totalTransitionFixed = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let changes = [];

  // === FIX #1: Remove orphaned nav-drop code ===
  // Pattern: standalone line with if(!e.target.closest('.nav-drop')) ... 
  // followed by }); on next line — OUTSIDE any event listener
  const orphanPattern = /\n  if\(!e\.target\.closest\('\.nav-drop'\)\) document\.querySelectorAll\('\.nav-drop\.open'\)\.forEach\((?:function\(d\)\{d\.classList\.remove\('open'\)\}|d=>d\.classList\.remove\('open'\))\);?\n\}\);\n/g;
  
  if (orphanPattern.test(content)) {
    content = content.replace(orphanPattern, '\n');
    changes.push('orphaned nav-drop code');
    totalOrphanFixed++;
  }

  // Also handle index.html variant (wrapped in document.addEventListener)
  const indexPattern = /\n\/\* === NAV DROPDOWN === \*\/\ndocument\.addEventListener\('click',function\(e\)\{\n  if\(!e\.target\.closest\('\.nav-drop'\)\) document\.querySelectorAll\('\.nav-drop\.open'\)\.forEach\(function\(d\)\{d\.classList\.remove\('open'\)\}\);\n\}\);\n/g;
  
  if (indexPattern.test(content)) {
    content = content.replace(indexPattern, '\n');
    changes.push('index nav-drop listener (handled by nav.js)');
    totalOrphanFixed++;
  }

  // === FIX #2: Remove duplicate page-transition-js ===
  // Remove the <style id="page-transition"> block
  const transStylePattern = /\n<style id="page-transition">\n\.page-enter\{[^<]*\}\n@keyframes pageIn\{[^<]*\}\n\.page-exit\{[^<]*\}\n@keyframes pageOut\{[^<]*\}\n<\/style>\n/g;
  
  if (transStylePattern.test(content)) {
    content = content.replace(transStylePattern, '\n');
    changes.push('page-transition style');
  }

  // Remove the <script id="page-transition-js"> block
  const transScriptPattern = /\n<script id="page-transition-js">\n\(function\(\)\{\n  document\.querySelector\('\.content'\)&&document\.querySelector\('\.content'\)\.classList\.add\('page-enter'\);\n  document\.addEventListener\('click',function\(e\)\{\n    var a=e\.target\.closest\('a\[href\]'\);\n    if\(!a\)return;var h=a\.getAttribute\('href'\);\n    if\(!h\|\|h\.startsWith\('#'\)\|\|h\.startsWith\('http'\)\|\|h\.startsWith\('javascript'\)\)return;\n    e\.preventDefault\(\);var c=document\.querySelector\('\.content'\);\n    if\(c\)\{c\.classList\.remove\('page-enter'\);c\.classList\.add\('page-exit'\);setTimeout\(function\(\)\{window\.location\.href=h\},200\);\}\n    else\{window\.location\.href=h;\}\n  \}\);\n\}\)\(\);\n<\/script>/g;
  
  if (transScriptPattern.test(content)) {
    content = content.replace(transScriptPattern, '\n<!-- page-transition-js removed: common.js handles transitions -->');
    changes.push('page-transition-js script');
    totalTransitionFixed++;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file}: ${changes.join(', ')}`);
  }
});

console.log(`\n--- Summary ---`);
console.log(`Orphan fixes: ${totalOrphanFixed}`);
console.log(`Transition fixes: ${totalTransitionFixed}`);
console.log(`Total files scanned: ${htmlFiles.length}`);
