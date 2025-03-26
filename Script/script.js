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
    "Me gustaría emprender mi propio negocio.",
    "Me interesa la producción agrícola y la sostenibilidad.",
    "Disfruto trabajar con computadoras y software.",
    "Soy bueno resolviendo problemas y tomando decisiones.",
    "Me gustaría aprender sobre contabilidad y finanzas.",
    "Me apasiona la innovación y el desarrollo empresarial."
];

const careers = [
    "Tec. Explotación Ganadera", // Relacionado con animales/naturaleza
    "Tec. Agropecuario", // Relacionado con actividades prácticas y agricultura
    "Tec. Ofimática", // Relacionado con informática/tecnología
    "Tec. Administración de Emprendimiento" // Relacionado con administración/emprendimiento
];

let currentQuestion = 0;
let careerScores = [0, 0, 0, 0]; // Puntuación para cada carrera

document.getElementById("startTest").addEventListener("click", function () {
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("testContainer").classList.remove("hidden");
    updateQuestion();
});

function updateQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("questionText").textContent = questions[currentQuestion];
        updateProgressBar();
    } else {
        showResult();
    }
}

function selectAnswer(answerIndex) {
    const scoringMatrix = [
        [3, 2, 0, 0], // Pregunta 1: animales/naturaleza -> Tec. Explotación Ganadera y Agropecuario
        [0, 2, 0, 3], // Pregunta 2: administración -> Tec. Agropecuario y Administración de Emprendimiento
        [0, 0, 4, 0], // Pregunta 3: tecnología -> Tec. Ofimática
        [2, 3, 0, 0], // Pregunta 4: actividades prácticas -> Tec. Explotación Ganadera y Agropecuario
        [0, 0, 2, 4], // Pregunta 5: emprendimiento -> Tec. Ofimática y Administración de Emprendimiento
        [0, 4, 0, 0], // Pregunta 6: agricultura -> Tec. Agropecuario
        [0, 0, 4, 0], // Pregunta 7: computadoras -> Tec. Ofimática
        [0, 1, 2, 3], // Pregunta 8: toma de decisiones -> Administración y Ofimática
        [0, 0, 1, 4], // Pregunta 9: finanzas -> Administración
        [0, 0, 1, 4]  // Pregunta 10: innovación -> Administración
    ];

    for (let i = 0; i < careerScores.length; i++) {
        careerScores[i] += scoringMatrix[currentQuestion][i] * answerIndex;
    }

    currentQuestion++;
    updateQuestion();
}

function updateProgressBar() {
    let progress = ((currentQuestion / questions.length) * 100) + "%";
    document.getElementById("progressBar").style.width = progress;
}

function showResult() {
    let bestCareerIndex = careerScores.indexOf(Math.max(...careerScores));
    let resultText = "¡Tu mejor opción es " + careers[bestCareerIndex] + "!";

    document.getElementById("resultText").textContent = resultText;
    document.getElementById("resultModal").classList.add("show-modal");
}

function restartTest() {
    currentQuestion = 0;
    careerScores = [0, 0, 0, 0]; // Reinicia los puntajes
    document.getElementById("resultModal").classList.remove("show-modal");
    document.getElementById("startScreen").classList.remove("hidden");
    document.getElementById("testContainer").classList.add("hidden");
}


// noticias
function openModal2(noticia) {
    // Obtenemos el contenido de la noticia según el id
    let modalContent2 = '';

    if (noticia === 'noticia2-1') {
        modalContent2 = `
            <h5>🔸 Torneo de Fútbol Intercolegial 2</h5>
            <img src="multimedia/noticia2-1.jpg" class="img-fluid mb-3" alt="Evento CBTA 2">
            <p>¡Nuestro equipo representará al CBTA30 en el torneo estatal! Conoce más sobre fechas y partidos.</p>
            <p>Detalles adicionales sobre el evento, incluyendo el calendario, las reglas y cómo apoyar al equipo.</p>
        `;
    } else if (noticia === 'noticia2-2') {
        modalContent2 = `
            <h5>📚 Becas de Excelencia 2025 2</h5>
            <img src="multimedia/noticia2-2.jpg" class="img-fluid mb-3" alt="Becas disponibles 2">
            <p>Consulta los requisitos para postularte a las becas académicas y deportivas del próximo ciclo escolar.</p>
            <p>Los interesados deben cumplir con ciertas condiciones académicas y de participación en actividades extraescolares.</p>
        `;
    } else if (noticia === 'noticia2-3') {
        modalContent2 = `
            <h5>🎭 Nuevos Talleres Artísticos 2</h5>
            <img src="multimedia/noticia2-3.jpg" class="img-fluid mb-3" alt="Nuevos talleres 2">
            <p>¡Se abren inscripciones para música, danza y teatro! Descubre cómo participar.</p>
            <p>Estos talleres están diseñados para todos los niveles. No importa si eres principiante o avanzado, ¡todos pueden unirse!</p>
        `;
    }

    // Insertar el contenido en el modal
    document.getElementById('modal-body2').innerHTML = modalContent2;

    // Mostrar el modal
    document.getElementById('modal2').style.display = 'block';
}

function closeModal2() {
    // Ocultar el modal
    document.getElementById('modal2').style.display = 'none';
}

