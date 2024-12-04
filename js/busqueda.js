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

     for (const page of pages) {
         try {
             const response = await fetch(page.url);
             const text = await response.text();

             // Chquea si la query se encuentra dentro del contenido de la página
             if (text.toLowerCase().includes(query.toLowerCase())) {
                 const link = document.createElement('a');
                 link.href = page.url;
                 link.textContent = page.title;
                 resultsDiv.appendChild(link);
                 resultsDiv.appendChild(document.createElement('br'));
             }
         } catch (error) {
             console.error(`Error fetching ${page.url}:`, error);
         }
     }

     // Si no encuentra nada
     if (resultsDiv.innerHTML === '') {
         resultsDiv.textContent = 'No encontramos nada.';
     }
 }

 // Comienza la búsqueda
 searchInPages();