/* === EasyEnglish Gamification System === */

// ==================== XP & LEVEL ====================
const LEVELS = [
  {name:'Người mới',minXP:0,icon:'sprout'},
  {name:'Học viên',minXP:100,icon:'book-open'},
  {name:'Trung cấp',minXP:500,icon:'flame'},
  {name:'Nâng cao',minXP:1500,icon:'award'},
  {name:'Chuyên gia',minXP:3000,icon:'crown'},
  {name:'Bậc thầy',minXP:6000,icon:'trophy'},
];

const BADGES = [
  // === STREAK ===
  {id:'first_lesson',name:'Bài đầu tiên',desc:'Hoàn thành 1 bài học',icon:'star',cat:'start',condition:s=>s.lessonsCompleted>=1},
  {id:'streak_3',name:'3 ngày liên tiếp',desc:'Học 3 ngày liền',icon:'flame',cat:'streak',condition:s=>s.streak>=3},
  {id:'streak_7',name:'Tuần lễ vàng',desc:'Học 7 ngày liền',icon:'zap',cat:'streak',condition:s=>s.streak>=7},
  {id:'streak_14',name:'2 tuần bền bỉ',desc:'Học 14 ngày liền',icon:'shield',cat:'streak',condition:s=>s.streak>=14},
  {id:'streak_30',name:'Tháng kiên trì',desc:'Học 30 ngày liền',icon:'shield-check',cat:'streak',condition:s=>s.streak>=30},
  {id:'streak_60',name:'2 tháng không nghỉ',desc:'Học 60 ngày liền',icon:'heart',cat:'streak',condition:s=>s.streak>=60},
  {id:'streak_100',name:'100 ngày huyền thoại',desc:'Streak 100 ngày',icon:'trophy',cat:'streak',condition:s=>s.streak>=100},
  {id:'streak_365',name:'Cả năm không ngừng',desc:'Streak 365 ngày!',icon:'crown',cat:'streak',condition:s=>s.streak>=365},
  // === VOCAB ===
  {id:'vocab_50',name:'50 từ vựng',desc:'Tra/học 50 từ',icon:'book',cat:'vocab',condition:s=>s.wordsLearned>=50},
  {id:'vocab_100',name:'100 từ vựng',desc:'Tra/học 100 từ',icon:'book-open',cat:'vocab',condition:s=>s.wordsLearned>=100},
  {id:'vocab_200',name:'200 từ vựng',desc:'Tra/học 200 từ',icon:'library',cat:'vocab',condition:s=>s.wordsLearned>=200},
  {id:'vocab_500',name:'500 từ vựng',desc:'Tra/học 500 từ — nửa đường!',icon:'bookmark',cat:'vocab',condition:s=>s.wordsLearned>=500},
  {id:'vocab_1000',name:'1000 từ vựng',desc:'Tra/học 1000 từ — impressive!',icon:'sparkles',cat:'vocab',condition:s=>s.wordsLearned>=1000},
  // === QUIZ ===
  {id:'quiz_10',name:'10 quiz',desc:'Hoàn thành 10 quiz',icon:'check-circle',cat:'quiz',condition:s=>s.quizCompleted>=10},
  {id:'quiz_25',name:'25 quiz',desc:'Hoàn thành 25 quiz',icon:'check-circle-2',cat:'quiz',condition:s=>s.quizCompleted>=25},
  {id:'quiz_50',name:'50 quiz',desc:'Hoàn thành 50 quiz',icon:'award',cat:'quiz',condition:s=>s.quizCompleted>=50},
  {id:'quiz_100',name:'100 quiz',desc:'Hoàn thành 100 quiz — quiz master!',icon:'medal',cat:'quiz',condition:s=>s.quizCompleted>=100},
  // === COMBO ===
  {id:'combo_5',name:'Combo 5',desc:'5 câu đúng liên tiếp',icon:'flame',cat:'combo',condition:s=>(s.maxCombo||0)>=5},
  {id:'combo_10',name:'Combo 10',desc:'10 câu đúng liên tiếp!',icon:'zap',cat:'combo',condition:s=>(s.maxCombo||0)>=10},
  // === EXPLORER ===
  {id:'explorer_10',name:'Nhà khám phá',desc:'Ghé thăm 10 trang khác nhau',icon:'compass',cat:'explore',condition:s=>(s.pagesVisited||[]).length>=10},
  {id:'explorer_20',name:'Thợ lặn sâu',desc:'Ghé thăm 20 trang khác nhau',icon:'globe',cat:'explore',condition:s=>(s.pagesVisited||[]).length>=20},
  {id:'explorer_50',name:'Bách khoa toàn thư',desc:'Ghé thăm 50 trang!',icon:'map',cat:'explore',condition:s=>(s.pagesVisited||[]).length>=50},
  // === SPECIAL ===
  {id:'night_owl',name:'Cú đêm',desc:'Học sau 11 giờ tối',icon:'moon',cat:'special',condition:s=>new Date().getHours()>=23&&s.streak>0},
  {id:'early_bird',name:'Chim sớm',desc:'Học trước 6 giờ sáng',icon:'sunrise',cat:'special',condition:s=>new Date().getHours()<6&&s.streak>0},
];

