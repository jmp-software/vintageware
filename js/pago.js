function ajustarAncho() {
    const grid1 = document.getElementById('form');
    const grid2 = document.getElementById('product-p-photo');
    grid2.style.width = `${grid1.offsetWidth}px`; // Usar offsetWidth para obtener el ancho
}

// Ajustar el ancho al cargar la página
window.addEventListener('load', ajustarAncho);

// Ajustar el ancho al redimensionar la ventana
window.addEventListener('resize', ajustarAncho);
