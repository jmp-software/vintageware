function passData(product, system, format, price, image) {
    const url = `../pages/pago.html?product=${encodeURIComponent(product)}&system=${encodeURIComponent(system)}&format=${encodeURIComponent(format)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
    window.location.href = url;
}