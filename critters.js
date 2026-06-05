/* ════════════════════════════════════════════════════════════════════
   Geodo Critters — channel mascots that actually walk around.
   Pure SVG + CSS + vanilla JS. No backend, no deps.
   Each outreach channel maps to an animal. The ape (LinkedIn) echoes
   Geo's logo. Critters stroll a "floor", turn at the edges, pause to
   look around, and say hi when you click them.
   ════════════════════════════════════════════════════════════════════ */

// ── Side-profile SVG bodies. Parts carry classes the CSS animates:
//    .c-body (bob)  .leg-fn/.leg-ff/.leg-bn/.leg-bf (gait)  .tail  .ear
//    .arm (ape)  .seg (snake segments)  .wing (bird)  .eye (blink)
// Default facing = RIGHT. Engine flips with scaleX(-1) to face left.

const SVG = {
  ape: `
  <svg class="c-svg" viewBox="0 0 170 140" xmlns="http://www.w3.org/2000/svg">
    <g class="c-body">
      <!-- far legs (darker, behind) -->
      <rect class="leg leg-bf" x="58" y="92" width="15" height="34" rx="7" fill="#26282c"/>
      <rect class="leg leg-ff" x="104" y="92" width="15" height="34" rx="7" fill="#26282c"/>
      <!-- tail-ish lower back + body -->
      <ellipse cx="88" cy="74" rx="50" ry="40" fill="#33363b"/>
      <ellipse cx="92" cy="84" rx="40" ry="30" fill="#3b3e44"/>
      <!-- belly patch -->
      <ellipse cx="96" cy="88" rx="24" ry="20" fill="#54585f"/>
      <!-- near legs -->
      <rect class="leg leg-bn" x="64" y="94" width="17" height="34" rx="8" fill="#33363b"/>
      <rect class="leg leg-fn" x="110" y="94" width="17" height="34" rx="8" fill="#33363b"/>
      <ellipse cx="72" cy="126" rx="11" ry="5" fill="#23252a"/>
      <ellipse cx="118" cy="126" rx="11" ry="5" fill="#23252a"/>
      <!-- swinging arm -->
      <rect class="arm" x="118" y="70" width="16" height="38" rx="8" fill="#2b2e33"/>
      <ellipse cx="126" cy="110" rx="10" ry="7" fill="#23252a"/>
      <!-- head -->
      <g class="head">
        <ellipse class="ear" cx="104" cy="40" rx="11" ry="12" fill="#2b2e33"/>
        <ellipse class="ear" cx="150" cy="40" rx="11" ry="12" fill="#2b2e33"/>
        <circle cx="127" cy="46" r="30" fill="#3b3e44"/>
        <!-- face patch -->
        <ellipse cx="131" cy="54" rx="22" ry="20" fill="#6f747c"/>
        <!-- brow -->
        <path d="M112 36 q15 -10 30 0" stroke="#26282c" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse class="eye" cx="122" cy="46" rx="4.5" ry="5.5" fill="#1c1d20"/>
        <ellipse class="eye" cx="139" cy="46" rx="4.5" ry="5.5" fill="#1c1d20"/>
        <!-- nostrils + mouth -->
        <ellipse cx="126" cy="60" rx="2.4" ry="3.2" fill="#3a3d42"/>
        <ellipse cx="135" cy="60" rx="2.4" ry="3.2" fill="#3a3d42"/>
        <path d="M122 67 q8 6 17 0" stroke="#3a3d42" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>
    </g>
  </svg>`,

  rabbit: `
  <svg class="c-svg" viewBox="0 0 170 140" xmlns="http://www.w3.org/2000/svg">
    <g class="c-body">
      <rect class="leg leg-bf" x="60" y="96" width="13" height="30" rx="6" fill="#d6d8dc"/>
      <rect class="leg leg-ff" x="100" y="96" width="13" height="30" rx="6" fill="#d6d8dc"/>
      <!-- big back foot -->
      <ellipse class="tail" cx="48" cy="92" rx="13" ry="11" fill="#ffffff"/>
      <ellipse cx="92" cy="80" rx="44" ry="36" fill="#eceef1"/>
      <ellipse cx="96" cy="88" rx="30" ry="24" fill="#ffffff"/>
      <rect class="leg leg-bn" x="66" y="98" width="15" height="30" rx="7" fill="#eceef1"/>
      <ellipse cx="62" cy="124" rx="16" ry="7" fill="#dadde1"/>
      <rect class="leg leg-fn" x="106" y="98" width="15" height="30" rx="7" fill="#eceef1"/>
      <ellipse cx="113" cy="126" rx="10" ry="5" fill="#dadde1"/>
      <g class="head">
        <!-- long ears -->
        <ellipse class="ear" cx="118" cy="22" rx="8" ry="24" fill="#eceef1"/>
        <ellipse class="ear" cx="118" cy="22" rx="4" ry="18" fill="#c2c6cc"/>
        <ellipse class="ear ear2" cx="136" cy="20" rx="8" ry="24" fill="#eceef1"/>
        <ellipse class="ear ear2" cx="136" cy="20" rx="4" ry="18" fill="#c2c6cc"/>
        <circle cx="128" cy="58" r="27" fill="#f5f6f7"/>
        <ellipse class="eye" cx="124" cy="56" rx="4.5" ry="5.5" fill="#26282c"/>
        <ellipse class="eye" cx="142" cy="56" rx="4.5" ry="5.5" fill="#26282c"/>
        <ellipse cx="138" cy="66" rx="4" ry="3" fill="#9aa0a8"/>
        <path d="M134 70 q4 4 8 0" stroke="#9aa0a8" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <!-- whiskers -->
        <path d="M142 66 h18 M142 70 h16" stroke="#cfd2d7" stroke-width="1.6" stroke-linecap="round"/>
      </g>
    </g>
  </svg>`,

  snake: `
  <svg class="c-svg snake" viewBox="0 0 190 140" xmlns="http://www.w3.org/2000/svg">
    <g class="c-body">
      <g class="snake-track">
        <circle class="seg" style="--i:7" cx="26"  cy="96" r="13" fill="#2f3237"/>
        <circle class="seg" style="--i:6" cx="46"  cy="96" r="14" fill="#3b3e44"/>
        <circle class="seg" style="--i:5" cx="66"  cy="96" r="15" fill="#4a4e55"/>
        <circle class="seg" style="--i:4" cx="88"  cy="96" r="16" fill="#585c64"/>
        <circle class="seg" style="--i:3" cx="111" cy="96" r="16" fill="#686d75"/>
        <circle class="seg" style="--i:2" cx="133" cy="96" r="16" fill="#7b8088"/>
        <!-- head -->
        <g class="seg head" style="--i:1">
          <ellipse cx="158" cy="94" rx="20" ry="17" fill="#7b8088"/>
          <ellipse cx="166" cy="90" rx="9" ry="8" fill="#969ba3"/>
          <ellipse class="eye" cx="164" cy="86" rx="3.6" ry="4.4" fill="#1c1d20"/>
          <ellipse class="eye" cx="156" cy="88" rx="3.6" ry="4.4" fill="#1c1d20"/>
          <!-- forked tongue -->
          <path class="tongue" d="M178 96 h14 l-5 -4 m5 4 l-5 4" stroke="#8b8f97" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>
    </g>
  </svg>`,

  bird: `
  <svg class="c-svg" viewBox="0 0 170 140" xmlns="http://www.w3.org/2000/svg">
    <g class="c-body">
      <rect class="leg leg-fn" x="78" y="100" width="5" height="24" rx="2.5" fill="#8b8f97"/>
      <rect class="leg leg-bn" x="96" y="100" width="5" height="24" rx="2.5" fill="#8b8f97"/>
      <path d="M74 124 l-7 5 m7 -5 l0 7 m7 -7 l7 5" stroke="#8b8f97" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M92 124 l-7 5 m7 -5 l0 7 m7 -7 l7 5" stroke="#8b8f97" stroke-width="3" stroke-linecap="round" fill="none"/>
      <ellipse cx="92" cy="78" rx="38" ry="34" fill="#4a4e55"/>
      <ellipse cx="96" cy="86" rx="26" ry="22" fill="#c2c6cc"/>
      <path class="wing" d="M86 62 q-30 6 -34 30 q22 6 40 -10 z" fill="#2f3237"/>
      <path class="tail" d="M58 70 q-26 4 -34 -6 q14 -2 30 -12 z" fill="#2f3237"/>
      <g class="head">
        <circle cx="118" cy="58" r="24" fill="#4a4e55"/>
        <ellipse class="eye" cx="120" cy="54" rx="5" ry="6" fill="#1c1d20"/>
        <circle cx="122" cy="52" r="1.6" fill="#fff"/>
        <path d="M138 58 l20 -6 -20 12 z" fill="#9aa0a8"/>
      </g>
    </g>
  </svg>`,

  fox: `
  <svg class="c-svg" viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg">
    <g class="c-body">
      <rect class="leg leg-bf" x="62" y="98" width="12" height="28" rx="6" fill="#26282c"/>
      <rect class="leg leg-ff" x="104" y="98" width="12" height="28" rx="6" fill="#26282c"/>
      <!-- bushy tail -->
      <path class="tail" d="M52 78 q-40 -6 -46 24 q-2 18 18 14 q24 -6 30 -26 z" fill="#4a4e55"/>
      <path class="tail" d="M16 96 q-6 14 12 12 q14 -2 20 -14 q-18 8 -32 2 z" fill="#f4f5f6"/>
      <ellipse cx="92" cy="80" rx="44" ry="34" fill="#4a4e55"/>
      <ellipse cx="96" cy="92" rx="28" ry="18" fill="#f4f5f6"/>
      <rect class="leg leg-bn" x="68" y="100" width="14" height="28" rx="7" fill="#585c64"/>
      <ellipse cx="75" cy="124" rx="9" ry="4" fill="#26282c"/>
      <rect class="leg leg-fn" x="110" y="100" width="14" height="28" rx="7" fill="#585c64"/>
      <ellipse cx="117" cy="124" rx="9" ry="4" fill="#26282c"/>
      <g class="head">
        <path class="ear" d="M104 44 l-6 -28 22 14 z" fill="#4a4e55"/>
        <path class="ear" d="M104 44 l-3 -18 11 9 z" fill="#26282c"/>
        <path class="ear ear2" d="M138 42 l10 -26 -20 16 z" fill="#4a4e55"/>
        <path class="ear ear2" d="M138 42 l5 -16 -10 11 z" fill="#26282c"/>
        <circle cx="122" cy="56" r="26" fill="#585c64"/>
        <path d="M122 58 q18 0 30 -6 q-10 22 -30 20 z" fill="#f4f5f6"/>
        <ellipse class="eye" cx="118" cy="52" rx="4.4" ry="5.4" fill="#1c1d20"/>
        <ellipse class="eye" cx="136" cy="52" rx="4.4" ry="5.4" fill="#1c1d20"/>
        <circle cx="150" cy="62" r="5" fill="#1c1d20"/>
      </g>
    </g>
  </svg>`,

  cat: `
  <svg class="c-svg" viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg">
    <g class="c-body">
      <rect class="leg leg-bf" x="62" y="98" width="12" height="28" rx="6" fill="#3b3e44"/>
      <rect class="leg leg-ff" x="104" y="98" width="12" height="28" rx="6" fill="#3b3e44"/>
      <path class="tail" d="M50 84 q-34 -2 -38 -30 q-1 -14 12 -12 q12 2 10 16 q-2 16 16 18 z" fill="#4a4e55"/>
      <ellipse cx="92" cy="82" rx="44" ry="32" fill="#4a4e55"/>
      <ellipse cx="96" cy="92" rx="28" ry="16" fill="#bcc0c6"/>
      <rect class="leg leg-bn" x="68" y="100" width="14" height="28" rx="7" fill="#585c64"/>
      <ellipse cx="75" cy="124" rx="9" ry="4" fill="#2b2e33"/>
      <rect class="leg leg-fn" x="110" y="100" width="14" height="28" rx="7" fill="#585c64"/>
      <ellipse cx="117" cy="124" rx="9" ry="4" fill="#2b2e33"/>
      <g class="head">
        <path class="ear" d="M106 42 l-4 -24 20 14 z" fill="#4a4e55"/>
        <path class="ear" d="M106 42 l-2 -15 10 9 z" fill="#cfd2d7"/>
        <path class="ear ear2" d="M140 40 l8 -24 -20 16 z" fill="#4a4e55"/>
        <path class="ear ear2" d="M140 40 l4 -15 -11 11 z" fill="#cfd2d7"/>
        <circle cx="124" cy="56" r="26" fill="#585c64"/>
        <ellipse class="eye" cx="118" cy="54" rx="4.6" ry="6" fill="#1c1d20"/>
        <ellipse class="eye" cx="138" cy="54" rx="4.6" ry="6" fill="#1c1d20"/>
        <path d="M124 64 l8 0 -4 4 z" fill="#bcc0c6"/>
        <path d="M128 68 q5 5 11 2 M128 68 q-5 5 -11 2" stroke="#8b8f97" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M140 60 h20 M140 64 h18" stroke="#cfd2d7" stroke-width="1.6" stroke-linecap="round"/>
      </g>
    </g>
  </svg>`,
};

