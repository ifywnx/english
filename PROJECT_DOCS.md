# 📚 EasyEnglish — Project Documentation

> **Cập nhật lần cuối:** 2026-04-26  
> **Tổng số files:** 46 files (31 HTML + 5 JS + 1 CSS + 9 assets/config)  
> **Tổng dung lượng:** ~1.6MB  
> **Mục đích file này:** Ghi chi tiết toàn bộ project để bất kỳ ai (hoặc AI mới) đọc file này là hiểu hết plan, kiến trúc, tính năng, API, và cách hoạt động.

---

## 🎯 1. Tầm nhìn & Triết lý

### Tầm nhìn lớn
**Xây dựng nền tảng học ngôn ngữ hoàn hảo, toàn năng, ăn đứt mọi app/web trên thị trường.**

- Không chỉ tiếng Anh — đây là **nền tảng đa ngôn ngữ** (Anh → Trung → Hàn → Nhật → ...)
- Phù hợp **mọi đối tượng**: từ cơ bản đến nâng cao max level
- Bao gồm cả **tiếng Anh chuyên ngành** (IT, Y tế, Kinh doanh, Luật, ...)
- Chất lượng **peak, wow** — mỗi trang phải khiến user "WOW" ngay lần đầu
- Phong cách **Gen Z**, hiện đại, thú vị, dễ dùng — phá vỡ rào cản "học tiếng Anh = khó" với người Việt

### Lộ trình triển khai
1. ✅ **Phase 1: Web tĩnh** (HTML/CSS/JS thuần) — Đang hoàn thiện
2. **Phase 2: Deploy + Polish** — GitHub Pages, tối ưu SEO, fix bugs thực tế
3. **Phase 3: React Native Expo** — Chuyển sang app, mượt như iOS native
4. **Phase 4: Backend** — Auth, Cloud Sync, AI chatbot, Leaderboard
5. **Phase 5: Multi-language** — Dựa form tiếng Anh → build tiếng Trung, Hàn, Nhật

### Triết lý thiết kế
- **Mượt như iOS** — transitions, animations, interactions phải silky smooth
- **KHÔNG dùng emoji** trong code/UI — chỉ dùng Lucide SVG Icons (professional)
- **Mobile-first** — test trên điện thoại thật, không chỉ browser dev tools
- **Bảo mật** — khi có backend, security là ưu tiên hàng đầu
- **Offline-first** — data lưu `localStorage`, hoạt động không cần mạng
- **Không placeholder** — mọi nội dung phải thật, đầy đủ, chất lượng cao
- **Premium** — không phải MVP, mà là sản phẩm hoàn chỉnh

### Đối thủ cần vượt qua
- Duolingo, Elsa Speak, Cake, IELTS Prep apps
- Khác biệt: **toàn diện** (grammar + vocab + skills + IELTS + dictionary + practice), **miễn phí**, **offline**, **đa ngôn ngữ**

---

## 📁 2. Cấu trúc File

### Core Files (files nền tảng — mọi trang đều dùng)

| File | Vai trò | Kích thước | Version hiện tại |
|------|---------|------------|------------------|
| `style.css` | CSS chung: nav, bottom nav, more drawer, back-to-top, reading progress, responsive | 14,199 B | `?v=3` |
| `common.js` | JS injection: bottom nav, more drawer (36 items đồng bộ nav.js), back-to-top, reading progress, select-to-translate, page transitions, global search | 41,000 B | `?v=13` |
| `theme.js` | Theme engine: 12 themes, theme picker panel, CSS variables | 17,544 B | `?v=3` |
| `gamification.js` | XP system, streak, badges, daily challenge, confetti, sound effects, XP bar | 13,534 B | `?v=3` |
| `dict-data.js` | Dữ liệu từ điển offline (~2000+ từ) cho autocomplete | 14,213 B | — |

### SEO & PWA Files

| File | Vai trò | Kích thước |
|------|---------|------------|
| `manifest.json` | PWA manifest (installable app config) | 992 B |
| `robots.txt` | Search engine crawl rules | 44 B |
| `sitemap.xml` | 25 URLs cho search engines | 2,934 B |
| `favicon.svg` | SVG favicon | 238 B |
| `apple-touch-icon.png` | iOS home screen icon | 1,649 B |
| `icon-192.png` | PWA icon 192x192 | 2,100 B |
| `icon-512.png` | PWA icon 512x512 | 6,465 B |

