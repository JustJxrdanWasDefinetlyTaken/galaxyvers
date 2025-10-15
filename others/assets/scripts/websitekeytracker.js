try {
        // Get the current website domain/identifier
        const currentSite = window.location.hostname || 'localhost';
        
        // Check Firebase if key has been used on this specific website
        const keyRef = database.ref('usedKeys/' + enteredKey + '/sites/' + currentSite.replace(/\./g, '_'));
        const snapshot = await keyRef.once('value');
        
        if (snapshot.exists()) {
          // Key has already been used on THIS website
          keyError.textContent = '❌ This key has already been used on this website. Please use a different key.';
          keyError.style.display = 'block';
          keyInput.style.borderColor = '#ff4444';
          keyInput.value = '';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Verify Key';
          submitBtn.style.cursor = 'pointer';
        } else {
          // Key is valid and unused on this website - mark it as used
          await keyRef.set({
            used: true,
            timestamp: Date.now(),
            date: new Date().toISOString(),
            site: currentSite
          });

          // Also update the main key record with metadata
          const mainKeyRef = database.ref('usedKeys/' + enteredKey + '/metadata');
          const mainSnapshot = await mainKeyRef.once('value');
          const currentData = mainSnapshot.val() || { timesUsed: 0, websites: [] };
          
          await mainKeyRef.set({
            timesUsed: (currentData.timesUsed || 0) + 1,
            websites: [...(currentData.websites || []), currentSite],
            lastUsed: new Date().toISOString()
          });

          // Grant access locally
          localStorage.setItem('galaxyverse_access', 'granted');
          localStorage.setItem('galaxyverse_user_key', enteredKey);
          localStorage.setItem('galaxyverse_site', currentSite);

          // Success animation
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
