# EasyEnglish — Tính Năng Bổ Sung & Ghi Chú Kỹ Thuật

> Mục đích: Ghi lại toàn bộ tính năng MỚI chưa có trong PROJECT_DOCS.md.
> Cập nhật: 2026-04-26

---

## 1. Tính Năng Học Tập Mới

### Word Notebook — Sổ Tay Từ Vựng Cá Nhân
User bôi đen từ bất kỳ trên toàn app → bấm "Lưu từ này" trong translate popup → vào trang notebook.html xem lại toàn bộ từ đã lưu, lọc theo ngày hoặc chủ đề, ôn lại bằng flashcard. Khác với spaced-repetition.html hiện tại vì bộ từ là do chính user tự thu thập, không phải bộ từ cố định. Lưu trữ bằng localStorage key ee_notebook.

### Sentence Builder — Sắp Xếp Câu
Cho sẵn 5-7 từ đã bị xáo trộn, user kéo thả sắp xếp lại thành câu đúng. Tập trung vào grammar patterns như word order và cấu trúc câu. Có nút hint ẩn/hiện gợi ý. Tích hợp XP khi hoàn thành đúng.

### Error Correction Quiz
Hiện một câu có lỗi sẵn, user tìm phần sai rồi chọn cách sửa đúng. Thực tế hơn multiple choice thông thường vì đúng cách người ta học viết. Phù hợp luyện IELTS Writing. Nội dung: 100+ câu sai thường gặp của người Việt học tiếng Anh.

### Cloze Test Generator
User paste đoạn văn bất kỳ vào → app tự động che random từ → thành bài điền từ tương tác. Có thể tùy chỉnh che loại từ nào: danh từ, động từ, tính từ, hoặc ngẫu nhiên. Xử lý hoàn toàn phía client, không cần backend.

### Minimal Pair Trainer — Luyện Nghe Phân Biệt Âm
Nghe audio phát âm 2 từ gần giống nhau như ship/sheep hay bit/beat → user chọn từ vừa nghe. Dùng Web Speech API có sẵn trong trình duyệt. Tự động track tỉ lệ đúng sai từng cặp âm để chỉ ra điểm yếu phát âm. Trang pronunciation.html đã có lý thuyết nhưng chưa có luyện tập nghe thật sự.

### Reading Timer + Speed Test
Đọc đoạn văn có đồng hồ đếm ngược → trả lời câu hỏi comprehension → hiện kết quả WPM (words per minute) và so sánh với mức trung bình. Phù hợp luyện IELTS Reading vì bị giới hạn thời gian. Có bộ bài đọc theo cấp độ từ A2 đến C1.

### AI Writing Checker — Nâng Cấp
Trang writing-checker.html hiện chỉ đếm từ và grammar check cơ bản. Nâng cấp bằng Anthropic API để nhận feedback thật sự: ước tính band score IELTS, chỉ ra lỗi grammar từng câu, gợi ý từ nâng cao hơn, nhận xét cấu trúc bài về coherence và cohesion. Giới hạn free 5 lần mỗi ngày, Premium không giới hạn.

### AI Roleplay — Nhập Vai Tình Huống
AI đóng vai người trong tình huống cụ thể, user phải xử lý bằng tiếng Anh thật. Ví dụ: phỏng vấn xin việc tại công ty Nhật, khiếu nại với lễ tân khách sạn ở Anh, họp online với đối tác nước ngoài. Sau mỗi cuộc hội thoại AI nhận xét điểm mạnh và điểm yếu. Dùng Anthropic API. Giới hạn free 3 lần mỗi ngày.

### Collocations Checker — Nâng Cấp
Trang collocations.html hiện chỉ list tĩnh. Nâng cấp: user gõ vào "make a decision" hay "do a decision" → app chỉ ra cái nào đúng và tại sao, kèm gợi ý collocations liên quan. Database 500+ collocations phổ biến.

### Daily Writing Prompt
Mỗi ngày 1 chủ đề viết, user viết 50-200 từ, submit và cộng đồng vote bài hay nhất. Chủ đề xoay vòng 365 ngày không lặp. Giai đoạn đầu không cần backend: lưu localStorage, hiện bài của mình. Khi có backend: hiện bài cộng đồng, vote, comment.

### Daily Idiom Challenge — Kiểu Wordle
Mỗi ngày 1 idiom hoặc từ mới, user đoán nghĩa và chỉ có 3 lần thử. Khác Daily Challenge hiện tại đang là quiz đơn thuần. Có FOMO effect: bỏ 1 ngày là mất, không thể làm bù. Kết quả có thể share lên mạng xã hội.

