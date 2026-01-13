/* ============================================
   Mobile Menu Handler - 2025
   ============================================ */

class MobileMenu {
  constructor() {
    this.menuToggle = document.getElementById('mobileMenuToggle');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = document.querySelectorAll('.navbar-link');
    this.isOpen = false;
    
    if (this.menuToggle && this.navMenu) {
      this.init();
    }
  }

  init() {
    // Toggle menu on button click
    this.menuToggle.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking a link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.isOpen) {
          this.closeMenu();
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && 
          !this.navMenu.contains(e.target) && 
          !this.menuToggle.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });
    
    console.log('📱 Mobile menu initialized');
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.navMenu.classList.add('mobile-menu-open');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent scroll
    
    // Change icon to X
    this.menuToggle.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    `;
  }

  closeMenu() {
    this.isOpen = false;
    this.navMenu.classList.remove('mobile-menu-open');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // Change icon back to hamburger
    this.menuToggle.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    `;
  }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', () => {
  window.mobileMenu = new MobileMenu();
});

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .navbar-menu {
      position: fixed;
      top: var(--header-height);
      left: 0;
      right: 0;
      background: var(--glass-bg);
      backdrop-filter: blur(var(--blur-lg));
      -webkit-backdrop-filter: blur(var(--blur-lg));
      border-bottom: 1px solid var(--glass-border);
      padding: var(--space-xl) var(--space-lg);
      display: flex !important;
      flex-direction: column;
      gap: var(--space-md);
      transform: translateY(-100%);
      opacity: 0;
      transition: transform 0.3s ease-out, opacity 0.3s ease-out;
      pointer-events: none;
      box-shadow: var(--shadow-xl);
      max-height: calc(100vh - var(--header-height));
      overflow-y: auto;
    }
    
    .navbar-menu.mobile-menu-open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    
    .navbar-link {
      padding: var(--space-md);
      border-radius: var(--radius-md);
      text-align: center;
      font-size: var(--text-lg);
      transition: background-color 0.2s ease;
    }
    
    .navbar-link:hover,
    .navbar-link.active {
      background: var(--color-bg-tertiary);
    }
    
    .navbar-link.active::after {
      display: none;
    }
  }
`;
document.head.appendChild(style);
