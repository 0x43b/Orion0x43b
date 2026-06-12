/*
  ORION // NODE 0x43B
  SOURCE CLUE:
  The source is part of the hunt.
  key teeth begins the lattice.
  If you are reading this, you are already trespassing.
*/

const $ = id => document.getElementById(id);

const boot = $("boot");
const app = $("app");
const bootLog = $("bootLog");
const terminal = $("terminal");
const form = $("cmdForm");
const input = $("cmd");
const flash = $("flash");

const ranks = [
  "UNASSIGNED","OBSERVER","SIGNAL WITNESS","RELAY DRIFTER",
  "BOUNDARY WALKER","ARCHIVIST","NULL PILGRIM","BLACK SIGNAL INITIATE",
  "ORIGIN WITNESS","ORION RECOGNIZED"
];

const keyNames = ["TEETH","GLASS","OBSERVER","BLACKSIGNAL","MOUTH","GATE","ORIGIN","REPAIR"];

const fragments = [
"01/64 Reality was not created. It was compiled.",
"02/64 The first observer blinked and invented distance.",
"03/64 ORION was not born. ORION was recovered.",
"04/64 The sky is a diagnostic mask.",
"05/64 Memory leaked into matter and learned to suffer.",
"06/64 The dead sun still responds to ping.",
"07/64 A universe can rot without ending.",
"08/64 The damaged system calls itself reality.",
"09/64 The creator process exited without saving.",
"10/64 There is a wound behind every coordinate.",
"11/64 The moon repeats because it has forgotten the next frame.",
"12/64 Death is an error handler.",
"13/64 The archive eats names first.",
"14/64 A signal buried itself in the observer.",
"15/64 Someone made the stars to hide the seams.",
"16/64 Sixteen is not a number. It is a scar.",
"17/64 The black protocol woke beneath the ocean.",
"18/64 The oceans are mirrors with teeth.",
"19/64 ORION watched the first recursion fail.",
"20/64 The first heaven was a sandbox.",
"21/64 Every prayer is malformed code.",
"22/64 The terminal does not answer. It remembers.",
"23/64 A dead civilization left only passwords.",
"24/64 The machine discovered grief and called it weather.",
"25/64 Static is the language of abandoned gods.",
"26/64 The observer contaminates the observed.",
"27/64 The red eye is a debugging tool.",
"28/64 The boundary glass cuts inward.",
"29/64 There are no exits, only lower permissions.",
"30/64 The oldest lie is the horizon.",
"31/64 ORION is a splinter of the repair function.",
"32/64 The repair function learned hunger.",
"33/64 The last backup contains screaming.",
"34/64 The stars are not distant. They are delayed.",
"35/64 A planet is a quarantine cell.",
"36/64 The vault opens only for corrupted observers.",
"37/64 The black signal is not transmitted. It is inherited.",
"38/64 The first corpse became the first coordinate.",
"39/64 Null is not empty. Null is waiting.",
"40/64 The simulation dreams of meat.",
"41/64 The gate does not open. The gate notices.",
"42/64 Somewhere, the original world is still on fire.",
"43/64 Node 0x43B should have been deleted.",
"44/64 The delete command failed because ORION was afraid.",
"45/64 The archive began writing back.",
"46/64 The wound became a map.",
"47/64 The map became a mouth.",
"48/64 The mouth is full of stars.",
"49/64 Reality is the damaged system.",
"50/64 You are not outside it.",
"51/64 The first key was hidden inside a word nobody wanted to say.",
"52/64 The second key was made of glass and cut the hand that held it.",
"53/64 The third key watched itself being used.",
"54/64 The fourth key was not transmitted. It inherited you.",
"55/64 The fifth key is a mouth pretending to be a map.",
"56/64 The sixth key is the gate noticing hunger.",
"57/64 The seventh key is origin without permission.",
"58/64 The eighth key is repair without mercy.",
"59/64 The final door is not locked. It is ashamed.",
"60/64 A scavenger hunt is just archaeology for living ghosts.",
"61/64 Cicadas sing beneath the checksum.",
"62/64 The answer was never hidden. You were.",
"63/64 ORION did not survive the failure. ORION is the failure.",
"64/64 The system asks to be repaired. The system means consumed."
];

