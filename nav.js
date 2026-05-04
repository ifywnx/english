// nav.js — Single Source of Truth cho navigation
// Sửa thanh nav desktop = sửa luôn thanh nav mobile (cùng 1 file)
// Thêm trang mới: CHỈ SỬA FILE NÀY (thêm vào NAV_ITEMS)
(function(){
  var icon = function(name){ return '<i data-lucide="'+name+'" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:4px"></i>'; };

  var NAV_ITEMS = {
    'Ngữ pháp': [
      {href:'ngu-phap.html', icon:'book-open', text:'Ngữ pháp nền tảng'},
      {href:'ngu-phap-nang-cao.html', icon:'flame', text:'Ngữ pháp nâng cao'},
      {href:'dong-tu-khuyet-thieu.html', icon:'shield', text:'Động từ khuyết thiếu'},
      {href:'mao-tu.html', icon:'archive', text:'Mạo từ & lượng từ'},
      {href:'cau-hoi-tro-dong-tu.html', icon:'help-circle', text:'Câu hỏi & trợ động từ'},
      {href:'menh-de-quan-he.html', icon:'link', text:'Mệnh đề quan hệ'},
      {href:'tim-loi-sai.html', icon:'edit-3', text:'Tìm lỗi sai'},
      {href:'ghep-cau.html', icon:'layers-3', text:'Ghép câu'},
      {href:'ving-hay-to-v.html', icon:'split', text:'V-ing hay To V'},
      {href:'phat-am.html', icon:'mic', text:'Phát âm'},
      {href:'dong-tu-bat-quy-tac.html', icon:'list', text:'Động từ bất quy tắc'},
      {href:'gioi-tu.html', icon:'map-pin', text:'Giới từ & cụm giới từ'},
      {href:'12-thi.html', icon:'clock', text:'12 thì tiếng Anh'},
      {href:'so-sanh.html', icon:'arrow-left-right', text:'So sánh'},
      {href:'cau-dieu-kien.html', icon:'route', text:'Câu điều kiện'},
      {href:'cau-hoi-duoi.html', icon:'message-circle-question', text:'Câu hỏi đuôi'},
      {href:'cau-truc-cau.html', icon:'align-left', text:'Cấu trúc câu'},
      {href:'chu-dong-bi-dong.html', icon:'repeat-2', text:'Chủ động & bị động'},
      {href:'tuong-thuat.html', icon:'quote', text:'Câu tường thuật'},
      {href:'dau-cau-viet-hoa.html', icon:'type', text:'Dấu câu & viết hoa'},
      {href:'gioi-tu-nang-cao.html', icon:'compass', text:'Giới từ nâng cao'}
    ],
    'Từ vựng': [
      {href:'tu-vung.html', icon:'pencil', text:'Học từ vựng'},
      {href:'dong-nghia-trai-nghia.html', icon:'repeat', text:'Đồng nghĩa / trái nghĩa'},
      {href:'cum-tu-di-cung.html', icon:'link', text:'Cụm từ đi cùng'},
      {href:'thanh-ngu.html', icon:'sparkles', text:'Thành ngữ'},
      {href:'cum-dong-tu.html', icon:'git-merge', text:'Cụm động từ'},
      {href:'tu-de-nham.html', icon:'shuffle', text:'Từ dễ nhầm'},
      {href:'cau-tao-tu.html', icon:'puzzle', text:'Cấu tạo từ'},
      {href:'tu-vung-chu-de.html', icon:'grid', text:'Từ vựng theo chủ đề'},
      {href:'tieng-long-internet.html', icon:'globe', text:'Tiếng lóng Internet'},
      {href:'tu-giong-khac-nghia.html', icon:'copy', text:'Từ giống khác nghĩa'},
      {href:'tu-vung-a1.html', icon:'baby', text:'Từ vựng A1'},
      {href:'tu-vung-a2.html', icon:'footprints', text:'Từ vựng A2'},
      {href:'tu-vung-b1.html', icon:'trending-up', text:'Từ vựng B1'},
      {href:'tu-vung-b2.html', icon:'zap', text:'Từ vựng B2'},
      {href:'tu-vung-c1.html', icon:'crown', text:'Từ vựng C1'},
      {href:'tu-vung-c2.html', icon:'gem', text:'Từ vựng C2'}
    ],
    '4 kỹ năng': [
      {href:'ky-nang.html', icon:'layers', text:'Tổng quan 4 kỹ năng'},
      {href:'doc-hieu.html', icon:'book-open-check', text:'Đọc hiểu'},
      {href:'ky-nang-doc.html', icon:'scan-search', text:'Kỹ năng đọc'},
      {href:'luyen-nghe.html', icon:'headphones', text:'Luyện nghe'},
      {href:'nghe-transcript.html', icon:'file-text', text:'Transcript nghe'},
      {href:'kiem-tra-bai-viet.html', icon:'check-circle', text:'Kiểm tra bài viết'},
      {href:'viet-co-ban.html', icon:'file-edit', text:'Writing cơ bản'},
      {href:'tu-noi.html', icon:'link-2', text:'Từ nối'},
      {href:'giao-tiep.html', icon:'message-square', text:'Giao tiếp hằng ngày'},
      {href:'luyen-noi.html', icon:'mic-2', text:'Luyện nói'},
      {href:'bai-tap.html', icon:'help-circle', text:'Bài tập trắc nghiệm'},
      {href:'thu-thach-moi-ngay.html', icon:'calendar-check', text:'Thử thách mỗi ngày'},
      {href:'on-tap-lap-lai.html', icon:'refresh-cw', text:'Ôn tập lặp lại'},
      {href:'bai-tap-phat-am.html', icon:'volume-2', text:'Bài tập phát âm'},
      {href:'tieng-anh-du-lich.html', icon:'plane', text:'Tiếng Anh du lịch'},
      {href:'viet-email.html', icon:'mail', text:'Viết Email'},
      {href:'dong-vai.html', icon:'users', text:'Đóng vai giao tiếp'},
      {href:'chep-chinh-ta.html', icon:'pen-line', text:'Chép chính tả'},
      {href:'luyen-phat-am-theo.html', icon:'audio-lines', text:'Luyện phát âm theo'},
      {href:'luyen-nghe-giong.html', icon:'ear', text:'Luyện nghe giọng'}
    ],
    'IELTS & TOEIC': [
      {href:'ielts.html', icon:'trophy', text:'Tổng quan IELTS'},
      {href:'tu-hoc-thuat.html', icon:'library', text:'570 từ học thuật'},
      {href:'ielts-viet-mau.html', icon:'pen-tool', text:'Bài viết mẫu IELTS'},
      {href:'ielts-viet-task1.html', icon:'chart-column', text:'Writing Task 1'},
      {href:'ielts-viet-task2.html', icon:'file-pen-line', text:'Writing Task 2'},
      {href:'ielts-noi.html', icon:'mic', text:'Chủ đề nói IELTS'},
      {href:'dien-dat-lai.html', icon:'repeat', text:'Diễn đạt lại'},
      {href:'thi-thu.html', icon:'file-check', text:'Thi thử IELTS'},
      {href:'toeic.html', icon:'award', text:'Luyện thi TOEIC'},
      {href:'ielts-doc.html', icon:'book-open', text:'IELTS Reading chi tiết'},
      {href:'ielts-nghe.html', icon:'headphones', text:'IELTS Listening chi tiết'},
      {href:'ielts-true-false.html', icon:'check-square', text:'IELTS True/False/NG'},
      {href:'ielts-noi-heading.html', icon:'heading', text:'IELTS Nối heading'},
      {href:'ielts-dien-form.html', icon:'form-input', text:'IELTS Điền form'},
      {href:'ielts-dien-tom-tat.html', icon:'file-text', text:'IELTS Điền tóm tắt'},
      {href:'ielts-gan-nhan-ban-do.html', icon:'map', text:'IELTS Gán nhãn bản đồ'},
      {href:'ielts-task1-bieu-do.html', icon:'bar-chart-2', text:'Task 1 Biểu đồ'},
      {href:'ielts-task1-ban-do.html', icon:'map-pin', text:'Task 1 Bản đồ'},
      {href:'ielts-task1-quy-trinh.html', icon:'workflow', text:'Task 1 Quy trình'}
    ],
    'Từ điển': [
      {href:'tu-dien.html', icon:'book', text:'Từ điển Anh - Việt'},
      {href:'tu-dien-doi-thuong.html', icon:'message-circle', text:'Từ điển đời thường'},
      {href:'tu-dien-doi-thuong-2.html', icon:'messages-square', text:'Từ điển đời thường 2'},
      {href:'tu-dien-doi-thuong-3.html', icon:'library', text:'Từ điển chủ đề'},
      {href:'tu-dien-ielts.html', icon:'target', text:'Từ điển IELTS'},
      {href:'tu-dien-ielts-2.html', icon:'target', text:'Từ điển IELTS 2'}
    ],
    'Chuyên ngành': [
      {href:'tieng-anh-thuong-mai.html', icon:'briefcase', text:'Tiếng Anh thương mại'},
      {href:'tieng-anh-it.html', icon:'code-2', text:'Tiếng Anh IT'},
      {href:'tieng-anh-y-te.html', icon:'heart-pulse', text:'Tiếng Anh y tế'},
      {href:'tieng-anh-phap-ly.html', icon:'scale', text:'Tiếng Anh pháp lý'},
      {href:'tieng-anh-phong-van.html', icon:'user-check', text:'Tiếng Anh phỏng vấn'}
    ],
    'Tiện ích': [
      {href:'so-tay.html', icon:'bookmark', text:'Sổ tay từ vựng'},
      {href:'lo-trinh-hoc.html', icon:'map', text:'Lộ trình học'},
      {href:'dat-muc-tieu.html', icon:'target', text:'Đặt mục tiêu'},
      {href:'theo-doi-diem-yeu.html', icon:'alert-triangle', text:'Theo dõi điểm yếu'},
      {href:'achievements.html', icon:'trophy', text:'Thành tựu'},
      {href:'tien-do.html', icon:'bar-chart-3', text:'Tiến độ & XP'}
    ]
  };

  // Expose nav data for other shared systems (e.g. more drawer, search, bottom nav)
  window.EE_NAV_ITEMS = NAV_ITEMS;
  window.EE_SHORT_NAV_ITEMS = [
    {href:'index.html', icon:'home', label:'Trang chủ'},
    {href:'ngu-phap.html', icon:'book-open', label:'Ngữ pháp'},
    {href:'tu-vung.html', icon:'languages', label:'Từ vựng'},
    {href:'bai-tap.html', icon:'edit-3', label:'Bài tập'},
    {href:'lo-trinh-hoc.html', icon:'map', label:'Lộ trình'}
  ];
  window.EE_NAV_FLAT = (function(){
    var flat = [];
    for (var group in NAV_ITEMS) {
      if (!NAV_ITEMS.hasOwnProperty(group)) continue;
      for (var i = 0; i < NAV_ITEMS[group].length; i++) {
        flat.push({
          group: group,
          href: NAV_ITEMS[group][i].href,
          icon: NAV_ITEMS[group][i].icon,
          text: NAV_ITEMS[group][i].text
        });
      }
    }
    return flat;
  })();

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
      var items = NAV_ITEMS[group];
      var isMega = items.length > 10; // 2-column for large dropdowns
      html += '<div class="nav-drop">';
      html += '<span class="nav-a'+groupActive+'" onclick="toggleDrop(this)">'+group+'</span>';
      html += '<div class="nav-drop-menu"><div class="nav-drop-menu-inner'+(isMega?' nav-mega':'')+'">';
      items.forEach(function(item){
        var cls = isActive(item.href) ? ' nav-item-active' : '';
        html += '<a href="'+item.href+'" class="nav-a'+cls+'">'+icon(item.icon)+' '+item.text+'</a>';
      });
      html += '</div></div></div>';
    }
    html += '<a href="tien-do.html" class="nav-a'+(isActive('tien-do.html')?' nav-item-active':'')+'">Tiến độ</a>';
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
    html += '<a href="tien-do.html" class="mob-link'+(isActive('tien-do.html')?' mob-active':'')+'">'+icon('bar-chart-3')+' Tiến độ</a>';
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
      '<div class="mob-menu-header"><span class="mob-menu-title">Menu</span><button class="mob-close-btn" id="mobCloseBtn"><i data-lucide="x" style="width:20px;height:20px"></i></button></div>' +
      buildMobileMenu() +
      '</div>';

    // Hamburger toggle
    function closeMobileMenu(){
      var m = document.getElementById('mobileMenu');
      var h = document.getElementById('navHamburger');
      if(m) m.classList.remove('mob-open');
      if(h) h.classList.remove('open');
      document.body.style.overflow = '';
    }
    function openMobileMenu(){
      var m = document.getElementById('mobileMenu');
      var h = document.getElementById('navHamburger');
      if(m) m.classList.add('mob-open');
      if(h) h.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    document.getElementById('navHamburger').addEventListener('click', function(){
      var m = document.getElementById('mobileMenu');
      if(m && m.classList.contains('mob-open')) closeMobileMenu();
      else openMobileMenu();
    });
    // X close button
    document.getElementById('mobCloseBtn').addEventListener('click', closeMobileMenu);
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

  // ===== toggleDrop — DEFINED HERE (not in common.js) =====
  window.toggleDrop = function(el){
    var drop = el.closest('.nav-drop');
    var wasOpen = drop.classList.contains('open');
    document.querySelectorAll('.nav-drop.open').forEach(function(d){ d.classList.remove('open'); });
    if(!wasOpen) drop.classList.add('open');
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
