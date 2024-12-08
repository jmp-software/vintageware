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

if (typeof products == 'undefined') {
    fetch('../json/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            products = data; // Now 'products' is expected to be an array of objects
            console.log(products); // Log the data to verify its structure
            generateProductCards(); // Call the function to generate product cards after data is loaded
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
// Carga valores desde el almacenamiento local o los inicializa si no encuentra nada
let cartProduct = JSON.parse(localStorage.getItem('cart')) || [];  // Carga el carrito para localStorage o lo inicializa vacío
let priceProduct = parseInt(localStorage.getItem('price')) || 0; // Carga el precio para localStorage o lo inicializa vacío
let unitsProduct = parseInt(localStorage.getItem('units')) || 0; // Carga la cantidad "unidades" para localStorage o lo inicializa vacío
let idProduct = localStorage.getItem('id') || ''; // Carga el "id" para localStorage o lo inicializa vacío
let photoProduct = localStorage.getItem('photo') || ''; // Carga la url de la foto  para localStorage o lo inicializa vacío

/*
function generateProductCards() {
    const productCardsContainer = document.getElementById('product-cards');

    products.forEach((product, index) => {
        const cardHTML = `
            
                <div class="card-item">
                    <img src="${product.image}" alt="${product.subtitle}">
                    <span class="add-substract-widget" id="widget-${index}">
                        <a href="#" class="substract-button" id="substract-to-cart-${index}" onclick="substractUnit('${product.subtitle}'); event.preventDefault();">-</a>    
                        <span class="product-counter" id="product-count-${index}">0</span>
                        <a href="#"  class="add-button" id="add-to-cart-${index}" onclick="addToCart('${product.subtitle}',${product.price},'product-count-${index}','${product.image}'); event.preventDefault();">+</a>   
                    </span>
                    
                    <h2 class="subtitle" id="product-name">${product.subtitle}</h2>
                    <p class="subtitle2" id="total-price">$${product.price}</p>
                    <p class="subtitle3">AGREGAR AL CARRITO<p/>
                </div>
              
        `;
        productCardsContainer.innerHTML += cardHTML;
    });
}
*/

function generateProductCards() {
    const productCardsContainer = document.getElementById('product-cards'); // Ensure this element exists in your HTML

    // Check if the container exists
    if (!productCardsContainer) {
        console.log('product-cards not found in the DOM.');
        return;
    }

    // Check if idProduct is an array
    if (typeof products != 'undefined') {
        console.log('products si es un arreglo', (products));
        products.forEach((product, index) => {
            const cardHTML = `
                <div class="card-item">
                    <img src="${product.image}" alt="$document.addEventListener('DOMContentLoaded', () => {
    updateProductUnitDisplay();
    setInterval(updateProductUnitDisplay, 100);
});

window.addEventListener('load', updateProductUnitDisplay);
window.addEventListener('resize', updateProductUnitDisplay);
window.addEventListener('click', updateProductUnitDisplay);{product.subtitle}">
                    <span class="add-substract-widget" id="widget-${index}">
                        <a href="#" class="substract-button" id="substract-to-cart-${index}" onclick="substractUnit('${product.subtitle}'); event.preventDefault();">-</a>    
                        <a href="#"  class="product-counter" id="product-count-${index}" onclick="addToCart('${product.subtitle}', ${product.price}, 'product-count-${index}', '${product.image}'); event.preventDefault();">0</a>   
                        <a href="#" class="add-button" id="add-to-cart-${index}" onclick="addToCart('${product.subtitle}', ${product.price}, 'product-count-${index}', '${product.image}'); event.preventDefault();">+</a>   
                        
                        </span>
                    
                    <h2 class="subtitle" id="product-name">${product.subtitle}</h2>
                    <p class="subtitle2" id="total-price">$${product.price}</p>
                    <p class="subtitle3">AGREGAR AL CARRITO</p>
                </div>
            `;
            productCardsContainer.innerHTML += cardHTML;
        });
    } else {
        console.log('products no es un arreglo', (products));
    }
    generateProductCard();
}

if (typeof products != 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        generateProductCard();
        
        setInterval(generateProductCards, 100);
    });
}

function hideWidget() {
    if (typeof products != 'undefined') {
        for (let a = 0; a < products.length; a++) {
            const buttonSubstractId = document.getElementById(`substract-to-cart-${a}`);
            const productId = document.getElementById(`product-count-${a}`);

            // Check if productId is found
            if (!productId) {
                console.error(`Element with ID product-count-${a} not found.`);
                continue; // Skip to the next iteration if the element is not found
            }

            const widgetCount = productId.innerHTML; // Access innerHTML directly from productId
            console.log(`\nwidgetCount: ${widgetCount}`);
            if (widgetCount == 0) {
                // console.log(`\nIngresó al primer if de widgetCount`);
                const widgetId = document.getElementById(`product-count-${a}`);

                if (widgetId) {

                    const buttonAddId = document.getElementById(`add-to-cart-${a}`);
                    console.log(`\nIngresó al segundo if de widgetCount`);

                    // Obtiene valor de margin
                    const computedMargin = window.getComputedStyle(widgetId).margin; // obtiene el tamaño del marg
                    const computedOpacity = window.getComputedStyle(buttonSubstractId).opacity; // obtiene la opacidad del botón de "-"

                    // Remueve la unidad 'px' y lo convierte a coma flotante
                    const marginValue = parseFloat(computedMargin);
                    const opacityValue = parseFloat(computedOpacity);

                    console.log(`Current margin value: ${marginValue}`);

                    // substrae 0.01 del valor del margen
                    const newMargin = marginValue - 5;
                    const newOpacity = opacityValue - (1 / 6);
                    console.log(`newMargin  = ${newMargin}`);

                    buttonAddId.style.padding = `0px`;
                    // Apply the new margin value if it's greater than -32px (this will ensure it doesn't go too low)


                    if (newMargin > -40) {
                        console.log(`\nIngresó al tercer if de widgetCount`);
                        widgetId.style.margin = `${newMargin}px`;  // Apply the new margin with 'px' unit
                        widgetId.style.opacity = `${newOpacity}`;  // Apply the new margin with 'px' unit
                        buttonSubstractId.style.opacity = `${newOpacity}`;  // Apply the new margin with 'px' unit
                        // console.log(`widgetId.style.margin  = ${widgetId.style.margin}`);
                    } else {
                        buttonAddId.style.paddingLeft = `4px`;
                        buttonAddId.style.paddingRight = `9px`;
                        buttonAddId.style.width = `25px`;

                    }
                }
            } else {

                console.log(`El producto ${a} está en 0`);
                const widgetId = document.getElementById(`product-count-${a}`);
                const buttonSubstractId = document.getElementById(`substract-to-cart-${a}`);
                const buttonAddId = document.getElementById(`add-to-cart-${a}`);

                buttonAddId.style.padding = `0px`;
                widgetId.style.margin = `0px`;
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

