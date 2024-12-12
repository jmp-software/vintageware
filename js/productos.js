//  Arreglo con los datos de cada producto
/*
const products = [
    {
        name: 'Microsoft Windows 3.1',
        platform: 'MS-DOS 6.22',
        media: 'disquetes de 3½',
        price: '30.250',
        image: '../assets/photos/photo-1.jpg',
        subtitle: 'Windows 3.1'
    },
    {
        name: 'Commander Keen 4',
        platform: 'MS-DOS',
        media: 'disquetes de 3½',
        price: '88.000',
        image: '../assets/photos/photo-2.png',
        subtitle: 'Commander Keen 4'
    },
    {
        name: 'Logo Programming Language',
        platform: 'Commodore 64',
        media: 'Cartucho',
        price: '56.500',
        image: '../assets/photos/photo-3.jpg',
        subtitle: 'Commodore Logo Programming Language'
    },
    {
        name: 'Paint Shop Pro',
        platform: 'Windows 3.1 o superior',
        media: 'disquetes de 3½',
        price: '63.650',
        image: '../assets/photos/photo-4.jpg',
        subtitle: 'Paint Shop Pro'
    }
];
*/

function generateProductCards() {
    const productCardsContainer = document.getElementById('product-cards');

    // Check if the container exists
    if (!productCardsContainer) {
        console.log('product-cards not found in the DOM.');
        return;
    }

    // Check if the 'products' array exists and is not empty
    if (Array.isArray(products) && products.length > 0) {
        products.forEach((product, index) => {
            const cardHTML = `
                <div class="card-item">
                    <span type="button" onclick="reseñaModal('${product.name}','${product.subtitle3}')">
                        <img src="${product.image}" alt="${product.subtitle}">
                    </span>
                    <span class="add-substract-widget" id="widget-${index}">
                        <input type="button" value="-" class="product-state-button substract-button" id="substract-to-cart-${index}" onclick="substractUnit('${product.subtitle}');">
                        <a href="#" class="product-counter" id="product-count-${index}" onclick="addToCart('${product.subtitle}', ${product.price}, 'product-count-${index}', '${product.image}',  '${product.stock}'); event.preventDefault();">0</a>
                        <input type="button" value="+" class="product-state-button add-button" id="add-to-cart-${index}" onclick="addToCart('${product.subtitle}', ${product.price}, 'product-count-${index}', '${product.image}', '${product.stock}'); event.preventDefault();">
                    </span>
                    <h2 class="subtitle" id="product-name">${product.subtitle}</h2>
                    <p class="subtitle2" id="total-price">$${product.price}</p>
                    <a href="#" class="add-button-text" onclick="addToCart('${product.subtitle}', ${product.price}, 'product-count-${index}', '${product.image}', '${product.stock}'); event.preventDefault();"><p class="subtitle3">AGREGAR AL CARRITO</p></a>
                </div>
            `;
            productCardsContainer.innerHTML += cardHTML;
        });
    } else {
        console.log('El arreglo "roducts" no está vacío');
    }
}

// Verifica si ya existe el arreglo products
if (typeof products == 'undefined') {
    fetch('../json/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            products = data.products; // Ahora convierte a "products" en un arreglo the objetos
            console.log(products); // Imprime en la consola la estructura de datos
            generateProductCards(); // Llama a la función para generar las "cards"
        });
    //.catch(error => {
    //    console.error('No se pudo hacer el fetch:', error);
    // });
}
// Carga valores desde el almacenamiento local o los inicializa si no encuentra nada
/*
let cartProduct = JSON.parse(localStorage.getItem('cart')) || [];  // Carga el carrito para localStorage o lo inicializa vacío
let nameProduct = localStorage.getItem('name') || ''; // Carga el precio para localStorage o lo inicializa vacío
let platformProduct = localStorage.getItem('platform') || ''; // Carga el precio para localStorage o lo inicializa vacío
let mediaProduct = localStorage.getItem('media') || ''; // Carga el precio para localStorage o lo inicializa vacío
let priceProduct = parseInt(localStorage.getItem('price')) || 0; // Carga el precio para localStorage o lo inicializa vacío
let photoProduct = localStorage.getItem('image') || ''; // Carga la url de la foto  para localStorage o lo inicializa vacío
let unitsProduct = parseInt(localStorage.getItem('units')) || 0; // Carga la cantidad "unidades" para localStorage o lo inicializa vacío
let idProduct = localStorage.getItem('id') || ''; // Carga el "id" para localStorage o lo inicializa vacío
let stockProduct = localStorage.getItem('stock') || 0; // Carga la url de la foto  para localStorage o lo inicializa vacío
*/
// Si el arreglo de objetos "products" existe, establece el modo de ejecución de la función para generar las "cards" de los productos
if (typeof products != 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        generateProductCard();
        setInterval(generateProductCards, 100);
    });
}

