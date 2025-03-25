let slideIndex = 0;
let timeoutId;

function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    
    // Hide all slides first
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active");
    }
    
    // Move to next slide
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Display the current slide
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
    
    // Set timeout for next slide - changed to 5000ms (5 seconds)
    timeoutId = setTimeout(showSlides, 5000);
}

// Manual navigation functions
function currentSlide(n) {
    clearTimeout(timeoutId); // Clear the automatic transition
    slideIndex = n - 1;
    showSlides();
}

function plusSlides(n) {
    clearTimeout(timeoutId); // Clear the automatic transition
    slideIndex += n - 1;
    showSlides();
}

// Start slideshow when page loads
document.addEventListener("DOMContentLoaded", showSlides);