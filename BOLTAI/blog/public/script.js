const modeSwitcher = document.querySelector('.mode-switcher');
        const body = document.body;
        const navbar = document.querySelector('.navbar');

        modeSwitcher.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            navbar.classList.toggle('dark-mode');
            modeSwitcher.textContent = body.classList.contains('dark-mode') ? '🌙' : '☀️';
        });

// app.use(express.static('public'));