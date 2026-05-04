/* === EasyEnglish Common JS === */

/* === LORDICON ANIMATED ICONS === */
(function(){
  if(!document.querySelector('script[src*="lordicon"]')){
    var s=document.createElement('script');
    s.src='https://cdn.lordicon.com/lordicon.js';
    s.async=true;
    document.head.appendChild(s);
  }
})();

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

// Nav dropdown toggle — now defined in nav.js
// Fallback in case nav.js hasn't loaded yet
if(typeof window.toggleDrop === 'undefined'){
  window.toggleDrop = function(el){
    var drop=el.closest('.nav-drop');
    var wasOpen=drop.classList.contains('open');
    document.querySelectorAll('.nav-drop.open').forEach(function(d){d.classList.remove('open')});
    if(!wasOpen) drop.classList.add('open');
  };
}

// Back to top + reading progress + bottom nav hide (merged into single scroll listener)
var _scrollTicking = false;
var _lastScrollY = 0;
window.addEventListener('scroll',function(){
  if(!_scrollTicking){
    requestAnimationFrame(function(){
      var st=window.scrollY, h=document.documentElement.scrollHeight-window.innerHeight;
      // Back to top button
      var btn=document.getElementById('backTop');
      if(btn){if(st>400)btn.classList.add('show');else btn.classList.remove('show');}
      // Reading progress bar
      var bar=document.getElementById('readProgress');
      if(bar&&h>0)bar.style.width=Math.min(100,st/h*100)+'%';
      // Bottom nav hide/show on scroll
      var bnav=document.querySelector('.mob-bottom-nav');
      if(bnav){
        if(st>_lastScrollY&&st>100)bnav.classList.add('ee-hidden');
        else bnav.classList.remove('ee-hidden');
      }
      _lastScrollY=st;
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
    var shortNavItems = window.EE_SHORT_NAV_ITEMS || [
      {href:'index.html', icon:'home', label:'Trang chủ'},
      {href:'ngu-phap.html', icon:'book-open', label:'Ngữ pháp'},
      {href:'tu-vung.html', icon:'pencil', label:'Từ vựng'},
      {href:'bai-tap.html', icon:'help-circle', label:'Bài tập'},
      {href:'lo-trinh-hoc.html', icon:'map', label:'Lộ trình'}
    ];
    var lordiconMap = {
      'home':'https://cdn.lordicon.com/wmwqvixz.json',
      'book-open':'https://cdn.lordicon.com/wxnxiano.json',
      'pencil':'https://cdn.lordicon.com/vdjwmfqs.json',
      'help-circle':'https://cdn.lordicon.com/aycieyht.json',
      'map':'https://cdn.lordicon.com/ofwpzftr.json'
    };
    var bnItems = [];
    shortNavItems.forEach(function(item){
      if(item.href === 'index.html'){
        bnItems.push({href:item.href, icon:'home', label:item.label});
      } else {
        var found = null;
        if(window.EE_NAV_FLAT){
          for(var i=0;i<window.EE_NAV_FLAT.length;i++){
            if(window.EE_NAV_FLAT[i].href===item.href){found=window.EE_NAV_FLAT[i];break;}
          }
        }
        bnItems.push({href:item.href, icon:found?found.icon:item.icon, label:item.label});
      }
    });
    var shortLabels = {'Ngữ pháp nền tảng':'Ngữ pháp', 'Học từ vựng':'Học từ vựng', 'Bài tập trắc nghiệm':'Bài tập'};
    var bnHtml = '<div class="mob-bottom-nav"><div class="mob-bottom-nav-inner">';
    bnItems.forEach(function(item){
      var isActive = path === item.href ? ' active' : '';
      var iconSrc = lordiconMap[item.icon] || lordiconMap['home'];
      var trig = isActive ? 'loop' : 'hover';
      var accentColor = isActive ? '#64d8a5' : '#9ec0b2';
      var lbl = shortLabels[item.label] || item.label;
      bnHtml += '<a href="' + item.href + '" class="mob-bn-item' + isActive + '"><div class="bn-icon-wrap"><lord-icon src="' + iconSrc + '" trigger="' + trig + '" delay="2000" colors="primary:' + accentColor + '" style="width:26px;height:26px"></lord-icon></div><span>' + lbl + '</span></a>';
    });
    // More button
    bnHtml += '<button class="mob-bn-item" id="moreNavBtn" onclick="document.getElementById(\'moreDrawer\').classList.toggle(\'open\')"><div class="bn-icon-wrap"><lord-icon src="https://cdn.lordicon.com/ofwpzftr.json" trigger="hover" colors="primary:#9ec0b2" style="width:26px;height:26px"></lord-icon></div><span>Thêm</span></button>';
    bnHtml += '</div></div>';

    var bnDiv = document.createElement('div');
    bnDiv.innerHTML = bnHtml;
    document.body.appendChild(bnDiv.firstElementChild);
  }

  // --- More Drawer (grouped accordion) ---
  if (!document.getElementById('moreDrawer')) {
    var sharedNavItems = window.EE_NAV_ITEMS;
    var groupIcons = {'Ngữ pháp':'book-open','Từ vựng':'pencil','4 kỹ năng':'layers','IELTS & TOEIC':'trophy','Từ điển':'book','Chuyên ngành':'briefcase','Tiện ích':'settings'};

    var dHtml = '<div class="more-drawer" id="moreDrawer">';
    dHtml += '<div class="more-drawer-overlay" onclick="document.getElementById(\'moreDrawer\').classList.remove(\'open\')"></div>';
    dHtml += '<div class="more-drawer-sheet">';
    dHtml += '<div class="more-drawer-handle" onclick="document.getElementById(\'moreDrawer\').classList.remove(\'open\')"><span></span></div>';

    // Quick Actions
    dHtml += '<div class="md-quick">';
    dHtml += '<a href="tien-do.html" class="md-quick-btn"><i data-lucide="bar-chart-3" style="width:18px;height:18px"></i><span>Tiến độ</span></a>';
    dHtml += '<a href="so-tay.html" class="md-quick-btn"><i data-lucide="bookmark" style="width:18px;height:18px"></i><span>Sổ tay</span></a>';
    dHtml += '<button class="md-quick-btn" onclick="document.getElementById(\'moreDrawer\').classList.remove(\'open\');var p=document.getElementById(\'themePanel\');if(p){p.style.display=\'block\';p.style.bottom=\'100px\';p.style.right=\'16px\';p.style.left=\'16px\';p.style.width=\'auto\';setTimeout(function(){p.style.opacity=\'1\';p.style.transform=\'translateY(0)\'},10)}"><i data-lucide="palette" style="width:18px;height:18px"></i><span>Giao diện</span></button>';
    dHtml += '<a href="dat-muc-tieu.html" class="md-quick-btn"><i data-lucide="target" style="width:18px;height:18px"></i><span>Mục tiêu</span></a>';
    dHtml += '</div>';

    // Grouped accordion
    dHtml += '<div class="md-groups">';
    if (sharedNavItems) {
      for (var group in sharedNavItems) {
        if (!sharedNavItems.hasOwnProperty(group)) continue;
        var items = sharedNavItems[group];
        var gIcon = groupIcons[group] || 'folder';
        var count = items.length;
        dHtml += '<div class="md-group">';
        dHtml += '<button class="md-group-btn" onclick="toggleDrawerGroup(this)"><span class="md-group-left"><i data-lucide="' + gIcon + '" style="width:18px;height:18px"></i> ' + group + '</span><span class="md-group-right"><span class="md-count">' + count + '</span><i data-lucide="chevron-down" style="width:14px;height:14px;transition:transform .2s"></i></span></button>';
        dHtml += '<div class="md-group-items">';
        items.forEach(function(item){
          var isAct = path === item.href ? ' md-active' : '';
          dHtml += '<a href="' + item.href + '" class="md-link' + isAct + '"><i data-lucide="' + item.icon + '" style="width:16px;height:16px"></i><span>' + item.text + '</span></a>';
        });
        dHtml += '</div></div>';
      }
    }
    dHtml += '</div>';

    dHtml += '</div></div>';

    var dDiv = document.createElement('div');
    dDiv.innerHTML = dHtml;
    document.body.appendChild(dDiv.firstElementChild);

    // Accordion toggle
    window.toggleDrawerGroup = function(btn){
      var items = btn.nextElementSibling;
      var isOpen = btn.classList.contains('md-group-open');
      // Close all
      document.querySelectorAll('.md-group-btn.md-group-open').forEach(function(b){
        b.classList.remove('md-group-open');
        b.nextElementSibling.style.maxHeight = '0';
      });
      // Toggle clicked
      if(!isOpen){
        btn.classList.add('md-group-open');
        items.style.maxHeight = items.scrollHeight + 'px';
      }
    };
  }

  // Scroll hide/show for bottom nav is now handled by the merged scroll listener above
})();

/* === COLLAPSIBLE SIDEBAR (universal) === */
/* Handles both .sidebar-title and .sb-label heading classes */
(function(){
  var sidebar = document.querySelector('.sidebar');
  if(!sidebar) return;

  // Detect which heading class is used
  var titles = sidebar.querySelectorAll('.sidebar-title');
  if(!titles.length) titles = sidebar.querySelectorAll('.sb-label');
  if(!titles.length) return;

  // Wrap items between headings into .sb-group divs
  titles.forEach(function(title){
    var items = [];
    var next = title.nextElementSibling;
    while(next && !next.classList.contains('sidebar-title') && !next.classList.contains('sb-label')){
      items.push(next);
      next = next.nextElementSibling;
    }
    if(items.length > 0){
      var group = document.createElement('div');
      group.className = 'sb-group';
      title.parentNode.insertBefore(group, items[0]);
      items.forEach(function(item){ group.appendChild(item); });
    }
  });

  // Collapse groups without an active item
  var groups = sidebar.querySelectorAll('.sb-group');
  groups.forEach(function(g){
    var hasActive = g.querySelector('.sb-item.active');
    if(!hasActive){
      g.classList.add('hidden');
      if(g.previousElementSibling) g.previousElementSibling.classList.add('collapsed');
    }
  });

  // Click to toggle
  titles.forEach(function(title){
    title.addEventListener('click', function(){
      var group = this.nextElementSibling;
      if(!group || !group.classList.contains('sb-group')) return;
      var isHidden = group.classList.contains('hidden');
      if(isHidden){
        group.classList.remove('hidden');
        this.classList.remove('collapsed');
      } else {
        group.classList.add('hidden');
        this.classList.add('collapsed');
      }
    });
  });
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
  // HTML escape helper to prevent XSS from user-selected text
  function escHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

  var popup = document.createElement('div');
  popup.id = 'ee-translate-popup';
  popup.style.cssText = 'position:fixed;z-index:99999;display:none;background:rgba(11,26,30,0.97);backdrop-filter:blur(20px);border:1px solid rgba(100,216,165,0.2);border-radius:14px;padding:0;max-width:420px;min-width:200px;box-shadow:0 16px 48px rgba(0,0,0,0.5);font-family:"DM Sans",sans-serif;animation:eePopIn .2s ease-out;overflow:hidden;max-height:70vh;overflow-y:auto';
  document.body.appendChild(popup);

  var style = document.createElement('style');
  style.textContent = '@keyframes eePopIn{from{opacity:0;transform:scale(0.9) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}#ee-translate-popup .ee-tp-word{font-family:"Fraunces",serif;font-size:20px;color:#f5faf7;margin-bottom:2px}#ee-translate-popup .ee-tp-ipa{font-size:12px;color:#64d8a5;font-style:italic}#ee-translate-popup .ee-tp-vi{font-size:15px;color:#f5faf7;margin-top:8px;line-height:1.5}#ee-translate-popup .ee-tp-en-def{font-size:12px;color:#9ec0b2;margin-top:4px;font-style:italic;line-height:1.4}#ee-translate-popup .ee-tp-loading{text-align:center;padding:16px;color:#9ec0b2;font-size:13px}#ee-translate-popup .ee-tp-header{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}#ee-translate-popup .ee-tp-actions{display:flex;align-items:center;gap:8px}#ee-translate-popup .ee-tp-speak{width:32px;height:32px;border-radius:50%;background:rgba(100,216,165,0.12);border:1px solid rgba(100,216,165,0.25);color:#64d8a5;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}#ee-translate-popup .ee-tp-speak:hover{background:rgba(100,216,165,0.25);transform:scale(1.1)}#ee-translate-popup .ee-tp-save{height:32px;border-radius:999px;background:rgba(123,110,246,0.14);border:1px solid rgba(123,110,246,0.28);color:#d8ede3;cursor:pointer;font-size:12px;padding:0 12px;display:flex;align-items:center;justify-content:center;transition:all .2s;white-space:nowrap}#ee-translate-popup .ee-tp-save:hover{background:rgba(123,110,246,0.24)}#ee-translate-popup .ee-tp-save.saved{background:rgba(100,216,165,0.16);border-color:rgba(100,216,165,0.3);color:#64d8a5}#ee-translate-popup .ee-tp-meta{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px}#ee-translate-popup .ee-tp-link{font-size:11px;color:#a78bfa;text-decoration:none}#ee-translate-popup .ee-tp-link:hover{text-decoration:underline}#ee-translate-popup .ee-tp-body{padding:14px 16px}#ee-translate-popup .ee-tp-close{position:absolute;top:6px;right:8px;background:none;border:none;color:#9ec0b2;cursor:pointer;font-size:18px;line-height:1;padding:2px 6px;border-radius:4px;transition:color .15s}#ee-translate-popup .ee-tp-close:hover{color:#f5faf7}#ee-translate-popup .ee-tp-type{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:500;margin-right:4px}#ee-translate-popup .ee-tp-type-n{background:rgba(100,216,165,0.15);color:#64d8a5}#ee-translate-popup .ee-tp-type-v{background:rgba(123,110,246,0.15);color:#a78bfa}#ee-translate-popup .ee-tp-type-adj{background:rgba(244,132,95,0.15);color:#f4845f}#ee-translate-popup .ee-tp-type-adv{background:rgba(107,203,119,0.15);color:#6bcb77}#ee-translate-popup .ee-tp-extra{margin-top:10px;padding-top:10px;border-top:0.5px solid rgba(100,216,165,0.12)}#ee-translate-popup .ee-tp-label{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#9ec0b2;margin-bottom:4px}#ee-translate-popup .ee-tp-text{font-size:12px;color:#d8ede3;line-height:1.55}#ee-translate-popup .ee-tp-chiprow{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}#ee-translate-popup .ee-tp-chip{padding:3px 8px;border-radius:999px;background:rgba(255,255,255,0.05);border:0.5px solid rgba(100,216,165,0.12);font-size:10px;color:#d8ede3}';
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

  function renderTranslatePopup(payload){
    var word = payload.word || '';
    var viWord = payload.vi || '';
    var ipa = payload.ipa || '';
    var types = payload.types || [];
    var exampleText = payload.exampleText || '';
    var preview = payload.preview || '';
    var savedCls = isNotebookSaved(word) ? ' saved' : '';
    var saveLabel = isNotebookSaved(word) ? 'Đã lưu' : 'Lưu từ';
    var saveBtn = '<button class="ee-tp-save'+savedCls+'" id="eeTpSaveBtn">' + saveLabel + '</button>';
    var speakBtn = '<button class="ee-tp-speak" onclick="event.stopPropagation();var u=new SpeechSynthesisUtterance(\'' + word.replace(/'/g,"\\'") + '\');u.lang=\'en-US\';u.rate=0.85;speechSynthesis.cancel();speechSynthesis.speak(u)" title="Nghe phát âm">&#9654;</button>';
    var typeMap = {n:'ee-tp-type-n',v:'ee-tp-type-v',adj:'ee-tp-type-adj',adv:'ee-tp-type-adv'};
    var typeHtml = types.slice(0,3).map(function(t){ return '<span class="ee-tp-type ' + (typeMap[t]||'ee-tp-type-n') + '">' + t + '</span>'; }).join('');
    popup.innerHTML = '<div class="ee-tp-body">' +
      '<button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button>' +
      '<div class="ee-tp-header"><div><div class="ee-tp-word">' + (word || preview) + '</div>' +
      (ipa ? '<div class="ee-tp-ipa">' + ipa + '</div>' : '') +
      (typeHtml ? '<div style="margin-top:4px">' + typeHtml + '</div>' : '') +
      '</div><div class="ee-tp-actions">' + saveBtn + speakBtn + '</div></div>' +
      (viWord ? '<div class="ee-tp-vi">' + viWord + '</div>' : '') +
      (exampleText ? '<div class="ee-tp-extra"><div class="ee-tp-label">Ví dụ tự nhiên</div><div class="ee-tp-text">' + exampleText + '</div></div>' : '') +
      '<div class="ee-tp-meta"><span style="font-size:11px;color:#9ec0b2">Lưu vào sổ tay để ôn lại sau</span><a class="ee-tp-link" href="so-tay.html">Mở sổ tay</a></div>' +
      '</div>';
    var saveEl = popup.querySelector('#eeTpSaveBtn');
    if(saveEl){
      var savePayload = { word: word, vi: viWord || '', ipa: ipa || '', types: types || [] };
      saveEl.addEventListener('click', function(event){
        event.stopPropagation();
        var ok = saveNotebookWord(savePayload);
        if(ok){ saveEl.classList.add('saved'); saveEl.textContent = 'Đã lưu'; }
      });
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

      // Final fallback: if API didn't give a translation, try a local meaning from dictionary data when available.
      if(!viWord && dictData && dictData[0] && dictData[0].meanings && dictData[0].meanings.length){
        var firstDef = dictData[0].meanings[0].definitions && dictData[0].meanings[0].definitions[0];
        if(firstDef && firstDef.definition) viWord = firstDef.definition;
      }

      // If still no translation at all, show error
      if(!viWord && !ipa){
        popup.innerHTML = '<div class="ee-tp-body"><button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button><div style="color:#9ec0b2;font-size:13px">Không tìm thấy nghĩa cho "<b style="color:var(--text)">' + escHtml(word) + '</b>"</div></div>';
        isTranslating = false;
        return;
      }

      var typeMap = {n:'ee-tp-type-n',v:'ee-tp-type-v',adj:'ee-tp-type-adj',adv:'ee-tp-type-adv'};
      var typeHtml = types.slice(0,3).map(function(t){
        return '<span class="ee-tp-type ' + (typeMap[t]||'ee-tp-type-n') + '">' + t + '</span>';
      }).join('');

      var exampleText = '';
      if(dictData && dictData[0]){
        var d0 = dictData[0];
        if(d0.meanings && d0.meanings[0] && d0.meanings[0].definitions && d0.meanings[0].definitions[0]){
          exampleText = d0.meanings[0].definitions[0].example || '';
        }
      }

      renderTranslatePopup({
        word: word,
        vi: viWord,
        ipa: ipa,
        types: types,
        exampleText: exampleText,
        meta: null
      });
      isTranslating = false;
    }).catch(function(err){
      var fallbackMsg = 'Không lấy được bản dịch online.';
      if(err && err.name === 'AbortError') return;
      popup.innerHTML = '<div class="ee-tp-body"><button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button><div style="color:#9ec0b2;font-size:13px">' + fallbackMsg + '</div><div style="margin-top:8px;color:#d8ede3;font-size:12px;line-height:1.5">Bạn vẫn có thể tra trực tiếp từ điển hoặc thử lại sau. Nếu từ là một từ đơn, popup sẽ ưu tiên nghĩa cục bộ trước.</div></div>';
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
  var PAGES = [
    {title:'Trang chủ',desc:'EasyEnglish — Tự học tiếng Anh từ A-Z',url:'index.html',tags:'home trang chu'}
  ];
  if (window.EE_NAV_FLAT && window.EE_NAV_FLAT.length) {
    window.EE_NAV_FLAT.forEach(function(item){
      PAGES.push({
        title: item.text,
        desc: item.group,
        url: item.href,
        tags: [item.group, item.text, item.href.replace('.html','')].join(' ').toLowerCase()
      });
    });
  }
  // Tiến độ and Sổ tay are not in EE_NAV_FLAT, add manually
  PAGES.push(
    {title:'Tiến độ',desc:'Theo dõi streak, XP, và tiến trình học',url:'tien-do.html',tags:'progress tien do streak xp'},
    {title:'Sổ tay từ vựng',desc:'Lưu các từ đã bôi đen để ôn lại',url:'so-tay.html',tags:'notebook so tay tu vung luu tu'}
  );

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
