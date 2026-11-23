# Foodog — Landing page

Site institucional e catálogo da **Foodog**, marca de comida natural congelada para cães.

Nesta primeira versão, a página apresenta a marca, o processo de preparo, as marmitas, depoimentos, dúvidas frequentes e o passo a passo do pedido. O fechamento do pedido será feito pelo WhatsApp.

## Tecnologias

- HTML5 semântico
- CSS3 (custom properties, Flexbox, Grid, `clamp()`), abordagem mobile-first
- JavaScript puro (sem frameworks nem etapa de build)
- Fontes do Google Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) (títulos) e [Manrope](https://fonts.google.com/specimen/Manrope) (textos)
- Ícones de interface desenhados a partir do [Lucide](https://lucide.dev) (licença ISC)

## Como rodar localmente

O site é estático. Basta servir a pasta com qualquer servidor HTTP local, por exemplo:

```bash
# Com Node.js instalado
npx serve .

# ou com Python 3
python -m http.server 5500
```

Depois, abra o endereço indicado no terminal (ex.: `http://localhost:3000`).
No VS Code, a extensão **Live Server** também funciona (botão direito em `index.html` → *Open with Live Server*).

## Estrutura

```
foodog/
├── index.html          Página única com todas as seções
├── css/
│   ├── reset.css       Normalização entre navegadores
│   ├── variables.css   Design tokens: cores, tipografia, espaçamentos, breakpoints
│   ├── global.css      Estilos-base, container e utilitários
│   ├── components.css  Peças reutilizáveis: botões, cards, polaroid, FAQ...
│   └── sections.css    Layout de cada seção, na ordem da página
├── js/
│   ├── main.js         Menu mobile e carrossel de marmitas
│   └── faq.js          Acordeão das perguntas frequentes
└── assets/
    ├── brand/          Logotipos (SVG)
    ├── hero/           Ilustração principal (SVG)
    ├── meals/          Fotos das marmitas (WebP)
    ├── testimonials/   Fotos dos depoimentos (WebP)
    ├── decorations/    Folhas, patas, corações e traços decorativos
    └── icons/          Ícones da interface (SVG/WebP)
```

## Organização do CSS

- **Mobile-first:** o CSS base descreve o celular. As media queries `min-width: 768px` (tablet) e `min-width: 1200px` (desktop) ficam logo abaixo do bloco de cada seção ou componente.
- **Tokens:** cores, tamanhos de fonte e espaçamentos vêm de `variables.css`. Os títulos usam `clamp()` para crescer de forma fluida entre 390px e 1800px, as larguras de referência do design.
- **Nomes de classe** seguem o padrão `bloco__elemento--variação` (ex.: `meal-card__price`, `button--primary`).

## Preparado para as próximas etapas

- **Carrinho:** cada card de marmita é um `<article data-product>` com `data-product-id`, `data-product-name` e `data-product-price`. Os botões usam `data-add-to-cart`, o contador do header usa `data-cart-count` e o botão final usa `data-cart-checkout`.
- **Animações:** a estrutura não depende de JavaScript para aparecer; as animações poderão ser adicionadas por cima.

## Pendências de conteúdo e acessibilidade

- **FAQ:** as respostas das perguntas 2 a 5 são provisórias (marcadas com `PLACEHOLDER` no HTML) e dependem de validação do cliente.
- **Contraste (para a auditoria de acessibilidade):** as cores seguem o Figma. Ficam abaixo de 4.5:1:
  - texto pequeno terracota `#BF5315` sobre o creme (~4.1:1);
  - texto creme sobre os botões terracota;
  - número do carrinho creme sobre `#A08B79`.
- **Tamanhos pequenos no mobile (fiéis ao Figma):** tags dos cards com ~8,5px, selos do hero e textos do processo com 10px, botão "Ver todas as marmitas" e ícones sociais com área de toque menor que 44px.
- **FAQ desktop:** os ícones + / − não aparecem no PNG do Figma, mas foram mantidos a pedido do cliente (mesmo comportamento do mobile).
