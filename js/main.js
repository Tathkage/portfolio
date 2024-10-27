const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set the theme
function setTheme(isDark, savePreference = false) {
    if (isDark) {
        themeStyle.href = 'css/dark-styles.css';
        themeToggle.src = 'assets/light-mode.svg';
        themeToggle.alt = 'Switch to Light Mode';
    } else {
        themeStyle.href = 'css/light-styles.css';
        themeToggle.src = 'assets/dark-mode.svg';
        themeToggle.alt = 'Switch to Dark Mode';
    }

    // Save the user's preference if required
    if (savePreference) {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
}

// Function to initialize the theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // If a user preference is saved, use it
        setTheme(savedTheme === 'dark');
    } else {
        // Otherwise, use the system preference
        setTheme(userPrefersDark.matches);
    }
}

// Initialize the theme when the script loads
initializeTheme();

// Listen for changes in system preference only if no user preference is set
if (!localStorage.getItem('theme')) {
    userPrefersDark.addEventListener('change', (e) => setTheme(e.matches));
}

// Toggle theme manually and save the preference
themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = themeStyle.href.includes('dark-styles.css');
    setTheme(!isCurrentlyDark, true);
});

// Select the header and placeholder elements
const header = document.querySelector('header');
const headerPlaceholder = document.querySelector('.header-placeholder');

// Menu toggle
const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');

menuButton.addEventListener('click', () => {
    sideMenu.classList.toggle('visible');
    const isVisible = sideMenu.classList.contains('visible');
    menuButton.querySelector('img').src = isVisible ? 'assets/open-menu.svg' : 'assets/closed-menu.svg';
    document.body.classList.toggle('no-scroll'); // Optional: Prevent background scrolling
    
    // Toggle the 'sticky' class on the header
    header.classList.toggle('sticky');
    
    // Toggle the placeholder's visibility
    if (header.classList.contains('sticky')) {
        headerPlaceholder.style.display = 'block';
    } else {
        headerPlaceholder.style.display = 'none';
    }
});

// Contact form modal
const contactFormModal = document.getElementById('contact-form-modal');
const openContactButtons = [
    document.getElementById('open-contact-form'),
    document.getElementById('footer-contact-link')
];
const closeButton = document.querySelector('.close-button');

openContactButtons.forEach(button => {
    button.addEventListener('click', () => {
        contactFormModal.classList.remove('hidden');
        contactFormModal.setAttribute('aria-hidden', 'false');
    });
});

closeButton.addEventListener('click', () => {
    contactFormModal.classList.add('hidden');
    contactFormModal.setAttribute('aria-hidden', 'true');
});

// Optional: Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === contactFormModal) {
        contactFormModal.classList.add('hidden');
        contactFormModal.setAttribute('aria-hidden', 'true');
    }
});
