function passData(product, price, image) {
    const url = `../pages/pago.html?product=${encodeURIComponent(product)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
    window.location.href = url;
}