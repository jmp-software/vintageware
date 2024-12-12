let flagIndex = false; 
// Chequea si viene de la página index.html
document.addEventListener('DOMContentLoaded', function () {
    // Chequea si viene de la página index.html
    if (window.location.pathname == '/index.html' || window.location.pathname == '/vintageware/' || window.location.pathname == '/vintageware/index.html') {
        flagIndex = true;
        // Incluye el menú de '/pages/menu-1.html' para "index.html"
        fetch('./pages/menú-1.html') // Ajusta el nombre del archivo si es necesario (sin tildes)
            .then(response => response.text())
            .then(data => {
                const navbarPlaceholder = document.getElementById('navbar-placeholder');
                if (navbarPlaceholder) {
                    navbarPlaceholder.innerHTML = data;
                } else {
                    console.log("Elemento con ID 'navbar-placeholder' no encontrado.");
                }
            })
            //.catch(error => console.error('Error haciendo fetch del menú:', error));

        fetch('./pages/carrito-recuadro.html')
            .then(response => response.text())
            .then(data => {
                const cartPlaceholder = document.getElementById('cart-placeholder');
                if (cartPlaceholder) {
                    cartPlaceholder.innerHTML = data;
                } else {
                    console.log("Element with ID 'cart-placeholder' not found.");
                }
            })
        //.catch(error => console.log('No se puede hacer fetch con para el carrito', error));

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
                    console.log("Elemento con ID 'navbar-placeholder' no encontrado.");
                }
            })
            //.catch(error => console.error('Error haciendo fetch del menú:', error));

        fetch('../pages/carrito-recuadro.html')
            .then(response => response.text())
            .then(data => {
                const cartPlaceholder = document.getElementById('cart-placeholder');
                if (cartPlaceholder) {
                    cartPlaceholder.innerHTML = data;
                } else {
                    console.log("Elemento con ID 'cart-placeholder' no encontrado.");
                }
            })
            //.catch(error => console.log('No se puede hacer fetch con para el carrito', error));

        console.log('Se ha cargado el menú de otras páginas y carrito.');
    }

    console.log(`\nEsto es el path actual: ${window.location.pathname}`);
    console.log('\n');
});


// Crea el footer
function generateFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder'); // Se asegura que el elemento exista en el código HTML

    // Chequea si el container ya existe
    if (!footerPlaceholder) {
        console.log('footer-placeholder no se econtró en el DOM.');
        return;
    }

    // Verifica si es del index.html desde un página del subdirectorio /pages/ 
    let place = ``;
    if (flagIndex) {
        place = `.`;
        
    } else { 
        place = `..`;
    }

    const footerHTML = `
        <footer>
            <!--<p class="footer">&copy; 2024 Vintageware. Todos los derechos reservados.</p>-->
            <br><br><br><br><br><br><br><br><br><br>
            <div class="footer-container">
                <div class="grid-container-footer about-us">
                    <br>
                    <h4>Sobre Nosotros</h4>
                    <br>
                    <p>Descubrí el encanto del software clásico con nuestra colección curada de programas retro y vintage.
                        Creemos en
                        preservar la historia digital y proporcionar a los entusiastas las herramientas para disfrutar de lo
                        que aman.</p>
                </div>
                <br>
                <div class="grid-container-footer customer-service">
                    <br>
                    <h4>Servicio al Cliente</h4>
                    <nav class="footer-list">
                        <li><a class="contacto-a" href="${place}/pages/contacto.html">¡Contactanos!</a></li>
                    </nav>
                    <br>
                </div>
                <br>
                <div class="grid-container-footer follow-us">
                    <br>
                    <h4>Seguinos</h4>
                    <p>¡Mantenete conectado y unite a nuestra comunidad!</p>
                    <div class="grid-networks">
                        <div class="grid-item-networks">
                            <a href="https://discord.com/login?redirect_to=%2Fchannels%2F1277650289356177448%2F1277650289356177450" target="_blank">
                                <img src="${place}/assets/art/discord.png" alt="Discord">
                            </a>
                        </div>
                        <div class="grid-item-networks">
                            <a href="https://www.youtube.com/watch?v=Ry8sVXrNPQQ&list=PLtObQyXTcyeH2hrFD9zZ7jv89UtTSsZ2H" target="_blank">
                                <img src="${place}/assets/art/youtube.png" alt="YouTube">
                            </a>
                        </div>
                        <div class="grid-item-networks">
                            <a href="https://www.instagram.com/agenciadehabilidades" target="_blank">
                                <img src="${place}/assets/art/instagram.png" alt="Instagram">
                            </a>
                        </div>
                        <div class="grid-item-networks">
                            <a href="https://www.facebook.com/codoacodooficial" target="_blank">
                                <img src="${place}/assets/art/facebook.png" alt="Facebook">
                            </a>
                        </div>
                        <div class="grid-item-networks">
                            <a href="https://twitter.com/educacionba?lang=es" target="_blank">
                                <img src="${place}/assets/art/twitter.png" alt="Twitter">
                            </a>
                        </div>
                        <div class="grid-item-networks">
                            <a href="https://agenciadeaprendizaje.bue.edu.ar/" target="_blank">
                                <img src="${place}/assets/art/web.png" alt="web">
                            </a>
                        </div>
                    </div>
                    <br>
                </div>
                <br>
                <div class="grid-container-footer payment-methods">
                    <br>
                    <h4>Métodos de Pago</h4>
                    <nav class="footer-list">
                        <li>Visa</li>
                        <li>MasterCard</li>
                        <li>PayPal</li>
                        <li>Bitcoin</li>
                    </nav>
                    <br>
                </div>
            </div>
            <br><br><br>
            <div class="copyright">
                <p>Copyright © 2024 Vintageware Inc. Todos los derechos reservados.</p>
            </div>
        </footer>
    `;

    // Inserta el HTML en el placeholder
    footerPlaceholder.innerHTML = footerHTML;
}

// Llama a la función cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    generateFooter();

    setInterval(generateFooter, 1000);
});


