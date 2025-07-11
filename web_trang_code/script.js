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