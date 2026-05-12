var fs = require('fs');
var result = {};
['dict-data.js','dict-specialized.js','dict-specialized-2.js','dict-specialized-3.js','dict-specialized-4.js','dict-specialized-5.js','dict-specialized-6.js','dict-specialized-7.js','dict-specialized-8.js','dict-specialized-9.js','dict-specialized-10.js','dict-specialized-11.js'].forEach(function(f) {
  var lines = fs.readFileSync(f, 'utf8').split('\n');
  var cur = null;
  lines.forEach(function(line) {
    var m = line.match(/\/\/\s*[═]+\s*(?:CHUYÊN NGÀNH:\s*)?(.+?)\s*(?:\(|[═])/);
    if (m) { cur = m[1].trim(); if (!result[cur]) result[cur] = []; }
    if (cur) {
      var re = /\['([^']+)','([^']+)','([^']+)','([^']+)','([^']+)'\]/g;
      var match;
      while ((match = re.exec(line)) !== null) {
        result[cur].push([match[1],match[2],match[3],match[4],match[5]]);
      }
    }
  });
});
var out = 'var FIELD_VOCAB={\n';
for (var k in result) {
  out += JSON.stringify(k) + ':[';
  result[k].forEach(function(w, i) { out += (i ? ',' : '') + JSON.stringify(w); });
  out += '],\n';
}
out += '};\n';
fs.writeFileSync('dict-fields.js', out);
console.log('Done:', Object.keys(result).length, 'fields,', 
  Object.values(result).reduce(function(a,b){return a+b.length},0), 'words');
