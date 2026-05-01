import re, os

BASE = os.path.dirname(os.path.abspath(__file__))
files = [
    'ielts-doc.html', 'ielts-nghe.html', 'viet-email.html',
    'tu-vung-chu-de.html', 'ielts-task1-ban-do.html',
    'ielts-task1-bieu-do.html', 'ielts-task1-quy-trinh.html'
]

emoji_pattern = re.compile(
    '['
    '\U0001F300-\U0001F9FF'  # Misc Symbols and Pictographs, Emoticons, etc.
    '\U00002600-\U000026FF'  # Misc symbols
    '\U00002700-\U000027BF'  # Dingbats
    '\U0000FE00-\U0000FE0F'  # Variation Selectors
    '\U0001F000-\U0001FFFF'  # All supplementary
    '\U0000200D'             # Zero width joiner
    '\U000020E3'             # Combining enclosing keycap
    '\u2705\u274C\u2753'     # check, cross, question marks
    ']+', re.UNICODE
)

for f in files:
    fp = os.path.join(BASE, f)
    if not os.path.exists(fp):
        print(f'Skip (not found): {f}')
        continue
    with open(fp, 'r', encoding='utf-8') as fh:
        content = fh.read()
    cleaned = emoji_pattern.sub('', content)
    with open(fp, 'w', encoding='utf-8') as fh:
        fh.write(cleaned)
    print(f'Cleaned: {f}')

print('Done!')
