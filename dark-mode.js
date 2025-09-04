document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', null);
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});