### Utility Files

| File | Vai trò |
|------|----------|
| `.tmp_check.js` | Script tạm (CSS orphan checker) — có thể xóa |
| `index.html.bak` | Backup trang chủ cũ — có thể xóa |

### HTML Pages (30+ trang)

#### 📗 Grammar (Ngữ pháp)
| File | Nội dung |
|------|----------|
| `grammar.html` | 12 thì, Câu điều kiện, Passive, Reported Speech, Relative Clause, Parts of Speech |
| `grammar-advanced.html` | Inversion, Cleft Sentence, Subjunctive, Emphasis |

#### 📘 Vocabulary (Từ vựng)
| File | Nội dung |
|------|----------|
| `vocabulary.html` | 20 chủ đề, 430+ từ, Flashcard, Quiz |
| `synonyms.html` | 8 nhóm Đồng/Trái nghĩa, Filter, IELTS tips |
| `collocations.html` | Make/Do, Phrasal Verbs, Idioms |
| `idioms.html` | 77+ idioms, Quiz, Filter 9 chủ đề |
| `confusing-words.html` | Các cặp từ hay nhầm (affect/effect, ...) |
| `phrasal-verbs.html` | Phrasal verbs thông dụng |
| `academic-words.html` | AWL 570 từ academic, Flashcard, Quiz |
| `irregular-verbs.html` | 100+ động từ bất quy tắc |
| `linking-words.html` | Từ nối / Liên từ |

#### 🎯 IELTS
| File | Nội dung | Kích thước |
|------|----------|------------|
| `ielts.html` | IELTS Guide tổng hợp: Writing Task 1/2, Reading, Listening, Speaking | 72,113 B |
| `ielts-writing-band9.html` | Band 9 Writing samples | 49,965 B |
| `ielts-speaking-topics.html` | Speaking topics + sample answers | 48,551 B |
| `mock-test.html` | Mock test thi thử (có chấm điểm tự động) | 40,470 B |
| `paraphrasing.html` | Kỹ thuật Paraphrasing (IELTS) | 45,121 B |

#### 📖 Từ điển
| File | Nội dung |
|------|----------|
| `dictionary.html` | Từ điển Anh-Việt online (dùng API) |
| `dictionary-everyday.html` | Từ điển đời thường (tập 1) |
| `dictionary-everyday-2.html` | Từ điển đời thường (tập 2) |
| `dictionary-ielts.html` | Từ điển IELTS (tập 1) |
| `dictionary-ielts-2.html` | Từ điển IELTS (tập 2) |

#### 🎤 Skills (Kỹ năng)
| File | Nội dung | Kích thước |
|------|----------|------------|
| `skills.html` | Tổng hợp 4 kỹ năng: Reading, Listening, Speaking, Writing | 63,694 B |
| `pronunciation.html` | IPA, Ngữ điệu, Nối âm, Minimal Pairs | 64,322 B |
| `listening.html` | Luyện nghe: Audio, Transcript, Dictation | 36,490 B |
| `conversation.html` | Giao tiếp hàng ngày / Daily Conversation | 21,889 B |

#### 🛠️ Practice (Luyện tập)
| File | Nội dung |
|------|----------|
| `quiz.html` | Multiple choice, Fill-in-the-blank, Điểm |
| `spaced-repetition.html` | SRS Flashcard, Intervals (Leitner system) |
| `writing-checker.html` | Grammar check, Word count |
| `progress.html` | Streak dashboard, Stats, Module progress |

#### 🏠 Khác
| File | Nội dung |
|------|----------|
| `index.html` | Trang chủ: Hero section, Streak badge, Module grid, Roadmap 0→9.0 |

---

## 🎨 3. Hệ thống Theme

### Engine: `theme.js`

12 themes, chia 2 nhóm Dark/Light, dùng CSS Variables:

#### 🌙 Dark Themes (6)
| Theme | Tên hiển thị | Màu chính | Đặc điểm |
|-------|-------------|-----------|-----------|
| `aura` | Aura Night | `#64d8a5` (xanh lá mint) | Default theme, tối sang trọng |
| `midnight` | Midnight | `#7b6ef6` (tím) | Deep blue-purple |
| `sunset` | Sunset | `#f4845f` (cam) | Warm orange tones |
| `forest` | Forest | `#6bcb77` (xanh lá) | Nature green |
| `y2k-dark` | Y2K Dark | `#ff6ff2` (hồng neon) | Retro 2000s, neon pink |
| `genz-dark` | Gen Z Dark | `#7c3aed` (tím đậm) | Modern purple vibe |

