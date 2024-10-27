/**
 * main.js
 * -------
 * Handles the interactivity and dynamic behaviors of the personal website.
 * Features include theme toggling, side navigation menu management, and contact form modal interactions.
 */

/* =======================
   Theme Toggling Functionality
   ======================= */

// Select elements related to theme toggling
const themeToggle = document.getElementById('theme-toggle'); // Button/Image to toggle theme
const themeStyle = document.getElementById('theme-style');   // Link element for theme stylesheet
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)'); // Media query to detect system preference

/**
 * Sets the website's theme to dark or light mode.
 *
 * @param {boolean} isDark - Determines if the dark theme should be applied.
 * @param {boolean} [savePreference=false] - If true, saves the user's preference in localStorage.
 */
function setTheme(isDark, savePreference = false) {
    if (isDark) {
        // Apply dark theme styles
        themeStyle.href = 'css/dark-styles.css';
        themeToggle.src = 'assets/light-mode.svg';
        themeToggle.alt = 'Switch to Light Mode';
    } else {
        // Apply light theme styles
        themeStyle.href = 'css/light-styles.css';
        themeToggle.src = 'assets/dark-mode.svg';
        themeToggle.alt = 'Switch to Dark Mode';
    }

    // Save the user's theme preference if required
    if (savePreference) {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
}

/**
 * Initializes the website's theme based on user preference or system settings.
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme'); // Retrieve saved theme preference

    if (savedTheme) {
        // Apply saved user preference
        setTheme(savedTheme === 'dark');
    } else {
        // Apply system preference if no user preference is saved
        setTheme(userPrefersDark.matches);
    }
}

// Initialize the theme when the script loads
initializeTheme();

// Listen for changes in system preference only if no user preference is set
if (!localStorage.getItem('theme')) {
    userPrefersDark.addEventListener('change', (e) => setTheme(e.matches));
}

// Event listener to toggle theme manually and save the preference
themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = themeStyle.href.includes('dark-styles.css'); // Check current theme
    setTheme(!isCurrentlyDark, true); // Toggle theme and save preference
});

/* =======================
   Side Navigation Menu Functionality
   ======================= */

// Select the header and placeholder elements
const header = document.querySelector('header'); // Header element
const headerPlaceholder = document.querySelector('.header-placeholder'); // Placeholder for fixed header

// Menu toggle elements
const menuButton = document.getElementById('menu-button'); // Button to toggle side menu
const sideMenu = document.getElementById('side-menu');     // Side navigation menu element

/**
 * Updates the tabindex attribute for side menu items based on menu state.
 *
 * @param {boolean} isMenuOpen - Indicates whether the side menu is open.
 */
function updateSideMenuTabIndex(isMenuOpen) {
    const sideMenuItems = sideMenu.querySelectorAll('a, button'); // Select all interactive elements within the side menu
    sideMenuItems.forEach(item => {
        if (isMenuOpen) {
            // Make elements focusable
            item.setAttribute('tabindex', '0');
        } else {
            // Remove elements from tab order
            item.setAttribute('tabindex', '-1');
        }
    });
}

/**
 * Handles the toggling of the side navigation menu.
 * Updates ARIA attributes, menu button state, and focus management for accessibility.
 */
menuButton.addEventListener('click', () => {
    sideMenu.classList.toggle('visible'); // Toggle visibility class
    const isVisible = sideMenu.classList.contains('visible'); // Determine current state

    // Update ARIA attributes to reflect menu state
    menuButton.setAttribute('aria-expanded', isVisible);
    sideMenu.setAttribute('aria-hidden', !isVisible);

    // Update the menu button icon based on menu state
    menuButton.querySelector('img').src = isVisible ? 'assets/open-menu.svg' : 'assets/closed-menu.svg';
    
    // Toggle the 'sticky' class on the header to fix it during menu visibility
    header.classList.toggle('sticky');
    
    // Toggle the visibility of the header placeholder to maintain layout
    if (header.classList.contains('sticky')) {
        headerPlaceholder.style.display = 'block';
    } else {
        headerPlaceholder.style.display = 'none';
    }

    // Update tabindex of side menu items based on menu visibility
    updateSideMenuTabIndex(isVisible);

    // Manage focus for better accessibility
    if (isVisible) {
        // If the menu is opened, focus on the first menu item
        const firstMenuItem = sideMenu.querySelector('a, button');
        if (firstMenuItem) {
            firstMenuItem.focus();
        }
    } else {
        // If the menu is closed, return focus to the menu button
        menuButton.focus();
    }
});

/**
 * Closes the side navigation menu.
 * Updates ARIA attributes, menu button state, and focus management for accessibility.
 */
function closeSideMenu() {
    sideMenu.classList.remove('visible'); // Hide the side menu

    // Update ARIA attributes to reflect menu state
    menuButton.setAttribute('aria-expanded', 'false');
    sideMenu.setAttribute('aria-hidden', 'true');

    // Update the menu button icon to indicate closed state
    menuButton.querySelector('img').src = 'assets/closed-menu.svg';

    // Remove 'sticky' class from the header to revert its behavior
    header.classList.remove('sticky');

    // Hide the header placeholder to maintain layout
    headerPlaceholder.style.display = 'none';

    // Update tabindex to remove side menu items from tab order
    updateSideMenuTabIndex(false);

    // Return focus to the menu button for seamless navigation
    menuButton.focus();
}

// Select all interactive elements inside the side menu
const sideMenuItems = sideMenu.querySelectorAll('a, button');

/**
 * Adds click event listeners to side menu items to close the menu upon interaction.
 */
sideMenuItems.forEach(item => {
    item.addEventListener('click', closeSideMenu);
});

/* =======================
   Contact Form Modal Functionality
   ======================= */

// Select contact form modal elements
const contactFormModal = document.getElementById('contact-form-modal'); // Modal container
const openContactButtons = [
    document.getElementById('open-contact-form'),    // Button inside side menu
    document.getElementById('footer-contact-link')   // Button inside footer
];
const closeButton = document.querySelector('.close-button'); // Close button inside modal

/**
 * Opens the contact form modal.
 * Updates ARIA attributes, disables background scrolling, and manages focus.
 */
function openContactModal() {
    contactFormModal.classList.remove('hidden');               // Make modal visible
    contactFormModal.setAttribute('aria-hidden', 'false');     // Update ARIA attribute
    document.body.classList.add('no-scroll');                  // Disable background scrolling
    document.getElementById('name').focus();                   // Focus on the first input field
}

/**
 * Closes the contact form modal.
 * Updates ARIA attributes, enables background scrolling, and manages focus.
 */
function closeContactModal() {
    contactFormModal.classList.add('hidden');                  // Hide modal
    contactFormModal.setAttribute('aria-hidden', 'true');      // Update ARIA attribute
    document.body.classList.remove('no-scroll');               // Enable background scrolling
    // Return focus to the button that opened the modal
    // Assuming the last focused element was the button, alternatively track it
    menuButton.focus();
}

// Add event listeners to open contact form buttons
openContactButtons.forEach(button => {
    button.addEventListener('click', openContactModal);
});

// Add event listener to close button in the modal
closeButton.addEventListener('click', closeContactModal);

/**
 * Closes the contact form modal when clicking outside the modal content.
 *
 * @param {MouseEvent} event - The click event object.
 */
window.addEventListener('click', (event) => {
    if (event.target === contactFormModal) {
        closeContactModal();
    }
});

/* =======================
   Keyboard Accessibility Enhancements
   ======================= */

/**
 * Handles the Escape key press to close open menus or modals.
 *
 * @param {KeyboardEvent} event - The keyboard event object.
 */
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        // Close side menu if it is currently open
        if (sideMenu.classList.contains('visible')) {
            closeSideMenu();
        }
        // Close contact form modal if it is currently open
        if (!contactFormModal.classList.contains('hidden')) {
            closeContactModal();
        }
    }
});
