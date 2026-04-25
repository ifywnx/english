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
    /* === GEN-Z FLOATING BOTTOM NAV === */
    '@media(max-width:900px){' +
      '.mob-bottom-nav{display:block!important;position:fixed!important;bottom:12px!important;left:14px!important;right:14px!important;border-radius:22px!important;background:rgba(11,26,30,0.92)!important;backdrop-filter:blur(28px) saturate(180%)!important;-webkit-backdrop-filter:blur(28px) saturate(180%)!important;border:1px solid rgba(100,216,165,0.12)!important;padding:0!important;padding-bottom:env(safe-area-inset-bottom,0)!important;z-index:9999!important;box-shadow:0 8px 32px rgba(0,0,0,0.4),0 0 0 1px rgba(100,216,165,0.06),inset 0 1px 0 rgba(255,255,255,0.04)!important;transition:transform .35s cubic-bezier(.4,0,.2,1),opacity .35s ease!important}' +
      '.mob-bottom-nav.ee-hidden{transform:translateY(calc(100% + 20px))!important;opacity:0!important}' +
      '.mob-bottom-nav-inner{display:flex!important;justify-content:space-around!important;align-items:center!important;height:72px!important;max-width:480px!important;margin:0 auto!important;padding:0 4px!important}' +
      '.mob-bn-item{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;text-decoration:none!important;color:rgba(158,192,178,0.5)!important;font-size:11px!important;font-weight:500!important;padding:10px 16px!important;border-radius:16px!important;transition:all .25s cubic-bezier(.4,0,.2,1)!important;position:relative!important;min-width:56px!important;-webkit-tap-highlight-color:transparent!important;letter-spacing:.02em!important}' +
      '.mob-bn-item svg{width:26px!important;height:26px!important;stroke-width:1.8!important;transition:all .25s cubic-bezier(.4,0,.2,1)!important}' +
      '.mob-bn-item span{transition:all .25s ease!important;font-size:11px!important}' +
      '.mob-bn-item.active{color:var(--accent)!important;background:rgba(100,216,165,0.08)!important}' +
      '.mob-bn-item.active svg{stroke-width:2.2!important;transform:scale(1.08)!important;filter:drop-shadow(0 0 6px rgba(100,216,165,0.3))!important}' +
      '.mob-bn-item:active{transform:scale(0.88)!important}' +
      'button.mob-bn-item{background:none!important;border:none!important;cursor:pointer!important;font-family:"DM Sans",sans-serif!important}' +
      '.content{padding-bottom:100px!important}' +
      '.back-top{bottom:100px!important;right:16px!important}' +
      'nav{position:sticky!important;top:0!important;z-index:200!important}' +
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

// Back to top + reading progress
window.addEventListener('scroll',function(){
  var st=window.scrollY, h=document.documentElement.scrollHeight-window.innerHeight;
  var btn=document.getElementById('backTop');
  if(btn){if(st>400)btn.classList.add('show');else btn.classList.remove('show');}
  var bar=document.getElementById('readProgress');
  if(bar&&h>0)bar.style.width=Math.min(100,st/h*100)+'%';
});

