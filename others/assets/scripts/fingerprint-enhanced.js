// ===== ENHANCED FINGERPRINT SYSTEM WITH HWID PROTECTION =====
// This system creates a unique, stable hardware identifier for each device
// that cannot be easily spoofed or changed

(function() {
  'use strict';

  window.EnhancedFingerprint = {
    initialized: false,
    
    init: function() {
      if (this.initialized) return;
      this.initialized = true;
      console.log('🔐 Enhanced Fingerprint System initialized (v3.0 - HWID Protection)');
    },

    // Generate comprehensive hardware fingerprint
    async generateHWID() {
      try {
        const components = await this.collectHardwareData();
        const hwid = await this.hashComponents(components);
        console.log('🔒 HWID Generated:', hwid.substring(0, 16) + '...');
        return hwid;
      } catch (error) {
        console.error('❌ HWID generation error:', error);
        return this.generateFallbackHWID();
      }
    },

    // Collect comprehensive hardware data
    async collectHardwareData() {
      const data = {
        // Browser & System
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages.join(','),
        platform: navigator.platform,
        
        // Hardware
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
        deviceMemory: navigator.deviceMemory || 0,
        maxTouchPoints: navigator.maxTouchPoints || 0,
        
        // Screen
        screenResolution: `${screen.width}x${screen.height}`,
        screenDepth: `${screen.colorDepth}x${screen.pixelDepth}`,
        availableResolution: `${screen.availWidth}x${screen.availHeight}`,
        
        // Time & Location
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
        
        // Graphics
        canvas: await this.getCanvasFingerprint(),
        webgl: await this.getWebGLFingerprint(),
        
        // Audio
        audio: await this.getAudioFingerprint(),
        
        // Fonts
        fonts: await this.getFontFingerprint(),
        
        // Plugins (deprecated but still useful)
        plugins: this.getPluginData(),
        
        // Additional identifiers
        doNotTrack: navigator.doNotTrack,
        cookieEnabled: navigator.cookieEnabled,
        localStorage: this.isLocalStorageAvailable(),
        sessionStorage: this.isSessionStorageAvailable(),
        indexedDB: !!window.indexedDB,
        
        // Media devices (with permission check)
        mediaDevices: await this.getMediaDevicesInfo()
      };

      return data;
    },

    // Canvas fingerprinting
    async getCanvasFingerprint() {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return 'no-canvas';

        canvas.width = 200;
        canvas.height = 50;

        // Draw complex pattern
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('GalaxyVerse HWID 🔐', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('Canvas Fingerprint', 4, 17);

        // Add geometric shapes
        ctx.beginPath();
        ctx.arc(50, 25, 20, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        const dataURL = canvas.toDataURL();
        return this.simpleHash(dataURL);
      } catch (error) {
        console.warn('Canvas fingerprint failed:', error);
        return 'canvas-error';
      }
    },

    // WebGL fingerprinting
    async getWebGLFingerprint() {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return 'no-webgl';

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'unknown';
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'unknown';

        return this.simpleHash(vendor + '|' + renderer);
      } catch (error) {
        console.warn('WebGL fingerprint failed:', error);
        return 'webgl-error';
      }
    },

    // Audio fingerprinting
    async getAudioFingerprint() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return 'no-audio';

        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const analyser = context.createAnalyser();
        const gainNode = context.createGain();
        const scriptProcessor = context.createScriptProcessor(4096, 1, 1);

        gainNode.gain.value = 0; // Mute
        oscillator.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.start(0);

        return new Promise((resolve) => {
          scriptProcessor.onaudioprocess = function(event) {
            const output = event.outputBuffer.getChannelData(0);
            const hash = Array.from(output.slice(0, 30))
              .map(v => v.toFixed(10))
              .join('');
            
            oscillator.stop();
            scriptProcessor.disconnect();
            analyser.disconnect();
            gainNode.disconnect();
            context.close();

            resolve(hash.substring(0, 50));
          };

          // Timeout after 100ms
          setTimeout(() => {
            oscillator.stop();
            context.close();
            resolve('audio-timeout');
          }, 100);
        });
      } catch (error) {
        console.warn('Audio fingerprint failed:', error);
        return 'audio-error';
      }
    },

    // Font detection fingerprinting
    async getFontFingerprint() {
      try {
        const baseFonts = ['monospace', 'sans-serif', 'serif'];
        const testFonts = [
          'Arial', 'Verdana', 'Times New Roman', 'Courier New',
          'Georgia', 'Palatino', 'Garamond', 'Comic Sans MS',
          'Trebuchet MS', 'Impact', 'Lucida Console'
        ];

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return 'no-font-detection';

        const text = 'mmmmmmmmmmlli';
        const textSize = '72px';

        const baseWidths = {};
        for (const baseFont of baseFonts) {
          ctx.font = `${textSize} ${baseFont}`;
          baseWidths[baseFont] = ctx.measureText(text).width;
        }

        const detectedFonts = [];
        for (const testFont of testFonts) {
          for (const baseFont of baseFonts) {
            ctx.font = `${textSize} ${testFont}, ${baseFont}`;
            const width = ctx.measureText(text).width;
            if (width !== baseWidths[baseFont]) {
              detectedFonts.push(testFont);
              break;
            }
          }
        }

        return this.simpleHash(detectedFonts.sort().join(','));
      } catch (error) {
        console.warn('Font fingerprint failed:', error);
        return 'font-error';
      }
    },

    // Plugin data
    getPluginData() {
      try {
        if (!navigator.plugins || navigator.plugins.length === 0) {
          return 'no-plugins';
        }
        
        const plugins = Array.from(navigator.plugins)
          .map(p => p.name)
          .sort()
          .join(',');
        
        return this.simpleHash(plugins);
      } catch (error) {
        return 'plugin-error';
      }
    },

    // Media devices info (without requesting permission)
    async getMediaDevicesInfo() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          return 'no-media-devices';
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const deviceTypes = devices.map(d => d.kind).sort().join(',');
        return this.simpleHash(deviceTypes);
      } catch (error) {
        return 'media-devices-error';
      }
    },

    // Storage availability checks
    isLocalStorageAvailable() {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    },

    isSessionStorageAvailable() {
      try {
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    },

    // Hash all components together
    async hashComponents(components) {
      const componentString = JSON.stringify(components, Object.keys(components).sort());
      
      // Use Web Crypto API for strong hashing if available
      if (window.crypto && window.crypto.subtle) {
        try {
          const encoder = new TextEncoder();
          const data = encoder.encode(componentString);
          const hashBuffer = await crypto.subtle.digest('SHA-256', data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          return 'hwid_' + hashHex;
        } catch (error) {
          console.warn('Crypto API failed, using fallback hash:', error);
        }
      }

      // Fallback to simple hash
      return 'hwid_' + this.simpleHash(componentString);
    },

    // Simple hash function (fallback)
    simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash).toString(36);
    },

    // Fallback HWID if all else fails
    generateFallbackHWID() {
      const fallbackData = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        navigator.hardwareConcurrency || 0
      ].join('|');

      return 'hwid_fallback_' + this.simpleHash(fallbackData);
    },

    // Verify HWID matches
    async verifyHWID(storedHWID) {
      const currentHWID = await this.generateHWID();
      const matches = currentHWID === storedHWID;
      
      if (!matches) {
        console.warn('⚠️ HWID Mismatch detected!');
        console.log('Expected:', storedHWID.substring(0, 20) + '...');
        console.log('Got:', currentHWID.substring(0, 20) + '...');
      }
      
      return matches;
    },

    // Get readable device info (for display purposes)
    getDeviceInfo() {
      return {
        browser: this.getBrowserInfo(),
        os: this.getOSInfo(),
        screen: `${screen.width}x${screen.height}`,
        cores: navigator.hardwareConcurrency || 'unknown',
        memory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'unknown'
      };
    },

    getBrowserInfo() {
      const ua = navigator.userAgent;
      if (ua.includes('Firefox')) return 'Firefox';
      if (ua.includes('Chrome')) return 'Chrome';
      if (ua.includes('Safari')) return 'Safari';
      if (ua.includes('Edge')) return 'Edge';
      return 'Unknown';
    },

    getOSInfo() {
      const ua = navigator.userAgent;
      if (ua.includes('Windows')) return 'Windows';
      if (ua.includes('Mac')) return 'macOS';
      if (ua.includes('Linux')) return 'Linux';
      if (ua.includes('Android')) return 'Android';
      if (ua.includes('iOS')) return 'iOS';
      return 'Unknown';
    }
  };

  // Initialize on load
  window.EnhancedFingerprint.init();
})();
