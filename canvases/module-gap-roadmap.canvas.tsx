import { Divider, H1, H2, Stack, Stat, Table, Text } from 'cursor/canvas';

const priorityRows = [
  ['P1', 'Error Correction', 'Cốt lõi để biến học thụ động thành luyện thật; cực hợp người Việt vì sửa lỗi sai phổ biến ngay lập tức.', 'Rất cao', 'Trung bình', 'Làm trước'],
  ['P1', 'Sentence Builder', 'Tạo nền cho grammar + writing + quiz; giúp user hiểu trật tự câu thay vì học thuộc.', 'Rất cao', 'Trung bình', 'Làm trước'],
  ['P1', 'Articles', 'Mạo từ là điểm đau kinh điển của người Việt; thiếu module này sẽ hụt nền.', 'Rất cao', 'Trung bình', 'Làm trước'],
  ['P1', 'Questions & Auxiliaries', 'Do/does/did, wh-questions, indirect questions là xương sống của giao tiếp và bài tập.', 'Rất cao', 'Trung bình', 'Làm trước'],
  ['P1', 'Relative Clauses', 'Xuất hiện dày trong đọc hiểu, writing, speaking; cần module riêng để học sâu.', 'Rất cao', 'Trung bình', 'Làm trước'],
  ['P1', 'Listening Transcript', 'Thiếu một luồng nghe thật: transcript, shadowing, dictation, keyword spotting.', 'Rất cao', 'Trung bình', 'Làm trước'],
  ['P1', 'True / False / Not Given', 'Dạng bài IELTS reading cực quan trọng; có thể kéo mạnh chất lượng exam prep.', 'Cao', 'Trung bình', 'Làm trước'],
  ['P1', 'Writing Task 2 by Type', 'IELTS Writing Task 2 phải tách dạng để người học có khung trả lời rõ ràng.', 'Rất cao', 'Khó', 'Làm trước'],
  ['P1', 'Shadowing', 'Tăng speaking + listening cùng lúc; phù hợp tự học và tạo cảm giác tiến bộ rõ.', 'Cao', 'Trung bình', 'Làm trước'],
  ['P1', 'Weak Points Tracker', 'Cá nhân hóa học tập; biết user đang yếu đâu thì giữ chân tốt hơn.', 'Rất cao', 'Khó', 'Làm trước'],
  ['P2', 'Pronunciation Drills', 'Âm cuối, trọng âm, ngữ điệu, minimal pairs là bước kế tiếp sau speaking nền.', 'Cao', 'Trung bình', 'Làm sau khi có nền'],
  ['P2', 'Listening Accent Training', 'Nâng listening thật sự bằng nhiều accent, nhưng cần core listening trước.', 'Cao', 'Khó', 'Làm sau khi có nền'],
  ['P2', 'Speaking Part 1/2/3', 'Cần khi đã có nền grammar, vocab, và luyện trả lời mẫu.', 'Cao', 'Khó', 'Làm sau khi có nền'],
  ['P2', 'Collocation Drills', 'Giúp từ vựng chuyển thành dùng thật; rất đáng làm nhưng cần vốn tối thiểu.', 'Cao', 'Trung bình', 'Làm sau khi có nền'],
  ['P2', 'CEFR Vocab Tracks', 'A1 → C1 tạo lộ trình rõ ràng, nhưng nên làm khi hệ thống học đã ổn định.', 'Cao', 'Trung bình', 'Làm sau khi có nền'],
  ['P2', 'Goal-based Learning Paths', 'IELTS, TOEIC, work, travel... rất mạnh về sản phẩm nhưng cần nền module trước.', 'Cao', 'Khó', 'Làm sau khi có nền'],
  ['P2', 'Vietnamese Learner Mistakes', 'Cực lợi thế cạnh tranh; làm được sẽ khác biệt rất mạnh với đối thủ.', 'Rất cao', 'Trung bình', 'Rất nên làm'],
  ['P2', 'Feedback-rich Dictionary', 'Cần để dictionary thành công cụ học thật: collocation, tone, usage notes, lỗi hay gặp.', 'Cao', 'Khó', 'Rất nên làm'],
  ['P3', 'Onboarding + Study Plan', 'Rất tốt cho retention, nhưng nên đợi core content đủ dày để gợi ý có ý nghĩa.', 'Cao', 'Khó', 'Rất nên làm'],
  ['P3', 'Cloud Sync / Auth', 'Quan trọng cho platform, nhưng chỉ nên làm khi local learning loop đã ngon.', 'Cao', 'Khó', 'Để sau'],
  ['P3', 'Leaderboard / Social Layer', 'Tăng động lực nhưng phụ thuộc vào auth, sync, và lượng user đủ lớn.', 'Trung bình', 'Khó', 'Để sau'],
  ['P3', 'Advanced Writing Feedback', 'AI chấm viết / band analysis rất mạnh nhưng nên để sau khi writing module đủ sâu.', 'Cao', 'Khó', 'Để sau'],
  ['P3', 'Export / Import Decks', 'Hữu ích cho power users, nhưng không cần ưu tiên trước khi core content xong.', 'Trung bình', 'Trung bình', 'Để sau'],
];

