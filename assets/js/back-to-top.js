/* ============================================
   Back to Top Button - 2025
   ============================================ */

class BackToTop {
  constructor() {
    this.button = null;
    this.scrollThreshold = 300;
    this.init();
  }

  init() {
    this.createButton();
    this.setupListeners();
    console.log('⬆️ Back to top button initialized');
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.className = 'back-to-top';
    this.button.setAttribute('aria-label', 'Back to top');
    this.button.innerHTML = `
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    `;
    
    document.body.appendChild(this.button);
  }

  setupListeners() {
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > this.scrollThreshold) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    }, { passive: true });

    // Scroll to top on click
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.backToTop = new BackToTop();
});

// Add styles
const style = document.createElement('style');
style.textContent = `
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-xl);
    z-index: var(--z-fixed);
    opacity: 0;
    transform: translateY(20px) scale(0.8);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }
  
  .back-to-top.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: all;
  }
  
  .back-to-top:hover {
    transform: translateY(-4px) scale(1.1);
    box-shadow: var(--shadow-2xl);
  }
  
  .back-to-top:active {
    transform: translateY(-2px) scale(1.05);
  }
  
  @media (max-width: 768px) {
    .back-to-top {
      bottom: 1rem;
      right: 1rem;
      width: 44px;
      height: 44px;
    }
  }
`;
document.head.appendChild(style);
