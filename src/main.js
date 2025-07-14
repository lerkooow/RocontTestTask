import './styles/main.scss';

// Toggle Burger Menu

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("menuToggle");
    const navList = document.getElementById("navList");
    const menuIcon = document.getElementById("menuIcon");

    toggleButton.addEventListener("click", function () {
        navList.classList.toggle("header__nav-list--open");

        const isExpanded = navList.classList.contains("header__nav-list--open");

        toggleButton.setAttribute("aria-label", isExpanded ? "Закрыть меню" : "Открыть меню");
        menuIcon.src = isExpanded ? "/svg/close.svg" : "/svg/burger_menu.svg";
        menuIcon.alt = isExpanded ? "close menu" : "burger menu";
    });
});


// Carousel

const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.carousel__card');

let currentIndex = 0;

function getCardWidth() {
    const card = cards[0];
    return card ? card.getBoundingClientRect().width + 8 : 0;
}

function getVisibleCardsCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) return 1;
    if (screenWidth <= 960) return 2;
    return 3;
}

function updateCarousel() {
    const cardWidth = getCardWidth();
    const translateX = -currentIndex * cardWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;

    const maxIndex = getMaxIndex();
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

function getMaxIndex() {
    const visibleCards = getVisibleCardsCount();
    return Math.max(0, cards.length - visibleCards);
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    const maxIndex = getMaxIndex();
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

let startX = 0;
let isDragging = false;

carouselTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carouselTrack.addEventListener('touchmove', (e) => {
    if (isDragging) {
        e.preventDefault();
    }
});

carouselTrack.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
        const maxIndex = getMaxIndex();

        if (diffX > 0 && currentIndex < maxIndex) {
            currentIndex++;
        } else if (diffX < 0 && currentIndex > 0) {
            currentIndex--;
        }

        updateCarousel();
    }
});

function updateResponsive() {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    updateCarousel();
}

window.addEventListener('resize', updateResponsive);

updateResponsive();
