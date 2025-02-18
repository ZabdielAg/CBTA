document.querySelectorAll('.grid-img-container').forEach(container => {
    container.addEventListener('click', function() {
        const clickText = this.querySelector('.grid-click-text');
        if (clickText.style.display === "none" || clickText.style.display === "") {
            clickText.style.display = "block";
        } else {
            clickText.style.display = "none";
        }
    });
});

 // JavaScript for opening the search panel
 document.getElementById('searchIcon').addEventListener('click', function() {
    const searchPanel = document.getElementById('searchPanel');
    if (searchPanel.style.display === 'none' || searchPanel.style.display === '') {
        searchPanel.style.display = 'block';
    } else {
        searchPanel.style.display = 'none';
    }
});

// Close search panel when clicking outside
document.addEventListener('click', function(event) {
    const searchIcon = document.getElementById('searchIcon');
    const searchPanel = document.getElementById('searchPanel');
    if (!searchPanel.contains(event.target) && !searchIcon.contains(event.target)) {
        searchPanel.style.display = 'none';
    }
});

let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    const navbarScroll = document.getElementById("navbar-scroll");
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > lastScrollTop) {
        // Scroll hacia abajo
        navbarScroll.style.display = "block";
    } else {
        // Scroll hacia arriba
        if (currentScrollTop <= 100) { // Ajusta este valor si es necesario
            navbarScroll.style.display = "none";
        }
    }
    lastScrollTop = currentScrollTop;
});

// buscador
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const items = searchResults.getElementsByTagName("li");

    searchInput.addEventListener("input", function () {
      let filter = searchInput.value.toLowerCase();
      let hasResults = false;

      for (let i = 0; i < items.length; i++) {
        let text = items[i].textContent.toLowerCase();
        if (text.includes(filter)) {
          items[i].style.display = "block";
          hasResults = true;
        } else {
          items[i].style.display = "none";
        }
      }

      // Mostrar la lista solo si hay resultados
      searchResults.style.display = hasResults ? "block" : "none";
    });

    // Ocultar la lista cuando el usuario haga clic fuera del input
    document.addEventListener("click", function (e) {
      if (!searchPanel.contains(e.target)) {
        searchResults.style.display = "none";
      }
    });

    // Mostrar sugerencias cuando el usuario haga clic en el input
    searchInput.addEventListener("focus", function () {
      if (searchInput.value !== "") {
        searchResults.style.display = "block";
      }
    });
  });