// Initial click count
let clickCount = 0;
const revealClicksRequired = 3;

const fakeLayout = document.getElementById('fake-layout');
const realLayout = document.getElementById('real-layout');

document.body.addEventListener('click', () => {
  clickCount++;
  if (clickCount > revealClicksRequired) {
    revealRealWebsite();
  }
});

function revealRealWebsite() {
  fakeLayout.classList.remove('visible');
  fakeLayout.classList.add('hidden');
  realLayout.classList.remove('hidden');
  realLayout.classList.add('visible');
  initializeRealWebsite();
}

// --- Real website data and functions ---

const games = [
  { title: "Suggestions", thumbnail: "https://iili.io/3OM27wv.th.jpg", url: "https://forms.gle/XbZtk1jfGcqLrVRn6" },
  { title: "1v1.lol", thumbnail: "https://iili.io/K0FXGrg.md.jpg", url: "https://scramjet.mercurywork.shop/scramjet/https%3A%2F%2F1v1.lol%2F" },
  { title: "1v1.Older", thumbnail: "https://iili.io/K5IQqnn.jpg", url: "https://learn-with.jskjsv6.workers.dev/1v1-lol-online/1v1-lol-online.github.io/main/file/index.html" },
  { title: "1v1 Oldest", thumbnail: "https://iili.io/K5mxV4e.th.jpg", url: "https://portal1.statetestingstudies.com.cdn.cloudflare.net/scramjet/https%3A%2F%2Fraw.githack.com%2Fgameazzetz%2Fassets%2Frefs%2Fheads%2Fmain%2F1v1lolold.html" },
  { title: "Amazing Strange Police", thumbnail: "https://iili.io/K7FraGp.jpg", url: "https://script.google.com/macros/s/AKfycbwAoMJxFkkCGbz6H0x2lq5uVhb1vvQRKraex1znydX5Gm0jWse3HWUTvdU34ghoPqQauQ/exec" },
  { title: "Cookie Clicker", thumbnail: "https://iili.io", url: "https://raw.githack.com/BinBashBanana/gfiles/master/gfiles/html5/cookieclicker/index.html" },
  { title: "BasketBros.IO", thumbnail: "https://iili.io/2DOa1lR.md.png", url: "https://script.google.com/macros/s/AKfycbxUfaDSpH-0SJL0WPKt38JY7OOOGMmtpY9JTSbL8pvtjxS7jSpNHHu6MdZgWUshIU00Kw/exec" },
  { title: "Paper.io 2", thumbnail: "https://iili.io/Klmfuvj.webp", url: "https://html5.gamedistribution.com/rvvASBMg/paperio2/" },
  { title: "Slope", thumbnail: "https://iili.io/KlmT06Q.md.png", url: "https://deltamath111373269.netlify.app/games/slope/" },
  { title: "Subway Surfers", thumbnail: "https://iili.io/KlmxoGV.md.jpg", url: "https://deltamath111373269.netlify.app/games/subwaysurfers/" },
  { title: "Wordle", thumbnail: "https://iili.io/KIWKE12.md.png", url: "https://gregcameron.com/infinite-wordle/" },
  { title: "Retro Bowl", thumbnail: "https://iili.io/K0FNvt4.jpg", url: "https://portal1.statetestingstudies.com.cdn.cloudflare.net/yalp/ela.html?book=retro-bowl&type=3kh0" }
];

const apps = [
  { title: "YouTube", thumbnail: "https://placehold.co/512x512", url: "https://www.youtube.com" },
  { title: "Spotify", thumbnail: "https://placehold.co/512x512", url: "https://scramjet.mercurywork.shop/scramjet/https%3A%2F%2Fopen.spotify.com%2F" },
  { title: "Soundboard", thumbnail: "https://placehold.co/512x512", url: "https://raw.githack.com/Teerths/TimelessDevelopments/refs/heads/main/game/soundboard/index.html" }
];

function initializeRealWebsite() {
  // Setup nav links
  document.getElementById('homeLink').addEventListener('click', e => { e.preventDefault(); showHome(); });
  document.getElementById('gameLink').addEventListener('click', e => { e.preventDefault(); showGames(); });
  document.getElementById('aboutLink').addEventListener('click', e => { e.preventDefault(); showAbout(); });
  document.getElementById('appsLink').addEventListener('click', e => { e.preventDefault(); showApps(); });
  document.getElementById('contactLink').addEventListener('click', e => { e.preventDefault(); showContact(); });
  document.getElementById('searchBtn').addEventListener('click', searchGames);
  document.getElementById('backToHomeApps').addEventListener('click', showHome);
  document.getElementById('backToHomeGame').addEventListener('click', showHome);
  document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);

  showHome();
}

function showHome() {
  hideAllContent();
  document.getElementById('content-home').style.display = 'block';
  setActiveNav('homeLink');
}

function showGames() {
  hideAllContent();
  document.getElementById('content-games').style.display = 'block';
  renderGames(games);
  setActiveNav('gameLink');
}

function showAbout() {
  hideAllContent();
  document.getElementById('content-about').style.display = 'block';
  setActiveNav('aboutLink');
}

function showApps() {
  hideAllContent();
  document.getElementById('content-apps').style.display = 'block';
  renderApps(apps);
  setActiveNav('appsLink');
}

function showContact() {
  hideAllContent();
  document.getElementById('content-contact').style.display = 'block';
  setActiveNav('contactLink');
}

function hideAllContent() {
  const contents = document.querySelectorAll('.content');
  contents.forEach(el => el.style.display = 'none');
}

function setActiveNav(activeId) {
  const links = document.querySelectorAll('.navbar li a');
  links.forEach(link => link.classList.remove('active'));
  document.getElementById(activeId).classList.add('active');
}

function renderGames(gameList) {
  const container = document.getElementById('game-list');
  container.innerHTML = '';
  if (gameList.length === 0) {
    container.innerHTML = '<p>No games found. Try another search.</p>';
    return;
  }
  gameList.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `<img src="${game.thumbnail}" alt="${game.title}"><h3>${game.title}</h3>`;
    card.onclick = () => loadGame(game.url);
    container.appendChild(card);
  });
}

function renderApps(appList) {
  const container = document.getElementById('app-list');
  container.innerHTML = '';
  appList.forEach(app => {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `<img src="${app.thumbnail}" alt="${app.title}"><h3>${app.title}</h3>`;
    card.onclick = () => loadGame(app.url);
    container.appendChild(card);
  });
}

function loadGame(url) {
  hideAllContent();
  const gameDisplay = document.getElementById('game-display');
  const iframe = document.getElementById('game-iframe');
  iframe.src = url;
  gameDisplay.style.display = 'block';
}

function toggleFullscreen() {
  const playArea = document.getElementById('game-play-area');
  const btn = document.getElementById('fullscreenBtn');
  const fullscreenClass = 'fullscreen';
  if (playArea.classList.contains(fullscreenClass)) {
    playArea.classList.remove(fullscreenClass);
    btn.textContent = 'Fullscreen';
  } else {
    playArea.classList.add(fullscreenClass);
    btn.textContent = 'Exit Fullscreen';
  }
}

function searchGames() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  const filtered = games.filter(g => g.title.toLowerCase().includes(term));
  renderGames(filtered);
}

document.getElementById('backToHomeApps')?.addEventListener('click', showHome);
document.getElementById('backToHomeGame')?.addEventListener('click', showHome);
