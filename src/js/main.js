function navigation() {
    const menu = document.getElementById("main-menu");
    const menuToggle = document.getElementById("main-menu-toggle");
    const menuNav = document.getElementById("main-menu-nav");
    const modalBackdrop = document.querySelector(".modalBackdrop");
    const body = document.body;
    let transitionOngoing = false;

    const onDocumentClick = (event) => {
        if (!menuNav.contains(event.target) && !menuToggle.contains(event.target)) {
            closeWithTransition();
        }
    };

    const onEscapeKey = (event) => {
        if (event.key === "Escape") {
            closeWithTransition();
        }
    };

    const openMenu = () => {
        trapFocus(menu);
        menuNav.setAttribute("aria-hidden", "false");
        menuToggle.setAttribute("aria-expanded", "true");
        body.classList.add("no-scroll");

        menuNav.classList.add("g-nav-content-main--open");
        setTimeout(() => {
            menuNav.classList.add("g-nav-content-main--opening");
        }, 10);

        modalBackdrop.style.display = "block";
        setTimeout(() => {
            modalBackdrop.classList.add("modalBackdrop-opening");
        }, 10);

        document.addEventListener("click", onDocumentClick);
        document.addEventListener("keydown", onEscapeKey);
    };

    const closeMenu = () => {
        menuNav.removeEventListener("transitionend", closeMenu);
        transitionOngoing = false;
        menuNav.setAttribute("aria-hidden", "true");
        menuNav.classList.remove("g-nav-content-main--open", "g-nav-content-main--opening", "g-nav-content-main--closing");
        modalBackdrop.style.display = "none";
        modalBackdrop.classList.remove("modalBackdrop-opening", "modalBackdrop-closing");
        body.classList.remove("no-scroll");

        document.removeEventListener("click", onDocumentClick);
        document.removeEventListener("keydown", onEscapeKey);
    };

    const closeWithTransition = () => {
        if (!transitionOngoing) {
            menuToggle.setAttribute("aria-expanded", "false");
            transitionOngoing = true;
            menuNav.addEventListener("transitionend", closeMenu);
            menuNav.classList.add("g-nav-content-main--closing");
            modalBackdrop.classList.add("modalBackdrop-closing");
        }
    };

    // Toggle menu visibility on button click
    menuToggle.addEventListener("click", () => {
        if (!transitionOngoing) {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            if (isExpanded) {
                closeWithTransition();
            } else {
                openMenu();
            }
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

navigation();
dropdownNavigation();