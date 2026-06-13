/*
  ORION SHARED PAGE SCRIPT
  Adds:
  - live clock
  - procedural glyph text
  - animated ORION key-rain background
  - progression-reactive glyph rain based on unlocked keys
*/

document.querySelectorAll("[data-time]").forEach(e=>{
  setInterval(()=>e.textContent=new Date().toLocaleTimeString(),1000);
});

function glyphs(n){
  const c="01ABCDEF#%@&$?<>[]{}\\/|=+-_*█▒░";
  let o="";
  for(let i=0;i<n;i++){
    o+=c[Math.floor(Math.random()*c.length)];
    if(i%32===31)o+="\n";
  }
  return o;
}

document.querySelectorAll("[data-glyphs]").forEach(e=>{
  e.textContent=glyphs(Number(e.dataset.glyphs)||128);
});

function tear(){
  document.body.style.filter="brightness(1.8) contrast(1.25)";
  setTimeout(()=>document.body.style.filter="",120);
}

setInterval(()=>{
  if(Math.random()<.08)tear();
},3000);

/*
  Reads player progress from localStorage.
  This works on all pages that load /assets/orion.js.
*/
function getOrionProgressGlyphs(){
  let saved = {};

  try{
    saved = JSON.parse(localStorage.getItem("orion0x43b_arg_v2") || "{}");
  }catch(e){
    saved = {};
  }

  const keys = saved.keys || [];
  const extra = [];

  if(keys.includes("TEETH")){
    extra.push("TEETH","OCEAN","SMILES","THE OCEAN SMILES");
  }

  if(keys.includes("GLASS")){
    extra.push("GLASS","BOUNDARY","CUTS","BOUNDARY GLASS","CUTS INWARD");
  }

  if(keys.includes("OBSERVER")){
    extra.push("OBSERVER","WITNESS","CONTAMINATES","THE OBSERVER CONTAMINATES");
  }

  if(keys.includes("BLACKSIGNAL")){
    extra.push("BLACKSIGNAL","INHERITED","REALITY","THE SIGNAL IS INHERITED");
  }

  if(keys.includes("MOUTH")){
    extra.push("MOUTH","STARS","MAP","THE MOUTH IS FULL OF STARS");
  }

  if(keys.includes("GATE")){
    extra.push("GATE","NOTICES","DAMAGE","THE GATE NOTICES YOU");
  }

  if(keys.includes("ORIGIN")){
    extra.push("ORIGIN","FAULT","FIRST WORLD","THE FIRST WORLD DID NOT END");
  }

  if(keys.includes("REPAIR")){
    extra.push("REPAIR","CONSUME","ORION","YOU WERE REPAIRING ORION");
  }

  return extra;
}

