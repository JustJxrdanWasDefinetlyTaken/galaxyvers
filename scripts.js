// About:blank cloaking - runs before page loads
(function() {
  const aboutBlankEnabled = localStorage.getItem('aboutBlank');
  
  // Check if we're NOT already in an about:blank iframe
  const isInAboutBlank = window.self !== window.top;
  
  // If about:blank is NOT explicitly disabled and we're not already in about:blank
  if (aboutBlankEnabled !== 'disabled' && !isInAboutBlank) {
    const currentURL = window.location.href;
    
    // Open about:blank window
    const win = window.open('about:blank', '_blank');
    
    if (win) {
      // Write the content to the new window
      win.document.open();
      win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>New Tab</title>
          <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>">
        </head>
        <body style="margin:0;padding:0;overflow:hidden;">
          <iframe src="${currentURL}" style="position:fixed;top:0;left:0;width:100%;height:100%;border:none;"></iframe>
        </body>
        </html>
      `);
      win.document.close();
      
      // Close the original tab
      window.location.replace('about:blank');
      window.close();
    }
  }
})();

// About:blank cloaking - runs before page loads
(function() {
  const aboutBlankEnabled = localStorage.getItem('aboutBlank');
  
  // If about:blank is enabled (or not set, defaulting to enabled) and we're not already in about:blank
  if ((aboutBlankEnabled === null || aboutBlankEnabled === 'enabled') && !window.location.href.includes('about:blank')) {
    const currentURL = window.location.href;
    
    // Open about:blank window
    const win = window.open('about:blank', '_blank');
    
    if (win) {
      // Write the content to the new window
      win.document.open();
      win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>New Tab</title>
          <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>">
        </head>
        <body style="margin:0;padding:0;overflow:hidden;">
          <iframe src="${currentURL}" style="position:fixed;top:0;left:0;width:100%;height:100%;border:none;"></iframe>
        </body>
        </html>
      `);
      win.document.close();
      
      // Close the original tab
      window.location.replace('about:blank');
      window.close();
    }
  }
})();

