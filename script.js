document.querySelector('.search-bar button').addEventListener('click', () => {
    const location = document.querySelector('.search-bar input').value.trim();
    if (location) {
        alert(`Searching merchants near: ${location}`);
        // You can replace this with actual search logic or redirection
    } else {
        alert("Please enter your location.");
    }
});


const dropdownItems = document.querySelectorAll('.dropdown-item');
const langButton = document.querySelector('.dropdown-toggle');

dropdownItems.forEach(item => {
    item.addEventListener('click', function () {
        dropdownItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        langButton.innerHTML = `🌐 ${this.textContent}`;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const langDropdown = document.getElementById("langDropdown");
    const defaultLang = localStorage.getItem("lang") || "ar";

    function loadLanguage(lang) {
        fetch("lang.json")
            .then((res) => res.json())
            .then((translations) => {
                const textElements = document.querySelectorAll("[data-i18n]");
                textElements.forEach((el) => {
                    const key = el.getAttribute("data-i18n");
                    el.textContent = translations[lang][key] || key;
                });

                const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
                placeholderElements.forEach((el) => {
                    const key = el.getAttribute("data-i18n-placeholder");
                    el.placeholder = translations[lang][key] || key;
                });

                // Update HTML direction and save language
                document.documentElement.lang = lang;
                document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
                localStorage.setItem("lang", lang);
            });
    }

    // Handle language selection
    langDropdown.querySelectorAll("a").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedLang = item.getAttribute("data-lang");
            loadLanguage(selectedLang);

            // Update active class
            langDropdown.querySelectorAll("a").forEach(a => a.classList.remove("active"));
            item.classList.add("active");
        });
    });

    // Load saved/default language on load
    loadLanguage(defaultLang);
});


document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("popularCarousel");
    const cards = track.querySelectorAll(".popular-card");
    const cardsPerSlide = 3;
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);
    let currentIndex = 0;

    const slide = () => {
        const offset = currentIndex * track.offsetWidth;
        track.style.transform = `translateX(-${offset}px)`;
        currentIndex = (currentIndex + 1) % totalSlides;
    };

    // Adjust track width to fit all cards in one row
    track.style.width = `${(cards.length / cardsPerSlide) * 100}%`;

    // Start auto slide
    setInterval(slide, 4000);
});

const videoElement = document.getElementById("aboutVideo");
const videoList = [
    "./images/AboutUs_Vid1.mp4"
];
let currentIndex = 0;

function playNextVideo() {
    const source = videoElement.querySelector("source");
    source.src = videoList[currentIndex];
    videoElement.load();
    videoElement.play();
    currentIndex = (currentIndex + 1) % videoList.length;
}

playNextVideo();
videoElement.addEventListener("ended", playNextVideo);

window.addEventListener('load', () => {
    AOS.refresh(); // This forces recalculation after full page load
});








