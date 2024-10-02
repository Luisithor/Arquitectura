// Seleccionamos el botón del menú, el menú de navegación y el logo
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const logo = document.getElementById('logo');

// Añadimos un evento de click al botón para mostrar/ocultar el menú y el logo
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Mostrar/ocultar menú
    logo.classList.toggle('logo-hidden'); // Ocultar/mostrar logo
});



