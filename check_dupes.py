import re
files = {
  'DT1': '/Users/macm1/tiếng anh/tu-dien-doi-thuong.html',
  'DT1X': '/Users/macm1/tiếng anh/dt1-extra.js',
  'DT2': '/Users/macm1/tiếng anh/tu-dien-doi-thuong-2.html',
  'DT2X': '/Users/macm1/tiếng anh/dt2-extra.js',
  'DT3': '/Users/macm1/tiếng anh/dt3-data.js',
}
all_words = {}
for name, path in files.items():
  with open(path, 'r') as f:
    words = re.findall(r"w:'([^']+)'", f.read())
    for w in words:
      all_words.setdefault(w, []).append(name)
dupes = {w: srcs for w, srcs in all_words.items() if len(srcs) > 1}
for w, srcs in sorted(dupes.items()):
  print(f'{w}: {" + ".join(srcs)}')
print(f'Total duplicates: {len(dupes)}')
