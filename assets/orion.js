/*
  ORION SHARED PAGE SCRIPT
  Adds:
  - live clock
  - procedural glyph text
  - animated ORION key-rain background
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

    for(let i=0;i<drops.length;i++){
      const x=i*fontSize;
      const y=drops[i]*fontSize;

      const rare=Math.random()<0.006;
      const ultra=Math.random()<0.0015;

      let text=rare ? pick(rareHints) : pick(normalGlyphs);

      if(ultra){
        text=pick([
          "KEY",
          "OPEN",
          "SOURCE",
          "LOOK DEEPER",
          "NOT A WEBSITE",
          "YOU WERE REPAIRING ORION"
        ]);
      }

      if(rare || ultra){
        ctx.fillStyle=ultra ? "rgba(255,255,255,0.95)" : "rgba(255,80,80,0.95)";
        ctx.shadowColor=ultra ? "#ffffff" : "#ff0000";
        ctx.shadowBlur=ultra ? 18 : 12;
      }else{
        const alpha=0.22+Math.random()*0.35;
        ctx.fillStyle=`rgba(255,0,0,${alpha})`;
        ctx.shadowBlur=0;
      }

      ctx.fillText(text,x,y);

      if(y>height && Math.random()>0.975){
        drops[i]=0;
      }

      drops[i]+=rare ? 0.35 : 0.75;
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
