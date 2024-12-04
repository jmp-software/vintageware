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
function generateProductCards() {
    const productCardsContainer = document.getElementById('product-cards');
    products.forEach(product => {
        const cardHTML = `
            <a href="#" onclick="passData('${product.name}','${product.platform}','${product.media}','${product.price}','${product.image}')">
                <div class="card-item">
                    <img src="${product.image}" alt="${product.subtitle}">
                    <h2 class="subtitle">${product.subtitle}</h2>
                    <p class="subtitle2">$${product.price}</p>
                    <p class="subtitle3">¡COMPRAR!</p>  
                </div>
            </a>
        `;
        productCardsContainer.innerHTML += cardHTML;
    });
}

//  Función para pasar los datos
function passData(product, system, format, price, image) {
    const url = `../pages/pago.html?product=${encodeURIComponent(product)}&system=${encodeURIComponent(system)}&format=${encodeURIComponent(format)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
    window.location.href = url;
}

// Función para generar las "cards" de cada producto
generateProductCards();