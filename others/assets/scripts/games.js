// ===== GAMES AND APPS DATA =====
// File: others/assets/scripts/games.js
// This file contains all game and app definitions for GalaxyVerse

// ===== GAME DATA =====
const games = [
  { name: "Feedback", image: "https://iili.io/3OM27wv.th.jpg", url: "https://forms.gle/GhMEg7s8H9aRSy4d9" },
  { name: "1v1 Oldest", image: "others/assets/images/games/1v1lololdest.jpeg", url: "others/assets/games/1v1.lol_oldest.html" },
  { name: "8 Ball Pool", image: "others/assets/images/games/8-ball-pool-2021-08-05.webp", url: "others/assets/games/8 Ball Pool.html" },
  { name: "A Small World Cup", image: "others/assets/images/games/asmallworldcup.png", url: "others/assets/games/A Small World Cup.html" },
  { name: "Bacon May Die", image: "others/assets/images/games/bacon-may-die.png", url: "others/assets/games/Bacon May Die.html" },
  { name: "Bad Time Simulator", image: "others/assets/images/games/badtimesim.png", url: "others/assets/games/Bad Time Simulator.html" },
  { name: "Baldi's Basics Plus", image: "others/assets/images/games/baldis.png", url: "others/assets/games/Baldi's Basics Plus.html" },
  { name: "Basketbros.IO", image: "others/assets/images/games/basketbros-io.jpg", url: "others/assets/games/Basket Bros.html" },
  { name: "BitLife", image: "others/assets/images/games/bitlife.jpeg", url: "others/assets/games/BitLife.html" },
  { name: "Bloxorz", image: "others/assets/images/games/blockorz.jpeg", url: "others/assets/games/Bloxorz.html" },
  { name: "Candy Crush", image: "others/assets/images/games/candycrush.png", url: "others/assets/games/Candy Crush.html" },
  { name: "Cluster Rush", image: "others/assets/images/games/clusterrush.jpeg", url: "others/assets/games/Cluster Rush.html" },
  { name: "Cookie Clicker", image: "others/assets/images/games/cookie-clicker.png", url: "others/assets/games/Cookie Clicker.html" },
  { name: "Crazy Cattle 3D", image: "others/assets/images/games/crazy-cattle-3d-icon.jpg", url: "others/assets/games/Crazy Cattle 3D.html" },
  { name: "Crossy Road", image: "others/assets/images/games/crossyroad.png", url: "others/assets/games/Crossy Road.html" },
  { name: "Drift Boss", image: "others/assets/images/games/driftboss.png", url: "others/assets/games/Drift Boss.html" },
  { name: "Drift Hunters ", image: "others/assets/images/games/drift-hunters.png", url: "others/assets/games/Drift Hunters.html" },
  { name: "Friday Night Funkin': Darkness Takeover", image: "others/assets/images/games/takeover.jpg", url: "others/assets/games/Friday Night Funkin'_ Darkness Takeover.html" },
  { name: "Fruit Ninja", image: "others/assets/images/games/fruitninja.jpeg", url: "others/assets/games/Fruit Ninja.html" },
  { name: "Google Feud", image: "others/assets/images/games/googlefeud.jpg", url: "others/assets/games/Google Feud.html" },
  { name: "Geometry Dash Lite", image: "others/assets/images/games/dashlite.png", url: "others/assets/games/Geometry Dash Lite.html" },
  { name: "Google Baseball", image: "others/assets/images/games/baseball.png", url: "others/assets/games/Google Baseball.html" },
  { name: "Infinite Craft", image: "others/assets/images/games/infcraft.jpg", url: "others/assets/games/Infinite Craft" },
  { name: "Jetpack Joyride", image: "others/assets/images/games/jetpack.png", url: "others/assets/games/Jetpack Joyride.html" },
  { name: "Melon Playground", image: "others/assets/images/games/melon-playground.jpg", url: "others/assets/games/Melon Playground.html" },
  { name: "Monkey Mart", image: "others/assets/images/games/monkey-mart.png", url: "others/assets/games/Monkey Mart.html" },
  { name: "Paper.IO", image: "others/assets/images/games/paperio2.png", url: "others/assets/games/Paper.io 2.html" },
  { name: "Retro Bowl", image: "others/assets/images/games/retro-bowl.jpeg", url: "others/assets/games/Retro Bowl.html" },
  { name: "Rooftop Snipers", image: "others/assets/images/games/rooftopsnipers.jpg", url: "others/assets/games/Rooftop Snipers.html" },
  { name: "Rooftop Snipers 2", image: "others/assets/images/games/rooftop-snipers-2.avif", url: "others/assets/games/Rooftop Snipers 2.html" },
  { name: "Slope", image: "others/assets/images/games/slope.png", url: "others/assets/games/Slope.html" },
  { name: "Solar Smash", image: "others/assets/images/games/Solar_smash.webp", url: "others/assets/games/Solar Smash.html" },
  { name: "Steal a Brainrot", image: "others/assets/images/games/stealabrainrot (1).webp", url: "others/assets/games/Steal Brainrot Online.html" },
  { name: "Subway Surfers San Francisco", image: "others/assets/images/games/subwaysanfran.jpeg", url: "others/assets/games/Subway Surfers_ San Francisco.html" },
  { name: "Subway Surfers Winter Holiday", image: "others/assets/images/games/subway-surfers.jpg", url: "others/assets/games/Subway Surfers_ Winter Holiday.html" }
];

