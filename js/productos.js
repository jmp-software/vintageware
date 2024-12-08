//  Arreglo con los datos de cada producto
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

// Función para generar las "cards" de los productos cualquier a sea el tamaño del  vector
/*
function generateProductCards() {
    const productCardsContainer = document.getElementById('product-cards');

    products.forEach((product, index) => {
        const cardHTML = `
            <a href="#"  id="add-to-cart" onclick="addToCart('${product.subtitle}',${product.price},'product-count-${index}','${product.image}'); event.preventDefault();">
                <div class="card-item">
                    <img src="${product.image}" alt="${product.subtitle}">
                    <span class="product-counter" id="product-count-${index}">0</span>
                    <h2 class="subtitle" id="product-name">${product.subtitle}</h2>
                    <p class="subtitle2" id="total-price">$${product.price}</p>
                    <p class="subtitle3">AGREGAR AL CARRITO<p/>
                </div>
            </a>        
        `;
        productCardsContainer.innerHTML += cardHTML;
    });
}
*/
// Carga valores desde el almacenamiento local o los inicializa si no encuentra nada
let cartProduct = JSON.parse(localStorage.getItem('cart')) || [];  // Carga el carrito para localStorage o lo inicializa vacío
let priceProduct = parseInt(localStorage.getItem('price')) || 0; // Carga el precio para localStorage o lo inicializa vacío
let unitsProduct = parseInt(localStorage.getItem('units')) || 0; // Carga la cantidad "unidades" para localStorage o lo inicializa vacío
let idProduct = localStorage.getItem('id') || ''; // Carga el "id" para localStorage o lo inicializa vacío
let photoProduct = localStorage.getItem('photo') || ''; // Carga la url de la foto  para localStorage o lo inicializa vacío

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



function hideWidget() {
    console.log(`\nEjecuta widgetCount`);
    for (let a = 0; a < cartProduct.length; a++) {  
        const widgetCount = document.getElementById(`product-count-${a}`).innerHTML;
       // console.log(`\nwidgetCount: ${widgetCount}`);

        if (widgetCount == 0) {
           // console.log(`\nIngresó al primer if de widgetCount`);
            const widgetId = document.getElementById(`product-count-${a}`);
            
            if (widgetId) {
                const buttonSubstractId = document.getElementById(`substract-to-cart-${a}`);
                const buttonAddId = document.getElementById(`add-to-cart-${a}`); 
                console.log(`\nIngresó al segundo if de widgetCount`);

                // Obtiene valor de margin
                const computedMargin = window.getComputedStyle(widgetId).margin; // obtiene el tamaño del marg
                const computedOpacity = window.getComputedStyle(buttonSubstractId).opacity; // obtiene la opacidad del botón de "-"

                // Remueve la unidad 'px' y lo convierte a coma flotante
                const marginValue = parseFloat(computedMargin);
                const opacityValue = parseFloat(computedOpacity);

                //console.log(`Current margin value: ${marginValue}`);

                // substrae 0.01 del valor del margen
                const newMargin = marginValue - 4;
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
                   
                    buttonAddId.style.padding = `15px`;

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

document.addEventListener("DOMContentLoaded", () => {
    hideWidget();
    // Execute hideWidget every 20ms after the DOM is loaded
    setInterval(hideWidget, 30);  
});

window.addEventListener('resize', hideWidget);
window.addEventListener('click', hideWidget);
window.addEventListener('load', hideWidget);

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
generateProductCards();
