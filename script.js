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
  }, instant ? 0 : 600); // Không delay nếu instant = true
}

// Scroll bằng chuột hoặc phím
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

// Click từ navbar hoặc nút CTA (bỏ qua delay)
document.querySelectorAll(".navbar a, .cta-button").forEach((link, i) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Xác định index tương ứng với section
    const href = link.getAttribute("href");
    const target = document.querySelector(href);
    const index = Array.from(sections).indexOf(target);

    if (index !== -1) {
      scrollToSection(index, true); // instant scroll
    }
  });
});