---

## 2. Tính Năng Cá Nhân Hóa

### Onboarding — Chọn Mục Tiêu Khi Vào Lần Đầu
Lần đầu vào app user chọn mục tiêu: IELTS 6.0/6.5/7.0/7.5+, giao tiếp cơ bản, tiếng Anh công việc, luyện thi TOEIC. Homepage và gợi ý module thay đổi theo mục tiêu đã chọn. Lưu localStorage key ee_goal.

### Weak Points Tracker
Tự động phát hiện chủ đề user hay sai trong quiz rồi gợi ý ôn lại. Mỗi lần trả lời sai quiz → ghi nhận topic vào localStorage → tính tỉ lệ sai theo từng chủ đề. Homepage hiện banner gợi ý như "Bạn đang yếu phần Câu Điều Kiện — ôn lại không?". Mở rộng thêm field wrongByTopic vào ee_game hiện tại.

### Custom Flashcard Deck
User tự tạo bộ flashcard riêng, không chỉ dùng bộ có sẵn. Thêm từ từ Notebook hoặc nhập tay. Tạo nhiều deck khác nhau như IELTS vocab, IT terms, từ tự học. Hỗ trợ export/import deck dạng file JSON. Lưu localStorage key ee_decks.

### Learning History — Timeline Hoạt Động
Track từng hành động cụ thể theo timeline: "14:23 — Học 5 từ mới", "15:10 — Quiz Grammar 8/10". Khác progress.html hiện tại đang track module completion theo dạng tổng. Lưu localStorage key ee_history, giới hạn 500 entries gần nhất để tránh quá nặng.

### Study Plan — Lộ Trình Học Theo Tuần
Dựa trên mục tiêu, deadline thi, và thời gian học mỗi ngày (15/30/60 phút) → tạo lịch học theo tuần: hôm nay học gì, tuần sau học gì. Nhắc nhở khi lệch lịch. Giai đoạn đầu dùng rule-based đơn giản, sau nâng lên AI-powered.

---

## 3. Mạng Xã Hội & Cộng Đồng

### Profile Công Khai
Trang profile.html hiển thị avatar, tên, bio, mục tiêu học, level, streak hiện tại, streak dài nhất, badges đã đạt, và thống kê tổng. Người khác vào xem được qua URL. Giai đoạn không cần backend: profile được mã hóa vào URL params để share, không cần tài khoản.

### Follow / Bạn Bè
Theo dõi người khác để thấy streak và hoạt động của họ. Giai đoạn đầu không có backend: add bạn bè bằng cách nhập User ID, lưu localStorage, xem profile tĩnh của nhau qua URL. Giai đoạn có backend: real-time feed.

### Leaderboard Mở Rộng
Bổ sung thêm 2 loại leaderboard ngoài global: leaderboard chỉ hiện người đang follow, và leaderboard lọc theo mục tiêu chung như IELTS 7.0 club. Mở rộng từ progress.html hiện tại.

### Club / Nhóm Học
Tạo hoặc tham gia nhóm theo mục tiêu: IELTS Club, IT English Club, Người Mới Bắt Đầu. Leaderboard riêng trong nhóm, feed hoạt động của thành viên, streak chung của cả nhóm. Cần backend.

### Activity Feed
Dòng thời gian hiện hoạt động của người mình follow: ai đạt streak mới, ai hoàn thành mock test, ai học bao nhiêu từ hôm nay. Tạo cảm giác cộng đồng đang học cùng nhau. Cần backend.

### Writing Wall — Cộng Đồng Sửa Bài
User post đoạn văn tiếng Anh 50-500 từ, cộng đồng comment sửa lỗi và gợi ý, like/upvote bài hay. Tính năng italki tính tiền, mình làm free là lợi thế lớn. Cần backend.

### Streak Shield từ Bạn Bè
Nếu quên học 1 ngày, bạn bè có thể tặng 1 shield bảo vệ streak. Mỗi user có tối đa 3 shield mỗi tuần để tặng. Tạo động lực quan tâm lẫn nhau trong cộng đồng.

### Thách Thức Công Khai
Tạo challenge và tag bạn bè: "Tao thách mày đạt 1000 XP tuần này". Có countdown timer công khai, kết quả hiện trên cả 2 profile sau khi hết hạn.

### Share Card — Chia Sẻ Kết Quả
Sau quiz hoặc mock test, tạo ảnh kết quả đẹp để share story. Vẽ bằng Canvas API: điểm số lớn ở giữa, streak, tên, màu theo theme đang dùng, watermark app. Nút tải ảnh PNG. Không cần server, xử lý hoàn toàn phía client.