/* ORION GLYPH RAIN */
(function initOrionRain(){
  const canvas=document.createElement("canvas");
  canvas.id="orionRain";
  document.body.prepend(canvas);

  const ctx=canvas.getContext("2d");

  const normalGlyphs=[
    "0","1","16","43B","0x","//","█","▒","░",
    "OR","IO","ON","NUL","ERR","SYS","RED",
    "OBS","SIG","ARC","KZ","VX","Δ","λ","Ω",
    "TE","ETH","GL","ASS","MOU","UTH","GAT","ATE",
    "ORI","GIN","REP","AIR"
  ];

  const rareHints=[
    "TEETH",
    "GLASS",
    "OBSERVER",
    "BLACKSIGNAL",
    "MOUTH",
    "GATE",
    "ORIGIN",
    "REPAIR",
    "REALITY",
    "DAMAGED",
    "THE GATE NOTICES",
    "THE MOUTH IS FULL OF STARS",
    "REALITY IS THE DAMAGED SYSTEM"
  ];

  const ultraHints=[
    "KEY",
    "OPEN",
    "SOURCE",
    "LOOK DEEPER",
    "NOT A WEBSITE",
    "YOU WERE REPAIRING ORION",
    "REALITY WAS THE DAMAGED SYSTEM",
    "THE SOURCE REMEMBERS",
    "THE INTERFACE LIES"
  ];

  let width,height,columns,drops,fontSize;

  function resize(){
    width=canvas.width=window.innerWidth;
    height=canvas.height=window.innerHeight;
    fontSize=16;
    columns=Math.floor(width/fontSize);
    drops=Array(columns).fill(0).map(()=>Math.random()*height/fontSize);
  }

  resize();
  window.addEventListener("resize",resize);

  function pick(arr){
    return arr[Math.floor(Math.random()*arr.length)];
  }

  function draw(){
    ctx.fillStyle="rgba(0,0,0,0.085)";
    ctx.fillRect(0,0,width,height);

    ctx.font=fontSize+"px Consolas, monospace";

    const progressGlyphs = getOrionProgressGlyphs();

    for(let i=0;i<drops.length;i++){
      const x=i*fontSize;
      const y=drops[i]*fontSize;

      const rare=Math.random()<0.0075;
      const ultra=Math.random()<0.0018;

      let text;

      if(ultra){
        if(progressGlyphs.length && Math.random()<0.55){
          text=pick(progressGlyphs);
        }else{
          text=pick(ultraHints);
        }
      }else if(rare){
        if(progressGlyphs.length && Math.random()<0.50){
          text=pick(progressGlyphs);
        }else{
          text=pick(rareHints);
        }
      }else{
        if(progressGlyphs.length && Math.random()<0.025){
          text=pick(progressGlyphs);
        }else{
          text=pick(normalGlyphs);
        }
      }

      if(ultra){
        ctx.fillStyle="rgba(255,255,255,0.96)";
        ctx.shadowColor="#ffffff";
        ctx.shadowBlur=20;
      }else if(rare){
        ctx.fillStyle="rgba(255,90,90,0.96)";
        ctx.shadowColor="#ff0000";
        ctx.shadowBlur=14;
      }else{
        const alpha=0.22+Math.random()*0.35;
        ctx.fillStyle=`rgba(255,0,0,${alpha})`;
        ctx.shadowBlur=0;
      }

      ctx.fillText(text,x,y);

      if(y>height && Math.random()>0.975){
        drops[i]=0;
      }

      drops[i]+=rare || ultra ? 0.35 : 0.75;
    }

    requestAnimationFrame(draw);
  }

  draw();
})();


