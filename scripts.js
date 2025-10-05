// Game data from your original file
const games = [
    { name: "Suggestions", image: "https://iili.io/3OM27wv.th.jpg", url: "https://forms.gle/XbZtk1jfGcqLrVRn6" },
    { name: "1v1.lol", image: "https://iili.io/K0FXGrg.md.jpg", url: "https://scramjet.mercurywork.shop/scramjet/https%3A%2F%2F1v1.lol%2F"},
    { name: "1v1.Older", image: "https://iili.io/K5IQqnn.jpg", url: "https://learn-with.jskjsv6.workers.dev/1v1-lol-online/1v1-lol-online.github.io/main/file/index.html" },
    { name: "1v1 Oldest", image: "https://iili.io/K5mxV4e.th.jpg", url: "https://portal1.statetestingstudies.com.cdn.cloudflare.net/scramjet/https%3A%2F%2Fraw.githack.com%2Fgameazzetz%2Fassets%2Frefs%2Fheads%2Fmain%2F1v1lolold.html" },
    { name: "Amazing Strange Police", image: "https://iili.io/K7FraGp.jpg", url: "https://script.google.com/macros/s/AKfycbwAoMJxFkkCGbz6H0x2lq5uVhb1vvQRKraex1znydX5Gm0jWse3HWUTvdU34ghoPqQauQ/exec"},
    { name: "Cookie Clicker", image: "https://iili.io/dCXKd71.png", url: "https://raw.githack.com/BinBashBanana/gfiles/master/gfiles/html5/cookieclicker/index.html"},
    { name: "BasketBros.IO", image: "https://iili.io/2DOa1lR.md.png", url: "https://script.google.com/macros/s/AKfycbxUfaDSpH-0SJL0WPKt38JY7OOOGMmtpY9JTSbL8pvtjxS7jSpNHHu6MdZgWUshIU00Kw/exec"},
    { name: "Paper.io 2", image: "https://iili.io/Klmfuvj.webp", url: "https://html5.gamedistribution.com/rvvASBMg/paperio2/" },
    { name: "Slope", image: "https://iili.io/KlmT06Q.md.png", url: "https://deltamath111373269.netlify.app/games/slope/" },
    { name: "Subway Surfers", image: "https://iili.io/KlmxoGV.md.jpg", url: "https://deltamath111373269.netlify.app/games/subwaysurfers/" },
    { name: "Wordle", image: "https://iili.io/KIWKE12.md.png", url: "https://gregcameron.com/infinite-wordle/"},
    { name: "Retro Bowl", image: "https://iili.io/K0FNvt4.jpg", url: "https://portal1.statetestingstudies.com.cdn.cloudflare.net/yalp/ela.html?book=retro-bowl&type=3kh0"}
];

// App data from your original file
const apps = [
    { name: "YouTube", image: "https://iili.io/dCXK4Lv.png", url: "https://www.youtube.com" },
    { name: "Spotify", image: "https://iili.io/dCXKc6N.png", url: "https://scramjet.mercurywork.shop/scramjet/https%3A%2F%2Fopen.spotify.com%2F" },
    { name: "Soundboard", image: "https://iili.io/dCXKMB2.png", url: "https://raw.githack.com/Teerths/TimelessDevelopments/refs/heads/main/game/soundboard/index.html" }
];

// Tab Cloaking Presets
const presets = {
  google: { title: "Google", favicon: "https://www.google.com/favicon.ico" },
  classroom: { title: "Home", favicon: "https://ssl.gstatic.com/classroom/favicon.png" },
  bing: { title: "Bing", favicon: "https://bing.com/favicon.ico" },
  nearpod: { title: "Nearpod", favicon: "https://nearpod.com/favicon.ico" },
  powerschool: { title: "PowerSchool Sign In", favicon: "https://powerschool.com/favicon.ico" },
  edge: { title: "New Tab", favicon: "https://www.bing.com/favicon.ico" },
  chrome: { title: "New Tab", favicon: "https://www.google.com/favicon.ico" }
};

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