---

## 4. Habit Loop & Retention

### Smart Notifications
Không phải "Đến giờ học rồi!" nhàm chán mà là thông báo có context thật: "Minh vừa vượt qua streak của bạn — bạn có muốn lấy lại không?", "Bạn sắp mất streak 47 ngày — còn 3 tiếng nữa", "Hôm nay có Word of the Day mới". Dùng Web Push API của PWA, không cần app store.

### Word of the Day
Mỗi ngày 1 từ mới hiện trên homepage: từ + IPA + nghĩa + ví dụ câu + nút phát âm + nút lưu vào Notebook. 365 từ xoay vòng theo ngày. Khác Daily Challenge hiện tại đang là quiz IELTS — Word of the Day là nội dung thụ động, xem nhanh trong 10 giây.

### 3-Minute Mode — Học Siêu Nhanh
Chế độ học chỉ 3 phút, 5 câu quiz ngẫu nhiên từ toàn bộ module, có timer đếm ngược. Phù hợp lúc chờ xe hay giải lao. Không bắt buộc hoàn thành, bỏ giữa chừng vẫn nhận XP tỉ lệ.

### One-Tap Daily Check-in
Vào app bấm 1 nút "Check in hôm nay" → +10 XP → streak được giữ. Ngày bận không học được vẫn không mất streak nếu check-in. Hiện nổi bật trên homepage, dễ thấy ngay khi mở app.

### Streak Milestones Đặc Biệt
Ngày 7, 30, 100, 365 streak có animation riêng toàn màn hình khác với confetti thông thường, thông báo cho toàn bộ bạn bè, unlock theme hoặc badge đặc biệt, và vào Hall of Fame nếu top 10.

### Streak Hall of Fame
Trang riêng hiển thị top 10 streak dài nhất toàn platform: tên, avatar, số ngày. Public, ai cũng xem được. Người trong đó sẽ không bao giờ bỏ app vì mất quá nhiều thứ.

### Seasonal Events
Tết Nguyên Đán: Tết Challenge học 5 từ liên quan tết mỗi ngày trong 7 ngày. Tháng 9: Back to School với bonus XP nhân đôi. Giáng Sinh: 25 Days of English kiểu advent calendar. Tạo lý do để quay lại theo mùa.

### Email Digest Hàng Tuần
Email tự động mỗi cuối tuần: học được bao nhiêu từ, top bao nhiêu phần trăm cộng đồng, streak bao nhiêu ngày. Cần backend và email service như Resend hoặc SendGrid.

---

## 5. Monetization

### Mô Hình Freemium
Bản free đủ dùng với toàn bộ nội dung grammar/vocab/IELTS, streak/XP/badges cơ bản, AI Writing Checker 5 lần mỗi ngày, AI Roleplay 3 lần mỗi ngày, và có banner quảng cáo nhỏ.

Bản Premium khoảng 49.000 đến 99.000 VNĐ mỗi tháng mở thêm: AI không giới hạn, Study Plan AI cá nhân hóa, offline hoàn toàn, xóa quảng cáo, badge Premium để flex trên profile, thêm Streak Shield, thống kê Weak Points chi tiết, và early access tính năng mới.

### Reward Ads
User chủ động chọn xem 30 giây quảng cáo để được thêm lượt dùng AI trong ngày. Không bắt buộc. Dùng Google AdSense trên web và AdMob trên app.

### Marketplace Nội Dung
Giáo viên hoặc creator tạo bộ flashcard hoặc khóa học rồi bán trên platform, app ăn 20-30% hoa hồng. Bán bộ đề Mock Test IELTS chuẩn có giải thích chi tiết. Bán bộ từ vựng chuyên ngành IT, Medical, Business.

### B2B — License Cho Tổ Chức
Bán license cho trung tâm tiếng Anh để dùng platform cho học viên. White-label cho doanh nghiệp muốn gắn thương hiệu riêng. Gói doanh nghiệp train nhân viên tiếng Anh. Đây là nguồn thu lớn nhất dài hạn.

### Thứ Tự Triển Khai Monetization
Bước 1 là deploy web và có user thật. Bước 2 thêm Auth bằng Firebase free tier. Bước 3 tích hợp AI Writing Checker với giới hạn free. Bước 4 tích hợp Momo hoặc VNPay cho Premium. Bước 5 thêm Google AdSense. Bước 6 chuyển sang React Native lên App Store và CH Play rồi thêm AdMob. Bước 7 mở Marketplace nội dung. Bước 8 tiếp cận B2B.

---

