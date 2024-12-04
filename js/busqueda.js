// Obtiene el query de búsqueda de la URL 
const params = new URLSearchParams(window.location.search);
const query = params.get('query');

// Array con todas las páginas donde tiene que buscar
const pages = [
    { title: "Inicio", url: "../index.html" },
    { title: "Productos", url: "productos.html" },
    { title: "Reseñas", url: "reseñas.html" },
    { title: "Contacto", url: "contacto.html" },
    { title: "Redes", url: "redes.html" },
    { title: "Ubicación", url: "ubicacion.html" }
];

// Función para buscar en el contenido de cada página
async function searchInPages() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpia resultados previos
    let resultCount = 0; // Contador para la numeración
    
    for (const page of pages) {
        try {
            const response = await fetch(page.url);
            const text = await response.text();

            // Chequea si la query se encuentra dentro del contenido de la página
            if (text.toLowerCase().includes(query.toLowerCase())) {
                resultCount++; // Incrementa el contador
                const link = document.createElement('a');
                link.href = page.url;
                link.textContent = `${resultCount}. ${page.title}`; // Agrega numeración
                resultsDiv.appendChild(document.createElement('br'));
                if (resultCount == 1) resultsDiv.appendChild(document.createElement('br'));
                resultsDiv.appendChild(link);
            }

        } catch (error) {
            console.error(`Error fetching ${page.url}:`, error);
        }
    }
    
    // Si se encontraron resultados
    if (resultCount > 0) {
        const resultLabel = document.createElement('span');
        if (resultCount == 1) {
            resultLabel.textContent = `${resultCount} coincidencia para "${query }".`;
        } else {
            resultLabel.textContent = `${resultCount} coincidencias para "${query }".`;
        }
        resultsDiv.insertBefore(resultLabel, resultsDiv.firstChild);
           
    } else {
        // Si no encuentra nada
        resultsDiv.textContent = 'No encontramos nada.';
    }
}

// Comienza la búsqueda
searchInPages();