# EasyEnglish — Context File cho Claude

> Đọc file này trước khi làm bất cứ việc gì liên quan đến project EasyEnglish.
> Cập nhật lần cuối: 2026-04-29

---

## 1. Tổng quan sản phẩm

**Tên:** EasyEnglish  
**URL hiện tại:** https://ifywnx.github.io/english/  
**Mục tiêu:** Nền tảng học tiếng Anh toàn diện cho người Việt — ăn đứt Duolingo, Cake, ELSA về chiều sâu nội dung, UX và tính năng AI  
**Tầm nhìn dài hạn:** Đa ngôn ngữ (Anh → Trung → Hàn → Nhật), tiếng Anh chuyên ngành (IT, Y tế, Luật, Kinh doanh)

### Trạng thái hiện tại
- **Phase 1** — Web tĩnh HTML/CSS/JS thuần, đang chạy trên GitHub Pages
- 60 files tổng (42 HTML + 6 JS + 1 CSS + 2 MD + 9 assets/config), ~1.6MB
- Đã có: 12 themes, gamification system (XP, streak, badges), PWA manifest, Service Worker, offline-first
- **Nợ kỹ thuật:** streak/XP hiển thị 0, bôi đen dịch chưa ổn định, nav chưa đồng bộ 100%

---

## 2. Chủ sở hữu

- **Tên:** An, 20 tuổi, Hà Nội
- **Background:** Sinh viên IT năm 2, đang tự học fullstack (đang ở giai đoạn JS)
- **Phong cách học:** Học bằng cách làm trước, giải thích sau
- **Mục tiêu:** Sản phẩm vừa là portfolio mạnh, vừa kiếm được tiền, vừa thật sự tốt cho user
- **Công cụ:** MacBook, Cursor IDE, VS Code, GitHub Pages, Claude Max 5x

---

## 3. Kiến trúc kỹ thuật hiện tại

### Core Files

| File | Vai trò | Version |
|------|---------|---------|
| `style.css` | CSS chung toàn site | `?v=4` |
| `common.js` | Nav, drawer, search, bôi đen dịch, page transitions | `?v=14` |
| `theme.js` | 12 themes, CSS variables | `?v=3` |
| `gamification.js` | XP, streak, badges, confetti, sound | `?v=3` |
| `dict-data.js` | ~2000+ từ offline cho autocomplete | — |
| `nav.js` | Navigation source | — |

### Design System
- **Font:** Heading = `Fraunces`, Body/UI = `DM Sans`
- **Icons:** Lucide SVG Icons v0.460.0 (KHÔNG dùng emoji)
- **Themes:** 12 themes (6 dark + 6 light), CSS Variables
- **z-index scale:** 100-199 (bottom nav), 200-999 (drawers), 1000-9999 (modals), 99998-99999 (toast/translate popup)

### External Dependencies

| Dependency | Mục đích |
|------------|---------|
| Lucide Icons 0.460.0 | SVG Icons |
| Google Fonts (Fraunces + DM Sans) | Typography |
| MyMemory API | Dịch EN→VI (đang dùng, giới hạn 1000 req/ngày) |
| Free Dictionary API | Tra từ điển |
| Web Speech API | TTS (browser built-in) |

### Hosting & Deploy
- GitHub Pages (miễn phí)
- Chưa có custom domain (đang dùng github.io)
- Chưa có backend (toàn bộ là static)

---

## 4. Nội dung hiện có (42 trang HTML)

### Ngữ pháp
`grammar.html`, `grammar-advanced.html`, `gerund-infinitive.html`, `prepositions.html`, `word-formation.html`

### Từ vựng
`vocabulary.html` (430+ từ, 20 chủ đề), `synonyms.html`, `collocations.html`, `idioms.html` (77+ idioms), `confusing-words.html`, `phrasal-verbs.html`, `academic-words.html` (AWL 570), `irregular-verbs.html`, `linking-words.html`

### IELTS
`ielts.html`, `ielts-writing-band9.html`, `ielts-speaking-topics.html`, `mock-test.html`, `paraphrasing.html`

### Từ điển
`dictionary.html`, `dictionary-everyday.html`, `dictionary-everyday-2.html`, `dictionary-ielts.html`, `dictionary-ielts-2.html`

### Kỹ năng
`skills.html`, `reading-comprehension.html`, `pronunciation.html`, `listening.html`, `conversation.html`

### Luyện tập
`quiz.html`, `daily-challenge.html`, `spaced-repetition.html`, `writing-checker.html`, `progress.html`, `notebook.html`

### Chuyên ngành
`business-english.html`, `it-english.html`, `medical-english.html`, `legal-english.html`, `toeic.html`

### Khác
`index.html`, `404.html`, `speaking-practice.html`, `listening-transcript.html`, `writing-task1.html`, `reading-skills.html`, `writing-task2.html`, `daily-challenge.html`

---