const CRITTERS = {
  linkedin:  { key:'linkedin',  animal:'ape',    name:'LinkedIn',    mascot:'Apollo the Ape',   color:'#0a66c2', tagline:'Connect, message and book demos.',        gait:'walk',    say:"Hi! I'm Apollo. Let's slide into some inboxes 🦍" },
  email:     { key:'email',     animal:'rabbit', name:'Email',       mascot:'Biscuit the Rabbit',color:'#e8674c', tagline:'High-volume sequences that land.',         gait:'walk',    say:"Hey! Biscuit here — I multiply your replies 🐰" },
  agentmail: { key:'agentmail', animal:'snake',  name:'AgentMail',   mascot:'Slinky the Snake',  color:'#16a34a', tagline:'Autonomous agent inboxes.',                gait:'slither', say:"Sssup. I slither into the primary tab 🐍" },
  twitter:   { key:'twitter',   animal:'bird',   name:'Twitter / X', mascot:'Pip the Bird',      color:'#1d9bf0', tagline:'DMs and replies at scale.',                gait:'hop',     say:"Tweet tweet! Let's go viral 🐦" },
  reddit:    { key:'reddit',    animal:'fox',    name:'Reddit',      mascot:'Rusty the Fox',     color:'#ff5a1f', tagline:'Native posts and DMs per subreddit.',      gait:'walk',    say:"Yip! I know every subreddit 🦊" },
  sms:       { key:'sms',       animal:'cat',    name:'SMS',         mascot:'Mochi the Cat',     color:'#7c3aed', tagline:'Texts with the highest open rate.',        gait:'walk',    say:"Meow. 98% open rate, just saying 🐱" },
};

