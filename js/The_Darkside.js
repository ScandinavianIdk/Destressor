function toggleDark() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
}


function toggleMenu() {
    document.getElementById("dropdown-menu").classList.toggle("show");
}


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