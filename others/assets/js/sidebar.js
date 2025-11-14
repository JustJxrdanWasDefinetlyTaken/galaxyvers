// Sidebar Navigation Handler
(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    initSidebarNavigation();
  });

  function initSidebarNavigation() {
    // Get all sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Content sections mapping
    const contentMap = {
      'home': 'content-home',
      'games': 'content-gms',
      'apps': 'content-aps',
      'search': 'content-gms', // Uses same as games for now
      'websites': 'content-websites',
      'settings': 'content-settings'
    };

    // Add click event to each sidebar link
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the page identifier
        const page = this.getAttribute('data-page');
        
        // Remove active class from all links
        sidebarLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Hide all content sections
        hideAllContent();
        
        // Show the selected content
        const contentId = contentMap[page];
        if (contentId) {
          const contentElement = document.getElementById(contentId);
          if (contentElement) {
            contentElement.style.display = 'block';
          }
        }

        // Store active page in sessionStorage
        try {
          sessionStorage.setItem('activePage', page);
        } catch (e) {
          console.warn('sessionStorage not available:', e);
        }
      });
    });

    // Restore active page on load
    restoreActivePage();
  }

  function hideAllContent() {
    const contentSections = document.querySelectorAll('.content');
    contentSections.forEach(section => {
      section.style.display = 'none';
    });
  }

  function restoreActivePage() {
    try {
      const activePage = sessionStorage.getItem('activePage');
      if (activePage) {
        const activeLink = document.querySelector(`.sidebar-link[data-page="${activePage}"]`);
        if (activeLink) {
          activeLink.click();
        }
      }
    } catch (e) {
      console.warn('Could not restore active page:', e);
    }
  }

  // Handle back buttons
  const backButtons = [
    { id: 'backToHomeApps', target: 'home' },
    { id: 'backToHomeWebsites', target: 'home' },
    { id: 'backToHomeGame', target: 'home' }
  ];

  backButtons.forEach(btn => {
    const button = document.getElementById(btn.id);
    if (button) {
      button.addEventListener('click', function() {
        const homeLink = document.querySelector('.sidebar-link[data-page="home"]');
        if (homeLink) {
          homeLink.click();
        }
      });
    }
  });

  // Modal handlers
  const creditsBtn = document.getElementById('creditsBtn');
  const updateLogBtn = document.getElementById('updateLogBtn');
  const creditsModal = document.getElementById('creditsModal');
  const updateLogModal = document.getElementById('updateLogModal');

  if (creditsBtn && creditsModal) {
    creditsBtn.addEventListener('click', function() {
      creditsModal.style.display = 'block';
    });
  }

  if (updateLogBtn && updateLogModal) {
    updateLogBtn.addEventListener('click', function() {
      updateLogModal.style.display = 'block';
    });
  }

  // Close modal functionality
  const closeButtons = document.querySelectorAll('.info-close');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('info-modal')) {
      e.target.style.display = 'none';
    }
  });

  // Keyboard navigation (optional enhancement)
  document.addEventListener('keydown', function(e) {
    // Press 'H' for home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
      const activeElement = document.activeElement;
      if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
        const homeLink = document.querySelector('.sidebar-link[data-page="home"]');
        if (homeLink) homeLink.click();
      }
    }
    // Press 'G' for games
    if (e.key === 'g' && !e.ctrlKey && !e.metaKey) {
      const activeElement = document.activeElement;
      if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
        const gamesLink = document.querySelector('.sidebar-link[data-page="games"]');
        if (gamesLink) gamesLink.click();
      }
    }
  });

  // Add hover effect enhancement
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Smooth scroll to top when switching pages
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Add to each link click
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', scrollToTop);
  });

})();
