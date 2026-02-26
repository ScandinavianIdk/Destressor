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


window.onclick = function(event) {
    if (!event.target.matches('#menu-icon')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


//I had to add the bit above so that the dropdown menu worked on all pages and not just on the home page
