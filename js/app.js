class SalesScriptApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 8;
        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.updateUI();
    }

    cacheElements() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideEl = document.getElementById('currentSlide');
        this.totalSlidesEl = document.getElementById('totalSlides');
        this.progress = document.getElementById('progress');
    }

    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleKeyboard(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            this.previousSlide();
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            this.nextSlide();
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.updateUI();
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.updateUI();
        }
    }

    updateUI() {
        this.slides.forEach((slide, index) => {
            if (index + 1 === this.currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        this.currentSlideEl.textContent = this.currentSlide;
        this.totalSlidesEl.textContent = this.totalSlides;

        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;

        const progressPercent = (this.currentSlide / this.totalSlides) * 100;
        this.progress.style.width = progressPercent + '%';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SalesScriptApp();
});