const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    if (isDark) {
        themeStyle.href = 'css/dark-styles.css';
        themeToggle.src = 'assets/light-mode.svg';
    } else {
        themeStyle.href = 'css/light-styles.css';
        themeToggle.src = 'assets/dark-mode.svg';
    }
}

// Switch theme based on system preference
setTheme(userPrefersDark.matches);
userPrefersDark.addEventListener('change', (e) => setTheme(e.matches));

// Toggle theme manually
themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = themeStyle.href.includes('dark-styles.css');
    setTheme(!isCurrentlyDark);
});

// Menu toggle
const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');

menuButton.addEventListener('click', () => {
    sideMenu.classList.toggle('visible');
    const isVisible = sideMenu.classList.contains('visible');
    menuButton.querySelector('img').src = isVisible ? 'assets/open-menu.svg' : 'assets/closed-menu.svg';
    document.body.classList.toggle('no-scroll'); // Optional: Prevent background scrolling
});

// Contact form modal
const contactFormModal = document.getElementById('contact-form-modal');
const openContactButtons = [document.getElementById('open-contact-form'), document.getElementById('footer-contact-link')];
const closeButton = document.querySelector('.close-button');

openContactButtons.forEach(button => {
    button.addEventListener('click', () => {
        contactFormModal.classList.remove('hidden');
    });
});

closeButton.addEventListener('click', () => {
    contactFormModal.classList.add('hidden');
});
