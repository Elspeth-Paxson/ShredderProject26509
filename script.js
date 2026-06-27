let recycleCount = 0;

const TERMINAL_MESSAGES = [
    [
        "> compiling...",
        "✔ success"
    ],
    [
        "> initializing systems...",
        "✔ online"
    ],
    [
        "> powering shredder...",
        "✔ ready"
    ],
    [
        "> flashing firmware...",
        "✔ complete"
    ],
    [
        "> checking bugs...",
        "✔ none found"
    ],
    [
        "> git commit",
        '"works on my machine"'
    ]
];

const CODE_SNIPPETS = [
    "// It works. Don't touch it.",
    "digitalWrite(HIGH);",
    'printf("Hello, World!");',
    "return 0;",
    "pinMode(LED_BUILTIN, OUTPUT);",
    "// TODO: fix this later"
];

function createCodeSnippets(x, y) {

    const container = document.getElementById("confetti-container");

    const snippets = [...CODE_SNIPPETS]
        .sort(() => Math.random() - 0.5)
        .slice(0,3);

    snippets.forEach((text, index)=>{

        const code = document.createElement("div");

        code.textContent = text;

        code.style.position = "absolute";
        code.style.left = (x + (Math.random()*120-60)) + "px";
        code.style.top = (y + (Math.random()*80-40)) + "px";

        code.style.fontFamily = "Consolas, monospace";
        code.style.fontSize = "14px";
        code.style.color = "#8CF8FF";
        code.style.opacity = "0";

        code.style.textShadow = "0 0 8px cyan";

        code.style.pointerEvents = "none";

        container.appendChild(code);

        requestAnimationFrame(()=>{
            code.style.transition =
                "transform 2s ease-out, opacity 2s";

            code.style.opacity = "1";
            code.style.transform = "translateY(-40px)";
        });

        setTimeout(()=>{
            code.style.opacity = "0";
        },1400);

        setTimeout(()=>{
            code.remove();
        },2200);

    });

}

function createTerminal(x, y){

    const container = document.getElementById("confetti-container");

    const terminal = document.createElement("div");

    terminal.style.position = "absolute";
    terminal.style.left = (x+35) + "px";
    terminal.style.top = (y-20) + "px";

    terminal.style.background = "#111";
    terminal.style.border = "1px solid #00E5FF";
    terminal.style.borderRadius = "8px";

    terminal.style.padding = "10px";

    terminal.style.fontFamily = "Consolas, monospace";
    terminal.style.fontSize = "13px";

    terminal.style.color = "#7CFF8B";

    terminal.style.boxShadow =
        "0 0 18px rgba(0,229,255,.5)";

    terminal.style.pointerEvents = "none";

    terminal.style.whiteSpace = "pre";

    container.appendChild(terminal);

    const message =
        TERMINAL_MESSAGES[
            Math.floor(Math.random()*TERMINAL_MESSAGES.length)
        ];

    let line = 0;

    function nextLine(){

        if(line < message.length){

            terminal.innerHTML += message[line] + "<br>";

            line++;

            setTimeout(nextLine,350);

        } else {

            setTimeout(()=>{
                terminal.style.transition="opacity .6s";
                terminal.style.opacity="0";

                setTimeout(()=>{
                    terminal.remove();
                },600);

            },800);

        }

    }

    nextLine();

}

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

