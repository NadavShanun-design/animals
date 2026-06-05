/* Page bootstrap — external (so it runs under strict CSP too).
   channels grid uses <body data-mode="channels">; campaign pages use
   <body data-channel="linkedin|email|agentmail">. */
(function () {
  const ready = (fn) => document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

  const ICON = {
    linkedin:'<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v16H.2zM8 8h4.4v2.2h.06c.62-1.16 2.13-2.4 4.39-2.4 4.7 0 5.15 3.04 5.15 7v9.2H17.4v-8.16c0-1.95-.04-4.45-2.72-4.45-2.72 0-3.14 2.12-3.14 4.31V24H8z"/>',
    email:'<path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v.4l-10 6.1L2 5.9v-.4zM2 8.2V18.5A1.5 1.5 0 0 0 3.5 20h17a1.5 1.5 0 0 0 1.5-1.5V8.2l-9.48 5.78a1 1 0 0 1-1.04 0z"/>',
    agentmail:'<path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v.4l-10 6.1L2 5.9v-.4zM2 8.2V18.5A1.5 1.5 0 0 0 3.5 20h17a1.5 1.5 0 0 0 1.5-1.5V8.2l-9.48 5.78a1 1 0 0 1-1.04 0z"/>',
    twitter:'<path d="M18.24 2.25h3.31l-7.23 8.26L23 21.75h-6.66l-5.21-6.82-5.97 6.82H1.85l7.73-8.84L1 2.25h6.83l4.71 6.23zM17.08 19.77h1.83L7.08 4.13H5.12z"/>',
    reddit:'<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5.5 9.3c.02.16.03.32.03.49 0 2.6-3.02 4.7-6.74 4.7s-6.74-2.1-6.74-4.7c0-.17.01-.33.03-.49A1.66 1.66 0 117.1 8.4a8.2 8.2 0 014.04-1.06l.76-3.56 2.48.53a1.25 1.25 0 11-.19.9l-1.93-.41-.57 2.7c1.47.05 2.8.45 3.84 1.06a1.66 1.66 0 111.96 2.45zM9.3 12.4a1.1 1.1 0 102.2 0 1.1 1.1 0 00-2.2 0zm6.5 0a1.1 1.1 0 10-2.2 0 1.1 1.1 0 002.2 0zm-1.04 2.86a.42.42 0 00-.6-.02c-.5.46-1.27.62-2.16.62s-1.66-.16-2.16-.62a.42.42 0 10-.58.6c.74.7 1.8.86 2.74.86s2-.16 2.74-.86a.42.42 0 00.02-.58z"/>',
    sms:'<path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>'
  };
  const PAGE = { linkedin:'campaign-linkedin.html', email:'campaign-email.html', agentmail:'campaign-agentmail.html' };
  const SPAWN = {
    linkedin:  [[150,.050,30,1],[104,.070,360,-1]],
    email:     [[142,.055,40,1],[100,.075,380,-1]],
    agentmail: [[172,.042,30,1],[120,.060,400,-1]],
  };

  ready(function () {
    const G = window.GeodoCritters;
    if (!G) { console.error('GeodoCritters missing'); return; }
    const { CRITTERS, CritterWalker, mountBust } = G;
    const body = document.body;

    // ── channels picker grid ──
    if (body.dataset.mode === 'channels') {
      const grid = document.getElementById('grid');
      Object.values(CRITTERS).forEach((c) => {
        const card = document.createElement('a');
        card.className = 'chan-card';
        if (PAGE[c.key]) card.href = PAGE[c.key];
        card.innerHTML =
          '<div class="chan-perch"></div>' +
          '<div class="chan-meta">' + (PAGE[c.key] ? 'Connected' : 'Connect') + '</div>' +
          '<div class="chan-head"><div class="chan-badge" style="background:' + c.color + '"><svg viewBox="0 0 24 24">' + ICON[c.key] + '</svg></div>' +
          '<div><h3>' + c.name + '</h3><div class="mascot">' + c.mascot + '</div></div></div>' +
          '<p>' + c.tagline + '</p>' +
          '<span class="chan-go" style="background:' + c.color + '">Start campaign →</span>';
        grid.appendChild(card);
        mountBust(card.querySelector('.chan-perch'), c);
        if (!PAGE[c.key]) card.addEventListener('click', (e) => e.preventDefault());
      });
      return;
    }

    // ── campaign builder: spawn the channel's critters on the floor ──
    const key = body.dataset.channel;
    if (key && CRITTERS[key]) {
      const c = CRITTERS[key];
      const pill = document.getElementById('pill'); if (pill) pill.style.background = c.color;
      const send = document.getElementById('send'); if (send) send.style.background = c.color;
      const floor = document.getElementById('floor');
      if (floor) (SPAWN[key] || [[150,.05,40,1]]).forEach(([size, speed, startX, dir]) =>
        new CritterWalker(floor, c, { size, speed, startX, dir }));
    }
  });
})();
