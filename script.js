// Search bar functionality - only if search bar exists
const searchBarButton = document.querySelector('.search-bar button');
const searchBarInput = document.querySelector('.search-bar input');

if (searchBarButton && searchBarInput) {
    searchBarButton.addEventListener('click', () => {
        const location = searchBarInput.value.trim();
        if (location) {
            alert(`Searching merchants near: ${location}`);
            // You can replace this with actual search logic or redirection
        } else {
            alert("Please enter your location.");
        }
    });
}

// Language dropdown functionality
const dropdownItems = document.querySelectorAll('.dropdown-item');
const langButton = document.querySelector('.dropdown-toggle');

if (dropdownItems.length > 0 && langButton) {
    dropdownItems.forEach(item => {
        item.addEventListener('click', function () {
            dropdownItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            langButton.innerHTML = `🌐 ${this.textContent}`;
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const langDropdown = document.getElementById("langDropdown");
    const defaultLang = localStorage.getItem("lang") || "ar";
    
    console.log("DOM loaded, default language:", defaultLang);

    function loadLanguage(lang) {
        console.log("Loading language:", lang);
        fetch("lang.json")
            .then((res) => res.json())
            .then((translations) => {
                console.log("Translations loaded for:", lang);
                const textElements = document.querySelectorAll("[data-i18n]");
                console.log("Found", textElements.length, "elements to translate");
                
                // Test translation
                console.log("Testing translation for 'aboutPageTitle':", translations[lang]["aboutPageTitle"]);
                
                textElements.forEach((el) => {
                    const key = el.getAttribute("data-i18n");
                    const translation = translations[lang][key];
                    if (translation) {
                        el.textContent = translation;
                        console.log("Translated", key, "to:", translation.substring(0, 50) + "...");
                    } else {
                        console.warn("No translation found for key:", key);
                    }
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
                
                // Update dropdown button text and active class
                const langButton = document.querySelector('.dropdown-toggle');
                if (langButton && langDropdown) {
                    // Remove active class from all items
                    langDropdown.querySelectorAll("a").forEach(a => a.classList.remove("active"));
                    
                    // Add active class to the correct item
                    const activeItem = langDropdown.querySelector(`[data-lang="${lang}"]`);
                    if (activeItem) {
                        activeItem.classList.add("active");
                        langButton.innerHTML = `🌐 ${activeItem.textContent}`;
                        console.log("Updated button text to:", activeItem.textContent);
                    }
                }
            })
            .catch((error) => {
                console.error("Error loading translations:", error);
            });
    }

    // Handle language selection
    if (langDropdown) {
        langDropdown.querySelectorAll("a").forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                const selectedLang = item.getAttribute("data-lang");
                console.log("Language selected:", selectedLang);
                loadLanguage(selectedLang);
            });
        });
    } else {
        console.error("Language dropdown not found!");
    }

    // Load saved/default language on load with a small delay to ensure DOM is ready
    setTimeout(() => {
        loadLanguage(defaultLang);
    }, 100);
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