function getGameState(){
  const def = {totalXP:0,todayXP:0,dailyGoal:30,dailyGoalLevel:'regular',streak:0,lastDate:'',lessonsCompleted:0,wordsLearned:0,quizCompleted:0,badges:[],todayChallengeDone:false,combo:0,maxCombo:0,questsDate:'',quests:[],pagesVisited:[]};
  try{return Object.assign(def,JSON.parse(localStorage.getItem('ee_game')||'{}'));}catch(e){return def;}
}
function saveGameState(s){localStorage.setItem('ee_game',JSON.stringify(s));}

function getLevel(xp){
  for(let i=LEVELS.length-1;i>=0;i--){if(xp>=LEVELS[i].minXP)return{...LEVELS[i],index:i};}
  return {...LEVELS[0],index:0};
}
function getNextLevel(xp){
  const cur=getLevel(xp);
  return cur.index<LEVELS.length-1?LEVELS[cur.index+1]:null;
}

// ==================== ADD XP (DISABLED) ====================
// XP system removed — paid model replaces gamification
function addXP(amount, reason){
  // no-op: XP system disabled
}

// ==================== COMBO SYSTEM ====================
function addCombo(){
  var s = getGameState();
  s.combo = (s.combo || 0) + 1;
  if(s.combo > (s.maxCombo || 0)) s.maxCombo = s.combo;
  saveGameState(s);
  // Show combo toast at milestones
  if(s.combo === 3) showToast('3 Combo!','2x XP activated!','var(--accent3)');
  else if(s.combo === 5) showToast('5 Combo!','3x XP activated!','var(--accent3)');
  else if(s.combo === 10) showToast('10 Combo!','4x XP — MAX POWER!','var(--accent2)');
}
function resetCombo(){
  var s = getGameState();
  if(s.combo >= 3) showToast('Combo reset','Streak: '+s.combo+' câu liên tiếp','var(--coral,#f4845f)');
  s.combo = 0;
  saveGameState(s);
}
window.addCombo = addCombo;
window.resetCombo = resetCombo;

// ==================== BADGES ====================
function checkBadges(s){
  let newBadge=false;
  BADGES.forEach(b=>{
    if(!s.badges.includes(b.id)&&b.condition(s)){
      s.badges.push(b.id);
      newBadge=true;
      setTimeout(()=>{
        playSound('badge');
        showToast('Huy chương mới!',b.name+' — '+b.desc,'var(--accent3)');
        showConfetti();
      },1500);
    }
  });
  if(newBadge)saveGameState(s);
}

