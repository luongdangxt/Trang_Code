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

// Navbar mobile toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar ul');
if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
    navbarToggle.classList.toggle('active');
  });
  // Đóng menu khi bấm vào link
  navbarMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('open');
      navbarToggle.classList.remove('active');
    });
  });
}

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
