// Cheqquea si la página desde donde lo llama es "index.html"
if (window.location.pathname.includes('index.html')) {
    // Incluye el menú desde './pages/menú.html' para "index.html"
    fetch('./pages/menú-1.html')  
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error fetching menu:', error));
} else {
    // Incluye el menú desde '../pages/menú.html' para el resto de la páginas
    fetch('../pages/menú-2.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error fetching menu:', error));
}