// ==================== SOUNDS ====================
// FIX #6: Cache AudioContext — create once, reuse
let _audioCtx = null;
const SOUNDS={};
function initSounds(){
  if(_audioCtx) return; // already initialized
  try{
    _audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  }catch(e){return;}
  const ctx=_audioCtx;
  SOUNDS.correct=()=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(523,ctx.currentTime);o.frequency.setValueAtTime(659,ctx.currentTime+0.1);g.gain.setValueAtTime(0.3,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.3);o.start(ctx.currentTime);o.stop(ctx.currentTime+0.3);};
  SOUNDS.wrong=()=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='square';o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(200,ctx.currentTime);o.frequency.setValueAtTime(150,ctx.currentTime+0.15);g.gain.setValueAtTime(0.2,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.3);o.start(ctx.currentTime);o.stop(ctx.currentTime+0.3);};
  SOUNDS.levelup=()=>{const notes=[523,659,784,1047];notes.forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(f,ctx.currentTime+i*0.12);g.gain.setValueAtTime(0.25,ctx.currentTime+i*0.12);g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+i*0.12+0.3);o.start(ctx.currentTime+i*0.12);o.stop(ctx.currentTime+i*0.12+0.3);});};
  SOUNDS.badge=()=>{const notes=[784,988,1175];notes.forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='triangle';o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(f,ctx.currentTime+i*0.15);g.gain.setValueAtTime(0.3,ctx.currentTime+i*0.15);g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+i*0.15+0.4);o.start(ctx.currentTime+i*0.15);o.stop(ctx.currentTime+i*0.15+0.4);});};
}
function playSound(name){
  try{
    if(!SOUNDS[name])initSounds();
    if(SOUNDS[name])SOUNDS[name]();
  }catch(e){}
}

// ==================== TOAST ====================
// FIX #4: Use CSS variables instead of hardcoded dark colors
function showToast(title,sub,color){
  let c=document.getElementById('ee-toast-container');
  if(!c){
    c=document.createElement('div');c.id='ee-toast-container';
    c.style.cssText='position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:8px';
    document.body.appendChild(c);
  }
  const t=document.createElement('div');
  t.style.cssText='background:var(--card,#12282e);backdrop-filter:blur(20px);border:1px solid '+(color||'var(--accent)')+';border-radius:12px;padding:12px 18px;min-width:200px;animation:toastIn .3s ease-out;box-shadow:0 8px 32px rgba(0,0,0,0.4)';
  t.innerHTML='<div style="font-size:14px;font-weight:500;color:'+(color||'var(--accent)')+'">'+title+'</div>'+(sub?'<div style="font-size:12px;color:var(--text3);margin-top:2px">'+sub+'</div>':'');
  c.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(100px)';t.style.transition='all .3s';setTimeout(()=>t.remove(),300);},2500);
}

// ==================== CONFETTI ====================
// FIX #7: Spawn from top, fall down naturally
function showConfetti(){
  const canvas=document.createElement('canvas');
  canvas.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998';
  document.body.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  const pieces=[];const colors=['#64d8a5','#a78bfa','#f0c27a','#f4845f','#6bcb77','#ff8a80'];
  for(let i=0;i<80;i++){
    pieces.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 40,
      vx: (Math.random()-0.5) * 6,
      vy: Math.random() * 3 + 2,
      size: Math.random()*8+4,
      color: colors[Math.floor(Math.random()*colors.length)],
      rot: Math.random()*360,
      rotV: (Math.random()-0.5)*10
    });
  }
  let frame=0;
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=0.12;p.rot+=p.rotV;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle=p.color;ctx.globalAlpha=Math.max(0,1-frame/80);
      ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);ctx.restore();
    });
    frame++;
    if(frame<100)requestAnimationFrame(animate);else canvas.remove();
  }
  animate();
}

// ==================== XP BAR (DISABLED) ====================
function updateXPBar(){
  // XP bar disabled — no longer injected into nav
}


