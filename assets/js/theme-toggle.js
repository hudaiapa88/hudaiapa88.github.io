// Robust theme toggle: works even if header isn't loaded yet
(function(){
    function applyTheme(theme){
        document.body.classList.toggle('light', theme === 'light');
        document.body.classList.toggle('dark', theme === 'dark');
        // Optional: if separate CSS files are used with ids
        var darkLink = document.getElementById('dark-theme');
        var lightLink = document.getElementById('light-theme');
        if (darkLink && lightLink){
            darkLink.disabled = (theme !== 'dark');
            lightLink.disabled = (theme !== 'light');
        }
    }

    window.loadSavedTheme = function(){
        var saved = localStorage.getItem('theme') || 'light';
        applyTheme(saved);
    }

    function setup(){
        var btn = document.getElementById('theme-toggle');
        if (btn){
            btn.addEventListener('click', function(){
                var now = document.body.classList.contains('dark') ? 'light' : 'dark';
                localStorage.setItem('theme', now);
                applyTheme(now);
            });
        } else {
            // Try again after components load
            setTimeout(setup, 300);
        }
    }

    document.addEventListener('DOMContentLoaded', function(){
        window.loadSavedTheme();
        setup();
    });
})();