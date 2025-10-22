/**
 * Website Key Tracker - Cross-Website Key Management System
 * File: others/assets/scripts/websitekeytracker.js
 * Version: 2.0 - Unified Network Support
 * 
 * This module provides centralized tracking and analytics for key usage
 * across ALL GalaxyVerse websites with unified key management.
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
      trackingEnabled: true,
      networkIdentifier: 'galaxyverse-network' // Unified network identifier
    },

    // List of all GalaxyVerse domains
    galaxyVerseDomains: [
      'schoologydashboard.org',
      'gverse.schoologydashboard.org',
      'ahs.schoologydashboard.org',
      'learn.schoologydashboard.org',
      'galaxyverse-c1v.pages.dev',
      'galaxyverse.org',
      'localhost'
    ],

    // Normalize website name for unified tracking
    normalizeWebsite: function(website) {
      // Remove protocol, www, and port
      website = website.replace(/^https?:\/\//, '').replace(/^www\./, '').split(':')[0];
      
      // Check if it's a GalaxyVerse domain
      for (const domain of this.galaxyVerseDomains) {
        if (website.includes(domain.replace('.org', '').replace('.dev', '').replace('.net', ''))) {
          return this.config.networkIdentifier;
        }
      }
      
      return website;
    },

    // Get actual website name for display
    getActualWebsite: function(website) {
      website = website.replace(/^https?:\/\//, '').replace(/^www\./, '').split(':')[0];
      
      if (website.includes('schoologydashboard.org')) {
        if (website.includes('gverse')) return 'gverse.schoologydashboard.org';
        if (website.includes('ahs')) return 'ahs.schoologydashboard.org';
        if (website.includes('learn')) return 'learn.schoologydashboard.org';
        return 'schoologydashboard.org';
      }
      
      if (website.includes('galaxyverse-c1v.pages.dev')) {
        return 'galaxyverse-c1v.pages.dev';
      }
      
      if (website.includes('galaxyverse.org')) {
        return 'galaxyverse.org';
      }
      
      if (website === 'localhost' || website === '127.0.0.1') {
        return 'localhost';
      }
      
      return website;
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
      console.log('WebsiteKeyTracker: Initialized successfully (v2.0 - Unified Network)');
      return true;
    },

    // Track key usage with unified network support
    trackKeyUsage: function(key, website, userId) {
      if (!this.config.trackingEnabled) return;

      const timestamp = Date.now();
      const date = new Date().toISOString();
      const actualWebsite = this.getActualWebsite(website);
      const normalizedWebsite = this.normalizeWebsite(website);
      const sanitizedWebsite = actualWebsite.replace(/\./g, '_').replace(/:/g, '_');

      // Log to analytics with both actual and normalized site info
      const analyticsRef = this.database.ref(`analytics/keyUsage/${key}/${sanitizedWebsite}/${timestamp}`);
      analyticsRef.set({
        website: actualWebsite,
        normalizedNetwork: normalizedWebsite,
        timestamp: timestamp,
        date: date,
        userId: userId,
        userAgent: navigator.userAgent,
        platform: navigator.platform
      }).catch(error => {
        console.error('WebsiteKeyTracker: Error tracking key usage:', error);
      });

      // Update website list for this key (track actual websites visited)
      const keyRef = this.database.ref(`usedKeys/${key}`);
      keyRef.once('value').then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const websites = data.websites || [];
          const timesAccessed = data.timesAccessed || 0;
          
          // Add actual website to list if not already there
          if (!websites.includes(actualWebsite)) {
            keyRef.update({
              websites: [...websites, actualWebsite],
              timesAccessed: timesAccessed + 1,
              lastAccessed: date,
              lastAccessedSite: actualWebsite,
              network: normalizedWebsite
            });
          } else {
            // Just update access count and timestamp
            keyRef.update({
              timesAccessed: timesAccessed + 1,
              lastAccessed: date,
              lastAccessedSite: actualWebsite,
              network: normalizedWebsite
            });
          }
        }
      }).catch(error => {
        console.error('WebsiteKeyTracker: Error updating key data:', error);
      });

      console.log(`WebsiteKeyTracker: Tracked key "${key}" usage on ${actualWebsite} (network: ${normalizedWebsite}) for user ${userId}`);
    },

    // Get key statistics with network info
    getKeyStats: async function(key) {
      if (!this.config.trackingEnabled) return null;

      try {
        const keyRef = this.database.ref(`usedKeys/${key}`);
        const snapshot = await keyRef.once('value');
        
        if (!snapshot.exists()) {
          return {
            key: key,
            used: false,
            userId: null,
            websites: [],
            timesAccessed: 0,
            network: null
          };
        }

        const data = snapshot.val();

        return {
          key: key,
          used: true,
          userId: data.userId || null,
          websites: data.websites || [],
          timesAccessed: data.timesAccessed || 0,
          firstUsedOn: data.firstUsedOn || null,
          firstUsedDate: data.firstUsedDate || null,
          lastAccessed: data.lastAccessed || null,
          lastAccessedSite: data.lastAccessedSite || null,
          network: data.network || null,
          claimedAcrossNetwork: data.claimedAcrossNetwork || false
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting key stats:', error);
        return null;
      }
    },

    // Check if key is available (not claimed by ANY user across the network)
    isKeyAvailable: async function(key) {
      if (!this.config.trackingEnabled) return true;

      try {
        const keyRef = this.database.ref(`usedKeys/${key}`);
        const snapshot = await keyRef.once('value');
        
        return !snapshot.exists();
      } catch (error) {
        console.error('WebsiteKeyTracker: Error checking key availability:', error);
        return false;
      }
    },

    // Check if key belongs to a specific user (works across ALL sites)
    doesKeyBelongToUser: async function(key, userId) {
      if (!this.config.trackingEnabled) return false;

      try {
        const keyRef = this.database.ref(`usedKeys/${key}`);
        const snapshot = await keyRef.once('value');
        
        if (!snapshot.exists()) return false;

        const data = snapshot.val();
        return data.userId === userId;
      } catch (error) {
        console.error('WebsiteKeyTracker: Error checking key ownership:', error);
        return false;
      }
    },

    // Get all websites a user has accessed with their key
    getUserWebsites: async function(userId) {
      if (!this.config.trackingEnabled) return [];

      try {
        const usedKeysRef = this.database.ref('usedKeys');
        const snapshot = await usedKeysRef.once('value');
        
        if (!snapshot.exists()) return [];

        let userKey = null;
        let websites = [];
        let network = null;

        snapshot.forEach((keySnapshot) => {
          const keyData = keySnapshot.val();
          if (keyData.userId === userId) {
            userKey = keySnapshot.key;
            websites = keyData.websites || [];
            network = keyData.network || null;
          }
        });

        return {
          userId: userId,
          key: userKey,
          websites: websites,
          network: network,
          totalSites: websites.length
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting user websites:', error);
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
            totalUsers: 0,
            totalWebsites: 0,
            totalAccesses: 0,
            networkKeys: 0
          };
        }

        let totalAccesses = 0;
        const websiteSet = new Set();
        const userSet = new Set();
        const keyCount = snapshot.numChildren();
        let networkKeys = 0;

        snapshot.forEach((keySnapshot) => {
          const keyData = keySnapshot.val();
          if (keyData.userId) {
            userSet.add(keyData.userId);
          }
          if (keyData.timesAccessed) {
            totalAccesses += keyData.timesAccessed;
          }
          if (keyData.websites) {
            keyData.websites.forEach(site => websiteSet.add(site));
          }
          if (keyData.network === this.config.networkIdentifier || keyData.claimedAcrossNetwork) {
            networkKeys++;
          }
        });

        return {
          totalKeys: keyCount,
          totalUsers: userSet.size,
          totalWebsites: websiteSet.size,
          totalAccesses: totalAccesses,
          websites: Array.from(websiteSet),
          activeUsers: userSet.size,
          networkKeys: networkKeys,
          networkIdentifier: this.config.networkIdentifier
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting global stats:', error);
        return null;
      }
    },

    // Revoke a key (mark as invalid across ALL sites in the network)
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
            revokedTimestamp: Date.now(),
            revokedFromNetwork: this.config.networkIdentifier
          });
          
          // Optionally remove from active keys
          // await keyRef.remove();
        }

        console.log(`WebsiteKeyTracker: Key "${key}" revoked successfully across ALL network sites`);
        return true;
      } catch (error) {
        console.error('WebsiteKeyTracker: Error revoking key:', error);
        return false;
      }
    },

    // Check if a key has been revoked (checks network-wide)
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
          networkIdentifier: this.config.networkIdentifier,
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

      const actualWebsite = this.getActualWebsite(website);

      try {
        const usedKeysRef = this.database.ref('usedKeys');
        const snapshot = await usedKeysRef.once('value');
        
        if (!snapshot.exists()) {
          return {
            website: actualWebsite,
            uniqueUsers: 0,
            totalAccesses: 0,
            keys: []
          };
        }

        const keys = [];
        const userSet = new Set();

        snapshot.forEach((keySnapshot) => {
          const keyName = keySnapshot.key;
          const keyData = keySnapshot.val();
          
          if (keyData.websites && keyData.websites.includes(actualWebsite)) {
            keys.push({
              key: keyName,
              userId: keyData.userId,
              firstUsedOn: keyData.firstUsedOn,
              firstUsedDate: keyData.firstUsedDate,
              network: keyData.network
            });
            if (keyData.userId) {
              userSet.add(keyData.userId);
            }
          }
        });

        return {
          website: actualWebsite,
          uniqueUsers: userSet.size,
          totalAccesses: keys.length,
          keys: keys
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting website stats:', error);
        return null;
      }
    },

    // Get network-wide statistics
    getNetworkStats: async function() {
      if (!this.config.trackingEnabled) return null;

      try {
        const usedKeysRef = this.database.ref('usedKeys');
        const snapshot = await usedKeysRef.once('value');
        
        if (!snapshot.exists()) {
          return {
            network: this.config.networkIdentifier,
            totalKeys: 0,
            totalUsers: 0,
            websiteBreakdown: {}
          };
        }

        const userSet = new Set();
        const websiteBreakdown = {};
        let totalKeys = 0;

        snapshot.forEach((keySnapshot) => {
          const keyData = keySnapshot.val();
          
          if (keyData.network === this.config.networkIdentifier || keyData.claimedAcrossNetwork) {
            totalKeys++;
            
            if (keyData.userId) {
              userSet.add(keyData.userId);
            }
            
            if (keyData.websites) {
              keyData.websites.forEach(site => {
                if (!websiteBreakdown[site]) {
                  websiteBreakdown[site] = 0;
                }
                websiteBreakdown[site]++;
              });
            }
          }
        });

        return {
          network: this.config.networkIdentifier,
          totalKeys: totalKeys,
          totalUsers: userSet.size,
          websiteBreakdown: websiteBreakdown,
          domains: this.galaxyVerseDomains
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting network stats:', error);
        return null;
      }
    },

    // Get unauthorized access attempts (security monitoring)
    getUnauthorizedAttempts: async function(limit = 50) {
      if (!this.config.trackingEnabled) return [];

      try {
        const securityRef = this.database.ref('securityLogs/unauthorizedKeyAttempts');
        const snapshot = await securityRef.orderByKey().limitToLast(limit).once('value');
        
        if (!snapshot.exists()) return [];

        const attempts = [];
        snapshot.forEach((childSnapshot) => {
          attempts.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        return attempts.reverse(); // Most recent first
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting unauthorized attempts:', error);
        return [];
      }
    },

    // Get attempts for a specific key
    getKeyTheftAttempts: async function(key) {
      if (!this.config.trackingEnabled) return [];

      try {
        const securityRef = this.database.ref('securityLogs/unauthorizedKeyAttempts');
        const snapshot = await securityRef.once('value');
        
        if (!snapshot.exists()) return [];

        const attempts = [];
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (data.attemptedKey === key) {
            attempts.push({
              id: childSnapshot.key,
              ...data
            });
          }
        });

        return attempts;
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting key theft attempts:', error);
        return [];
      }
    },

    // Check if a user has suspicious activity
    checkSuspiciousActivity: async function(userId) {
      if (!this.config.trackingEnabled) return null;

      try {
        const securityRef = this.database.ref('securityLogs/unauthorizedKeyAttempts');
        const snapshot = await securityRef.once('value');
        
        if (!snapshot.exists()) {
          return {
            userId: userId,
            isSuspicious: false,
            attemptCount: 0,
            attempts: []
          };
        }

        const attempts = [];
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (data.attemptedBy === userId) {
            attempts.push({
              id: childSnapshot.key,
              ...data
            });
          }
        });

        return {
          userId: userId,
          isSuspicious: attempts.length > 0,
          attemptCount: attempts.length,
          attempts: attempts,
          flagged: attempts.length >= 3 // Flag if 3+ attempts
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error checking suspicious activity:', error);
        return null;
      }
    },

    // Get security dashboard data
    getSecurityDashboard: async function() {
      if (!this.config.trackingEnabled) return null;

      try {
        const securityRef = this.database.ref('securityLogs/unauthorizedKeyAttempts');
        const snapshot = await securityRef.once('value');
        
        if (!snapshot.exists()) {
          return {
            totalAttempts: 0,
            uniqueAttackers: 0,
            targetedKeys: 0,
            recentAttempts: [],
            networkAttempts: 0
          };
        }

        const attackers = new Set();
        const targetedKeys = new Set();
        const attempts = [];
        let networkAttempts = 0;

        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          attackers.add(data.attemptedBy);
          targetedKeys.add(data.attemptedKey);
          
          if (data.normalizedSite === this.config.networkIdentifier) {
            networkAttempts++;
          }
          
          attempts.push({
            id: childSnapshot.key,
            ...data
          });
        });

        // Get last 10 attempts
        const recentAttempts = attempts
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 10);

        return {
          totalAttempts: attempts.length,
          uniqueAttackers: attackers.size,
          targetedKeys: targetedKeys.size,
          recentAttempts: recentAttempts,
          allAttempts: attempts,
          networkAttempts: networkAttempts,
          network: this.config.networkIdentifier
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting security dashboard:', error);
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
