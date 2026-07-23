const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const main = document.querySelector("main");
const hero = document.querySelector("main > .hero");
const footer = document.querySelector("footer");

/* Seções principais que funcionam como páginas */
const paginas = Array.from(
  document.querySelectorAll("main > section")
);

/* Abre e fecha o menu no celular */
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

/* Esconde todas as páginas */
function esconderPaginas() {
  paginas.forEach((pagina) => {
    pagina.hidden = true;
    pagina.scrollTop = 0;
  });

  if (footer) {
    footer.hidden = true;
    footer.scrollTop = 0;
  }
}

/* Descobre em qual seção está um elemento */
function encontrarPagina(elemento) {
  if (!elemento) return null;

  if (elemento === main || elemento.id === "top") {
    return hero;
  }

  if (elemento === footer || footer?.contains(elemento)) {
    return footer;
  }

  return elemento.closest("main > section");
}

/* Exibe somente a página escolhida */
function abrirPagina(id) {
  const destino =
    id === "top"
      ? hero
      : document.getElementById(id);

  const pagina = encontrarPagina(destino);

  if (!pagina) return;

  esconderPaginas();
  pagina.hidden = false;

  /* Caso o link leve para um item dentro da seção */
  if (destino && destino !== pagina) {
    pagina.scrollTop =
      destino.offsetTop - pagina.offsetTop - 30;
  }

  if (navLinks) {
    navLinks.classList.remove("open");
  }

  history.replaceState(null, "", `#${id}`);
}

/* Controla todos os links internos do site */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (evento) => {
    const id = link.getAttribute("href").replace("#", "");

    if (!id) return;

    evento.preventDefault();
    abrirPagina(id);
  });
});

/* Abre a tela indicada na URL ou a tela inicial */
const paginaInicial =
  window.location.hash.replace("#", "") || "top";

abrirPagina(paginaInicial);
