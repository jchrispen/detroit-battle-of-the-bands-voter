// Accessible launcher for the official poll. The user casts every vote by hand;
// this app never submits votes, clears cookies, or otherwise bypasses poll limits.
const POLL_URL = 'https://xp.audience.io/poll/1936340';
// Voting closes Sun Nov 29 2026, 12:00 p.m. Eastern (EST = UTC-5).
const CLOSES_AT = new Date('2026-11-29T12:00:00-05:00');

const frame = document.getElementById('ballot-frame');
const reloadBtn = document.getElementById('reload');
document.getElementById('open-tab').href = POLL_URL;

// Setting src (even to the same URL) reloads the frame, same as refreshing the page.
function loadBallot() {
  frame.src = POLL_URL;
}

// The poll posts {action: 'finishedSurvey'} to its parent page when a vote completes.
// Wait a moment so the confirmation is visible, then load a fresh ballot.
const POLL_ORIGIN = new URL(POLL_URL).origin;
const RELOAD_DELAY_MS = 3000;
window.addEventListener('message', (e) => {
  if (e.origin !== POLL_ORIGIN) return;
  console.debug('[poll message]', e.data); // check DevTools console to confirm the vote signal
  if (e.data && e.data.action === 'finishedSurvey' && Date.now() < CLOSES_AT) {
    setTimeout(loadBallot, RELOAD_DELAY_MS);
  }
});

if (Date.now() >= CLOSES_AT) {
  reloadBtn.textContent = 'Voting is over';
  reloadBtn.disabled = true;
} else {
  reloadBtn.addEventListener('click', loadBallot);
  loadBallot();
}
