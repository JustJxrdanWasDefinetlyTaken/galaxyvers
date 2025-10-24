// ===== WEBSITEKEYTRACKER.JS =====
(function() {
  window.WebsiteKeyTracker = {
    initialized: false,
    
    init: function() {
      if (this.initialized) return;
      this.initialized = true;
      console.log('🔍 WebsiteKeyTracker initialized (v2.0 - Unified Network)');
    },
    
    trackKeyUsage: async function(key, website, userId) {
      try {
        if (typeof firebase === 'undefined' || !firebase.database) {
          console.error('❌ Firebase not available for tracking');
          return;
        }
        
        const database = firebase.database();
        const trackingRef = database.ref('keyTracking/' + key + '/' + Date.now());
        
        await trackingRef.set({
          website: website,
          userId: userId,
          timestamp: Date.now(),
          date: new Date().toISOString(),
          userAgent: navigator.userAgent,
          action: 'access'
        });
        
        console.log('✅ Key usage tracked:', key, 'on', website);
      } catch (error) {
        console.error('❌ Error tracking key usage:', error);
      }
    }
  };
  
  // Auto-initialize
  window.WebsiteKeyTracker.init();
})();

// ===== FIREBASE KEY SYSTEM - CROSS-WEBSITE UNIFIED ACCESS =====
(function() {
  // Normalize hostname to treat ALL GalaxyVerse domains as ONE unified system
  function normalizeHostname(hostname) {
    // Remove port if present
    hostname = hostname.split(':')[0];
    
    // ALL GalaxyVerse domains return the same identifier
    const galaxyverseDomains = [
      'schoologydashboard.org',
      'gverse.schoologydashboard.org',
      'ahs.schoologydashboard.org',
      'learn.schoologydashboard.org',
      'galaxyverse-c1v.pages.dev',
      'galaxyverse.org',
      'cloudflare.net' // Handle CDN domains
    ];
    
    // Check if current hostname matches any GalaxyVerse domain
    for (const domain of galaxyverseDomains) {
      if (hostname.includes(domain.replace('.org', '').replace('.dev', '').replace('.net', ''))) {
        return 'galaxyverse-network'; // Single identifier for all sites
      }
    }
    
    // Handle localhost for development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'galaxyverse-network'; // Same identifier for testing
    }
    
    // For other domains, return as-is
    return hostname;
  }

  // Get actual website name for display purposes
  function getActualWebsite(hostname) {
    hostname = hostname.split(':')[0];
    
    // Handle Cloudflare CDN domains
    if (hostname.includes('cloudflare.net')) {
      if (hostname.includes('ahs.schoologydashboard.org')) return 'ahs.schoologydashboard.org';
      if (hostname.includes('learn.schoologydashboard.org')) return 'learn.schoologydashboard.org';
      if (hostname.includes('gverse.schoologydashboard.org')) return 'gverse.schoologydashboard.org';
      if (hostname.includes('schoologydashboard.org')) return 'schoologydashboard.org';
      return hostname; // Return full CDN hostname if no match
    }
    
    if (hostname.includes('schoologydashboard.org')) {
      if (hostname.includes('gverse')) return 'gverse.schoologydashboard.org';
      if (hostname.includes('ahs')) return 'ahs.schoologydashboard.org';
      if (hostname.includes('learn')) return 'learn.schoologydashboard.org';
      return 'schoologydashboard.org';
    }
    
    if (hostname.includes('galaxyverse-c1v.pages.dev')) {
      return 'galaxyverse-c1v.pages.dev';
    }
    
    if (hostname.includes('galaxyverse.org')) {
      return 'galaxyverse.org';
    }
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'localhost';
    }
    
    return hostname;
  }

  // Wait for Firebase to be ready
  function waitForFirebase(callback, maxAttempts = 50) {
    let attempts = 0;
    const checkFirebase = setInterval(() => {
      attempts++;
      if (typeof firebase !== 'undefined' && firebase.apps) {
        clearInterval(checkFirebase);
        callback();
      } else if (attempts >= maxAttempts) {
        clearInterval(checkFirebase);
        console.error('Firebase failed to load');
        alert('Error: Unable to connect to authentication service. Please refresh the page.');
      }
    }, 100);
  }

  waitForFirebase(function() {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBEAf_wxxWQtaYdIfgKTTl5ls5o7e3qfAU",
      authDomain: "galaxyverse-keys.firebaseapp.com",
      databaseURL: "https://galaxyverse-keys-default-rtdb.firebaseio.com",
      projectId: "galaxyverse-keys",
      storageBucket: "galaxyverse-keys.firebasestorage.app",
      messagingSenderId: "571215796975",
      appId: "1:571215796975:web:820d004292cb4159f1d91a",
    };

    // Initialize Firebase
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      console.log('✅ Firebase initialized successfully');
    } catch (initError) {
      console.error('❌ Firebase initialization error:', initError);
      alert('Firebase initialization failed. Check console for details.');
      return;
    }

    const database = firebase.database();
    
    // Test database connection
    database.ref('.info/connected').once('value')
      .then(() => {
        console.log('✅ Firebase database connected');
      })
      .catch(err => {
        console.error('❌ Firebase database connection failed:', err);
      });

    // Valid keys - hardcoded back into the file
    const validKeys = [
      'd4vid_ghost',
      'azthedev',
      'testingkeyfordevelopers',
      'spartan_alloy3',
      'aanzoski',
      'jordanthedev',
      'CxgMvuMFYdu9JwDePpddn2LOOgZPKn05',
      '1AG4JsMjOvPiC9RzLt6KRZM2zAN8JhhM',
      'qwtS730SkOAv4bhNpqC4qe2LXDaWV24i',
      'LKPR0egJizvkY23HT5QJxjq8kp0SPsGe',
      'neZN0a439QuKezFjQY1OyIGUOlDITSuA',
      'fu5DZ4cpsbkLf4nXHRnvpARKomGqnleC',
      ')Drn:Ug7a[2A.($',
      '>?P8I@u19z~MSAs',
      'KnBcfNHaISacmt',
    ];

    // Generate a browser fingerprint for cross-domain user identification
    function generateBrowserFingerprint() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser Fingerprint', 2, 2);
      const canvasData = canvas.toDataURL();
      
      const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: screen.colorDepth,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        canvasHash: canvasData.substring(0, 50),
        hardwareConcurrency: navigator.hardwareConcurrency || 0
      };
      
      const fingerprintString = JSON.stringify(fingerprint);
      let hash = 0;
      for (let i = 0; i < fingerprintString.length; i++) {
        const char = fingerprintString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return 'fp_' + Math.abs(hash).toString(36);
    }

    // Initialize the key system
    async function initializeKeySystem() {
      // Get current site (normalized for system, actual for tracking)
      const normalizedSite = normalizeHostname(window.location.hostname || 'localhost');
      const actualSite = getActualWebsite(window.location.hostname || 'localhost');
      console.log('🌐 Current site (normalized):', normalizedSite);
      console.log('🌐 Current site (actual):', actualSite);
      
      // Generate browser fingerprint for cross-domain identification
      const browserFingerprint = generateBrowserFingerprint();
      console.log('🔒 Browser fingerprint:', browserFingerprint);
      
      // Get or create a persistent user ID (same across ALL GalaxyVerse sites)
      let currentUserId = localStorage.getItem('galaxyverse_user_id');
      
      // Step 1: Check localStorage first
      if (currentUserId) {
        console.log('🆔 Found user ID in localStorage:', currentUserId);
      }
      
      // Step 2: If no local ID, check Firebase for this fingerprint
      if (!currentUserId) {
        try {
          console.log('🔍 No local user ID, checking Firebase for fingerprint...');
          const fingerprintRef = database.ref('fingerprints/' + browserFingerprint);
          const fingerprintSnapshot = await fingerprintRef.once('value');
          
          if (fingerprintSnapshot.exists()) {
            const fingerprintData = fingerprintSnapshot.val();
            currentUserId = fingerprintData.userId;
            localStorage.setItem('galaxyverse_user_id', currentUserId);
            console.log('🆔 Retrieved user ID from fingerprint:', currentUserId);
          }
        } catch (error) {
          console.error('Error retrieving fingerprint from Firebase:', error);
        }
      }
      
      // Step 3: If still no ID, check if user has a key stored and retrieve their ID from Firebase
      if (!currentUserId) {
        const storedKey = localStorage.getItem('galaxyverse_user_key');
        if (storedKey) {
          try {
            console.log('🔍 No user ID found, but key exists. Retrieving from key data...');
            const keyRef = database.ref('usedKeys/' + storedKey);
            const snapshot = await keyRef.once('value');
            if (snapshot.exists()) {
              const keyData = snapshot.val();
              currentUserId = keyData.userId;
              localStorage.setItem('galaxyverse_user_id', currentUserId);
              console.log('🆔 Retrieved user ID from key data:', currentUserId);
              
              // Store fingerprint mapping in Firebase
              try {
                await database.ref('fingerprints/' + browserFingerprint).set({
                  userId: currentUserId,
                  createdAt: new Date().toISOString(),
                  lastSeen: new Date().toISOString()
                });
                console.log('✅ Fingerprint stored in Firebase');
              } catch (fpError) {
                console.warn('⚠️ Could not store fingerprint (non-critical):', fpError.message);
              }
            }
          } catch (error) {
            console.error('Error retrieving user ID from Firebase:', error);
          }
        }
      }
      
      // Step 4: If still no ID, create a new one
      if (!currentUserId) {
        currentUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('galaxyverse_user_id', currentUserId);
        console.log('🆔 Created new user ID:', currentUserId);
        
        // Store fingerprint mapping in Firebase for future visits
        try {
          await database.ref('fingerprints/' + browserFingerprint).set({
            userId: currentUserId,
            createdAt: new Date().toISOString(),
            lastSeen: new Date().toISOString()
          });
          console.log('✅ New fingerprint stored in Firebase');
        } catch (fpError) {
          console.warn('⚠️ Could not store fingerprint (non-critical):', fpError.message);
        }
      } else {
        console.log('🆔 Using user ID:', currentUserId);
        
        // Update fingerprint last seen
        try {
          await database.ref('fingerprints/' + browserFingerprint).update({
            lastSeen: new Date().toISOString()
          });
          console.log('✅ Fingerprint last seen updated');
        } catch (error) {
          // If update fails, try set instead (in case it doesn't exist)
          try {
            await database.ref('fingerprints/' + browserFingerprint).set({
              userId: currentUserId,
              createdAt: new Date().toISOString(),
              lastSeen: new Date().toISOString()
            });
            console.log('✅ Fingerprint created/updated');
          } catch (setError) {
            console.warn('⚠️ Could not update fingerprint (non-critical):', setError.message);
          }
        }
      }

      // Check if user has a valid key stored locally
      const storedKey = localStorage.getItem('galaxyverse_user_key');
      
      if (storedKey) {
        console.log('🔑 Found stored key, verifying...');
        try {
          const keyRef = database.ref('usedKeys/' + storedKey);
          const snapshot = await keyRef.once('value');
          
          if (snapshot.exists()) {
            const keyData = snapshot.val();
            
            // Check if this key belongs to this user
            if (keyData.userId === currentUserId) {
              console.log('✅ Valid key found for user. Access granted across ALL GalaxyVerse sites.');
              
              // Sync user ID to localStorage in case it was missing
              localStorage.setItem('galaxyverse_user_id', currentUserId);
              
              // Update current website in the list if not already there
              const websites = keyData.websites || [];
              
              if (!websites.includes(actualSite)) {
                console.log('📝 Adding current site to websites list');
                await keyRef.update({
                  websites: [...websites, actualSite],
                  lastAccessed: new Date().toISOString(),
                  lastAccessedSite: actualSite,
                  timesAccessed: (keyData.timesAccessed || 0) + 1
                });
              } else {
                console.log('✓ Site already in websites list');
                await keyRef.update({
                  timesAccessed: (keyData.timesAccessed || 0) + 1,
                  lastAccessed: new Date().toISOString(),
                  lastAccessedSite: actualSite
                });
              }
              
              // Track usage with WebsiteKeyTracker if available
              if (typeof window.WebsiteKeyTracker !== 'undefined') {
                window.WebsiteKeyTracker.trackKeyUsage(enteredKey, actualSite, currentUserId);
              }
              
              keyError.style.color = '#4ade80';
              keyError.textContent = '✅ Welcome back! Access granted across ALL GalaxyVerse sites';
              keyError.style.display = 'block';
              keyInput.style.borderColor = '#4ade80';
              submitBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
              submitBtn.textContent = 'Success!';

              setTimeout(() => {
                keyOverlay.style.opacity = '0';
                keyOverlay.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                  keyOverlay.remove();
                  const mainContent = document.getElementById('app') || document.body;
                  if (mainContent && mainContent !== document.body) {
                    mainContent.style.filter = '';
                    mainContent.style.pointerEvents = '';
                  }
                }, 500);
              }, 1500);
              return;
            }
          } else {
            // NEW KEY CLAIM - First time this key is being used
            console.log('🆕 Claiming new key for user across ALL GalaxyVerse sites');
            await keyRef.set({
              used: true,
              userId: currentUserId,
              firstUsedOn: actualSite,
              firstUsedDate: new Date().toISOString(),
              firstUsedTimestamp: Date.now(),
              websites: [actualSite],
              timesAccessed: 1,
              lastAccessed: new Date().toISOString(),
              lastAccessedSite: actualSite,
              network: normalizedSite,
              claimedAcrossNetwork: true
            });

            localStorage.setItem('galaxyverse_access', 'granted');
            localStorage.setItem('galaxyverse_user_key', enteredKey);

            if (typeof window.WebsiteKeyTracker !== 'undefined') {
              window.WebsiteKeyTracker.trackKeyUsage(enteredKey, actualSite, currentUserId);
            }

            keyError.style.color = '#4ade80';
            keyError.textContent = '✅ Key claimed! Welcome to GalaxyVerse - works on ALL sites in the network';
            keyError.style.display = 'block';
            keyInput.style.borderColor = '#4ade80';
            submitBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
            submitBtn.textContent = 'Success!';

            setTimeout(() => {
              keyOverlay.style.opacity = '0';
              keyOverlay.style.transition = 'opacity 0.5s ease';
              setTimeout(() => {
                keyOverlay.remove();
                const mainContent = document.getElementById('app') || document.body;
                if (mainContent && mainContent !== document.body) {
                  mainContent.style.filter = '';
                  mainContent.style.pointerEvents = '';
                }
              }, 500);
            }, 1500);
          }
        } catch (error) {
          console.error('Firebase error:', error);
          
          let errorMessage = '❌ Connection error. ';
          if (error.code === 'PERMISSION_DENIED') {
            errorMessage += 'Access denied. Please check Firebase rules.';
          } else if (error.message && error.message.includes('network')) {
            errorMessage += 'Network error. Check your internet connection.';
          } else if (error.message && error.message.includes('timeout')) {
            errorMessage += 'Request timed out. Please try again.';
          } else {
            errorMessage += 'Please refresh the page and try again.';
          }
          
          keyError.textContent = errorMessage;
          keyError.style.color = '#ff4444';
          keyError.style.display = 'block';
          keyInput.style.borderColor = '#ff4444';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Verify Key';
          submitBtn.style.cursor = 'pointer';
        }
      }

      submitBtn.addEventListener('click', verifyKey);

      keyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          verifyKey();
        }
      });

      keyInput.focus();
    }

    // Start the initialization
    initializeKeySystem();
  });
})();

