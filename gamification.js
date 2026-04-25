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
  {id:'first_lesson',name:'Bài đầu tiên',desc:'Hoàn thành 1 bài học',icon:'star',condition:s=>s.lessonsCompleted>=1},
  {id:'streak_3',name:'3 ngày liên tiếp',desc:'Học 3 ngày liền',icon:'flame',condition:s=>s.streak>=3},
  {id:'streak_7',name:'Tuần lễ vàng',desc:'Học 7 ngày liền',icon:'zap',condition:s=>s.streak>=7},
  {id:'streak_30',name:'Tháng kiên trì',desc:'Học 30 ngày liền',icon:'shield',condition:s=>s.streak>=30},
  {id:'vocab_50',name:'50 từ vựng',desc:'Tra/học 50 từ',icon:'book',condition:s=>s.wordsLearned>=50},
  {id:'vocab_200',name:'200 từ vựng',desc:'Tra/học 200 từ',icon:'library',condition:s=>s.wordsLearned>=200},
  {id:'quiz_10',name:'10 quiz',desc:'Hoàn thành 10 quiz',icon:'check-circle',condition:s=>s.quizCompleted>=10},
  {id:'quiz_50',name:'50 quiz',desc:'Hoàn thành 50 quiz',icon:'award',condition:s=>s.quizCompleted>=50},
  {id:'xp_1000',name:'1000 XP',desc:'Đạt 1000 điểm XP',icon:'target',condition:s=>s.totalXP>=1000},
  {id:'xp_5000',name:'5000 XP',desc:'Đạt 5000 điểm XP',icon:'crown',condition:s=>s.totalXP>=5000},
];

function getGameState(){
  const def = {totalXP:0,todayXP:0,dailyGoal:30,streak:0,lastDate:'',lessonsCompleted:0,wordsLearned:0,quizCompleted:0,badges:[],todayChallengeDone:false};
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

// ==================== ADD XP ====================
function addXP(amount, reason){
  const s=getGameState();
  const today=new Date().toDateString();
  
  // Reset daily XP if new day
  if(s.lastDate!==today){
    // Check streak
    const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
    if(s.lastDate===yesterday.toDateString()){s.streak++;}
    else if(s.lastDate!==today){s.streak=1;}
    s.todayXP=0;
    s.todayChallengeDone=false;
    s.lastDate=today;
  }
  
  const oldLevel=getLevel(s.totalXP);
  s.totalXP+=amount;
  s.todayXP+=amount;
  const newLevel=getLevel(s.totalXP);
  
  saveGameState(s);
  
  // Level up!
  if(newLevel.index>oldLevel.index){
    playSound('levelup');
    showToast('Level Up!','Bạn đã lên '+newLevel.name+' !','var(--accent2)');
    showConfetti();
  } else {
    playSound('correct');
    showToast('+'+amount+' XP',reason||'','var(--accent)');
  }
  
  // Check badges
  checkBadges(s);
  updateXPBar();
}

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
const SOUNDS={};
function initSounds(){
  // Generate sounds using AudioContext (no external files needed)
  const ctx=new(window.AudioContext||window.webkitAudioContext)();
  SOUNDS.correct=()=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(523,ctx.currentTime);o.frequency.setValueAtTime(659,ctx.currentTime+0.1);g.gain.setValueAtTime(0.3,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.3);o.start(ctx.currentTime);o.stop(ctx.currentTime+0.3);};
  SOUNDS.wrong=()=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='square';o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(200,ctx.currentTime);o.frequency.setValueAtTime(150,ctx.currentTime+0.15);g.gain.setValueAtTime(0.2,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.3);o.start(ctx.currentTime);o.stop(ctx.currentTime+0.3);};
  SOUNDS.levelup=()=>{const notes=[523,659,784,1047];notes.forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(f,ctx.currentTime+i*0.12);g.gain.setValueAtTime(0.25,ctx.currentTime+i*0.12);g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+i*0.12+0.3);o.start(ctx.currentTime+i*0.12);o.stop(ctx.currentTime+i*0.12+0.3);});};
  SOUNDS.badge=()=>{const notes=[784,988,1175];notes.forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='triangle';o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(f,ctx.currentTime+i*0.15);g.gain.setValueAtTime(0.3,ctx.currentTime+i*0.15);g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+i*0.15+0.4);o.start(ctx.currentTime+i*0.15);o.stop(ctx.currentTime+i*0.15+0.4);});};
}
function playSound(name){
  try{if(!SOUNDS[name])initSounds();SOUNDS[name]();}catch(e){}
}

