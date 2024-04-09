// Constants for API URLs and image paths
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// DOM elements
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Event listener for form submission
form.addEventListener("submit", handleSubmit);

// Display recommended or searched movies based on user input
getMovies(API_URL);

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const searchTerm = search.value.trim();
    if (searchTerm) {
        getMovies(SEARCH_API + searchTerm);
    } else {
        window.location.reload();
    }
}

//By Griffins

// Fetch movies from the API
async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (search.value && search.value.trim() !== "") {
        displayMovies(data.results, IMG_PATH);
    } else {
        displayRecommendedMovies(data.results, IMG_PATH);
    }
}

// Display recommended movies
function displayRecommendedMovies(movies, imagePath) {
    main.innerHTML = '';
    const movieContainer = createMovieContainer();
    movies.forEach(movie => {
        const { title, backdrop_path, overview } = movie;
        const movieCard = createMovieCard(title, imagePath + backdrop_path, overview);
        movieContainer.appendChild(movieCard);
    });
    main.appendChild(movieContainer);
}

// Display searched movies
function displayMovies(movies, imagePath) {
    main.innerHTML = '';
    const movieContainer = createMovieContainer();
    movies.forEach(movie => {
        const { title, poster_path, overview } = movie;
        const movieCard = createMovieCard(title, imagePath + poster_path, overview);
        movieContainer.appendChild(movieCard);
    });
    main.appendChild(movieContainer);
}

// Create a movie container div
function createMovieContainer() {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('d-flex', 'flex-wrap');
    return movieContainer;
}

// Create a movie card div
function createMovieCard(title, imagePath, overview) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('card', 'movie-card', 'h-100', 'border-0', 'shadow', 'mr-3', 'mb-3');
    movieCard.innerHTML = `
        <img src="${imagePath}" alt="${title}" class="card-img-top">
        <div class="card-body">
            <h3 class="card-title text-lg font-semibold mb-2">${title}</h3>
            <p class="card-text text-gray-700">${overview}</p>
        </div>
    `;
    return movieCard;
}

// Testimonials data
const testimonials = [
    {
        quote: "GritFlix has completely transformed the way I enjoy movies. Its vast collection and intuitive interface make discovering new films an absolute delight.",
        author: "- John Doe"
    },
    {
        quote: "I've never experienced movie-watching quite like this before. GritFlix's search functionality and curated recommendations have opened up a world of cinematic treasures for me.",
        author: "- Jane Smith"
    },
    {
        quote: "Thanks to GritFlix, movie nights have become the highlight of my week. I can easily find the perfect film to suit my mood, making every viewing experience unforgettable.",
        author: "- Emily Johnson"
    }
];

// Display testimonials
const testimonialContainer = document.getElementById('testimonialContainer');
let testimonialIndex = 0;
displayTestimonials();

// Function to display testimonials with fade-in/out effect
function displayTestimonials() {
    const currentTestimonial = testimonials[testimonialIndex];
    testimonialContainer.innerHTML = `
        <p class="text-gray-700 mb-4">${currentTestimonial.quote}</p>
        <p class="text-gray-600">${currentTestimonial.author}</p>
    `;
    fadeIn(testimonialContainer);
    setTimeout(() => {
        fadeOut(testimonialContainer);
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        setTimeout(displayTestimonials, 5000);
    }, 5000);
}

// Function to fade in an element
function fadeIn(element) {
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.1;
        element.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeInInterval);
        }
    }, 100);
}

// Function to fade out an element
function fadeOut(element) {
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
        opacity -= 0.1;
        element.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeOutInterval);
        }
    }, 100);
}

// Typing effect
const textToType = "Welcome to GritFlix";
const textElement = document.getElementById("text");
typeWriterEffect(textToType);

// Function for typing animation
function typeWriterEffect(text, index = 0) {
    if (index === text.length) return;
    const currentText = text.substring(0, index + 1);
    textElement.textContent = currentText;
    setTimeout(() => {
        typeWriterEffect(text, index + 1);
    }, 100);
}

