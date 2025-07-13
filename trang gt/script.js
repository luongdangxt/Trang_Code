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

// Function để lọc sections hiển thị trên mobile
function getVisibleSections() {
  const allSections = document.querySelectorAll(".page");
  const visibleSections = [];
  
  allSections.forEach((section, index) => {
    const computedStyle = window.getComputedStyle(section);
    if (computedStyle.display !== 'none') {
      visibleSections.push({ section, originalIndex: index });
    }
  });
  
  return visibleSections;
}

function scrollToSection(index, instant = false) {
  const visibleSections = getVisibleSections();
  if (index < 0 || index >= visibleSections.length) return;

  isScrolling = true;
  currentIndex = index;
  visibleSections[index].section.scrollIntoView({ behavior: instant ? "auto" : "smooth" });

  setTimeout(() => {
    isScrolling = false;
  }, instant ? 0 : 600);
}

// Scroll bằng chuột & phím
window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  const visibleSections = getVisibleSections();
  if (e.deltaY > 0) scrollToSection(currentIndex + 1);
  else scrollToSection(currentIndex - 1);
});

// Thêm touch support cho mobile
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchend", (e) => {
  if (isScrolling) return;
  
  touchEndY = e.changedTouches[0].clientY;
  const touchDiff = touchStartY - touchEndY;
  
  // Chỉ scroll nếu swipe đủ dài (ít nhất 50px)
  if (Math.abs(touchDiff) > 50) {
    if (touchDiff > 0) {
      scrollToSection(currentIndex + 1);
    } else {
      scrollToSection(currentIndex - 1);
    }
  }
}, { passive: true });

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
    
    if (target) {
      const visibleSections = getVisibleSections();
      const targetVisibleIndex = visibleSections.findIndex(item => item.section === target);
      
      if (targetVisibleIndex !== -1) {
        scrollToSection(targetVisibleIndex, true);
      } else {
        // Nếu target bị ẩn, tìm section gần nhất
        const allSections = document.querySelectorAll(".page");
        const targetOriginalIndex = Array.from(allSections).indexOf(target);
        
        if (targetOriginalIndex !== -1) {
          // Tìm section hiển thị gần nhất
          let nearestIndex = 0;
          let minDistance = Infinity;
          
          visibleSections.forEach((item, index) => {
            const distance = Math.abs(item.originalIndex - targetOriginalIndex);
            if (distance < minDistance) {
              minDistance = distance;
              nearestIndex = index;
            }
          });
          
          scrollToSection(nearestIndex, true);
        }
      }
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
      // Thêm delay khác nhau cho từng element để tạo hiệu ứng cascade
      animators2.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('show');
          // Thêm hiệu ứng bounce nhẹ
          el.style.animation = 'bounceIn 0.6s ease-out';
        }, i * 120);
      });
      
      // Khởi động swiper khi section2 hiển thị
      if (section2Swiper && !section2Swiper.initialized) {
        section2Swiper.init();
      }
    }
  });
}, { 
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px' // Trigger sớm hơn một chút
});

observer2.observe(section2);

// Thêm CSS animation cho bounce effect
const style = document.createElement('style');
style.textContent = `
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: translateY(40px) scale(0.8);
    }
    50% {
      opacity: 1;
      transform: translateY(-5px) scale(1.05);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
document.head.appendChild(style);

// Cải thiện responsive cho section2
function handleSection2Responsive() {
  const section2 = document.querySelector('#section2');
  if (!section2) return;
  
  const width = window.innerWidth;
  const animators = section2.querySelectorAll('.animator');
  
  // Điều chỉnh animation delay dựa trên screen size
  if (width <= 768) {
    animators.forEach((el, i) => {
      el.style.animationDelay = `${i * 80}ms`; // Nhanh hơn trên mobile
    });
  } else {
    animators.forEach((el, i) => {
      el.style.animationDelay = `${i * 120}ms`;
    });
  }
}

// Function để reset currentIndex khi resize
function handleResize() {
  const visibleSections = getVisibleSections();
  if (currentIndex >= visibleSections.length) {
    currentIndex = Math.max(0, visibleSections.length - 1);
  }
  
  // Reset currentIndex nếu section hiện tại bị ẩn
  if (visibleSections.length > 0) {
    const currentSection = visibleSections[currentIndex]?.section;
    if (currentSection && window.getComputedStyle(currentSection).display === 'none') {
      currentIndex = 0;
    }
  }
}

// Gọi function khi resize
window.addEventListener('resize', () => {
  handleSection2Responsive();
  handleResize();
});

// Gọi lần đầu khi load
document.addEventListener('DOMContentLoaded', () => {
  handleSection2Responsive();
  handleResize();
});

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
    delay: 10000,
    disableOnInteraction: false,
  },
  slidesPerView: 1, // Mặc định hiển thị 1 slide
  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      }
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 15,
      autoplay: {
        delay: 9000,
        disableOnInteraction: false,
      }
    },
    600: {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      }
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 25,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      }
    },
    900: {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      }
    },
    1200: {
      slidesPerView: 1,
      spaceBetween: 35,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      }
    },
    1400: {
      slidesPerView: 2,
      spaceBetween: 40,
      autoplay: {
        delay: 12000,
        disableOnInteraction: false,
      }
    },
    1600: {
      slidesPerView: 3,
      spaceBetween: 45,
      autoplay: {
        delay: 15000,
        disableOnInteraction: false,
      }
    }
  },
  // Thêm touch support tốt hơn cho mobile
  touchRatio: 1,
  touchAngle: 45,
  grabCursor: true,
  // Cải thiện performance
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  // Responsive autoplay
  on: {
    init: function() {
      // Pause autoplay khi user tương tác
      this.el.addEventListener('touchstart', () => {
        this.autoplay.stop();
      });
      
      // Resume autoplay sau 5 giây không tương tác
      this.el.addEventListener('touchend', () => {
        setTimeout(() => {
          this.autoplay.start();
        }, 5000);
      });
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