#### ☀️ Light Themes (6)
| Theme | Tên hiển thị | Màu chính | Đặc điểm |
|-------|-------------|-----------|-----------|
| `cream` | Cream Light | `#d4a574` (nâu kem) | Warm, cozy |
| `ocean` | Ocean Light | `#0ea5e9` (xanh biển) | Fresh, clean |
| `oldmoney` | Old Money | `#8B7355` (nâu vàng) | Classic, luxury |
| `kid` | Kid | `#FF6B6B` (đỏ hồng) | Colorful, playful |
| `y2k-light` | Y2K Light | `#ff1493` (hồng đậm) | Retro pastel |
| `genz-light` | Gen Z Light | `#7c3aed` (tím) | Clean modern |

### CSS Variables mỗi theme define
```css
--bg          /* Nền chính */
--bg2         /* Nền phụ (card, section) */
--bg3         /* Nền hover */
--text        /* Chữ chính */
--text2       /* Chữ phụ */
--text3       /* Chữ mờ */
--accent      /* Màu nhấn chính */
--accent2     /* Màu nhấn phụ */
--accent3     /* Màu nhấn 3 */
--border      /* Viền */
--shadow      /* Đổ bóng */
--card-bg     /* Nền card */
--card-border /* Viền card */
--code-bg     /* Nền code block */
```

### Theme Picker UI
- Panel glassmorphism floating
- Grid 2 cột, chia nhóm Dark/Light
- Mỗi theme: color swatch + tên + checkmark khi active
- Mở từ: Top nav button (desktop) hoặc More Drawer (mobile)
- Lưu vào `localStorage('ee_theme')`

---

## 🧩 4. UI Components (Injection System)

Tất cả UI chung được inject tự động từ `common.js`, **KHÔNG** copy-paste HTML vào mỗi file.

### Bottom Navigation (Mobile only, ≤900px)
- **Vị trí:** Fixed bottom, glassmorphism
- **Items:** Home, Grammar, Vocab, Dictionary, More (☰)
- **Config:** Object `bnItems` trong `common.js`
- **Style:** Trong `style.css` (không dùng `!important`)
- **Animation:** Show/hide khi scroll (scrollY tracking)

### More Drawer (Mobile only)
- **Mở từ:** Nút "More" trên Bottom Nav
- **Tổng:** 36 items + nút Đổi giao diện — **đồng bộ với `nav.js`**
- **Nhóm:** Học cơ bản (4) → Từ vựng (7) → Kỹ năng (7) → IELTS (7) → Từ điển (5) → Chuyên ngành (4) → Tiện ích (2)
- **Config:** Object `drawerItems` trong `common.js`
- **Style:** Slide-up overlay, glassmorphism, grid 4 cột

### Back-to-Top Button
- **Hiện khi:** scrollY > 300px
- **Style:** Floating circle, bottom-right
- **Animation:** Fade in/out

### Reading Progress Bar
- **Vị trí:** Fixed top, full-width
- **Style:** Thin gradient bar, z-index: 9998

### XP Bar (below nav)
- **Vị trí:** Fixed, ngay dưới top nav bar
- **Desktop:** Luôn hiện
- **Mobile:** Hiện 4s rồi tự ẩn
- **Nội dung:** Level icon + Level name + Progress bar + Total XP + Streak
- **Click:** → progress.html

---

## 🌐 5. APIs & External Services

### Dịch thuật (Select-to-Translate)
| Service | URL | Mục đích | Giới hạn |
|---------|-----|----------|----------|
| **MyMemory Translation** | `api.mymemory.translated.net/get?q=...&langpair=en|vi` | Dịch Anh → Việt | 1000 req/ngày (free) |
| **Free Dictionary API** | `api.dictionaryapi.dev/api/v2/entries/en/{word}` | IPA, definition, examples, part of speech | Unlimited, free |

