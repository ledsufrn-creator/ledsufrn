// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Hero carousel
(function () {
  const slides = [
    {
      category: 'Projeto de Pesquisa e Extensão',
      title: 'A prática do Direito Empresarial<br><em>começa na sala de aula.</em>',
      subtitle: 'Conectamos estudantes de Direito ao universo do Direito Societário e Empresarial — expedientes com escritórios, visitas técnicas a empresas e produção científica.',
      ctaText: 'Conheça a liga',
      ctaHref: '#sobre',
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