// Show settings (opens modal instead of content)
function showSettings() {
  const modal = document.getElementById('settingsModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

// Render games
function renderGames(gamesToRender) {
  const gameList = document.getElementById('game-list');
  if (!gameList) return;
  
  gameList.innerHTML = '';
  
  if (gamesToRender.length === 0) {
    gameList.innerHTML = '<p>No games found. Try a different search term.</p>';
    return;
  }
  
  gamesToRender.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
    `;
    
    card.onclick = () => loadGame(game.url);
    
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
    `;
    
    card.onclick = () => loadGame(app.url);
    
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
let snowEnabled = true;
let snowInterval;

function createSnowflake() {
  if (!snowEnabled) return;
  
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

  const snowContainer = document.getElementById('snow-container');
  if (snowContainer) {
    snowContainer.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, (fallDuration + 15) * 1000);
  }
}

function startSnow() {
  if (snowInterval) return;
  snowEnabled = true;
  snowInterval = setInterval(createSnowflake, 200);
}

function stopSnow() {
  snowEnabled = false;
  if (snowInterval) {
    clearInterval(snowInterval);
    snowInterval = null;
  }
  const snowContainer = document.getElementById('snow-container');
  if (snowContainer) {
    snowContainer.innerHTML = '';
  }
}

// Settings Modal Functions
function applyTabCloaking(title, favicon) {
  if (title) {
    document.title = title;
    localStorage.setItem('TabCloak_Title', title);
  }
  if (favicon) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = favicon;
    localStorage.setItem('TabCloak_Favicon', favicon);
  }
}

function loadSettings() {
  const savedTitle = localStorage.getItem('TabCloak_Title');
  const savedFavicon = localStorage.getItem('TabCloak_Favicon');
  const savedSnow = localStorage.getItem('snowEffect');
  const savedHotkey = localStorage.getItem('hotkey') || '`';
  const savedRedirect = localStorage.getItem('redirectURL') || 'https://google.com';
  const savedAboutBlank = localStorage.getItem('aboutBlank');

  if (savedTitle) {
    document.title = savedTitle;
    const titleInput = document.getElementById('customTitle');
    if (titleInput) titleInput.value = savedTitle;
  }
  
  if (savedFavicon) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = savedFavicon;
    const faviconInput = document.getElementById('customFavicon');
    if (faviconInput) faviconInput.value = savedFavicon;
  }

  if (savedSnow === 'disabled') {
    snowEnabled = false;
    const snowToggle = document.getElementById('snowToggle');
    if (snowToggle) snowToggle.checked = false;
    stopSnow();
  } else {
    startSnow();
  }

  const hotkeyInput = document.getElementById('hotkey-input');
  const redirectInput = document.getElementById('redirect-url-input');
  if (hotkeyInput) hotkeyInput.value = savedHotkey;
  if (redirectInput) redirectInput.value = savedRedirect;

  const aboutBlankToggle = document.getElementById('aboutBlankToggle');
  if (aboutBlankToggle) {
    if (savedAboutBlank === null || savedAboutBlank === 'enabled') {
      aboutBlankToggle.checked = true;
    } else {
      aboutBlankToggle.checked = false;
    }
  }
}

