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

function createLightning(x, y, depth = 0) {
    const container = document.getElementById("confetti-container");

    const branches = depth === 0 ? 4 : Math.floor(Math.random() * 3);

    for (let i = 0; i < branches; i++) {
        const bolt = document.createElement("div");
        bolt.classList.add("spark");
        bolt.innerText = "⚡";

        container.appendChild(bolt);

        const angle = Math.random() * 2 * Math.PI;
        const length = (Math.random() * 120 + 40) / (depth + 1);

        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;

        bolt.style.left = x + "px";
        bolt.style.top = y + "px";

        bolt.style.setProperty("--x", (endX - x) + "px");
        bolt.style.setProperty("--y", (endY - y) + "px");

        bolt.style.opacity = Math.max(1 - depth * 0.35, 0.25);

        setTimeout(() => bolt.remove(), 650);

        if (depth < 2 && Math.random() > 0.45) {
            setTimeout(() => {
                createLightning(endX, endY, depth + 1);
            }, 60);
        }
    }
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
