// Check if the page being called is "index.html"
if (window.location.pathname === '/vintageware/index.html' || window.location.pathname === '/vintageware/') {
    // Include the menu from '/pages/menu-1.html' for "index.html"
    fetch('/vintageware/pages/menu-1.html')  
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error fetching menu:', error));
} else {
    // Include the menu from '/pages/menu-2.html' for the rest of the pages
    fetch('/vintageware/pages/menu-2.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error fetching menu:', error));
}