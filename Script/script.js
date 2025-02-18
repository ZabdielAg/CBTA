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

//   test
const questions = [
    "Me gusta trabajar con animales y la naturaleza.",
    "Disfruto organizar y administrar proyectos.",
    "Me interesa el mundo de la informática y la tecnología.",
    "Prefiero actividades prácticas y manuales.",
    "Me gustaría emprender mi propio negocio."
];

const careers = [
    "Tec. Explotación Ganadera",
    "Tec. Agropecuario",
    "Tec. Ofimática",
    "Tec. Administración de Emprendimiento"
];

let currentQuestion = 0;
let answers = [];

document.getElementById("startTest").addEventListener("click", function () {
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("testContainer").classList.remove("hidden");
    updateQuestion();
});

// Muestra la pregunta actual
function updateQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("questionText").textContent = questions[currentQuestion];
        updateProgressBar();
    } else {
        showResult();
    }
}

// Guardar respuestas y avanzar
function selectAnswer(score) {
    answers.push(score);
    currentQuestion++;
    updateQuestion();
}

// Actualiza barra de progreso
function updateProgressBar() {
    let progress = ((currentQuestion / questions.length) * 100) + "%";
    document.getElementById("progressBar").style.width = progress;
}

// Calcula y muestra el resultado
function showResult() {
    let totalScore = answers.reduce((a, b) => a + b, 0);
    let resultText = "";

    if (totalScore >= 20) {
        resultText = "¡Parece que eres ideal para " + careers[3] + "!";
    } else if (totalScore >= 15) {
        resultText = "Tu perfil encaja con " + careers[2] + ".";
    } else if (totalScore >= 10) {
        resultText = "Podrías considerar " + careers[0] + ".";
    } else {
        resultText = "Tal vez " + careers[1] + " sea la mejor opción para ti.";
    }

    document.getElementById("resultText").textContent = resultText;
    document.getElementById("resultModal").classList.add("show-modal");
}

// Reiniciar Test
function restartTest() {
    currentQuestion = 0;
    answers = [];
    document.getElementById("resultModal").classList.remove("show-modal");
    document.getElementById("startScreen").classList.remove("hidden");
    document.getElementById("testContainer").classList.add("hidden");
}