// ===== APP DATA =====
const apps = [
  { name: "YouTube", image: "others/assets/images/apps/youtube.png", url: "others/assets/apps/YouTube.html" },
  { name: "Spotify", image: "others/assets/images/apps/spotify.png", url: "others/assets/apps/Spotify.html" },
  { name: "Soundboard", image: "others/assets/images/apps/soundboard.png", url: "others/assets/apps/Soundboard.html" },
  { name: "Vscode", image: "others/assets/images/apps/vscode.jpeg", url: "others/assets/apps/Vscode.html" }
];

// ===== HELPER FUNCTIONS =====

/**
 * Get the Game of the Day based on current CDT timezone
 * @returns {Object} The selected game object
 */
function getGameOfTheDay() {
  const now = new Date();
  const cdtOffset = -5; // CDT is UTC-5
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const cdtTime = new Date(utc + (3600000 * cdtOffset));
  const startOfYear = new Date(cdtTime.getFullYear(), 0, 0);
  startOfYear.setHours(0, 0, 0, 0);
  const diff = cdtTime - startOfYear;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Filter out Feedback from playable games
  const playableGames = games.filter(game => game.name !== "Feedback");
  const index = dayOfYear % playableGames.length;
  
  return playableGames[index];
}

/**
 * Search games by query string
 * @param {string} query - Search query
 * @returns {Array} Filtered games array
 */
function searchGamesData(query) {
  if (!query || query.trim() === '') {
    return games;
  }
  const searchTerm = query.toLowerCase().trim();
  return games.filter(game => game.name.toLowerCase().includes(searchTerm));
}

/**
 * Search apps by query string
 * @param {string} query - Search query
 * @returns {Array} Filtered apps array
 */
function searchAppsData(query) {
  if (!query || query.trim() === '') {
    return apps;
  }
  const searchTerm = query.toLowerCase().trim();
  return apps.filter(app => app.name.toLowerCase().includes(searchTerm));
}

/**
 * Get a random game
 * @returns {Object} Random game object
 */
function getRandomGame() {
  const playableGames = games.filter(game => game.name !== "Feedback");
  return playableGames[Math.floor(Math.random() * playableGames.length)];
}

/**
 * Get total count of games (excluding Feedback)
 * @returns {number} Total playable games
 */
function getTotalGamesCount() {
  return games.filter(game => game.name !== "Feedback").length;
}

/**
 * Get total count of apps
 * @returns {number} Total apps
 */
function getTotalAppsCount() {
  return apps.length;
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    games,
    apps,
    getGameOfTheDay,
    searchGamesData,
    searchAppsData,
    getRandomGame,
    getTotalGamesCount,
    getTotalAppsCount
  };
}
