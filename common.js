/* === EasyEnglish Common JS === */

/* === SMOOTH PAGE TRANSITIONS === */
(function(){
  // Inject transition CSS
  var ts = document.createElement('style');
  ts.textContent = 
    '@view-transition{navigation:auto}' +
    '::view-transition-old(root){animation:eeSlideOut .2s ease-in}' +
    '::view-transition-new(root){animation:eeSlideIn .25s ease-out}' +
    '@keyframes eeSlideOut{to{opacity:0;transform:translateY(-8px)}}' +
    '@keyframes eeSlideIn{from{opacity:0;transform:translateY(8px)}}' +
    '@keyframes eeFadeIn{from{opacity:.7}to{opacity:1}}' +
    '.ee-page-exit{opacity:0!important;transform:translateY(-6px)!important;transition:all .18s ease-in!important}' +
    '*{-webkit-tap-highlight-color:transparent}' +
    /* === MOBILE OVERRIDES (only essentials) === */
    '@media(max-width:900px){' +
      '.content{padding-bottom:100px}' +
      '.back-top{bottom:160px;right:16px}' +
      'nav{position:sticky;top:0;z-index:200}' +
    '}';
  document.head.appendChild(ts);
  // Trigger fade-in on body (runs after paint)
  requestAnimationFrame(function(){
    document.body.style.animation = 'eeFadeIn .25s ease-out forwards';
    // Clean up after animation to avoid breaking position:fixed on children
    setTimeout(function(){ document.body.style.animation=''; document.body.style.transform='none'; document.body.style.opacity='1'; }, 300);
  });

  // Smooth navigation: fade out before leaving
  document.addEventListener('click', function(e){
    var link = e.target.closest('a[href]');
    if(!link) return;
    var href = link.getAttribute('href');
    // Only handle local .html links
    if(!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript') || href.startsWith('mailto')) return;
    if(e.ctrlKey || e.metaKey || e.shiftKey) return; // allow open in new tab
    
    // If browser supports View Transitions, let it handle
    if(document.startViewTransition) return;
    
    // Fallback: manual fade out
    e.preventDefault();
    document.body.classList.add('ee-page-exit');
    setTimeout(function(){ window.location.href = href; }, 180);
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
})();

// Nav dropdown toggle
function toggleDrop(el){
  var drop=el.closest('.nav-drop');
  var wasOpen=drop.classList.contains('open');
  document.querySelectorAll('.nav-drop.open').forEach(function(d){d.classList.remove('open')});
  if(!wasOpen) drop.classList.add('open');
}
document.addEventListener('click',function(e){
  if(!e.target.closest('.nav-drop')) document.querySelectorAll('.nav-drop.open').forEach(function(d){d.classList.remove('open')});
});

// Back to top + reading progress (merged, rAF-throttled)
var _scrollTicking = false;
window.addEventListener('scroll',function(){
  if(!_scrollTicking){
    requestAnimationFrame(function(){
      var st=window.scrollY, h=document.documentElement.scrollHeight-window.innerHeight;
      var btn=document.getElementById('backTop');
      if(btn){if(st>400)btn.classList.add('show');else btn.classList.remove('show');}
      var bar=document.getElementById('readProgress');
      if(bar&&h>0)bar.style.width=Math.min(100,st/h*100)+'%';
      _scrollTicking=false;
    });
    _scrollTicking=true;
  }
},{passive:true});

// ==================== INJECT SHARED UI ELEMENTS ====================
(function(){
  var path = location.pathname.split('/').pop() || 'index.html';

  // --- Back to Top ---
  if (!document.getElementById('backTop')) {
    var bt = document.createElement('button');
    bt.className = 'back-top';
    bt.id = 'backTop';
    bt.onclick = function(){ window.scrollTo({top:0,behavior:'smooth'}); };
    bt.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px"><polyline points="18 15 12 9 6 15"/></svg>';
    document.body.appendChild(bt);
  }

  // --- Reading Progress ---
  if (!document.getElementById('readProgress')) {
    var rp = document.createElement('div');
    rp.className = 'read-progress';
    rp.id = 'readProgress';
    document.body.appendChild(rp);
  }

  // --- Bottom Nav (mobile only) ---
  if (!document.querySelector('.mob-bottom-nav')) {
    var bnItems = [
      {href:'index.html', icon:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', label:'Trang chủ'},
      {href:'grammar.html', icon:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>', label:'Ngữ pháp'},
      {href:'vocabulary.html', icon:'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>', label:'Từ vựng'},
      {href:'quiz.html', icon:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>', label:'Bài tập'}
    ];
    var bnHtml = '<div class="mob-bottom-nav"><div class="mob-bottom-nav-inner">';
    bnItems.forEach(function(item){
      var isActive = path === item.href ? ' active' : '';
      bnHtml += '<a href="' + item.href + '" class="mob-bn-item' + isActive + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + item.icon + '</svg><span>' + item.label + '</span></a>';
    });
    // More button
    bnHtml += '<button class="mob-bn-item" id="moreNavBtn" onclick="document.getElementById(\'moreDrawer\').classList.toggle(\'open\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg><span>Thêm</span></button>';
    bnHtml += '</div></div>';

    var bnDiv = document.createElement('div');
    bnDiv.innerHTML = bnHtml;
    document.body.appendChild(bnDiv.firstElementChild);
  }

  // --- More Drawer ---
  if (!document.getElementById('moreDrawer')) {
    var drawerItems = [
      // --- Học cơ bản ---
      {href:'pronunciation.html', icon:'<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>', label:'Phát âm'},
      {href:'irregular-verbs.html', icon:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>', label:'Động từ BQT'},
      {href:'gerund-infinitive.html', icon:'<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>', label:'V-ing hay To V?'},
      {href:'prepositions.html', icon:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', label:'Cụm giới từ'},
      // --- Từ vựng ---
      {href:'synonyms.html', icon:'<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>', label:'Đồng/Trái nghĩa'},
      {href:'collocations.html', icon:'<circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/>', label:'Cụm từ đi cùng'},
      {href:'idioms.html', icon:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>', label:'Thành ngữ'},
      {href:'phrasal-verbs.html', icon:'<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>', label:'Cụm động từ'},
      {href:'confusing-words.html', icon:'<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>', label:'Từ hay nhầm'},
      {href:'word-formation.html', icon:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>', label:'Cấu tạo từ'},
      {href:'linking-words.html', icon:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>', label:'Từ nối'},
      // --- Kỹ năng ---
      {href:'skills.html', icon:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>', label:'Nghe Nói Đọc Viết'},
      {href:'reading-comprehension.html', icon:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="M6 8h2"/><path d="M6 12h2"/><path d="M16 8h2"/>', label:'Đọc hiểu'},
      {href:'listening.html', icon:'<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>', label:'Luyện nghe'},
      {href:'writing-checker.html', icon:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', label:'Kiểm tra bài viết'},
      {href:'conversation.html', icon:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', label:'Giao tiếp'},
      {href:'daily-challenge.html', icon:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/>', label:'Thử thách hàng ngày'},
      {href:'spaced-repetition.html', icon:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>', label:'Ôn tập lặp lại'},
      // --- IELTS ---
      {href:'ielts.html', icon:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C5.71 4 7 5.29 7 6.5V8"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C18.29 4 17 5.29 17 6.5V8"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>', label:'IELTS'},
      {href:'academic-words.html', icon:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', label:'570 từ học thuật'},
      {href:'ielts-writing-band9.html', icon:'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>', label:'Viết IELTS mẫu'},
      {href:'ielts-speaking-topics.html', icon:'<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/>', label:'Nói IELTS mẫu'},
      {href:'paraphrasing.html', icon:'<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>', label:'Diễn đạt lại'},
      {href:'mock-test.html', icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>', label:'Thi thử IELTS'},
      {href:'toeic.html', icon:'<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>', label:'Luyện thi TOEIC'},
      // --- Từ điển ---
      {href:'dictionary.html', icon:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', label:'Từ điển Anh-Việt'},
      {href:'dictionary-everyday.html', icon:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', label:'Từ điển Đời thường'},
      {href:'dictionary-everyday-2.html', icon:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/>', label:'Từ điển Đời thường 2'},
      {href:'dictionary-ielts.html', icon:'<circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>', label:'Từ điển IELTS'},
      {href:'dictionary-ielts-2.html', icon:'<circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><path d="M12 6v6l4 2"/>', label:'Từ điển IELTS 2'},
      // --- Chuyên ngành ---
      {href:'business-english.html', icon:'<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>', label:'Tiếng Anh thương mại'},
      {href:'it-english.html', icon:'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>', label:'Tiếng Anh IT'},
      {href:'medical-english.html', icon:'<path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>', label:'Tiếng Anh y tế'},
      {href:'legal-english.html', icon:'<line x1="12" y1="3" x2="12" y2="21"/><path d="M17.5 6.5l-11 11"/><path d="M6.5 6.5l11 11"/><circle cx="12" cy="12" r="2"/>', label:'Tiếng Anh pháp lý'},
      // --- Tiện ích ---
      {href:'notebook.html', icon:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>', label:'Sổ tay từ'},
      {href:'progress.html', icon:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>', label:'Tiến độ học'}
    ];
    var dHtml = '<div class="more-drawer" id="moreDrawer">';
    dHtml += '<div class="more-drawer-overlay" onclick="document.getElementById(\'moreDrawer\').classList.remove(\'open\')"></div>';
    dHtml += '<div class="more-drawer-sheet"><div class="more-drawer-handle" onclick="document.getElementById(\'moreDrawer\').classList.remove(\'open\')"><span></span></div>';
    dHtml += '<div class="more-drawer-grid">';
    drawerItems.forEach(function(item){
      dHtml += '<a href="' + item.href + '" class="md-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:22px;height:22px">' + item.icon + '</svg><span>' + item.label + '</span></a>';
    });
    // Theme button in drawer
    dHtml += '<button class="md-item" id="mdThemeBtn" onclick="document.getElementById(\'moreDrawer\').classList.remove(\'open\');var p=document.getElementById(\'themePanel\');if(p){p.style.display=\'block\';p.style.bottom=\'80px\';p.style.right=\'16px\';p.style.left=\'16px\';p.style.width=\'auto\';setTimeout(function(){p.style.opacity=\'1\';p.style.transform=\'translateY(0)\'},10)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:22px;height:22px"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg><span>Đổi giao diện</span></button>';
    dHtml += '</div></div></div>';

    var dDiv = document.createElement('div');
    dDiv.innerHTML = dHtml;
    document.body.appendChild(dDiv.firstElementChild);
  }

  // --- Scroll: hide/show bottom nav ---
  var nav = document.querySelector('.mob-bottom-nav');
  if (!nav) return;
  var lastY = 0, ticking = false;
  window.addEventListener('scroll', function(){
    if (!ticking) {
      requestAnimationFrame(function(){
        var y = window.scrollY;
        if (y > lastY && y > 100) nav.classList.add('ee-hidden');
        else nav.classList.remove('ee-hidden');
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }, {passive: true});
})();


// Robust Lucide icon initialization with retry
(function initLucideIcons(){
  function tryInit(){
    if(typeof lucide!=="undefined"&&lucide.createIcons){
      lucide.createIcons();
    } else {
      setTimeout(tryInit,200);
    }
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',tryInit);
  } else {
    tryInit();
  }
  window.addEventListener('load',function(){
    setTimeout(function(){if(typeof lucide!=="undefined")lucide.createIcons();},300);
  });
})();

// ==================== SELECT TO TRANSLATE ====================
(function(){
  var popup = document.createElement('div');
  popup.id = 'ee-translate-popup';
  popup.style.cssText = 'position:fixed;z-index:99999;display:none;background:rgba(11,26,30,0.97);backdrop-filter:blur(20px);border:1px solid rgba(100,216,165,0.2);border-radius:14px;padding:0;max-width:420px;min-width:200px;box-shadow:0 16px 48px rgba(0,0,0,0.5);font-family:"DM Sans",sans-serif;animation:eePopIn .2s ease-out;overflow:hidden;max-height:60vh;overflow-y:auto';
  document.body.appendChild(popup);

  var style = document.createElement('style');
  style.textContent = '@keyframes eePopIn{from{opacity:0;transform:scale(0.9) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}#ee-translate-popup .ee-tp-word{font-family:"Fraunces",serif;font-size:20px;color:#f5faf7;margin-bottom:2px}#ee-translate-popup .ee-tp-ipa{font-size:12px;color:#64d8a5;font-style:italic}#ee-translate-popup .ee-tp-vi{font-size:15px;color:#f5faf7;margin-top:8px;line-height:1.5}#ee-translate-popup .ee-tp-en-def{font-size:12px;color:#9ec0b2;margin-top:4px;font-style:italic;line-height:1.4}#ee-translate-popup .ee-tp-loading{text-align:center;padding:16px;color:#9ec0b2;font-size:13px}#ee-translate-popup .ee-tp-header{display:flex;align-items:center;justify-content:space-between;gap:8px}#ee-translate-popup .ee-tp-actions{display:flex;align-items:center;gap:8px}#ee-translate-popup .ee-tp-speak{width:32px;height:32px;border-radius:50%;background:rgba(100,216,165,0.12);border:1px solid rgba(100,216,165,0.25);color:#64d8a5;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}#ee-translate-popup .ee-tp-speak:hover{background:rgba(100,216,165,0.25);transform:scale(1.1)}#ee-translate-popup .ee-tp-save{height:32px;border-radius:999px;background:rgba(123,110,246,0.14);border:1px solid rgba(123,110,246,0.28);color:#d8ede3;cursor:pointer;font-size:12px;padding:0 12px;display:flex;align-items:center;justify-content:center;transition:all .2s;white-space:nowrap}#ee-translate-popup .ee-tp-save:hover{background:rgba(123,110,246,0.24)}#ee-translate-popup .ee-tp-save.saved{background:rgba(100,216,165,0.16);border-color:rgba(100,216,165,0.3);color:#64d8a5}#ee-translate-popup .ee-tp-meta{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px}#ee-translate-popup .ee-tp-link{font-size:11px;color:#a78bfa;text-decoration:none}#ee-translate-popup .ee-tp-link:hover{text-decoration:underline}#ee-translate-popup .ee-tp-body{padding:14px 16px}#ee-translate-popup .ee-tp-close{position:absolute;top:6px;right:8px;background:none;border:none;color:#9ec0b2;cursor:pointer;font-size:18px;line-height:1;padding:2px 6px;border-radius:4px;transition:color .15s}#ee-translate-popup .ee-tp-close:hover{color:#f5faf7}#ee-translate-popup .ee-tp-type{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:500;margin-right:4px}#ee-translate-popup .ee-tp-type-n{background:rgba(100,216,165,0.15);color:#64d8a5}#ee-translate-popup .ee-tp-type-v{background:rgba(123,110,246,0.15);color:#a78bfa}#ee-translate-popup .ee-tp-type-adj{background:rgba(244,132,95,0.15);color:#f4845f}#ee-translate-popup .ee-tp-type-adv{background:rgba(107,203,119,0.15);color:#6bcb77}';
  document.head.appendChild(style);

  var debounceTimer;
  var isTranslating = false;
  var NOTEBOOK_KEY = 'ee_notebook';

  function getNotebook(){
    try{return JSON.parse(localStorage.getItem(NOTEBOOK_KEY) || '[]');}
    catch(e){return [];}
  }

  function setNotebook(items){
    localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(items));
  }

  function isNotebookSaved(word){
    var target = (word || '').toLowerCase();
    return getNotebook().some(function(item){ return (item.word || '').toLowerCase() === target; });
  }

  function saveNotebookWord(payload){
    if(!payload || !payload.word) return false;
    var items = getNotebook();
    var key = payload.word.toLowerCase();
    var existingIdx = -1;
    for(var i = 0; i < items.length; i++){
      if((items[i].word || '').toLowerCase() === key){ existingIdx = i; break; }
    }
    var existing = existingIdx > -1 ? items[existingIdx] : null;
    var item = {
      word: payload.word,
      vi: payload.vi || (existing && existing.vi) || '',
      ipa: payload.ipa || (existing && existing.ipa) || '',
      types: (payload.types && payload.types.length ? payload.types : (existing && existing.types) || []),
      sourcePage: window.location.pathname.split('/').pop() || 'index.html',
      sourceTitle: document.title || '',
      savedAt: new Date().toISOString()
    };
    if(existingIdx > -1) items.splice(existingIdx, 1);
    items.unshift(item);
    setNotebook(items);
    return true;
  }

  function hidePopup(){
    popup.style.display = 'none';
    isTranslating = false;
  }

  function showPopup(x, y){
    popup.style.display = 'block';
    var pw = 320, ph = 200;
    var left = Math.min(x, window.innerWidth - pw - 12);
    var top = y + 10;
    if(top + ph > window.innerHeight) top = y - ph - 10;
    if(left < 12) left = 12;
    if(top < 12) top = 12;
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
  }

  function processSelection(){
    var sel = window.getSelection();
    if(!sel || sel.rangeCount === 0) return;
    var text = sel.toString().trim();

    // Ignore clicks inside popup
    try{ if(popup.contains(sel.anchorNode)) return; }catch(e){}

    // Hide if no/short selection
    if(!text || text.length < 2 || text.length > 5000){
      if(!isTranslating) hidePopup();
      return;
    }

    // Avoid translating Vietnamese text (common chars)
    if(/[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(text)) return;

    isTranslating = true;

    var range = sel.getRangeAt(0);
    var rect = range.getBoundingClientRect();

    // Show loading
    popup.innerHTML = '<div class="ee-tp-body"><button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button><div class="ee-tp-loading"><div style="display:inline-block;width:16px;height:16px;border:2px solid rgba(100,216,165,0.2);border-top-color:#64d8a5;border-radius:50%;animation:spin .6s linear infinite"></div><div style="margin-top:6px">Đang dịch...</div></div></div>';
    showPopup(rect.left, rect.bottom);

    var isSingleWord = text.split(/\s+/).length === 1 && /^[a-zA-Z'-]+$/.test(text);
    if(isSingleWord){
      lookupAndTranslate(text);
    } else {
      translatePhrase(text);
    }
  }

  // Desktop: mouseup
  document.addEventListener('mouseup', function(e){
    if(popup.contains(e.target)) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(processSelection, 150);
  });

  // Mobile: touchend + selectionchange
  document.addEventListener('touchend', function(e){
    if(popup.contains(e.target)) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(processSelection, 400);
  });
  document.addEventListener('selectionchange', function(){
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function(){
      var sel = window.getSelection();
      var text = sel ? sel.toString().trim() : '';
      if(text && text.length >= 2 && text.length <= 5000){
        processSelection();
      }
    }, 700);
  });

  // Local fallback dictionary for common words
  var LOCAL_VI = {pronoun:'đại từ',noun:'danh từ',verb:'động từ',adjective:'tính từ',adverb:'trạng từ',preposition:'giới từ',conjunction:'liên từ',interjection:'thán từ',article:'mạo từ',determiner:'từ hạn định',grammar:'ngữ pháp',vocabulary:'từ vựng',sentence:'câu',paragraph:'đoạn văn',essay:'bài luận',tense:'thì',subject:'chủ ngữ',object:'tân ngữ',predicate:'vị ngữ',clause:'mệnh đề',phrase:'cụm từ',prefix:'tiền tố',suffix:'hậu tố',synonym:'từ đồng nghĩa',antonym:'từ trái nghĩa',homophone:'từ đồng âm',idiom:'thành ngữ',collocation:'cụm từ đi kèm',pronunciation:'phát âm',consonant:'phụ âm',vowel:'nguyên âm',syllable:'âm tiết',stress:'trọng âm',intonation:'ngữ điệu',fluency:'sự lưu loát',comprehension:'sự hiểu',listening:'nghe',speaking:'nói',reading:'đọc',writing:'viết',translate:'dịch',dictionary:'từ điển',example:'ví dụ',definition:'định nghĩa',meaning:'nghĩa',word:'từ',letter:'chữ cái',alphabet:'bảng chữ cái',capital:'viết hoa',lowercase:'viết thường',plural:'số nhiều',singular:'số ít',countable:'đếm được',uncountable:'không đếm được',regular:'có quy tắc',irregular:'bất quy tắc',active:'chủ động',passive:'bị động',positive:'khẳng định',negative:'phủ định',question:'câu hỏi',answer:'câu trả lời',correct:'đúng',incorrect:'sai',difficult:'khó',easy:'dễ',important:'quan trọng',necessary:'cần thiết',possible:'có thể',impossible:'không thể',beautiful:'đẹp',interesting:'thú vị',boring:'nhàm chán',expensive:'đắt',cheap:'rẻ',modern:'hiện đại',traditional:'truyền thống',popular:'phổ biến',common:'phổ thông',rare:'hiếm',similar:'tương tự',different:'khác biệt',specific:'cụ thể',general:'chung',basic:'cơ bản',advanced:'nâng cao',practice:'luyện tập',exercise:'bài tập',test:'bài kiểm tra',exam:'kỳ thi',score:'điểm',level:'cấp độ',beginner:'người mới bắt đầu',intermediate:'trung cấp',expert:'chuyên gia',student:'học sinh',teacher:'giáo viên',lesson:'bài học',course:'khóa học',skill:'kỹ năng',knowledge:'kiến thức',experience:'kinh nghiệm',success:'thành công',failure:'thất bại',mistake:'lỗi',improve:'cải thiện',develop:'phát triển',understand:'hiểu',remember:'nhớ',forget:'quên',learn:'học',teach:'dạy',study:'học tập',review:'ôn tập',repeat:'lặp lại',compare:'so sánh',describe:'mô tả',explain:'giải thích',suggest:'gợi ý',recommend:'đề xuất',agree:'đồng ý',disagree:'không đồng ý',opinion:'ý kiến',fact:'sự thật',reason:'lý do',result:'kết quả',cause:'nguyên nhân',effect:'tác động',advantage:'lợi thế',disadvantage:'bất lợi',solution:'giải pháp',problem:'vấn đề',challenge:'thử thách',opportunity:'cơ hội',environment:'môi trường',society:'xã hội',culture:'văn hóa',education:'giáo dục',technology:'công nghệ',communication:'giao tiếp',relationship:'mối quan hệ',community:'cộng đồng',government:'chính phủ',economy:'kinh tế',health:'sức khỏe',research:'nghiên cứu',information:'thông tin',evidence:'bằng chứng',data:'dữ liệu',analysis:'phân tích',conclusion:'kết luận',introduction:'giới thiệu',summary:'tóm tắt',topic:'chủ đề',theme:'chủ đề',argument:'luận điểm',perspective:'quan điểm',approach:'cách tiếp cận',method:'phương pháp',strategy:'chiến lược',process:'quy trình',system:'hệ thống',structure:'cấu trúc',pattern:'mẫu',function:'chức năng',purpose:'mục đích',goal:'mục tiêu',objective:'mục tiêu',progress:'tiến bộ',achievement:'thành tựu'};

  // Single word lookup
  function lookupAndTranslate(word){
    var wordLower = word.toLowerCase();
    var dictPromise = fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(wordLower))
      .then(function(r){ return r.ok ? r.json() : null; })
      .catch(function(){ return null; });

    var translatePromise = fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(word) + '&langpair=en|vi')
      .then(function(r){ return r.json(); })
      .catch(function(){ return null; });

    Promise.all([dictPromise, translatePromise]).then(function(results){
      var dictData = results[0];
      var trData = results[1];

      // Start with local dictionary (instant, reliable)
      var viWord = LOCAL_VI[wordLower] || '';

      // Try API translation — only use if it actually contains Vietnamese characters
      var viChars = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]/;
      if(trData && trData.responseData && trData.responseData.translatedText){
        var apiVi = trData.responseData.translatedText;
        // Only accept if: different from input AND contains Vietnamese diacritics
        if(apiVi.toLowerCase() !== wordLower && viChars.test(apiVi)){
          viWord = apiVi; // Real Vietnamese translation from API
        } else if(!viWord){
          // API failed — try matches for Vietnamese results
          if(trData.matches && trData.matches.length > 0){
            for(var i = 0; i < trData.matches.length; i++){
              var m = trData.matches[i];
              if(m.translation && m.translation.toLowerCase() !== wordLower && viChars.test(m.translation)){
                viWord = m.translation; break;
              }
            }
          }
        }
      }

      // Dictionary extras — only IPA and word types (no English def/example)
      var ipa = '', types = [];
      if(dictData && dictData[0]){
        var d = dictData[0];
        var phonetics = d.phonetics || [];
        ipa = d.phonetic || (phonetics.find(function(p){return p.text;})||{}).text || '';
        var meanings = d.meanings || [];
        types = meanings.map(function(m){
          return {noun:'n',verb:'v',adjective:'adj',adverb:'adv'}[m.partOfSpeech] || m.partOfSpeech;
        });
      }

      // If no translation at all, show error
      if(!viWord && !ipa){
        popup.innerHTML = '<div class="ee-tp-body"><button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button><div style="color:#9ec0b2;font-size:13px">Không tìm thấy nghĩa cho "<b style="color:var(--text)">' + word + '</b>"</div></div>';
        isTranslating = false;
        return;
      }

      var typeMap = {n:'ee-tp-type-n',v:'ee-tp-type-v',adj:'ee-tp-type-adj',adv:'ee-tp-type-adv'};
      var typeHtml = types.slice(0,3).map(function(t){
        return '<span class="ee-tp-type ' + (typeMap[t]||'ee-tp-type-n') + '">' + t + '</span>';
      }).join('');

      var savedCls = isNotebookSaved(word) ? ' saved' : '';
      var saveLabel = isNotebookSaved(word) ? 'Đã lưu' : 'Lưu từ';
      var saveBtn = '<button class="ee-tp-save'+savedCls+'" id="eeTpSaveBtn">' + saveLabel + '</button>';
      var speakBtn = '<button class="ee-tp-speak" onclick="event.stopPropagation();var u=new SpeechSynthesisUtterance(\'' + word.replace(/'/g,"\\'") + '\');u.lang=\'en-US\';u.rate=0.85;speechSynthesis.cancel();speechSynthesis.speak(u)" title="Nghe phát âm">&#9654;</button>';

      popup.innerHTML = '<div class="ee-tp-body">' +
        '<button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button>' +
        '<div class="ee-tp-header"><div><div class="ee-tp-word">' + word + '</div>' +
        (ipa ? '<div class="ee-tp-ipa">' + ipa + '</div>' : '') +
        (typeHtml ? '<div style="margin-top:4px">' + typeHtml + '</div>' : '') +
        '</div><div class="ee-tp-actions">' + saveBtn + speakBtn + '</div></div>' +
        (viWord ? '<div class="ee-tp-vi">' + viWord + '</div>' : '') +
        '<div class="ee-tp-meta"><span style="font-size:11px;color:#9ec0b2">Lưu vào sổ tay để ôn lại sau</span><a class="ee-tp-link" href="notebook.html">Mở sổ tay</a></div>' +
        '</div>';
      var saveEl = popup.querySelector('#eeTpSaveBtn');
      if(saveEl){
        var savePayload = {
          word: word,
          vi: viWord || '',
          ipa: ipa || '',
          types: types || []
        };
        saveEl.addEventListener('click', function(event){
          event.stopPropagation();
          var ok = saveNotebookWord(savePayload);
          if(ok){
            saveEl.classList.add('saved');
            saveEl.textContent = 'Đã lưu';
          }
        });
      }
      isTranslating = false;
    }).catch(function(){
      popup.innerHTML = '<div class="ee-tp-body"><button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button><div style="color:#9ec0b2;font-size:13px">Không thể dịch. Kiểm tra kết nối mạng.</div></div>';
      isTranslating = false;
    });
  }

  // Phrase translate — supports long text by splitting into chunks
  function translatePhrase(text){
    // MyMemory API limit is ~500 chars, split at sentence boundaries
    var chunks = [];
    if(text.length <= 500){
      chunks = [text];
    } else {
      var sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      var current = '';
      for(var i = 0; i < sentences.length; i++){
        if((current + sentences[i]).length > 480 && current){
          chunks.push(current.trim());
          current = sentences[i];
        } else {
          current += sentences[i];
        }
      }
      if(current.trim()) chunks.push(current.trim());
    }

    // Translate all chunks in parallel
    var promises = chunks.map(function(chunk){
      return fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(chunk) + '&langpair=en|vi')
        .then(function(r){return r.json();})
        .then(function(data){
          if(data.responseData && data.responseData.translatedText){
            var vi = data.responseData.translatedText;
            if(vi.toLowerCase() === chunk.toLowerCase() && data.matches && data.matches.length > 0){
              for(var j = 0; j < data.matches.length; j++){
                if(data.matches[j].translation && data.matches[j].translation.toLowerCase() !== chunk.toLowerCase()){
                  return data.matches[j].translation;
                }
              }
            }
            return vi;
          }
          return chunk;
        })
        .catch(function(){ return chunk; });
    });

    Promise.all(promises).then(function(results){
      var vi = results.join(' ');
      var preview = text.length > 120 ? text.substring(0,120) + '...' : text;
      var speakBtn = text.length <= 300 ? '<button class="ee-tp-speak" onclick="event.stopPropagation();var u=new SpeechSynthesisUtterance(\'' + text.replace(/'/g,"\\'").replace(/\n/g,' ').substring(0,300) + '\');u.lang=\'en-US\';u.rate=0.85;speechSynthesis.cancel();speechSynthesis.speak(u)" title="Nghe phát âm">&#9654;</button>' : '';
      popup.innerHTML = '<div class="ee-tp-body">' +
        '<button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button>' +
        '<div style="font-size:12px;color:#64d8a5;margin-bottom:6px">' + chunks.length + ' c\u00e2u \u00b7 ' + text.length + ' k\u00fd t\u1ef1</div>' +
        '<div class="ee-tp-word" style="font-size:13px;line-height:1.5;word-break:break-word;color:#d8ede3;max-height:100px;overflow-y:auto;margin-bottom:8px;padding:8px;background:rgba(255,255,255,0.03);border-radius:8px">' + preview + '</div>' +
        speakBtn +
        '<div class="ee-tp-vi" style="line-height:1.6">' + vi + '</div>' +
        '</div>';
      isTranslating = false;
    }).catch(function(){
      popup.innerHTML = '<div class="ee-tp-body"><button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button><div style="color:#9ec0b2;font-size:13px">Kh\u00f4ng th\u1ec3 d\u1ecbch. Ki\u1ec3m tra k\u1ebft n\u1ed1i m\u1ea1ng.</div></div>';
      isTranslating = false;
    });
  }

  // Hide on click outside
  document.addEventListener('mousedown', function(e){
    if(!popup.contains(e.target)){
      hidePopup();
    }
  });

  // Hide on scroll
  var scrollHideTimer;
  window.addEventListener('scroll', function(){
    clearTimeout(scrollHideTimer);
    scrollHideTimer = setTimeout(hidePopup, 100);
  },{passive:true});

})();

/* === GLOBAL SEARCH (Ctrl+K) === */
(function(){
  var PAGES=[
    {title:'Trang chủ',desc:'EasyEnglish — Tự học tiếng Anh từ A-Z',url:'index.html',tags:'home trang chu'},
    {title:'Ngữ pháp',desc:'12 thì, câu điều kiện, bị động, mệnh đề quan hệ',url:'grammar.html',tags:'grammar ngu phap thi tense'},
    {title:'Từ vựng',desc:'3000+ từ vựng theo chủ đề với flashcard',url:'vocabulary.html',tags:'vocabulary tu vung flashcard'},
    {title:'4 Kỹ năng',desc:'Nghe Nói Đọc Viết',url:'skills.html',tags:'skills ky nang nghe noi doc viet'},
    {title:'Đọc hiểu',desc:'Bài đọc hiểu có câu hỏi tương tác',url:'reading-comprehension.html',tags:'reading doc hieu'},
    {title:'Luyện nghe',desc:'Nghe audio và trả lời câu hỏi',url:'listening.html',tags:'listening luyen nghe'},
    {title:'Kiểm tra bài viết',desc:'AI kiểm tra lỗi ngữ pháp, chính tả',url:'writing-checker.html',tags:'writing viet kiem tra'},
    {title:'Từ nối',desc:'Linking words: however, therefore, moreover...',url:'linking-words.html',tags:'linking words tu noi'},
    {title:'Giao tiếp',desc:'Hội thoại hằng ngày',url:'conversation.html',tags:'conversation giao tiep hoi thoai'},
    {title:'Bài tập',desc:'Quiz ngữ pháp, từ vựng',url:'quiz.html',tags:'quiz bai tap'},
    {title:'Thử thách hàng ngày',desc:'10 câu mỗi ngày, streak tracking',url:'daily-challenge.html',tags:'daily challenge thu thach hang ngay'},
    {title:'Ôn tập lặp lại',desc:'Spaced repetition flashcard',url:'spaced-repetition.html',tags:'spaced repetition on tap'},
    {title:'IELTS Guide',desc:'Hướng dẫn luyện thi IELTS',url:'ielts.html',tags:'ielts guide huong dan'},
    {title:'570 từ học thuật',desc:'Academic Word List',url:'academic-words.html',tags:'academic words hoc thuat'},
    {title:'Viết IELTS mẫu',desc:'Band 9 writing samples',url:'ielts-writing-band9.html',tags:'ielts writing viet mau'},
    {title:'Nói IELTS mẫu',desc:'Speaking topics & samples',url:'ielts-speaking-topics.html',tags:'ielts speaking noi'},
    {title:'Paraphrasing',desc:'Diễn đạt lại câu',url:'paraphrasing.html',tags:'paraphrasing dien dat lai'},
    {title:'Thi thử IELTS',desc:'Mock test IELTS',url:'mock-test.html',tags:'mock test thi thu ielts'},
    {title:'Luyện thi TOEIC',desc:'Từ vựng, ngữ pháp, Part 5',url:'toeic.html',tags:'toeic luyen thi'},
    {title:'Từ điển Anh-Việt',desc:'Tra từ nhanh',url:'dictionary.html',tags:'dictionary tu dien anh viet'},
    {title:'Từ điển Đời thường',desc:'Slang, informal English',url:'dictionary-everyday.html',tags:'everyday dictionary doi thuong slang'},
    {title:'Từ điển IELTS',desc:'Từ vựng IELTS band 7+',url:'dictionary-ielts.html',tags:'ielts dictionary tu dien'},
    {title:'Sổ tay từ vựng',desc:'Lưu các từ đã bôi đen để ôn lại',url:'notebook.html',tags:'notebook so tay tu vung luu tu'},
    {title:'Từ hay nhầm',desc:'affect/effect, advice/advise...',url:'confusing-words.html',tags:'confusing words tu nham lan'},
    {title:'Idioms',desc:'200+ thành ngữ tiếng Anh',url:'idioms.html',tags:'idioms thanh ngu'},
    {title:'Collocations',desc:'Phrasal verbs & collocations',url:'collocations.html',tags:'collocations phrasal verbs'},
    {title:'Đồng nghĩa / Trái nghĩa',desc:'Synonyms & Antonyms',url:'synonyms.html',tags:'synonyms antonyms dong nghia trai nghia'},
    {title:'Động từ bất quy tắc',desc:'Irregular verbs',url:'irregular-verbs.html',tags:'irregular verbs dong tu bat quy tac'},
    {title:'Giới từ',desc:'Preposition combinations',url:'preposition-combinations.html',tags:'prepositions gioi tu'},
    {title:'Cấu tạo từ',desc:'Word formation: prefix, suffix, root',url:'word-formation.html',tags:'word formation cau tao tu prefix suffix'},
    {title:'V-ing hay To V?',desc:'Gerund vs Infinitive — Khi nào dùng V-ing, khi nào dùng To V',url:'gerund-infinitive.html',tags:'gerund infinitive ving to v danh động từ'},
    {title:'Phát âm',desc:'Pronunciation guide',url:'pronunciation.html',tags:'pronunciation phat am'},
    {title:'Tiếng Anh thương mại',desc:'Business English: email, hội thoại',url:'business-english.html',tags:'business english thuong mai doanh nghiep'},
    {title:'Tiếng Anh IT',desc:'Thuật ngữ lập trình, DevOps',url:'it-english.html',tags:'it english lap trinh devops'},
    {title:'Tiếng Anh y tế',desc:'Medical English: bệnh viện, thuốc',url:'medical-english.html',tags:'medical english y te benh vien'},
    {title:'Tiếng Anh pháp lý',desc:'Legal English: hợp đồng, tòa án',url:'legal-english.html',tags:'legal english phap ly hop dong'}
  ];

  // Inject search CSS
  var ss=document.createElement('style');
  ss.textContent=
    '#gsOverlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);z-index:99998;display:none;align-items:flex-start;justify-content:center;padding-top:min(20vh,120px)}'+
    '#gsOverlay.show{display:flex}'+
    '#gsBox{background:var(--card,#12282e);border:0.5px solid var(--border);border-radius:16px;width:min(560px,92vw);max-height:70vh;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.4);animation:gsIn .2s ease-out}'+
    '@keyframes gsIn{from{opacity:0;transform:translateY(-12px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}'+
    '#gsInput{width:100%;padding:16px 20px 16px 44px;border:none;background:transparent;color:var(--text,#f5faf7);font-size:16px;font-family:DM Sans,sans-serif;outline:none}'+
    '#gsInput::placeholder{color:var(--text3,#84a99a)}'+
    '#gsInputWrap{position:relative;border-bottom:0.5px solid var(--border)}'+
    '#gsInputWrap svg{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--text3)}'+
    '#gsResults{max-height:calc(70vh - 60px);overflow-y:auto;padding:8px}'+
    '.gs-item{padding:12px 16px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:background .1s}'+
    '.gs-item:hover,.gs-item.active{background:rgba(100,216,165,0.08)}'+
    '.gs-item-title{font-size:14px;font-weight:500;color:var(--text)}'+
    '.gs-item-desc{font-size:12px;color:var(--text3);margin-top:2px}'+
    '.gs-item-icon{width:32px;height:32px;border-radius:8px;background:rgba(100,216,165,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0}'+
    '.gs-empty{padding:24px;text-align:center;color:var(--text3);font-size:14px}'+
    '#gsHint{display:flex;gap:12px;padding:8px 16px;border-top:0.5px solid var(--border);font-size:11px;color:var(--text3)}'+
    '#gsHint kbd{padding:2px 6px;border-radius:4px;background:var(--card2);border:0.5px solid var(--border);font-size:11px;font-family:monospace}';
  document.head.appendChild(ss);

  // Build overlay
  var ov=document.createElement('div');ov.id='gsOverlay';
  ov.innerHTML=
    '<div id="gsBox">'+
      '<div id="gsInputWrap"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><input id="gsInput" type="text" placeholder="Tìm trang, bài học... (Ctrl+K)" autocomplete="off"></div>'+
      '<div id="gsResults"></div>'+
      '<div id="gsHint"><span><kbd>↑↓</kbd> chọn</span><span><kbd>Enter</kbd> mở</span><span><kbd>Esc</kbd> đóng</span></div>'+
    '</div>';
  document.body.appendChild(ov);

  var inp=document.getElementById('gsInput');
  var res=document.getElementById('gsResults');
  var activeIdx=-1;

  function openSearch(){ov.classList.add('show');inp.value='';inp.focus();renderResults('');activeIdx=-1;}
  function closeSearch(){ov.classList.remove('show');}

  function renderResults(q){
    q=q.toLowerCase().trim();
    var items=q?PAGES.filter(function(p){
      return p.title.toLowerCase().indexOf(q)>-1||p.desc.toLowerCase().indexOf(q)>-1||p.tags.indexOf(q)>-1;
    }):PAGES;
    if(!items.length){res.innerHTML='<div class="gs-empty">Không tìm thấy kết quả</div>';return;}
    res.innerHTML=items.map(function(p,i){
      return '<a href="'+p.url+'" class="gs-item'+(i===activeIdx?' active':'')+'" data-idx="'+i+'">'+
        '<div class="gs-item-icon"><i data-lucide="file-text" style="width:16px;height:16px;color:var(--accent)"></i></div>'+
        '<div><div class="gs-item-title">'+p.title+'</div><div class="gs-item-desc">'+p.desc+'</div></div></a>';
    }).join('');
    if(typeof lucide!=='undefined')lucide.createIcons();
  }

  inp.addEventListener('input',function(){activeIdx=-1;renderResults(this.value);});
  
  inp.addEventListener('keydown',function(e){
    var items=res.querySelectorAll('.gs-item');
    if(e.key==='ArrowDown'){e.preventDefault();activeIdx=Math.min(activeIdx+1,items.length-1);items.forEach(function(el,i){el.classList.toggle('active',i===activeIdx);});if(items[activeIdx])items[activeIdx].scrollIntoView({block:'nearest'});}
    else if(e.key==='ArrowUp'){e.preventDefault();activeIdx=Math.max(activeIdx-1,0);items.forEach(function(el,i){el.classList.toggle('active',i===activeIdx);});if(items[activeIdx])items[activeIdx].scrollIntoView({block:'nearest'});}
    else if(e.key==='Enter'&&items[activeIdx]){e.preventDefault();items[activeIdx].click();}
    else if(e.key==='Escape'){closeSearch();}
  });

  ov.addEventListener('click',function(e){if(e.target===ov)closeSearch();});

  document.addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();ov.classList.contains('show')?closeSearch():openSearch();}
    if(e.key==='Escape'&&ov.classList.contains('show'))closeSearch();
  });

  // Expose for nav search button
  window.openGlobalSearch=openSearch;
})();