// Animación del botón para agregar y sacar productos del carrito en la página de "products.html"
function hideWidget() {
    if (typeof products != 'undefined') {
        for (let a = 0; a < products.length; a++) {
            const buttonSubstractId = document.getElementById(`substract-to-cart-${a}`);
            const productId = document.getElementById(`product-count-${a}`);

            // Chequea existencia del id del producto
            if (!productId) {
                //console.error(`\nElemento con ID product-count-${a} no encontrado.`);
                continue; // Se saltea la iteración si el producto no es encontrado
            }

            const widgetCount = productId.innerHTML; // Accessa innerHTML directament con "productId"
            //console.log(`\nwidgetCount: ${widgetCount}`);
            if (widgetCount == 0) {
                // console.log(`\nIngresó al primer if de widgetCount`);
                const widgetId = document.getElementById(`product-count-${a}`);

                if (widgetId) {
                    const buttonAddId = document.getElementById(`add-to-cart-${a}`);
                    //console.log(`\nIngresó al segundo if de widgetCount`);
                    // Obtiene valor de margenes
                    const computedMargin = window.getComputedStyle(widgetId).margin; // obtiene el tamaño del marg
                    const computedOpacity = window.getComputedStyle(buttonSubstractId).opacity; // obtiene la opacidad del botón de "-"

                    // Remueve la unidad 'px' y lo convierte a coma flotante
                    const marginValue = parseFloat(computedMargin);
                    const opacityValue = parseFloat(computedOpacity);

                    // console.log(`\nValor actual del margen: ${marginValue}`);

                    // Substrae unidades del valor del margen y opacidad (unidades y el "-") 
                    const newMargin = marginValue - 4;
                    const newOpacity = opacityValue - (1 / 6);
                    //console.log(`\nnewMargin  = ${newMargin}`);

                    buttonAddId.style.padding = `0px`;

                    // Aplica el nuevo margen si su valor es mayor a -28
                    if (newMargin > -28) {
                        //console.log(`\nIngresó al tercer if de widgetCount`);
                        widgetId.style.margin = `${newMargin}px`;  // Aplica el nuevo margen en píxeles al ide del "widget"
                        widgetId.style.opacity = `${newOpacity}`;  // Aplica la nueva opacidad al ide del "widget"
                        buttonSubstractId.style.opacity = `${newOpacity}`;  // Aplica la nueva opacidad al botón "-"
                        buttonSubstractId.display = `none`;  // Deja el atributo display del botón "-" en "none"
                        buttonAddId.style.padding = `0`; // Deja el atributo de padding  del botón "-" en "0"
                        //buttonSubsctractId.style.padding = `0`;
                        //buttonAddId.style.transform = `scale(1)`;
                        //console.log(`widgetId.style.margin  = ${widgetId.style.margin}`);
                    } else {

                        buttonAddId.style.marginLeft = `-.25rem`;
                        buttonAddId.style.marginRight = `.5rem`;
                        //buttonAddId.style.width = `1.5rem`;
                        //buttonAddId.style.zIndex = `1000`;

                        buttonAddId.style.paddingLeft = `.4rem`;
                        buttonAddId.style.paddingRight = `1.9rem`;
                        //buttonAddId.style.width = `20px`;*/
                    }
                }
            } else {

                console.log(`\nEl producto ${a} está en 0`);

                const widgetId = document.getElementById(`product-count-${a}`);
                const buttonSubstractId = document.getElementById(`substract-to-cart-${a}`);
                const buttonAddId = document.getElementById(`add-to-cart-${a}`);

                widgetId.style.margin = `0px`;

                buttonSubstractId.style.width = ` 1.5rem`;
                buttonAddId.style.width = ` 1.5rem`;

                buttonSubstractId.style.padding = `.25rem`;
                buttonAddId.style.padding = ` .25rem`;

                buttonSubstractId.style.margin = `.15rem`;
                buttonAddId.style.margin = ` .15rem`;

                buttonSubstractId.style.transformScale = `scale(.75)`;
                buttonAddId.style.transformScale = `scale(.75)`;

                buttonSubstractId.style.opacity = `1`;
                widgetId.style.opacity = `1`;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    hideWidget();
    setInterval(hideWidget, 30);
});

function reseñaModal(productName, text) {

    // Obtiene cantidad en stock e imagen del producto a través del nombre como referencia
    const theProduct = products.find(item => item.name === productName);
    const productStock = (theProduct && !isNaN(theProduct.stock)) ? theProduct.stock : 0;
    var productImage = '';
    if (theProduct) {
        var productImage = theProduct.image;
    }

    if (theProduct) {
        // Create the modal element
        const modal = document.createElement('div');
        modal.classList.add('modal');

        // Create the modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Add the product name and text to the modal content
        const modalText = document.createElement('p');
        modalText.innerHTML = `
    <br>
    <img class="modal-image" src="${productImage}">
    <p class="modal-name">${productName}</p>
    <p class="moda-text">${text}</p>
    <p class="modal-stock">STOCK: ${productStock}</p>
    `; // Add text
        modalContent.appendChild(modalText);

        // Add a close button
        const closeButton = document.createElement('span');
        closeButton.classList.add('close');
        closeButton.textContent = '×';
        closeButton.onclick = function () {
            modal.style.display = 'none';
        };
        modalContent.appendChild(closeButton);

        // Add the modal content to the modal element
        modal.appendChild(modalContent);

        // Add the modal to the document
        document.body.appendChild(modal);

        // Show the modal
        modal.style.display = 'block';
    }
}

/*
window.addEventListener('load', updateProductUnitDisplay);
window.addEventListener('resize', updateProductUnitDisplay);
window.addEventListener('click', updateProductUnitDisplay);
*/
/*
window.addEventListener('resize', hideWidget);
window.addEventListener('click', hideWidget);
window.addEventListener('load', hideWidget);
*/
/*
window.addEventListener('resize', hideWidget);
window.addEventListener('click', hideWidget);
*/

/*
const grid1 = document.getElementById('product-p-form');
const grid2 = document.getElementById('product-p-photo');
grid2.style.width = `${grid1.offsetWidth}px`;
*/

//<span id="product-count-${index}">0</span>
// Función para generar las "cards" de cada producto