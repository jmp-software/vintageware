// Check if the page being called is "index.html"

if (window.location.pathname == '/index.html' || window.location.pathname == '/vintageware/') {
    // Include the menu from '/pages/menu-1.html' for "index.html"
    fetch('./pages/menu-1.html')  
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error fetching menu:', error));
    
    console.log(`Entro por TRUE`)

} else {
     // Include the menu from '/pages/menu-2.html' for the rest of the pages
    fetch('../pages/menu-2.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error fetching menu:', error));
    
    console.log(`Entro por ELSE`)
 }

 console.log(`Esto es el path: ${window.location.pathname}`)