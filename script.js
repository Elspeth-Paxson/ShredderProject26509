function sayHello(event) {
    alert("Welcome to the Plastic Shredder Project! 🚀");

    createConfetti(event.clientX, event.clientY);
}

function showTab(tabId, event) {
  const sections = document.querySelectorAll(".tab-content");
  sections.forEach(section => section.style.display = "none");

  const buttons = document.querySelectorAll(".tab");
  buttons.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).style.display = "block";

  event.currentTarget.classList.add("active");
}


function teamEffect(type, event) {
    const x = event.clientX;
    const y = event.clientY;

    if (type === "electrical") {
        createLightning(x, y, 0);
    }

    if (type === "mechanical") {
        createGears(x, y);
    }

    if (type === "management") {
        createConfetti(x, y);
    }
}

function createLightning(x, y) {
    const container = document.getElementById("confetti-container");

    const lines = 6;

    for (let i = 0; i < lines; i++) {
        const line = document.createElement("div");
        line.classList.add("electric-line");

        const angle = (Math.PI * 2 * i) / lines;
        const length = 60 + Math.random() * 60;

        const endX = Math.cos(angle) * length;
        const endY = Math.sin(angle) * length;

        const rot = Math.atan2(endY, endX);

        line.style.left = x + "px";
        line.style.top = y + "px";
        line.style.width = length + "px";
        line.style.transform = `rotate(${rot}rad)`;

        container.appendChild(line);

        setTimeout(() => line.remove(), 600);
    }
}
function createFlash(x, y) {
    const flash = document.createElement("div");
    flash.style.position = "absolute";
    flash.style.left = x + "px";
    flash.style.top = y + "px";
    flash.style.width = "10px";
    flash.style.height = "10px";
    flash.style.borderRadius = "50%";
    flash.style.background = "white";
    flash.style.boxShadow = "0 0 40px 20px #00BFFF";
    flash.style.transform = "translate(-50%, -50%)";
    flash.style.pointerEvents = "none";
    flash.style.opacity = "1";

    document.getElementById("confetti-container").appendChild(flash);

    let size = 10;
    let opacity = 1;

    function animate() {
        size += 18;
        opacity *= 0.85;

        flash.style.width = size + "px";
        flash.style.height = size + "px";
        flash.style.opacity = opacity;

        if (opacity > 0.05) {
            requestAnimationFrame(animate);
        } else {
            flash.remove();
        }
    }

    animate();
}

function createGears(x, y) {
    const container = document.getElementById("confetti-container");

    for (let i = 0; i < 12; i++) {
        const gear = document.createElement("div");
        gear.classList.add("gear");
        gear.innerText = "⚙️";

        container.appendChild(gear);

        let angle = Math.random() * 2 * Math.PI;
        let speed = Math.random() * 7 + 3;
        let distance = 0;

        const vx = Math.cos(angle);
        const vy = Math.sin(angle);

        function animate() {
            speed *= 0.96; // friction
            distance += speed;

            const posX = x + vx * distance;
            const posY = y + vy * distance;

            gear.style.left = posX + "px";
            gear.style.top = posY + "px";

            gear.style.transform = `rotate(${distance * 5}deg)`;

            if (speed > 0.25) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => gear.remove(), 300);
            }
        }

        animate();
    }
}

function createConfetti(x, y) {
    const container = document.getElementById("confetti-container");

    const colors = ["#AB0520", "#0C234B", "#FFD200", "#aaaaaa"];

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement("div");
        piece.classList.add("confetti");

        piece.style.background = colors[Math.floor(Math.random() * colors.length)];

        piece.style.left = x + "px";
        piece.style.top = y + "px";

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 250 + 50;

        piece.style.setProperty("--x", Math.cos(angle) * distance + "px");
        piece.style.setProperty("--y", Math.sin(angle) * distance + "px");

        piece.style.width = (4 + Math.random() * 6) + "px";
        piece.style.height = (6 + Math.random() * 10) + "px";

        container.appendChild(piece);

        setTimeout(() => piece.remove(), 1200);
    }
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

    for (let i = 0; i < 80; i++) {   // 🔥 MORE PIECES = BIGGER EXPLOSION
        const piece = document.createElement("div");
        piece.classList.add("confetti");

        piece.style.background = colors[Math.floor(Math.random() * colors.length)];

        // start at click point
        piece.style.left = x + "px";
        piece.style.top = y + "px";

        // 💥 RANDOM RADIAL EXPLOSION
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 300 + 50;  // BIGGER RANGE

        const dx = Math.cos(angle) * distance + "px";
        const dy = Math.sin(angle) * distance + "px";

        piece.style.setProperty("--x", dx);
        piece.style.setProperty("--y", dy);

        // random size variation
        const size = Math.random() * 8 + 4;
        piece.style.width = size + "px";
        piece.style.height = size * (Math.random() * 2 + 1) + "px";

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 1200);
    }
}
