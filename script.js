// --- Image Animation ---
const images = [
    document.getElementById('med1'),
    document.getElementById('med2'),
    document.getElementById('med3'),
    document.getElementById('med4')
];

let currentIndex = 0;
const sequence = [0, 1, 2, 3, 2, 1, 0];

function showNextImage() {
    images.forEach(img => {
        img.style.display = 'none';
    });

    if (images[sequence[currentIndex]]) { // Check if the image exists
        images[sequence[currentIndex]].style.display = 'block';
    }
    
    currentIndex = (currentIndex + 1) % sequence.length;

    // Use setTimeout for animation timing
    if (currentIndex === 0) {
        setTimeout(showNextImage, 2000);
    } else {
        setTimeout(showNextImage, 100);
    }
}

// Start image animation after DOM is loaded
document.addEventListener('DOMContentLoaded', showNextImage);

// --- Particles.js Initialization ---
document.addEventListener('DOMContentLoaded', function() {
    const particlesConfig = {
        "particles": {
            "number": {
                "value": 500,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#9c27b0"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "top",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                }
                , "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    const particlesElement = document.getElementById('particlesjs');
    if (particlesElement) {
        particlesJS('particlesjs', particlesConfig);

        setTimeout(() => {
            particlesElement.style.opacity = '0';
        }, 2600);
    }
});

// --- Smooth Scroll and Section Transition ---
document.addEventListener('DOMContentLoaded', function() {
    const about = document.querySelector('.about');
    const logo = document.querySelector('.logo');
    const logoMed = document.querySelector('.logoMed');
    const background = document.querySelector('.background-website');
    const section1 = document.getElementById('section1');
    const section2 = document.querySelector('.section2');
    const section3 = document.querySelector('.skills');
    const medplan = document.querySelector('.medplan');
    const headerfixbutton = document.querySelector('.header-fix-button');
    const luciole = document.querySelector('.luciole');
    const body = document.body;
    const plans = document.querySelectorAll('.plan');

    let firstScrollAnimationDone = false;
    let scrollLocked = false;
    let animationTriggered = false;

    if (!section1) {
        console.warn("Element with ID 'section1' not found. Some scroll animations may not work.");
        return;
    }

    const initialSize = logo ? logo.offsetWidth : 0;
    const initialSizeMed = logoMed ? logoMed.offsetWidth : 0;

    const scaleFactor = 39;
    const moveFactor = 39;
    const scaleFactorMed = 27;
    const moveFactorMed = 100;

    if (plans.length > 0) {
        gsap.set(plans[0], { y: 0 });
        gsap.set(plans[1], { y: 50 });
        gsap.set(plans[2], { y: 100 });
        gsap.set(plans[3], { y: 150 });
        gsap.set(plans[4], { y: 200 });
    }

    // Handle initial scroll effects for logos and background
    function handleInitialScrollEffects() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;

        if (!firstScrollAnimationDone) {
            if (background) {
                if (scrollPosition === 0) {
                    background.style.zIndex = -1;
                    background.style.opacity = '1'; 
                } else {
                    background.style.zIndex = 4;
                }

                if (scrollPosition < viewportHeight) {
                    background.style.opacity = '1';
                    if (about) about.style.opacity = '0';
                } else {
                    background.style.opacity = '0';
                    background.style.zIndex = '-100';
                    if (about) about.style.opacity = '1';
                }
            }

            if (logo) {
                const newSize = initialSize + scrollPosition * scaleFactor;
                const moveRight = scrollPosition * moveFactor;
                logo.style.width = `${newSize}px`;
                logo.style.height = 'auto';
                logo.style.paddingLeft = `${moveRight}px`;
            }

            if (logoMed) {
                const newSizeMed = initialSizeMed + scrollPosition * scaleFactorMed;
                const moveRightMed = scrollPosition * moveFactorMed;
                logoMed.style.width = `${newSizeMed}px`;
                logoMed.style.height = 'auto';
                logoMed.style.paddingLeft = `${moveRightMed}px`;
            }
        }
    }

    // Trigger GSAP animation and manage scroll lock
    window.addEventListener('scroll', function(event) {
        const scrollPosition = window.scrollY;
        const section1Top = section1.offsetTop;

        if (!firstScrollAnimationDone) {
            handleInitialScrollEffects();
        }

        if (scrollPosition >= section1Top && !animationTriggered) {
            animationTriggered = true;
            scrollLocked = true;

            destroyLenis();

            window.scrollTo({
                top: section1Top,
                behavior: 'instant'
            });

            body.classList.add('no-scroll');

            setTimeout(() => {
                if (medplan) medplan.classList.remove('disabled');
            }, 4500);

            if (plans.length > 0) {
                gsap.to(plans[0], { y: -250, duration: 3, ease: "power1.out" });
                gsap.to(plans[1], { y: -250, duration: 3, ease: "power1.out" });
                gsap.to(plans[2], { y: -100, duration: 3.5, ease: "power1.out" });
                gsap.to(plans[3], { y: -150, duration: 4, ease: "power1.out" });
                gsap.to(plans[4], { y: -200, duration: 5, ease: "power1.out" });
            }
            
            firstScrollAnimationDone = true;
            if (headerfixbutton) headerfixbutton.style.display = 'none';

            setTimeout(() => {
                if (luciole) luciole.style.opacity = '1';
            }, 4500);

            // Re-enable scroll and restore styles after 6 seconds
            setTimeout(() => {
                body.classList.remove('no-scroll');
                scrollLocked = false;
                
                // --- RESTORATION OF BACKGROUND AND LOGO STYLES ---
                if (background) {
                    background.style.position = 'absolute';
                    background.style.zIndex = ''; // Reset zIndex or set as needed by your CSS
                    setTimeout(() => {
                        background.style.opacity = '1';
                    }, 100);
                }
                if (logo) {
                    logo.style.width = '';
                    logo.style.height = '';
                    logo.style.paddingLeft = '';
                }
                if (logoMed) {
                    logoMed.style.width = '';
                    logoMed.style.height = '';
                    logoMed.style.paddingLeft = '';
                }
                // --- END OF RESTORATION ---

                if (headerfixbutton) {
                    headerfixbutton.style.animationDelay = '0.3s';
                    const children = headerfixbutton.children;
                    let delay = 0.5;

                    for (let i = 0; i < children.length; i++) {
                        children[i].style.animationDelay = `${delay}s`;
                        children[i].classList.add('your-animation-class');
                        delay += 0.2;
                    }
                    headerfixbutton.style.display = 'flex';
                }
                if (section2) section2.style.opacity = 1;
                if (section3) section3.style.opacity = 1;

                initLenis();
            }, 6000);
        }
    }, { passive: false });

    // Prevent scrolling via keyboard keys
    window.addEventListener('keydown', function(event) {
        if (scrollLocked && [32, 33, 34, 35, 36, 38, 40].includes(event.keyCode)) {
            event.preventDefault();
        }
    });

    // Prevent scrolling via mouse and trackpad
    window.addEventListener('wheel', function(event) {
        if (scrollLocked) {
            event.preventDefault();
        }
    }, { passive: false });

    // Prevent scrolling via touchscreens
    window.addEventListener('touchmove', function(event) {
        if (scrollLocked) {
            event.preventDefault();
        }
    }, { passive: false });

    // Ensure initial scroll effects are applied on load
    handleInitialScrollEffects();
});

// --- Canvas Animation (Mouse) ---
const FPS = 60;
const PI_2 = 2 * Math.PI;

const canvas = document.getElementById("canvas");
const context = canvas ? canvas.getContext("2d") : null;

if (canvas && context) {
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let lastMouseDirectionX = 0;
    let lastMouseDirectionY = 0;

    const windowResizeHandler = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', windowResizeHandler, false);
    window.addEventListener('mousemove', (event) => {
        lastMouseDirectionX = event.clientX - mouseX;
        lastMouseDirectionY = event.clientY - mouseY;
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    windowResizeHandler();

    const range = (a, b) => (b - a) * Math.random() + a;

    const drawCircle = (x, y, r, style) => {
        context.beginPath();
        context.arc(x, y, r, 0, PI_2, false);
        context.fillStyle = style;
        context.fill();
    };

    class Particle {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx + range(-0.5, 0.5);
            this.vy = vy + range(-0.5, 0.5);
            this.opacity = 1;
            this.r = range(1, 4);
            this.color = `rgba(${range(100, 255)}, ${range(100, 200)}, ${range(200, 255)}, ${this.opacity})`;
        }

        step() {
            this.x += this.vx;
            this.y += this.vy;
            this.opacity -= 0.01;
            if (this.opacity <= 0) {
                this.destroyed = true;
            }
        }

        draw() {
            if (this.opacity <= 0) return;
            drawCircle(this.x, this.y, this.r, this.color);
        }
    }

    class Flame {
        constructor() {
            this.x = mouseX;
            this.y = mouseY;
            this.r = 12;
        }

        step() {
            return false;
        }

        draw() {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const minDistance = 50;
            if (distance > minDistance) {
                this.x += (dx / distance) * minDistance * 0.05;
                this.y += (dy / distance) * minDistance * 0.05;
            }

            for (let i = 0; i < 2; i++) {
                const vx = -lastMouseDirectionX * 0.1;
                const vy = -lastMouseDirectionY * 0.1;
                w.addEntity(Particle, this.x, this.y, vx, vy);
            }

            const g = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 2);
            g.addColorStop(0, `rgba(100, 100, 255, ${range(0.7, 0.9)})`);
            g.addColorStop(1, "rgba(100, 100, 255, 0)");
            drawCircle(this.x, this.y, this.r * 2, g);

            drawCircle(this.x + range(-2, 2), this.y + range(-2, 2), this.r, `rgba(100, 100, 255, ${range(0.5, 0.8)})`);
        }
    }

    class World {
        constructor() {
            this.entities = {};
            this.i = 0;
            this.frame = 0;
            setInterval(() => {
                this.loop();
            }, 1000 / FPS);
        }

        addEntity(klass, ...args) {
            this.entities[this.i] = new klass(...args);
            this.i -= 1;
        }

        loop() {
            this.frame++;
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (const k in this.entities) {
                const entity = this.entities[k];
                if (entity.destroyed === true) {
                    delete this.entities[k];
                    continue;
                }
                entity.step();
                entity.draw();
            }
        }
    }

    const w = new World();
    w.addEntity(Flame);
} else {
    console.warn("Canvas element with ID 'canvas' not found. Mouse animation will not work.");
}


// --- Lenis Smooth Scroll Setup ---
let lenis;
let rafId;

function initLenis() {
    if (lenis) {
        destroyLenis();
    }

    lenis = new Lenis({
        duration: 1.2,
        smooth: true,
    });

    function raf(time) {
        if (lenis) {
            lenis.raf(time);
        }
        rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
}

function destroyLenis() {
    if (lenis) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenis = null;
        rafId = null;
    }
}

document.addEventListener('DOMContentLoaded', initLenis);

// --- Navigation Buttons ---
document.addEventListener('DOMContentLoaded', function() {
    const btn4 = document.getElementById("btn4");
    if (btn4) {
        btn4.addEventListener("click", async function() {
            const section3 = document.getElementById("section3");

            if (!section3) {
                console.error("Target section for navigation not found.");
                return;
            }
            
            section3.scrollIntoView({ behavior: 'smooth' });
        });
    } else {
        console.warn("Element with ID 'btn4' not found. Navigation button will not work.");
    }
});


// --- Luciole Canvas Animation ---
document.addEventListener('DOMContentLoaded', function() {
    const canvasL = document.getElementById('luciole-canvas');
    const ctxL = canvasL ? canvasL.getContext('2d') : null;
    let lucioles = [];

    if (canvasL && ctxL) {
        function resizeCanvasL() {
            canvasL.width = window.innerWidth;
            canvasL.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvasL);
        resizeCanvasL();

        class Luciole {
            constructor() {
                this.x = Math.random() * canvasL.width;
                this.y = Math.random() * canvasL.height;
                this.radius = 0.5 + Math.random() * 0.7;
                this.baseAlpha = 0.4 + Math.random() * 0.4;
                this.alpha = this.baseAlpha;
                this.alphaDelta = (Math.random() * 0.015) + 0.003;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.angle = Math.random() * 2 * Math.PI;
                this.angleSpeed = 0.01 + Math.random() * 0.02;
                this.oscillationRadius = 10 + Math.random() * 10;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                this.angle += this.angleSpeed;
                this.x += Math.cos(this.angle) * 0.3;
                this.y += Math.sin(this.angle) * 0.3;

                if (this.x < 0) this.x = canvasL.width;
                if (this.x > canvasL.width) this.x = 0;
                if (this.y < 0) this.y = canvasL.height;
                if (this.y > canvasL.height) this.y = 0;

                this.alpha += this.alphaDelta;
                if (this.alpha <= this.baseAlpha * 0.5 || this.alpha >= this.baseAlpha) this.alphaDelta *= -1;
            }

            draw() {
                let gradient = ctxL.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 6);
                gradient.addColorStop(0, `rgba(255, 255, 180, ${this.alpha})`);
                gradient.addColorStop(1, 'rgba(255, 255, 180, 0)');
                ctxL.fillStyle = gradient;
                ctxL.beginPath();
                ctxL.arc(this.x, this.y, this.radius * 6, 0, 2 * Math.PI);
                ctxL.fill();

                ctxL.beginPath();
                ctxL.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                ctxL.fillStyle = `rgba(255, 255, 150, ${this.alpha})`;
                ctxL.fill();
            }
        }

        for (let i = 0; i < 60; i++) {
            lucioles.push(new Luciole());
        }

        function animateLucioles() {
            ctxL.clearRect(0, 0, canvasL.width, canvasL.height);
            for (let luciole of lucioles) {
                luciole.update();
                luciole.draw();
            }
            requestAnimationFrame(animateLucioles);
        }

        animateLucioles();
    } else {
        console.warn("Canvas element with ID 'luciole-canvas' not found. Luciole animation will not work.");
    }
});


// --- Card Hover Effects ---
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cardproject').forEach(card => {
        const hoverCard = card.querySelector('.hovercard');
        if (hoverCard) {
            card.addEventListener('mouseenter', () => {
                hoverCard.classList.add('active');
            });
            card.addEventListener('mouseleave', () => {
                hoverCard.classList.remove('active');
            });
        }
    });

    document.querySelectorAll('.cardproject-2').forEach(card => {
        const hoverCard = card.querySelector('.hovercard');
        if (hoverCard) {
            card.addEventListener('mouseenter', () => {
                hoverCard.classList.add('active');
            });
            card.addEventListener('mouseleave', () => {
                hoverCard.classList.remove('active');
            });
        }
    });
});