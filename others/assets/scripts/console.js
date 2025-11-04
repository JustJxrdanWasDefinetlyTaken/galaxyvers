// GalaxyVerse Console System
// Path: others/assets/scripts/console.js

const GVerseConsole = {
  isOpen: false,
  logs: [],
  currentFilter: 'all',
  commandHistory: [],
  historyIndex: -1,

  init() {
    // Create console HTML structure
    this.createConsoleHTML();
    
    this.container = document.getElementById('gverse-console');
    this.output = document.getElementById('console-output');
    this.input = document.getElementById('console-input');

    // Intercept console methods
    this.interceptConsole();

    // Setup keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl + Shift + K to toggle
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        this.toggle();
      }
    });

    // Setup input handlers
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.executeCommand(this.input.value);
        this.input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateHistory(-1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateHistory(1);
      }
    });

    // Setup tab filters
    document.querySelectorAll('.console-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.console-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentFilter = tab.dataset.tab;
        this.render();
      });
    });

    // Add welcome message
    this.addLog('🌌 GalaxyVerse Console initialized. Type JavaScript code to execute.', 'info');
    this.addLog('Press Ctrl+Shift+K to toggle console', 'info');
  },

  createConsoleHTML() {
    const consoleHTML = `
      <div id="gverse-console">
        <div class="console-header">
          <div class="console-title">
            <span>🌌</span>
            <span>GalaxyVerse Console</span>
          </div>
          <div class="console-controls">
            <button class="console-btn" onclick="GVerseConsole.clear()">Clear</button>
            <button class="console-btn" onclick="GVerseConsole.export()">Export</button>
            <button class="console-close" onclick="GVerseConsole.close()">×</button>
          </div>
        </div>

        <div class="console-tabs">
          <button class="console-tab active" data-tab="all">All</button>
          <button class="console-tab" data-tab="log">Logs</button>
          <button class="console-tab" data-tab="warn">Warnings</button>
          <button class="console-tab" data-tab="error">Errors</button>
        </div>

        <div class="console-output" id="console-output"></div>

        <div class="console-input-container">
          <span class="console-prompt">&gt;</span>
          <input type="text" class="console-input" id="console-input" placeholder="Type JavaScript code here..." />
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', consoleHTML);
  },

  interceptConsole() {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    console.log = (...args) => {
      originalLog.apply(console, args);
      this.addLog(args.map(arg => this.formatArg(arg)).join(' '), 'log');
    };

    console.warn = (...args) => {
      originalWarn.apply(console, args);
      this.addLog(args.map(arg => this.formatArg(arg)).join(' '), 'warn');
    };

    console.error = (...args) => {
      originalError.apply(console, args);
      this.addLog(args.map(arg => this.formatArg(arg)).join(' '), 'error');
    };

    console.info = (...args) => {
      originalInfo.apply(console, args);
      this.addLog(args.map(arg => this.formatArg(arg)).join(' '), 'info');
    };

    // Capture window errors
    window.addEventListener('error', (e) => {
      this.addLog(`${e.message} at ${e.filename}:${e.lineno}:${e.colno}`, 'error');
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      this.addLog(`Unhandled Promise Rejection: ${e.reason}`, 'error');
    });
  },

  formatArg(arg) {
    if (typeof arg === 'object' && arg !== null) {
      try {
        return JSON.stringify(arg, null, 2);
      } catch (e) {
        return String(arg);
      }
    }
    return String(arg);
  },

  addLog(message, type = 'log') {
    const timestamp = new Date().toLocaleTimeString();
    const log = { message, type, timestamp };
    this.logs.push(log);

    // Limit to 1000 logs
    if (this.logs.length > 1000) {
      this.logs.shift();
    }

    if (this.isOpen) {
      this.render();
    }
  },

  render() {
    const filtered = this.currentFilter === 'all' 
      ? this.logs 
      : this.logs.filter(log => log.type === this.currentFilter);

    this.output.innerHTML = filtered.map(log => {
      const typeLabel = log.type.toUpperCase();
      return `
        <div class="console-log ${log.type}">
          <span class="log-timestamp">${log.timestamp}</span>
          <span class="log-type">[${typeLabel}]</span>
          <span>${this.escapeHtml(log.message)}</span>
        </div>
      `;
    }).join('');

    // Auto-scroll to bottom
    this.output.scrollTop = this.output.scrollHeight;
  },

  executeCommand(code) {
    if (!code.trim()) return;

    this.commandHistory.push(code);
    this.historyIndex = this.commandHistory.length;

    this.addLog(`> ${code}`, 'debug');

    try {
      const result = eval(code);
      if (result !== undefined) {
        this.addLog(`← ${this.formatArg(result)}`, 'log');
      }
    } catch (error) {
      this.addLog(`Error: ${error.message}`, 'error');
    }
  },

  navigateHistory(direction) {
    this.historyIndex += direction;
    if (this.historyIndex < 0) this.historyIndex = 0;
    if (this.historyIndex > this.commandHistory.length) {
      this.historyIndex = this.commandHistory.length;
    }

    if (this.historyIndex < this.commandHistory.length) {
      this.input.value = this.commandHistory[this.historyIndex];
    } else {
      this.input.value = '';
    }
  },

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  open() {
    this.isOpen = true;
    this.container.classList.add('open');
    this.render();
    this.input.focus();
  },

  close() {
    this.isOpen = false;
    this.container.classList.remove('open');
  },

  clear() {
    this.logs = [];
    this.render();
    this.addLog('Console cleared', 'info');
  },

  export() {
    const text = this.logs.map(log => 
      `[${log.timestamp}] [${log.type.toUpperCase()}] ${log.message}`
    ).join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `galaxyverse-console-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    this.addLog('Console logs exported', 'info');
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Initialize console when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => GVerseConsole.init());
} else {
  GVerseConsole.init();
}

// Make it globally accessible
window.GVerseConsole = GVerseConsole;