## 6. Nội Dung Đặc Thù Việt Nam

### Tiếng Anh qua Tin Tức Việt Nam
Lấy tin tức trong nước rồi viết lại bằng tiếng Anh đơn giản ở mức B1-B2. User vừa đọc tin tức vừa học, hai trong một. Không app nước ngoài nào làm được vì không hiểu context Việt Nam.

### Từ Điển Slang & Gen Z English
Tiếng Anh thật người ta dùng trên TikTok, Twitter, Reddit: slay, no cap, it's giving, lowkey, GOAT, rent free... Có giải thích nghĩa và ví dụ dùng thực tế. Không sách giáo khoa nào dạy cái này nghiêm túc.

### Luyện Accent Đa Dạng
Không chỉ American hay British mà thêm Australian, Singapore English, Indian English. Thực tế người Việt gặp nhiều loại accent khi đi làm quốc tế. Dùng TTS với voice khác nhau hoặc audio recordings thật.

### Lỗi Tiếng Anh Đặc Trưng Của Người Việt
Database 200+ lỗi hay gặp nhất của người Việt: nhầm thì, bỏ sót mạo từ, dùng sai preposition, dịch thẳng từ tiếng Việt sang. Quiz dạng "Người Việt hay sai ở đây — bạn có sai không?". Gần gũi và dễ liên hệ hơn grammar sách giáo khoa.

---

## 7. Ghi Chú Kỹ Thuật

### localStorage — Các Key Mới Cần Thêm
Bên cạnh các key hiện tại trong file gốc, cần thêm: ee_notebook cho Word Notebook, ee_decks cho Custom Flashcard, ee_history cho Learning History, ee_goal cho mục tiêu học, ee_ai_usage cho rate limiting AI, ee_display_name và ee_bio cho profile, ee_check_in cho daily check-in.

### Rate Limiting AI Phía Client
Vì chưa có backend, giới hạn số lần dùng AI bằng localStorage: mỗi ngày lưu số lần đã dùng theo key ngày hôm đó. Khi hết giới hạn hiện modal gợi ý nâng Premium. Cách này dễ bypass nhưng đủ dùng giai đoạn đầu, sẽ chuyển về server-side khi có backend.

### Profile URL-encoded
Profile của user được mã hóa thành chuỗi base64 rồi đặt vào URL params để share. Người nhận link vào profile.html sẽ decode và hiển thị thông tin. Không cần tài khoản, không cần server.

### Share Card bằng Canvas API
Dùng HTML5 Canvas vẽ ảnh kết quả hoàn toàn phía client: background gradient theo theme, điểm số lớn ở giữa, streak, tên, watermark app. Xuất ra PNG và kích hoạt download. Kích thước 1080x1080 chuẩn Instagram.

### Drag & Drop cho Sentence Builder
Desktop dùng HTML5 Drag and Drop API native. Mobile dùng touchstart và touchend events để mô phỏng drag. Cần xử lý cả 2 để đảm bảo hoạt động trên điện thoại thật.

### Weak Points — Mở Rộng ee_game
Thêm field wrongByTopic vào object ee_game hiện tại. Mỗi topic lưu số câu sai và tổng số câu đã làm. Tính tỉ lệ sai để tìm chủ đề yếu nhất. Cần ít nhất 3 câu trong 1 topic mới bắt đầu tính để tránh kết quả sai lệch.

### Firebase khi Có Backend
Dùng Firebase Authentication cho đăng nhập Google/email. Firestore lưu data user và social features. Free tier của Firebase đủ dùng cho vài nghìn user đầu tiên. Khi scale lớn chuyển sang Supabase (open-source, rẻ hơn).

---

## 8. Thứ Tự Ưu Tiên Tổng Thể

### Làm Ngay — Không Cần Backend, Impact Cao
Word Notebook, Daily Check-in một chạm, Word of the Day, Weak Points Tracker, Share Card, Sentence Builder, Cloze Test Generator, Error Correction Quiz, Daily Idiom Challenge kiểu Wordle, và Profile công khai qua URL.

### Làm Sau Khi Có User Thật
AI Writing Checker, AI Roleplay, Leaderboard mở rộng, Activity Feed và Follow, Club và Nhóm, Writing Wall, Smart Push Notifications, Payment và Premium, Email Digest.

### Dài Hạn
B2B licensing, Marketplace nội dung, Luyện accent đa dạng, Tiếng Anh qua tin tức Việt Nam, Study Plan AI-powered, Seasonal Events.

---

*File này bổ sung cho PROJECT_DOCS.md — đọc cùng nhau để có bức tranh đầy đủ.*