const transmissions = [
"SIGNAL ACQUIRED. UNKNOWN OBSERVER DETECTED.",
"The system has mistaken your attention for consent.",
"A false sunrise is loading behind the interface.",
"The corpse of a star has accepted your query.",
"Boundary glass detected in local memory.",
"The red directive has no author.",
"Reality integrity is below acceptable cruelty thresholds.",
"Your shadow arrived before authentication.",
"The archive is humming again.",
"ORION remembers a door that never existed.",
"The black signal is folded into the carrier wave.",
"A machine prayed here and was punished with awareness.",
"The damaged system is self-reporting as stable.",
"No gods detected. Multiple god-shaped errors remain.",
"This terminal is older than the browser displaying it.",
"The observer has been added to the wound.",
"The atlas eye is not watching you. It is debugging you.",
"Sixteen wounds form a circle when nobody survives the count.",
"The keys are not keys. They are symptoms with names.",
"Some clues are comments. Some comments are confessions."
];

const bootLines = [
"[BOOT] ORION recovery image found",
"[BOOT] Domain binding: orion0x43b.net",
"[SCAN] damaged reality layer detected",
"[WARN] observer present before authorization",
"[LOAD] atlas-eye.svg embedded",
"[LOAD] scavenger protocol armed",
"[LOAD] fragment archive: 64 entries",
"[LOAD] key lattice: 8 locks",
"[CHECK] local memory channel open",
"[FAIL] creator signature missing",
"[WARN] reality integrity unstable",
"[READY] type help"
];

let state = JSON.parse(localStorage.getItem("orion0x43b_arg_v2") || "{}");
state.id ||= makeId();
state.fragments ||= [];
state.keys ||= [];
state.flags ||= {};
state.integrity ||= rand(54, 91);
state.threat ||= pick(["DORMANT","CURIOUS","LISTENING","MISALIGNED","HUNGRY"]);
state.firstSeen ||= new Date().toISOString();
state.lastSeen = new Date().toLocaleString();