## 5. Roadmap 5 Phase

### Phase 1 — Hoàn thiện Web (Tháng 1) ← ĐANG Ở ĐÂY
**Ưu tiên cao nhất:**
- [ ] Fix streak/XP system (hiện hiển thị 0, logic chưa hoạt động)
- [ ] Fix bôi đen dịch (chưa ổn định, cần local-first fallback)
- [ ] Fix "Mẹo học hôm nay" loading mãi
- [ ] Đồng bộ nav trên tất cả 42 files
- [ ] Keyboard shortcuts (làm bài, lật flashcard, chuyển câu)
- [ ] Font switcher (Fraunces, DM Sans, Inter, Poppins, Manrope)
- [ ] Toggle ngôn ngữ giao diện VI/EN
- [ ] Flashcard tự động từ từ đã lưu trong notebook
- [ ] Bôi đen nâng cao: đồng nghĩa, lưu ý, ngữ cảnh dùng
- [ ] Responsive mobile hoàn chỉnh (test Safari iOS)
- [ ] PWA installable chuẩn
- [ ] Custom domain (bỏ github.io)
- [ ] SEO: meta tags, sitemap, Open Graph

**Tính năng học:**
- [ ] Quiz đục lỗ chọn từ
- [ ] Shadowing (luyện phát âm theo giọng native)
- [ ] Ghi note học từ, gắn link video với sub + dịch inline
- [ ] Mind map tương tác cho lộ trình học
- [ ] Chat widget để user góp ý
- [ ] Anki export (.apkg)

### Phase 2 — Tính năng Nâng cao (Tháng 1-2)
- [ ] Gõ VI→EN và EN→VI nhiều từ cùng lúc, tạo bộ từ vựng
- [ ] Hình ảnh minh họa khớp với từ vựng (Unsplash API)
- [ ] Tạo file in (PDF/Word): từ vựng + nghĩa + IPA theo giáo trình
- [ ] Upload video → tự động tạo subtitle + dịch (Whisper API)
- [ ] Đề thi mock test có chấm điểm tự động
- [ ] Giọng đọc trend (ElevenLabs hoặc Google TTS Neural2)

### Phase 3 — AI + Backend (Tháng 2)
- [ ] AI Chatbot luyện hội thoại (Claude API Haiku — rẻ nhất)
- [ ] AI giải thích ngữ pháp theo câu user nhập
- [ ] AI Writing Coach — chấm bài IELTS Writing theo band
- [ ] Cloud sync (đăng nhập, đồng bộ web + app)
- [ ] Leaderboard (streak, XP)
- [ ] Push notification nhắc học

### Phase 4 — App (Sau khi web có revenue) ← CHƯA LÀM
- [ ] Dùng revenue từ web để đầu tư app, không bỏ tiền túi
- [ ] Expo React Native (iOS + Android cùng codebase)
- [ ] Submit Google Play ($25, Android trước)
- [ ] Submit App Store ($99/năm, iOS sau)
- [ ] Freemium: cơ bản miễn phí, IELTS + AI trả phí
- [ ] ASO: screenshots, mô tả chuẩn

### Phase 5 — Mở rộng (Sau tháng 3)
- [ ] Tiếng Trung, Hàn, Nhật (dựa trên form tiếng Anh)
- [ ] Tiếng Anh chuyên ngành sâu hơn

---

## 6. Stack API kế hoạch

| API | Mục đích | Chi phí |
|-----|---------|---------|
| **Merriam-Webster API** | Từ điển uy tín, thay Oxford | $0 miễn phí |
| **Free Dictionary API** | Tra từ cơ bản | $0 |
| **Google TTS Neural2** | Giọng đọc chuẩn | $0 (1M ký tự/tháng miễn phí) |
| **ElevenLabs** | Giọng trend, shadowing | $5/tháng (30K ký tự) |
| **DeepL API** | Dịch chất lượng cao | $6.99/tháng |
| **Claude API Haiku** | AI Chatbot (rẻ nhất) | ~$0.25/1M token |
| **OpenAI Whisper** | Video → subtitle | $0.006/phút |
| **Unsplash API** | Hình ảnh minh họa từ vựng | $0 |

---

## 7. Chi phí giai đoạn 1 — Web only (2 tháng)

| Khoản | Chi phí |
|-------|---------|
| Claude Max 5x × 1 tháng | $100 |
| Claude Pro × 2 tháng | $40 |
| Domain (.net hoặc .com) | $15 |
| Claude API Haiku (chatbot) | ~$20 |
| ElevenLabs | ~$10 |
| DeepL | ~$14 |
| Whisper API | ~$6 |
| **Tổng** | **~$205 ≈ 5,200,000 VND** |

> App làm sau khi web có revenue — không bỏ tiền túi cho store.

---

## 8. Chiến lược cạnh tranh

**Đối thủ:** Duolingo, Cake, ELSA Speak, IELTS Prep apps