// Game data - loaded from local files
const games = [
  { 
    name: "Feedback", 
    image: "https://iili.io/3OM27wv.th.jpg", 
    url: "https://forms.gle/GhMEg7s8H9aRSy4d9" 
  },
  { 
    name: "1v1 Oldest", 
    image: "others/assets/images/games/1v1lololdest.jpeg",
    url: "others/assets/games/1v1.lol_oldest.html" 
  },
  { 
    name: "8 Ball Pool", 
    image: "others/assets/images/games/8-ball-pool-2021-08-05.webp",
    url: "others/assets/games/8 Ball Pool.html" 
  },
  { 
    name: "A Small World Cup", 
    image: "others/assets/images/games/asmallworldcup.png",
    url: "others/assets/games/A Small World Cup.html" 
  },
  { 
    name: "Bacon May Die", 
    image: "others/assets/images/games/bacon-may-die.png",
    url: "others/assets/games/Bacon May Die.html" 
  },
  { 
    name: "Bad Time Simulator", 
    image: "others/assets/images/games/badtimesim.png",
    url: "others/assets/games/Bad Time Simulator.html" 
  },
  { 
    name: "Baldi's Basics Plus", 
    image: "others/assets/images/games/baldis.png",
    url: "others/assets/games/Baldi's Basics Plus.html" 
  },
  { 
    name: "Basketbros.IO", 
    image: "others/assets/images/games/basketbros-io.jpg",
    url: "others/assets/games/Basket Bros.html" 
  },
  { 
    name: "BitLife", 
    image: "others/assets/images/games/bitlife.jpeg",
    url: "others/assets/games/BitLife.html" 
  },
  { 
    name: "Bloxorz", 
    image: "others/assets/images/games/blockorz.jpeg",
    url: "others/assets/games/Bloxorz.html" 
  },
  { 
    name: "Cookie Clicker", 
    image: "others/assets/images/games/cookie-clicker.png",
    url: "others/assets/games/Cookie Clicker.html" 
  },
  { 
    name: "Crazy Cattle 3D", 
    image: "others/assets/images/games/crazy-cattle-3d-icon.jpg",
    url: "others/assets/games/Crazy Cattle 3D.html" 
  },
  { 
    name: "Crossy Road", 
    image: "others/assets/images/games/crossyroad.png",
    url: "others/assets/games/Crossy Road.html" 
  },
  { 
    name: "Drift Boss", 
    image: "others/assets/images/games/driftboss.png",
    url: "others/assets/games/Drift Boss.html" 
  },
  { 
    name: "Drift Hunters ", 
    image: "others/assets/images/games/drift-hunters.png",
    url: "others/assets/games/Drift Hunters.html" 
  },
  { 
    name: "Friday Night Funkin': Darkness Takeover", 
    image: "others/assets/images/games/takeover.jpg",
    url: "others/assets/games/Friday Night Funkin'_ Darkness Takeover.html" 
  },
  { 
    name: "Geometry Dash Lite", 
    image: "others/assets/images/games/dashlite.png",
    url: "others/assets/games/Geometry Dash Lite.html" 
  },
  { 
    name: "Google Baseball", 
    image: "others/assets/images/games/baseball.png",
    url: "others/assets/games/Google Baseball.html" 
  },
  { 
    name: "Infinite Craft", 
    image: "others/assets/images/games/infcraft.jpg",
    url: "others/assets/games/Infinite Craft" 
  },
  { 
    name: "Jetpack Joyride", 
    image: "others/assets/images/games/jetpack.png",
    url: "others/assets/games/Jetpack Joyride.html" 
  },
  { 
    name: "Monkey Mart", 
    image: "others/assets/images/games/monkey-mart.png",
    url: "others/assets/games/Monkey Mart.html" 
  },
  { 
    name: "Paper.IO", 
    image: "others/assets/images/games/paperio2.png",
    url: "others/assets/games/Paper.io 2.html" 
  },
  { 
    name: "Retro Bowl", 
    image: "others/assets/images/games/retro-bowl.jpeg",
    url: "others/assets/games/Retro Bowl.html" 
  },
  { 
    name: "Rooftop Snipers", 
    image: "others/assets/images/games/rooftopsnipers.jpg",
    url: "others/assets/games/Rooftop Snipers.html" 
  },
  { 
    name: "Rooftop Snipers 2", 
    image: "others/assets/images/games/rooftop-snipers-2.avif",
    url: "others/assets/games/Rooftop Snipers 2.html" 
  },
  { 
    name: "Slope", 
    image: "others/assets/images/games/slope.png",
    url: "others/assets/games/Slope.html" 
  },
  { 
    name: "Solar Smash", 
    image: "others/assets/images/games/Solar_smash.webp",
    url: "others/assets/games/Solar Smash.html" 
  },
  { 
    name: "Subway Surfers San Francisco", 
    image: "others/assets/images/games/subwaysanfran.jpeg",
    url: "others/assets/games/Subway Surfers_ San Francisco.html" 
  },
  { 
    name: "Subway Surfers Winter Holiday", 
    image: "others/assets/images/games/subway-surfers.jpg",
    url: "others/assets/games/Subway Surfers_ Winter Holiday.html" 
  }
];

// App data
const apps = [
  { 
    name: "YouTube", 
    image: "others/assets/images/apps/youtube.png", 
    url: "others/assets/apps/YouTube.html" 
  },
  { 
    name: "Spotify", 
    image: "others/assets/images/apps/spotify.png", 
    url: "others/assets/apps/Spotify.html" 
  },
  { 
    name: "Soundboard", 
    image: "others/assets/images/apps/soundboard.png", 
    url: "others/assets/apps/Soundboard.html" 
  },
  { 
    name: "Vscode", 
    image: "others/assets/images/apps/vscode.png", 
    url: "others/assets/apps/Vscode.html" 
  }
];

// Tab Cloaking presets
const presets = {
  google: { title: "Google", favicon: "https://www.google.com/favicon.ico" },
  classroom: { title: "Home", favicon: "https://ssl.gstatic.com/classroom/favicon.png" },
  bing: { title: "Bing", favicon: "https://bing.com/favicon.ico" },
  nearpod: { title: "Nearpod", favicon: "https://nearpod.com/favicon.ico" },
  powerschool: { title: "PowerSchool Sign In", favicon: "https://powerschool.com/favicon.ico" },
  edge: { title: "New Tab", favicon: "https://www.bing.com/favicon.ico" },
  chrome: { title: "New Tab", favicon: "https://www.google.com/favicon.ico" }
};

