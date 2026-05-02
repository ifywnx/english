/* ═══════════════════════════════════════════
   EasyEnglish Interactive Exercises
   3 components: Fill-blank, Match-pairs, Word-order
   Self-contained with CSS injection
   ═══════════════════════════════════════════ */

(function(){
  // ── Inject CSS (guard chống inject 2 lần) ──
  if(document.getElementById('ee-interactive-css')) return;
  var css = document.createElement('style');
  css.id = 'ee-interactive-css';
  css.textContent = `
/* ═══ FILL IN THE BLANK ═══ */
.ee-fill{max-width:600px;margin:24px auto}
.ee-fill-card{background:var(--card);border:0.5px solid var(--border);border-radius:18px;padding:28px;margin-bottom:16px;transition:all .3s}
.ee-fill-card.ee-correct{border-color:var(--accent);background:rgba(100,216,165,0.06)}
.ee-fill-card.ee-wrong{border-color:var(--coral);background:rgba(244,132,95,0.06);animation:eeShake .4s}
.ee-fill-num{font-size:12px;color:var(--accent2);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px}
.ee-fill-sentence{font-size:18px;line-height:1.7;color:var(--text);margin-bottom:16px;font-family:'DM Sans',sans-serif}
.ee-fill-blank{display:inline-block;min-width:100px;border:none;border-bottom:2.5px solid var(--accent2);background:transparent;color:var(--accent);font-size:18px;font-family:'DM Sans',sans-serif;padding:2px 4px;outline:none;text-align:center;transition:border-color .2s}
.ee-fill-blank:focus{border-bottom-color:var(--accent)}
.ee-fill-blank.ee-right{border-bottom-color:var(--accent);color:var(--accent)}
.ee-fill-blank.ee-err{border-bottom-color:var(--coral);color:var(--coral)}
.ee-fill-hint{font-size:13px;color:var(--text3);font-style:italic;margin-bottom:12px}
.ee-fill-vi{font-size:14px;color:var(--text2);margin-bottom:14px}
.ee-fill-check{padding:10px 24px;border-radius:10px;border:none;background:var(--accent);color:#0b1a1e;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.ee-fill-check:hover{transform:scale(1.03)}
.ee-fill-answer{font-size:14px;color:var(--accent);margin-top:10px;display:none}
.ee-fill-answer.show{display:block;animation:eeFadeIn .3s}
.ee-fill-progress{text-align:center;font-size:13px;color:var(--text3);margin-top:12px}
.ee-fill-score{text-align:center;padding:32px;font-family:'Fraunces',serif}
.ee-fill-score b{font-size:48px;color:var(--accent);display:block;margin-bottom:8px}

/* ═══ MATCHING PAIRS ═══ */
.ee-match{max-width:700px;margin:24px auto}
.ee-match-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.ee-match-col{display:flex;flex-direction:column;gap:8px}
.ee-match-col-title{font-size:12px;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px;text-align:center}
.ee-match-item{padding:14px 18px;border-radius:12px;border:1.5px solid var(--border);background:var(--card);color:var(--text);cursor:pointer;font-size:15px;font-family:'DM Sans',sans-serif;transition:all .2s;text-align:center;user-select:none;-webkit-tap-highlight-color:transparent}
.ee-match-item:hover{border-color:rgba(100,216,165,0.4)}
.ee-match-item.ee-selected{border-color:var(--accent2);background:rgba(167,139,250,0.12);box-shadow:0 0 12px rgba(167,139,250,0.15)}
.ee-match-item.ee-matched{border-color:var(--accent);background:rgba(100,216,165,0.1);opacity:.6;pointer-events:none;transform:scale(0.95)}
.ee-match-item.ee-wrong-flash{border-color:var(--coral);background:rgba(244,132,95,0.12);animation:eeShake .4s}
.ee-match-info{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.ee-match-score{font-size:14px;color:var(--text2)}
.ee-match-score span{color:var(--accent);font-weight:600}
.ee-match-timer{font-size:13px;color:var(--accent2)}
.ee-match-done{text-align:center;padding:32px;font-family:'Fraunces',serif}
.ee-match-done b{font-size:42px;color:var(--accent);display:block;margin-bottom:4px}

/* ═══ WORD ORDER ═══ */
.ee-order{max-width:650px;margin:24px auto}
.ee-order-card{background:var(--card);border:0.5px solid var(--border);border-radius:18px;padding:28px;margin-bottom:16px}
.ee-order-num{font-size:12px;color:var(--accent2);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px}
.ee-order-vi{font-size:16px;color:var(--text2);margin-bottom:20px;font-style:italic}
.ee-order-zone{min-height:56px;border:2px dashed var(--border);border-radius:14px;padding:12px;display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;transition:all .3s}
.ee-order-zone.ee-correct{border-color:var(--accent);background:rgba(100,216,165,0.06)}
.ee-order-zone.ee-wrong{border-color:var(--coral);background:rgba(244,132,95,0.06)}
.ee-order-bank{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.ee-order-chip{padding:10px 18px;border-radius:10px;border:0.5px solid var(--border);background:var(--card2);color:var(--text);cursor:pointer;font-size:15px;font-family:'DM Sans',sans-serif;transition:all .15s;user-select:none}
.ee-order-chip:hover{transform:scale(1.05);border-color:rgba(100,216,165,0.4)}
.ee-order-chip.ee-used{opacity:.3;pointer-events:none}
.ee-order-chip.ee-in{background:rgba(100,216,165,0.12);border-color:rgba(100,216,165,0.3);cursor:pointer}
.ee-order-chip.ee-in:hover{background:rgba(244,132,95,0.12);border-color:var(--coral)}
.ee-order-chip.ee-dragging{opacity:.5;transform:scale(0.9)}
.ee-order-zone.ee-drag-over{border-color:var(--accent);background:rgba(100,216,165,0.04)}
.ee-order-answer{color:var(--accent);font-size:14px;margin-top:8px;display:none}
.ee-order-answer.show{display:block;animation:eeFadeIn .3s}
.ee-order-score{text-align:center;padding:32px;font-family:'Fraunces',serif}
.ee-order-score b{font-size:48px;color:var(--accent);display:block;margin-bottom:8px}

/* ═══ SHARED ═══ */
.ee-restart{padding:12px 28px;border-radius:12px;border:none;background:var(--accent);color:#0b1a1e;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:16px;transition:all .15s}
.ee-restart:hover{transform:scale(1.05)}
@keyframes eeShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
@keyframes eeFadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:600px){
  .ee-match-grid{grid-template-columns:1fr;gap:24px}
  .ee-fill-sentence{font-size:16px}
  .ee-order-chip{padding:8px 14px;font-size:14px}
}
  `;
  document.head.appendChild(css);

  // ── Utilities ──
  function shuffle(a){var b=[].concat(a);for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
  function normalize(s){return s.toLowerCase().replace(/[.?!,;:]$/,'').trim();}
  function sound(name){if(typeof playSound==='function')try{playSound(name);}catch(e){}}
  function safeId(id){return String(id).replace(/[^a-zA-Z0-9_-]/g,'');}

  // ════════════════════════════════════════════
  //  1. FILL IN THE BLANK
  // ════════════════════════════════════════════
  function fillBlank(containerId, data, opts){
    opts = opts || {};
    var el = document.getElementById(containerId);
    if(!el || !data || !data.length) return;
    var deck = shuffle(data).slice(0, opts.count || 15);
    var idx = 0, score = 0, answered = false;

    function render(){
      if(idx >= deck.length){
        var pct = Math.round(score/deck.length*100);
        el.innerHTML = '<div class="ee-fill-score"><b>'+score+'/'+deck.length+'</b>'+
          '<div style="color:var(--text2);font-size:16px;margin-bottom:4px">'+pct+'% chính xác</div>'+
          '<div style="color:var(--text3);font-size:13px;margin-bottom:16px">'+(pct>=80?'Xuất sắc!':pct>=50?'Khá tốt!':'Cần ôn thêm')+'</div>'+
          '<button class="ee-restart" id="ee-fill-restart">Làm lại</button></div>';
        // Restart bằng addEventListener (tránh inline onclick)
        var restartBtn = document.getElementById('ee-fill-restart');
        if(restartBtn) restartBtn.addEventListener('click', function(){EE.fillBlank(containerId, EE._fillData[containerId], EE._fillOpts[containerId]);});
        // XP
        if(typeof addXP==='function' && score>0) addXP(score*3,'Điền từ đúng '+score+'/'+deck.length);
        return;
      }
      var item = deck[idx];
      var parts = item.sentence.split(item.blank);
      var before = parts[0] || '';
      var after = parts.slice(1).join(item.blank) || '';
      answered = false;

      el.innerHTML = '<div class="ee-fill"><div class="ee-fill-card" id="ee-fill-card">'+
        '<div class="ee-fill-num">Câu '+(idx+1)+'/'+deck.length+'</div>'+
        (item.vi ? '<div class="ee-fill-vi">'+esc(item.vi)+'</div>' : '')+
        '<div class="ee-fill-sentence">'+esc(before)+'<input class="ee-fill-blank" id="ee-fill-input" type="text" autocomplete="off" autocapitalize="off" placeholder="..." size="'+Math.max(item.blank.length,6)+'">'+esc(after)+'</div>'+
        (item.hint ? '<div class="ee-fill-hint">Gợi ý: '+esc(item.hint)+'</div>' : '')+
        '<button class="ee-fill-check" id="ee-fill-btn">Kiểm tra</button>'+
        '<div class="ee-fill-answer" id="ee-fill-ans">✓ Đáp án: <strong>'+esc(item.blank)+'</strong></div>'+
        '</div>'+
        '<div class="ee-fill-progress">Đúng: '+score+'/'+idx+'</div></div>';

      var input = document.getElementById('ee-fill-input');
      var btn = document.getElementById('ee-fill-btn');
      if(input) input.addEventListener('keydown',function(e){if(e.key==='Enter')check();});
      if(btn) btn.addEventListener('click',check);
      if(input && window.innerWidth > 600) setTimeout(function(){input.focus();},100);
    }

    function check(){
      if(answered) return;
      answered = true;
      var input = document.getElementById('ee-fill-input');
      var card = document.getElementById('ee-fill-card');
      var ans = document.getElementById('ee-fill-ans');
      if(!input) return;
      var val = input.value.trim().toLowerCase();
      var correct = deck[idx].blank.toLowerCase();
      if(val === correct){
        score++;
        input.classList.add('ee-right');
        card.classList.add('ee-correct');
        input.value = deck[idx].blank;
        sound('correct');
      } else {
        input.classList.add('ee-err');
        card.classList.add('ee-wrong');
        ans.classList.add('show');
        sound('wrong');
      }
      setTimeout(function(){idx++;render();}, val===correct ? 1000 : 2200);
    }

    // Store refs for restart
    window.EE._fillData[containerId] = data;
    window.EE._fillOpts[containerId] = opts;
    render();
  }

  // ════════════════════════════════════════════
  //  2. MATCHING PAIRS
  // ════════════════════════════════════════════
  function matchPairs(containerId, data, opts){
    opts = opts || {};
    var el = document.getElementById(containerId);
    if(!el || !data || !data.length) return;
    var pairs = shuffle(data).slice(0, opts.count || 8);
    var enItems = shuffle(pairs.map(function(p,i){return {text:p.en, idx:i};}));
    var viItems = shuffle(pairs.map(function(p,i){return {text:p.vi, idx:i};}));
    var matched = {};
    var selected = null; // {side:'en'|'vi', idx:number, el:element}
    var matchCount = 0;
    var attempts = 0;
    var startTime = Date.now();
    var timerInterval = null;

    function render(){
      var html = '<div class="ee-match">'+
        '<div class="ee-match-info">'+
          '<div class="ee-match-score">Đã nối: <span id="ee-match-cnt">0</span>/'+pairs.length+'</div>'+
          '<div class="ee-match-timer" id="ee-match-timer">0:00</div>'+
        '</div>'+
        '<div class="ee-match-grid">'+
          '<div class="ee-match-col">'+
            '<div class="ee-match-col-title">English</div>'+
            enItems.map(function(item){
              return '<div class="ee-match-item ee-en" data-idx="'+item.idx+'" data-side="en">'+esc(item.text)+'</div>';
            }).join('')+
          '</div>'+
          '<div class="ee-match-col">'+
            '<div class="ee-match-col-title">Tiếng Việt</div>'+
            viItems.map(function(item){
              return '<div class="ee-match-item ee-vi" data-idx="'+item.idx+'" data-side="vi">'+esc(item.text)+'</div>';
            }).join('')+
          '</div>'+
        '</div></div>';
      el.innerHTML = html;

      // Bind clicks
      el.querySelectorAll('.ee-match-item').forEach(function(item){
        item.addEventListener('click', function(){handleClick(this);});
      });

      // Timer
      startTime = Date.now();
      if(timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer(){
      var elapsed = Math.floor((Date.now() - startTime)/1000);
      var m = Math.floor(elapsed/60);
      var s = elapsed%60;
      var te = document.getElementById('ee-match-timer');
      if(te) te.textContent = m+':'+(s<10?'0':'')+s;
    }

    function handleClick(item){
      if(item.classList.contains('ee-matched')) return;
      var side = item.dataset.side;
      var idx = parseInt(item.dataset.idx);

      if(!selected){
        // First selection
        selected = {side:side, idx:idx, el:item};
        item.classList.add('ee-selected');
      } else if(selected.side === side){
        // Same side - switch selection
        selected.el.classList.remove('ee-selected');
        selected = {side:side, idx:idx, el:item};
        item.classList.add('ee-selected');
      } else {
        // Different side - check match
        attempts++;
        if(selected.idx === idx){
          // CORRECT
          selected.el.classList.remove('ee-selected');
          selected.el.classList.add('ee-matched');
          item.classList.add('ee-matched');
          matchCount++;
          var cnt = document.getElementById('ee-match-cnt');
          if(cnt) cnt.textContent = matchCount;

          if(matchCount >= pairs.length){
            // ALL MATCHED
            if(timerInterval) clearInterval(timerInterval);
            var elapsed = Math.floor((Date.now()-startTime)/1000);
            setTimeout(function(){
              el.innerHTML = '<div class="ee-match-done">'+
                '<b>'+pairs.length+'/'+pairs.length+'</b>'+
                '<div style="color:var(--text2);font-size:16px">Hoàn thành trong '+(elapsed)+'s</div>'+
                '<div style="color:var(--text3);font-size:13px;margin:4px 0 16px">Số lần thử: '+attempts+'</div>'+
                '<button class="ee-restart" id="ee-match-restart">Chơi lại</button></div>';
              // Restart bằng addEventListener
              var rb = document.getElementById('ee-match-restart');
              if(rb) rb.addEventListener('click', function(){EE.matchPairs(containerId, EE._matchData[containerId], EE._matchOpts[containerId]);});
              if(typeof addXP==='function') addXP(pairs.length*3,'Nối cặp hoàn thành');
              sound('correct');
            }, 600);
          }
          selected = null;
        } else {
          // WRONG — clear selected + flash
          var prevEl = selected.el;
          prevEl.classList.remove('ee-selected');
          prevEl.classList.add('ee-wrong-flash');
          item.classList.remove('ee-selected');
          item.classList.add('ee-wrong-flash');
          selected = null;
          sound('wrong');
          setTimeout(function(){
            prevEl.classList.remove('ee-wrong-flash');
            item.classList.remove('ee-wrong-flash');
          }, 500);
        }
      }
    }

    window.EE._matchData[containerId] = data;
    window.EE._matchOpts[containerId] = opts;
    render();
  }

  // ════════════════════════════════════════════
  //  3. WORD ORDER
  // ════════════════════════════════════════════
  function wordOrder(containerId, data, opts){
    opts = opts || {};
    var el = document.getElementById(containerId);
    if(!el || !data || !data.length) return;
    var deck = shuffle(data).slice(0, opts.count || 10);
    var idx = 0, score = 0, total = 0, skipped = 0;

    function render(){
      if(idx >= deck.length){
        var pct = total>0 ? Math.round(score/total*100) : 0;
        var skippedInfo = skipped>0 ? '<div style="color:var(--text3);font-size:13px;margin-bottom:4px">Bỏ qua: '+skipped+' câu</div>' : '';
        el.innerHTML = '<div class="ee-order-score"><b>'+score+'/'+total+'</b>'+
          '<div style="color:var(--text2);font-size:16px;margin-bottom:4px">'+pct+'% chính xác</div>'+
          skippedInfo+
          '<button class="ee-restart" id="ee-order-restart">Làm lại</button></div>';
        // Restart bằng addEventListener
        var rb = document.getElementById('ee-order-restart');
        if(rb) rb.addEventListener('click', function(){EE.wordOrder(containerId, EE._orderData[containerId], EE._orderOpts[containerId]);});
        if(typeof addXP==='function' && score>0) addXP(score*3,'Sắp xếp câu đúng '+score+'/'+total);
        return;
      }
      var q = deck[idx];
      var words = q.en.replace(/[.?!,;:]/g,'').split(/\s+/);
      var shuffled = shuffle([].concat(words));
      var punct = (q.en.match(/[.?!]$/)||['.'])[0];

      el.innerHTML = '<div class="ee-order"><div class="ee-order-card">'+
        '<div class="ee-order-num">Câu '+(idx+1)+'/'+deck.length+'</div>'+
        '<div class="ee-order-vi">'+esc(q.vi)+'</div>'+
        '<div class="ee-order-zone" id="ee-ord-zone"></div>'+
        '<div class="ee-order-bank" id="ee-ord-bank">'+
          shuffled.map(function(w,i){return '<span class="ee-order-chip" data-word="'+esc(w)+'" data-idx="'+i+'">'+esc(w)+'</span>';}).join('')+
        '</div>'+
        '<div style="display:flex;gap:10px;justify-content:center">'+
          '<button class="ee-fill-check" id="ee-ord-check">Kiểm tra</button>'+
          '<button class="ee-restart" style="background:var(--card2);color:var(--text2);border:0.5px solid var(--border)" id="ee-ord-skip">Bỏ qua</button>'+
        '</div>'+
        '<div class="ee-order-answer" id="ee-ord-ans">✓ Đáp án: <strong>'+esc(q.en)+'</strong></div>'+
        '</div>'+
        '<div class="ee-fill-progress">Đúng: '+score+'/'+total+'</div></div>';

      // Bind chip clicks + drag & drop
      el.querySelectorAll('.ee-order-bank .ee-order-chip').forEach(function(chip){
        chip.addEventListener('click', function(){pickChip(this);});
        // Drag & drop (desktop)
        chip.setAttribute('draggable','true');
        chip.addEventListener('dragstart', function(e){
          e.dataTransfer.setData('text/plain', this.dataset.idx);
          this.classList.add('ee-dragging');
        });
        chip.addEventListener('dragend', function(){this.classList.remove('ee-dragging');});
      });
      // Drop zone
      var dropZone = document.getElementById('ee-ord-zone');
      if(dropZone){
        dropZone.addEventListener('dragover', function(e){e.preventDefault();this.classList.add('ee-drag-over');});
        dropZone.addEventListener('dragleave', function(){this.classList.remove('ee-drag-over');});
        dropZone.addEventListener('drop', function(e){
          e.preventDefault();
          this.classList.remove('ee-drag-over');
          var dragIdx = e.dataTransfer.getData('text/plain');
          var chip = el.querySelector('.ee-order-bank .ee-order-chip[data-idx="'+dragIdx+'"]');
          if(chip && !chip.classList.contains('ee-used')) pickChip(chip);
        });
      }
      document.getElementById('ee-ord-check').addEventListener('click', checkOrder);
      // Bug #1: skip không tính vào total — chỉ idx++ để bỏ qua
      document.getElementById('ee-ord-skip').addEventListener('click', function(){skipped++;idx++;render();});
      // Keyboard: Enter = kiểm tra
      document.addEventListener('keydown', function onKey(e){
        if(idx >= deck.length) { document.removeEventListener('keydown', onKey); return; }
        if(e.key === 'Enter') checkOrder();
      });

      function pickChip(chip){
        if(document.querySelector('.ee-order-zone.ee-correct')) return;
        if(chip.classList.contains('ee-in')){
          // Return to bank
          var bankChip = el.querySelector('.ee-order-bank .ee-order-chip[data-idx="'+chip.dataset.idx+'"]');
          if(bankChip) bankChip.classList.remove('ee-used');
          chip.remove();
          return;
        }
        chip.classList.add('ee-used');
        var clone = document.createElement('span');
        clone.className = 'ee-order-chip ee-in';
        clone.dataset.word = chip.dataset.word;
        clone.dataset.idx = chip.dataset.idx;
        clone.textContent = chip.dataset.word;
        clone.addEventListener('click', function(){pickChip(this);});
        document.getElementById('ee-ord-zone').appendChild(clone);
      }

      function checkOrder(){
        var zone = document.getElementById('ee-ord-zone');
        if(!zone || zone.classList.contains('ee-correct')||zone.classList.contains('ee-wrong')) return;
        var chips = zone.querySelectorAll('.ee-order-chip');
        if(chips.length === 0) return; // không có gì để kiểm tra
        var answer = Array.from(chips).map(function(c){return c.dataset.word;}).join(' ');
        answer = answer.charAt(0).toUpperCase() + answer.slice(1) + punct;
        total++;
        // Bug #3: normalize so sánh — bỏ qua dấu câu cuối và case
        if(normalize(answer) === normalize(q.en)){
          score++;
          zone.classList.add('ee-correct');
          sound('correct');
        } else {
          zone.classList.add('ee-wrong');
          document.getElementById('ee-ord-ans').classList.add('show');
          sound('wrong');
        }
        setTimeout(function(){idx++;render();}, normalize(answer)===normalize(q.en) ? 1000 : 2500);
      }
    }

    window.EE._orderData[containerId] = data;
    window.EE._orderOpts[containerId] = opts;
    render();
  }

  // ── Public API ──
  window.EE = window.EE || {};
  window.EE._fillData = window.EE._fillData || {};
  window.EE._fillOpts = window.EE._fillOpts || {};
  window.EE._matchData = window.EE._matchData || {};
  window.EE._matchOpts = window.EE._matchOpts || {};
  window.EE._orderData = window.EE._orderData || {};
  window.EE._orderOpts = window.EE._orderOpts || {};
  window.EE.fillBlank = fillBlank;
  window.EE.matchPairs = matchPairs;
  window.EE.wordOrder = wordOrder;
})();
