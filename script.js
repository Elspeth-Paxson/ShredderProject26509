function sayHello() {
    alert("Welcome to the Plastic Shredder Project!");
}

function showTab(tabId) {
  // hide all sections
  const sections = document.querySelectorAll(".tab-content");
  sections.forEach(section => section.style.display = "none");

  // remove active class from all buttons
  const buttons = document.querySelectorAll(".tab");
  buttons.forEach(btn => btn.classList.remove("active"));

  // show selected section
  document.getElementById(tabId).style.display = "block";

  // highlight clicked button
  event.target.classList.add("active");
}

let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slideshow .slide");

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 3000); // changes image every 3 seconds
}

// start slideshow
showSlides();
