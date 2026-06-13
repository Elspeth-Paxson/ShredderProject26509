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

function teamEffect(type, name, event) {
    const x = event.clientX;
    const y = event.clientY;

    if (type === "electrical") {
        createRipple(x, y);
        createLightning(x, y);

        // ⚡ NEW: delayed secondary arc (residual discharge)
         setTimeout(() => {
            createLightningShort(
                x + (Math.random() - 0.5) * 25,
                y + (Math.random() - 0.5) * 25
                );
        }, 180);
    }
    
    if (type === "mechanical") {
        createGears(event.clientX, event.clientY);
    
        if (name === "Marcus") {
            setTimeout(() => {
                createSpecialMarcusRocketLoop(event.clientX, event.clientY);
            }, 200);
        }
    }

    if (type === "management") {
        createConfetti(x, y);
    }
}

function createRipple(x, y) {
    const ripple = document.createElement("div");

    ripple.style.position = "absolute";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.width = "10px";
    ripple.style.height = "10px";
    ripple.style.borderRadius = "50%";
    ripple.style.border = "2px solid rgba(0, 229, 255, 0.35)";
    ripple.style.boxShadow = "0 0 12px rgba(0, 229, 255, 0.2)";
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.pointerEvents = "none";
    ripple.style.opacity = "0.6";

    document.getElementById("confetti-container").appendChild(ripple);

    let size = 10;
    let opacity = 0.6;

    function animate() {
        size += 6;
        opacity *= 0.93;

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";
        ripple.style.opacity = opacity;

        if (opacity > 0.05) {
            requestAnimationFrame(animate);
        } else {
            ripple.remove();
        }
    }

    animate();
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

function createLightningShort(x, y) {
    const container = document.getElementById("confetti-container");

    const bolts = 3; // 👈 multiple strands again, but fewer than main

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

        const baseAngle = Math.random() * Math.PI * 2;
        const angle = baseAngle + (Math.random() - 0.5) * 0.5;

        let d = `M ${x} ${y}`;

        // 🔥 shorter + simpler than main lightning
        let segments = 5;
        let length = 70 + Math.random() * 50;

        let cx = x;
        let cy = y;

        for (let i = 0; i < segments; i++) {
            let step = length / segments;

            cx += Math.cos(angle) * step;
            cy += Math.sin(angle) * step;

            let wiggleX = (Math.random() - 0.5) * 18;
            let wiggleY = (Math.random() - 0.5) * 18;

            d += ` L ${cx + wiggleX} ${cy + wiggleY}`;
        }

        path.setAttribute("d", d);

        // ⚡ slightly softer than main lightning
        path.setAttribute("stroke", "#BFF6FF");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");

        path.style.filter = `
            drop-shadow(0 0 3px #00E5FF)
            drop-shadow(0 0 8px #1E90FF)
        `;

        const lengthTotal = 250;
        path.style.strokeDasharray = lengthTotal;
        path.style.strokeDashoffset = lengthTotal;
        path.style.transition =
            "stroke-dashoffset 0.2s ease-out, opacity 0.4s ease-out";

        svg.appendChild(path);
        container.appendChild(svg);

        requestAnimationFrame(() => {
            path.style.strokeDashoffset = "0";
        });

        setTimeout(() => {
            path.style.opacity = "0";
        }, 180 + b * 40); // slight stagger = more natural

        setTimeout(() => {
            svg.remove();
        }, 500);
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

function createSpecialMarcusRocketLoop(x, y) {
    const container = document.getElementById("confetti-container");

    const rocket = document.createElement("div");
    rocket.classList.add("rocket");

    rocket.innerHTML = `
        <div class="rocket-nose"></div>
        <div class="rocket-body"></div>
        <div class="rocket-fin left"></div>
        <div class="rocket-fin right"></div>
        <div class="rocket-flame"></div>
    `;

    container.appendChild(rocket);

    const path = document.createElement("div");
    path.classList.add("telemetry-line");

    path.style.position = "absolute";
    path.style.width = "2px";
    path.style.height = "0px";
    path.style.pointerEvents = "none";

    container.appendChild(path);

    let phase = 1;
    let t = 0;

    const startX = x;
    const startY = y;

    // ✅ moved inward so it doesn't stick to edge
    const leftEdgeX = 80;

    const topExitY = -120;

    let posX = x;
    let posY = y;
    let ascentStartY = 0;

    function pulse(x, y) {
        const glow = document.createElement("div");

        glow.style.position = "absolute";
        glow.style.left = x + "px";
        glow.style.top = y + "px";
        glow.style.width = "10px";
        glow.style.height = "10px";
        glow.style.borderRadius = "50%";
        glow.style.background = "rgba(0, 229, 255, 0.9)";
        glow.style.boxShadow = "0 0 25px 10px rgba(0, 229, 255, 0.6)";
        glow.style.transform = "translate(-50%, -50%)";
        glow.style.pointerEvents = "none";

        container.appendChild(glow);

        let s = 10;
        let o = 1;

        function animate() {
            s += 14;
            o *= 0.85;

            glow.style.width = s + "px";
            glow.style.height = s + "px";
            glow.style.opacity = o;

            if (o > 0.05) {
                requestAnimationFrame(animate);
            } else {
                glow.remove();
            }
        }

        animate();
    }

    function animate() {

        // =========================
        // PHASE 1: MOVE LEFT
        // =========================
        if (phase === 1) {
            t += 0.006;

            posX = startX + (leftEdgeX - startX) * t;
            posY = startY + Math.sin(t * Math.PI) * 40;

            if (t >= 1) {
                posX = leftEdgeX;
                posY = startY;

                ascentStartY = posY;

                phase = 2;
                t = 0;

                pulse(posX, posY);
            }
        }

        // =========================
        // PHASE 2: STRAIGHT UP (FIXED ROTATION)
        // =========================
        else if (phase === 2) {

            const speed = 0.004 + (t * 0.01);
            t += speed;

            posX = leftEdgeX;
            posY = ascentStartY + (topExitY - ascentStartY) * t;

            // 🔥 only tiny vibration (no sideways tilt confusion)
            posX += (Math.random() - 0.5) * 0.4;
            posY += (Math.random() - 0.5) * 0.4;

            path.style.left = leftEdgeX + "px";
            path.style.top = ascentStartY + "px";
            path.style.height = (ascentStartY - posY) + "px";

            if (t >= 1) {
                path.style.transition = "opacity 1.2s ease-out";
                path.style.opacity = "0";

                setTimeout(() => path.remove(), 1200);
                rocket.remove();
                return;
            }
        }

        // =========================
        // ROTATION FIX
        // =========================
        let angle;

        if (phase === 1) {
            const dx = posX - (rocket._lastX || posX);
            const dy = posY - (rocket._lastY || posY);
            angle = Math.atan2(dy, dx);
        } else {
            // 🚀 FORCE STRAIGHT UP DURING ASCENT
            angle = -Math.PI / 2;
        }

        rocket.style.left = posX + "px";
        rocket.style.top = posY + "px";

        rocket.style.transform = `
            translate(-50%, -50%)
            rotate(${angle}rad)
        `;

        rocket._lastX = posX;
        rocket._lastY = posY;

        requestAnimationFrame(animate);
    }

    animate();
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
