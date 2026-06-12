function sayHello(event) {
    alert(""Welcome to the Plastic Shredder Project! 🚀");

    createConfetti(event.clientX, event.clientY);
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

function createConfetti(x, y) {
    const container = document.getElementById("confetti-container");

    const colors = ["#AB0520", "#0C234B", "#2f6fdd", "#aaaaaa", "#ffcc00"];

    for (let i = 0; i < 40; i++) {
        const piece = document.createElement("div");
        piece.classList.add("confetti");

        // random color (like shredded plastic bits)
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];

        // random starting position around click
        piece.style.left = x + (Math.random() * 40 - 20) + "px";
        piece.style.top = y + (Math.random() * 20 - 10) + "px";

        // random size variation (like uneven shredding)
        const size = Math.random() * 6 + 4;
        piece.style.width = size + "px";
        piece.style.height = size * (Math.random() * 2 + 1) + "px";

        // random horizontal drift
        const drift = (Math.random() * 100 - 50) + "px";
        piece.style.setProperty("--drift", drift);

        piece.style.animationDuration = (Math.random() * 1 + 1) + "s";

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 1500);
    }
}
