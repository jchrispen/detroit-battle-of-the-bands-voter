// Accessible launcher for the official poll. The user casts every vote by hand;
// this app never submits votes, clears cookies, or otherwise bypasses poll limits.
const POLL_URL = 'https://xp.audience.io/poll/1936340';
// Voting closes Sun Nov 29 2026, 12:00 p.m. Eastern (EST = UTC-5).
const CLOSES_AT = new Date('2026-11-29T12:00:00-05:00');

const frame = document.getElementById('ballot-frame');
const reloadBtn = document.getElementById('reload');
const countedBtn = document.getElementById('counted');
const countEl = document.getElementById('count');
const countdownEl = document.getElementById('countdown');
document.getElementById('open-tab').href = POLL_URL;

let count = 0;
try { count = Number(localStorage.getItem('voteCount')) || 0; } catch {}
countEl.textContent = count;

// Setting src (even to the same URL) reloads the frame, same as refreshing the page.
function loadBallot() {
  frame.src = POLL_URL;
}

function markVoted() {
  count += 1;
  countEl.textContent = count;
  try { localStorage.setItem('voteCount', String(count)); } catch {}
}

function updateCountdown() {
  const ms = CLOSES_AT - Date.now();
  if (ms <= 0) {
    countdownEl.textContent = 'Voting has closed.';
    reloadBtn.disabled = true;
    return;
  }
  const h = Math.floor(ms / 3.6e6);
  const m = Math.floor((ms % 3.6e6) / 6e4);
  countdownEl.textContent = `Voting closes in ${h} h ${m} min (Sun Nov 29, noon ET).`;
}

reloadBtn.addEventListener('click', loadBallot);
countedBtn.addEventListener('click', markVoted);

// Single-key shortcuts for keyboard/switch users; ignored while typing or with modifiers.
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key.toLowerCase();
  if (k === 'v') { e.preventDefault(); markVoted(); }
  if (k === 'n' && !reloadBtn.disabled) { e.preventDefault(); loadBallot(); }
});

updateCountdown();
if (!reloadBtn.disabled) loadBallot();
setInterval(updateCountdown, 30000);