function critterSVG(animalKey){ return SVG[animalKey] || SVG.ape; }

/* ── Walking engine ──────────────────────────────────────────────────
   A critter lives on a "floor" element. It strolls left/right, flips to
   face travel direction, pauses now and then to look around, and reacts
   to clicks (hop + speech bubble). Quadrupeds walk, the snake slithers,
   the bird hops — driven by the `gait` flag from CRITTERS.            */

class CritterWalker {
  constructor(floor, cfg, opts = {}) {
    this.floor = floor;
    this.cfg = cfg;
    this.size = opts.size || 130;
    this.speed = opts.speed || 0.045;        // px per ms
    this.x = opts.startX != null ? opts.startX : 40;
    this.dir = opts.dir || 1;                  // 1 = right, -1 = left
    this.state = 'walk';                       // walk | pause
    this.until = 0;
    this.lastTs = 0;

    const wrap = document.createElement('div');
    wrap.className = 'critter-wrap';
    wrap.style.width = this.size + 'px';
    wrap.innerHTML = `<div class="critter-hop"><div class="critter c-${cfg.animal} gait-${cfg.gait}">${critterSVG(cfg.animal)}</div></div>`;
    this.wrap = wrap;
    this.hop = wrap.querySelector('.critter-hop');
    this.critter = wrap.querySelector('.critter');
    floor.appendChild(wrap);

    this.maxX = () => Math.max(60, floor.clientWidth - this.size);
    this._applyFacing();
    this._setMoving(true);

    this.critter.addEventListener('click', (e) => { e.stopPropagation(); this.sayHi(); });

    this._raf = (ts) => this._tick(ts);
    requestAnimationFrame(this._raf);
  }