// ==================== DAILY CHALLENGE ====================
// FIX #5: Expanded from 30 → 60 words to avoid repeating after 1 month
const DAILY_WORDS=[
  {en:'accomplish',vi:'hoàn thành',ex:'She accomplished all her goals.'},
  {en:'abundant',vi:'dồi dào',ex:'The region has abundant natural resources.'},
  {en:'acquire',vi:'đạt được, thu được',ex:'She acquired a new skill.'},
  {en:'benevolent',vi:'nhân từ',ex:'A benevolent leader cares for everyone.'},
  {en:'cautious',vi:'thận trọng',ex:'Be cautious when crossing the road.'},
  {en:'diligent',vi:'chăm chỉ',ex:'A diligent student always does homework.'},
  {en:'eloquent',vi:'hùng hồn',ex:'Her eloquent speech moved everyone.'},
  {en:'feasible',vi:'khả thi',ex:'Is this plan feasible?'},
  {en:'genuine',vi:'chân thật',ex:'He is a genuine person.'},
  {en:'hesitate',vi:'do dự',ex:'Don\'t hesitate to ask for help.'},
  {en:'inevitable',vi:'không thể tránh',ex:'Change is inevitable.'},
  {en:'justify',vi:'biện minh',ex:'How can you justify this decision?'},
  {en:'legitimate',vi:'hợp pháp',ex:'That is a legitimate concern.'},
  {en:'magnificent',vi:'tráng lệ',ex:'The view was magnificent.'},
  {en:'negotiate',vi:'đàm phán',ex:'They negotiated a better deal.'},
  {en:'obligate',vi:'bắt buộc',ex:'The contract obligates both parties.'},
  {en:'perceive',vi:'nhận thức',ex:'How do you perceive this situation?'},
  {en:'reluctant',vi:'miễn cưỡng',ex:'She was reluctant to leave.'},
  {en:'sufficient',vi:'đủ',ex:'We have sufficient evidence.'},
  {en:'tremendous',vi:'to lớn',ex:'She made a tremendous effort.'},
  {en:'versatile',vi:'đa năng',ex:'He is a versatile player.'},
  {en:'vulnerable',vi:'dễ bị tổn thương',ex:'Children are especially vulnerable.'},
  {en:'widespread',vi:'lan rộng',ex:'The disease became widespread.'},
  {en:'ambitious',vi:'tham vọng',ex:'She has ambitious plans.'},
  {en:'comprehensive',vi:'toàn diện',ex:'A comprehensive review of the policy.'},
  {en:'deteriorate',vi:'xấu đi',ex:'His health continued to deteriorate.'},
  {en:'emphasize',vi:'nhấn mạnh',ex:'I want to emphasize this point.'},
  {en:'fluctuate',vi:'dao động',ex:'Prices fluctuate throughout the year.'},
  {en:'gratitude',vi:'lòng biết ơn',ex:'Express your gratitude sincerely.'},
  {en:'hypothesis',vi:'giả thuyết',ex:'We need to test this hypothesis.'},
  // 30 new words added to reach 60
  {en:'allocate',vi:'phân bổ',ex:'We need to allocate resources wisely.'},
  {en:'benchmark',vi:'tiêu chuẩn',ex:'This serves as a benchmark for quality.'},
  {en:'collaborate',vi:'hợp tác',ex:'The teams collaborate on projects.'},
  {en:'diminish',vi:'giảm bớt',ex:'His influence began to diminish.'},
  {en:'elaborate',vi:'chi tiết, phức tạp',ex:'She gave an elaborate explanation.'},
  {en:'facilitate',vi:'tạo điều kiện',ex:'The teacher facilitates learning.'},
  {en:'generate',vi:'tạo ra',ex:'The project generates significant revenue.'},
  {en:'implement',vi:'thực hiện',ex:'We will implement the new policy.'},
  {en:'jeopardize',vi:'gây nguy hiểm',ex:'Don\'t jeopardize your career.'},
  {en:'knowledgeable',vi:'hiểu biết',ex:'She is very knowledgeable about history.'},
  {en:'leverage',vi:'tận dụng',ex:'Leverage your strengths effectively.'},
  {en:'mitigate',vi:'giảm thiểu',ex:'Steps to mitigate the risk were taken.'},
  {en:'notion',vi:'khái niệm',ex:'The notion of equality is fundamental.'},
  {en:'optimize',vi:'tối ưu hóa',ex:'We need to optimize our workflow.'},
  {en:'predominant',vi:'chiếm ưu thế',ex:'English is the predominant language.'},
  {en:'quantify',vi:'định lượng',ex:'It is hard to quantify happiness.'},
  {en:'resilient',vi:'kiên cường',ex:'She is incredibly resilient.'},
  {en:'scrutinize',vi:'xem xét kỹ',ex:'The report was scrutinized carefully.'},
  {en:'transparent',vi:'minh bạch',ex:'The process should be transparent.'},
  {en:'undermine',vi:'làm suy yếu',ex:'Rumors can undermine trust.'},
  {en:'validate',vi:'xác nhận',ex:'We need to validate the results.'},
  {en:'withstand',vi:'chịu đựng',ex:'The building can withstand earthquakes.'},
  {en:'yield',vi:'mang lại, nhường',ex:'The investment yields good returns.'},
  {en:'advocate',vi:'ủng hộ, vận động',ex:'She advocates for children\'s rights.'},
  {en:'breakthrough',vi:'bước đột phá',ex:'Scientists made a breakthrough discovery.'},
  {en:'consensus',vi:'sự đồng thuận',ex:'We reached a consensus quickly.'},
  {en:'deplete',vi:'cạn kiệt',ex:'Natural resources are being depleted.'},
  {en:'endeavor',vi:'nỗ lực',ex:'It is a worthwhile endeavor.'},
  {en:'foster',vi:'nuôi dưỡng, thúc đẩy',ex:'We foster creativity in the workplace.'},
  {en:'groundbreaking',vi:'đột phá',ex:'A groundbreaking research paper.'},
];

