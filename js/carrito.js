// *** Carga valores desde el almacenamiento local o los inicializa si no encuentra nada ***
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Carga el carrito para localStorage o lo inicializa vacío
let name = localStorage.getItem('name') || ''; // Carga el precio para localStorage o lo inicializa vacío
let platform = localStorage.getItem('platform') || ''; // Carga la plataforma para localStorage o lo inicializa vacío
let media = localStorage.getItem('media') || ''; // Carga el medio físico para localStorage o lo inicializa vacío
let price = parseInt(localStorage.getItem('price')) || 0; // Carga el precio para localStorage o lo inicializa vacío
let image = localStorage.getItem('image') || ''; // Carga la url de la foto  para localStorage o lo inicializa vacío
let subtitle = localStorage.getItem('subtitle') || ''; // Carga el nombre más corto
let units = parseInt(localStorage.getItem('units')) || 0; // Carga la cantidad "unidades" del producto (este valor varía) para localStorage o lo inicializa vacío
let id = localStorage.getItem('id') || ''; // Carga el "id" para localStorage o lo inicializa vacío
let stock = localStorage.getItem('stock') || 0; // Carga la url de la foto  para localStorage o lo inicializa vacío


// *** Carga el carrito desde el archivo JSON en un arreglo para usar con los datos que no varían **
let directoryLevel = '..';
if (window.location.pathname == '/index.html' || window.location.pathname == '/vintageware/' || window.location.pathname == '/vintageware/index.html') {
    directoryLevel = '.';
}

 let cartFixData = [];

// *** Función para cargar los productos desde el archivo JSON **
async function loadProducts() {
    try {
        const response = await fetch(directoryLevel + '/json/products.json'); // Carga el archivo JSON
        const data = await response.json(); // Convierte la respuesta a JSON
        cartFixData = data.products; // Asigna los productos al carrito
    } catch (error) {
        //console.log('Error al cargar los productos:');
    }
}

// Llama a la función para cargar los productos
loadProducts();

