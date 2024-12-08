window.onload = function () {
    var iframe = document.createElement('iframe');
    iframe.src = "https://www.google.com/maps/embed?pb=...";
    iframe.width = "600";
    iframe.height = "450";
    iframe.style.border = "0";
    iframe.allowfullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerpolicy = "no-referrer-when-downgrade";
    document.getElementById('map-container').appendChild(iframe);
};