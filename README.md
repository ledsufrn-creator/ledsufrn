# LEDS UFRN — Site oficial

Site institucional da **Liga de Estudos de Direito Empresarial e Societário da UFRN**.

## Stack

Site estático em HTML, CSS e JavaScript puros. Sem build, sem dependências, sem framework. Deploy direto no Netlify a cada push na branch `main`.

## Estrutura

```
.
├── index.html              Página principal
├── assets/
│   ├── css/styles.css      Estilos
│   ├── js/script.js        Interações (menu mobile)
│   └── images/             Logos e fotos
├── netlify.toml            Config do Netlify (redirects + cache)
├── .gitignore
└── README.md
```

## Rodar localmente

Como é HTML puro, basta abrir `index.html` no navegador — ou servir com qualquer servidor estático:

```bash
# Opção 1: abrir direto
start index.html

# Opção 2: com Python
python -m http.server 8000

# Opção 3: com Node (se tiver npx)
npx serve .
```

Depois acesse `http://localhost:8000`.

## Deploy

O deploy no Netlify é automático a cada `git push` na branch `main`.

- **Site:** ledsufrn.com.br (após configurar o DNS)
- **URL temporária:** definida pelo Netlify após o primeiro deploy
- **Conta Netlify:** ledsufrn@gmail.com

## Editar conteúdo

- **Textos, seções, links** — editar `index.html`
- **Cores, fontes, espaçamentos** — editar `assets/css/styles.css` (variáveis CSS no topo do arquivo, em `:root`)
- **Fotos de professores/eventos** — substituir arquivos em `assets/images/` mantendo o mesmo nome
- **Adicionar novo evento** — duplicar um `.evento-card` no HTML e trocar imagem/texto