#### Cơ chế fallback khi dịch:
1. **Local dictionary** (120+ từ phổ biến) → Dịch ngay, không cần mạng
2. **MyMemory API** → Dịch online
3. **Matches array** → Nếu API trả lại từ gốc, thử `matches[]`
4. **Dictionary API** → Lấy IPA, definition, examples
5. **Thông báo lỗi** → "Không tìm thấy nghĩa cho..."

### Tra từ điển (`dictionary.html`)
| Service | URL | Mục đích |
|---------|-----|----------|
| **Free Dictionary API** | `api.dictionaryapi.dev/api/v2/entries/en/{word}` | Tra từ điển chính |

### Text-to-Speech (TTS)
- **API:** `Web Speech API` (built-in browser)
- **Cách dùng:** `SpeechSynthesisUtterance` với `lang='en-US'`, `rate=0.85`
- **Nơi dùng:** Nút phát âm trong translate popup, từ điển, pronunciation page

---

## 🎨 6. Icons & Fonts

### Icons: Lucide Icons
- **CDN:** `https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js`
- **Phiên bản:** Pin `0.460.0` (không dùng `@latest`)
- **Cách dùng:** `<i data-lucide="icon-name"></i>` + gọi `lucide.createIcons()`
- **Icons được dùng:**
  - Navigation: `home`, `book-open`, `languages`, `search`, `menu`, `more-horizontal`
  - Grammar: `pen-tool`, `git-branch`
  - Vocabulary: `library`, `book`, `brain`
  - Skills: `headphones`, `mic`, `pen`, `eye`
  - IELTS: `trophy`, `target`, `award`
  - Practice: `zap`, `repeat`, `bar-chart`
  - Gamification: `sprout`, `flame`, `crown`, `shield`, `star`, `check-circle`

### Module Card Icons (6 nhóm màu gradient)
| Category | Màu gradient | Ví dụ modules |
|----------|-------------|---------------|
| Grammar | `#64d8a5 → #4ac7a0` (xanh lá) | Grammar, Grammar Advanced |
| Vocabulary | `#a78bfa → #8b6ef6` (tím) | Vocabulary, Synonyms, AWL |
| Skills | `#f4845f → #e66b4a` (cam) | Skills, Pronunciation, Listening |
| IELTS | `#f0c27a → #e0b06a` (vàng) | IELTS Guide, Writing Band 9 |
| Dictionary | `#6bcb77 → #5ab868` (xanh) | Dictionary, Everyday, IELTS Dict |
| Practice | `#ff8a80 → #f07070` (đỏ nhạt) | Quiz, Spaced Repetition, Progress |

### Fonts: Google Fonts
| Font | Dùng cho | Đặc điểm |
|------|----------|----------|
| **Fraunces** | Headings, tiêu đề, tên từ | Serif, elegant, variable |
| **DM Sans** | Body text, UI, buttons | Sans-serif, clean, modern |

### Cách load fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## 🎮 7. Gamification System (`gamification.js`)

### XP & Levels
| Level | Tên | XP cần | Icon |
|-------|-----|--------|------|
| 0 | Người mới | 0 | `sprout` |
| 1 | Học viên | 100 | `book-open` |
| 2 | Trung cấp | 500 | `flame` |
| 3 | Nâng cao | 1500 | `award` |
| 4 | Chuyên gia | 3000 | `crown` |
| 5 | Bậc thầy | 6000 | `trophy` |

### Badges (Huy chương)
| ID | Tên | Điều kiện |
|----|-----|-----------|
| `first_lesson` | Bài đầu tiên | 1 lesson completed |
| `streak_3` | 3 ngày liên tiếp | Streak ≥ 3 |
| `streak_7` | Tuần lễ vàng | Streak ≥ 7 |
| `streak_30` | Tháng kiên trì | Streak ≥ 30 |
| `vocab_50` | 50 từ vựng | 50 words learned |
| `vocab_200` | 200 từ vựng | 200 words learned |
| `quiz_10` | 10 quiz | 10 quizzes done |
| `quiz_50` | 50 quiz | 50 quizzes done |
| `xp_1000` | 1000 XP | Total XP ≥ 1000 |
| `xp_5000` | 5000 XP | Total XP ≥ 5000 |

### Daily Challenge
- 30 từ vựng IELTS luân phiên theo ngày
- Mỗi từ có: English, Vietnamese, Example sentence

### Sound Effects
- Dùng `AudioContext` (Web Audio API) — không cần file âm thanh
- 4 sounds: `correct`, `wrong`, `levelup`, `badge`