// ===== ABOUT:BLANK CLOAKING =====
(function() {
  const aboutBlankEnabled = localStorage.getItem('aboutBlank');
  const isInAboutBlank = window.self !== window.top;
  
  if (aboutBlankEnabled === 'enabled' && !isInAboutBlank) {
    const currentURL = window.location.href;
    const win = window.open('about:blank', '_blank');
    
    if (win) {
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
      window.location.replace('about:blank');
      window.close();
    }
  }
})();

// ===== TAB CLOAKING PRESETS =====
const presets = {
  google: { title: "Google", favicon: "https://www.google.com/favicon.ico" },
  classroom: { title: "Home", favicon: "https://ssl.gstatic.com/classroom/favicon.png" },
  bing: { title: "Bing", favicon: "https://bing.com/favicon.ico" },
  nearpod: { title: "Nearpod", favicon: "https://nearpod.com/favicon.ico" },
  powerschool: { title: "PowerSchool Sign In", favicon: "https://powerschool.com/favicon.ico" },
  edge: { title: "New Tab", favicon: "https://www.bing.com/favicon.ico" },
  chrome: { title: "New Tab", favicon: "https://www.google.com/favicon.ico" }
};

// ===== THEME CONFIGURATIONS =====
const themes = {
  original: { bgColor: '#121826', navColor: '#1e2433', accentColor: '#4f90ff', textColor: '#e0e6f1', borderColor: '#38415d', hoverBg: '#2a2f48', btnBg: '#3b466f', btnHoverBg: '#4f90ff' },
  dark: { bgColor: '#0a0a0a', navColor: '#1a1a1a', accentColor: '#00ff00', textColor: '#ffffff', borderColor: '#333333', hoverBg: '#2a2a2a', btnBg: '#262626', btnHoverBg: '#00ff00' },
  light: { bgColor: '#f5f5f5', navColor: '#ffffff', accentColor: '#2563eb', textColor: '#1f2937', borderColor: '#e5e7eb', hoverBg: '#e5e7eb', btnBg: '#d1d5db', btnHoverBg: '#2563eb' },
  midnight: { bgColor: '#0f0f23', navColor: '#1a1a2e', accentColor: '#9d4edd', textColor: '#e0e0e0', borderColor: '#3c3c5a', hoverBg: '#2a2a4e', btnBg: '#3c3c6f', btnHoverBg: '#9d4edd' },
  ocean: { bgColor: '#001f3f', navColor: '#0a2f4f', accentColor: '#00d4ff', textColor: '#cfe2f3', borderColor: '#1a4f6f', hoverBg: '#1a3f5f', btnBg: '#2a5f7f', btnHoverBg: '#00d4ff' },
  sunset: { bgColor: '#2d1b2e', navColor: '#3d2b3e', accentColor: '#ff6b9d', textColor: '#fce4ec', borderColor: '#5d4b5e', hoverBg: '#4d3b4e', btnBg: '#6d5b6e', btnHoverBg: '#ff6b9d' },
  forest: { bgColor: '#1a2f1a', navColor: '#2a3f2a', accentColor: '#7cb342', textColor: '#e8f5e9', borderColor: '#3a5f3a', hoverBg: '#3a4f3a', btnBg: '#4a6f4a', btnHoverBg: '#7cb342' },
  purple: { bgColor: '#1a0a2e', navColor: '#2a1a3e', accentColor: '#b744f7', textColor: '#f0e6ff', borderColor: '#4a3a5e', hoverBg: '#3a2a4e', btnBg: '#5a4a6e', btnHoverBg: '#b744f7' },
  cyberpunk: { bgColor: '#0d0221', navColor: '#1a0b3a', accentColor: '#ff006e', textColor: '#00f5ff', borderColor: '#8338ec', hoverBg: '#2a1a4a', btnBg: '#3a2a5a', btnHoverBg: '#ff006e' },
  matrix: { bgColor: '#000000', navColor: '#0a1a0a', accentColor: '#00ff41', textColor: '#00ff41', borderColor: '#003b00', hoverBg: '#0a2a0a', btnBg: '#1a3a1a', btnHoverBg: '#00ff41' },
  neon: { bgColor: '#1a0033', navColor: '#2a0a4a', accentColor: '#ff00ff', textColor: '#00ffff', borderColor: '#4a1a6a', hoverBg: '#3a1a5a', btnBg: '#5a2a7a', btnHoverBg: '#ff00ff' },
  fire: { bgColor: '#1a0a00', navColor: '#2a1a0a', accentColor: '#ff4500', textColor: '#ffe4b5', borderColor: '#4a2a1a', hoverBg: '#3a1a0a', btnBg: '#5a3a2a', btnHoverBg: '#ff4500' },
  ice: { bgColor: '#0a1a2a', navColor: '#1a2a3a', accentColor: '#00bfff', textColor: '#e0f7ff', borderColor: '#2a3a4a', hoverBg: '#1a2a3a', btnBg: '#2a4a5a', btnHoverBg: '#00bfff' },
  retro: { bgColor: '#2b1b17', navColor: '#3d2b27', accentColor: '#ff9966', textColor: '#ffeaa7', borderColor: '#5d4b47', hoverBg: '#4d3b37', btnBg: '#6d5b57', btnHoverBg: '#ff9966' }
};

