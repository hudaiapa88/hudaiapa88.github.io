// Main JavaScript logic for the portfolio website

// Function to initialize the portfolio
function initPortfolio() {
    // Load the appropriate content based on the selected language
    loadContent();

    // Set up event listeners for theme toggle
    setupThemeToggle();
}

// Function to load content based on the selected language
function loadContent() {
    // Logic to fetch and display content from JSON files
    // This will be implemented in i18n.js
}

// Function to set up theme toggle functionality
function setupThemeToggle() {
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        // Save the current theme preference in local storage
        saveThemePreference();
    });
}

// Function to save the theme preference in local storage
function saveThemePreference() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}

// Function to load the saved theme preference on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme + '-theme');
    } else {
        // Default to light theme
        document.body.classList.add('light-theme');
    }
}

// Initialize the portfolio when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    initPortfolio();
});