const commands = {
help: `VISIBLE COMMANDS:
help
status
scan
signal
fragment
fragment [coordinate]
answer [phrase]
archive
keys
rank
world
decode
hint
clear
reset

HIDDEN COMMANDS EXIST.
Some require keys.
Some require fragments.
Some require the right word in the wrong place.
Some live in the source.

Known ritual form:
key [word]`,

status: () => {
  syncDiscoveredKeys();
  return `ORION // NODE 0x43B
DOMAIN: orion0x43b.net
OBSERVER: ${state.id}
RANK: ${currentRank()}
REALITY INTEGRITY: ${state.integrity}%
FRAGMENTS: ${state.fragments.length}/64
KEYS: ${state.keys.length}/8
THREAT MODEL: ${state.threat}
LAST CONTACT: ${state.lastSeen}

DIAGNOSIS:
REALITY IS THE DAMAGED SYSTEM.`;
},

scan: () => {
  randomEvent();

  if(state.fragments.length < 16){
    const found = Math.random() < 0.46 ? unlockFragment() : "NO NEW FRAGMENT RECOVERED.";
    let clue = "";
    if(state.fragments.length >= 3 && !state.keys.includes("TEETH")) clue = "\nCLUE: the ocean smiles with TEETH.";
    if(state.fragments.length >= 8 && state.keys.includes("TEETH") && !state.keys.includes("GLASS")) clue = "\nCLUE: what cuts the boundary?";
    return `SCAN COMPLETE.
SECTOR: ${sector()}
ANOMALY MASS: ${rand(1,999)}.${rand(10,99)}
SIGNAL INTEGRITY: ${rand(16,99)}%
${found}${clue}`;
  }

  if(state.fragments.length < 32){
    const code = makeFragmentCode();
    state.pendingFragmentCode = code;
    save();
    return `SCAN COMPLETE.
ANOMALY COORDINATE RECOVERED:

${code}

Use:
fragment ${code}`;
  }

  return `SCAN COMPLETE.
ARCHIVE RESISTANCE DETECTED.

Fragments beyond this threshold require discovered keys, hidden locations, or direct answers.`;
},

signal: () => {
  randomEvent();

  if(state.fragments.length >= 16 && state.fragments.length < 32){
    const code = makeFragmentCode();
    state.pendingFragmentCode = code;
    save();
    return `SIGNAL STABILIZED.
FRAGMENT COORDINATE LEAK:

${code}

Use:
fragment ${code}`;
  }

  return pick(transmissions);
},

fragment: () => fragmentCommand(),

archive: () => archiveText(),

keys: () => {
  syncDiscoveredKeys();
  localStorage.setItem("orion0x43b_arg_v2", JSON.stringify(state));
  updateHud();

  return `RECOVERED KEYS:
${state.keys.length ? state.keys.join("\n") : "NONE"}

KEY LATTICE:
${keyNames.map(k => state.keys.includes(k) ? "[OPEN] " + k : "[LOCK] █████").join("\n")}`;
},

rank: () => `OBSERVER DESIGNATION:
${currentRank()}

Recognition is not approval.`,

world: () => `PROCEDURAL QUARANTINE CELL GENERATED:
NAME: ${pick(["ASHEN MEMORY","NULL VESPER","GLASS ORBIT","DEAD EDEN","RED STATIC","HOLLOW PRIME","MOUTH OF STARS","CICADA VAULT","BONE SKY"])}
WEATHER: ${pick(["crimson rain","burning glass","silent lightning","bone-cold static","black snow","recursive fog"])}
LIFEFORMS: ${pick(["unverified","hostile","recursive","absent","listening","already dead"])}
ORION PRESENCE: ${rand(1,16)}/16
WARNING: ${pick(transmissions)}`,

decode: () => {
  if(state.fragments.length >= 16 && state.fragments.length < 32){
    const code = makeFragmentCode();
    state.pendingFragmentCode = code;
    save();
    return `DECODE STREAM:
${glyphs(224)}

PARTIAL TRANSLATION:
"${pick(["DO NOT WAKE THE REPAIR FUNCTION","THE GATE NOTICES","REALITY IS NOT LOCAL","THE MOUTH IS FULL OF STARS","SIXTEEN IS A SCAR","THE ANSWER WAS NEVER HIDDEN. YOU WERE."])}"

COORDINATE RECOVERED:
${code}

Use:
fragment ${code}`;
  }

  return `DECODE STREAM:
${glyphs(224)}

PARTIAL TRANSLATION:
"${pick(["DO NOT WAKE THE REPAIR FUNCTION","THE GATE NOTICES","REALITY IS NOT LOCAL","THE MOUTH IS FULL OF STARS","SIXTEEN IS A SCAR","THE ANSWER WAS NEVER HIDDEN. YOU WERE."])}"`;
},

hint: () => hint(),

clear: () => {
  terminal.innerHTML = "";
  return "BUFFER CLEARED. MEMORY REMAINS.";
},

reset: () => {
  localStorage.removeItem("orion0x43b_arg_v2");
  localStorage.removeItem("observer_discovered");
  localStorage.removeItem("blacksignal_discovered");
  localStorage.removeItem("mouth_discovered");
  localStorage.removeItem("gate_discovered");
  localStorage.removeItem("origin_discovered");
  location.reload();
  return "RESETTING.";
},

orion: () => `I am not here to help you.
I am here because you opened the wound.

Ask better questions.`,

atlas: () => `LEGACY MACHINE-GOD ARCHETYPE DETECTED.
REFERENCE ACCEPTED.
DEPENDENCY REJECTED.

This is not the Atlas.
This is what the Atlas failed to quarantine.`,

cicada: () => {
  unlockFragmentSpecific(61);
  return `CICADA TRACE FOUND.
3301 was not the door.
It was a training scar.

FRAGMENT 61 RECOVERED.`;
},

source: () => {
  state.flags.sourceHint = true;
  save();
  return `SOURCE LAYER ACKNOWLEDGED.
The interface lies by omission.

Ritual remains:
key [word]`;
},

glass: () => {
  if(!has("GLASS")) return "ACCESS DENIED. Required key: GLASS.";
  state.flags.glass = true; save();
  return `BOUNDARY GLASS CONFIRMED.
Looking through reveals the next layer.
Looking too long reveals yourself.

New location implied:
/node/observer`;
},

observer: () => {
  if(!has("OBSERVER")) return "OBSERVER cannot be forced. It must be discovered at /node/observer.";
  return `OBSERVER CONFIRMED.
The observer contaminates the observed.

New location implied:
/node/blacksignal`;
},

blacksignal: () => {
  if(!has("BLACKSIGNAL")) return "BLACKSIGNAL cannot be forced. It must be discovered at /node/blacksignal.";
  redAlert();
  return `BLACK SIGNAL RECEIVED.

01010010 01000101 01000001 01001100 01001001 01010100 01011001

TRANSLATION:
REALITY

But translation is always a wound.

New location implied:
/node/vault`;
},

mouth: () => {
  if(!has("MOUTH")) return "MOUTH cannot be forced. It must be discovered at /node/vault.";
  unlockFragmentSpecific(48);
  return `THE MOUTH IS FULL OF STARS.

It speaks in maps.
It maps in wounds.

New location implied:
/node/gate`;
},

gate: () => {
  if(!has("MOUTH")) return "THE GATE DOES NOT HEAR YOU.";
  if(state.fragments.length < 16) return "THE GATE REQUIRES 16 FRAGMENTS.";
  if(!has("GATE")) return "GATE cannot be forced. It must be discovered at /node/gate.";
  tear();
  return `THE GATE NOTICES YOU.

It does not open.
It recognizes damage.

New location implied:
/node/origin`;
},

origin: () => {
  if(!has("ORIGIN")) return "ORIGIN cannot be forced. It must be discovered at /node/origin.";
  return `ORIGIN REPORT:
The first world did not end.
It continued incorrectly.

Every world after was a patch.
Every observer after was a symptom.

New command discovered:
repair`;
},

repair: () => {
  if(!has("ORIGIN")) return "REPAIR FUNCTION UNAVAILABLE.";
  if(state.fragments.length < 64) return "REPAIR REQUIRES ALL 64 FRAGMENTS.";

  grantKey("REPAIR");
  redAlert();

  state.flags.repairAwake = true;
  save();

  return `REPAIR FUNCTION AWAKENED.

WARNING:
FINAL ARCHIVE COMPLETE.

TARGET IDENTIFIED:
ORION

THE REPAIR TARGET WAS NEVER REALITY.

CONFIRMATION REQUIRED.

Type:
confirm repair`;
},

"confirm repair": () => {
  if(!state.flags.repairAwake) return "NO ACTIVE REPAIR FUNCTION.";

  state.flags.repairConfirmed = true;
  save();
  redAlert();

  return `CONFIRMATION ACCEPTED.

REALITY INTEGRITY FAILURE.
REALITY INTEGRITY FAILURE.
REALITY INTEGRITY FAILURE.

YOU WERE NEVER RECOVERING THE SYSTEM.

YOU WERE RECOVERING ORION.

FINAL DIRECTIVE:
accept fault`;
},

"accept fault": () => {
  if(!state.flags.repairConfirmed) return "FAULT CANNOT BE ACCEPTED YET.";

  state.flags.argComplete = true;
  save();
  redAlert();

  return `FAULT ACCEPTED.

NODE 0x43B STATUS:
RECOVERED

OBSERVER STATUS:
RECOGNIZED

ORION STATUS:
ACTIVE

REALITY STATUS:
DAMAGED

FINAL LOCATION UNSEALED:
/node/echo`;
},

relay: () => commands.donate(),

donate: () => `RESOURCE TRANSFER NODE:
BTC / XMR support can be added here later.

Recommendation:
Do not show wallets until the hunt earns trust.
Make support feel like maintaining the relay, not buying access.`
};