function getDailyChallenge(){
  const dayOfYear=Math.floor((new Date()-new Date(new Date().getFullYear(),0,0))/86400000);
  return DAILY_WORDS[dayOfYear%DAILY_WORDS.length];
}

// ==================== DAILY QUEST SYSTEM ====================
var QUEST_POOL = [
  {id:'learn_words',lucide:'book-open',title:'Học từ mới',desc:'Tra {n} từ trong từ điển',target:5,type:'words',xp:15},
  {id:'quiz_complete',lucide:'check-circle',title:'Làm bài quiz',desc:'Hoàn thành {n} bài quiz',target:1,type:'quiz',xp:20},
  {id:'earn_xp',lucide:'zap',title:'Kiếm XP',desc:'Đạt {n} XP hôm nay',target:30,type:'earn_xp',xp:10},
  {id:'visit_pages',lucide:'compass',title:'Khám phá',desc:'Ghé thăm {n} trang học khác nhau',target:3,type:'visit',xp:10},
  {id:'save_words',lucide:'bookmark',title:'Lưu từ vựng',desc:'Lưu {n} từ vào sổ tay',target:3,type:'save',xp:15},
  {id:'streak_keep',lucide:'flame',title:'Giữ streak',desc:'Duy trì streak {n}+ ngày',target:2,type:'streak',xp:10},
  {id:'learn_words_10',lucide:'library',title:'Siêu học',desc:'Tra {n} từ trong từ điển',target:10,type:'words',xp:25},
  {id:'quiz_3',lucide:'trophy',title:'Quiz master',desc:'Hoàn thành {n} bài quiz',target:3,type:'quiz',xp:30},
  {id:'combo_5',lucide:'zap',title:'Combo King',desc:'Đạt combo {n} câu đúng liên tiếp',target:5,type:'combo',xp:20},
];

function getDailyQuests(){
  var s = getGameState();
  var today = new Date().toDateString();
  if(s.questsDate === today && s.quests && s.quests.length === 3) return s.quests;
  // Generate 3 random quests for today
  var seed = new Date().getFullYear() * 1000 + new Date().getMonth() * 31 + new Date().getDate();
  var shuffled = QUEST_POOL.slice().sort(function(a,b){ return ((seed * 31 + QUEST_POOL.indexOf(a) * 7) % 97) - ((seed * 31 + QUEST_POOL.indexOf(b) * 7) % 97); });
  var quests = shuffled.slice(0, 3).map(function(q){ return {id:q.id, lucide:q.lucide, title:q.title, desc:q.desc.replace('{n}',q.target), target:q.target, type:q.type, xp:q.xp, progress:0, done:false}; });
  s.questsDate = today;
  s.quests = quests;
  saveGameState(s);
  return quests;
}

