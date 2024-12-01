function ajustarAncho() {
    const grid1 = document.getElementById('form');
    const grid2 = document.getElementById('product-p-photo');
    grid2.style.width = `${grid1.offsetWidth}px`; // Usar offsetWidth para obtener el ancho
}

// Ajustar el ancho al cargar la página
window.addEventListener('load', ajustarAncho);

// Ajustar el ancho al redimensionar la ventana
window.addEventListener('resize', ajustarAncho);

const params = new URLSearchParams(window.location.search);
const product = params.get('product');
const price = params.get('price');
const image_url = params.get('image');

document.getElementById('producto').value = product || '' ; //  Por defecto la  deja vacía si no encuentra nada
document.getElementById('valor').value = price || ''; //  Por defecto la  deja vacía si no encuentra nada

document.querySelector('.nombre-producto').textContent = `${product} $${price}` || `` ; //  Por defecto la  deja vacía si no encuentra nada

document.querySelector('.product-p-photo').src = image_url || '' ; //  Por defecto la  deja vacía si no encuentra nada

document.querySelector('.foto-enlace').href = image_url || '' ; //  Por defecto la  deja vacía si no encuentra nada

