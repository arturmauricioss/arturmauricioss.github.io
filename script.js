function toggleMenu() {
    const menuItems = document.querySelector('.menu-items');
    menuItems.classList.toggle('active');
}

window.addEventListener('load', function() {
    setTimeout(function() {
        const avallon = document.getElementById('avallon');
        avallon.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(function() {
            document.querySelector('header').style.display = 'block';
            document.querySelector('main').style.display = 'block';
        }, 1000);

        setTimeout(function() {
            const portfolio = document.getElementById('portfolio');
            portfolio.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(function() {
                portfolio.style.display = 'none';
            }, 500);
        }, 500); // Atraso de 500ms (0.5 segundo) para ocultar o portfolio
    }, 3500);
});
