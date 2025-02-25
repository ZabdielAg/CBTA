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
    "Tec. Explotación Ganadera",      // Relacionado con animales/naturaleza
    "Tec. Agropecuario",              // Relacionado con actividades prácticas y agricultura
    "Tec. Ofimática",                 // Relacionado con informática/tecnología
    "Tec. Administración de Emprendimiento" // Relacionado con administración/emprendimiento
];

let currentQuestion = 0;
let careerScores = [0, 0, 0, 0]; // Puntuación para cada carrera

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
function selectAnswer(answerIndex) {
    // Asigna puntuaciones según la pregunta
    const scoringMatrix = [
        [2, 2, 0, 0], // Pregunta 1: animales/naturaleza -> Tec. Explotación Ganadera y Agropecuario
        [0, 1, 0, 2], // Pregunta 2: administración -> Tec. Agropecuario y Administración de Emprendimiento
        [0, 0, 3, 0], // Pregunta 3: tecnología -> Tec. Ofimática
        [1, 2, 0, 0], // Pregunta 4: actividades prácticas -> Tec. Explotación Ganadera y Agropecuario
        [0, 0, 1, 3]  // Pregunta 5: emprendimiento -> Tec. Ofimática y Administración de Emprendimiento
    ];

    // Suma los puntos a la carrera correspondiente
    for (let i = 0; i < careerScores.length; i++) {
        careerScores[i] += scoringMatrix[currentQuestion][i] * answerIndex;
    }

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
    let bestCareerIndex = careerScores.indexOf(Math.max(...careerScores));
    let resultText = "¡Tu mejor opción es " + careers[bestCareerIndex] + "!";

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


