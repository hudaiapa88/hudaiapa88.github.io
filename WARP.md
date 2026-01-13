# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a static portfolio website for Hüdai APA, a software developer. The site is built as a multilingual (Turkish/English) single-page application hosted on GitHub Pages.

**Tech Stack:**
- HTML5 with Tailwind CSS (CDN-based)
- Vanilla JavaScript for interactivity and internationalization
- Static site deployment via GitHub Pages
- No build tools or frameworks - direct browser execution

## Architecture

### Internationalization System
The site implements a custom i18n system built around `js/i18n.js`:

- **Translation Management**: All translations stored in-memory within the `I18n` class
- **Language Switching**: Supports Turkish (`tr`) and English (`en`) via URL params (`?lang=en`) or localStorage
- **Dynamic Content Updates**: Uses `data-i18n` attributes on HTML elements for translation keys
- **Meta Tag Localization**: Automatically updates page title, description, and Open Graph tags

### File Structure Pattern
```
├── index.html                    # Main Turkish homepage  
├── en/                          # English versions
│   ├── index.html
│   ├── cv.html
│   └── cv-*.html               # City-specific CVs
├── tr/                         # Turkish versions  
│   ├── index.html
│   ├── cv.html
│   └── cv-*.html
├── js/
│   └── i18n.js                 # Internationalization system
├── assets/
│   ├── js/main.js              # Theme toggle, scroll animations, counter animations
│   └── css/                    # Stylesheet files (though Tailwind CDN is primary)
├── data/
│   ├── content.en.json         # English content (appears unused - i18n.js has translations)
│   └── content.tr.json         # Turkish content (appears unused)
└── components/                 # Reusable HTML components (currently minimal)
```

### Key Architectural Patterns

1. **Multilingual Static Site**: Content duplication pattern with separate directories for each language
2. **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with animations and theme switching
3. **Client-Side Routing**: Hash-based navigation with smooth scrolling between sections
4. **Intersection Observer Pattern**: Used for scroll animations and navigation highlighting

## Common Development Tasks

### Local Development
```bash
# Serve locally (any static server)
python -m http.server 8000
# or
npx serve .
# or  
php -S localhost:8000
```

### Testing Changes
```bash
# Open in browser
start http://localhost:8000
# Test language switching
start http://localhost:8000/?lang=en
start http://localhost:8000/?lang=tr
```

### Content Updates

**To add new translations:**
1. Edit the translations object in `js/i18n.js`
2. Add corresponding `data-i18n` attributes to HTML elements
3. Test both language versions

**To add new sections:**
1. Add HTML content with `data-i18n` attributes
2. Update navigation links in both language versions
3. Add corresponding translations to `js/i18n.js`
4. Ensure scroll spy and animations work with new sections

### Styling
The site uses Tailwind CSS via CDN with custom configuration:
- Custom color palette (`brand`, `accent` colors)
- Dark mode support via `class` strategy
- Custom animations for floating elements and gradients

### Deployment
GitHub Pages deployment is automated via `.github/workflows/pages.yml` on pushes to `main` branch. However, the workflow appears misconfigured (references npm commands that don't exist).

**Manual deployment:**
Changes pushed to `main` branch are automatically deployed to `https://username.github.io/` via GitHub Pages.

## File Dependencies

### Critical Files
- `index.html` - Main entry point, contains all page content
- `js/i18n.js` - Internationalization system (NEVER modify without testing both languages)  
- `assets/js/main.js` - Core JavaScript functionality

### Language-Specific Files  
- `en/` directory - English versions (should mirror `tr/` structure)
- `tr/` directory - Turkish versions

### Asset Files
- `assets/FOTO.jpg` - Profile photo
- `assets/favicon.svg` - Site icon
- `assets/og-image.svg` - Social media preview image

## Development Guidelines

### When Adding New Features
1. Consider internationalization from the start - add translation keys
2. Ensure dark mode compatibility
3. Test responsive design on mobile devices
4. Verify scroll animations don't interfere with new content
5. Update both language versions simultaneously

### When Modifying i18n.js
1. Always test both Turkish and English versions
2. Verify meta tags update correctly  
3. Check that language switching preserves scroll position
4. Ensure localStorage persistence works

### When Updating Content
1. Use `data-i18n` attributes for any translatable text
2. Maintain consistent translation key naming convention
3. Update Open Graph and meta descriptions when changing core content
4. Verify CV links point to correct language versions

### CSS/Styling Notes
- Site uses Tailwind's `dark:` prefixes extensively
- Custom gradients and animations defined in `<style>` blocks
- Responsive breakpoints: `sm:`, `md:`, `lg:` classes throughout
- Glass morphism effects via `backdrop-filter` CSS

## Troubleshooting

### Language Switching Not Working
- Check browser console for JavaScript errors
- Verify translation keys exist in `js/i18n.js`
- Ensure `data-i18n` attributes match translation keys exactly

### Animations Not Triggering  
- Check that elements have proper classes (`section-animate`, `card-hover`)
- Verify Intersection Observer setup in `assets/js/main.js`
- Ensure elements are visible in viewport when expected to animate

### Dark Mode Issues
- Verify Tailwind `dark:` classes are used correctly
- Check theme persistence in localStorage
- Ensure custom CSS respects dark mode color scheme