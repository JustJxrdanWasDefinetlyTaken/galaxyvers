// ===== THEMES.JS - Complete Theme Configuration =====
// All available themes for GalaxyVerse
// Includes seasonal themes: Halloween and Christmas

const seasonalThemes = {
  halloween: {
    bgColor: '#0a0a0a',
    navColor: '#1a0f0a',
    accentColor: '#ff6600',
    textColor: '#ffa500',
    borderColor: '#331a00',
    hoverBg: '#2a1a0f',
    btnBg: '#4a2a1a',
    btnHoverBg: '#ff6600',
    name: '🎃 Halloween'
  },
  christmas: {
    bgColor: '#0a1a0a',
    navColor: '#1a2e1a',
    accentColor: '#c41e3a',
    textColor: '#f0f8ff',
    borderColor: '#2d5016',
    hoverBg: '#1f3d1f',
    btnBg: '#2d5016',
    btnHoverBg: '#c41e3a',
    secondaryAccent: '#228b22',
    name: '🎄 Christmas'
  }
};

// All theme definitions
const allThemes = {
  original: { 
    bgColor: '#121826', 
    navColor: '#1e2433', 
    accentColor: '#4f90ff', 
    textColor: '#e0e6f1', 
    borderColor: '#38415d', 
    hoverBg: '#2a2f48', 
    btnBg: '#3b466f', 
    btnHoverBg: '#4f90ff',
    name: 'Original'
  },
  halloween: seasonalThemes.halloween,
  christmas: seasonalThemes.christmas,
  dark: { 
    bgColor: '#0a0a0a', 
    navColor: '#1a1a1a', 
    accentColor: '#00ff00', 
    textColor: '#ffffff', 
    borderColor: '#333333', 
    hoverBg: '#2a2a2a', 
    btnBg: '#262626', 
    btnHoverBg: '#00ff00',
    name: 'Dark'
  },
  light: { 
    bgColor: '#f5f5f5', 
    navColor: '#ffffff', 
    accentColor: '#2563eb', 
    textColor: '#1f2937', 
    borderColor: '#e5e7eb', 
    hoverBg: '#e5e7eb', 
    btnBg: '#d1d5db', 
    btnHoverBg: '#2563eb',
    name: 'Light'
  },
  midnight: { 
    bgColor: '#0f0f23', 
    navColor: '#1a1a2e', 
    accentColor: '#9d4edd', 
    textColor: '#e0e0e0', 
    borderColor: '#3c3c5a', 
    hoverBg: '#2a2a4e', 
    btnBg: '#3c3c6f', 
    btnHoverBg: '#9d4edd',
    name: 'Midnight'
  },
  ocean: { 
    bgColor: '#001f3f', 
    navColor: '#0a2f4f', 
    accentColor: '#00d4ff', 
    textColor: '#cfe2f3', 
    borderColor: '#1a4f6f', 
    hoverBg: '#1a3f5f', 
    btnBg: '#2a5f7f', 
    btnHoverBg: '#00d4ff',
    name: 'Ocean'
  },
  sunset: { 
    bgColor: '#2d1b2e', 
    navColor: '#3d2b3e', 
    accentColor: '#ff6b9d', 
    textColor: '#fce4ec', 
    borderColor: '#5d4b5e', 
    hoverBg: '#4d3b4e', 
    btnBg: '#6d5b6e', 
    btnHoverBg: '#ff6b9d',
    name: 'Sunset'
  },
  forest: { 
    bgColor: '#1a2f1a', 
    navColor: '#2a3f2a', 
    accentColor: '#7cb342', 
    textColor: '#e8f5e9', 
    borderColor: '#3a5f3a', 
    hoverBg: '#3a4f3a', 
    btnBg: '#4a6f4a', 
    btnHoverBg: '#7cb342',
    name: 'Forest'
  },
  purple: { 
    bgColor: '#1a0a2e', 
    navColor: '#2a1a3e', 
    accentColor: '#b744f7', 
    textColor: '#f0e6ff', 
    borderColor: '#4a3a5e', 
    hoverBg: '#3a2a4e', 
    btnBg: '#5a4a6e', 
    btnHoverBg: '#b744f7',
    name: 'Purple'
  },
  cyberpunk: { 
    bgColor: '#0d0221', 
    navColor: '#1a0b3a', 
    accentColor: '#ff006e', 
    textColor: '#00f5ff', 
    borderColor: '#8338ec', 
    hoverBg: '#2a1a4a', 
    btnBg: '#3a2a5a', 
    btnHoverBg: '#ff006e',
    name: 'Cyberpunk'
  },
  matrix: { 
    bgColor: '#000000', 
    navColor: '#0a1a0a', 
    accentColor: '#00ff41', 
    textColor: '#00ff41', 
    borderColor: '#003b00', 
    hoverBg: '#0a2a0a', 
    btnBg: '#1a3a1a', 
    btnHoverBg: '#00ff41',
    name: 'Matrix'
  },
  neon: { 
    bgColor: '#1a0033', 
    navColor: '#2a0a4a', 
    accentColor: '#ff00ff', 
    textColor: '#00ffff', 
    borderColor: '#4a1a6a', 
    hoverBg: '#3a1a5a', 
    btnBg: '#5a2a7a', 
    btnHoverBg: '#ff00ff',
    name: 'Neon'
  },
  fire: { 
    bgColor: '#1a0a00', 
    navColor: '#2a1a0a', 
    accentColor: '#ff4500', 
    textColor: '#ffe4b5', 
    borderColor: '#4a2a1a', 
    hoverBg: '#3a1a0a', 
    btnBg: '#5a3a2a', 
    btnHoverBg: '#ff4500',
    name: 'Fire'
  },
  ice: { 
    bgColor: '#0a1a2a', 
    navColor: '#1a2a3a', 
    accentColor: '#00bfff', 
    textColor: '#e0f7ff', 
    borderColor: '#2a3a4a', 
    hoverBg: '#1a2a3a', 
    btnBg: '#2a4a5a', 
    btnHoverBg: '#00bfff',
    name: 'Ice'
  },
  retro: { 
    bgColor: '#2b1b17', 
    navColor: '#3d2b27', 
    accentColor: '#ff9966', 
    textColor: '#ffeaa7', 
    borderColor: '#5d4b47', 
    hoverBg: '#4d3b37', 
    btnBg: '#6d5b57', 
    btnHoverBg: '#ff9966',
    name: 'Retro'
  }
};

