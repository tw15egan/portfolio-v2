import Clipboard from "clipboard";

const emailButton = new Clipboard("#email");
const tooltip = document.querySelector(".tooltip");

emailButton.on("success", evt => {
  tooltip.classList.remove("hidden");
  setTimeout(() => {
    tooltip.classList.add("hidden");
  }, 1500);
});

emailButton.on("error", e => {
  console.error("whoops");
});

const triggers = document.querySelectorAll(".social svg");
const social = document.querySelector(".social");
const highlight = document.createElement("span");
const initialPos = triggers[0].getBoundingClientRect();

highlight.classList.add("box");
highlight.classList.add("hidden");
highlight.style.transform = `translate(${initialPos.left}px, ${
  initialPos.top
}px) scale(1.4)`;

document.body.append(highlight);

function highlightIcon() {
  const rect = this.getBoundingClientRect();
  const offsetTop = rect.top;

  highlight.style.transform = `translate(${
    rect.left
  }px, ${offsetTop}px) scale(1.4)`;

  if (highlight.classList.contains("hidden")) {
    highlight.classList.remove("hidden");
  }
}

triggers.forEach(icon => {
  icon.addEventListener("mouseenter", highlightIcon);
});

social.addEventListener("mouseleave", () => {
  highlight.classList.add("hidden");
});