const gapAreas = [
  {
    title: 'Grammar nền tảng còn thiếu',
    summary: 'Đây là nhóm module cần có trước tiên vì nó tạo khung cho mọi thứ khác: speaking, writing, reading, quiz.',
    items: [
      'Articles',
      'Questions & Auxiliaries',
      'Tag Questions',
      'Sentence Structure',
      'Comparisons',
      'Relative Clauses',
      'Reported Speech',
      'Active / Passive',
      'Conditionals',
      'Punctuation & Capitalization',
    ],
  },
  {
    title: 'Skills thực chiến còn mỏng',
    summary: 'Các kỹ năng này quyết định user có học thật hay chỉ đọc lý thuyết.',
    items: [
      'Listening Transcript',
      'Shadowing',
      'Dictation',
      'Pronunciation Drills',
      'Speaking Part 1/2/3',
      'Reading Skills nâng cao',
      'Writing foundation',
      'Email writing',
    ],
  },
  {
    title: 'IELTS cần tách dạng bài',
    summary: 'IELTS hiện có nền tốt, nhưng thiếu module breakdown theo format đề thật.',
    items: [
      'Writing Task 1: charts / maps / process',
      'Writing Task 2: agree-disagree / discussion / problem-solution / advantages-disadvantages',
      'Reading: TFNG / Matching Headings / Summary Completion',
      'Listening: form / map / MCQ / completion',
      'Speaking Part 1/2/3 theo rubric',
    ],
  },
  {
    title: 'Vocabulary cần hệ thống hóa hơn',
    summary: 'Hiện có nhiều trang từ vựng, nhưng thiếu lộ trình và bài tập chuyển đổi kiến thức thành dùng thật.',
    items: [
      'CEFR tracks A1 → C1',
      'Collocation drills',
      'Verb patterns',
      'Chunk-based learning',
      'English for work / travel / interview / daily life',
      'Modern slang / internet English',
    ],
  },
  {
    title: 'Cần module cho người Việt',
    summary: 'Đây là lợi thế cạnh tranh mạnh nhất vì có thể giải quyết đúng lỗi phổ biến của người học Việt Nam.',
    items: [
      'Sai mạo từ',
      'Thiếu S số ít',
      'Nhầm thì',
      'Dịch word-by-word',
      'Sai giới từ',
      'Phát âm cuối âm',
      'False friends',
    ],
  },
  {
    title: 'Platform & cá nhân hóa',
    summary: 'Không phải module học trực tiếp, nhưng cực quan trọng để giữ chân và làm sản phẩm bền hơn.',
    items: [
      'Weak points tracker',
      'Study plan / learning path',
      'Onboarding chọn mục tiêu',
      'Cloud sync / auth',
      'Leaderboard',
      'Export Anki deck',
    ],
  },
];

export default function ModuleGapRoadmap() {
  return (
    <Stack gap={22}>
      <H1>Danh sách module còn thiếu theo thứ tự ưu tiên</H1>
      <Text tone="secondary">
        Bản này gom lại thành một roadmap đầy đủ hơn: ưu tiên theo giá trị học tập, độ ảnh hưởng đến retention,
        và độ khó triển khai thực tế.
      </Text>

      <Stack gap={12}>
        <Stat value="23" label="module gap chính" />
        <Stat value="10" label="module nên làm trước" tone="success" />
        <Stat value="3" label="nhóm platform để sau" tone="warning" />
      </Stack>

      <Divider />

      <H2>1. Roadmap ưu tiên theo thứ tự</H2>
      <Table
        headers={["Ưu tiên", "Module", "Vì sao thiếu quan trọng", "Tác động", "Độ khó", "Nên làm"]}
        rows={priorityRows}
      />

      <Divider />

      <H2>2. Nhóm cần làm trước</H2>
      <Text>
        Đây là bộ lõi nên làm đầu tiên vì nó tạo ra nền học thật: sửa lỗi, ghép câu, hiểu cấu trúc, và luyện đọc/nghe theo dạng bài.
      </Text>
      <Text>
        <b>Top ưu tiên:</b> Error Correction, Sentence Builder, Articles, Questions & Auxiliaries, Relative Clauses,
        Listening Transcript, True / False / Not Given, Writing Task 2 by Type, Shadowing, Weak Points Tracker.
      </Text>

      <H2>3. Nhóm nên làm sau khi có nền</H2>
      <Text>
        Nhóm này nâng chất lượng sản phẩm rất mạnh, nhưng sẽ hiệu quả hơn nếu core content đã đủ dày để người dùng không bị
        “học ngắt quãng”.
      </Text>
      <Text>
        <b>Nhóm này gồm:</b> Pronunciation Drills, Listening Accent Training, Speaking Part 1/2/3, Collocation Drills,
        CEFR Vocab Tracks, Goal-based Learning Paths, Vietnamese Learner Mistakes, Feedback-rich Dictionary.
      </Text>

      <H2>4. Nhóm để sau</H2>
      <Text>
        Những module platform như Cloud Sync / Auth, Leaderboard, Export / Import Decks nên để sau vì chúng phụ thuộc vào
        việc core học tập đã đủ mạnh và đã có user thật sử dụng thường xuyên.
      </Text>

      <Divider />

      <H2>5. Các mảng kiến thức còn thiếu</H2>
      {gapAreas.map((group) => (
        <Stack key={group.title} gap={8}>
          <Text>
            <b>{group.title}</b>
          </Text>
          <Text tone="secondary">{group.summary}</Text>
          <Text>
            {group.items.join(' · ')}
          </Text>
        </Stack>
      ))}

      <Divider />

      <H2>6. Kết luận thực dụng</H2>
      <Text>
        Nếu chỉ có thời gian làm ít module, hãy đi theo thứ tự này: <b>Error Correction</b> → <b>Sentence Builder</b> →
        <b>Articles</b> → <b>Questions & Auxiliaries</b> → <b>Relative Clauses</b> → <b>Listening Transcript</b> →
        <b>True / False / Not Given</b> → <b>Writing Task 2 by Type</b> → <b>Shadowing</b> → <b>Weak Points Tracker</b>.
      </Text>
      <Text>
        Sau đó mới mở rộng sang speaking, pronunciation, accent, collocations, CEFR tracks, và cuối cùng là platform features.
      </Text>
    </Stack>
  );
}
