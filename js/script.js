// =================================
// BASE DE DATOS DE LA BIBLIOTECA
// =================================
// (Tu base de datos se mantiene exactamente igual, no la modifico)
const biblioteca = {
    primer: [
        {
            nombre: "Antropología",
            contenido: [
                {
                    titulo: "Introducción a la Antropología Cultural",
                    archivos: [
                        { titulo: "Ficha orientativa", tipo: "PDF", archivo: "1er año/Antropología/Textos/1A Ficha Orientativa.pdf" },
                        { titulo: "Antropología Cultural - Marvin Harris", tipo: "PDF", archivo: "1er año/Antropología/Textos/1A Marvin Harris.pdf" }
                    ]
                },
                {
                    titulo: "Prinicpales corrientes teóricas modernas",
                    archivos: [
                        { titulo: "Evolucionismo - Difusionismo", tipo: "PDF", archivo: "1er año/Antropología/Textos/2 A Carozzi, Maya, Magrassi Ev y dif.pdf" },
                        { titulo: "Positivismo sociológico - Funcionalismo", tipo: "PDF", archivo: "1er año/Antropología/Textos/2A Carozzi, Maya, Magrassi Funcionalismo.pdf" }
                    ]
                }
            ]
        },
        {
            nombre: "Cultura Digital",
            contenido: [
                "Conceptos fundamentales",
                "Tecnología y sociedad",
                "Educación digital",
                "Bibliografía"
            ]
        }
        // ... (resto de tus materias)
    ]
};

// =================================
// ELEMENTOS DEL DOM
// =================================
const contenido = document.getElementById("contenido");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");

// NUEVOS ELEMENTOS PARA EL MENÚ MÓVIL
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

// =================================
// LÓGICA DEL MENÚ MÓVIL
// =================================
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        // Agrega o quita la clase que mueve el menú hacia adentro/afuera
        sidebar.classList.toggle("active");
    });
}

// Función auxiliar para cerrar el menú en móviles tras hacer clic en un enlace
function cerrarMenuMovil() {
    if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
    }
}

// =================================
// INICIO
// =================================
function mostrarInicio() {
    contenido.innerHTML = `
        <div class="card" data-seccion="primer" role="button" tabindex="0">
            <h3>PRIMER AÑO</h3>
            <p>Materias y archivos.</p>
        </div>
        <div class="card">
            <h3>BIBLIOTECA</h3>
            <p>Autores, conceptos y cronologías.</p>
        </div>
        <div class="card">
            <h3>HISTORIA ANTIGUA</h3>
            <p>Acceso rápido a contenidos.</p>
        </div>
    `;
    titulo.innerHTML = "INICIO";
    descripcion.innerHTML = "Biblioteca digital académica.";
}

// =================================
// MOSTRAR AÑO
// =================================
function mostrarAño(año) {
    contenido.innerHTML = "";
    
    // CORRECCIÓN: Título dinámico (Ej: "primer" -> "Primer Año")
    const nombreFormateado = año.charAt(0).toUpperCase() + año.slice(1);
    titulo.innerHTML = `${nombreFormateado} Año`;
    descripcion.innerHTML = "Materias correspondientes";

    if (!biblioteca[año]) return; // Prevención de errores si el año no existe

    biblioteca[año].forEach((materia, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${materia.nombre}</h3>
            <a href="#" class="entrarMateria" data-id="${index}">Ingresar</a>
        `;
        contenido.appendChild(card);
    });

    activarMaterias(año);
}

// =================================
// INGRESAR A MATERIA
// =================================
function activarMaterias(año) {
    const botones = document.querySelectorAll(".entrarMateria");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            const id = boton.dataset.id;
            mostrarMateria(biblioteca[año][id]);
        });
    });
}

function mostrarMateria(materia) {
    contenido.innerHTML = "";
    titulo.innerHTML = materia.nombre;
    descripcion.innerHTML = "Textos y apuntes";

    materia.contenido.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("card");

        // CORRECCIÓN CRÍTICA: Evaluar si el item es un texto o un objeto complejo
        if (typeof item === "string") {
            card.innerHTML = `
                <h3>Tema</h3>
                <p>📚 ${item}</p>
            `;
        } else {
            // Si es un objeto, asumimos que tiene titulo y archivos
            card.innerHTML = `
                <h3>${item.titulo}</h3>
                ${item.archivos ? item.archivos.map(archivo => `
                    <a href="${archivo.archivo}" target="_blank">📄 ${archivo.titulo}</a>
                `).join("") : ""}
            `;
        }
        contenido.appendChild(card);
    });
}

// =================================
// NAVEGACIÓN GLOBAL
// =================================
document.addEventListener("click", (e) => {
    const enlace = e.target.closest("[data-seccion]");
    if (enlace) {
        e.preventDefault();
        const seccion = enlace.dataset.seccion;

        switch(seccion) {
            case "inicio":
                mostrarInicio();
                break;
            case "primer":
                mostrarAño("primer");
                break;
            // Aquí agregarás "segundo", "tercero", etc.
        }
        
        // CORRECCIÓN UX: Cerramos el menú en celular después de elegir una sección
        cerrarMenuMovil(); 
    }
});

// =================================
// MODO OSCURO
// =================================
const darkBtn = document.getElementById("darkBtn");
if (darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}

// =================================
// BUSCADOR GLOBAL
// =================================
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("keyup", function() {
        const filtro = this.value.toLowerCase().trim();

        if(filtro === "") {
            // Si el buscador está vacío, volvemos al inicio
            mostrarInicio(); 
            return;
        }

        contenido.innerHTML = "";
        titulo.innerHTML = "Resultados de búsqueda";
        descripcion.innerHTML = `Resultados para "${this.value}"`;

        if (!biblioteca.primer) return;

        biblioteca.primer.forEach(materia => {
            let resultados = [];

            materia.contenido.forEach(item => {
                // Evaluamos si es texto simple
                if (typeof item === "string") {
                    if (item.toLowerCase().includes(filtro) || materia.nombre.toLowerCase().includes(filtro)) {
                        resultados.push({ titulo: item, archivo: null });
                    }
                    return;
                }

                // Evaluamos si es objeto con archivos
                if (item.titulo && (item.titulo.toLowerCase().includes(filtro) || materia.nombre.toLowerCase().includes(filtro))) {
                    resultados.push({ titulo: item.titulo, archivo: null });
                }

                if (item.archivos) {
                    item.archivos.forEach(archivo => {
                        if (archivo.titulo.toLowerCase().includes(filtro) || item.titulo.toLowerCase().includes(filtro) || materia.nombre.toLowerCase().includes(filtro)) {
                            resultados.push({ titulo: archivo.titulo, archivo: archivo.archivo });
                        }
                    });
                }
            });

            if (resultados.length > 0) {
                let card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `<h3>${materia.nombre}</h3>`;

                resultados.forEach(resultado => {
                    if (resultado.archivo) {
                        card.innerHTML += `<a href="${resultado.archivo}" target="_blank">📄 ${resultado.titulo}</a>`;
                    } else {
                        card.innerHTML += `<p>📚 ${resultado.titulo}</p>`;
                    }
                });
                contenido.appendChild(card);
            }
        });

        if (contenido.innerHTML === "") {
            contenido.innerHTML = `
                <div class="card">
                    <h3>Sin resultados</h3>
                    <p>No se encontró contenido relacionado.</p>
                </div>
            `;
        }
    });
}
