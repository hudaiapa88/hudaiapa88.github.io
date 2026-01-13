/* ============================================
   Theme System - 2025
   ============================================ */

class ThemeController {
  constructor() {
    this.theme = this.getInitialTheme();
    this.init();
  }

  getInitialTheme() {
    // Check localStorage first
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }

  init() {
    // Set initial theme
    this.setTheme(this.theme, false);
    
    // Setup toggle button
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
    
    console.log('🎨 Theme system initialized:', this.theme);
  }

  toggle() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme, true);
  }

  setTheme(theme, animate = true) {
    this.theme = theme;
    
    // Add transition class if animating
    if (animate) {
      document.documentElement.classList.add('theme-transition');
    }
    
    // Set theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update toggle button icons
    this.updateToggleButton();
    
    // Remove transition class after animation
    if (animate) {
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 300);
    }
  }

  updateToggleButton() {
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');
    
    if (lightIcon && darkIcon) {
      if (this.theme === 'dark') {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      } else {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
      }
    }
  }
}

// Initialize theme controller
document.addEventListener('DOMContentLoaded', () => {
  window.themeController = new ThemeController();
});

// Add CSS transition class
const style = document.createElement('style');
style.textContent = `
  .theme-transition * {
    transition: background-color 0.3s ease, 
                color 0.3s ease, 
                border-color 0.3s ease,
                box-shadow 0.3s ease !important;
  }
`;
document.head.appendChild(style);
