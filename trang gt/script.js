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

// --- Hiệu ứng animator khi lướt tới section 3 ---
const section3 = document.querySelector('#section3');
const container3 = section3.querySelector('.container');
const imgLichsu = section3.querySelector('.img-lichsu');
const imgTrangnguyen = section3.querySelector('.img-trangnguyen');
const imgDen = section3.querySelector('.img-den');

// Xóa sẵn class show để hiệu ứng chỉ chạy khi lướt tới
container3.classList.remove('show');
imgLichsu.classList.remove('show');
imgTrangnguyen.classList.remove('show');
imgDen.classList.remove('show');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      container3.classList.add('show');
      imgLichsu.classList.add('show');
      imgTrangnguyen.classList.add('show');
      imgDen.classList.add('show');
    }
  });
}, { threshold: 0.3 });
observer.observe(section3);

// --- Hiệu ứng animator khi lướt tới section 2 ---
const section2 = document.querySelector('#section2');
const animators2 = section2.querySelectorAll('.animator');
// Xóa sẵn class show để hiệu ứng chỉ chạy khi lướt tới
animators2.forEach(el => el.classList.remove('show'));
const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animators2.forEach((el, i) => {
        setTimeout(() => el.classList.add('show'), i * 120); // hiệu ứng lần lượt
      });
    }
  });
}, { threshold: 0.3 });
observer2.observe(section2);

// --- Hiệu ứng chuyển ảnh khi click vào ảnh trong .img-lichsu ---
const lichsuImgs = Array.from(imgLichsu.querySelectorAll('.lichsu-img'));

imgLichsu.addEventListener('click', function(e) {
  // Chỉ xử lý khi click vào ảnh
  if (!e.target.classList.contains('lichsu-img')) return;
  // Xoay vị trí các class pos1, pos2, pos3
  const classes = ['pos1', 'pos2', 'pos3'];
  // Lấy vị trí hiện tại
  const current = lichsuImgs.map(img => classes.find(cls => img.classList.contains(cls)));
  // Xoay mảng sang phải
  const next = [current[2], current[0], current[1]];
  // Gán lại class
  lichsuImgs.forEach((img, i) => {
    classes.forEach(cls => img.classList.remove(cls));
    img.classList.add(next[i]);
  });
});

const section2Swiper = new Swiper('.section2Swiper', {
  loop: true,
  navigation: {
    nextEl: '.section2-right .swiper-button-next',
    prevEl: '.section2-right .swiper-button-prev',
  },
  pagination: {
    el: '.section2-right .swiper-pagination',
    clickable: true,
  },
  effect: "slide",
  speed: 600,
  autoplay: {
    delay: 10000, // 2 giây
    disableOnInteraction: false,
  },
  slidesPerView: 2, // Hiển thị 2 slide trên màn hình lớn
  spaceBetween: 32, // Khoảng cách giữa các slide
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
    1300: {
      slidesPerView: 3,
      spaceBetween: 40,
    }
  }
});



// section 4
document.addEventListener('DOMContentLoaded', () => {
    /* --------- Page flip logic (giữ nguyên) --------- */
    const pages = Array.from(document.querySelectorAll('.page-right'));
    const flippablePages = pages.filter(p => p.querySelector('.page-face.back'));

    let currentIndex = 0;

    if (flippablePages.length) {
        window.addEventListener('wheel', (e) => {
            if (e.deltaY > 0 && currentIndex < flippablePages.length) {
                flippablePages[currentIndex].classList.add('flipped');
                currentIndex++;
            } else if (e.deltaY < 0 && currentIndex > 0) {
                currentIndex--;
                flippablePages[currentIndex].classList.remove('flipped');
            }

            // Toggle decor visibility
            if (currentIndex > 0) {
                document.querySelector('.container').classList.add('page-flipped');
            } else {
                document.querySelector('.container').classList.remove('page-flipped');
            }
        }, { passive: true });
    }

    /* --------- Floating animation for decor --------- */
    const decorations = Array.from(document.querySelectorAll('.decor'))
        .filter(el => !el.classList.contains('student-male') && !el.classList.contains('student-female'));

    decorations.forEach(el => {
        const computed = getComputedStyle(el);
        const baseTransform = computed.transform === 'none' ? '' : computed.transform;
        el.dataset.baseTransform = baseTransform;
        el.dataset.speed = (Math.random() * 0.0005 + 0.00025).toString(); // rad/ms
        el.dataset.phase = (Math.random() * Math.PI * 2).toString();
        el.dataset.amplitude = (Math.random() * 8 + 5).toString(); // 5-13px
    });

    function animateDecorations(time) {
        decorations.forEach(el => {
            const speed = parseFloat(el.dataset.speed);
            const phase = parseFloat(el.dataset.phase);
            const amplitude = parseFloat(el.dataset.amplitude);
            const dy = Math.sin(time * speed + phase) * amplitude;
            const base = el.dataset.baseTransform;
            el.style.transform = `${base} translateY(${dy}px)`;
        });
        requestAnimationFrame(animateDecorations);
    }

    if (decorations.length) {
        requestAnimationFrame(animateDecorations);
    }
}); 