// ===== GAME OF THE DAY (uses games from games.js) =====
function displayGameOfTheDay() {
  const gotdContainer = document.getElementById('game-of-the-day-container');
  if (!gotdContainer) return;
  
  // Check if getGameOfTheDay function exists from games.js
  if (typeof getGameOfTheDay !== 'function') {
    console.error('getGameOfTheDay function not found. Make sure games.js is loaded.');
    return;
  }
  
  const game = getGameOfTheDay();
  gotdContainer.innerHTML = `
    <div class="gotd-card">
      <div class="gotd-badge">🌟 Game of the Day</div>
      <img src="${game.image}" alt="${game.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(game.name)}'" />
      <h3>${game.name}</h3>
      <button class="gotd-play-btn" onclick="loadGame('${game.url}')">Play Now</button>
    </div>
  `;
}

// ===== THEME SYSTEM =====
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

// ===== UTILITY FUNCTIONS =====
function debounce(func, delay = 300) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function hideAll() {
  document.querySelectorAll('.content').forEach(c => (c.style.display = 'none'));
  document.querySelectorAll('.navbar li a').forEach(link => link.classList.remove('active'));
  const infoButtons = document.querySelector('.homepage-info-buttons');
  if (infoButtons) infoButtons.style.display = 'none';
}

