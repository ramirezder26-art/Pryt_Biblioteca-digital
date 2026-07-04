// =================================
// BASE DE DATOS DE LA BIBLIOTECA
// =================================


const biblioteca = {


primer:[


{
nombre:"Antropología",

contenido:[


{
titulo:"Introducción a la Antropología Cultural",

archivos:[

{
titulo:"Ficha orientativa",

tipo:"PDF",

archivo:"1er año/Antropología/Textos/1A Ficha Orientativa.pdf"},

{
titulo:"Antropología Cultural - Marvin Harris",
tipo:"PDF",

archivo:"1er año/Antropología/Textos/1A Marvin Harris.pdf"}
]

},

{
titulo:"Prinicpales corrientes teóricas modernas",

archivos:[

{
titulo:"Evolucionismo - Difusionismo",

tipo:"PDF",

archivo:"1er año/Antropología/Textos/2 A Carozzi, Maya, Magrassi Ev y dif.pdf"},

{
titulo:"Positivismo sociológico - Funcionalismo",

tipo:"PDF",

archivo:"1er año/Antropología/Textos/2A Carozzi, Maya, Magrassi Funcionalismo.pdf"}
]
},

{
titulo:"Lenguaje y Cultura",

archivos:[

{
titulo:"Lenguaje - Marvin Harris",

tipo:"PDF",

archivo:"1er año/Antropología/Textos/B3 - Antropología cultural. Lenguaje. Harris.pdf"},

{
titulo: "Linguística Estructural - Lévi-Strauss",

tipo:"PDF",

archivo: "1er año/Antropología/Textos/B3 - Antropología cultural. Lenguaje. Harris.pdf"}

]

},  

{
titulo:"Evolución Humana y Paleoantropología",

archivos:[

{
titulo:"Perspectivas teóricas en Paleoantropología — Marta Mirazón Lahr",

tipo:"PDF",

archivo:"1er año/Antropología/Textos/B7 perspectivas teóricas en paleoantropologia.pdf"}

]

}

]
},



{

nombre:"Cultura Digital",

contenido:[

"Conceptos fundamentales",
"Tecnología y sociedad",
"Educación digital",
"Bibliografía"

]

},



{
nombre:"Educación y transformaciones sociales contemporáneas",

contenido:[

"Presentación de la materia",
"Unidad 1",
"Unidad 2",
"Textos de estudio",
"Bibliografía"

]

},



{
nombre:"Geografía",

contenido:[

"Presentación",
"Unidad 1",
"Unidad 2",
"Cartografía",
"Bibliografía"

]

},



{
nombre:"Historia Americana I",

contenido:[

"Presentación de la materia",
"Programa",
"Unidad 1",
"Unidad 2",
"Unidad 3",
"Bibliografía",
"Autores"

]

},



{
nombre:"Historia del Mundo Antiguo",

contenido:[

{

titulo:"Periodizaciones y Mapas",

archivos:[

{
titulo: "Periodización - Chiaramonte",

tipo: "PDF",

archivo: "1er año/Historia del Mundo Antiguo/01 - Periodizaciones y Mapas/10 H CHIARAMONTE PERIODIZACIÓN.pdf"},

{
titulo: "Periodizacion - Audio",

tipo: "m4a",

archivo: "1er año/Historia del Mundo Antiguo/01 - Periodizaciones y Mapas/10 H  - Audio - CHIARAMONTE PERIODIZACIÓN.m4a"}

]

}

]

},



{
nombre:"Introducción a las Ciencias Sociales",

contenido:[

"Presentación",
"Conceptos fundamentales",
"Autores clásicos",
"Corrientes sociales",
"Bibliografía"

]

},



{
nombre:"Pedagogía",

contenido:[

"Introducción",
"Autores clásicos",
"Corrientes pedagógicas",
"Bibliografía"

]

},



{
nombre:"Práctica Docente",

contenido:[

"Presentación",
"Trabajos prácticos",
"Material de clase",
"Bibliografía"

]

}

]

}

// =================================
// ELEMENTOS
// =================================


const contenido =
document.getElementById("contenido");


const titulo =
document.getElementById("titulo");


const descripcion =
document.getElementById("descripcion");





// =================================
// INICIO
// =================================


function mostrarInicio(){


contenido.innerHTML = `


<div class="card" data-seccion="primer">

<h3>
Primer Año
</h3>

<p>
Materias y cuadernillos.
</p>

</div>



<div class="card">

<h3>
Biblioteca
</h3>

<p>
Autores, conceptos y cronologías.
</p>

</div>



<div class="card">

<h3>
Historia Antigua
</h3>

<p>
Acceso rápido a contenidos.
</p>

</div>


`;



titulo.innerHTML =
"Inicio";


descripcion.innerHTML =
"Biblioteca digital académica.";


}





// =================================
// MOSTRAR AÑO
// =================================


