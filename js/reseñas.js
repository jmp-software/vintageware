  //  Arreglo con los datos de cada reseña de producto
  const reseñas = [
    {
        name: 'Microsoft Windows 3.1',
        image: '../assets/photos/photo-1.jpg',
        subtitle: 'Windows 3.1',
        subtitle3: 'Cajas en muy buen estado, stock de más de 40 copias directamente importadas desde Estados Unidos.'
    },
    {
        name: 'Commander Keen 4',
        image: '../assets/photos/photo-2.png',
        subtitle: 'Commander Keen 4',
        subtitle3: '5 unidades en stock, todas con caja y manual original, en muy buenas condiciones.'
    },
    {
        name: 'Logo Programming Language',
        image: '../assets/photos/photo-3.jpg',
        subtitle: 'Commodore Logo Programming Language',
        subtitle3: 'Cartuchos para Commodore 64 en perfecto estado con su caja original. ¡Apenas dos en stock!'
    },
    {
        name: 'Paint Shop Pro',
        image: '../assets/photos/photo-4.jpg',
        subtitle: 'Paint Shop Pro',
        subtitle3: 'Calidad variable de empaque, pero copias perfectamente funcionales. Varios en stock.'
     }
];

// Función para generar las "cards" de los productos cualquier a sea el tamaño del  vector
function generateReseñaGrid() {
    const reseñasContainer = document.getElementById('grid-reseñas');
    let resultCount = 0;
    reseñas.forEach(reseña => {
        resultCount++;
        const reseñaHTML = `
                <div class="grid-item" id="item${resultCount}">
                    <a href="${reseña.image}" target="_blank"><img src="${reseña.image}" alt="Photo ${resultCount }"></a>
                    <h2 class="subtitle">${reseña.name}</h2>
                    <p class="subtitle3">${reseña.subtitle3}</p>
                </div>
        `;

        reseñasContainer.innerHTML += reseñaHTML;
    });
}

// Función para generar las reseñas de cada producto
generateReseñaGrid();