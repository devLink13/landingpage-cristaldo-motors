// Script para fechar automaticamente o menu hamburger quando um nav-link é clicado no mobile
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os links da navbar
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarMenu');

    // Adiciona evento de clique para cada link
    navLinks.forEach(function (navLink) {
        navLink.addEventListener('click', function (e) {
            // Fecha o menu hamburger se estiver aberto
            if (navbarCollapse.classList.contains('show')) {
                const collapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                collapse.hide();
            }
        });
    });
});
