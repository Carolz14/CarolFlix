let posterEl = document.querySelectorAll(".poster");
let categoria = document.querySelectorAll(".classificacao");

/*vetores*/
let favoritos = [];
let assistidos = [];
let desejados = [];

/*categoria dos itens*/
for (let i = 0; i < posterEl.length; i++) {
  categoria[i].addEventListener("input", function () {
    console.log("Valor do select alterado:", categoria[i].value);
    if (categoria[i].value == "fav") {
      posterEl[i].classList.add("favorito");
    } else {
      posterEl[i].classList.remove("favorito");
    }
    if (categoria[i].value == "assistido") {
      posterEl[i].classList.add("assistido");
    } else {
      posterEl[i].classList.remove("assistido");
    }
    if (categoria[i].value == "Quero-assistir") {
      posterEl[i].classList.add("quero-assistir");
    } else {
      posterEl[i].classList.remove("quero-assistir");
    }
    addVetor(i);
  });
}

/*insere item na pagina*/
function insereNaPagina(item) {
  let containerEl;

  let divTodos;
  let itemDivEl = document.createElement("div");
  let itemImgEl = document.createElement("img");

  itemDivEl.classList.add("item");
  itemImgEl.classList.add("poster");

  if (item.classificacao === "fav") {
    containerEl = document.querySelector("#categoria1");
    divTodos = document.querySelector(".novoConteudo1");
    itemImgEl.classList.add("favorito");
    itemImgEl.src = item.poster;

    itemDivEl.appendChild(itemImgEl);
    divTodos.appendChild(itemDivEl);
    containerEl.appendChild(divTodos);
  }
  if (item.classificacao === "assistido") {
    containerEl = document.querySelector("#categoria2");
    divTodos = document.querySelector(".novoConteudo2");
    itemImgEl.classList.add("assistido");
    itemImgEl.src = item.poster;

    itemDivEl.appendChild(itemImgEl);
    divTodos.appendChild(itemDivEl);
    containerEl.appendChild(divTodos);
  }
  if (item.classificacao === "Quero-assistir") {
    containerEl = document.querySelector("#categoria3");
    divTodos = document.querySelector(".novoConteudo3");
    itemImgEl.classList.add("quero-assistir");
    itemImgEl.src = item.poster;

    itemDivEl.appendChild(itemImgEl);
    divTodos.appendChild(itemDivEl);
    containerEl.appendChild(divTodos);
  }
}

/*remove item da pagina*/
function removeHtml(item, categoria) {
  let containerEl;
  if (categoria === "fav") {
    containerEl = document.querySelector(".novoConteudo1");
  }
  if (categoria === "assistido") {
    containerEl = document.querySelector(".novoConteudo2");
  }
  if (categoria === "Quero-assistir") {
    containerEl = document.querySelector(".novoConteudo3");
  }

  let itensNoVetor = containerEl.querySelectorAll(".item");
  console.log(itensNoVetor);

  itensNoVetor.forEach((el) => {
    let img = el.querySelector(".poster");
    console.log(img);
    console.log(img.src);
    console.log(item.poster);

    if (img.src.includes(item.poster)) {
      console.log(img);
      el.remove();
    }
  });
}

/*adiciona item nos vetores*/
function addVetor(cont) {
  let novoItem = {
    poster: posterEl[cont].getAttribute("src"),
    classificacao: categoria[cont].value,
  };

  for (let i = 0; i < favoritos.length; i++) {
    if (favoritos[i].poster === novoItem.poster) {
      removeHtml(novoItem, "fav");
      favoritos.splice(i, 1);
    }
  }

  for (let i = 0; i < assistidos.length; i++) {
    if (assistidos[i].poster === novoItem.poster) {
      assistidos.splice(i, 1);
      removeHtml(novoItem, "assistido");
    }
  }
  for (let i = 0; i < desejados.length; i++) {
    if (desejados[i].poster === novoItem.poster) {
      desejados.splice(i, 1);
      removeHtml(novoItem, "Quero-assistir");
    }
  }

  if (categoria[cont].value === "fav") {
    favoritos.push(novoItem);
    insereNaPagina(novoItem);
    console.log(favoritos);
  }
  if (categoria[cont].value === "assistido") {
    assistidos.push(novoItem);
    insereNaPagina(novoItem);
  }
  if (categoria[cont].value === "Quero-assistir") {
    desejados.push(novoItem);
    insereNaPagina(novoItem);
  }
}


/*local storage*/
let favoritosString;
let assistidosString;
let desejadosString;

for (let i = 0; i < posterEl.length; i++) {
  categoria[i].addEventListener("input", function () {
    favoritosString = localStorage.setItem(
      "meus-favs",
      JSON.stringify(favoritos)
    );
    assistidosString = localStorage.setItem(
      "meus-assistidos",
      JSON.stringify(assistidos)
    );
    desejadosString = localStorage.setItem(
      "meus-desejados",
      JSON.stringify(desejados)
    );
  });
}

let btnCarregarEl = document.querySelector("#carregarbtn");

btnCarregarEl.addEventListener("click", function () {
  favoritosString = localStorage.getItem("meus-favs");
  favoritos = JSON.parse(favoritosString);
  assistidosString = localStorage.getItem("meus-assistidos");
  assistidos = JSON.parse(assistidosString);
  desejadosString = localStorage.getItem("meus-desejados");

  desejados = JSON.parse(desejadosString);

  favoritos.forEach(insereNaPagina);
  assistidos.forEach(insereNaPagina);
  desejados.forEach(insereNaPagina);
});
