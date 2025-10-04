// Existing variables and functions unchanged...

// Snow effect implementation
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');

  // Random size between 2px and 6px
  const size = Math.random() * 4 + 2;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;

  // Random horizontal start position (viewport width)
  snowflake.style.left = `${Math.random() * window.innerWidth}px`;

  // Animation duration between 5s and 15s
  const fallDuration = Math.random() * 10 + 5;
  snowflake.style.animationDuration = `${fallDuration}s`;

  // Random delay so snowflakes don't fall all at once
  snowflake.style.animationDelay = `${Math.random() * 15}s`;

  // Random opacity between 0.3 and 0.8
  snowflake.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);

  document.getElementById('snow-container').appendChild(snowflake);

  // Remove snowflake after animation completes
  setTimeout(() => {
    snowflake.remove();
  }, fallDuration * 1000);
}

// Continuously create snowflakes
setInterval(createSnowflake, 200);

// Homepage search bar functionality - open YouTube search in new tab
function homepageSearch() {
  const input = document.getElementById('homepageSearchInput');
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;
  // Encode query for URL
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.youtube.com/results?search_query=${encodedQuery}`;
  window.open(url, '_blank');
}

// Existing functions here unchanged...

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

