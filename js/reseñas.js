// *** Carga el archivo json ***
fetch('../json/productos.json')
    .then(response => response.json())
    .then(data => {
        const products = data.products;

        // Función para generar las "cards" de la reseña
        function generateReseñaGrid() {
            const reseñasContainer = document.getElementById('grid-reseñas');
            let resultCount = 0;

            products.forEach(product => {
                const formattedProductName = product.name.replace(/\*/g, '"');
                resultCount++;
                const reseñaHTML = `
                    <div class="grid-item" id="item${resultCount}">                        
                       <span type="button" onclick="imageModal('${product.image}')"><img src="${product.image}" alt="Photo ${resultCount}"></span>
                        <h2 class="subtitle">${formattedProductName}</h2>
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

// *** Función de ventana modal que carga imagen ***
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