  _applyFacing(){ this.critter.classList.toggle('face-left', this.dir === -1); }
  _setMoving(on){ this.critter.classList.toggle('moving', on); this.hop.classList.toggle('hopping', on && this.cfg.gait === 'hop'); }

  _tick(ts){
    if (!this.lastTs) this.lastTs = ts;
    let dt = ts - this.lastTs; this.lastTs = ts;
    if (dt > 60) dt = 60;

    if (this.state === 'walk'){
      this.x += this.dir * this.speed * dt;
      const max = this.maxX();
      if (this.x <= 8){ this.x = 8; this.dir = 1; this._applyFacing(); this._maybePause(); }
      else if (this.x >= max){ this.x = max; this.dir = -1; this._applyFacing(); this._maybePause(); }
      else if (Math.random() < 0.0009){ this._enterPause(700 + Math.random()*1400); }
    } else if (this.state === 'pause'){
      if (ts >= this.until){ this.state = 'walk'; this._setMoving(true); }
    }
    this.wrap.style.transform = `translateX(${this.x}px)`;
    requestAnimationFrame(this._raf);
  }

  _maybePause(){ if (Math.random() < 0.6) this._enterPause(500 + Math.random()*900); }
  _enterPause(ms){ this.state = 'pause'; this._setMoving(false); this.until = performance.now() + ms; }