// Theme configurations
const themes = {
  original: {
    bgColor: '#121826',
    navColor: '#1e2433',
    accentColor: '#4f90ff',
    textColor: '#e0e6f1',
    borderColor: '#38415d',
    hoverBg: '#2a2f48',
    btnBg: '#3b466f',
    btnHoverBg: '#4f90ff'
  },
  dark: {
    bgColor: '#0a0a0a',
    navColor: '#1a1a1a',
    accentColor: '#00ff00',
    textColor: '#ffffff',
    borderColor: '#333333',
    hoverBg: '#2a2a2a',
    btnBg: '#262626',
    btnHoverBg: '#00ff00'
  },
  light: {
    bgColor: '#f5f5f5',
    navColor: '#ffffff',
    accentColor: '#2563eb',
    textColor: '#1f2937',
    borderColor: '#e5e7eb',
    hoverBg: '#e5e7eb',
    btnBg: '#d1d5db',
    btnHoverBg: '#2563eb'
  },
  midnight: {
    bgColor: '#0f0f23',
    navColor: '#1a1a2e',
    accentColor: '#9d4edd',
    textColor: '#e0e0e0',
    borderColor: '#3c3c5a',
    hoverBg: '#2a2a4e',
    btnBg: '#3c3c6f',
    btnHoverBg: '#9d4edd'
  },
  ocean: {
    bgColor: '#001f3f',
    navColor: '#0a2f4f',
    accentColor: '#00d4ff',
    textColor: '#cfe2f3',
    borderColor: '#1a4f6f',
    hoverBg: '#1a3f5f',
    btnBg: '#2a5f7f',
    btnHoverBg: '#00d4ff'
  },
  sunset: {
    bgColor: '#2d1b2e',
    navColor: '#3d2b3e',
    accentColor: '#ff6b9d',
    textColor: '#fce4ec',
    borderColor: '#5d4b5e',
    hoverBg: '#4d3b4e',
    btnBg: '#6d5b6e',
    btnHoverBg: '#ff6b9d'
  },
  forest: {
    bgColor: '#1a2f1a',
    navColor: '#2a3f2a',
    accentColor: '#7cb342',
    textColor: '#e8f5e9',
    borderColor: '#3a5f3a',
    hoverBg: '#3a4f3a',
    btnBg: '#4a6f4a',
    btnHoverBg: '#7cb342'
  }
};

// Apply theme function
function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;

  const root = document.documentElement;
  root.style.setProperty('--bg-color', theme.bgColor);
  root.style.setProperty('--nav-color', theme.navColor);
  root.style.setProperty('--accent-color', theme.accentColor);
  root.style.setProperty('--text-color', theme.textColor);
  root.style.setProperty('--border-color', theme.borderColor);
  root.style.setProperty('--hover-bg', theme.hoverBg);
  root.style.setProperty('--btn-bg', theme.btnBg);
  root.style.setProperty('--btn-hover-bg', theme.btnHoverBg);
}

// Debounce helper
function debounce(func, delay = 300) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Hide all content sections and remove active nav links
function hideAll() {
  document.querySelectorAll('.content').forEach(c => (c.style.display = 'none'));
  document.querySelectorAll('.navbar li a').forEach(link => link.classList.remove('active'));
  
  // Hide homepage info buttons when not on home
  const infoButtons = document.querySelector('.homepage-info-buttons');
  if (infoButtons) infoButtons.style.display = 'none';
}

// Show home section
function showHome() {
  hideAll();
  const homeContent = document.getElementById('content-home');
  if (homeContent) homeContent.style.display = 'block';
  const homeLink = document.getElementById('homeLink');
  if (homeLink) homeLink.classList.add('active');
  
  // Show homepage info buttons
  const infoButtons = document.querySelector('.homepage-info-buttons');
  if (infoButtons) infoButtons.style.display = 'flex';
}

// Show games section and render games
function showGames() {
  hideAll();
  const gamesContent = document.getElementById('content-games');
  if (gamesContent) gamesContent.style.display = 'block';
  const gameLink = document.getElementById('gameLink');
  if (gameLink) gameLink.classList.add('active');
  renderGames(games);
}

// Show apps section and render apps
function showApps() {
  hideAll();
  const appsContent = document.getElementById('content-apps');
  if (appsContent) appsContent.style.display = 'block';
  const appsLink = document.getElementById('appsLink');
  if (appsLink) appsLink.classList.add('active');
  renderApps(apps);
}

// Show about section
function showAbout() {
  hideAll();
  const aboutContent = document.getElementById('content-about');
  if (aboutContent) aboutContent.style.display = 'block';
  const aboutLink = document.getElementById('aboutLink');
  if (aboutLink) aboutLink.classList.add('active');
}

