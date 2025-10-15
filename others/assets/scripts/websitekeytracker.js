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
            userId: null,
            websites: [],
            timesAccessed: 0
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
          lastAccessedSite: data.lastAccessedSite || null
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting key stats:', error);
        return null;
      }
    },

    // Check if key is available (not claimed by any user)
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

    // Check if key belongs to a specific user
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

        snapshot.forEach((keySnapshot) => {
          const keyData = keySnapshot.val();
          if (keyData.userId === userId) {
            userKey = keySnapshot.key;
            websites = keyData.websites || [];
          }
        });

        return {
          userId: userId,
          key: userKey,
          websites: websites
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
            totalAccesses: 0
          };
        }

        let totalAccesses = 0;
        const websiteSet = new Set();
        const userSet = new Set();
        const keyCount = snapshot.numChildren();

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
        });

        return {
          totalKeys: keyCount,
          totalUsers: userSet.size,
          totalWebsites: websiteSet.size,
          totalAccesses: totalAccesses,
          websites: Array.from(websiteSet),
          activeUsers: userSet.size
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
        const usedKeysRef = this.database.ref('usedKeys');
        const snapshot = await usedKeysRef.once('value');
        
        if (!snapshot.exists()) {
          return {
            website: website,
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
          
          if (keyData.websites && keyData.websites.includes(website)) {
            keys.push({
              key: keyName,
              userId: keyData.userId,
              firstUsedOn: keyData.firstUsedOn,
              firstUsedDate: keyData.firstUsedDate
            });
            if (keyData.userId) {
              userSet.add(keyData.userId);
            }
          }
        });

        return {
          website: website,
          uniqueUsers: userSet.size,
          totalAccesses: keys.length,
          keys: keys
        };
      } catch (error) {
        console.error('WebsiteKeyTracker: Error getting website stats:', error);
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
            recentAttempts: []
          };
        }

        const attackers = new Set();
        const targetedKeys = new Set();
        const attempts = [];

        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          attackers.add(data.attemptedBy);
          targetedKeys.add(data.attemptedKey);
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
          allAttempts: attempts
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
