import './styles/main.scss';

ymaps.ready(function () {
    const myMap = new ymaps.Map("map", {
        center: [54.7388, 55.9721],
        zoom: 14,
        controls: []
    }, {
        suppressMapOpenBlock: true
    });

    myMap.behaviors.disable(['scrollZoom', 'drag', 'multiTouch']);
});


const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.carousel-card');

let currentIndex = 0;
const cardWidth = 300;
const visibleCards = 3;
const maxIndex = cards.length - visibleCards;

function updateCarousel() {
    const translateX = -currentIndex * cardWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

updateCarousel();

let startX = 0;
let isDragging = false;

carouselTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carouselTrack.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

carouselTrack.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0 && currentIndex < maxIndex) {
            currentIndex++;
        } else if (diffX < 0 && currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel();
    }
});

function updateResponsive() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        const newMaxIndex = cards.length - 1;
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
    } else {
        const newMaxIndex = cards.length - 3;
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
    }
    updateCarousel();
}

window.addEventListener('resize', updateResponsive);
updateResponsive();