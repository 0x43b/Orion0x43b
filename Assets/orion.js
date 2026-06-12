document.querySelectorAll("[data-time]").forEach(e=>setInterval(()=>e.textContent=new Date().toLocaleTimeString(),1000));
function glyphs(n){const c="01ABCDEF#%@&$?<>[]{}\\/|=+-_*█▒░";let o="";for(let i=0;i<n;i++){o+=c[Math.floor(Math.random()*c.length)];if(i%32===31)o+="\n"}return o}
document.querySelectorAll("[data-glyphs]").forEach(e=>e.textContent=glyphs(Number(e.dataset.glyphs)||128));
function tear(){document.body.style.filter="brightness(1.8) contrast(1.25)";setTimeout(()=>document.body.style.filter="",120)}
setInterval(()=>{if(Math.random()<.08)tear()},3000);
