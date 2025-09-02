// Mobile Navigation Script
(function() {
  'use strict';
  
  // Elements
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerContent = document.getElementById('drawer-content');
  const desktopRail = document.getElementById('desktop-rail');
  const body = document.body;
  
  // State
  let isDrawerOpen = false;
  let scrollPosition = 0;
  
  // Clone desktop menu content into drawer on load
  function initDrawerContent() {
    if (desktopRail && drawerContent) {
      // Clone the brand and menu sections
      const brandClone = desktopRail.querySelector('.brand')?.cloneNode(true);
      const menuClone = desktopRail.querySelector('.menu')?.cloneNode(true);
      
      // Clear drawer content and add clones
      drawerContent.innerHTML = '';
      if (brandClone) drawerContent.appendChild(brandClone);
      if (menuClone) drawerContent.appendChild(menuClone);
    }
  }
  
  // Open drawer
  function openDrawer() {
    if (isDrawerOpen) return;
    
    // Save scroll position and lock body
    scrollPosition = window.pageYOffset;
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';
    
    // Show drawer and backdrop
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('visible');
    
    // Update ARIA attributes
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    
    isDrawerOpen = true;
    
    // Focus management
    setTimeout(() => {
      drawerClose.focus();
    }, 100);
  }
  
  // Close drawer
  function closeDrawer() {
    if (!isDrawerOpen) return;
    
    // Hide drawer and backdrop
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('visible');
    
    // Restore body scroll
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    window.scrollTo(0, scrollPosition);
    
    // Update ARIA attributes
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    
    isDrawerOpen = false;
    
    // Return focus to hamburger
    hamburgerBtn.focus();
  }
  
  // Toggle drawer
  function toggleDrawer() {
    if (isDrawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }
  
  // Handle escape key
  function handleEscape(e) {
    if (e.key === 'Escape' && isDrawerOpen) {
      closeDrawer();
    }
  }
  
  // Handle focus trap
  function handleFocusTrap(e) {
    if (!isDrawerOpen) return;
    
    const focusableElements = mobileDrawer.querySelectorAll(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
  
  // Initialize
  function init() {
    // Clone content on load
    initDrawerContent();
    
    // Event listeners
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', toggleDrawer);
    }
    
    if (drawerClose) {
      drawerClose.addEventListener('click', closeDrawer);
    }
    
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
    }
    
    // Keyboard events
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleFocusTrap);
    
    // Close drawer on window resize to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && isDrawerOpen) {
          closeDrawer();
        }
      }, 250);
    });
    
    // Handle clicks on drawer links
    if (drawerContent) {
      drawerContent.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          // Close drawer when a link is clicked
          setTimeout(closeDrawer, 100);
        }
      });
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();