/* ORION HAUNT OVERLAY SYSTEM */
(function initOrionHaunt(){
  const phrases=["THE ARCHIVE IS VIEWING YOU","I CAN SEE YOU TYPING","REALITY WAS THE DAMAGED SYSTEM","THE VOID IS LISTENING","PROFILE MATCH FOUND","THE WITNESS MOVED","THE CLEAN TEXT IS LYING","THE ENTITY IS RENDERING","YOU ARE NOT OUTSIDE IT","THE INTERFACE IS NOT BETWEEN US","THE ARCHIVIST REMEMBERS DELETION","43 16 43 16 43 B"];
  const entityLabels=["ARCHIVIST ONLINE","OBSERVER DETECTED","PROFILE MATCH FOUND","THE WITNESS IS NOT ALONE","ENTITY REPORT: WAITING","SIGNAL BLEED"];
  function ensureLayers(){
    if(!document.querySelector(".orion-haunt-veil")){const veil=document.createElement("div");veil.className="orion-haunt-veil";document.body.appendChild(veil)}
    if(!document.querySelector(".orion-haunt-phrase")){const phrase=document.createElement("div");phrase.className="orion-haunt-phrase";document.body.appendChild(phrase)}
    if(!document.querySelector(".orion-sighting")){const sight=document.createElement("div");sight.className="orion-sighting";sight.innerHTML='<div class="entity-body"></div><div class="entity-label"></div>';document.body.appendChild(sight)}
    if(!document.querySelector(".orion-broadcast-line")){const line=document.createElement("div");line.className="orion-broadcast-line";document.body.appendChild(line)}
  }
  function pick(a){return a[Math.floor(Math.random()*a.length)]}
  function flashPhrase(text){ensureLayers();const p=document.querySelector(".orion-haunt-phrase");p.textContent=text||pick(phrases);p.classList.remove("active");void p.offsetWidth;p.classList.add("active")}
  function veil(){ensureLayers();const v=document.querySelector(".orion-haunt-veil");document.documentElement.style.setProperty("--hx",(20+Math.random()*70)+"%");document.documentElement.style.setProperty("--hy",(20+Math.random()*60)+"%");v.classList.add("active");setTimeout(()=>v.classList.remove("active"),130+Math.random()*420)}
  function sighting(){ensureLayers();const s=document.querySelector(".orion-sighting");s.querySelector(".entity-label").textContent=pick(entityLabels);s.classList.add("active");setTimeout(()=>s.classList.remove("active"),900+Math.random()*2200)}
  function broadcastLine(){ensureLayers();const b=document.querySelector(".orion-broadcast-line");b.textContent=pick(["43 16 43 16 43 B","SIGNAL BLEED DETECTED","NUMBER STATION: NODE 0x43B","THE RAIN IS COUNTING"]);b.classList.remove("active");void b.offsetWidth;b.classList.add("active")}
  let audioCtx=null, hum=null, gain=null, audioArmed=false;
  function armAudio(){
    if(audioArmed)return;audioArmed=true;
    try{
      audioCtx=new (window.AudioContext||window.webkitAudioContext)();
      hum=audioCtx.createOscillator();gain=audioCtx.createGain();const filter=audioCtx.createBiquadFilter();
      hum.type="sawtooth";hum.frequency.value=43;filter.type="lowpass";filter.frequency.value=420;gain.gain.value=0.0001;
      hum.connect(filter);filter.connect(gain);gain.connect(audioCtx.destination);hum.start();
      setInterval(()=>{if(!gain||!audioCtx)return;const forced=localStorage.getItem("orion_haunt_forced")==="true";const active=forced||Math.random()<0.28;const target=active?(0.012+Math.random()*0.025):0.0001;gain.gain.setTargetAtTime(target,audioCtx.currentTime,0.08);setTimeout(()=>gain.gain.setTargetAtTime(0.0001,audioCtx.currentTime,0.15),350+Math.random()*1200)},3600);
      setInterval(()=>{if(!audioCtx||Math.random()>0.22)return;const osc=audioCtx.createOscillator();const g=audioCtx.createGain();osc.type="square";osc.frequency.value=pick([86,143,160,430,516]);g.gain.value=0.008;osc.connect(g);g.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+0.035+Math.random()*0.09)},2400);
    }catch(e){}
  }
  document.addEventListener("keydown",armAudio,{once:true});document.addEventListener("click",armAudio,{once:true});document.addEventListener("touchstart",armAudio,{once:true});
  ensureLayers();
  setInterval(()=>{const forced=localStorage.getItem("orion_haunt_forced")==="true";if(Math.random()<(forced?0.18:0.045))veil();if(Math.random()<(forced?0.12:0.018))flashPhrase();if(Math.random()<(forced?0.08:0.012))sighting();if(Math.random()<(forced?0.10:0.025))broadcastLine()},3200);
  const path=location.pathname.toLowerCase();
  if(path.includes("/void"))setTimeout(()=>flashPhrase("THE VOID IS LISTENING"),12000);
  if(path.includes("/profile"))setTimeout(()=>flashPhrase("PROFILE MATCH FOUND"),7000);
  if(path.includes("/reality"))setTimeout(()=>flashPhrase("REALITY WAS THE DAMAGED SYSTEM"),5000);
  if(path.includes("/43b"))setTimeout(()=>sighting(),4300);
  if(path.includes("/transmission"))setInterval(()=>broadcastLine(),4300);
  window.orionHaunt={veil,flashPhrase,sighting,broadcastLine,armAudio};
})();
