// ===== ENHANCED CROSS-DOMAIN HWID SYSTEM =====
// File: others/assets/scripts/fingerprint-enhanced.js
// This file should REPLACE your existing fingerprint-enhanced.js

(function() {
  'use strict';

  window.EnhancedFingerprint = {
    initialized: false,
    cachedHWID: null,
    
    init: function() {
      if (this.initialized) return;
      this.initialized = true;
      console.log('🔐 Enhanced Cross-Domain Fingerprint System initialized (v4.0)');
    },

    // Generate comprehensive hardware fingerprint - CACHED for consistency
    async generateHWID() {
      // Return cached HWID if available (ensures consistency across same session)
      if (this.cachedHWID) {
        console.log('🔒 Using cached HWID');
        return this.cachedHWID;
      }

      try {
        const components = await this.collectHardwareData();
        const hwid = await this.hashComponents(components);
        this.cachedHWID = hwid; // Cache it
        console.log('🔒 HWID Generated:', hwid.substring(0, 16) + '...');
        return hwid;
      } catch (error) {
        console.error('❌ HWID generation error:', error);
        const fallback = this.generateFallbackHWID();
        this.cachedHWID = fallback;
        return fallback;
      }
    },

    // Collect comprehensive hardware data
    async collectHardwareData() {
      const data = {
        // Browser & System (most stable identifiers)
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages.join(','),
        platform: navigator.platform,
        
        // Hardware (very stable)
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
        deviceMemory: navigator.deviceMemory || 0,
        maxTouchPoints: navigator.maxTouchPoints || 0,
        
        // Screen (stable unless user changes monitor/resolution)
        screenResolution: `${screen.width}x${screen.height}`,
        screenDepth: `${screen.colorDepth}x${screen.pixelDepth}`,
        availableResolution: `${screen.availWidth}x${screen.availHeight}`,
        
        // Time & Location (stable)
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
        
        // Graphics (very stable)
        canvas: await this.getCanvasFingerprint(),
        webgl: await this.getWebGLFingerprint(),
        
        // Audio (stable)
        audio: await this.getAudioFingerprint(),
        
        // Fonts (relatively stable)
        fonts: await this.getFontFingerprint(),
        
        // Additional stable identifiers
        doNotTrack: navigator.doNotTrack,
        cookieEnabled: navigator.cookieEnabled,
        
        // Media devices (stable)
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

        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('GalaxyVerse HWID 🔐', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('Canvas Fingerprint', 4, 17);

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

        gainNode.gain.value = 0;
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

    // Media devices info
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

    // Hash all components together using SHA-256
    async hashComponents(components) {
      const componentString = JSON.stringify(components, Object.keys(components).sort());
      
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

      return 'hwid_' + this.simpleHash(componentString);
    },

    // Simple hash function (fallback)
    simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(36);
    },

    // Fallback HWID
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

    // Get readable device info
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

  window.EnhancedFingerprint.init();
})();
