// ===== SIDEBAR NAVIGATION SYSTEM =====
(function() {
  console.log('📋 Initializing Sidebar Navigation...');

  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarTrigger = document.getElementById('sidebar-trigger');
    
    if (!sidebar || !sidebarTrigger) {
      console.error('❌ Sidebar elements not found');
      return;
    }

    let isOpen = false;
    let hoverTimeout = null;
    let leaveTimeout = null;

    // Show sidebar on trigger hover
    sidebarTrigger.addEventListener('mouseenter', () => {
      clearTimeout(leaveTimeout);
      hoverTimeout = setTimeout(() => {
        sidebar.classList.add('open');
        isOpen = true;
      }, 200);
    });

    // Keep sidebar open when hovering over it
    sidebar.addEventListener('mouseenter', () => {
      clearTimeout(leaveTimeout);
      sidebar.classList.add('open');
      isOpen = true;
    });

    // Hide sidebar when mouse leaves
    sidebar.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      leaveTimeout = setTimeout(() => {
        sidebar.classList.remove('open');
        isOpen = false;
      }, 300);
    });

    sidebarTrigger.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      leaveTimeout = setTimeout(() => {
        if (!isOpen) {
          sidebar.classList.remove('open');
        }
      }, 300);
    });

    // Click to toggle (for mobile/touch devices)
    sidebarTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      isOpen = sidebar.classList.contains('open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (isOpen && !sidebar.contains(e.target) && !sidebarTrigger.contains(e.target)) {
        sidebar.classList.remove('open');
        isOpen = false;
      }
    });

    // Handle navigation link clicks
    const navLinks = sidebar.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        // On mobile, close sidebar after navigation
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            sidebar.classList.remove('open');
            isOpen = false;
          }, 300);
        }
      });
    });

    // Keyboard access
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        sidebar.classList.remove('open');
        isOpen = false;
      }
    });

    console.log('✅ Sidebar initialized successfully');
  }

  // Initialize dom
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
