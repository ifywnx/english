// nav.js — Single Source of Truth cho navigation
// Thêm trang mới: CHỈ SỬA FILE NÀY
(function(){
  var icon = function(name){ return '<i data-lucide="'+name+'" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:4px"></i>'; };

  var NAV_ITEMS = {
    'Học cơ bản': [
      {href:'grammar.html', icon:'book-open', text:'Ngữ pháp cơ bản'},
      {href:'grammar-advanced.html', icon:'flame', text:'Ngữ pháp nâng cao'},
      {href:'gerund-infinitive.html', icon:'git-branch', text:'Gerund vs Infinitive'},
      {href:'pronunciation.html', icon:'mic', text:'Phát âm'},
      {href:'irregular-verbs.html', icon:'list', text:'Động từ bất quy tắc'},
      {href:'prepositions.html', icon:'map-pin', text:'Cụm giới từ'}
    ],
    'Từ vựng': [
      {href:'vocabulary.html', icon:'pencil', text:'Từ vựng cơ bản'},
      {href:'synonyms.html', icon:'repeat', text:'Đồng/Trái nghĩa'},
      {href:'collocations.html', icon:'link', text:'Cụm từ đi cùng'},
      {href:'idioms.html', icon:'sparkles', text:'Thành ngữ'},
      {href:'phrasal-verbs.html', icon:'git-merge', text:'Cụm động từ'},
      {href:'confusing-words.html', icon:'shuffle', text:'Từ hay nhầm'},
      {href:'word-formation.html', icon:'puzzle', text:'Cấu tạo từ'}
    ],
    'Kỹ năng': [
      {href:'skills.html', icon:'layers', text:'4 Kỹ năng'},
      {href:'reading-comprehension.html', icon:'book-open-check', text:'Đọc hiểu'},
      {href:'listening.html', icon:'headphones', text:'Luyện nghe'},
      {href:'writing-checker.html', icon:'check-circle', text:'Kiểm tra bài viết'},
      {href:'linking-words.html', icon:'link-2', text:'Từ nối'},
      {href:'conversation.html', icon:'message-square', text:'Giao tiếp'},
      {href:'quiz.html', icon:'help-circle', text:'Bài tập'},
      {href:'spaced-repetition.html', icon:'refresh-cw', text:'Ôn tập lặp lại'}
    ],
    'IELTS': [
      {href:'ielts.html', icon:'trophy', text:'IELTS Guide'},
      {href:'academic-words.html', icon:'library', text:'570 từ học thuật'},
      {href:'ielts-writing-band9.html', icon:'pen-tool', text:'Viết IELTS mẫu'},
      {href:'ielts-speaking-topics.html', icon:'mic', text:'Nói IELTS mẫu'},
      {href:'paraphrasing.html', icon:'repeat', text:'Diễn đạt lại'},
      {href:'mock-test.html', icon:'file-check', text:'Thi thử IELTS'}
    ],
    'Từ điển': [
      {href:'dictionary.html', icon:'book', text:'Từ điển Anh-Việt'},
      {href:'dictionary-everyday.html', icon:'message-circle', text:'Từ điển Đời thường'},
      {href:'dictionary-ielts.html', icon:'target', text:'Từ điển IELTS'}
    ]
  };

  // Build desktop nav dropdown HTML
  function buildDesktopNav(){
    var html = '';
    for(var group in NAV_ITEMS){
      html += '<div class="nav-drop"><span class="nav-a" onclick="toggleDrop(this)">'+group+'</span>';
      html += '<div class="nav-drop-menu"><div class="nav-drop-menu-inner">';
      NAV_ITEMS[group].forEach(function(item){
        html += '<a href="'+item.href+'" class="nav-a">'+icon(item.icon)+' '+item.text+'</a>';
      });
      html += '</div></div></div>';
    }
    html += '<a href="progress.html" class="nav-a">Tiến độ</a>';
    return html;
  }

  // Build mobile menu HTML
  function buildMobileMenu(){
    var mStyle = 'padding:14px 16px;color:var(--text2);text-decoration:none;font-size:16px;border-radius:10px;display:block';
    var html = '<a href="index.html" style="'+mStyle+'">Trang chủ</a>';
    for(var group in NAV_ITEMS){
      NAV_ITEMS[group].forEach(function(item){
        html += '<a href="'+item.href+'" style="'+mStyle+'">'+item.text+'</a>';
      });
    }
    html += '<a href="progress.html" style="'+mStyle+'">Tiến độ</a>';
    return html;
  }

  // Inject navigation
  var navEl = document.querySelector('nav');
  if(navEl && !navEl.getAttribute('data-nav-injected')){
    navEl.setAttribute('data-nav-injected','true');
    navEl.innerHTML =
      '<a href="index.html" class="logo"><div class="logo-mark">E</div><span class="logo-name">Easy<span>English</span></span></a>' +
      '<button class="hamburger" onclick="var m=document.getElementById(\'mobileMenu\');if(m.style.display===\'flex\'){m.style.display=\'none\';this.classList.remove(\'open\')}else{m.style.display=\'flex\';this.classList.add(\'open\')}"><span></span><span></span><span></span></button>' +
      '<div class="nav-links">' + buildDesktopNav() + '</div>' +
      '<div class="nav-spacer"></div>' +
      '<div id="mobileMenu" style="display:none;position:fixed;top:56px;left:0;right:0;bottom:0;background:rgba(11,26,30,0.98);backdrop-filter:blur(20px);z-index:9999;padding:20px 16px;overflow-y:auto;flex-direction:column;gap:2px">' +
      buildMobileMenu() +
      '</div>';
  }
})();
