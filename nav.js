// nav.js — Single Source of Truth cho navigation
// Sửa thanh nav desktop = sửa luôn thanh nav mobile (cùng 1 file)
// Thêm trang mới: CHỈ SỬA FILE NÀY (thêm vào NAV_ITEMS)
(function(){
  var icon = function(name){ return '<i data-lucide="'+name+'" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:4px"></i>'; };

  var NAV_ITEMS = {
    'Học cơ bản': [
      {href:'grammar.html', icon:'book-open', text:'Ngữ pháp cơ bản'},
      {href:'grammar-advanced.html', icon:'flame', text:'Ngữ pháp nâng cao'},
      {href:'gerund-infinitive.html', icon:'git-branch', text:'V-ing hay To V?'},
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
      {href:'daily-challenge.html', icon:'calendar-check', text:'Thử thách hàng ngày'},
      {href:'spaced-repetition.html', icon:'refresh-cw', text:'Ôn tập lặp lại'}
    ],
    'IELTS': [
      {href:'ielts.html', icon:'trophy', text:'IELTS Guide'},
      {href:'academic-words.html', icon:'library', text:'570 từ học thuật'},
      {href:'ielts-writing-band9.html', icon:'pen-tool', text:'Viết IELTS mẫu'},
      {href:'ielts-speaking-topics.html', icon:'mic', text:'Nói IELTS mẫu'},
      {href:'paraphrasing.html', icon:'repeat', text:'Diễn đạt lại'},
      {href:'mock-test.html', icon:'file-check', text:'Thi thử IELTS'},
      {href:'toeic.html', icon:'award', text:'Luyện thi TOEIC'}
    ],
    'Từ điển': [
      {href:'dictionary.html', icon:'book', text:'Từ điển Anh-Việt'},
      {href:'dictionary-everyday.html', icon:'message-circle', text:'Từ điển Đời thường'},
      {href:'dictionary-ielts.html', icon:'target', text:'Từ điển IELTS'}
    ],
    'Chuyên ngành': [
      {href:'business-english.html', icon:'briefcase', text:'Tiếng Anh thương mại'},
      {href:'it-english.html', icon:'code-2', text:'Tiếng Anh IT'},
      {href:'medical-english.html', icon:'heart-pulse', text:'Tiếng Anh y tế'},
      {href:'legal-english.html', icon:'scale', text:'Tiếng Anh pháp lý'}
    ]
  };

  // ===== ACTIVE PAGE DETECTION =====
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  function isActive(href){ return href === currentPage; }
  function findActiveGroup(){
    for(var group in NAV_ITEMS){
      for(var i=0;i<NAV_ITEMS[group].length;i++){
        if(isActive(NAV_ITEMS[group][i].href)) return group;
      }
    }
    return null;
  }
  var activeGroup = findActiveGroup();

  // ===== BUILD DESKTOP NAV =====
  function buildDesktopNav(){
    var html = '';
    for(var group in NAV_ITEMS){
      var groupActive = (group === activeGroup) ? ' nav-group-active' : '';
      html += '<div class="nav-drop">';
      html += '<span class="nav-a'+groupActive+'" onclick="toggleDrop(this)">'+group+'</span>';
      html += '<div class="nav-drop-menu"><div class="nav-drop-menu-inner">';
      NAV_ITEMS[group].forEach(function(item){
        var cls = isActive(item.href) ? ' nav-item-active' : '';
        html += '<a href="'+item.href+'" class="nav-a'+cls+'">'+icon(item.icon)+' '+item.text+'</a>';
      });
      html += '</div></div></div>';
    }
    html += '<a href="progress.html" class="nav-a'+(isActive('progress.html')?' nav-item-active':'')+'">Tiến độ</a>';
    return html;
  }

  // ===== BUILD MOBILE MENU (Accordion with group headers) =====
  function buildMobileMenu(){
    var html = '<a href="index.html" class="mob-link'+(isActive('index.html')?' mob-active':'')+'">'+icon('home')+' Trang chủ</a>';
    var gIdx = 0;
    for(var group in NAV_ITEMS){
      var isGroupActive = (group === activeGroup);
      html += '<div class="mob-group">';
      html += '<button class="mob-group-btn'+(isGroupActive?' mob-group-open':'')+'" onclick="toggleMobGroup(this)">';
      html += '<span>'+group+'</span>';
      html += '<i data-lucide="chevron-down" style="width:16px;height:16px;display:inline-block;transition:transform .2s"></i>';
      html += '</button>';
      html += '<div class="mob-group-items" style="'+(isGroupActive?'max-height:600px':'max-height:0')+'">';
      NAV_ITEMS[group].forEach(function(item){
        var cls = isActive(item.href) ? ' mob-active' : '';
        html += '<a href="'+item.href+'" class="mob-link mob-sub'+cls+'">'+icon(item.icon)+' '+item.text+'</a>';
      });
      html += '</div></div>';
      gIdx++;
    }
    html += '<a href="progress.html" class="mob-link'+(isActive('progress.html')?' mob-active':'')+'">'+icon('bar-chart-3')+' Tiến độ</a>';
    return html;
  }

  // ===== INJECT NAVIGATION =====
  var navEl = document.querySelector('nav');
  if(navEl && !navEl.getAttribute('data-nav-injected')){
    navEl.setAttribute('data-nav-injected','true');
    navEl.innerHTML =
      '<a href="index.html" class="logo"><div class="logo-mark">E</div><span class="logo-name">Easy<span>English</span></span></a>' +
      '<button class="hamburger" id="navHamburger"><span></span><span></span><span></span></button>' +
      '<div class="nav-links">' + buildDesktopNav() + '</div>' +
      '<div class="nav-spacer"></div>' +
      '<div id="mobileMenu" class="mob-menu">' +
      buildMobileMenu() +
      '</div>';

    // Hamburger toggle
    document.getElementById('navHamburger').addEventListener('click', function(){
      var m = document.getElementById('mobileMenu');
      var isOpen = m.classList.contains('mob-open');
      if(isOpen){
        m.classList.remove('mob-open');
        this.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        m.classList.add('mob-open');
        this.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // ===== MOBILE GROUP ACCORDION =====
  window.toggleMobGroup = function(btn){
    var items = btn.nextElementSibling;
    var isOpen = btn.classList.contains('mob-group-open');
    // Close all groups first
    document.querySelectorAll('.mob-group-btn.mob-group-open').forEach(function(b){
      b.classList.remove('mob-group-open');
      b.nextElementSibling.style.maxHeight = '0';
    });
    // Toggle clicked group
    if(!isOpen){
      btn.classList.add('mob-group-open');
      items.style.maxHeight = items.scrollHeight + 'px';
    }
  };

  // ===== CLOSE DROPDOWN ON OUTSIDE CLICK =====
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav-drop')){
      document.querySelectorAll('.nav-drop.open').forEach(function(d){
        d.classList.remove('open');
      });
    }
  });

  // ===== AUTO-HIDE NAV ON SCROLL DOWN, SHOW ON SCROLL UP =====
  var lastScrollY = window.scrollY;
  var navHidden = false;
  var scrollThreshold = 60; // px trước khi ẩn
  var ticking = false;

  function handleScroll(){
    var currentScrollY = window.scrollY;
    var nav = document.querySelector('nav');
    if(!nav) return;

    if(currentScrollY > lastScrollY && currentScrollY > scrollThreshold && !navHidden){
      // Scrolling DOWN — hide nav
      nav.style.transform = 'translateY(-100%)';
      navHidden = true;
      // Close any open dropdowns
      document.querySelectorAll('.nav-drop.open').forEach(function(d){
        d.classList.remove('open');
      });
    } else if(currentScrollY < lastScrollY && navHidden){
      // Scrolling UP — show nav
      nav.style.transform = 'translateY(0)';
      navHidden = false;
    }

    // Always show at top
    if(currentScrollY <= 10){
      nav.style.transform = 'translateY(0)';
      navHidden = false;
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function(){
    if(!ticking){
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, {passive: true});

})();
