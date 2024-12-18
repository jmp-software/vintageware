let firstFrame = true;

// *** Función que  genera la hileras de cards de cada producto en "producto.html" ***
function generateProductCards() {
    const productCardsContainer = document.getElementById('product-cards');

    //  Verifica que existe el container
    if (!productCardsContainer) {
        //console.log('product-cards no encontrado en el DOM.');
        return;
    }

    // Verifica si el arreglo "products" existe y está vacío  
    if (Array.isArray(products) && products.length > 0) {
        let cartProducts = JSON.parse(localStorage.getItem('cart')) || []; //  carga "cartProductos" (el carrito de productos) desde localStorage o lo inicializa vacío
        let units = parseInt(localStorage.getItem('units')) || 0; // Carga la cantidad de unidades de cada producto en "units" (este valor es el único que varía) desde localStorage o lo inicializa vacío

        console.log(`\nListado de productos:\n\n`)
        products.forEach((product, index) => {
            const cardHTML = `
                <div class="card-item">
                    <span type="button" onclick="reseñaModal('${product.name}','${product.subtitle3}')">
                        <img src="${product.image}" alt="${product.subtitle}">
                    </span>
                    <span class="add-substract-widget" id="widget-${index}">
                        <input type="button" value="-" class="product-state-button substract-button" id="substract-to-cart-${index}" onclick="substractUnit('${product.name}');">
                        <a href="#" class="product-counter" id="product-count-${index}" onclick="addToCart('${product.name}', ${product.price}, 'product-count-${index}', '${product.image}',  '${product.stock}'); event.preventDefault();">0</a>
                        <input type="button" value="+" class="product-state-button add-button" id="add-to-cart-${index}" onclick="addToCart('${product.name}', ${product.price}, 'product-count-${index}', '${product.image}', '${product.stock}'); event.preventDefault();">
                    </span>
                    <h2 class="subtitle" id="product-name">${product.subtitle}</h2>
                    <p class="subtitle2" id="total-price">$${product.price}</p>
                    <a href="#" class="add-button-text" onclick="addToCart('${product.name}', ${product.price}, 'product-count-${index}', '${product.image}', '${product.stock}'); event.preventDefault();"><p class="subtitle3">AGREGAR AL CARRITO</p></a>
                </div>
            `;
            productCardsContainer.innerHTML += cardHTML;
            console.log(`Producto ${index + 1}: ${product.subtitle}`)
            /*
             var productId = document.getElementById(`product-count-${index}`);
             if (productId) {
                 const innerHtml = productId.innerHTML;
                 console.log(`Producto ${index + 1} en unidades: ${innerHtml}`);
             }
             */
        });
    } else {
        //console.log('El arreglo "roducts" no está vacío');
    }
}

//  ***  Verifica si ya existe el arreglo products, de no ser así lo inicializa con datos del archivo json  *** 
if (typeof products == 'undefined') {
    fetch('../json/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('La red no responde.');
            }
            return response.json();
        })
        .then(data => {
            products = data.products; // Ahora convierte a "products" en un arreglo the objetos
            //console.log(products); // Imprime en la consola la estructura de datos
            generateProductCards(); // Llama a la función para generar las "cards"
        });
    //.catch(error => {
    //    console.error('No se pudo hacer el fetch:', error);
    // });
}

//  ***  Si el arreglo de objetos "products" existe, establece el modo de ejecución de la función para generar las "cards" de los productos *** 
if (typeof products != 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        generateProductCard();
        setInterval(generateProductCards, 100);
    });
}