// ===== NAVIGATION FUNCTIONS =====
function showHome() {
  hideAll();
  const homeContent = document.getElementById('content-home');
  if (homeContent) homeContent.style.display = 'block';
  const homeLink = document.getElementById('homeLink');
  if (homeLink) homeLink.classList.add('active');
  const infoButtons = document.querySelector('.homepage-info-buttons');
  if (infoButtons) infoButtons.style.display = 'flex';
  displayGameOfTheDay();
}

function showGames() {
  hideAll();
  const gamesContent = document.getElementById('content-games');
  if (gamesContent) gamesContent.style.display = 'block';
  const gameLink = document.getElementById('gameLink');
  if (gameLink) gameLink.classList.add('active');
  
  // Check if games array exists from games.js
  if (typeof games !== 'undefined') {
    renderGames(games);
  } else {
    console.error('games array not found. Make sure games.js is loaded.');
  }
}

function showApps() {
  hideAll();
  const appsContent = document.getElementById('content-apps');
  if (appsContent) appsContent.style.display = 'block';
  const appsLink = document.getElementById('appsLink');
  if (appsLink) appsLink.classList.add('active');
  
  // Check if apps array exists from games.js
  if (typeof apps !== 'undefined') {
    renderApps(apps);
  } else {
    console.error('apps array not found. Make sure games.js is loaded.');
  }
}

