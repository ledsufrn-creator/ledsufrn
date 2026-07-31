// Header: fica um pouco mais transparente ao rolar a página
(function () {
  const header = document.querySelector('header');
  if (!header) return;

  function updateHeaderScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();
})();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function closeMobileMenu() {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove('open');
  navToggle.textContent = '≡';
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('nav-open');
  navLinks.querySelectorAll('.nav-dropdown.open').forEach((dropdown) => {
    dropdown.classList.remove('open');
    const trigger = dropdown.querySelector(':scope > a');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.textContent = isOpen ? '×' : '≡';
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('nav-open', isOpen);
  });

  const dropdownTriggers = Array.from(navLinks.querySelectorAll('.nav-dropdown > a'));
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      if (window.innerWidth > 860) return;
      event.preventDefault();
      const dropdown = trigger.parentElement;
      const isOpen = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });

  navLinks.querySelectorAll('a').forEach((a) => {
    if (dropdownTriggers.includes(a)) return;
    a.addEventListener('click', closeMobileMenu);
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMobileMenu(); });
}

// Hero carousel
(function () {
  const slides = [
    {
      category: 'Projeto de Pesquisa e Extensão',
      title: 'A prática do Direito Empresarial<br><em>começa na sala de aula.</em>',
      subtitle: 'Conectamos estudantes de Direito ao universo do Direito Societário e Empresarial — expedientes com escritórios, visitas técnicas a empresas e produção científica.',
      ctaText: 'Conheça a liga',
      ctaHref: '/sobre/',
      cover: 'assets/images/post-cazetv-globo.webp',
      coverAlt: 'Copa do Mundo, Contratos e Streaming — caso CazéTV e Globo',
      badge: '@ledsufrn',
    },
    {
      category: 'Fundos de Investimento · CVM',
      title: 'CVM 175: o novo marco<br><em>regulatório dos fundos.</em>',
      subtitle: 'Análise das mudanças introduzidas pela Resolução CVM 175 — e o que muda para gestores, cotistas e o mercado de capitais.',
      ctaText: 'Ver no Instagram',
      ctaHref: 'https://www.instagram.com/p/Da3johoDC51/',
      cover: 'assets/images/post-cvm175.webp',
      coverAlt: 'Resolução CVM 175: a Resolução dos Fundos',
      badge: 'Regulação',
    },
    {
      category: 'STJ · Direito Societário',
      title: 'Stock options: o STJ decidiu<br><em>pela natureza mercantil.</em>',
      subtitle: 'O Superior Tribunal de Justiça pacificou o debate — e as consequências tributárias são significativas para quem recebe esse tipo de remuneração.',
      ctaText: 'Ver no Instagram',
      ctaHref: 'https://www.instagram.com/p/DZqVLgKD-o0/',
      cover: 'assets/images/post-stock-options.webp',
      coverAlt: 'STJ: stock options têm natureza mercantil',
      badge: 'Decisão do STJ',
    },
  ];

  const elCategory = document.getElementById('hf-category');
  if (!elCategory) return;

  const elTitle    = document.getElementById('hf-title');
  const elSubtitle = document.getElementById('hf-subtitle');
  const elCta      = document.getElementById('hf-cta');
  const elCover    = document.getElementById('hf-cover');
  const elBadge    = document.getElementById('hf-badge');
  const dots       = document.querySelectorAll('.hf-dot');
  const hero       = document.querySelector('.hero-featured');

  let current = 0;
  let timer;

  function goTo(idx) {
    hero.classList.add('hf-fading');
    setTimeout(function () {
      const s = slides[idx];
      elCategory.textContent  = s.category;
      elTitle.innerHTML       = s.title;
      elSubtitle.textContent  = s.subtitle;
      elCta.textContent       = s.ctaText;
      elCta.href              = s.ctaHref;
      elCover.src             = s.cover;
      elCover.alt             = s.coverAlt;
      elBadge.textContent     = s.badge;
      dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
      current = idx;
      hero.classList.remove('hf-fading');
    }, 220);
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      clearInterval(timer);
      goTo(+dot.dataset.idx);
      timer = setInterval(advance, 5500);
    });
  });

  function advance() { goTo((current + 1) % slides.length); }

  timer = setInterval(advance, 5500);
})();


// Conteúdos: abas internas
(function () {
  const tabs = Array.from(document.querySelectorAll('.content-tab'));
  if (!tabs.length) return;

  const panels = Array.from(document.querySelectorAll('.content-tab-panel'));

  function activateTab(tab, moveFocus = false) {
    const target = tab.dataset.tab;

    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      const active = panel.id === `panel-${target}`;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });

    if (moveFocus) tab.focus();
    history.replaceState(null, '', `#${target}`);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      activateTab(tabs[nextIndex], true);
    });
  });

  const requested = location.hash.replace('#', '');
  const initial = tabs.find((tab) => tab.dataset.tab === requested) || tabs[0];
  activateTab(initial);
})();
