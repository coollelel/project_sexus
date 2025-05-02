import * as confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';

class StarField {
    constructor(container) {
        this.container = container;
        this.stars = [];
        this.createStars(50);
        this.continuousStarMovement();
    }

    createStars(count) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.position = 'absolute';
            star.style.width = '5px';
            star.style.height = '5px';
            star.style.backgroundColor = '#0f0';
            star.style.borderRadius = '50%';
            star.style.boxShadow = '0 0 10px #0f0';
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            this.container.appendChild(star);
            this.stars.push(star);
        }
    }

    continuousStarMovement() {
        setInterval(() => {
            this.stars.forEach(star => {
                star.style.transition = 'all 2s ease';
                star.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
            });
        }, 2000);
    }

    animateIntro() {
        this.stars.forEach(star => {
            star.style.transition = 'all 1s ease';
            star.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)`;
        });
    }

    rapidMove() {
        this.stars.forEach(star => {
            star.style.transition = 'all 0.2s ease';
            star.style.transform = `translate(${(Math.random() - 0.5) * 500}px, ${(Math.random() - 0.5) * 500}px)`;
        });
        
        setTimeout(() => {
            this.stars.forEach(star => {
                star.style.transform = 'translate(0, 0)';
            });
        }, 200);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const starField = document.getElementById('starfield');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const menu = document.getElementById('menu');
    const mainButton = document.getElementById('mainButton');
    const placeholderButton = document.getElementById('placeholderButton');
    const starFieldAnimation = new StarField(starField);
    window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0f0']
    });
    mainButton.style.display = 'none';
    mainButton.style.opacity = 0;
    document.addEventListener('click', () => {
        starFieldAnimation.animateIntro();
        title.style.opacity = 1;
        description.style.opacity = 1;
        setTimeout(() => {
            starFieldAnimation.rapidMove();
            title.style.transform = 'translateY(-50px)';
            menu.style.bottom = '50%';
            menu.style.transform = 'translateY(50%)';
            mainButton.style.display = 'block';
            setTimeout(() => {
                mainButton.style.opacity = 1;
                mainButton.style.transition = 'opacity 0.5s ease';
            }, 500);
        }, 1000);
    }, { once: true });
    mainButton.addEventListener('click', () => {
        mainButton.style.opacity = 0;
        mainButton.style.transform = 'translateY(-50px)';
        mainButton.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        description.style.opacity = 0;
        description.style.transform = 'translateY(50px)';
        description.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
            description.style.display = 'none';
        }, 500);
        setTimeout(() => {
            placeholderButton.style.display = 'block';
            placeholderButton.style.opacity = 1;
            placeholderButton.style.transition = 'opacity 0.5s ease';
            title.style.transform = 'translateY(-75px)';
            title.style.transition = 'transform 0.5s ease';
        }, 500);
    });
});