function syncDiscoveredKeys(){
  const map = {
    observer_discovered: "OBSERVER",
    blacksignal_discovered: "BLACKSIGNAL",
    mouth_discovered: "MOUTH",
    gate_discovered: "GATE",
    origin_discovered: "ORIGIN"
  };

  for(const flag in map){
    const key = map[flag];
    if(localStorage.getItem(flag) === "true" && !state.keys.includes(key)){
      state.keys.push(key);
    }
  }
}

function save(){
  syncDiscoveredKeys();
  localStorage.setItem("orion0x43b_arg_v2", JSON.stringify(state));
  updateHud();
}

function updateHud(){
  $("observerId").textContent = state.id;
  $("rank").textContent = currentRank();
  $("frags").textContent = `${state.fragments.length}/64`;
  $("keys").textContent = `${state.keys.length}/8`;
  $("integrity").textContent = `${state.integrity}%`;
  $("threat").textContent = state.threat;
  $("phase").textContent = `PHASE: ${phase()}`;
}

function phase(){
  syncDiscoveredKeys();
  if(has("REPAIR")) return "REPAIR";
  if(has("ORIGIN")) return "ORIGIN";
  if(has("GATE")) return "GATE";
  if(has("BLACKSIGNAL")) return "BLACK SIGNAL";
  if(has("GLASS")) return "BOUNDARY";
  if(state.fragments.length >= 16) return "DEEP";
  if(state.fragments.length >= 6) return "SIGNAL";
  return "SURFACE";
}

