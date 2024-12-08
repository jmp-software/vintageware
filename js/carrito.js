// Carga valores desde el almacenamiento local o los inicializa si no encuentra nada
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Carga el carrito para localStorage o lo inicializa vacío
let price = parseInt(localStorage.getItem('price')) || 0; // Carga el precio para localStorage o lo inicializa vacío
let units = parseInt(localStorage.getItem('units')) || 0; // Carga la cantidad "unidades" para localStorage o lo inicializa vacío
let id = localStorage.getItem('id') || ''; // Carga el "id" para localStorage o lo inicializa vacío
let photo = localStorage.getItem('photo') || ''; // Carga la url de la foto  para localStorage o lo inicializa vacío

// Agrega la compra al almacenamiento local y a las variables correspondientes. El límite de compra son 99 unidades.
function addToCart(productName, price, id, photo) {
    let cartUnits = cart.reduce((accumulator, item) => {
        return accumulator + item.units;
    }, 0);

    if (cartUnits < 99) {

        // Chquea que el producta exista en el carrito
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            // Si el producto existe, actualiza la cantidad de unidades
            existingProduct.units++;
        } else {
            // Si el producto no exite, lo agrega al carrito
            cart.push({ name: productName, price: price, units: units, id: id, photo: photo });
        }

        // Calcula el precio
        total = units * existingProduct.price; //cart.reduce((acc, item) => acc + (item.price * item.units), 0);

        //console.log(`Producto agregado al carrito: ${productName} | Precio: ${price}`);

        // Salva los datos nuevs del almacenaje local
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('precio', price);
        localStorage.setItem('units', existingProduct.units);
        localStorage.setItem('id', id);
        localStorage.setItem('photo', existingProduct.photo);
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

    document.getElementById('cart-count-nav').innerHTML = cartUnits || '';
    document.getElementById('cart-count-recuadro').innerHTML = cartUnits || '';
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
    // Chquea que el producta exista en el carrito
    const existingProduct = cart.find(item => item.name == nameOfSubstraction && item.units > 0);
    if (existingProduct) {
        // Si el producto existe, actualiza la cantidad de unidades
        existingProduct.units--;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('units', existingProduct.units);
    }
    else {
        console.log(`\n No encontró el producto en minusUnit`);
        // Si el producto no exite, lo agrega al carrito

    }

}

// Si hace click, verifica si es para agrega algún producto al carrito
document.addEventListener("click", function (event) {
    if (event.target.matches("a.add-to-cart")) {
        const productName = event.target.dataset.productId;
        const price = event.target.dataset.price;
        addToCart(productName, price);
    }
});

// Esconde el carrito de la esquina de la pantalla si no compró nada 
// Esconde el carrito de la esquina de la pantalla si no se ha comprado nada
function cartOpacity() {
    let totalUnits = cart.reduce((accumulator, item) => {
        return accumulator + (item.units || 0);
    }, 0);

    var shoppingCart = document.getElementById('shopping-cart');

    console.log(`Contador de productos: >${totalUnits}<`);

    if (totalUnits === 0) {
        shoppingCart.style.opacity = '0'; // Esconde el carrito si no hay productos
        console.log('El contador está en cero, ocultando el carrito.');
    } else {
        shoppingCart.style.opacity = '1'; // Asegura que el carrito se muestra si hay productos
        console.log('El contador no está en cero, mostrando el carrito.');
    }
}


// Función para generar la página del carrito con el listado de productos
function generateCartProductiList() {
    let totalSale =  parseInt(cart.reduce((accumulator, item) => {
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
                               <span>-</span> 
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

        console.log(`\ncarts.id = ${carts.id}`);

        // Verifica que elemento con esa "id" existe
        const productCountElement = document.getElementById(`${carts.id}`);
        if (productCountElement) {
            productCountElement.innerHTML = carts.units;
            console.log(`\nIngresó al if the updateProductUnitDisplay`);
            console.log(`\nIndice 0 de la clase es ${productCountElement.innerHTML}`);
        } else {
            console.log(`\nNO ingresó al if the updateProductUnitDisplay`);
        }
    });
}

//<span id="product-count-${index}">0</span>

console.log(`\n\n`);

// Eventos en los cuales actualiza la cantidad de productos en cada card de la página productos.html
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateProductUnitDisplay();
        setInterval(updateProductUnitDisplay, 100);
    });
} else {
    // Document is already loaded
    window.addEventListener('resize', updateProductUnitDisplay);
    window.addEventListener('click', updateProductUnitDisplay);
}


// Eventos en los cuales actualiza la opacidad del carrito en la esquina de la pantalla del carrito 
document.addEventListener("'OMContentLoaded", cartOpacity);
window.addEventListener('load', cartOpacity);
window.addEventListener('resize', cartOpacity);
window.addEventListener('click', cartOpacity);

// Eventos en los cuales actualiza la imagen del carrito en la esquina de la pantalla con el número de productos
document.addEventListener("DOMContentLoaded", updateCartDisplay);
window.addEventListener('load', updateCartDisplay);
window.addEventListener('resize', updateCartDisplay);
window.addEventListener('click', updateCartDisplay);

// Eventos en los genera la lista de procutos en la página del carito
document.addEventListener("DOMContentLoaded", generateCartProductiList);
window.addEventListener('load', generateCartProductiList);
window.addEventListener('resize', generateCartProductiList);
window.addEventListener('click', generateCartProductiList);

// Eventos en los que ejecuta la función para permitir restar productos del carrito
document.addEventListener("DOMContentLoaded", substractUnit);
window.addEventListener('click', substractUnit);


