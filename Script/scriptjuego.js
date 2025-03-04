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

document.addEventListener("DOMContentLoaded", function () {
    let preguntas = [
        { pregunta: "¿Con qué programa harías una hoja de cálculo?", opciones: ["Word", "Excel", "PowerPoint"], correcta: 1 },
        { pregunta: "Completa: Pow_r Po_nt", opciones: ["Power Print", "PowerPoint", "Power Paint"], correcta: 1 },
        { pregunta: "¿Cuál es la extensión de un documento de Microsoft Word?", opciones: [".doc", ".xls", ".ppt"], correcta: 0 },
        { pregunta: "¿Qué atajo de teclado se usa para copiar en Windows?", opciones: ["Ctrl + C", "Ctrl + V", "Ctrl + X"], correcta: 0 },
        { pregunta: "¿Qué programa de Microsoft Office se usa para crear presentaciones?", opciones: ["Excel", "PowerPoint", "Word"], correcta: 1 },
        { pregunta: "¿Cómo se guarda un archivo rápidamente en la mayoría de los programas de Office?", opciones: ["Ctrl + S", "Ctrl + P", "Ctrl + Z"], correcta: 0 },
        { pregunta: "¿Qué tipo de archivo genera Excel por defecto?", opciones: [".docx", ".xlsx", ".pptx"], correcta: 1 },
        { pregunta: "¿Qué función de Excel se usa para sumar un rango de celdas?", opciones: ["=SUMA()", "=PROMEDIO()", "=CONTAR()"], correcta: 0 },
        { pregunta: "¿Qué opción permite cambiar la orientación de una página en Word?", opciones: ["Diseño de página", "Referencias", "Revisar"], correcta: 0 },
        { pregunta: "¿Cuál de estas herramientas se usa para revisar la ortografía en Word?", opciones: ["Corrector ortográfico", "Tablas dinámicas", "Formato condicional"], correcta: 0 },
        { pregunta: "¿Qué combinación de teclas se usa para deshacer la última acción en Office?", opciones: ["Ctrl + Z", "Ctrl + Y", "Ctrl + X"], correcta: 0 },
        { pregunta: "En PowerPoint, ¿qué opción se usa para agregar efectos a las diapositivas?", opciones: ["Transiciones", "Formato de celda", "Corrección ortográfica"], correcta: 0 }
    ];
    

    let preguntaActual = 0;
    let puntaje = 0;

    const startGameBtn = document.getElementById("startGame");
    const triviaModal = new bootstrap.Modal(document.getElementById("triviaModal"));
    const questionText = document.getElementById("questionText");
    const optionBtns = [document.getElementById("option0"), document.getElementById("option1"), document.getElementById("option2")];
    const resultContainer = document.getElementById("resultContainer");
    const resultMessage = document.getElementById("resultMessage");
    const restartGameBtn = document.getElementById("restartGame");

    // Evento para iniciar el juego
    startGameBtn.addEventListener("click", function () {
        console.log("🔹 Botón 'Comenzar' presionado"); // Mensaje más claro en la consola
    
        if (!triviaModal) {
            console.error("⚠ Error: triviaModal no está definido correctamente.");
            return;
        }
    
        preguntaActual = 0;
        puntaje = 0;
        mostrarPregunta();
        triviaModal.show(); 
    
        console.log("✅ Modal abierto correctamente.");
    });
    

    // Función para mostrar preguntas
    function mostrarPregunta() {
        if (preguntaActual < preguntas.length) {
            let pregunta = preguntas[preguntaActual];
            questionText.textContent = pregunta.pregunta;

            // Asigna texto a cada botón y los hace funcionales
            optionBtns.forEach((btn, index) => {
                btn.textContent = pregunta.opciones[index];
                btn.onclick = () => seleccionarRespuesta(index);
            });
        } else {
            mostrarResultado();
        }
    }

    // Función para manejar la respuesta
    function seleccionarRespuesta(opcionSeleccionada) {
        if (opcionSeleccionada === preguntas[preguntaActual].correcta) {
            puntaje++;
        }

        preguntaActual++;

        if (preguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            triviaModal.hide();
            mostrarResultado();
        }
    }

    // Mostrar resultado final
    function mostrarResultado() {
        resultContainer.classList.remove("d-none");
        resultMessage.textContent = puntaje >= preguntas.length ? "¡Escapaste con éxito!" : "¡Fallaste! Intenta de nuevo.";
    }

    // Reiniciar el juego
    restartGameBtn.addEventListener("click", function () {
        resultContainer.classList.add("d-none");
        startGameBtn.click(); // Reinicia la trivia
    });
});

var modal = document.getElementById("triviaModal");
var modalInstance = bootstrap.Modal.getInstance(modal);
if (modalInstance) modalInstance.hide();