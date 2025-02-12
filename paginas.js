

/*Menu */


let botaoEl = document.querySelector('#alterna-menu');
let headerEl = document.querySelector('header');

function alternaMenu() {
  headerEl.classList.toggle('menu-visivel');
}

botaoEl.addEventListener('click', alternaMenu);


/*Trocar de aba na pagina */



function exibePagina(idDaPagina) {
    
    document.querySelectorAll('.aba, #menu a')
      .forEach(function(el) {
        el.classList.remove('ativa');
      });
  
   
    const paginaParaExibirEl = document.querySelector(idDaPagina);
  

   paginaParaExibirEl.classList.add('ativa');
  
    document.querySelector('#menu a[href="' + idDaPagina + '"]')
      .classList.add('ativa');
  }
  

  const itensDoMenu = document.querySelectorAll('#menu a');
  itensDoMenu.forEach(function(el) {
    el.addEventListener('click', function(evento) {

      const hrefDoLink = evento.target.href;
      const idApontadoPeloLink = hrefDoLink.substr(hrefDoLink.lastIndexOf('#'));
  
      exibePagina(idApontadoPeloLink);
    });
  });
  

  if (location.hash) {
    const hrefDosItensDeMenu = Array.from(itensDoMenu).map(function(el) {
      return el.href;
    });
    if (hrefDosItensDeMenu.indexOf(location.hash)) {
  
      exibePagina(location.hash);
    }
  }