### Confetti Animation
- Canvas-based, 80 particles
- Trigger khi: Level up, Badge mới

### localStorage keys
- `ee_game` — JSON object chứa:
  - `totalXP`, `todayXP`, `dailyGoal`, `streak`, `lastDate`
  - `lessonsCompleted`, `wordsLearned`, `quizCompleted`
  - `badges[]`, `todayChallengeDone`

---

## 📱 8. Responsive Design

### Breakpoints
| Breakpoint | Thiết bị | Thay đổi chính |
|------------|----------|----------------|
| `≤ 900px` | Mobile/Tablet | Show bottom nav, hide desktop nav items, stack layouts |
| `≤ 600px` | Small mobile | Smaller fonts, compact cards |
| `> 900px` | Desktop | Show full nav, sidebar, multi-column layouts |

### Mobile-specific features
- Bottom Navigation (floating, glassmorphism)
- More Drawer (slide-up)
- Hamburger menu
- Touch-optimized spacing (44px min touch targets)
- XP bar auto-hide after 4s

### Desktop-specific features
- Multi-column layouts (2-3 columns)
- Sidebar navigation (on content-heavy pages)
- Hover effects
- XP bar always visible below nav

---

## ✨ 9. Tính năng đặc biệt

### Select-to-Translate (Bôi đen dịch)
- **Desktop:** `mouseup` event → 150ms debounce
- **Mobile:** `touchend` + `selectionchange` → 400-700ms debounce
- **Max length:** 5000 ký tự (hỗ trợ cả bài essay IELTS dài)
- **Chunk translation:** Đoạn dài >500 chars tự chia nhỏ theo câu, dịch song song, ghép kết quả
- **Single word:** Dictionary API + MyMemory (parallel) → IPA + word type + Vietnamese ONLY
- **Phrase/Paragraph:** MyMemory only → Vietnamese translation, hiện số câu + số ký tự
- **Popup:** Glassmorphism, scrollable (max-height 60vh), max-width 420px, nút TTS (≤300 chars)
- **Vietnamese text filter:** Tự skip text tiếng Việt (detect dấu)
- **Local fallback dictionary:** 120+ từ phổ biến → dịch NGAY không cần mạng
- **Fallback chain:** Local dict → MyMemory API (viChars check) → matches array → error

### View Transitions (Page Transitions)
- **API:** CSS View Transitions (native browser)
- **Cách hoạt động:** Intercept click → add exit class → navigate after animation
- **Fallback:** Direct navigate nếu browser không support

### Autocomplete (Dictionary page)
- **Data:** `dict-data.js` (~2000+ từ)
- **Cách hoạt động:** Filter on keyup → show dropdown suggestions

### Theme Persistence
- Lưu `localStorage('ee_theme')` 
- Apply ngay khi load (trước DOMContentLoaded để tránh flash)

---

## 🐛 10. Known Issues & Lưu ý quan trọng

### 7 Lỗi phải tránh (đã từng gặp)
1. **`overflow-x: clip/hidden` trên `<html>`** → Phá vỡ dropdown navigation
2. **Duplicate nav HTML** → Khi inject + copy paste → double nav bars
3. **CSS rules ngoài `@media`** → Bottom nav styles leak ra desktop
4. **`transform` trên `body`** → Phá vỡ `position:fixed` (animation issue)
5. **Quote escaping trong template literals** → JS crash khi có nested quotes
6. **Thiếu closing `</div>`** → Layout vỡ
7. **Thiếu `lucide.createIcons()`** → Icons không render

### Performance notes
- Lucide pinned `0.460.0` → stable CDN cache
- Cache-busting `?v=N` trên CSS/JS references
- Tránh `!important` — hiện chỉ còn 1 instance trong common.js

---

## 📊 11. localStorage Data Map

| Key | Dùng bởi | Nội dung |
|-----|----------|----------|
| `ee_theme` | `theme.js` | Theme ID string (e.g. 'aura', 'midnight') |
| `ee_game` | `gamification.js` | JSON: XP, streak, badges, daily challenge |
| `ee_sr_*` | `spaced-repetition.html` | Spaced repetition card data |
| `ee_progress_*` | `progress.html` | Module completion data |
| `ee_vocab_*` | `vocabulary.html` | Saved vocabulary lists |


