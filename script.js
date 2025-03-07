class Carousel {
    constructor(carouselId, navId) {
        this.carousel = document.getElementById(carouselId);
        this.nav = document.getElementById(navId);
        this.items = this.carousel.children;
        this.currentIndex = 0;
        
        this.createDots();
        this.startAutoPlay();
    }

    createDots() {
        this.nav.innerHTML = '';
        
        for (let i = 0; i < this.items.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => this.goToSlide(i));
            this.nav.appendChild(dot);
        }
        
        this.updateDots();
    }

    updateDots() {
        this.nav.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.carousel.style.transform = `translateX(-${index * 100}%)`;
        this.updateDots();
    }

    startAutoPlay() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.goToSlide(this.currentIndex);
        }, 5000);
    }
}

new Carousel('carousel1', 'nav1');
new Carousel('carousel2', 'nav2');

document.querySelector('.current-year').textContent = new Date().getFullYear();

const navbar = document.querySelector('.navbar');
navbar.addEventListener('click', () => {
    if(window.innerWidth <= 768) {
        navbar.classList.toggle('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        if(window.innerWidth <= 768) {
            navbar.classList.remove('active');
        }
    });
});