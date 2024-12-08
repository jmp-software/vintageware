/*
// Chequea si viene de la página index.html
if (window.location.pathname == '/index.html' || window.location.pathname == '/vintageware/' || window.location.pathname == '/vintageware/index.html') {
    // Incluye el menú de '/pages/menu-1.html' para "index.html"
    fetch('./pages/menú-1.html') // Ajusta el nombre del archivo si es necesario (sin tildes)
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error fetching menu:', error));
    
    fetch('./pages/carrito-recuadro.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('cart-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error fetching cart:', error));

    console.log('Se ha cargado el menú de index.html y carrito para la página principal.');
} else {
    // Incluye el menú de '/pages/menu-2.html' para el resto de las páginas
    fetch('../pages/menú-2.html') // Ajusta la ruta según la estructura de tu servidor
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error fetching menu:', error));
    
    fetch('../pages/carrito-recuadro.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('cart-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error fetching cart:', error));

    console.log('Se ha cargado el menú de otras páginas y carrito.');
}

console.log(`Esto es el path actual: ${window.location.pathname}`);
console.log('\n');
*/
// Chequea si viene de la página index.html
document.addEventListener('DOMContentLoaded', function () {
    // Chequea si viene de la página index.html
    if (window.location.pathname == '/index.html' || window.location.pathname == '/vintageware/' || window.location.pathname == '/vintageware/index.html') {
        // Incluye el menú de '/pages/menu-1.html' para "index.html"
        fetch('./pages/menú-1.html') // Ajusta el nombre del archivo si es necesario (sin tildes)
            .then(response => response.text())
            .then(data => {
                const navbarPlaceholder = document.getElementById('navbar-placeholder');
                if (navbarPlaceholder) {
                    navbarPlaceholder.innerHTML = data;
                } else {
                    console.error("Element with ID 'navbar-placeholder' not found.");
                }
            })
            .catch(error => console.error('Error fetching menu:', error));

        fetch('./pages/carrito-recuadro.html')
            .then(response => response.text())
            .then(data => {
                const cartPlaceholder = document.getElementById('cart-placeholder');
                if (cartPlaceholder) {
                    cartPlaceholder.innerHTML = data;
                } else {
                    console.error("Element with ID 'cart-placeholder' not found.");
                }
            })
            .catch(error => console.error('Error fetching cart:', error));

        console.log('Se ha cargado el menú de index.html y carrito para la página principal.');
    } else {
        // Incluye el menú de '/pages/menu-2.html' para el resto de las páginas
        fetch('../pages/menú-2.html') // Ajusta la ruta según la estructura de tu servidor
            .then(response => response.text())
            .then(data => {
                const navbarPlaceholder = document.getElementById('navbar-placeholder');
                if (navbarPlaceholder) {
                    navbarPlaceholder.innerHTML = data;
                } else {
                    console.error("Element with ID 'navbar-placeholder' not found.");
                }
            })
            .catch(error => console.error('Error fetching menu:', error));

        fetch('../pages/carrito-recuadro.html')
            .then(response => response.text())
            .then(data => {
                const cartPlaceholder = document.getElementById('cart-placeholder');
                if (cartPlaceholder) {
                    cartPlaceholder.innerHTML = data;
                } else {
                    console.error("Element with ID 'cart-placeholder' not found.");
                }
            })
            .catch(error => console.error('Error fetching cart:', error));

        console.log('Se ha cargado el menú de otras páginas y carrito.');
    }

    console.log(`\nEsto es el path actual: ${window.location.pathname}`);
    console.log('\n');
});
