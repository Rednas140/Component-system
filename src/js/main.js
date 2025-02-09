function mobileNavigation() {
    const menu = document.getElementById("main-menu")
    const menuToggle = document.getElementById("main-menu-toggle")
    const menuNav = document.getElementById("main-menu-nav")

    // Function to open the menu
    const openMenu = () => {
        trapFocus(menu)
        menuNav.setAttribute("aria-hidden", "false");
        menuToggle.setAttribute("aria-expanded", "true");
        menuNav.classList.add("g-nav-content-main--open");
    };

    // Function to close the menu
    const closeMenu = () => {
        menuNav.setAttribute("aria-hidden", "true");
        menuToggle.setAttribute("aria-expanded", "false");
        menuNav.classList.remove("g-nav-content-main--open");
    };

    // Toggle menu visibility on button click
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!menuNav.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

}

function trapFocus(container) {
    const focusableSelectors = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements = container.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                // Shift + Tab: focus last element if on the first
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab: focus first element if on the last
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

function dropdownNavigation() {
    document.querySelectorAll('.g-nav-content-main-dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.g-nav-content-main-dropdown-toggle');
        const menu = dropdown.querySelector('.g-nav-content-main-dropdown-menu');

        function openMenu() {
            trapFocus(menu)
            menu.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }

        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            if (menu.classList.contains('active')) {
                closeMenu();
            } else {
                closeAllMenus();
                openMenu();
            }
        });

        toggle.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                openMenu();
                menu.querySelector('a').focus();
            }
        });

        menu.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu();
                toggle.focus();
            }
        });

        document.addEventListener('click', function (event) {
            if (!dropdown.contains(event.target)) {
                closeMenu();
            }
        });

        function closeAllMenus() {
            document.querySelectorAll('.g-nav-content-main-dropdown-menu.active').forEach(activeMenu => {
                activeMenu.classList.remove('active');
                activeMenu.previousElementSibling.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

mobileNavigation();
dropdownNavigation();