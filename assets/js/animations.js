/* ============================================
   Modern Animation System - 2025
   ============================================ */

class AnimationController {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    this.setupScrollReveal();
    this.setupParallax();
    this.setupCounters();
    this.setupProgressBars();
    this.setupHoverEffects();
  }

  // Scroll Reveal Animations
  setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
    this.observers.set('reveal', revealObserver);
  }

  // Parallax Effect
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // Animated Counters
  setupCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
    this.observers.set('counter', counterObserver);
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = parseInt(element.dataset.duration) || 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // Progress Bars
  setupProgressBars() {
    const progressBars = document.querySelectorAll('[data-progress]');
    
    if (progressBars.length === 0) return;

    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.dataset.progress;
          entry.target.style.width = targetWidth + '%';
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
      bar.style.width = '0%';
      bar.style.transition = 'width 1.5s ease-out';
      progressObserver.observe(bar);
    });

    this.observers.set('progress', progressObserver);
  }

  // Hover Card Tilt Effect
  setupHoverEffects() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // Stagger Animation
  staggerAnimation(elements, delay = 100) {
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * delay);
    });
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

/* ============================================
   Custom Cursor Effect
   ============================================ */

class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorDot = null;
    this.isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    
    if (this.isDesktop) {
      this.init();
    }
  }

  init() {
    // Create cursor elements
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid rgba(59, 130, 246, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.15s ease;
      mix-blend-mode: difference;
    `;

    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'custom-cursor-dot';
    this.cursorDot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: rgba(59, 130, 246, 0.8);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transition: transform 0.1s ease;
    `;

    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorDot);

    // Track mouse movement
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      this.cursorDot.style.left = mouseX + 'px';
      this.cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      this.cursor.style.left = cursorX - 20 + 'px';
      this.cursor.style.top = cursorY - 20 + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'scale(1.5)';
        this.cursor.style.borderColor = 'rgba(168, 85, 247, 0.8)';
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'scale(1)';
        this.cursor.style.borderColor = 'rgba(59, 130, 246, 0.5)';
      });
    });
  }

  destroy() {
    if (this.cursor) this.cursor.remove();
    if (this.cursorDot) this.cursorDot.remove();
  }
}

/* ============================================
   Smooth Scroll
   ============================================ */

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

/* ============================================
   Scroll Progress Indicator
   ============================================ */

class ScrollProgress {
  constructor() {
    this.progressBar = null;
    this.init();
  }

  init() {
    // Create progress bar
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'scroll-progress';
    this.progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #a855f7);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    
    document.body.appendChild(this.progressBar);

    // Update on scroll
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      this.progressBar.style.width = scrolled + '%';
    }, { passive: true });
  }

  destroy() {
    if (this.progressBar) this.progressBar.remove();
  }
}

/* ============================================
   Initialize All Systems
   ============================================ */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Animation Controller
  window.animationController = new AnimationController();
  
  // Custom Cursor (desktop only)
  window.customCursor = new CustomCursor();
  
  // Smooth Scroll
  window.smoothScroll = new SmoothScroll();
  
  // Scroll Progress
  window.scrollProgress = new ScrollProgress();
  
  console.log('🎨 Animation systems initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AnimationController,
    CustomCursor,
    SmoothScroll,
    ScrollProgress
  };
}
