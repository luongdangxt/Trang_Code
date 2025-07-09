// Swiper init
const swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 2000, // Chuyển ảnh nhanh hơn
    disableOnInteraction: false,
  },
  effect: "slide",
  speed: 700
});

const sections = document.querySelectorAll(".page");
let currentIndex = 0;
let isScrolling = false;

function scrollToSection(index, instant = false) {
  if (index < 0 || index >= sections.length) return;

  isScrolling = true;
  currentIndex = index;
  sections[index].scrollIntoView({ behavior: instant ? "auto" : "smooth" });

  setTimeout(() => {
    isScrolling = false;
  }, instant ? 0 : 600);
}

// Scroll bằng chuột & phím
window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0) scrollToSection(currentIndex + 1);
  else scrollToSection(currentIndex - 1);
});

window.addEventListener("keydown", (e) => {
  if (isScrolling) return;

  if (e.key === "ArrowDown") scrollToSection(currentIndex + 1);
  else if (e.key === "ArrowUp") scrollToSection(currentIndex - 1);
});

// Click navbar / CTA
document.querySelectorAll(".navbar a, .cta-button").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    const target = document.querySelector(href);
    const index = Array.from(sections).indexOf(target);
    if (index !== -1) {
      scrollToSection(index, true);
    }
  });
});
