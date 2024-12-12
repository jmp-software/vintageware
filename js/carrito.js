// Carga valores desde el almacenamiento local o los inicializa si no encuentra nada
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Carga el carrito para localStorage o lo inicializa vacío
let price = parseInt(localStorage.getItem('price')) || 0; // Carga el precio para localStorage o lo inicializa vacío
let units = parseInt(localStorage.getItem('units')) || 0; // Carga la cantidad "unidades" para localStorage o lo inicializa vacío
let id = localStorage.getItem('id') || ''; // Carga el "id" para localStorage o lo inicializa vacío
let photo = localStorage.getItem('photo') || ''; // Carga la url de la foto  para localStorage o lo inicializa vacío
let stock = localStorage.getItem('stock') ||0; // Carga la url de la foto  para localStorage o lo inicializa vacío

// Agrega la compra al almacenamiento local y a las variables correspondientes. El límite de compra son 99 unidades.
function addToCart(productName, price, id, photo, stock) {

    // Calcula la cantidad total de unidades de todos los productos agregados al carrito
    let cartUnits = cart.reduce((accumulator, item) => {
        return accumulator + item.units;
    }, 0);
    
    const theProduct = cart.find(item => item.name === productName);
    const productUnits = (theProduct && !isNaN(theProduct.units)) ? theProduct.units : 0;

    // Check if the product was found and if stock is a valid number
    //const unitsNumber = theProduct && !isNaN(theProduct.units) ? parseInt(theProduct.units) : null;*/
    console.log(`Las unidades de este producto son: ${productUnits }`);
    console.log(`El stock de este producto es: ${stock}`);


    
    // Verifica que no supere el tope del stock de unidades de cad producto
    if (productUnits < stock)  {

        // Chquea que el producta exista en el carrito
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            // Si el producto existe, actualiza la cantidad de unidades
            existingProduct.units++;
        } else {
            // Si el producto no existe, lo agrega al carrito
            cart.push({ name: productName, price: price, units: units, id: id, photo: photo, stock: stock });
        }

        // Calcula el precio total sumando todo
        total = units * existingProduct.price; //cart.reduce((acc, item) => acc + (item.price * item.units), 0);

        //console.log(`Producto agregado al carrito: ${productName} | Precio: ${price}`);

        // Salva los datos nuevs del almacenaje local
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('precio', price);
        localStorage.setItem('units', existingProduct.units);
        localStorage.setItem('id', id);
        localStorage.setItem('photo', existingProduct.photo);
        localStorage.setItem('stock', stock);
        
        console.log(`\nURL de la foto de la página del carrito: ${photo}`);
        console.log(`\nUnidad de este producto: ${existingProduct.units}`);
        console.log(`\nEl precio por unidad es: ${price * 1000}`);
        console.log(`\nCantidad total de productos comprados: ${cartUnits}`);

        updateCartDisplay();
    } else {
        console.log(`\n¿cart.length es igual a 99?`);
    }
    updateProductUnitDisplay();
}

//  Actualiza  el conteo de productos
function updateCartDisplay() {
    cartUnits = cart.reduce((accumulator, item) => {
        return accumulator + item.units;
    }, 0);

    const cartCountNavId = document.getElementById('cart-count-nav');
    const cartCountRecuadroId = document.getElementById('cart-count-recuadro');

    if (cartCountNavId) { cartCountNavId.innerHTML = cartUnits || ''; }
    if (cartCountRecuadroId) { cartCountRecuadroId.innerHTML = cartUnits || '0'; }
}

//  Actualiza  precio
/*
function upadetProductUnitNumber() {
    localStorage.getItem('cart', JSON.stringify(cart));
        cart.push({ name: productName, price: price });
 }
*/

// Función para restar una unidad de un producto
function substractUnit(nameOfSubstraction) {
    console.log(`\n id en minuts Unit: ${nameOfSubstraction}`);
    // Chequea que el producto exista en el carrito
    const existingProduct = cart.find(item => item.name == nameOfSubstraction && item.units > 0);
    if (existingProduct) {
        // Si el producto existe, actualiza la cantidad de unidades
        existingProduct.units--;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('units', existingProduct.units);
        //cart.push({ name: productName, price: price, units: units, id: id, photo: photo });

    }
    else {
        console.log(`\n No encontró el producto en minusUnit`);
    }
}

// Si hace click, verifica si es para agrega algún producto al carrito
/*
document.addEventListener("click", function (event) {
    if (event.target.matches("a.add-to-cart")) {
        const productName = event.target.dataset.productId;
        const price = event.target.dataset.price;
        addToCart(productName, price);
    }
});
*/

// Función que esconde el carrito de la esquina de la pantalla si no se ha incluido nada en el carrito
function cartOpacity() {
    let shoppingCart = document.getElementById('shopping-cart');
    if (!shoppingCart) {
        console.log('Elemento shopping-cart no encontrado.');
        return; // Sale de la función si el elmento no es encontrado
    }

    // Calcula cantidad total de unidaes de productos en el carrito
    let totalUnits = cart.reduce((accumulator, item) => {
        return accumulator + (item.units || 0);
    }, 0);

    console.log(`\nContador de productos: >${totalUnits}<`);
    let newOpacity = parseFloat(shoppingCart.style.opacity);
    if (isNaN(newOpacity)) newOpacity = 1.0;

    // Si la uniades son 0, ejecuta animación
    if (totalUnits === 0) {
        if (newOpacity >= 0) {
            shoppingCart.style.opacity = newOpacity - 0.1;
            shoppingCart.style.transform = `scale(${newOpacity})`;
            console.log('\n Opacidad:', (newOpacity));
        }
        console.log('\nEl contador está en cero, ocultando el carrito.');
    } else {
        shoppingCart.style.opacity = '1';
        shoppingCart.style.transform = 'scale(1)';
        console.log('\nEl contador no está en cero, mostrando el carrito.');
    }
}