function mostrarAño(año){


contenido.innerHTML="";


titulo.innerHTML =
"Primer año";


descripcion.innerHTML =
"Materias correspondientes";



biblioteca[año].forEach(

(materia,index)=>{


let card =
document.createElement("div");



card.classList.add("card");



card.innerHTML = `


<h3>

${materia.nombre}

</h3>


<a href="#"
class="entrarMateria"
data-id="${index}">

Ingresar

</a>


`;



contenido.appendChild(card);



});



activarMaterias(año);


}





// =================================
// INGRESAR A MATERIA
// =================================


function activarMaterias(año){


const botones =
document.querySelectorAll(".entrarMateria");



botones.forEach(

boton=>{


boton.addEventListener(

"click",

(e)=>{


e.preventDefault();



const id =
boton.dataset.id;



mostrarMateria(
biblioteca[año][id]
);



});


});


}





function mostrarMateria(materia){


contenido.innerHTML="";



titulo.innerHTML =
"Primer año - " + materia.nombre;



descripcion.innerHTML =
"Textos y apuntes";



materia.contenido.forEach(

item=>{


let card =
document.createElement("div");


card.classList.add("card");


card.innerHTML=`

<h3>
📚 ${item.titulo}
</h3>

${item.archivos.map(archivo => `

<a href="${archivo.archivo}" target="_blank">

📄 ${archivo.titulo}

</a>

`).join("")}
`;


contenido.appendChild(card);


});


}


// =================================
// ACTIVAR SECCIONES
// =================================

function activarSecciones(){

    const enlaces =
    document.querySelectorAll("[data-seccion]");

    enlaces.forEach(enlace=>{

        enlace.addEventListener("click",(e)=>{

            e.preventDefault();

            const seccion =
            enlace.dataset.seccion;

            switch(seccion){

                case "inicio":

                    mostrarInicio();

                break;

                case "primer":

                    mostrarAño("primer");

                break;

                case "segundo":

                    mostrarAño("segundo");

                break;

                case "tercero":

                    mostrarAño("tercero");

                break;

                case "cuarto":

                    mostrarAño("cuarto");

                break;

            }

        });

    });

}



// =================================
// MENU LATERAL
// =================================


const enlaces =
document.querySelectorAll(
"[data-seccion]"
);



enlaces.forEach(

enlace=>{


enlace.addEventListener(

"click",

(e)=>{


e.preventDefault();



const seccion =
enlace.dataset.seccion;



switch(seccion){


case "inicio":

mostrarInicio();

break;



case "primer":

mostrarAño("primer");

break;


}



});


});







// =================================
// MODO OSCURO
// =================================


const darkBtn =
document.getElementById("darkBtn");



darkBtn.addEventListener(

"click",

()=>{


document.body.classList.toggle("dark");


});







// =================================
// BUSCADOR GLOBAL
// =================================


const searchInput =
document.getElementById("searchInput");



searchInput.addEventListener(

"keyup",

function(){

const filtro =
this.value.toLowerCase().trim();



if(filtro === ""){

return;

}



contenido.innerHTML = "";



titulo.innerHTML =
"Resultados de búsqueda";



descripcion.innerHTML =
`Resultados para "${this.value}"`;



biblioteca.primer.forEach(

materia=>{



let resultados = [];



materia.contenido.forEach(

item=>{



// CASO 1
// Contenido tipo texto

if(typeof item === "string"){


if(

item.toLowerCase()
.includes(filtro)

||

materia.nombre
.toLowerCase()
.includes(filtro)

){

resultados.push({

titulo:item,

archivo:null

});

}


return;

}



// CASO 2
// Contenido con archivos

if(item.titulo){

if(

item.titulo
.toLowerCase()
.includes(filtro)

||

materia.nombre
.toLowerCase()
.includes(filtro)

){

resultados.push({

titulo:item.titulo,

archivo:null

});

}

}



if(item.archivos){

item.archivos.forEach(

archivo=>{

if(

archivo.titulo
.toLowerCase()
.includes(filtro)

||

item.titulo
.toLowerCase()
.includes(filtro)

||

materia.nombre
.toLowerCase()
.includes(filtro)

){

resultados.push({

titulo:archivo.titulo,

archivo:archivo.archivo

});

}

});

}

});



if(resultados.length > 0){


let card =
document.createElement("div");



card.classList.add("card");



card.innerHTML = `

<h3>

${materia.nombre}

</h3>

`;



resultados.forEach(

resultado=>{


if(resultado.archivo){

card.innerHTML += `

<a href="${resultado.archivo}"
target="_blank">

📄 ${resultado.titulo}

</a>

`;

}

else{

card.innerHTML += `

<p>

📚 ${resultado.titulo}

</p>

`;

}


});



contenido.appendChild(card);


}



});



if(contenido.innerHTML === ""){


contenido.innerHTML = `

<div class="card">

<h3>
Sin resultados
</h3>

<p>
No se encontró contenido relacionado.
</p>

</div>

`;


}



});
