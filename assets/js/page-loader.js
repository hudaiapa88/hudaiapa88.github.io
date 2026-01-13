/* ============================================
   Page Loader - Loading States Manager
   ============================================ */

class PageLoader {
  constructor() {
    this.loader = null;
    this.init();
  }

  init() {
    // Create page loader element
    this.createLoader();
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
      this.hideLoader();
    });

    // Fallback: hide loader after 3 seconds max
    setTimeout(() => {
      this.hideLoader();
    }, 3000);
  }

  createLoader() {
    this.loader = document.createElement('div');
    this.loader.className = 'page-loader';
    this.loader.innerHTML = `
      <div class="loader-content">
        <div class="spinner"></div>
        <div class="loader-text" data-i18n="loading">Loading...</div>
      </div>
    `;
    document.body.prepend(this.loader);
  }

  hideLoader() {
    if (this.loader && !this.loader.classList.contains('hidden')) {
      this.loader.classList.add('hidden');
      
      // Remove from DOM after animation
      setTimeout(() => {
        this.loader?.remove();
      }, 500);
    }
  }

  showLoader() {
    if (this.loader) {
      this.loader.classList.remove('hidden');
    }
  }
}

/* ============================================
   Skeleton Loaders Manager
   ============================================ */

class SkeletonLoader {
  static createProjectSkeleton() {
    return `
      <div class="glass-card skeleton-project">
        <div class="skeleton skeleton-project-image"></div>
        <div class="skeleton skeleton-text title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
        <div class="skeleton-project-tags">
          <div class="skeleton skeleton-badge"></div>
          <div class="skeleton skeleton-badge"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
      </div>
    `;
  }

  static createExperienceSkeleton() {
    return `
      <div class="skeleton-timeline-item">
        <div class="skeleton skeleton-timeline-dot"></div>
        <div class="skeleton-timeline-content">
          <div class="skeleton skeleton-text title"></div>
          <div class="skeleton skeleton-text subtitle"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text short"></div>
        </div>
      </div>
    `;
  }

  static createSkillSkeleton() {
    return `
      <div class="skeleton-skill">
        <div class="skeleton skeleton-skill-name"></div>
        <div class="skeleton skeleton-skill-bar"></div>
      </div>
    `;
  }

  static createBlogPostSkeleton() {
    return `
      <div class="glass-card skeleton-blog-post">
        <div class="skeleton skeleton-blog-thumbnail"></div>
        <div class="skeleton skeleton-text title"></div>
        <div class="skeleton-blog-meta">
          <div class="skeleton skeleton-badge"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;
  }

  static createGitHubStatsSkeleton() {
    return `
      <div class="skeleton-stats-grid">
        <div class="skeleton skeleton-stat-card"></div>
        <div class="skeleton skeleton-stat-card"></div>
        <div class="skeleton skeleton-stat-card"></div>
        <div class="skeleton skeleton-stat-card"></div>
      </div>
    `;
  }

  static showSkeleton(container, type, count = 3) {
    if (!container) return;

    let skeletonHTML = '';
    for (let i = 0; i < count; i++) {
      switch (type) {
        case 'project':
          skeletonHTML += this.createProjectSkeleton();
          break;
        case 'experience':
          skeletonHTML += this.createExperienceSkeleton();
          break;
        case 'skill':
          skeletonHTML += this.createSkillSkeleton();
          break;
        case 'blog':
          skeletonHTML += this.createBlogPostSkeleton();
          break;
        case 'github-stats':
          skeletonHTML = this.createGitHubStatsSkeleton();
          break;
        default:
          skeletonHTML += `<div class="skeleton skeleton-card"></div>`;
      }
    }

    container.innerHTML = skeletonHTML;
    container.classList.add('loading-container');
  }

  static hideSkeleton(container) {
    if (!container) return;
    
    container.classList.add('fade-out');
    setTimeout(() => {
      container.classList.remove('loading-container', 'fade-out');
    }, 300);
  }

  static showError(container, message = 'Failed to load content') {
    if (!container) return;

    container.innerHTML = `
      <div class="loading-error">
        <div class="loading-error-icon">⚠️</div>
        <div class="loading-error-message">${message}</div>
        <button class="retry-button" onclick="location.reload()">
          <span data-i18n="retry">Retry</span>
        </button>
      </div>
    `;
  }
}

/* ============================================
   Lazy Image Loading
   ============================================ */

class LazyImageLoader {
  constructor() {
    this.images = [];
    this.observer = null;
    this.init();
  }

  init() {
    // Find all images with lazy-image class
    this.images = document.querySelectorAll('img.lazy-image');
    
    // Use Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );

      this.images.forEach((img) => {
        this.observer.observe(img);
      });
    } else {
      // Fallback: load all images immediately
      this.loadAllImages();
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    // Create a new image to preload
    const tempImg = new Image();
    
    tempImg.onload = () => {
      img.src = src;
      img.classList.add('loaded');
    };

    tempImg.onerror = () => {
      img.alt = 'Failed to load image';
      img.classList.add('loaded');
    };

    tempImg.src = src;
  }

  loadAllImages() {
    this.images.forEach((img) => {
      this.loadImage(img);
    });
  }
}

/* ============================================
   Initialize on DOM Ready
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize page loader
  new PageLoader();

  // Initialize lazy image loading
  new LazyImageLoader();

  // Add content-loaded class to sections as they become visible
  const contentSections = document.querySelectorAll('section');
  
  if ('IntersectionObserver' in window) {
    const contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('content-loaded');
            contentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    contentSections.forEach((section) => {
      contentObserver.observe(section);
    });
  } else {
    // Fallback: add class immediately
    contentSections.forEach((section) => {
      section.classList.add('content-loaded');
    });
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PageLoader, SkeletonLoader, LazyImageLoader };
}
