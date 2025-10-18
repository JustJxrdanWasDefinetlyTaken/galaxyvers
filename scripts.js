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
            UPD test 1.
          </div>
        </div>
      `;

      document.body.appendChild(keyOverlay);
      document.body.style.overflow = 'hidden';

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
          // Test 1: Connection
          console.log('Test 1: Checking connection...');
          await database.ref('.info/connected').once('value');
          console.log('✅ Connection test passed');
          
          // Test 2: Read test
          console.log('Test 2: Testing read access...');
          const testRead = await database.ref('usedKeys').limitToFirst(1).once('value');
          console.log('✅ Read test passed');
          
          // Test 3: Write test
          console.log('Test 3: Testing write access...');
          const testRef = database.ref('connectionTest/' + Date.now());
          await testRef.set({ test: true, timestamp: Date.now() });
          console.log('✅ Write test passed');
          
          // Clean up test data
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

        // Check if key is in the valid keys list
        if (!validKeys.includes(enteredKey)) {
          keyError.textContent = '❌ Invalid key. Please try again';
          keyError.style.color = '#ff4444';
          keyError.style.display = 'block';
          keyInput.style.borderColor = '#ff4444';
          keyInput.value = '';
          return;
        }

        // Disable button while checking
        submitBtn.disabled = true;
        submitBtn.textContent = 'Checking...';
        submitBtn.style.cursor = 'wait';

        try {
          // Get the current website domain/identifier
          const currentSite = window.location.hostname || 'localhost';
          
          // Test Firebase connection first
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
          
          // Get or generate user's unique ID
          let currentUserId = localStorage.getItem('galaxyverse_user_id');
          if (!currentUserId) {
            currentUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('galaxyverse_user_id', currentUserId);
          }
          
          // Check Firebase if key has been used by anyone
          const keyRef = database.ref('usedKeys/' + enteredKey);
          const snapshot = await keyRef.once('value');
          
          if (snapshot.exists()) {
            // Key has been used - check if it was used by THIS specific user
            const keyData = snapshot.val();
            const keyOwnerId = keyData.userId;
            
            if (currentUserId !== keyOwnerId) {
              // SECURITY: Different user trying to use someone else's key
              // Log this suspicious activity
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
              // Same user returning - update access tracking
              const websites = keyData.websites || [];
              const timesAccessed = keyData.timesAccessed || 0;
              
              // Update website list if this is a new site for this user
              if (!websites.includes(currentSite)) {
                await keyRef.update({
                  websites: [...websites, currentSite],
                  timesAccessed: timesAccessed + 1,
                  lastAccessed: new Date().toISOString(),
                  lastAccessedSite: currentSite
                });
              } else {
                // Just update last access time
                await keyRef.update({
                  timesAccessed: timesAccessed + 1,
                  lastAccessed: new Date().toISOString(),
                  lastAccessedSite: currentSite
                });
              }
              
              // Grant local access
              localStorage.setItem('galaxyverse_access', 'granted');
              localStorage.setItem('galaxyverse_user_key', enteredKey);
              localStorage.setItem('galaxyverse_site', currentSite);
              
              // Track returning user
              if (typeof window.WebsiteKeyTracker !== 'undefined') {
                window.WebsiteKeyTracker.trackKeyUsage(enteredKey, currentSite, currentUserId);
              }
              
              // Success - returning user
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
                  document.body.style.overflow = '';
                }, 500);
              }, 1500);
              return;
            }
          } else {
            // Key is unused - claim it for this user
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

            // Grant access locally
            localStorage.setItem('galaxyverse_access', 'granted');
            localStorage.setItem('galaxyverse_user_key', enteredKey);
            localStorage.setItem('galaxyverse_site', currentSite);

            // Track key usage via websitekeytracker.js if available
            if (typeof window.WebsiteKeyTracker !== 'undefined') {
              window.WebsiteKeyTracker.trackKeyUsage(enteredKey, currentSite, currentUserId);
            }

            // Success animation - new user
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
                document.body.style.overflow = '';
              }, 500);
            }, 1500);
          }
        } catch (error) {
          console.error('Firebase error:', error);
          
          // Provide more specific error messages
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

      // Submit key on button click
      submitBtn.addEventListener('click', verifyKey);

      // Submit key on Enter press
      keyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          verifyKey();
        }
      });

      // Focus on input
      keyInput.focus();
      
      // Stop execution of rest of script until key is verified
      throw new Error('Access denied - valid key required');
    }

    // Start the initialization
    initializeKeySystem();
  });
})();
