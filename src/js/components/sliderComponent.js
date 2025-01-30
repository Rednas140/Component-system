document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.c-slider-track-slide');
    const indicators = document.querySelectorAll('.c-slider__indicator');
    const prevButton = document.querySelector('.c-slider-control--prev');
    const nextButton = document.querySelector('.c-slider-control--next');
    let currentIndex = 0;

    // Update slider state
    const updateSlider = (index) => {
        slides.forEach((slide, i) => {
            slide.setAttribute('aria-hidden', i !== index);
        });

        indicators.forEach((indicator, i) => {
            indicator.setAttribute('aria-current', i === index ? 'true' : 'false');
        });

        document.querySelector('.c-slider-track').style.transform = `translateX(-${index * 100}%)`;
    };

    // Event listeners for controls
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(currentIndex);
    });

    // Event listeners for indicators
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index);
            updateSlider(currentIndex);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextButton.click();
        } else if (e.key === 'ArrowLeft') {
            prevButton.click();
        }
    });

    // Initialize slider
    updateSlider(currentIndex);
});