  sayHi(){
    // little hop
    this.hop.classList.remove('jump'); void this.hop.offsetWidth; this.hop.classList.add('jump');
    // speech bubble
    const old = this.wrap.querySelector('.critter-say'); if (old) old.remove();
    const bubble = document.createElement('div');
    bubble.className = 'critter-say';
    bubble.textContent = this.cfg.say;
    this.wrap.appendChild(bubble);
    requestAnimationFrame(() => bubble.classList.add('show'));
    clearTimeout(this._sayT);
    this._sayT = setTimeout(() => { bubble.classList.remove('show'); setTimeout(() => bubble.remove(), 300); }, 2600);
  }
}

/* ── Channel-card busts: a critter peeking over the top of each card.
   Idle bob + blink, and a wave/hop on hover. Not walking.            */
function mountBust(host, cfg){
  host.innerHTML = `<div class="critter bust c-${cfg.animal} gait-${cfg.gait} idle">${critterSVG(cfg.animal)}</div>`;
  const c = host.querySelector('.critter');
  host.addEventListener('mouseenter', () => { c.classList.remove('wave'); void c.offsetWidth; c.classList.add('wave'); });
  host.addEventListener('click', () => { c.classList.remove('wave'); void c.offsetWidth; c.classList.add('wave'); });
  return c;
}

window.GeodoCritters = { CRITTERS, CritterWalker, mountBust, critterSVG };