// Highlight active bottom nav + force show on mobile (JS fallback)
(function(){
  var path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.mob-bn-item').forEach(function(a){
    if(a.getAttribute('href')===path)a.classList.add('active');
  });

  var nav=document.querySelector('.mob-bottom-nav');
  if(!nav) return;

  // JS fallback: force-show bottom nav on mobile with ALL styles
  function ensureNavVisible(){
    if(window.innerWidth<=900){
      nav.style.cssText='display:block;position:fixed;bottom:12px;left:14px;right:14px;z-index:9999;border-radius:22px;background:rgba(11,26,30,0.92);backdrop-filter:blur(28px) saturate(180%);-webkit-backdrop-filter:blur(28px) saturate(180%);border:1px solid rgba(100,216,165,0.12);padding:0;padding-bottom:env(safe-area-inset-bottom,0);box-shadow:0 8px 32px rgba(0,0,0,0.4),0 0 0 1px rgba(100,216,165,0.06),inset 0 1px 0 rgba(255,255,255,0.04);transition:transform .35s cubic-bezier(.4,0,.2,1),opacity .35s ease';
      var inner=nav.querySelector('.mob-bottom-nav-inner');
      if(inner) inner.style.cssText='display:flex;justify-content:space-around;align-items:center;height:72px;max-width:480px;margin:0 auto;padding:0 4px';
      nav.querySelectorAll('.mob-bn-item').forEach(function(item){
        item.style.cssText='display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;text-decoration:none;color:rgba(158,192,178,0.5);font-size:11px;font-weight:500;padding:10px 16px;border-radius:16px;transition:all .25s cubic-bezier(.4,0,.2,1);position:relative;min-width:56px;-webkit-tap-highlight-color:transparent;letter-spacing:.02em;background:none;border:none;cursor:pointer;font-family:"DM Sans",sans-serif';
        if(item.classList.contains('active')) item.style.color='var(--accent,#64d8a5)';
        var svg=item.querySelector('svg');
        if(svg){svg.style.width='26px';svg.style.height='26px';svg.style.strokeWidth='1.8';}
      });
    } else {
      nav.style.display='none';
    }
  }
  ensureNavVisible();
  window.addEventListener('resize', ensureNavVisible);

  // Instagram-style: hide nav on scroll down, show on scroll up
  var lastY=0, ticking=false;
  window.addEventListener('scroll',function(){
    if(!ticking){
      requestAnimationFrame(function(){
        var y=window.scrollY;
        if(y>lastY && y>100) nav.classList.add('ee-hidden');
        else nav.classList.remove('ee-hidden');
        lastY=y;
        ticking=false;
      });
      ticking=true;
    }
  },{passive:true});
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
  // Create popup element
  var popup = document.createElement('div');
  popup.id = 'ee-translate-popup';
  popup.style.cssText = 'position:fixed;z-index:99999;display:none;background:rgba(11,26,30,0.97);backdrop-filter:blur(20px);border:1px solid rgba(100,216,165,0.2);border-radius:14px;padding:0;max-width:340px;min-width:200px;box-shadow:0 16px 48px rgba(0,0,0,0.5);font-family:"DM Sans",sans-serif;animation:eePopIn .2s ease-out;overflow:hidden';
  document.body.appendChild(popup);

  // Add CSS animation
  var style = document.createElement('style');
  style.textContent = '@keyframes eePopIn{from{opacity:0;transform:scale(0.9) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}#ee-translate-popup .ee-tp-word{font-family:"Fraunces",serif;font-size:20px;color:#f5faf7;margin-bottom:2px}#ee-translate-popup .ee-tp-ipa{font-size:12px;color:#64d8a5;font-style:italic}#ee-translate-popup .ee-tp-vi{font-size:15px;color:#f5faf7;margin-top:8px;line-height:1.5}#ee-translate-popup .ee-tp-en-def{font-size:12px;color:#9ec0b2;margin-top:4px;font-style:italic;line-height:1.4}#ee-translate-popup .ee-tp-loading{text-align:center;padding:16px;color:#9ec0b2;font-size:13px}#ee-translate-popup .ee-tp-header{display:flex;align-items:center;justify-content:space-between;gap:8px}#ee-translate-popup .ee-tp-speak{width:32px;height:32px;border-radius:50%;background:rgba(167,139,250,0.15);border:1px solid rgba(167,139,250,0.3);color:#a78bfa;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}#ee-translate-popup .ee-tp-speak:hover{background:rgba(167,139,250,0.3);transform:scale(1.1)}#ee-translate-popup .ee-tp-body{padding:14px 16px}#ee-translate-popup .ee-tp-close{position:absolute;top:6px;right:8px;background:none;border:none;color:#9ec0b2;cursor:pointer;font-size:18px;line-height:1;padding:2px 6px;border-radius:4px;transition:color .15s}#ee-translate-popup .ee-tp-close:hover{color:#f5faf7}#ee-translate-popup .ee-tp-type{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:500;margin-right:4px}#ee-translate-popup .ee-tp-type-n{background:rgba(100,216,165,0.15);color:#64d8a5}#ee-translate-popup .ee-tp-type-v{background:rgba(123,110,246,0.15);color:#a78bfa}#ee-translate-popup .ee-tp-type-adj{background:rgba(244,132,95,0.15);color:#f4845f}#ee-translate-popup .ee-tp-type-adv{background:rgba(107,203,119,0.15);color:#6bcb77}';
  document.head.appendChild(style);

  var hideTimeout;
  var lastText = '';

  function hidePopup(){
    popup.style.display = 'none';
    lastText = '';
  }

  function showPopup(x, y, text){
    popup.style.display = 'block';
    // Position
    var pw = 320, ph = 200;
    var left = Math.min(x, window.innerWidth - pw - 12);
    var top = y + 10;
    if(top + ph > window.innerHeight) top = y - ph - 10;
    if(left < 12) left = 12;
    if(top < 12) top = 12;
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
  }

  // Listen for text selection
  document.addEventListener('mouseup', handleSelection);
  // Mobile: multiple strategies for touch selection
  document.addEventListener('touchend', function(){ setTimeout(handleSelection, 300); });
  document.addEventListener('selectionchange', function(){
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(function(){
      var sel = window.getSelection();
      var text = sel.toString().trim();
      if(text && text.length >= 2 && text.length <= 100 && text !== lastText){
        handleSelection();
      }
    }, 600);
  });

  function handleSelection(){
    var sel = window.getSelection();
    var text = sel.toString().trim();
    
    // Ignore if clicking inside popup
    if(popup.contains(sel.anchorNode)) return;
    
    // Hide if no selection or too short
    if(!text || text.length < 2 || text.length > 100){
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(hidePopup, 200);
      return;
    }

    // Don't re-translate same text
    if(text === lastText) return;
    lastText = text;

    // Get position
    var range = sel.getRangeAt(0);
    var rect = range.getBoundingClientRect();
    
    // Show loading
    popup.innerHTML = '<div class="ee-tp-body"><button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button><div class="ee-tp-loading"><div style="display:inline-block;width:16px;height:16px;border:2px solid rgba(100,216,165,0.2);border-top-color:#64d8a5;border-radius:50%;animation:spin .6s linear infinite"></div><div style="margin-top:6px">Đang dịch...</div></div></div>';
    showPopup(rect.left, rect.bottom, text);

    // Check if single word → use dictionary API + direct translate
    var isSingleWord = text.split(/\s+/).length === 1 && /^[a-zA-Z'-]+$/.test(text);
    
    if(isSingleWord){
      lookupAndTranslate(text, rect);
    } else {
      translatePhrase(text, rect);
    }
  }

  // Single word: translate word directly + augment with Dictionary API
  function lookupAndTranslate(word, rect){
    var wordLower = word.toLowerCase();
    // Run both requests in parallel
    // Dict API uses lowercase; translation uses original case for proper nouns
    var dictPromise = fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(wordLower))
      .then(function(r){ return r.ok ? r.json() : Promise.reject('no'); })
      .catch(function(){ return null; });
    
    var translatePromise = fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(word) + '&langpair=en|vi')
      .then(function(r){ return r.json(); })
      .catch(function(){ return null; });

    Promise.all([dictPromise, translatePromise]).then(function(results){
      var dictData = results[0];
      var trData = results[1];
      
      // Direct word translation (most reliable)
      var viWord = trData && trData.responseData && trData.responseData.translatedText ? trData.responseData.translatedText : '';
      
      // Dictionary extras
      var ipa = '', types = [], firstDef = '', example = '';
      if(dictData && dictData[0]){
        var d = dictData[0];
        var phonetics = d.phonetics || [];
        ipa = d.phonetic || (phonetics.find(function(p){return p.text;})||{}).text || '';
        var meanings = d.meanings || [];
        types = meanings.map(function(m){
          return {noun:'n',verb:'v',adjective:'adj',adverb:'adv'}[m.partOfSpeech] || m.partOfSpeech;
        });
        firstDef = meanings[0] && meanings[0].definitions[0] ? meanings[0].definitions[0].definition : '';
        example = meanings[0] && meanings[0].definitions[0] && meanings[0].definitions[0].example ? meanings[0].definitions[0].example : '';
      }

      var typeMap = {n:'ee-tp-type-n',v:'ee-tp-type-v',adj:'ee-tp-type-adj',adv:'ee-tp-type-adv'};
      var typeHtml = types.slice(0,3).map(function(t){
        return '<span class="ee-tp-type ' + (typeMap[t]||'ee-tp-type-n') + '">' + t + '</span>';
      }).join('');

      var speakBtn = '<button class="ee-tp-speak" onclick="event.stopPropagation();var u=new SpeechSynthesisUtterance(\'' + word.replace(/'/g,"\\'") + '\');u.lang=\'en-US\';u.rate=0.85;speechSynthesis.cancel();speechSynthesis.speak(u)" title="Nghe phát âm">&#9654;</button>';
      
      popup.innerHTML = '<div class="ee-tp-body">' +
        '<button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button>' +
        '<div class="ee-tp-header"><div><div class="ee-tp-word">' + word + '</div>' +
        (ipa ? '<div class="ee-tp-ipa">' + ipa + '</div>' : '') +
        (typeHtml ? '<div style="margin-top:4px">' + typeHtml + '</div>' : '') +
        '</div>' + speakBtn + '</div>' +
        (viWord ? '<div class="ee-tp-vi">' + viWord + '</div>' : '') +
        (firstDef ? '<div class="ee-tp-en-def">' + firstDef + '</div>' : '') +
        (example ? '<div style="margin-top:6px;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:6px;font-size:12px;color:#d8ede3;font-style:italic">"' + example + '"</div>' : '') +
        '</div>';
    });
  }

  // Phrase: MyMemory translate
  function translatePhrase(text, rect){
    fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|vi')
      .then(function(r){return r.json();})
      .then(function(data){
        var vi = data.responseData && data.responseData.translatedText ? data.responseData.translatedText : 'Không dịch được';
        
        var speakBtn = '<button class="ee-tp-speak" onclick="event.stopPropagation();var u=new SpeechSynthesisUtterance(\'' + text.replace(/'/g,"\\'").replace(/\n/g,' ') + '\');u.lang=\'en-US\';u.rate=0.85;speechSynthesis.cancel();speechSynthesis.speak(u)" title="Nghe phát âm">&#9654;</button>';
        
        popup.innerHTML = '<div class="ee-tp-body">' +
          '<button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button>' +
          '<div class="ee-tp-header"><div class="ee-tp-word" style="font-size:15px">' + (text.length > 40 ? text.substring(0,40)+'...' : text) + '</div>' + speakBtn + '</div>' +
          '<div class="ee-tp-vi">' + vi + '</div>' +
          '</div>';
      })
      .catch(function(){
        popup.innerHTML = '<div class="ee-tp-body"><button class="ee-tp-close" onclick="document.getElementById(\'ee-translate-popup\').style.display=\'none\'">&times;</button><div style="color:#9ec0b2;font-size:13px">Không thể dịch. Kiểm tra kết nối mạng.</div></div>';
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
  });
})();