// ***  Función para presentar la ventana modal con el límite de stock ***
function stockModal(productName, text) {

    // Obtiene cantidad en stock e imagen del producto a través del nombre como referencia
    const theProduct = products.find(item => item.name === productName);
    //const productStock = (theProduct && !isNaN(theProduct.stock)) ? theProduct.stock : 0;
    var productImage = '';
    var productStock = 0;
    var productImage = '';
    if (theProduct) {
        var productImage = theProduct.image;
        var productStock = theProduct.stock;
    }

    if (theProduct) {
        // Crea el elemento modal
        const modal = document.createElement('div');
        modal.classList.add('modal');

        // Crea el contenido mal
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Agrega imagen y texto 
        const modalText = document.createElement('p');
        modalText.innerHTML = `
       <br>
       <img class="modal-image" src="${productImage}">
       <p class="modal-name">${productName}</p>
       <p class="moda-text-stock">${text}</p>
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

        // Agrega el contenido modal al elmento
        modal.appendChild(modalContent);

        // Agrega la ventana modal al documento
        document.body.appendChild(modal);

        // Muestra la ventana modal
        modal.style.display = 'block';
    }
}

// *** Agrega la compra al almacenamiento local y a las variables correspondientes. El límite de compra son 99 unidades ***
function addToCart(productName, price, id, image, stock) {

    // Calcula la cantidad total de unidades de todos los productos agregados al carrito
    let cartUnits = cart.reduce((accumulator, item) => {
        return accumulator + item.units;
    }, 0);

    const theProduct = cart.find(item => item.name === productName);
    const productUnits = (theProduct && !isNaN(theProduct.units)) ? theProduct.units : 0;

    const theProductFix = cartFixData.find(item => item.name === productName);
    const productSubtitle = (isNaN(theProductFix.subtitle)) ? theProductFix.subtitle : '';
    //console.log(`El "subtitle" es: ${productSubtitle}`);

    stock = parseInt(stock);

    // Chequea si el prioducto fue encontrado y si el stock es un número válido
    //console.log(`Las unidades de este producto son: ${productUnits}`);
    //console.log(`El stock de este producto es: ${stock}`);

    // Verifica que no supere el tope del stock de unidades de cad producto
    if (productUnits < stock) {

        // Chquea que el producta exista en el carrito
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            // Si el producto existe, actualiza la cantidad de unidades
            existingProduct.units++;
        } else {
            // Si el producto no existe, lo agrega al carrito
            cart.push({ name: productName, price: price, units: 0, id: id, image: image, subtitle: productSubtitle, stock: stock });
        }

        // Calcula el precio total sumando todo
        total = units * price; //cart.reduce((acc, item) => acc + (item.price * item.units), 0);

        // Salva los datos nuevs del almacenaje local
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('precio', price);
        localStorage.setItem('image', image);
        localStorage.setItem('subtitle', productSubtitle);
        localStorage.setItem('units', productUnits);
         localStorage.setItem('id', id);

        //console.log(`\nURL de la foto de la página del carrito: ${image}`);
        //console.log(`\nUnidad de este producto: ${productUnits}`);
        //console.log(`\nEl precio por unidad es: ${price * 1000}`);
        //console.log(`\nCantidad total de productos comprados: ${cartUnits}`);

        updateCartDisplay();
    } else {
        stockModal(productName, '¡Alcanzó el total en stock!');
        //console.log(`\n${productName} alcanzó el límite del stock (modal). Su stock es ${stock}`);
    }
    updateProductUnitDisplay();
}

// *** Actualiza  el conteo de productos  ***
function updateCartDisplay() {
    cartUnits = cart.reduce((accumulator, item) => {
        return accumulator + item.units;
    }, 0);

    const cartCountNavId = document.getElementById('cart-count-nav');
    const cartCountRecuadroId = document.getElementById('cart-count-recuadro');

    if (cartCountNavId) { cartCountNavId.innerHTML = cartUnits || ''; }
    if (cartCountRecuadroId) { cartCountRecuadroId.innerHTML = cartUnits || '0'; }
}

// *** Función para restar una unidad de un producto ***
function substractUnit(nameOfSubstraction) {
    //console.log(`\n id en minuts Unit: ${nameOfSubstraction}`);
    // Chequea que el producto exista en el carrito
    const existingProduct = cart.find(item => item.name == nameOfSubstraction && item.units > 0);
    if (existingProduct) {
        // Si el producto existe, actualiza la cantidad de unidades
        existingProduct.units--;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('units', existingProduct.units);
    }
    else {
        //console.log(`\n No encontró el producto en susbstactUnit`);
    }
}

// *** Función que esconde el carrito de la esquina de la pantalla si no se ha incluido nada en el carrito  ***
function cartOpacity() {
    let shoppingCart = document.getElementById('shopping-cart');
    if (!shoppingCart) {
        //console.log('Elemento shopping-cart no encontrado.');
        return; // Sale de la función si el elmento no es encontrado
    }

    // Calcula cantidad total de unidaes de productos en el carrito
    let totalUnits = cart.reduce((accumulator, item) => {
        return accumulator + (item.units || 0);
    }, 0);

    //console.log(`\nContador de productos: >${totalUnits}<`);
    let newOpacity = parseFloat(shoppingCart.style.opacity);
    if (isNaN(newOpacity)) newOpacity = 1.0;

    // Si la uniades son 0, ejecuta animación
    if (totalUnits === 0) {
        if (newOpacity >= 0) {
            shoppingCart.style.opacity = newOpacity - 0.1;
            shoppingCart.style.transform = `scale(${newOpacity})`;
            //console.log('\n Opacidad:', (newOpacity));
        }
        //console.log('\nEl contador está en cero, ocultando el carrito.');
    } else {
        shoppingCart.style.opacity = '1';
        shoppingCart.style.transform = 'scale(1)';
        //console.log('\nEl contador no está en cero, mostrando el carrito.');
    }
}

// *** Función para generar la página del carrito con el listado de productos ***
function generateCartProductiList() {
    /*loadProducts();*/
    let totalSale = parseInt(cart.reduce((accumulator, item) => {
        return accumulator + parseInt((item.price * item.units * 1000 || 0));
    }, 0));
    const cartProductList = document.getElementById('productos-carrito-placeholder');

    let emptyCarts = true;
    if (cartProductList) {
        cartProductList.innerHTML = '';
        cart.forEach((carts, index) => {
            
            // Crear el HTML de cada producto en el carrito
            if (carts.units > 0) {
                emptyCarts = false;
                const productHTML = `
                    <div class="product" id="${carts.id}">
                          <img class="product-p-photo" src="${carts.image}" alt="Photo">
                          <p class="product-name">${carts.subtitle}</p>
                          <a href="#" class="substract-button" id="substract-to-cart-${index}" onclick="substractUnit('${carts.name}'); event.preventDefault();">
                               <span class="substract-widget" id="widget-${index}">
                                 <input type="button" value="-"  class="substract-product-cart">    
                               <span class="cart-counter" id="product-count-${index}">${carts.units}</span>
                         </a>
                    </div >
              
                `; cartProductList.innerHTML += productHTML;
            }
        });
        cartProductList.innerHTML = `<div class="grid-container-products" id="product-p-photo">` + cartProductList.innerHTML + `</div>`;
        cartProductList.innerHTML += `
             <div class="total-price">
                <p class="total-pesos">$${totalSale}</p>
             </div >
        `;
        cartProductList.innerHTML += `
             <div class="buy-button-div">
                <button  class="buy-button" id="comprar">
                   <p class="texto-comprar">¡COMPRAR!</p>
                   <img class="imagen-compra" src="../assets/art/thumb.png" alt="Photo">
                </button>
             </div >
             <div class="empty-button-div">
                <label class="empty-button" id="empty" onclick="emptyCart()">
                   <p class="texto-vaciar">VACIAR CARRITO</p>
                  <img class="imagen-compra" src="../assets/art/thumb_down.png" alt="Photo">
               </label>
             </div>
        `;

    } else {
        //console.log(`\nNo entró al if para generar la página del carrito`);
    }
    if (emptyCarts && cartProductList) {
        cartProductList.innerHTML = ""
        const productHTML = `
            <div class="grid-container-empty" id="product-empty"
                 <div class="product" id="empty-product">
                       <img class="turle-photo" src="../favicon.png" alt="Photo">
                       <label id="no-product">Carrito vacío :(</label>
                    </div >
            </div >
     `; cartProductList.innerHTML += productHTML;
    }
}

// *** Función Actualiza en "productos.html" la muestra en pantalla de la cantidad de unidades de cada producto en cada "card" de la "grid" ***
function updateProductUnitDisplay() {
    cart.forEach((carts) => {

        // Verifica que elemento con esa "id" existe
        const productCountElement = document.getElementById(`${carts.id}`);
        if (productCountElement) {
            productCountElement.innerHTML = carts.units;
        } else {
            //console.log(`\nNo ingresó al if the updateProductUnitDisplay`);
        }
    });
}

//console.log(`\n\n`);

// *** Función que actualiza en "productos.html" la muestra en pantalla de la cantidad de unidades de cada producto en carrito.html ***
function updateProductUnitDisplayCarrito() {
    cart.forEach((carts) => {

        //console.log(`\ncarts.id = ${carts.id}`);

        // Verifica que elemento con esa "id" existe
        const productCountElement = document.getElementById(`${carts.id}`);
        if (productCountElement) {
            productCountElement.innerHTML = carts.units;
            //console.log(`\nIngresó al if the updateProductUnitDisplayCarrito`);
            //console.log(`\nIndice 0 de la clase es ${productCountElement.innerHTML}`);
        } else {
            //console.log(`\nNO ingresó al if the updateProductUnitDisplay`);
        }
    });
}

//console.log(`\n\n`);

//
function emptyCart() {
    localStorage.clear();
    location.reload();
}


// ------------ Eventos en los cuales actualiza la cantidad de productos en cada card de la página productos.html ------------
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateProductUnitDisplay();
        setInterval(updateProductUnitDisplay, 30);
    });
} else {
    // El documento ya está cargado
    window.addEventListener('resize', updateProductUnitDisplay);
    window.addEventListener('click', updateProductUnitDisplay);
}


// ------------ Eventos en los cuales actualiza la opacidad del carrito en la esquina de la pantalla del carrito ------------
document.addEventListener('DOMContentLoaded', () => {
    function updateCartOpacity() {
        cartOpacity();
        requestAnimationFrame(updateCartOpacity);  // Llama a cartOpacity en cada frame
    }

    updateCartOpacity();  // Comienza el bucle cuando el DOM está ya carago 
});


// ------------ Ejecutar la función tan pronto como sea posible, dependiendo del estado de carga ------------
function initializeCart() {
    // Ejecutar inmediatamente si el DOM está listo
    updateCartDisplay();

    // Uso "requestAnimationFrame" en vez de "setInterval" porque la actualización se hace más fluida
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Usar requestAnimationFrame para actualizaciones suaves
            function updateLoop() {
                updateCartDisplay();
                requestAnimationFrame(updateLoop);  // Repetir en el siguiente cuadro de animación
            }
            requestAnimationFrame(updateLoop);

            // Agregar los eventos para resize y click
            window.addEventListener('resize', updateCartDisplay);
            window.addEventListener('click', updateCartDisplay);
        });
    } else {
        // Si ya está cargado, solo agregar los eventos
        function updateLoop() {
            updateCartDisplay();
            requestAnimationFrame(updateLoop);  // Repetir en el siguiente cuadro de animación
        }
        requestAnimationFrame(updateLoop);

        window.addEventListener('resize', updateCartDisplay);
        window.addEventListener('click', updateCartDisplay);
    }
}
// Llamar a initializeCart para iniciar
initializeCart();


// ------------ Eventos en los genera la lista de procutos en la página del carrito ------------
/*
document.addEventListener('DOMContentLoaded', () => {
    generateCartProductiList(); // Ensure it's fired when the DOM is ready
});
window.addEventListener('load', generateCartProductiList);
window.addEventListener('resize', generateCartProductiList);
window.addEventListener('click', generateCartProductiList);*/
document.addEventListener('DOMContentLoaded', () => {
    generateCartProductiList(); // Ensure it's fired when the DOM is ready
});
document.addEventListener("DOMContentLoaded", generateCartProductiList);
window.addEventListener('load', generateCartProductiList);
window.addEventListener('resize', generateCartProductiList);
window.addEventListener('click', generateCartProductiList);

// ------------Eventos en los que ejecuta la función para permitir restar productos del carrito ------------
document.addEventListener("DOMContentLoaded", substractUnit);
window.addEventListener('load', substractUnit);
window.addEventListener('resize', substractUnit);
window.addEventListener('click', substractUnit);
