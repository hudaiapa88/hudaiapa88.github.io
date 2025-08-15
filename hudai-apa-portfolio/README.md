# Hudai Apa Portfolio

This repository contains the portfolio website for Hudai Apa, a software developer specializing in backend technologies, particularly Java and Spring Boot. The site showcases professional experience, projects, and skills.

## Project Structure

The project is organized as follows:

```
hudai-apa-portfolio
├── index.html               # Main entry point of the portfolio website
├── en                       # English version of the portfolio
│   └── index.html           # English content and components
├── tr                       # Turkish version of the portfolio
│   └── index.html           # Turkish content and components
├── components               # Reusable components for the website
│   ├── header.html          # Header section with navigation links
│   ├── footer.html          # Footer section with copyright information
│   └── sections             # Different sections of the portfolio
│       ├── about.html       # About section detailing professional summary
│       ├── experience.html   # Experience section outlining work history
│       ├── projects.html    # Projects section showcasing selected projects
│       └── skills.html      # Skills section listing technical proficiencies
├── assets                   # Assets including CSS and JavaScript files
│   ├── css                  # Stylesheets for the website
│   │   ├── base.css         # Base styles for typography and layout
│   │   ├── light.css        # Styles for light theme
│   │   ├── dark.css         # Styles for dark theme
│   │   └── animations.css    # CSS animations for visual effects
│   └── js                   # JavaScript files for interactivity
│       ├── main.js          # Main JavaScript logic
│       ├── theme-toggle.js   # Logic for toggling themes
│       └── i18n.js          # Internationalization handling
├── data                     # Content data in JSON format
│   ├── content.en.json      # English content for the portfolio
│   └── content.tr.json      # Turkish content for the portfolio
├── .nojekyll                # Prevents GitHub Pages from processing with Jekyll
├── README.md                # Documentation for the project
└── .github                  # GitHub workflows for deployment
    └── workflows
        └── pages.yml        # GitHub Actions workflow for GitHub Pages
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/hudaiapa88/hudai-apa-portfolio.git
   ```

2. Navigate to the project directory:
   ```
   cd hudai-apa-portfolio
   ```

3. Open `index.html` in your web browser to view the portfolio.

## Usage

- The portfolio is available in both English and Turkish. You can switch between languages using the navigation links.
- The site features a dark and light theme, which can be toggled using the theme switcher.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.