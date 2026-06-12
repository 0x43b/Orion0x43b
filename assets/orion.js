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
