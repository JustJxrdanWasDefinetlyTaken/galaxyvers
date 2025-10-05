// Game data from your original file
const games = [
    { name: "Suggestions", image: "https://iili.io/3OM27wv.th.jpg", url: "https://forms.gle/XbZtk1jfGcqLrVRn6" },
    { name: "1v1.lol", image: "https://iili.io/K0FXGrg.md.jpg", url: "https://scramjet.mercurywork.shop/scramjet/https%3A%2F%2F1v1.lol%2F"},
    { name: "1v1.Older", image: "https://iili.io/K5IQqnn.jpg", url: "https://learn-with.jskjsv6.workers.dev/1v1-lol-online/1v1-lol-online.github.io/main/file/index.html" },
    { name: "1v1 Oldest", image: "https://iili.io/K5mxV4e.th.jpg", url: "https://portal1.statetestingstudies.com.cdn.cloudflare.net/scramjet/https%3A%2F%2Fraw.githack.com%2Fgameazzetz%2Fassets%2Frefs%2Fheads%2Fmain%2F1v1lolold.html" },
    { name: "Amazing Strange Police", image: "https://iili.io/K7FraGp.jpg", url: "https://script.google.com/macros/s/AKfycbwAoMJxFkkCGbz6H0x2lq5uVhb1vvQRKraex1znydX5Gm0jWse3HWUTvdU34ghoPqQauQ/exec"},
    { name: "Cookie Clicker", image: "https://iili.io", url: "https://raw.githack.com/BinBashBanana/gfiles/master/gfiles/html5/cookieclicker/index.html"},
    { name: "BasketBros.IO", image: "https://iili.io/2DOa1lR.md.png", url: "https://script.google.com/macros/s/AKfycbxUfaDSpH-0SJL0WPKt38JY7OOOGMmtpY9JTSbL8pvtjxS7jSpNHHu6MdZgWUshIU00Kw/exec"},
    { name: "Paper.io 2", image: "https://iili.io/Klmfuvj.webp", url: "https://html5.gamedistribution.com/rvvASBMg/paperio2/" },
    { name: "Slope", image: "https://iili.io/KlmT06Q.md.png", url: "https://deltamath111373269.netlify.app/games/slope/" },
    { name: "Subway Surfers", image: "https://iili.io/KlmxoGV.md.jpg", url: "https://deltamath111373269.netlify.app/games/subwaysurfers/" },
    { name: "Wordle", image: "https://iili.io/KIWKE12.md.png", url: "https://gregcameron.com/infinite-wordle/"},
    { name: "Retro Bowl", image: "https://iili.io/K0FNvt4.jpg", url: "https://portal1.statetestingstudies.com.cdn.cloudflare.net/yalp/ela.html?book=retro-bowl&type=3kh0"}
];

// App data from your original file
const apps = [
    { name: "YouTube", image: "https://placehold.co/512x512", url: "https://www.youtube.com" },
    { name: "Spotify", image: "https://placehold.co/512x512", url: "https://scramjet.mercurywork.shop/scramjet/https%3A%2F%2Fopen.spotify.com%2F" },
    { name: "Soundboard", image: "https://placehold.co/512x512", url: "https://raw.githack.com/Teerths/TimelessDevelopments/refs/heads/main/game/soundboard/index.html" }
];

