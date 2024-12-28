function mobileNavigation(){
    const menuToggle = document.getElementById("main-menu-toggle")
    const menuNav = document.getElementById("main-menu-nav")

    // Function to open the menu
    const openMenu = () => {
        menuNav.setAttribute("aria-hidden", "false");
        menuToggle.setAttribute("aria-expanded", "true");
        menuNav.classList.add("open");
    };

    // Function to close the menu
    const closeMenu = () => {
        menuNav.setAttribute("aria-hidden", "true");
        menuToggle.setAttribute("aria-expanded", "false");
        menuNav.classList.remove("open");
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

mobileNavigation();