## 🗺️ 12. Roadmap (5 Phases)

### Phase 1.5: Nợ kỹ thuật

| # | Vấn đề | Mức độ | Trạng thái |
|---|--------|--------|-----------|
| 1 | **CSS trùng lặp 31 file** | Nghiêm trọng | ✅ Fix bằng `nav.js` — tiết kiệm 349KB |
| 2 | **Nav copy-paste 31 file** | Nghiêm trọng | ✅ Fix bằng `nav.js` — thêm trang mới chỉ sửa 1 file |
| 3 | **!important wars** — 40+ lần `!important` | Trung bình | Chưa — ưu tiên thấp |
| 4 | **Inline `<style>` quá lớn** | Nhẹ | Chưa — ưu tiên thấp |

> **`nav.js?v=1`** — Single Source of Truth cho navigation. Thêm trang mới: chỉ thêm 1 dòng vào `NAV_ITEMS` trong `nav.js`.
>
> ⚠️ **LƯU Ý:** Sửa thanh nav trên máy tính (desktop) = sửa luôn thanh nav trên điện thoại (mobile). Cả hai đều được generate từ cùng 1 file `nav.js`. Desktop dùng `buildDesktopNav()` (dropdown), mobile dùng `buildMobileMenu()` (full-screen overlay). Nếu thêm/xóa/sửa link trong `NAV_ITEMS` → cả desktop lẫn mobile đều thay đổi.
>
> ⚠️ **QUAN TRỌNG:** Mọi file HTML mới **BẮT BUỘC** phải có `<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>` trong `<head>`, nếu không icon nav + breadcrumb sẽ không hiển thị.

#### ✨ Smart Nav Features (v2 — 26/04/2026)
| # | Tính năng | Mô tả |
|---|-----------|-------|
| 1 | **Active page highlight** | Tự nhận biết trang hiện tại → highlight link + group header bằng accent color, thêm dot indicator |
| 2 | **Mobile accordion** | Menu mobile phân nhóm với accordion (mở/đóng nhóm), group chứa trang hiện tại tự mở sẵn |
| 3 | **Auto-hide on scroll** | Cuộn xuống → nav tự ẩn (tiết kiệm màn hình), cuộn lên → nav hiện lại, smooth cubic-bezier transition |
| 4 | **Close on outside click** | Click bên ngoài dropdown → tự đóng dropdown |
| 5 | **Body scroll lock** | Khi mở mobile menu → khóa cuộn body, đóng → mở lại |

### Phase 2: Web Polish (✅ HOÀN THÀNH)
| # | Feature | Mô tả | Trạng thái |
|---|---------|-------|-----------|
| 1 | Reading Comprehension | Bài đọc hiểu có câu hỏi tương tác | ✅ Xong |
| 2 | Word Formation | Cấu tạo từ (prefix, suffix, root) | ✅ Xong |
| 3 | Daily Challenge Page | Quiz hàng ngày, streak reward | ✅ Xong |
| 4 | Gerund vs Infinitive | Module riêng biệt | ✅ Xong |
| 5 | Pronunciation Recording | Ghi âm + so sánh phát âm | ✅ Đã có trong pronunciation.html |
| 6 | Loại bỏ mọi Emoji | Thay toàn bộ bằng Lucide Icons | ✅ Xong (88→0) |
| 7 | Thêm themes mới | Mở rộng từ 12 → 16 themes | ✅ Xong (16 themes) |
| 8 | Smooth transitions | Page transitions mượt như native iOS | ✅ Xong (34 files) |
| 9 | PWA (installable + offline) | manifest.json + sw.js + icons | ✅ Xong |
| 10 | SEO / OpenGraph | Meta tags, Schema.org | ✅ Xong (34/34 files) |
| 11 | Preposition Combinations | depend on, interested in, good at... | ✅ Xong |
| 12 | TOEIC Module | Riêng cho luyện thi TOEIC | ✅ Xong |
| 13 | Deploy cập nhật GitHub Pages | User tự commit & push | ✅ User quản lý |
| 14 | Google Analytics | GA4 tag đã thêm 36 files — cần thay `G-XXXXXXXXXX` bằng ID thật | ✅ Xong (cần GA ID) |
| 15 | Loading states / Skeleton | Hiển thị khi mạng chậm thay vì trắng | ✅ Xong (36 files) |
| 16 | 404 page | Trang lỗi thân thiện khi vào sai URL | ✅ Xong |
| 17 | Favicon + Web Manifest | Icon bookmark, share link đẹp | ✅ Xong |
| 18 | Performance (lazy load, minify) | Tối ưu tốc độ tải trang | ✅ Xong (37 files) |