**Điểm yếu của đối thủ mà EasyEnglish khai thác:**
- Nội dung gamification nhưng thiếu chiều sâu ngữ pháp → EasyEnglish có grammar hệ thống + giải thích tiếng Việt
- Không có IELTS thật sự → EasyEnglish có mock test + AI chấm Writing
- Không offline → EasyEnglish offline-first hoàn chỉnh
- Không có từ điển xịn tích hợp → EasyEnglish có dictionary + bôi đen + collocations
- Interface tiếng Anh → EasyEnglish 100% Việt hóa
- Subscription đắt → EasyEnglish freemium hào phóng hơn

**3 Killer Features độc quyền (chọn 1 làm trước):**
1. **AI Writing Coach** — viết bài IELTS, AI chấm điểm theo band cụ thể + giải thích
2. **Smart Shadowing** — nghe giọng native, record lại, AI so sánh phát âm
3. **Video → Học** — paste link YouTube, app tự tạo flashcard + bài tập

---

## 9. Quy tắc bắt buộc khi code

1. **PHẢI viết có dấu tiếng Việt** trong mọi nội dung UI — "Bắt đầu Quiz" KHÔNG PHẢI "Bat dau Quiz"
2. **KHÔNG dùng emoji** — chỉ dùng Lucide SVG Icons
3. **Mọi trang phải có nội dung thật** — không placeholder
4. **Mỗi module phải tương tác** — ít nhất 1 trong: Quiz, Flashcard, Fill-in-the-blank, Drag & Drop
5. **Version hiện tại:** `common.js?v=14`, `style.css?v=4`, `theme.js?v=3`, `gamification.js?v=3`
6. **Khi sửa common.js/theme.js/style.css** → PHẢI bump version trong TẤT CẢ file HTML
7. **Khi thêm trang mới** → đồng bộ nav desktop + mobile + sitemap.xml + index.html + PROJECT_DOCS.md
8. **Mobile-first** — test trên Safari iOS, không chỉ Chrome DevTools
9. **Offline-first** — data lưu localStorage/IndexedDB, hoạt động không cần mạng
10. **Không nợ kỹ thuật** — fix bug trước khi thêm tính năng mới

### Checklist thêm trang mới
- [ ] Thêm link vào desktop nav dropdown (tất cả 42 files HTML)
- [ ] Thêm link vào mobile menu (tất cả 42 files HTML)
- [ ] Thêm vào sitemap.xml
- [ ] Thêm vào PROJECT_DOCS.md
- [ ] Thêm vào index.html module grid (nếu là module chính)

---

## 10. Monetization

**Tháng 1-2:** Miễn phí hoàn toàn — build user base, thu thập review

**Tháng 3+:**
- **Freemium:** Nội dung cơ bản miễn phí, IELTS + AI chatbot giới hạn
- **AI Chat:** 20 tin/ngày (free) vs unlimited (premium)
- **In-app purchase:** Mở khóa mock test, lộ trình cá nhân hóa
- **Donation:** Nút "Ủng hộ tác giả" phù hợp user Việt

---

## 11. Hướng dẫn cho Claude khi bắt đầu session mới

Khi An nói "đọc context file" hoặc "bắt đầu làm EasyEnglish", Claude cần:

1. **Đọc file này** — hiểu toàn bộ context
2. **Hỏi An đang ở đâu trong roadmap** — Phase nào, task nào tiếp theo
3. **Hỏi tool đang dùng** — Cursor hay Claude.ai chat
4. **Ưu tiên fix bugs trước** — streak, bôi đen dịch là quan trọng nhất
5. **Không propose lại những thứ đã quyết** — stack API, design system, font đã chốt
6. **Nhắc An test trên mobile thật** sau mỗi thay đổi lớn

### Lệnh bắt đầu nhanh cho Cursor
```bash
# Xem cấu trúc project
ls -la

# Tìm bug streak
grep -r "streak" *.js

# Bump version sau khi sửa common.js
sed -i '' 's/common.js?v=14/common.js?v=15/g' *.html
```

---

## 12. Dự báo doanh thu

**Giá Premium:** 79K VND/tháng hoặc 599K VND/năm

| Mốc | User Premium | Doanh thu/tháng | Trạng thái |
|-----|-------------|-----------------|------------|
| Tháng 1-2 | 0 | $0 | Miễn phí hoàn toàn, build user base |
| Tháng 3 | 50 | ~4 triệu VND | Hoà vốn chi phí API + hosting |
| Tháng 6 | 200 | ~16 triệu VND | Bắt đầu có lời thật |
| Năm 1 | 500 | ~40 triệu VND | Full-time được |

**Chi phí API/user Premium/tháng:** ~23K VND  
**Margin tại 500 user:** ~70% profit

---

*File này là tài liệu sống — cập nhật sau mỗi session làm việc quan trọng.*
