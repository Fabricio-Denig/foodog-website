/*
  main.js
  Comportamentos gerais da página: menu mobile e carrossel de marmitas.
*/

/* ------------------------------------------------------------------
   Menu mobile
   ------------------------------------------------------------------ */
function setupMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const setOpen = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", isOpen);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Fecha ao escolher um link
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // Fecha com a tecla Esc e devolve o foco ao botão
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Ao passar para o layout desktop, o menu volta ao estado normal
  window.matchMedia("(min-width: 1200px)").addEventListener("change", () => setOpen(false));
}

/* ------------------------------------------------------------------
   Carrossel de marmitas
   O trilho rola com CSS (scroll-snap). O JS só:
   - mostra a seta quando há cards escondidos e avança um card por clique;
   - cria os indicadores (bolinhas) e marca o card visível.
   ------------------------------------------------------------------ */
function setupCarousel(carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-carousel-dots]");
  const items = Array.from(track.children);
  if (items.length < 2) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollBehavior = () => (reduceMotion.matches ? "auto" : "smooth");

  const scrollToItem = (index) => {
    const target = items[Math.max(0, Math.min(index, items.length - 1))];
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).scrollPaddingLeft || 0), behavior: scrollBehavior() });
  };

  const dots = items.map((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dots__dot";
    dot.setAttribute("aria-label", `Ir para a marmita ${index + 1} de ${items.length}`);
    dot.addEventListener("click", () => scrollToItem(index));
    dotsContainer.append(dot);
    return dot;
  });

  const currentIndex = () => {
    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let smallest = Infinity;
    items.forEach((item, index) => {
      const distance = Math.abs(item.getBoundingClientRect().left - trackLeft);
      if (distance < smallest) {
        smallest = distance;
        closest = index;
      }
    });
    return closest;
  };

  const update = () => {
    const hasOverflow = track.scrollWidth - track.clientWidth > 2;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    const active = atEnd ? items.length - 1 : currentIndex();

    // A seta só aparece quando há cards fora da área visível
    // e fica desativada quando o último card já está à mostra.
    nextButton.hidden = !hasOverflow;
    nextButton.disabled = atEnd;
    dotsContainer.hidden = !hasOverflow;

    dots.forEach((dot, index) => {
      dot.setAttribute("aria-current", String(index === active));
    });
  };

  nextButton.addEventListener("click", () => scrollToItem(currentIndex() + 1));

  let frame = null;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  });
  new ResizeObserver(update).observe(track);
  update();
}

setupMobileMenu();
document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