// Función para generar la página del carrito con el listado de productos
function generateCartProductiList() {
    let totalSale = parseInt(cart.reduce((accumulator, item) => {
        return accumulator + parseInt((item.price * item.units * 1000 || 0));
    }, 0));
    const cartProductList = document.getElementById('productos-carrito-placeholder');
    cartProductList.innerHTML = '';
    //let precioTotal = 0;
    let emptyCarts = true;
    if (cartProductList) {
        cart.forEach((carts, index) => {
            //console.log(`\n URL de la foto de la página del carrito: ${carts.photo}`);
            //precioTotal += parseInt(carts.units * carts.price * 1000);
          
            // Crear el HTML de cada producto en el carrito
            if (carts.units > 0) {
                emptyCarts = false;
                const productHTML = `
                    <div class="product" id="${carts.id}">
                          <img class="product-p-photo" src="${carts.photo}" alt="Photo">
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
        `;

    } else {
        console.log(`\nNo entró al if para generar la página del carrito`);
    }
    if (emptyCarts) {
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

// Actualiza en "productos.html" la muestra en pantalla de la cantidad de unidades de cada producto en cada "card" de la "grid"
function updateProductUnitDisplay() {
    cart.forEach((carts) => {

        //console.log(`\ncarts.id = ${carts.id}`);

        // Verifica que elemento con esa "id" existe
        const productCountElement = document.getElementById(`${carts.id}`);
        if (productCountElement) {
            productCountElement.innerHTML = carts.units;
            //console.log(`\nIngresó al if the updateProductUnitDisplay`);
            //console.log(`\nIndice 0 de la clase es ${productCountElement.innerHTML}`);
        } else {
            //console.log(`\nNo ingresó al if the updateProductUnitDisplay`);
        }
    });
}

console.log(`\n\n`);

// Actualiza en "productos.html" la muestra en pantalla de la cantidad de unidades de cada producto en carrito.html
function updateProductUnitDisplayCarrito() {
    cart.forEach((carts) => {

        console.log(`\ncarts.id = ${carts.id}`);

        // Verifica que elemento con esa "id" existe
        const productCountElement = document.getElementById(`${carts.id}`);
        if (productCountElement) {
            productCountElement.innerHTML = carts.units;
            console.log(`\nIngresó al if the updateProductUnitDisplayCarrito`);
            console.log(`\nIndice 0 de la clase es ${productCountElement.innerHTML}`);
        } else {
            console.log(`\nNO ingresó al if the updateProductUnitDisplay`);
        }
    });
}

console.log(`\n\n`);


// ------------ Eventos en los cuales actualiza la cantidad de productos en cada card de la página productos.html ------------
/*
document.addEventListener("DOMContentLoaded", updateProductUnitDisplay);
window.addEventListener('load', updateProductUnitDisplay);
window.addEventListener('resize', updateProductUnitDisplay);
window.addEventListener('click', updateProductUnitDisplay);
*/
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateProductUnitDisplay();
        setInterval(updateProductUnitDisplay, 30);
    });
} else {
    // Document is already loaded
    window.addEventListener('resize', updateProductUnitDisplay);
    window.addEventListener('click', updateProductUnitDisplay);
}
/*
document.addEventListener('DOMContentLoaded', () => {
    function updateUpdateProductUnitDisplay() {
        updateProductUnitDisplay();
        requestAnimationFrame(updateUpdateProductUnitDisplay);  // Continue calling cartOpacity on each frame
    }

    updateUpdateProductUnitDisplay();  // Start the loop once the DOM is loaded
});
*/


// ------------ Eventos en los cuales actualiza la opacidad del carrito en la esquina de la pantalla del carrito ------------
document.addEventListener('DOMContentLoaded', () => {
    function updateCartOpacity() {
        cartOpacity();
        requestAnimationFrame(updateCartOpacity);  // Continue calling cartOpacity on each frame
    }

    updateCartOpacity();  // Start the loop once the DOM is loaded
});


// ------------ Ejecutar la función tan pronto como sea posible, dependiendo del estado de carga ------------
function initializeCart() {
    // Ejecutar inmediatamente si el DOM está listo
    updateCartDisplay();

    // Usar requestAnimationFrame en lugar de setInterval para una actualización más fluida
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
/*
document.addEventListener('DOMContentLoaded', () => {
    function updateUpdateCartDisplay() {
        updateCartDisplay();
        requestAnimationFrame(updateUpdateCartDisplay);  // Continue calling cartOpacity on each frame
    }

    updateUpdateCartDisplay();  // Start the loop once the DOM is loaded
});
*/


// ------------ Eventos en los genera la lista de procutos en la página del carrito ------------
document.addEventListener("DOMContentLoaded", generateCartProductiList);
window.addEventListener('load', generateCartProductiList);
window.addEventListener('resize', generateCartProductiList);
window.addEventListener('click', generateCartProductiList);
/*
document.addEventListener('DOMContentLoaded', () => {
    function updateGenerateCartProductiList() {
        generateCartProductiList();
        requestAnimationFrame(updateGenerateCartProductiList);  // Continue calling cartOpacity on each frame
    }

    updateGenerateCartProductiList();  // Start the loop once the DOM is loaded
});
*/


// ------------Eventos en los que ejecuta la función para permitir restar productos del carrito ------------
document.addEventListener("DOMContentLoaded", substractUnit);
window.addEventListener('load', substractUnit);
window.addEventListener('resize', substractUnit);
window.addEventListener('click', substractUnit);