> **LƯU Ý:** Web hỗ trợ cả ONLINE lẫn OFFLINE (qua PWA). Khi có mạng → sync data. Khi mất mạng → vẫn dùng được nội dung đã tải.

> **CHIẾN LƯỢC SẢN PHẨM:**
> - Build cả **WEB** lẫn **APP** — chạy song song, cùng nội dung
> - **Web** = truy cập nhanh trên browser, SEO, chia sẻ link, thu hút user
> - **App (React Native Expo)** = trải nghiệm native mượt mà, push notification, in-app purchase, thu nhập chính
> - Web hoàn thiện trước → dùng làm blueprint chuyển sang app
> - Cùng data/logic, khác UI layer — giống mô hình Duolingo, Cake, Elsa

### Phase 3: Tiếng Anh chuyên ngành (✅ HOÀN THÀNH)
| # | Feature | Mô tả | Trạng thái |
|---|---------|-------|-----------|
| 13 | Business English | Từ vựng, email mẫu, hội thoại, quiz | ✅ Xong |
| 14 | IT English | Thuật ngữ lập trình, DevOps, phỏng vấn tech, quiz | ✅ Xong |
| 15 | Medical English | Cơ thể, bệnh viện, triệu chứng, hội thoại, quiz | ✅ Xong |
| 16 | Legal English | Hợp đồng, tòa án, sở hữu trí tuệ, cụm từ pháp lý, quiz | ✅ Xong |
| 17 | Global Search | Tìm kiếm toàn site (Ctrl+K), 35 trang, keyboard nav | ✅ Xong |

### Phase 4: React Native Expo + Backend
| # | Feature | Mô tả |
|---|---------|-------|
| 18 | Chuyển sang React Native Expo | Build app iOS/Android mượt như native |
| 19 | Auth (Đăng nhập) | Firebase/Supabase Auth |
| 20 | Cloud Sync | Lưu tiến độ online |
| 21 | AI Chatbot | GPT API hỏi đáp tiếng Anh |
| 22 | Push Notifications | Nhắc nhở học hàng ngày |
| 23 | Leaderboard | Bảng xếp hạng cộng đồng |
| 24 | Bảo mật | Encryption, rate limiting, auth guards |

### Phase 5: Multi-language Empire
| # | Feature | Mô tả |
|---|---------|-------|
| 25 | Tiếng Trung (Mandarin) | Dùng form tiếng Anh → adapt |
| 26 | Tiếng Hàn (Korean) | Hangul, grammar, vocab, TOPIK |
| 27 | Tiếng Nhật (Japanese) | Hiragana/Katakana, Kanji, JLPT |
| 28 | Hệ thống chung đa ngôn ngữ | Shared UI framework, language switcher |

---


## 🔧 13. Hướng dẫn thêm trang mới

### Bước 1: Tạo file HTML mới
```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tên trang — EasyEnglish</title>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Theme (PHẢI load trước CSS để tránh flash) -->
  <script src="theme.js?v=N"></script>
  
  <!-- Shared CSS -->
  <link rel="stylesheet" href="style.css?v=N">
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
</head>
<body>
  <!-- NAV (copy nav structure) -->
  <nav>...</nav>
  
  <!-- CONTENT -->
  <main>
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <a href="index.html">Trang chủ</a> / <span>Tên trang</span>
    </div>
    
    <!-- Your content here -->
  </main>
  
  <!-- Scripts (cuối body) -->
  <script src="common.js?v=N"></script>
  <script src="gamification.js?v=N"></script>
  <script>lucide.createIcons();</script>
</body>
</html>
```

### Bước 2: Thêm vào navigation
- **Bottom Nav:** Sửa `bnItems` object trong `common.js` (nếu cần)
- **More Drawer:** Sửa `drawerItems` object trong `common.js`
- **Top Nav:** Sửa `<nav>` trong file HTML
- **Homepage:** Thêm card vào `index.html` module grid

