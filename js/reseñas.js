//  Arreglo con los datos de cada reseña de producto
/*  
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
*/

// Carga el archivo json
fetch('../json/products.json')
    .then(response => response.json())
    .then(data => {
        const products = data.products;

        // Función para generar las "cards" de la reseña
        function generateReseñaGrid() {
            const reseñasContainer = document.getElementById('grid-reseñas');
            let resultCount = 0;

            products.forEach(product => {
                resultCount++;
                const reseñaHTML = `
                    <div class="grid-item" id="item${resultCount}">                        <span type="button" onclick="imageModal('${product.image}')"><img src="${product.image}" alt="Photo ${resultCount}"></span>
                        <h2 class="subtitle">${product.name}</h2>
                        <p class="subtitle3">${product.subtitle3}</p>
                        <p class="stock-subtitle">STOCK: ${product.stock}</p>
                  </div>                `;
                reseñasContainer.innerHTML += reseñaHTML;
            });
        }

        // Llama a la función para generar las reseñas de cada producto
        generateReseñaGrid();
    })
    .catch(error => {
        console.error('Error cargando el archivo:', error);
    });

function imageModal(image) {
    // Create the modal element
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Create the modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Add the image to the modal
    const modalImage = document.createElement('img');
    modalImage.classList.add('modal-image');
    modalImage.src = image;

    modalContent.appendChild(modalImage);

    // Add the close button
    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.textContent = 'x';
    closeButton.onclick = function () {
        modal.style.display = 'none';
        document.body.removeChild(modal); // Remove modal from DOM
    };
    closeButton.style.opacity = '1'; // Set the close button opacity to 1
    modalContent.appendChild(closeButton);

    // Add the modal content to the modal element
    modal.appendChild(modalContent);

    // Add the modal to the document
    document.body.appendChild(modal);

    // Show the modal
    modal.style.display = 'block';
}