function showAbout() {
  hideAll();
  const aboutContent = document.getElementById('content-about');
  if (aboutContent) aboutContent.style.display = 'block';
  const aboutLink = document.getElementById('aboutLink');
  if (aboutLink) aboutLink.classList.add('active');
}

function showSettings() {
  hideAll();
  const settingsContent = document.getElementById('content-settings');
  if (settingsContent) settingsContent.style.display = 'block';
  const settingsLink = document.getElementById('settingsLink');
  if (settingsLink) settingsLink.classList.add('active');
}

// ===== RENDER FUNCTIONS =====
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
    card.onkeypress = (e) => { if (e.key === 'Enter') loadGame(game.url); };
    gameList.appendChild(card);
  });
}

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
    card.onkeypress = (e) => { if (e.key === 'Enter') loadGame(app.url); };
    appList.appendChild(card);
  });
}

function loadGame(url) {
  hideAll();
  const gameDisplay = document.getElementById('game-display');
  const gameIframe = document.getElementById('game-iframe');
  if (gameDisplay && gameIframe) {
    gameIframe.src = url;
    gameDisplay.style.display = 'block';
  }
}

function searchGames() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  const query = searchInput.value.toLowerCase().trim();
  
  // Check if games array exists from games.js
  if (typeof games === 'undefined') {
    console.error('games array not found. Make sure games.js is loaded.');
    return;
  }
  
  if (!query) {
    renderGames(games);
    return;
  }
  const filtered = games.filter(game => game.name.toLowerCase().includes(query));
  renderGames(filtered);
}

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