// Function to determine the current seasonal theme
function getSeasonalTheme() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();
  
  // Halloween: Oct 27-30, 2025
  if (year === 2025 && month === 9 && day >= 27 && day <= 30) {
    console.log('🎃 Halloween season detected!');
    return 'halloween';
  }
  
  // Christmas: Nov 1, 2025 - Dec 31, 2025
  if (year === 2025 && ((month === 10 && day >= 1) || month === 11)) {
    console.log('🎄 Christmas season detected!');
    return 'christmas';
  }
  
  // Original theme: Jan 1, 2026 onwards
  if (year >= 2026) {
    console.log('✨ Default season');
    return 'original';
  }
  
  // Default to original for any other date
  return 'original';
}

// Function to check if we should auto-apply seasonal themes
function shouldAutoApplySeasonalTheme() {
  const autoApply = localStorage.getItem('autoApplySeasonalThemes');
  // Default to true if not set, false if user has disabled it
  return autoApply !== 'false';
}

// Export for use in scripts.js
if (typeof window !== 'undefined') {
  window.seasonalThemes = seasonalThemes;
  window.allThemes = allThemes;
  window.getSeasonalTheme = getSeasonalTheme;
  window.shouldAutoApplySeasonalTheme = shouldAutoApplySeasonalTheme;
}

console.log('✅ Themes.js loaded - All themes available including 🎃 Halloween and 🎄 Christmas');
