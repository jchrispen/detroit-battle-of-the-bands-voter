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

if (Date.now() >= CLOSES_AT) {
  reloadBtn.textContent = 'Voting is over';
  reloadBtn.disabled = true;
} else {
  reloadBtn.addEventListener('click', loadBallot);
  loadBallot();
}