function trackQuestProgress(s, type, amount){
  if(!s.quests || !s.quests.length) return;
  var changed = false;
  s.quests.forEach(function(q){
    if(q.done) return;
    if(q.type === type){
      q.progress = Math.min(q.target, (q.progress||0) + (amount||1));
      if(q.progress >= q.target && !q.done){
        q.done = true;
        changed = true;
        setTimeout(function(){
          playSound('badge');
          showToast('Quest hoàn thành!', q.title + ' — +' + q.xp + ' XP', 'var(--accent2)');
          var s2 = getGameState();
          s2.totalXP += q.xp;
          s2.todayXP += q.xp;
          saveGameState(s2);
          updateXPBar();
          updateProgressRing();
          renderQuestBoard();
        }, 500);
      }
    }
  });
}
window.trackQuestProgress = function(type, amount){
  var s = getGameState();
  trackQuestProgress(s, type, amount);
  saveGameState(s);
};

function renderQuestBoard(){
  var container = document.getElementById('questBoard');
  if(!container) return;
  var quests = getDailyQuests();
  var allDone = quests.every(function(q){return q.done;});
  var html = '';
  quests.forEach(function(q){
    var pct = Math.min(100, Math.round((q.progress||0) / q.target * 100));
    var cls = q.done ? 'quest-card quest-done' : 'quest-card';
    html += '<div class="'+cls+'">';
    html += '<div class="quest-icon"><i data-lucide="'+(q.lucide||'star')+'"></i></div>';
    html += '<div class="quest-info">';
    html += '<div class="quest-title">'+q.title+'</div>';
    html += '<div class="quest-desc">'+q.desc+'</div>';
    html += '<div class="quest-bar"><div class="quest-bar-fill" style="width:'+pct+'%"></div></div>';
    html += '</div>';
    html += '<div class="quest-reward">'+(q.done?'<i data-lucide="check-circle" style="width:18px;height:18px;color:var(--accent)"></i>':'+'+q.xp+'<small>XP</small>')+'</div>';
    html += '</div>';
  });
  container.innerHTML = html;
  if(typeof lucide !== 'undefined') lucide.createIcons();
}
window.renderQuestBoard = renderQuestBoard;

// ==================== PROGRESS RING (Streak-based) ====================
function updateProgressRing(){
  var ring = document.getElementById('progressRingFill');
  var label = document.getElementById('progressRingLabel');
  var sublabel = document.getElementById('progressRingPct');
  if(!ring) return;
  var s = getGameState();
  // Show streak in ring instead of XP
  var maxStreak = 30; // full ring at 30 days
  var pct = Math.min(100, Math.round(s.streak / maxStreak * 100));
  var circumference = 2 * Math.PI * 54;
  var offset = circumference - (pct / 100) * circumference;
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = offset;
  if(label) label.textContent = s.streak;
  if(sublabel) sublabel.textContent = 'ngày streak';
}
window.updateProgressRing = updateProgressRing;

// ==================== DAILY GOAL SELECTOR ====================
var GOAL_LEVELS = [
  {id:'casual',label:'Nhẹ nhàng',xp:10,lucide:'sprout',desc:'5 phút/ngày'},
  {id:'regular',label:'Bình thường',xp:30,lucide:'book-open',desc:'10 phút/ngày'},
  {id:'serious',label:'Nghiêm túc',xp:50,lucide:'flame',desc:'15 phút/ngày'},
  {id:'hardcore',label:'Siêu cường',xp:100,lucide:'trophy',desc:'30 phút/ngày'}
];
function setDailyGoal(levelId){
  var lvl = GOAL_LEVELS.find(function(l){return l.id===levelId;});
  if(!lvl) return;
  var s = getGameState();
  s.dailyGoal = lvl.xp;
  s.dailyGoalLevel = levelId;
  saveGameState(s);
  updateProgressRing();
  showToast('Mục tiêu: '+lvl.label, lvl.xp+' XP/ngày — '+lvl.desc, 'var(--accent)');
  // Update selector UI
  document.querySelectorAll('.goal-opt').forEach(function(el){
    el.classList.toggle('active', el.dataset.goal === levelId);
  });
}
window.setDailyGoal = setDailyGoal;
window.GOAL_LEVELS = GOAL_LEVELS;

