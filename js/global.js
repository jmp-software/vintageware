
/*
// Ajustar ancho de la línea divisoria del menú
function ajustarLargo() {
    const navBarSize = document.getElementById('navbarTogglerDemo03');
    const lineSize = document.getElementByClass('navbar-brand');
    lineSize .style.height = `${navBarSize.offsetHeight}px`; 
}

// Ajustar el ancho al cargar la página
window.addEventListener('load', ajustarLargo);

// Ajustar el ancho al redimensionar la ventana
window.addEventListener('resize', ajustarLargo);
*/

// Chequea si viene de la página index.html
if (window.location.pathname == '/index.html' || window.location.pathname == '/vintageware/' || window.location.pathname == '/vintageware/index.html') {
     // Incluye el menú de '/pages/menu-1.html' para "index.html"
    fetch('./pages/menú-1.html')  
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error fetching menu:', error));
    console.log(`Entro por TRUE`)
} else {
     // Incluye el menú de '/pages/menu-2.html' para el esto de las páginas
    fetch('../pages/menú-2.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error fetching menu:', error));
     console.log(`Entro por ELSE`)
 }
 console.log(`Esto es el path: ${window.location.pathname}`)