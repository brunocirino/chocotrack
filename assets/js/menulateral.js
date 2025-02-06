document.addEventListener("DOMContentLoaded", function () {
  // Obtém o botão de expansão para o celular
  const btnExpandirMobile = document.getElementById("btn-exp-mobile");

  // Obtém o botão de expansão para o desktop
  const btnExpandirDesktop = document.getElementById("btn-exp");

  // Obtém o menu lateral
  const menuLateral = document.querySelector("nav.menu-lateral");

  // Função para alternar a classe 'expandir' no menu lateral
  function toggleMenu() {
    menuLateral.classList.toggle("expandir");
  }

  // Adiciona evento ao botão de celular, se existir
  if (btnExpandirMobile) {
    btnExpandirMobile.addEventListener("click", toggleMenu);
  }

  // Adiciona evento ao botão de desktop, se existir
  if (btnExpandirDesktop) {
    btnExpandirDesktop.addEventListener("click", toggleMenu);
  }
});