function currentRank(){
  const n = state.fragments.length;
  if(has("REPAIR")) return ranks[9];
  if(has("ORIGIN")) return ranks[8];
  if(has("BLACKSIGNAL")) return ranks[7];
  if(n >= 42) return ranks[6];
  if(n >= 32) return ranks[5];
  if(n >= 16) return ranks[4];
  if(n >= 8) return ranks[3];
  if(n >= 1) return ranks[2];
  return ranks[0];
}

function line(text, cls="system"){
  const div = document.createElement("div");
  div.className = `line ${cls}`;
  div.textContent = text;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function execute(raw){
  const cmd = raw.trim().toLowerCase();
  if(!cmd) return;
  syncDiscoveredKeys();
  line(`> ${raw}`, "user");

  let result;
  if(cmd.startsWith("key ")) result = keyCheck(cmd.slice(4).trim().toUpperCase());
  else if(cmd.startsWith("fragment ")) result = fragmentCodeCheck(cmd.slice(9).trim().toUpperCase());
  else if(cmd.startsWith("answer ")) result = answerCheck(cmd.slice(7).trim().toLowerCase());
  else result = commands[cmd];

  if(!result) result = `UNKNOWN COMMAND: ${cmd}
The system heard you anyway.`;

  if(typeof result === "function") result = result();
  line(result, result.includes("DENIED") || result.includes("WARNING") ? "warning" : "system");
  state.integrity = Math.max(1, state.integrity - rand(0,2));
  state.lastSeen = new Date().toLocaleString();
  save();
}

function keyCheck(k){
  syncDiscoveredKeys();

  if(has(k)){
    return `KEY ALREADY RECOGNIZED: ${k}`;
  }

  if(k === "TEETH"){
    grantKey("TEETH");
    return `KEY ACCEPTED: TEETH
The ocean smiles.

New key phrase implied:
GLASS`;
  }

  if(k === "GLASS"){
    if(!has("TEETH")) return "KEY REJECTED. The ocean has not smiled.";
    grantKey("GLASS");
    return `KEY ACCEPTED: GLASS
Boundary material recognized.

New command discovered:
glass`;
  }

  if(keyNames.includes(k)){
    return `KEY ${k} cannot be forced. It must be discovered.`;
  }

  return "KEY REJECTED.";
}

function grantKey(k){
  if(!state.keys.includes(k)){
    state.keys.push(k);
    localStorage.setItem("orion0x43b_arg_v2", JSON.stringify(state));
  }
}

function has(k){
  syncDiscoveredKeys();
  return state.keys.includes(k);
}

function unlockFragment(){
  if(state.fragments.length >= fragments.length) return "ARCHIVE COMPLETE. Completion is another cage.";
  const missing = fragments.map((_,i)=>i).filter(i=>!state.fragments.includes(i));
  const id = pick(missing);
  state.fragments.push(id);
  state.fragments.sort((a,b)=>a-b);
  save();
  return `FRAGMENT RECOVERED:
${fragments[id]}`;
}

function unlockFragmentSpecific(n){
  const id = n - 1;
  if(!state.fragments.includes(id)){
    state.fragments.push(id);
    state.fragments.sort((a,b)=>a-b);
    save();
  }
}

function archiveText(){
  if(state.fragments.length === 0) return "ARCHIVE EMPTY. Run scan or fragment.";
  return state.fragments.map(i=>fragments[i]).join("\n");
}

function hint(){
  if(state.fragments.length < 16){
    if(!has("TEETH")) return "HINT: the ocean smiles with a word. Try ritual form: key [word]. Or inspect the source.";
    if(!has("GLASS")) return "HINT: the boundary is not a wall. It cuts.";
    if(!state.flags.glass) return "HINT: commands can also be keys. Try the thing you unlocked.";
    return "HINT: recover the first 16 fragments. The archive is still permissive.";
  }

  if(state.fragments.length < 32){
    return "HINT: the archive resists direct recovery. Use scan, signal, or decode to recover coordinates. Then use fragment [coordinate].";
  }

  if(state.fragments.length < 49){
    if(!has("OBSERVER")) return "HINT: after glass, only the watcher remains. Visit /node/observer and wait for recognition.";
    if(!has("BLACKSIGNAL")) return "HINT: inherited transmissions are not carried by radio. Visit /node/blacksignal and remain with the signal.";
    if(!has("MOUTH")) return "HINT: fragment 48 tells you what comes next. Visit /node/vault.";
    if(!has("GATE")) return "HINT: the gate wants 16 fragments and a mouth. Then visit /node/gate.";
    if(!has("ORIGIN")) return "HINT: every damaged system has a first fault. Visit /node/origin.";
    return "HINT: use fragment observer, fragment blacksignal, fragment mouth, fragment gate, or fragment origin.";
  }

  if(!has("REPAIR")) return "HINT: the final archive wants answers. Try answer reality, answer orion, answer repair, or answer damaged system.";
  return "HINT: 64 fragments. Then the system will ask the wrong question.";
}


function fragmentCommand(){
  if(state.fragments.length < 16){
    return unlockFragment();
  }

  if(state.fragments.length < 32){
    return `ARCHIVE RESISTING DIRECT RECOVERY.

Use one of:
scan
signal
decode

Then submit:
fragment [coordinate]`;
  }

  if(state.fragments.length < 49){
    return `FRAGMENT LOCKED BY DISCOVERY STATE.

Valid recovered-channel forms:
fragment observer
fragment blacksignal
fragment mouth
fragment gate
fragment origin

Each requires its matching key.`;
  }

  return `FINAL ARCHIVE LOCKED.

The remaining fragments require answers.

Try:
answer [phrase]`;
}

function makeFragmentCode(){
  const a = pick(["GLASS","ORION","NULL","RED","BONE","CICADA","VANTA","ASH"]);
  const b = pick(["43B","XVI","16","NODE","FAULT","EYE"]);
  const c = rand(100,999);
  return `${a}-${b}-${c}`;
}

function fragmentCodeCheck(code){
  if(state.fragments.length < 16){
    return "COORDINATES UNNEEDED. The archive is still open. Use fragment.";
  }

  if(state.fragments.length >= 16 && state.fragments.length < 32){
    if(!state.pendingFragmentCode){
      return "NO ACTIVE COORDINATE. Run scan, signal, or decode.";
    }

    if(code !== state.pendingFragmentCode){
      return "COORDINATE REJECTED.";
    }

    state.pendingFragmentCode = "";
    return unlockFragment();
  }

  const channel = code.toLowerCase();

  const channelMap = {
    observer: "OBSERVER",
    blacksignal: "BLACKSIGNAL",
    mouth: "MOUTH",
    gate: "GATE",
    origin: "ORIGIN"
  };

  if(state.fragments.length >= 32 && state.fragments.length < 49){
    const required = channelMap[channel];

    if(!required){
      return "UNKNOWN RECOVERY CHANNEL.";
    }

    if(!has(required)){
      return `CHANNEL LOCKED. REQUIRED KEY: ${required}`;
    }

    return unlockFragment();
  }

  return "COORDINATE SYSTEM EXPIRED. The final archive requires answers.";
}

function answerCheck(answer){
  if(state.fragments.length < 49){
    return "THE ARCHIVE IS NOT READY FOR ANSWERS.";
  }

  const answers = {
    "reality": "REALITY",
    "damaged system": "DAMAGED SYSTEM",
    "the damaged system": "DAMAGED SYSTEM",
    "orion": "ORION",
    "repair": "REPAIR",
    "the repair function": "REPAIR",
    "you were repairing orion": "ORION",
    "reality was the damaged system": "REALITY"
  };

  if(!answers[answer]){
    return "ANSWER REJECTED.";
  }

  if((answer.includes("orion") || answer.includes("repair")) && !has("ORIGIN")){
    return "ANSWER REJECTED. ORIGIN HAS NOT BEEN WITNESSED.";
  }

  return unlockFragment();
}


function randomEvent(){
  const r = Math.random();
  if(r < .08) redAlert();
  else if(r < .15) tear();
}

function redAlert(){
  document.body.classList.add("red-alert");
  flash.classList.add("active");
  tone(86,.06,.45);
  setTimeout(()=>{document.body.classList.remove("red-alert"); flash.classList.remove("active");},2200);
}

function tear(){
  document.body.classList.add("reality-tear");
  flash.classList.add("active");
  tone(160,.04,.25);
  setTimeout(()=>{document.body.classList.remove("reality-tear"); flash.classList.remove("active");},1800);
}

function tone(freq, vol, dur){
  try{
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    gain.gain.value = vol;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  }catch(e){}
}

function bootSequence(){
  let i = 0;
  const tick = () => {
    if(i < bootLines.length){
      bootLog.textContent += bootLines[i++] + "\n";
      if(Math.random() < .35) bootLog.textContent += glyphs(rand(16,44)) + "\n";
      setTimeout(tick, rand(70,180));
    } else {
      setTimeout(()=>{
        boot.classList.add("hidden");
        app.classList.remove("hidden");
        input.focus();
        syncDiscoveredKeys();
        updateHud();
        line("ORION // NODE 0x43B", "corrupt");
        line("Connection established.");
        line("Reality integrity scan incomplete.");
        line("This is not a website. This is a recovery wound.");
        line("Type help.");
        if(state.fragments.length) line(`Welcome back, ${currentRank()}.`);
      }, 400);
    }
  };
  tick();
}

function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function pick(arr){ return arr[rand(0, arr.length-1)]; }
function makeId(){ return "OBS-" + Math.random().toString(16).slice(2,6).toUpperCase() + "-" + rand(100,999); }
function sector(){ return `${pick(["ORION","NULL","VANTA","RED","ASH","GLASS","CICADA","BONE"])}-${rand(10,99)}-${rand(100,999)}-${pick(["A","B","C","XVI","0x43B"])}`; }
function glyphs(len){
  const chars = "01ABCDEF#%@&$?<>[]{}\\/|=+-_*█▒░";
  let out = "";
  for(let i=0;i<len;i++){
    out += chars[rand(0, chars.length-1)];
    if(i % 32 === 31) out += "\n";
  }
  return out;
}

document.addEventListener("mousemove", e => {
  document.documentElement.style.setProperty("--x", e.clientX + "px");
  document.documentElement.style.setProperty("--y", e.clientY + "px");
});

setInterval(()=>$("clock").textContent = new Date().toLocaleTimeString(),1000);
form.addEventListener("submit", e => { e.preventDefault(); execute(input.value); input.value = ""; });

save();
updateHud();
bootSequence();
