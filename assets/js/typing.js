/* ============================================
   Typing Effect & Additional Features
   ============================================ */

// Typing Effect
class TypingEffect {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.options = {
      typeSpeed: options.typeSpeed || 100,
      deleteSpeed: options.deleteSpeed || 50,
      pauseDelay: options.pauseDelay || 2000,
      loop: options.loop !== false,
      ...options
    };
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  init() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    const displayText = currentText.substring(0, this.charIndex);
    this.element.innerHTML = `<span class="gradient-text" style="font-weight: 700;">${displayText}</span><span class="typing-cursor">|</span>`;

    let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = this.options.pauseDelay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Contact Form Handler
class ContactForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual endpoint)
      await this.sendEmail(data);
      
      // Success feedback
      this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      this.form.reset();
    } catch (error) {
      // Error feedback
      this.showNotification('Failed to send message. Please try again or email me directly.', 'error');
    } finally {
      // Restore button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  async sendEmail(data) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Form data:', data);
        resolve();
      }, 1500);
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
      color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

// Navbar Scroll Handler
class NavbarScroll {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.links = document.querySelectorAll('.navbar-link');
    if (this.navbar) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    this.setupActiveLink();
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.classList.add('navbar-scrolled');
    } else {
      this.navbar.classList.remove('navbar-scrolled');
    }
  }

  setupActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          this.links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { passive: true });
  }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  // Typing Effect
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const texts = [
      'Software Developer',
      'Backend Engineer',
      'Full-Stack Developer',
      'Mobile Developer',
      'Problem Solver'
    ];
    new TypingEffect(typingElement, texts);
  }

  // Contact Form
  new ContactForm('contactForm');

  // Navbar Scroll
  new NavbarScroll();

  // Update current year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  console.log('✨ Typing and UI features initialized');
});

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .typing-cursor {
    animation: blink 1s infinite;
    margin-left: 2px;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(style);