### Bước 3: Cache-bust
```bash
# Bump version number khi sửa CSS/JS chung
sed -i '' 's/common.js?v=7/common.js?v=8/g' *.html
```

---

## 📝 14. Conventions & Coding Style

### HTML
- Semantic tags: `<main>`, `<section>`, `<article>`, `<nav>`
- Mỗi trang có 1 `<h1>` duy nhất
- IDs unique, descriptive (cho testing)
- Mobile-first media queries

### CSS
- CSS Variables cho theming (define trong `theme.js`)
- Shared styles trong `style.css`
- Page-specific styles trong `<style>` block của mỗi file
- **TRÁNH `!important`** — dùng specificity thay thế
- z-index scale:
  - `100-199`: Bottom nav, XP bar
  - `200-999`: Dropdowns, drawers
  - `1000-9999`: Modals, overlays
  - `99998-99999`: Toast, confetti, translate popup

### JavaScript
- Vanilla JS thuần, không framework
- IIFE `(function(){...})()` cho encapsulation
- `var` thay vì `let/const` (IE11 compat — tùy chọn)
- Event delegation khi possible
- `localStorage` cho persistence
- `setTimeout` với named functions cho readability

---

## 🔗 15. External Dependencies

| Dependency | Version | CDN URL | Mục đích |
|------------|---------|---------|----------|
| Lucide Icons | 0.460.0 | `unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js` | SVG Icons |
| Google Fonts | - | `fonts.googleapis.com/css2?family=Fraunces...&family=DM+Sans...` | Typography |
| MyMemory API | - | `api.mymemory.translated.net` | Dịch EN→VI |
| Dictionary API | - | `api.dictionaryapi.dev` | Tra từ điển |
| Web Speech API | Browser built-in | - | Text-to-Speech |
| Web Audio API | Browser built-in | - | Sound effects |

> **Lưu ý:** Ngoài Lucide CDN và Google Fonts, toàn bộ site hoạt động offline (Dictionary API và Translation cần internet).

---

## QUY TẮC BẮT BUỘC CHO AI

1. **PHẢI VIẾT CÓ DẤU TIẾNG VIỆT** trong mọi nội dung hiển thị cho user (HTML, UI text, button, heading, mô tả). Ví dụ: "Bắt đầu Quiz" KHÔNG PHẢI "Bat dau Quiz". Đây là web cho người Việt, viết không dấu = KHÔNG CHẤP NHẬN.
2. **KHÔNG dùng emoji** — chỉ dùng Lucide SVG Icons.
3. **Mọi trang mới** phải có nội dung thật, đầy đủ, chất lượng cao — không placeholder.
4. **Mỗi module phải TƯƠNG TÁC** — không chỉ để đọc. Phải có ít nhất 1 trong: Quiz, Flashcard, Fill-in-the-blank, Drag & Drop, Matching, hoặc bài tập thực hành. User phải thực sự HỌC được, không chỉ đọc lý thuyết.
5. **Version hiện tại:** `common.js?v=13`, `style.css?v=3`, `theme.js?v=3`, `gamification.js?v=3`
6. **Mỗi khi thay đổi** common.js/theme.js/style.css → PHẢI bump version trong TẤT CẢ files HTML.
7. **Khi thêm file mới** → PHẢI đồng bộ TẤT CẢ file theo checklist dưới:

### Checklist khi thêm trang mới

Mỗi khi thêm 1 trang HTML mới, PHẢI làm TẤT CẢ các bước sau:

- [ ] Thêm link vào **desktop nav dropdown** (trong `<nav>` section) của TẤT CẢ 30+ files HTML
- [ ] Thêm link vào **mobile menu** (`#mobileMenu` section) của TẤT CẢ 30+ files HTML
- [ ] Thêm vào **sitemap.xml**
- [ ] Thêm vào **PROJECT_DOCS.md** (danh sách files + roadmap)
- [ ] Thêm vào **index.html** module grid (nếu là module chính)
- [ ] Đảm bảo nav HTML **giống hệt nhau** trên mọi file (dùng sed/grep để đồng bộ)

> **QUAN TRỌNG:** Nav desktop và mobile menu phải luôn giống nhau trên TẤT CẢ files. Nếu 1 file thiếu link → user không thể navigate đến trang mới. Dùng `grep` để verify sau khi update.

---

*Đây là tài liệu sống — cập nhật mỗi khi có thay đổi lớn.*