// Initialize on page load
window.onload = () => {
  loadSettings();
  showHome();

  // Modal elements
  const modal = document.getElementById('settingsModal');
  const closeBtn = document.querySelector('.close');

  // Close modal
  if (closeBtn) {
    closeBtn.onclick = () => {
      if (modal) modal.style.display = 'none';
    };
  }

  // Close modal when clicking outside
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };

  // Tab Cloaking - Apply button
  const applyBtn = document.getElementById('applyBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const title = document.getElementById('customTitle').value;
      const favicon = document.getElementById('customFavicon').value;
      applyTabCloaking(title, favicon);
      alert('Tab cloaking applied!');
    });
  }

  // Tab Cloaking - Reset button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('TabCloak_Title');
      localStorage.removeItem('TabCloak_Favicon');
      document.title = 'GalaxyVerse';
      let link = document.querySelector("link[rel~='icon']");
      if (link) link.href = '';
      document.getElementById('customTitle').value = '';
      document.getElementById('customFavicon').value = '';
      document.getElementById('presetSelect').value = '';
      alert('Tab cloaking reset!');
    });
  }

  // Tab Cloaking - Preset selector
  const presetSelect = document.getElementById('presetSelect');
  if (presetSelect) {
    presetSelect.addEventListener('change', (e) => {
      const selected = presets[e.target.value];
      if (selected) {
        document.getElementById('customTitle').value = selected.title;
        document.getElementById('customFavicon').value = selected.favicon;
        applyTabCloaking(selected.title, selected.favicon);
      }
    });
  }

  // Snow toggle
  const snowToggle = document.getElementById('snowToggle');
  if (snowToggle) {
    snowToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        localStorage.setItem('snowEffect', 'enabled');
        startSnow();
      } else {
        localStorage.setItem('snowEffect', 'disabled');
        stopSnow();
      }
    });
  }

  // Panic button hotkey setup
  const hotkeyInput = document.getElementById('hotkey-input');
  const changeHotkeyBtn = document.getElementById('change-hotkey-btn');
  
  if (hotkeyInput) {
    hotkeyInput.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.key.length === 1 || e.key === 'Escape' || e.key.startsWith('F')) {
        hotkeyInput.value = e.key;
      }
    });
  }

  if (changeHotkeyBtn) {
    changeHotkeyBtn.addEventListener('click', () => {
      const newHotkey = hotkeyInput.value.trim();
      if (newHotkey) {
        localStorage.setItem('hotkey', newHotkey);
        alert('Panic hotkey changed to: ' + newHotkey);
      } else {
        alert('Please enter a valid hotkey.');
      }
    });
  }

  // Redirect URL setup
  const changeURLBtn = document.getElementById('change-URL-btn');
  if (changeURLBtn) {
    changeURLBtn.addEventListener('click', () => {
      let newURL = document.getElementById('redirect-url-input').value.trim();
      if (newURL && !/^https?:\/\//i.test(newURL)) {
        newURL = 'https://' + newURL;
      }
      if (newURL) {
        localStorage.setItem('redirectURL', newURL);
        alert('Redirect URL changed to: ' + newURL);
      } else {
        alert('Please enter a valid URL.');
      }
    });
  }

  // Panic button listener
  window.addEventListener('keydown', (e) => {
    const savedHotkey = localStorage.getItem('hotkey') || '`';
    const redirectURL = localStorage.getItem('redirectURL') || 'https://google.com';
    if (e.key === savedHotkey) {
      location.replace(redirectURL);
    }
  });

  // About:blank toggle
  const aboutBlankToggle = document.getElementById('aboutBlankToggle');
  if (aboutBlankToggle) {
    aboutBlankToggle.addEventListener('change', (e) => {
      const value = e.target.checked ? 'enabled' : 'disabled';
      localStorage.setItem('aboutBlank', value);
      if (e.target.checked) {
        alert('About:blank cloaking enabled. Reload the page to apply.');
      }
    });
  }

  // Navigation event listeners
  document.getElementById('homeLink').addEventListener('click', e => { e.preventDefault(); showHome(); });
  document.getElementById('gameLink').addEventListener('click', e => { e.preventDefault(); showGames(); });
  document.getElementById('aboutLink').addEventListener('click', e => { e.preventDefault(); showAbout(); });
  document.getElementById('appsLink').addEventListener('click', e => { e.preventDefault(); showApps(); });
  document.getElementById('settingsLink').addEventListener('click', e => { e.preventDefault(); showSettings(); });
  document.getElementById('contactLink').addEventListener('click', e => { e.preventDefault(); showContact(); });

  // Search event listeners for game search
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn) searchBtn.addEventListener('click', searchGames);
  if (searchInput) {
    searchInput.addEventListener('input', debounce(searchGames));
    searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') searchGames();
    });
  }

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
  if (homepageSearchInput) {
    homepageSearchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') homepageSearch();
    });
  }
};
