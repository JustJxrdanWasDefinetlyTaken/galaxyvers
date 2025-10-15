/**
 * Website Key Tracker - Cross-Website Key Management System
 * File: others/assets/scripts/websitekeytracker.js
 * 
 * This module provides centralized tracking and analytics for key usage
 * across multiple GalaxyVerse websites.
 */

(function(window) {
  'use strict';

  const WebsiteKeyTracker = {
    // Configuration
    config: {
      firebaseConfig: {
        apiKey: "AIzaSyBEAf_wxxWQtaYdIfgKTTl5ls5o7e3qfAU",
        authDomain: "galaxyverse-keys.firebaseapp.com",
        databaseURL: "https://galaxyverse-keys-default-rtdb.firebaseio.com",
        projectId: "galaxyverse-keys",
        storageBucket: "galaxyverse-keys.firebasestorage.app",
        messagingSenderId: "571215796975",
        appId: "1:571215796975:web:820d004292cb4159f1d91a",
      },
      trackingEnabled: true
    },

    // Initialize the tracker
    init: function() {
      if (typeof firebase === 'undefined') {
        console.warn('WebsiteKeyTracker: Firebase not loaded. Key tracking disabled.');
        this.config.trackingEnabled = false;
        return false;
      }

      if (!firebase.apps.length) {
        firebase.initializeApp(this.config.firebaseConfig);
      }
      
      this.database = firebase.database();
      console.log('WebsiteKeyTracker: Initialized successfully');
      return true;
    },

    // Track key usage
    trackKeyUsage: function(key, website, userId) {
      if (!this.config.trackingEnabled) return;

      const timestamp = Date.now();
      const date = new Date().toISOString();
      const sanitizedWebsite = website.replace(/\./g, '_');

      // Log to analytics
      const analyticsRef = this.database.ref(`analytics/keyUsage/${key}/${sanitizedWebsite}`);
      analyticsRef.set({
        website: website,
        timestamp: timestamp,
        date: date,
        userId: userId,
        userAgent: navigator.userAgent,
        platform: navigator.platform
      }).catch(error => {
        console.error('WebsiteKeyTracker: Error tracking key usage:', error);
      });

      // Update website list for this key
      const keyRef = this.database.ref(`usedKeys/${key}`);
      keyRef.once('value').then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const websites = data.websites || [];
          const timesAccessed = data.timesAccessed || 0;
          
          if (!websites.includes(website)) {
            keyRef.update({
              websites: [...websites, website],
              timesAccessed: timesAccessed + 1,
              lastAccessed: date,
              lastAccessedSite: website
            });
          }
        }
      }).catch(error => {
        console.error('WebsiteKeyTracker: Error updating key data:', error);
      });

      console.log(`WebsiteKeyTracker: Tracked key "${key}" usage on ${website} for user ${userId}`);
    },

    // Get key statistics
    getKeyStats: async function(key) {
      if (!this.config.trackingEnabled) return null;

      try {
        const keyRef = this.database.ref(`usedKeys/${key}`);
        const snapshot = await keyRef.once('value');
        
        if (!snapshot.exists()) {
          return {
            key: key,
            used: false,
            websites: [],
            timesUsed: 0
          };
        }

        const data = snapshot.val();
        const metadata = data.metadata || {};
        const sites = data.sites || {};

        return {
          key: key,
          used: true,
          websites: metadata.websites || Object.keys(sites).map(s => s.replace(/_/g, '.')),
          timesUsed: metadata.timesUsed || Object.keys(sites).length,
          lastUsed: metadata.lastUsed || null,
          siteDetails: sites
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting key stats:', error);
        return null;
      }
    },

    // Check if key is available for a specific website
    isKeyAvailable: async function(key, website) {
      if (!this.config.trackingEnabled) return true;

      try {
        const sanitizedWebsite = website.replace(/\./g, '_');
        const keyRef = this.database.ref(`usedKeys/${key}/sites/${sanitizedWebsite}`);
        const snapshot = await keyRef.once('value');
        
        return !snapshot.exists();
      } catch (error) {
        console.error('WebsiteKeyTracker: Error checking key availability:', error);
        return false;
      }
    },

    // Get all websites using a specific key
    getWebsitesUsingKey: async function(key) {
      if (!this.config.trackingEnabled) return [];

      try {
        const sitesRef = this.database.ref(`usedKeys/${key}/sites`);
        const snapshot = await sitesRef.once('value');
        
        if (!snapshot.exists()) return [];

        const sites = [];
        snapshot.forEach((childSnapshot) => {
          const siteName = childSnapshot.key.replace(/_/g, '.');
          const siteData = childSnapshot.val();
          sites.push({
            website: siteName,
            date: siteData.date,
            timestamp: siteData.timestamp
          });
        });

        return sites;
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting websites:', error);
        return [];
      }
    },

    // Get global key usage statistics
    getGlobalStats: async function() {
      if (!this.config.trackingEnabled) return null;

      try {
        const usedKeysRef = this.database.ref('usedKeys');
        const snapshot = await usedKeysRef.once('value');
        
        if (!snapshot.exists()) {
          return {
            totalKeys: 0,
            totalWebsites: 0,
            totalActivations: 0
          };
        }

        let totalActivations = 0;
        const websiteSet = new Set();
        const keyCount = snapshot.numChildren();

        snapshot.forEach((keySnapshot) => {
          const keyData = keySnapshot.val();
          if (keyData.metadata) {
            totalActivations += keyData.metadata.timesUsed || 0;
            if (keyData.metadata.websites) {
              keyData.metadata.websites.forEach(site => websiteSet.add(site));
            }
          }
          if (keyData.sites) {
            Object.keys(keyData.sites).forEach(site => {
              websiteSet.add(site.replace(/_/g, '.'));
            });
          }
        });

        return {
          totalKeys: keyCount,
          totalWebsites: websiteSet.size,
          totalActivations: totalActivations,
          websites: Array.from(websiteSet)
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting global stats:', error);
        return null;
      }
    },

    // Revoke a key (mark as invalid across all sites)
    revokeKey: async function(key) {
      if (!this.config.trackingEnabled) return false;

      try {
        const keyRef = this.database.ref(`usedKeys/${key}`);
        const revokedRef = this.database.ref(`revokedKeys/${key}`);
        
        const snapshot = await keyRef.once('value');
        if (snapshot.exists()) {
          await revokedRef.set({
            ...snapshot.val(),
            revokedAt: new Date().toISOString(),
            revokedTimestamp: Date.now()
          });
        }

        console.log(`WebsiteKeyTracker: Key "${key}" revoked successfully`);
        return true;
      } catch (error) {
        console.error('WebsiteKeyTracker: Error revoking key:', error);
        return false;
      }
    },

    // Check if a key has been revoked
    isKeyRevoked: async function(key) {
      if (!this.config.trackingEnabled) return false;

      try {
        const revokedRef = this.database.ref(`revokedKeys/${key}`);
        const snapshot = await revokedRef.once('value');
        return snapshot.exists();
      } catch (error) {
        console.error('WebsiteKeyTracker: Error checking revocation:', error);
        return false;
      }
    },

    // Export key data for backup
    exportKeyData: async function() {
      if (!this.config.trackingEnabled) return null;

      try {
        const usedKeysRef = this.database.ref('usedKeys');
        const snapshot = await usedKeysRef.once('value');
        
        return {
          exportDate: new Date().toISOString(),
          data: snapshot.val()
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error exporting data:', error);
        return null;
      }
    },

    // Get website-specific statistics
    getWebsiteStats: async function(website) {
      if (!this.config.trackingEnabled) return null;

      try {
        const sanitizedWebsite = website.replace(/\./g, '_');
        const usedKeysRef = this.database.ref('usedKeys');
        const snapshot = await usedKeysRef.once('value');
        
        if (!snapshot.exists()) {
          return {
            website: website,
            keysUsed: 0,
            keys: []
          };
        }

        const keys = [];
        snapshot.forEach((keySnapshot) => {
          const keyName = keySnapshot.key;
          const keyData = keySnapshot.val();
          
          if (keyData.sites && keyData.sites[sanitizedWebsite]) {
            keys.push({
              key: keyName,
              activatedAt: keyData.sites[sanitizedWebsite].date,
              timestamp: keyData.sites[sanitizedWebsite].timestamp
            });
          }
        });

        return {
          website: website,
          keysUsed: keys.length,
          keys: keys
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting website stats:', error);
        return null;
      }
    }
  };

  // Auto-initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      WebsiteKeyTracker.init();
    });
  } else {
    WebsiteKeyTracker.init();
  }

  // Expose to window
  window.WebsiteKeyTracker = WebsiteKeyTracker;

})(window);
