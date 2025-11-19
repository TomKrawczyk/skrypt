function goToSlide(slideNumber) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));

    const el = document.getElementById(`slide-${slideNumber}`);
    if (el) {
        el.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {

        console.warn('Brak slajdu o numerze:', slideNumber);
    }
}

function prevSlide() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const currentIndex = slides.findIndex(s => s.classList.contains('active'));
    if (currentIndex > 0) {
        const prevSlide = slides[currentIndex - 1];
        const match = prevSlide.id.match(/slide-(\d+)/);
        if (match) {
            goToSlide(Number(match[1]));
        }
    } else {
      
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Home') {
        goToSlide(1);
        return;
    }

    if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
        // zapobiegamy domyślnej nawigacji Backspace, gdy nie jesteśmy w polu tekstowym
        const activeTag = document.activeElement && document.activeElement.tagName.toLowerCase();
        const isInputActive = ['input', 'textarea'].includes(activeTag) || document.activeElement.isContentEditable;
        if (!isInputActive) {
            event.preventDefault();
            prevSlide();
        } else {

        }
    }
});