// ==================== TOAST ====================
function showToast(title,sub,color){
  let c=document.getElementById('ee-toast-container');
  if(!c){
    c=document.createElement('div');c.id='ee-toast-container';
    c.style.cssText='position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:8px';
    document.body.appendChild(c);
  }
  const t=document.createElement('div');
  t.style.cssText='background:rgba(11,26,30,0.95);backdrop-filter:blur(20px);border:1px solid '+(color||'var(--accent)')+';border-radius:12px;padding:12px 18px;min-width:200px;animation:toastIn .3s ease-out;box-shadow:0 8px 32px rgba(0,0,0,0.4)';
  t.innerHTML='<div style="font-size:14px;font-weight:500;color:'+(color||'var(--accent)')+'">'+title+'</div>'+(sub?'<div style="font-size:12px;color:var(--text3);margin-top:2px">'+sub+'</div>':'');
  c.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(100px)';t.style.transition='all .3s';setTimeout(()=>t.remove(),300);},2500);
}

// ==================== CONFETTI ====================
function showConfetti(){
  const canvas=document.createElement('canvas');
  canvas.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998';
  document.body.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  const pieces=[];const colors=['#64d8a5','#a78bfa','#f0c27a','#f4845f','#6bcb77','#ff8a80'];
  for(let i=0;i<80;i++){pieces.push({x:canvas.width/2+Math.random()*200-100,y:canvas.height/2,vx:(Math.random()-0.5)*15,vy:Math.random()*-18-5,size:Math.random()*8+4,color:colors[Math.floor(Math.random()*colors.length)],rot:Math.random()*360,rotV:(Math.random()-0.5)*10});}
  let frame=0;
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.4;p.rot+=p.rotV;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.color;ctx.globalAlpha=Math.max(0,1-frame/60);ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);ctx.restore();});
    frame++;
    if(frame<80)requestAnimationFrame(animate);else canvas.remove();
  }
  animate();
}

// ==================== XP BAR (below nav) ====================
function updateXPBar(){
  const s=getGameState();
  const lv=getLevel(s.totalXP);
  const next=getNextLevel(s.totalXP);
  const pct=next?Math.min(100,((s.totalXP-lv.minXP)/(next.minXP-lv.minXP))*100):100;
  
  let bar=document.getElementById('ee-xp-bar');
  if(!bar){
    bar=document.createElement('div');bar.id='ee-xp-bar';
    bar.style.cssText='position:fixed;top:0;left:0;right:0;z-index:199;display:flex;align-items:center;justify-content:center;gap:8px;padding:6px 16px;font-size:11px;color:var(--text2);font-family:"DM Sans",sans-serif;white-space:nowrap;cursor:pointer;transition:transform .35s cubic-bezier(.4,0,.2,1),opacity .35s ease;background:rgba(11,26,30,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:0.5px solid var(--border)';
    bar.onclick=()=>{window.location.href='progress.html';};
    document.body.appendChild(bar);

    // Position below nav
    function positionBar(){
      var nav=document.querySelector('nav');
      if(nav){bar.style.top=nav.offsetHeight+'px';}
      else{bar.style.top='0';}
    }
    positionBar();
    window.addEventListener('resize',positionBar);

    // Auto-hide on mobile after 4s
    var hideTimer;
    function autoHideMobile(){
      if(window.innerWidth<=900){
        clearTimeout(hideTimer);
        bar.style.opacity='1';bar.style.transform='translateY(0)';
        hideTimer=setTimeout(function(){
          bar.style.opacity='0';bar.style.transform='translateY(-100%)';
        },4000);
      } else {
        bar.style.opacity='1';bar.style.transform='translateY(0)';
      }
    }
    autoHideMobile();
    window.addEventListener('resize',autoHideMobile);
  }
  bar.innerHTML=`
    <i data-lucide="${lv.icon}" style="width:14px;height:14px;color:var(--accent)"></i>
    <span style="font-weight:500;color:var(--text)">${lv.name}</span>
    <div style="width:80px;height:3px;background:var(--border);border-radius:2px">
      <div style="width:${pct}%;height:100%;background:var(--accent);border-radius:2px;transition:width .5s"></div>
    </div>
    <span style="color:var(--accent);font-weight:500">${s.totalXP} XP</span>
    <span style="color:var(--text3);font-size:10px"> ${s.streak} ngày</span>
  `;
  if(typeof lucide!=='undefined'&&lucide.createIcons)setTimeout(()=>lucide.createIcons(),100);
}


// ==================== DAILY CHALLENGE ====================
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
];

function getDailyChallenge(){
  const dayOfYear=Math.floor((new Date()-new Date(new Date().getFullYear(),0,0))/86400000);
  return DAILY_WORDS[dayOfYear%DAILY_WORDS.length];
}

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
  if(s.lastDate!==today){
    const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
    if(s.lastDate===yesterday.toDateString()){s.streak++;}
    else if(s.lastDate!==''){s.streak=1;}
    s.todayXP=0;
    s.lastDate=today;
    saveGameState(s);
  }
  // Show XP bar on all pages except index
  if(!location.pathname.endsWith('index.html')&&location.pathname!=='/'){
    setTimeout(updateXPBar,500);
  }
});
