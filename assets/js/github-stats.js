/* ============================================
   GitHub Stats Integration - 2025
   ============================================ */

class GitHubStats {
  constructor(username = 'hudaiapa88') {
    this.username = username;
    this.apiBase = 'https://api.github.com';
    this.stats = null;
    this.init();
  }

  async init() {
    await this.fetchStats();
    this.renderStats();
    console.log('📊 GitHub stats loaded');
  }

  async fetchStats() {
    try {
      const [userData, reposData] = await Promise.all([
        fetch(`${this.apiBase}/users/${this.username}`).then(r => r.json()),
        fetch(`${this.apiBase}/users/${this.username}/repos?per_page=100`).then(r => r.json())
      ]);

      // Calculate total stars
      const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      
      // Get most used languages
      const languages = {};
      reposData.forEach(repo => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      const topLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);

      this.stats = {
        followers: userData.followers,
        publicRepos: userData.public_repos,
        totalStars,
        topLanguages,
        profileUrl: userData.html_url,
        avatarUrl: userData.avatar_url
      };
    } catch (error) {
      console.error('Failed to fetch GitHub stats:', error);
      this.stats = {
        followers: '50+',
        publicRepos: '20+',
        totalStars: '100+',
        topLanguages: ['Java', 'JavaScript', 'Dart'],
        profileUrl: `https://github.com/${this.username}`
      };
    }
  }

  renderStats() {
    const container = document.getElementById('githubStats');
    if (!container || !this.stats) return;

    container.innerHTML = `
      <div class="github-stats-grid">
        <div class="stat-card reveal reveal-scale stagger-1">
          <div class="stat-icon">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.85 3.14 8.96 7.5 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.06-3.05.66-3.7-1.3-3.7-1.3-.5-1.26-1.22-1.6-1.22-1.6-.99-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.48-2.43-.28-4.99-1.22-4.99-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.42.11-2.96 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 2.75-.37c.93 0 1.87.13 2.75.37 2.1-1.43 3.02-1.13 3.02-1.13.6 1.54.22 2.68.11 2.96.7.77 1.13 1.75 1.13 2.95 0 4.23-2.57 5.16-5.01 5.44.39.34.73 1.01.73 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.5 10.5 0 0 0 23 11.5C23 5.24 18.27.5 12 .5z"/>
            </svg>
          </div>
          <div class="stat-value" data-count="${this.stats.publicRepos}">${this.stats.publicRepos}</div>
          <div class="stat-label">Public Repos</div>
        </div>

        <div class="stat-card reveal reveal-scale stagger-2">
          <div class="stat-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div class="stat-value" data-count="${this.stats.followers}">${this.stats.followers}</div>
          <div class="stat-label">Followers</div>
        </div>

        <div class="stat-card reveal reveal-scale stagger-3">
          <div class="stat-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </div>
          <div class="stat-value" data-count="${this.stats.totalStars}">${this.stats.totalStars}</div>
          <div class="stat-label">Total Stars</div>
        </div>
      </div>

      <div class="github-languages">
        <h4 style="margin-bottom: var(--space-md); font-weight: var(--font-weight-semibold);">Most Used Languages</h4>
        <div class="flex gap-sm" style="flex-wrap: wrap;">
          ${this.stats.topLanguages.map(lang => `
            <span class="badge badge-primary">${lang}</span>
          `).join('')}
        </div>
      </div>

      <a href="${this.stats.profileUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="margin-top: var(--space-lg);">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.85 3.14 8.96 7.5 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.06-3.05.66-3.7-1.3-3.7-1.3-.5-1.26-1.22-1.6-1.22-1.6-.99-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.48-2.43-.28-4.99-1.22-4.99-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.42.11-2.96 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 2.75-.37c.93 0 1.87.13 2.75.37 2.1-1.43 3.02-1.13 3.02-1.13.6 1.54.22 2.68.11 2.96.7.77 1.13 1.75 1.13 2.95 0 4.23-2.57 5.16-5.01 5.44.39.34.73 1.01.73 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.5 10.5 0 0 0 23 11.5C23 5.24 18.27.5 12 .5z"/>
        </svg>
        View GitHub Profile
      </a>
    `;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('githubStats')) {
    window.githubStats = new GitHubStats();
  }
});

// Add styles
const style = document.createElement('style');
style.textContent = `
  .github-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-lg);
    margin-bottom: var(--space-xl);
  }
  
  .stat-card {
    text-align: center;
    padding: var(--space-xl);
    background: var(--color-bg-elevated);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border-primary);
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto var(--space-md);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-primary);
    color: white;
    border-radius: var(--radius-lg);
  }
  
  .stat-value {
    font-size: var(--text-3xl);
    font-weight: var(--font-weight-bold);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--space-xs);
  }
  
  .stat-label {
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
  }
  
  .github-languages {
    padding: var(--space-xl);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-xl);
    margin-bottom: var(--space-lg);
  }
`;
document.head.appendChild(style);
