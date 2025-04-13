const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const animateClass = el.dataset.animate;
            if (animateClass) {
                el.classList.add(animateClass);
            }
        } else{
            const el = entry.target;
            const animateClass = el.dataset.animate;
            if (animateClass) {
                el.classList.remove(animateClass);
            }
        }
    });
}, {
    threshold: 0.3,
});

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});
