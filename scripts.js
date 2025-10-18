// ===== FIREBASE KEY SYSTEM - MUST BE FIRST =====
// NOTE: You need to add Firebase SDK to your HTML file first!
// Add these scripts to your index.html BEFORE scripts.js:
/*
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
<script src="others/assets/scripts/websitekeytracker.js"></script>
*/

(function() {
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

    // Load valid keys from external file
    let validKeys = [];
    
    async function loadValidKeys() {
      try {
        // Check if window.fs.readFile is available (for Claude artifacts)
        if (typeof window.fs !== 'undefined' && window.fs.readFile) {
          const fileContent = await window.fs.readFile('others/scrappedlistofyt.txt', { encoding: 'utf8' });
          validKeys = fileContent.split('\n')
            .map(key => key.trim())
            .filter(key => key.length > 0 && !key.startsWith('#'));
          console.log(`✅ Loaded ${validKeys.length} valid keys from file`);
        } else {
          // Fallback: fetch the file using standard fetch API
          const response = await fetch('others/scrappedlistofyt.txt');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const fileContent = await response.text();
          validKeys = fileContent.split('\n')
            .map(key => key.trim())
            .filter(key => key.length > 0 && !key.startsWith('#'));
          console.log(`✅ Loaded ${validKeys.length} valid keys from file`);
        }
        return true;
      } catch (error) {
        console.error('❌ Failed to load keys from file:', error);
        // Fallback to hardcoded keys if file loading fails
        validKeys = [
          'd4vid_ghost',
          'azthedev',
          'testingkeyfordevelopers',
          'spartan_alloy3',
          'aanzoski',
          'CxgMvuMFYdu9JwDePpddn2LOOgZPKn05',
          '1AG4JsMjOvPiC9RzLt6KRZM2zAN8JhhM',
          'qwtS730SkOAv4bhNpqC4qe2LXDaWV24i',
          'LKPR0egJizvkY23HT5QJxjq8kp0SPsGe',
          'neZN0a439QuKezFjQY1OyIGUOlDITSuA',
          'fu5DZ4cpsbkLf4nXHRnvpARKomGqnleC'
        ];
        console.log('⚠️ Using fallback hardcoded keys');
        return false;
      }
    }

    // Initialize the key system
    async function initializeKeySystem() {
      // Load keys from file first
      await loadValidKeys();

      // Check if user has already activated a key locally
      const hasAccess = localStorage.getItem('galaxyverse_access');
      const userKeyId = localStorage.getItem('galaxyverse_user_id');

      // If user already has access with a valid key, allow them through
      if (hasAccess === 'granted' && userKeyId) {
        console.log('GalaxyVerse: Access granted via existing key');
        return;
      }

      // If user doesn't have access, show key entry screen
      if (hasAccess !== 'granted') {
        showKeyEntryScreen();
      }
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
          ">Enter your access key to continue</p>
          
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
            🌟 Each key can only be claimed by one user<br>
            Once claimed, it works across all GalaxyVerse websites<br>
            Contact the admins if you need a key. Lifetime key is $7.<br>
            Server: https://dsc.gg/galaxyproxi.
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
          const currentSite = window.location.hostname || 'localhost';
          
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
            
            if (currentUserId !== keyOwnerId) {
              const securityLogRef = database.ref('securityLogs/unauthorizedKeyAttempts/' + Date.now());
              await securityLogRef.set({
                attemptedKey: enteredKey,
                keyOwner: keyOwnerId,
                attemptedBy: currentUserId,
                website: currentSite,
                timestamp: Date.now(),
                date: new Date().toISOString(),
                userAgent: navigator.userAgent
              });
              
              keyError.textContent = '❌ This key has already been claimed by another user. Each key can only be used by one person.';
              keyError.style.color = '#ff4444';
              keyError.style.display = 'block';
              keyInput.style.borderColor = '#ff4444';
              keyInput.value = '';
              submitBtn.disabled = false;
              submitBtn.textContent = 'Verify Key';
              submitBtn.style.cursor = 'pointer';
              return;
            } else {
              const websites = keyData.websites || [];
              const timesAccessed = keyData.timesAccessed || 0;
              
              if (!websites.includes(currentSite)) {
                await keyRef.update({
                  websites: [...websites, currentSite],
                  timesAccessed: timesAccessed + 1,
                  lastAccessed: new Date().toISOString(),
                  lastAccessedSite: currentSite
                });
              } else {
                await keyRef.update({
                  timesAccessed: timesAccessed + 1,
                  lastAccessed: new Date().toISOString(),
                  lastAccessedSite: currentSite
                });
              }
              
              localStorage.setItem('galaxyverse_access', 'granted');
              localStorage.setItem('galaxyverse_user_key', enteredKey);
              localStorage.setItem('galaxyverse_site', currentSite);
              
              if (typeof window.WebsiteKeyTracker !== 'undefined') {
                window.WebsiteKeyTracker.trackKeyUsage(enteredKey, currentSite, currentUserId);
              }
              
              keyError.style.color = '#4ade80';
              keyError.textContent = '✅ Welcome back! Access granted';
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
            await keyRef.set({
              used: true,
              userId: currentUserId,
              firstUsedOn: currentSite,
              firstUsedDate: new Date().toISOString(),
              firstUsedTimestamp: Date.now(),
              websites: [currentSite],
              timesAccessed: 1,
              lastAccessed: new Date().toISOString(),
              lastAccessedSite: currentSite
            });

            localStorage.setItem('galaxyverse_access', 'granted');
            localStorage.setItem('galaxyverse_user_key', enteredKey);
            localStorage.setItem('galaxyverse_site', currentSite);

            if (typeof window.WebsiteKeyTracker !== 'undefined') {
              window.WebsiteKeyTracker.trackKeyUsage(enteredKey, currentSite, currentUserId);
            }

            keyError.style.color = '#4ade80';
            keyError.textContent = '✅ Access granted! Welcome to GalaxyVerse';
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
  { name: "Cookie Clicker", image: "others/assets/images/games/cookie-clicker.png", url: "others/assets/games/Cookie Clicker.html" },
  { name: "Crazy Cattle 3D", image: "others/assets/images/games/crazy-cattle-3d-icon.jpg", url: "others/assets/games/Crazy Cattle 3D.html" },
  { name: "Crossy Road", image: "others/assets/images/games/crossyroad.png", url: "others/assets/games/Crossy Road.html" },
  { name: "Drift Boss", image: "others/assets/images/games/driftboss.png", url: "others/assets/games/Drift Boss.html" },
  { name: "Drift Hunters ", image: "others/assets/images/games/drift-hunters.png", url: "others/assets/games/Drift Hunters.html" },
  { name: "Friday Night Funkin': Darkness Takeover", image: "others/assets/images/games/takeover.jpg", url: "others/assets/games/Friday Night Funkin'_ Darkness Takeover.html" },
  { name: "Geometry Dash Lite", image: "others/assets/images/games/dashlite.png", url: "others/assets/games/Geometry Dash Lite.html" },
  { name: "Google Baseball", image: "others/assets/images/games/baseball.png", url: "others/assets/games/Google Baseball.html" },
  { name: "Infinite Craft", image: "others/assets/images/games/infcraft.jpg", url: "others/assets/games/Infinite Craft" },
  { name: "Jetpack Joyride", image: "others/assets/images/games/jetpack.png", url: "others/assets/games/Jetpack Joyride.html" },
  { name: "Monkey Mart", image: "others/assets/images/games/monkey-mart.png", url: "others/assets/games/Monkey Mart.html" },
  { name: "Paper.IO", image: "others/assets/images/games/paperio2.png", url: "others/assets/games/Paper.io 2.html" },
  { name: "Retro Bowl", image: "others/assets/images/games/retro-bowl.jpeg", url: "others/assets/games/Retro Bowl.html" },
  { name: "Rooftop Snipers", image: "others/assets/images/games/rooftopsnipers.jpg", url: "others/assets/games/Rooftop Snipers.html" },
  { name: "Rooftop Snipers 2", image: "others/assets/images/games/rooftop-snipers-2.avif", url: "others/assets/games/Rooftop Snipers 2.html" },
  { name: "Slope", image: "others/assets/images/games/slope.png", url: "others/assets/games/Slope.html" },
  { name: "Solar Smash", image: "others/assets/images/games/Solar_smash.webp", url: "others/assets/games/Solar Smash.html" },
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

// ===== GAME OF THE DAY =====
function getGameOfTheDay() {
  const now = new Date();
  const cdtOffset = -5;
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const cdtTime = new Date(utc + (3600000 * cdtOffset));
  const startOfYear = new Date(cdtTime.getFullYear(), 0, 0);
  startOfYear.setHours(0, 0, 0, 0);
  const diff = cdtTime - startOfYear;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const playableGames = games.filter(game => game.name !== "Feedback");
  const index = dayOfYear % playableGames.length;
  return playableGames[index];
}

function displayGameOfTheDay() {
  const gotdContainer = document.getElementById('game-of-the-day-container');
  if (!gotdContainer) return;
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
  renderGames(games);
}

function showApps() {
  hideAll();
  const appsContent = document.getElementById('content-apps');
  if (appsContent) appsContent.style.display = 'block';
  const appsLink = document.getElementById('appsLink');
  if (appsLink) appsLink.classList.add('active');
  renderApps(apps);
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

  // Credits and Update Log buttons
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

  // Preset select dropdown
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

  // Panic hotkey input
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

  // Panic button key listener
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
        setTimeout(() => { window.location.reload(); }, 1000);
      } else {
        alert('About:blank cloaking disabled. Note: You may need to manually close this tab and reopen the site normally.');
      }
    });
  }

  // Navigation links
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

  // Game search
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

  // Fullscreen toggle
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Homepage search
  const homepageSearchBtn = document.getElementById('homepageSearchBtn');
  const homepageSearchInput = document.getElementById('homepageSearchInput');
  if (homepageSearchBtn) homepageSearchBtn.addEventListener('click', homepageSearch);
  if (homepageSearchInput) {
    homepageSearchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') homepageSearch();
    });
  }
};
