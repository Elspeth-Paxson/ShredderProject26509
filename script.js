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

    const bolts = 4;

    for (let b = 0; b < bolts; b++) {

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");

        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.pointerEvents = "none";

        const path = document.createElementNS(svgNS, "path");

        // ⚡ direction per bolt
        const baseAngle = Math.random() * Math.PI * 2;
        const angle = baseAngle + (Math.random() - 0.5) * 0.5;

        let d = `M ${x} ${y}`;

        let segments = 7;
        let length = 160 + Math.random() * 80;

        let cx = x;
        let cy = y;

        for (let i = 0; i < segments; i++) {
            let step = length / segments;

            cx += Math.cos(angle) * step;
            cy += Math.sin(angle) * step;

            let wiggleX = (Math.random() - 0.5) * 25;
            let wiggleY = (Math.random() - 0.5) * 25;

            d += ` L ${cx + wiggleX} ${cy + wiggleY}`;
        }

        path.setAttribute("d", d);

        // ⚡ CINEMATIC STROKE
        path.setAttribute("stroke", "#BFF6FF");
        path.setAttribute("stroke-width", "2.5");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");

        // ⚡ CINEMATIC GLOW (IMPORTANT PART)
        path.style.filter = `
            drop-shadow(0 0 4px #00E5FF)
            drop-shadow(0 0 10px #1E90FF)
            drop-shadow(0 0 18px rgba(0, 229, 255, 0.6))
        `;

        // ⚡ DRAW ANIMATION
        const lengthTotal = 400;
        path.style.strokeDasharray = lengthTotal;
        path.style.strokeDashoffset = lengthTotal;
        path.style.transition =
            "stroke-dashoffset 0.25s ease-out, opacity 0.6s ease-out";

        // slight natural variation
        path.style.opacity = 0.85 + Math.random() * 0.15;

        svg.appendChild(path);
        container.appendChild(svg);

        requestAnimationFrame(() => {
            path.style.strokeDashoffset = "0";
        });

        // fade out
        setTimeout(() => {
            path.style.opacity = "0";
        }, 250 + Math.random() * 120);

        setTimeout(() => {
            svg.remove();
        }, 700);
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