function teamEffect(type, name = "", event) {
    if (!event) return; // prevents crashes

    const x = event.clientX;
    const y = event.clientY;

    /*if (type === "electrical") {
        createRipple(x, y);
        createLightning(x, y);

        setTimeout(() => {
            createLightningShort(
                x + (Math.random() - 0.5) * 25,
                y + (Math.random() - 0.5) * 25
            );
        }, 180);
    } */

    if (type === "electrical") {
    createRipple(x, y);
    createLightning(x, y);

    setTimeout(() => {
        createLightningShort(
            x + (Math.random() - 0.5) * 25,
            y + (Math.random() - 0.5) * 25
        );
    }, 180);

    setTimeout(() => {
        createTerminal(x, y);
        createCodeSnippets(x, y);
    }, 250);
}

    if (type === "mechanical") {
        createGears(x, y);

        if (name === "Marcus") {
            setTimeout(() => {
                createSpecialMarcusRocketLoop(x, y);
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

    path.style.position = "absolute";
    path.style.width = "2px";
    path.style.height = "0px";
    path.style.pointerEvents = "none";

    container.appendChild(path);

    let phase = 1;
    let t = 0;

    const startX = x;
    const startY = y;

    const leftEdgeX = 140;
    const topExitY = -150;

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
            posY = startY + Math.sin(t * Math.PI) * 35;
        }
        if (t >= 1) {
            posX = leftEdgeX;
            posY = startY;
        
            ascentStartY = posY;
        
            phase = 2;
            t = 0;
        
            // 🚀 instead of explosion → ignition boost
            rocket.classList.add("ignite");
        
            setTimeout(() => {
                rocket.classList.remove("ignite");
            }, 400);
        }

        // =========================
        // PHASE 2: STRAIGHT UP (NO ROTATION EVER)
        // =========================
        else if (phase === 2) {

            const speed = 0.004 + (t * 0.01);
            t += speed;

            posX = leftEdgeX;
            posY = ascentStartY + (topExitY - ascentStartY) * t;

            // tiny vibration ONLY (no directional drift)
            posX += (Math.random() - 0.5) * 0.2;
            posY += (Math.random() - 0.5) * 0.2;

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
        // ONLY POSITION (NO ROTATION)
        // =========================
        rocket.style.left = posX + "px";
        rocket.style.top = posY + "px";

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
const SHREDDER_FACTS = [
    "PLA is biodegradable under industrial composting conditions.",
    "Calibration cubes test dimensional accuracy.",
    "Warping happens from uneven cooling.",
    "Lower print temperatures can reduce stringing.",
    "Catalyst Studios generates around 50 kg of plastic waste each semester.",
    "Recycling failed prints helps reduce landfill waste."
];

function getRandomFact() {
    return SHREDDER_FACTS[
        Math.floor(Math.random() * SHREDDER_FACTS.length)
    ];
}

function feedBag() {

    const img = document.getElementById("shredder-img");
    const bag = document.getElementById("feed-bag");

    const rect = img.getBoundingClientRect();
    const bagRect = bag.getBoundingClientRect();

    const shapes = ["square", "triangle", "circle", "hexagon"];
    const type = shapes[Math.floor(Math.random() * shapes.length)];

    const obj = document.createElement("div");
    obj.className = `floating-print ${type}`;
    document.body.appendChild(obj);

    // ✅ STATUS + BAR
    const status = document.querySelector(".status .value");
    const bar = document.querySelector(".progress-fill");

    if (status) {
        status.textContent = "SHREDDING";
        status.classList.remove("ready");
        status.classList.add("shredding");
    }

    // ✅ SAFE BAR RESET
    if (bar) {
        bar.style.transition = "none";
        bar.style.width = "0%";
        bar.offsetHeight; // force reflow
        bar.style.transition = "width 0.08s linear";
    }

    // Start at top of bag
    const x0 = bagRect.left + bagRect.width * 0.45;
    const y0 = bagRect.top + 20;

    // End at shredder opening
    const x2 = rect.left + rect.width * 0.82;
    const y2 = rect.top + rect.height * 0.18;

    const x1 = (x0 + x2) / 2;
    const y1 = Math.min(y0, y2) - 220;

    const start = performance.now();
    const duration = 1800;

    function animate(now) {

        let t = (now - start) / duration;
        if (t > 1) t = 1;

        const e = 1 - Math.pow(1 - t, 3);

        if (bar) bar.style.width = (t * 100) + "%";

        const x =
            (1 - e) * (1 - e) * x0 +
            2 * (1 - e) * e * x1 +
            e * e * x2;

        const y =
            (1 - e) * (1 - e) * y0 +
            2 * (1 - e) * e * y1 +
            e * e * y2;

        obj.style.left = x + "px";
        obj.style.top = y + "px";
        obj.style.transform = "translate(-50%, -50%)";

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {

            if (bar) bar.style.width = "100%";

            // bounce shredder
            img.classList.remove("pop");
            void img.offsetWidth;
            img.classList.add("pop");

            // confetti burst
            createConfetti(
                rect.right - 20,
                rect.bottom - rect.height * 0.2
            );

            recycleCount++;

            const counter = document.getElementById("recycle-count");
            const factBox = document.getElementById("fact-text");

            if (counter) counter.textContent = recycleCount;
            if (factBox) factBox.textContent = getRandomFact();

            // ✅ RESET STATUS + BAR
            setTimeout(() => {
                if (status) {
                    status.textContent = "READY";
                    status.classList.remove("shredding");
                    status.classList.add("ready");
                }

                if (bar) {
                    bar.style.transition = "none";
                    bar.style.width = "0%";
                    bar.offsetHeight;
                    bar.style.transition = "width 0.08s linear";
                }

            }, 400);

            obj.remove();
        }
    }

    requestAnimationFrame(animate);
}