// Show settings section
function showSettings() {
  hideAll();
  const settingsContent = document.getElementById('content-settings');
  if (settingsContent) settingsContent.style.display = 'block';
  const settingsLink = document.getElementById('settingsLink');
  if (settingsLink) settingsLink.classList.add('active');
}

// Render games list
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
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/250x250?text=${encodeURIComponent(game.name)}'" />
      <h3>${game.name}</h3>
    `;

    card.onclick = () => loadGame(game.url);
    card.onkeypress = (e) => {
      if (e.key === 'Enter') loadGame(game.url);
    };

    gameList.appendChild(card);
  });
}

// Render apps list
function renderApps(appsToRender) {
  const appList = document.getElementById('app-list');
  if (!appList) return;
  appList.innerHTML = '';

  if (appsToRender.length === 0) {
    appList.innerHTML = '<p>No apps found.</p>';
    return;
  }

  appsToRender.forEach(app => {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${app.image}" alt="${app.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/250x250?text=${encodeURIComponent(app.name)}'" />
      <h3>${app.name}</h3>
    `;

    card.onclick = () => loadGame(app.url);
    card.onkeypress = (e) => {
      if (e.key === 'Enter') loadGame(app.url);
    };

    appList.appendChild(card);
  });
}

// Load game or app in iframe view
function loadGame(url) {
  hideAll();
  const gameDisplay = document.getElementById('game-display');
  const gameIframe = document.getElementById('game-iframe');

  if (gameDisplay && gameIframe) {
    gameIframe.src = url;
    gameDisplay.style.display = 'block';
  }
}

// Search games by name
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

