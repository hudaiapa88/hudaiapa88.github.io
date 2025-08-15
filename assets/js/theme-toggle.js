// This file contains the logic for toggling between light and dark themes.

const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.body.classList.add(currentTheme);

themeToggleButton.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    document.body.classList.toggle('light', newTheme === 'light');
    document.body.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
});