//  ***  Animación del botón para agregar y sacar productos del carrito en la página de "products.html"  *** 
function hideWidget() {

    if (typeof products != 'undefined') {

        for (var a = 0; a < products.length; a++) {
            const buttonSubstractId = document.getElementById(`substract-to-cart-${a}`);
            const buttonAddId = document.getElementById(`add-to-cart-${a}`);
            const buttonCountId = document.getElementById(`product-count-${a}`);

            // Chequea existencia del id del producto
            if (!buttonCountId) {
                continue; // Se saltea la iteración si el producto no es encontrado
            }

            const widgetCount = buttonCountId.innerHTML; // Accessa innerHTML directament con "productId"

            if (widgetCount == '0') {
                //const widgetId = document.getElementById(`product-count-${a}`);

                if (buttonCountId) {
                    //const buttonAddId = document.getElementById(`add-to-cart-${a}`);

                    // Obtiene valor de margenes
                    const computedMargin = window.getComputedStyle(buttonCountId).margin; // obtiene el tamaño del marg
                    const computedOpacity = window.getComputedStyle(buttonSubstractId).opacity; // obtiene la opacidad del botón de "-"

                    // Remueve la unidad 'px' y lo convierte a coma flotante
                    const marginValue = parseFloat(computedMargin);
                    const opacityValue = parseFloat(computedOpacity);

                    // Substrae unidades del valor del margen y opacidad (unidades y el "-") 
                    const newMargin = marginValue - 4;
                    const newOpacity = opacityValue - (1 / 6);

                    buttonAddId.style.padding = `0px`;

                    // Aplica el nuevo margen si su valor es mayor a -28
                    if (newMargin > -28) {
                        buttonCountId.style.margin = `${newMargin}px`;  // Aplica el nuevo margen en píxeles al ide del "widget"
                        buttonCountId.style.opacity = `${newOpacity}`;  // Aplica la nueva opacidad al ide del "widget"
                        buttonSubstractId.style.opacity = `${newOpacity}`;  // Aplica la nueva opacidad al botón "-"
                        buttonSubstractId.display = `none`;  // Deja el atributo display del botón "-" en "none"
                        buttonAddId.style.padding = `0`; // Deja el atributo de padding  del botón "-" en "0"
                        localStorage.setItem(`item_${a}`, JSON.stringify(true));
                    } else {

                        isAddToCartEnabled = false;
                        buttonAddId.style.marginLeft = `-.25rem`;
                        buttonAddId.style.marginRight = `.5rem`;
                        buttonAddId.style.paddingLeft = `.4rem`;
                        buttonAddId.style.paddingRight = `1.9rem`;
                        buttonAddId.style.witdth = `16rem`;
                    }
                }
            } else {

                //console.log(`\nEl producto ${a} está en 0`);

                //const widgetId = document.getElementById(`product-count-${a}`);
                //const buttonSubstractId = document.getElementById(`substract-to-cart-${a}`);
                //const buttonAddId = document.getElementById(`add-to-cart-${a}`);

                buttonCountId.style.margin = `0px`;

                buttonSubstractId.style.width = ` 1.5rem`;
                buttonAddId.style.width = ` 1.5rem`;

                buttonSubstractId.style.padding = `.25rem`;
                buttonAddId.style.padding = ` .25rem`;

                buttonSubstractId.style.margin = `.15rem`;
                buttonAddId.style.margin = ` .15rem`;

                buttonSubstractId.style.transformScale = `scale(.75)`;
                buttonAddId.style.transformScale = `scale(.75)`;

                buttonSubstractId.style.opacity = `1`;
                buttonCountId.style.opacity = `1`;
            }

        }

        // console.groupEnd();

    }
}

// *** Función para mostar ventana modal con reseña ***
function reseñaModal(productName, text) {

    // Obtiene cantidad en stock e imagen del producto a través del nombre como referencia
    const theProduct = products.find(item => item.name === productName);
    const productStock = (theProduct && !isNaN(theProduct.stock)) ? theProduct.stock : 0;
    var productImage = '';
    if (theProduct) {
        var productImage = theProduct.image;
    }

    if (theProduct) {
        // Crea el elemento modal
        const modal = document.createElement('div');
        modal.classList.add('modal');

        // Crea el contenido modal
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Reemplaza asteriscos con comillas en el nombre largo de producto
        const formattedProductName = productName.replace(/\*/g, '"');

        // Agrega imagen y texto 
        const modalText = document.createElement('p');
        modalText.innerHTML = `
        <br>
        <img class="modal-image" src="${productImage}">
        <p class="modal-name">${formattedProductName}</p>
        <p class="modal-text">${text}</p>
        <p class="modal-stock">STOCK: ${productStock}</p>
    `; // Add text
        modalContent.appendChild(modalText);

        // Agrega botón de cierre
        const closeButton = document.createElement('span');
        closeButton.classList.add('close');
        closeButton.textContent = '×';
        closeButton.onclick = function () {
            modal.style.display = 'none';
        };
        modalContent.appendChild(closeButton);

        // Agrega el contenido modal al elemento
        modal.appendChild(modalContent);

        // Agrega la ventana modal al documento
        document.body.appendChild(modal);

        // Muestra la ventana modal
        modal.style.display = 'block';
    }

}


// ------------ Eventos en los cuales verifica si tiene que ejecutar hideWidget ------------
document.addEventListener('DOMContentLoaded', () => {
    hideWidget();
    setInterval(hideWidget, 30);
});