// Toggle fullscreen of game iframe
function toggleFullscreen() {
  const gameIframe = document.getElementById('game-iframe');
  if (!gameIframe) return;

  if (!document.fullscreenElement) {
    gameIframe.requestFullscreen().catch(err => {
      console.error('Error attempting to enable fullscreen:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

// Homepage search that opens YouTube search results in new tab
function homepageSearch() {
  const input = document.getElementById('homepageSearchInput');
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.youtube.com/results?search_query=${encodedQuery}`;
  window.open(url, '_blank');
}

// Snow effect variables
let snowEnabled = true;
let snowInterval = null;

// Create a snowflake element and animate it
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

// Start snow effect interval
function startSnow() {
  if (snowInterval) return;
  snowEnabled = true;
  snowInterval = setInterval(createSnowflake, 200);
}

// Stop snow effect and clear snowflakes
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

// Apply tab cloaking: change title and favicon
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

// Load saved settings from localStorage and apply them
function loadSettings() {
  const savedTitle = localStorage.getItem('TabCloak_Title');
  const savedFavicon = localStorage.getItem('TabCloak_Favicon');
  const savedSnow = localStorage.getItem('snowEffect');
  const savedHotkey = localStorage.getItem('hotkey') || '`';
  const savedRedirect = localStorage.getItem('redirectURL') || 'https://google.com';
  const savedAboutBlank = localStorage.getItem('aboutBlank');
  const savedTheme = localStorage.getItem('selectedTheme') || 'original';

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
    aboutBlankToggle.checked = savedAboutBlank === null || savedAboutBlank === 'enabled';
  }

  applyTheme(savedTheme);
}

// Initialize event listeners and load settings on page load
window.onload = () => {
  loadSettings();
  showHome();

  // Theme selector
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    const savedTheme = localStorage.getItem('selectedTheme') || 'original';
    themeSelect.value = savedTheme;

    themeSelect.addEventListener('change', (e) => {
      const theme = e.target.value;
      applyTheme(theme);
      localStorage.setItem('selectedTheme', theme);
    });
  }

  // Credits and Update Log button handlers
  const creditsBtn = document.getElementById('creditsBtn');
  const updateLogBtn = document.getElementById('updateLogBtn');
  const creditsModal = document.getElementById('creditsModal');
  const updateLogModal = document.getElementById('updateLogModal');

  if (creditsBtn) {
    creditsBtn.addEventListener('click', () => {
      if (creditsModal) creditsModal.style.display = 'block';
    });
  }

  if (updateLogBtn) {
    updateLogBtn.addEventListener('click', () => {
      if (updateLogModal) updateLogModal.style.display = 'block';
    });
  }

  // Close buttons for info modals
  document.querySelectorAll('.info-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if (modalElement) modalElement.style.display = 'none';
    });
  });

  // Close info modals when clicking outside
  window.onclick = (e) => {
    if (e.target.classList.contains('info-modal')) {
      e.target.style.display = 'none';
    }
  };

  // Apply tab cloaking button
  const applyBtn = document.getElementById('applyBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const title = document.getElementById('customTitle').value.trim();
      const favicon = document.getElementById('customFavicon').value.trim();
      applyTabCloaking(title, favicon);
      alert('Tab cloaking applied!');
    });
  }

  // Reset tab cloaking button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('TabCloak_Title');
      localStorage.removeItem('TabCloak_Favicon');
      document.title = 'GalaxyVerse';
      const link = document.querySelector("link[rel~='icon']");
      if (link) link.href = '';
      const titleInput = document.getElementById('customTitle');
      const faviconInput = document.getElementById('customFavicon');
      if (titleInput) titleInput.value = '';
      if (faviconInput) faviconInput.value = '';
      const presetSelect = document.getElementById('presetSelect');
      if (presetSelect) presetSelect.value = '';
      alert('Tab cloaking reset!');
    });
  }

  // Preset select dropdown change
  const presetSelect = document.getElementById('presetSelect');
  if (presetSelect) {
    presetSelect.addEventListener('change', (e) => {
      const selected = presets[e.target.value];
      if (selected) {
        const titleInput = document.getElementById('customTitle');
        const faviconInput = document.getElementById('customFavicon');
        if (titleInput) titleInput.value = selected.title;
        if (faviconInput) faviconInput.value = selected.favicon;
        applyTabCloaking(selected.title, selected.favicon);
      }
    });
  }

  // Snow effect toggle
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

  // Panic hotkey input keydown for setting hotkey
  const hotkeyInput = document.getElementById('hotkey-input');
  if (hotkeyInput) {
    hotkeyInput.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.key.length === 1 || e.key === 'Escape' || /^F\d{1,2}$/.test(e.key)) {
        hotkeyInput.value = e.key;
      }
    });
  }

  // Change panic hotkey button
  const changeHotkeyBtn = document.getElementById('change-hotkey-btn');
  if (changeHotkeyBtn) {
    changeHotkeyBtn.addEventListener('click', () => {
      const newHotkey = hotkeyInput.value.trim();
      if (newHotkey) {
        localStorage.setItem('hotkey', newHotkey);
        alert(`Panic hotkey changed to: ${newHotkey}`);
      } else {
        alert('Please enter a valid hotkey.');
      }
    });
  }

  // Change redirect URL button
  const changeURLBtn = document.getElementById('change-URL-btn');
  if (changeURLBtn) {
    changeURLBtn.addEventListener('click', () => {
      let newURL = document.getElementById('redirect-url-input').value.trim();
      if (newURL && !/^https?:\/\//i.test(newURL)) {
        newURL = 'https://' + newURL;
      }
      if (newURL) {
        localStorage.setItem('redirectURL', newURL);
        alert(`Redirect URL changed to: ${newURL}`);
      } else {
        alert('Please enter a valid URL.');
      }
    });
  }

  // Panic button key listener for redirect
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
        alert('About:blank cloaking enabled. The page will reload in about:blank mode to hide from history.');
        // Reload to apply about:blank immediately
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        alert('About:blank cloaking disabled. Note: You may need to manually close this tab and reopen the site normally.');
      }
    });
  }

  // Navigation links event listeners
  const navHome = document.getElementById('homeLink');
  const navGames = document.getElementById('gameLink');
  const navApps = document.getElementById('appsLink');
  const navAbout = document.getElementById('aboutLink');
  const navSettings = document.getElementById('settingsLink');

  if (navHome) navHome.addEventListener('click', e => { e.preventDefault(); showHome(); });
  if (navGames) navGames.addEventListener('click', e => { e.preventDefault(); showGames(); });
  if (navApps) navApps.addEventListener('click', e => { e.preventDefault(); showApps(); });
  if (navAbout) navAbout.addEventListener('click', e => { e.preventDefault(); showAbout(); });
  if (navSettings) navSettings.addEventListener('click', e => { e.preventDefault(); showSettings(); });

  // Game search event listeners
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn) searchBtn.addEventListener('click', searchGames);
  if (searchInput) {
    searchInput.addEventListener('input', debounce(searchGames));
    searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') searchGames();
    });
  }

  // Back buttons event listeners
  const backToHomeApps = document.getElementById('backToHomeApps');
  if (backToHomeApps) backToHomeApps.addEventListener('click', showHome);
  const backToHomeGame = document.getElementById('backToHomeGame');
  if (backToHomeGame) backToHomeGame.addEventListener('click', showHome);

  // Fullscreen toggle button
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

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