// Debounce utility
function debounce(func, delay = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Hide all content sections
function hideAll() {
  const contents = document.querySelectorAll('.content');
  contents.forEach(c => c.style.display = 'none');
  
  // Remove active class from all nav links
  const navLinks = document.querySelectorAll('.navbar li a');
  navLinks.forEach(link => link.classList.remove('active'));
}

// Show home page
function showHome() {
  hideAll();
  document.getElementById('content-home').style.display = 'block';
  document.getElementById('homeLink').classList.add('active');
}

// Show games section
function showGames() {
  hideAll();
  document.getElementById('content-games').style.display = 'block';
  document.getElementById('gameLink').classList.add('active');
  renderGames(games);
}

// Show about section
function showAbout() {
  hideAll();
  document.getElementById('content-about').style.display = 'block';
  document.getElementById('aboutLink').classList.add('active');
}

// Show apps section
function showApps() {
  hideAll();
  document.getElementById('content-apps').style.display = 'block';
  document.getElementById('appsLink').classList.add('active');
  renderApps(apps);
}

// Show contact section
function showContact() {
  hideAll();
  document.getElementById('content-contact').style.display = 'block';
  document.getElementById('contactLink').classList.add('active');
}

// Render games
function renderGames(gamesToRender) {
  const gameList = document.getElementById('game-list');
  if (!gameList) return;
  
  gameList.innerHTML = '';
  
  gamesToRender.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <button class="play-btn">Play</button>
    `;
    
    card.querySelector('.play-btn').addEventListener('click', () => {
      loadGame(game.url);
    });
    
    gameList.appendChild(card);
  });
}

// Render apps
function renderApps(appsToRender) {
  const appList = document.getElementById('app-list');
  if (!appList) return;
  
  appList.innerHTML = '';
  
  appsToRender.forEach(app => {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `
      <img src="${app.image}" alt="${app.name}">
      <h3>${app.name}</h3>
      <button class="open-btn">Open</button>
    `;
    
    card.querySelector('.open-btn').addEventListener('click', () => {
      loadGame(app.url); // Using same iframe display
    });
    
    appList.appendChild(card);
  });
}

// Load game in iframe
function loadGame(url) {
  hideAll();
  const gameDisplay = document.getElementById('game-display');
  const gameIframe = document.getElementById('game-iframe');
  
  if (gameDisplay && gameIframe) {
    gameIframe.src = url;
    gameDisplay.style.display = 'block';
  }
}

// Search games
function searchGames() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  const query = searchInput.value.toLowerCase().trim();
  
  if (!query) {
    renderGames(games);
    return;
  }
  
  const filtered = games.filter(game => 
    game.name.toLowerCase().includes(query)
  );
  
  renderGames(filtered);
}

// Toggle fullscreen
function toggleFullscreen() {
  const gamePlayArea = document.getElementById('game-play-area');
  if (!gamePlayArea) return;
  
  if (!document.fullscreenElement) {
    gamePlayArea.requestFullscreen().catch(err => {
      console.error('Error attempting to enable fullscreen:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

// Homepage search bar functionality
function homepageSearch() {
  const input = document.getElementById('homepageSearchInput');
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;
  
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.youtube.com/results?search_query=${encodedQuery}`;
  window.open(url, '_blank');
}

// Snow effect implementation
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');

  const size = Math.random() * 4 + 2;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  snowflake.style.left = `${Math.random() * window.innerWidth}px`;

  const fallDuration = Math.random() * 10 + 5;
  snowflake.style.animationDuration = `${fallDuration}s`;
  snowflake.style.animationDelay = `${Math.random() * 15}s`;
  snowflake.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);

  document.getElementById('snow-container').appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, fallDuration * 1000);
}

// Initialize snow effect
setInterval(createSnowflake, 200);

// Initialize on page load
window.onload = () => {
  showHome();

  // Navigation event listeners
  document.getElementById('homeLink').addEventListener('click', e => { e.preventDefault(); showHome(); });
  document.getElementById('gameLink').addEventListener('click', e => { e.preventDefault(); showGames(); });
  document.getElementById('aboutLink').addEventListener('click', e => { e.preventDefault(); showAbout(); });
  document.getElementById('appsLink').addEventListener('click', e => { e.preventDefault(); showApps(); });
  document.getElementById('contactLink').addEventListener('click', e => { e.preventDefault(); showContact(); });

  // Search event listeners for game search
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn) searchBtn.addEventListener('click', searchGames);
  if (searchInput) searchInput.addEventListener('input', debounce(searchGames));
  if (searchInput) searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') searchGames();
  });

  // Back buttons
  const backToHomeApps = document.getElementById('backToHomeApps');
  if (backToHomeApps) backToHomeApps.addEventListener('click', showHome);
  const backToHomeGame = document.getElementById('backToHomeGame');
  if (backToHomeGame) backToHomeGame.addEventListener('click', showHome);

  // Fullscreen toggle button
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => toggleFullscreen());

  // Homepage search bar event listeners
  const homepageSearchBtn = document.getElementById('homepageSearchBtn');
  const homepageSearchInput = document.getElementById('homepageSearchInput');
  if (homepageSearchBtn) homepageSearchBtn.addEventListener('click', homepageSearch);
  if (homepageSearchInput) homepageSearchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') homepageSearch();
  });
};