function homepageSearch() {
  const input = document.getElementById('homepageSearchInput');
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.youtube.com/results?search_query=${encodedQuery}`;
  window.open(url, '_blank');
}

// ===== SNOW EFFECT =====
let snowEnabled = true;
let snowInterval = null;

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
    setTimeout(() => { snowflake.remove(); }, (fallDuration + 15) * 1000);
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
  if (snowContainer) snowContainer.innerHTML = '';
}

// ===== TAB CLOAKING =====
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

// ===== LOAD SETTINGS =====
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
    aboutBlankToggle.checked = savedAboutBlank === 'enabled';
  }

  applyTheme(savedTheme);
}

// ===== INITIALIZATION =====
window.onload = () => {
  loadSettings();
  showHome();

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

  document.querySelectorAll('.info-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if (modalElement) modalElement.style.display = 'none';
    });
  });

  window.onclick = (e) => {
    if (e.target.classList.contains('info-modal')) {
      e.target.style.display = 'none';
    }
  };

  const applyBtn = document.getElementById('applyBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const title = document.getElementById('customTitle').value.trim();
      const favicon = document.getElementById('customFavicon').value.trim();
      applyTabCloaking(title, favicon);
      alert('Tab cloaking applied!');
    });
  }

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

  const hotkeyInput = document.getElementById('hotkey-input');
  if (hotkeyInput) {
    hotkeyInput.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.key.length === 1 || e.key === 'Escape' || /^F\d{1,2}$/.test(e.key)) {
        hotkeyInput.value = e.key;
      }
    });
  }

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

  window.addEventListener('keydown', (e) => {
    const savedHotkey = localStorage.getItem('hotkey') || '`';
    const redirectURL = localStorage.getItem('redirectURL') || 'https://google.com';
    if (e.key === savedHotkey) {
      location.replace(redirectURL);
    }
  });

  const aboutBlankToggle = document.getElementById('aboutBlankToggle');
  if (aboutBlankToggle) {
    aboutBlankToggle.addEventListener('change', (e) => {
      const value = e.target.checked ? 'enabled' : 'disabled';
      localStorage.setItem('aboutBlank', value);
      if (e.target.checked) {
        alert('About:blank cloaking enabled. The page will reload in about:blank mode to hide from history.');
        setTimeout(() => { window.location.reload(); }, 1000);
      } else {
        alert('About:blank cloaking disabled. Note: You may need to manually close this tab and reopen the site normally.');
      }
    });
  }

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

  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn) searchBtn.addEventListener('click', searchGames);
  if (searchInput) {
    searchInput.addEventListener('input', debounce(searchGames));
    searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') searchGames();
    });
  }

  const backToHomeApps = document.getElementById('backToHomeApps');
  if (backToHomeApps) backToHomeApps.addEventListener('click', showHome);
  const backToHomeGame = document.getElementById('backToHomeGame');
  if (backToHomeGame) backToHomeGame.addEventListener('click', showHome);

  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  const homepageSearchBtn = document.getElementById('homepageSearchBtn');
  const homepageSearchInput = document.getElementById('homepageSearchInput');
  if (homepageSearchBtn) homepageSearchBtn.addEventListener('click', homepageSearch);
  if (homepageSearchInput) {
    homepageSearchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') homepageSearch();
    });
  }
};(storedKey, actualSite, currentUserId);
              }
              
              // Grant access - no need to show key entry
              localStorage.setItem('galaxyverse_access', 'granted');
              console.log('✅ Access granted automatically');
              return; // Exit early, don't show key entry screen
            } else {
              // Key exists but belongs to someone else - clear local storage
              console.log('⚠️ Stored key belongs to another user. Clearing local data.');
              localStorage.removeItem('galaxyverse_user_key');
              localStorage.removeItem('galaxyverse_access');
            }
          } else {
            // Key no longer exists in database - clear local storage
            console.log('⚠️ Stored key not found in database. Clearing local data.');
            localStorage.removeItem('galaxyverse_user_key');
            localStorage.removeItem('galaxyverse_access');
          }
        } catch (error) {
          console.error('❌ Error verifying stored key:', error);
        }
      } else {
        console.log('ℹ️ No stored key found');
      }

      // If we reach here, show key entry screen
      showKeyEntryScreen();
    }

    function showKeyEntryScreen() {
      // Create key entry overlay
      const keyOverlay = document.createElement('div');
      keyOverlay.id = 'galaxyverse-key-overlay';
      keyOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        font-family: 'Roboto', sans-serif;
      `;

      keyOverlay.innerHTML = `
        <div style="
          background: rgba(30, 36, 51, 0.95);
          border: 2px solid #4f90ff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 15px 50px rgba(79, 144, 255, 0.3);
          text-align: center;
          max-width: 450px;
          width: 90%;
        ">
          <div style="
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: linear-gradient(135deg, #4f90ff, #9d4edd);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            box-shadow: 0 8px 20px rgba(79, 144, 255, 0.4);
          ">
            🔐
          </div>
          
          <h1 style="
            color: #e0e6f1;
            font-size: 32px;
            margin: 0 0 10px 0;
            font-weight: 700;
          ">GalaxyVerse</h1>
          
          <p style="
            color: #9ca3af;
            font-size: 16px;
            margin: 0 0 30px 0;
          ">Enter your access key to continue<br>
          V1.2.1 - Key Saves</p>
          
          <input type="text" id="keyInput" placeholder="Enter your key" style="
            width: 100%;
            padding: 15px;
            font-size: 16px;
            border: 2px solid #38415d;
            border-radius: 10px;
            background: #121826;
            color: #e0e6f1;
            outline: none;
            box-sizing: border-box;
            transition: all 0.3s ease;
            margin-bottom: 20px;
          " />
          
          <button id="submitKey" style="
            width: 100%;
            padding: 15px;
            font-size: 16px;
            font-weight: bold;
            background: linear-gradient(135deg, #4f90ff, #9d4edd);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(79, 144, 255, 0.3);
          ">Verify Key</button>
          
          <button id="testConnectionBtn" style="
            width: 100%;
            padding: 10px;
            font-size: 14px;
            background: transparent;
            color: #4f90ff;
            border: 1px solid #4f90ff;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 10px;
            transition: all 0.3s ease;
          ">Test Connection</button>
          
          <div id="keyError" style="
            color: #ff4444;
            margin-top: 15px;
            font-size: 14px;
            display: none;
          "></div>
          
          <div id="connectionStatus" style="
            margin-top: 15px;
            font-size: 12px;
            color: #9ca3af;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          ">
            <span id="statusDot" style="
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #4ade80;
              display: inline-block;
            "></span>
            <span id="statusText">Connected</span>
          </div>
          
          <div style="
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #38415d;
            color: #6b7280;
            font-size: 12px;
          ">
            🌟 Each key can only be claimed by ONE user<br>
            ✨ Once claimed, it works across ALL GalaxyVerse websites<br>
            💫 Automatically recognized on any GalaxyVerse domain<br>
            🔒 No one else can use your key once you claim it<br><br>
            Contact the admins if you need a key. Lifetime key is $5.<br>
            Server: https://dsc.gg/galaxyproxi
          </div>
        </div>
      `;

      document.body.appendChild(keyOverlay);
      
      // Hide main content but don't block it
      const mainContent = document.getElementById('app') || document.body;
      if (mainContent && mainContent !== document.body) {
        mainContent.style.filter = 'blur(10px)';
        mainContent.style.pointerEvents = 'none';
      }

      // Get elements
      const keyInput = document.getElementById('keyInput');
      const submitBtn = document.getElementById('submitKey');
      const testConnectionBtn = document.getElementById('testConnectionBtn');
      const keyError = document.getElementById('keyError');
      const statusDot = document.getElementById('statusDot');
      const statusText = document.getElementById('statusText');

      // Monitor Firebase connection
      database.ref('.info/connected').on('value', (snapshot) => {
        if (snapshot.val() === true) {
          statusDot.style.background = '#4ade80';
          statusText.textContent = 'Connected';
        } else {
          statusDot.style.background = '#ff4444';
          statusText.textContent = 'Disconnected';
        }
      });

      // Test connection button
      testConnectionBtn.addEventListener('click', async function() {
        testConnectionBtn.disabled = true;
        testConnectionBtn.textContent = 'Testing...';
        keyError.style.display = 'none';
        
        try {
          console.log('Test 1: Checking connection...');
          await database.ref('.info/connected').once('value');
          console.log('✅ Connection test passed');
          
          console.log('Test 2: Testing read access...');
          const testRead = await database.ref('usedKeys').limitToFirst(1).once('value');
          console.log('✅ Read test passed');
          
          console.log('Test 3: Testing write access...');
          const testRef = database.ref('connectionTest/' + Date.now());
          await testRef.set({ test: true, timestamp: Date.now() });
          console.log('✅ Write test passed');
          
          await testRef.remove();
          
          keyError.style.color = '#4ade80';
          keyError.textContent = '✅ All tests passed! Connection is working.';
          keyError.style.display = 'block';
          
          testConnectionBtn.textContent = 'Test Connection';
          testConnectionBtn.disabled = false;
        } catch (error) {
          console.error('❌ Connection test failed:', error);
          keyError.style.color = '#ff4444';
          
          if (error.code === 'PERMISSION_DENIED') {
            keyError.textContent = '❌ Permission Denied: Firebase rules need to be updated. Contact admin.';
          } else {
            keyError.textContent = `❌ Connection test failed: ${error.message}`;
          }
          
          keyError.style.display = 'block';
          testConnectionBtn.textContent = 'Test Connection';
          testConnectionBtn.disabled = false;
        }
      });

      // Add hover effect to button
      submitBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(79, 144, 255, 0.5)';
      });

      submitBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(79, 144, 255, 0.3)';
      });

      // Add focus effect to input
      keyInput.addEventListener('focus', function() {
        this.style.borderColor = '#4f90ff';
        this.style.boxShadow = '0 0 0 3px rgba(79, 144, 255, 0.1)';
      });

      keyInput.addEventListener('blur', function() {
        this.style.borderColor = '#38415d';
        this.style.boxShadow = 'none';
      });

      async function verifyKey() {
        const enteredKey = keyInput.value.trim();
        
        if (!enteredKey) {
          keyError.textContent = '❌ Please enter a key';
          keyError.style.color = '#ff4444';
          keyError.style.display = 'block';
          keyInput.style.borderColor = '#ff4444';
          return;
        }

        if (!validKeys.includes(enteredKey)) {
          keyError.textContent = '❌ Invalid key. Please try again';
          keyError.style.color = '#ff4444';
          keyError.style.display = 'block';
          keyInput.style.borderColor = '#ff4444';
          keyInput.value = '';
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Checking...';
        submitBtn.style.cursor = 'wait';

        try {
          const normalizedSite = normalizeHostname(window.location.hostname || 'localhost');
          const actualSite = getActualWebsite(window.location.hostname || 'localhost');
          console.log('🌐 Verifying for site:', actualSite);
          console.log('🌐 Normalized site:', normalizedSite);
          
          submitBtn.textContent = 'Connecting...';
          try {
            await database.ref('.info/connected').once('value');
          } catch (connectionError) {
            console.error('Firebase connection test failed:', connectionError);
            keyError.textContent = '❌ Cannot connect to server. Check your internet connection and try again.';
            keyError.style.color = '#ff4444';
            keyError.style.display = 'block';
            keyInput.style.borderColor = '#ff4444';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Verify Key';
            submitBtn.style.cursor = 'pointer';
            return;
          }
          
          submitBtn.textContent = 'Verifying...';
          
          let currentUserId = localStorage.getItem('galaxyverse_user_id');
          if (!currentUserId) {
            currentUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('galaxyverse_user_id', currentUserId);
          }
          
          const keyRef = database.ref('usedKeys/' + enteredKey);
          const snapshot = await keyRef.once('value');
          
          if (snapshot.exists()) {
            const keyData = snapshot.val();
            const keyOwnerId = keyData.userId;
            
            // CRITICAL: Check if key is already claimed by ANOTHER user
            if (currentUserId !== keyOwnerId) {
              // Log unauthorized attempt
              const securityLogRef = database.ref('securityLogs/unauthorizedKeyAttempts/' + Date.now());
              await securityLogRef.set({
                attemptedKey: enteredKey,
                keyOwner: keyOwnerId,
                attemptedBy: currentUserId,
                website: actualSite,
                normalizedSite: normalizedSite,
                timestamp: Date.now(),
                date: new Date().toISOString(),
                userAgent: navigator.userAgent
              });
              
              keyError.textContent = '❌ This key has already been claimed by another user. Each key can only be used by ONE person across ALL GalaxyVerse sites.';
              keyError.style.color = '#ff4444';
              keyError.style.display = 'block';
              keyInput.style.borderColor = '#ff4444';
              keyInput.value = '';
              submitBtn.disabled = false;
              submitBtn.textContent = 'Verify Key';
              submitBtn.style.cursor = 'pointer';
              return;
            } else {
              // Key belongs to this user - update website list
              const websites = keyData.websites || [];
              const timesAccessed = keyData.timesAccessed || 0;
              
              // Ensure user ID is synced to localStorage
              localStorage.setItem('galaxyverse_user_id', currentUserId);
              
              if (!websites.includes(actualSite)) {
                console.log('📝 Adding site to user\'s website list');
                await keyRef.update({
                  websites: [...websites, actualSite],
                  timesAccessed: timesAccessed + 1,
                  lastAccessed: new Date().toISOString(),
                  lastAccessedSite: actualSite,
                  network: normalizedSite
                });
              } else {
                console.log('✓ Site already in user\'s list, updating access time');
                await keyRef.update({
                  timesAccessed: timesAccessed + 1,
                  lastAccessed: new Date().toISOString(),
                  lastAccessedSite: actualSite,
                  network: normalizedSite
                });
              }
              
              localStorage.setItem('galaxyverse_access', 'granted');
              localStorage.setItem('galaxyverse_user_key', enteredKey);
              
              if (typeof window.WebsiteKeyTracker !== 'undefined') {
                window.WebsiteKeyTracker.trackKeyUsage
