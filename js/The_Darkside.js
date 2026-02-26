function toggleDark() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); 
}

// Fixed the darkmode thingy 
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
});

function toggleMenu() {
    document.getElementById("dropdown-menu").classList.toggle("show");
}

window.addEventListener("click", function(event) {
    const menuIcon = document.getElementById("menu-icon");
    const dropdown = document.getElementById("dropdown-menu");

    if (!menuIcon.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

//I had to add the bit above so that the dropdown menu worked on all pages and not just on the home page