// ==================== TOAST ANIMATION CSS ====================
(function(){
  const style=document.createElement('style');
  style.textContent='@keyframes toastIn{from{opacity:0;transform:translateX(100px)}to{opacity:1;transform:translateX(0)}}';
  document.head.appendChild(style);
})();

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded',function(){
  const s=getGameState();
  const today=new Date().toDateString();
  // FIX #1: Streak logic ONLY here — not in addXP()
  if(s.lastDate!==today){
    const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
    if(s.lastDate===yesterday.toDateString()){s.streak++;}
    else if(s.lastDate!==''){s.streak=1;}
    s.todayXP=0;
    s.combo=0;
    s.lastDate=today;
    saveGameState(s);
  }
  // Track page visit for quest
  var page = location.pathname.split('/').pop() || 'index.html';
  if(!s.pagesVisited) s.pagesVisited = [];
  if(s.pagesVisited.indexOf(page) === -1){
    s.pagesVisited.push(page);
    saveGameState(s);
    trackQuestProgress(s, 'visit', 1);
    saveGameState(s);
  }
  // Track streak quest
  if(s.streak >= 1) trackQuestProgress(s, 'streak', s.streak);
  saveGameState(s);
  
  // Init quests for today
  getDailyQuests();
  
  // Show XP bar on all pages except index — DISABLED
  // if(!location.pathname.endsWith('index.html')&&location.pathname!=='/'){
  //   setTimeout(updateXPBar,500);
  // }
  // Progress ring on index
  setTimeout(function(){ updateProgressRing(); renderQuestBoard(); }, 600);

  // ==================== AUTO XP FOR INLINE QUIZZES ====================
  // FIX #2: Replace setInterval with event-based approach using MutationObserver
  var _lastQuizScore='';
  var _quizDone=false;

  // Listen for custom events (fired by quiz code)
  document.addEventListener('ee:quiz-complete', function(e){
    var detail = e.detail || {};
    var got = detail.score || 0;
    var total = detail.total || 0;
    if(got > 0 && typeof addXP === 'function'){
      // FIX #3: XP proportional to correct answers
      addXP(got * 5, 'Trả lời đúng ' + got + '/' + total + ' câu');
    }
    var s2 = getGameState();
    s2.quizCompleted = (s2.quizCompleted || 0) + 1;
    s2.lessonsCompleted = (s2.lessonsCompleted || 0) + 1;
    saveGameState(s2);
    checkBadges(s2);
  });

  // Fallback: MutationObserver for quizzes that don't fire custom events
  var quizObserverTarget = document.getElementById('quizScore') || document.getElementById('quizBox');
  if(quizObserverTarget){
    var observer = new MutationObserver(function(){
      // Check quizScore for score display
      var scoreEl = document.getElementById('quizScore');
      if(scoreEl){
        var txt = scoreEl.textContent || '';
        if(txt && txt !== _lastQuizScore && txt.indexOf('/') > -1){
          _lastQuizScore = txt;
          var m = txt.match(/(\d+)\/(\d+)/);
          if(m){
            var got = parseInt(m[1]), total = parseInt(m[2]);
            if(got > 0 && typeof addXP === 'function'){
              // FIX #3: XP proportional to correct answers
              addXP(got * 5, 'Trả lời đúng ' + got + '/' + total + ' câu');
            }
          }
        }
      }
      // Check for quiz completion (Làm lại button)
      var qb = document.getElementById('quizBox');
      if(qb){
        var btn = qb.querySelector('button[onclick*="renderQz"]');
        if(btn && !_quizDone){
          _quizDone = true;
          var s2 = getGameState();
          s2.quizCompleted = (s2.quizCompleted || 0) + 1;
          s2.lessonsCompleted = (s2.lessonsCompleted || 0) + 1;
          saveGameState(s2);
          checkBadges(s2);
        }
        if(!btn) _quizDone = false;
      }
    });
    // Observe both elements if they exist
    var observeConfig = {childList:true, subtree:true, characterData:true};
    if(document.getElementById('quizScore')) observer.observe(document.getElementById('quizScore'), observeConfig);
    if(document.getElementById('quizBox')) observer.observe(document.getElementById('quizBox'), observeConfig);
  }
});
