const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const animateClass = el.dataset.animate;
            if (animateClass) {
                el.classList.add(animateClass);
                observer.unobserve(el);
            }
        }
    });
}, {
    threshold: 0,
    rootMargin: '0px 0px -20% 0px'
});

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});
