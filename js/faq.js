/*
  faq.js
  Acordeão do FAQ: um item aberto por vez.
  Cada pergunta é um <button> com aria-expanded e aria-controls,
  então Enter, Espaço e Tab já funcionam nativamente.
*/

function setupFaq(faq) {
  const buttons = Array.from(faq.querySelectorAll("[aria-controls]"));

  const setExpanded = (button, isExpanded) => {
    button.setAttribute("aria-expanded", String(isExpanded));
    document.getElementById(button.getAttribute("aria-controls")).hidden = !isExpanded;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const willOpen = button.getAttribute("aria-expanded") !== "true";
      buttons.forEach((other) => setExpanded(other, false));
      if (willOpen) setExpanded(button, true);
    });
  });
}

document.querySelectorAll("[data-faq]").forEach(setupFaq);
