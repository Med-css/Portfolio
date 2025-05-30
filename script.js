if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Image Animation
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

    images[sequence[currentIndex]].style.display = 'block';
    currentIndex = (currentIndex + 1) % sequence.length;

    if (currentIndex === 0) {
        setTimeout(showNextImage, 2000);
    } else {
        setTimeout(showNextImage, 100);
    }
}

showNextImage();

// Particles.js Initialization
document.addEventListener('DOMContentLoaded', function() {
    var particlesConfig = {
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
                },
                "bubble": {
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

    var pJS = particlesJS('particlesjs', particlesConfig);

    setTimeout(function() {
        const logo = document.querySelector('#particlesjs');
        logo.style.opacity = '0';
    }, 2600);
});

const section1 = document.getElementById('section1');
const section1Top = section1.offsetTop;
const section2 = document.querySelector('.section2');
const section3 = document.querySelector('.skills');

let firstscrollanimation = false;

// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    let firstscrollanimation = false;
    const about = document.querySelector('.about');
    const logo = document.querySelector('.logo');
    const logoMed = document.querySelector('.logoMed');
    const background = document.querySelector('.background-website');

    const initialSize = logo.offsetWidth;
    const initialSizeMed = logoMed.offsetWidth;

    const scaleFactor = 39;
    const moveFactor = 39;
    const scaleFactorMed = 27;
    const moveFactorMed = 100;

    const section1 = document.getElementById('section1');
    const section1Top = section1.offsetTop;
    const section2 = document.querySelector('.section2');

    let currentScroll = 0;
    let targetScroll = 0;

    // Smooth interpolation function
    function smoothInterpolate(current, target, factor) {
        return current + (target - current) * factor;
    }

    function animateScroll() {
        // Smooth interpolation factor
        const interpolationFactor = 0.1;
        currentScroll = smoothInterpolate(currentScroll, targetScroll, interpolationFactor);

        const scrollPosition = currentScroll;
        const viewportHeight = window.innerHeight;

        if (!firstscrollanimation) {
            if (scrollPosition === 0) {
                background.style.zIndex = -1;
            } else {
                background.style.zIndex = 4;
            }

            if (scrollPosition < viewportHeight) {
                background.style.opacity = '1';
                background.style.zIndex = '4';
                about.style.opacity = '0';
            } else {
                background.style.opacity = '0';
                background.style.zIndex = '-100';
                about.style.opacity = '1';

                // Prevent infinite scroll beyond section1
                requestAnimationFrame(() => {
                    window.scrollTo(0, section1Top);
                    firstscrollanimation = true;

                    // Reset styles and allow normal scrolling
                    background.style.position = 'absolute';
                    logo.style.width = '';
                    logo.style.height = '';
                    logo.style.paddingLeft = '';
                    logoMed.style.width = '';
                    logoMed.style.height = '';
                    logoMed.style.paddingLeft = '';
                    setTimeout(() => {
                        background.style.opacity = '1';
                    }, 100);

                    // Remove scroll event listener to allow normal scrolling
                    window.removeEventListener('scroll', handleScroll);
                });
            }

            const newSize = initialSize + scrollPosition * scaleFactor;
            const moveRight = scrollPosition * moveFactor;
            const newSizeMed = initialSizeMed + scrollPosition * scaleFactorMed;
            const moveRightMed = scrollPosition * moveFactorMed;

            logo.style.width = `${newSize}px`;
            logo.style.height = 'auto';
            logo.style.paddingLeft = `${moveRight}px`;

            logoMed.style.width = `${newSizeMed}px`;
            logoMed.style.height = 'auto';
            logoMed.style.paddingLeft = `${moveRightMed}px`;
        }

        requestAnimationFrame(animateScroll);
    }

    function handleScroll() {
        targetScroll = window.scrollY;
    }

    window.addEventListener('scroll', handleScroll);

    animateScroll();
});

// Canvas Animation
const FPS = 60;
const PI_2 = 2 * Math.PI;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

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
let section1Passed = false;

  document.getElementById("btn4").addEventListener("click", async function () {
    if (!section1Passed) {
      // Aller à section1
      document.getElementById("section1").scrollIntoView({ behavior: 'smooth' });

      section1Passed = true; // Marquer comme visité

      // Attendre 6 secondes
      await new Promise(resolve => setTimeout(resolve, 6000));
    }

    // Aller à section3
    document.getElementById("section3").scrollIntoView({ behavior: 'smooth' });
  });

let lenis; // Déclarer lenis en dehors de la portée pour pouvoir le réinitialiser
let rafId; // Stocker l'ID de l'animation pour pouvoir l'arrêter

function initLenis() {
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
    cancelAnimationFrame(rafId); // Arrêter la boucle d'animation
    lenis.destroy();
    lenis = null;
  }
}

initLenis(); // Initialiser Lenis

// GSAP Animation
const medplan = document.querySelector('.medplan');
const headerfixbutton = document.querySelector('.header-fix-button');
const luciole = document.querySelector('.luciole');

document.addEventListener('DOMContentLoaded', function() {
  const section1 = document.getElementById('section1');
  const body = document.body;
  const plans = document.querySelectorAll('.plan');
  let scrollLocked = false;
  let animationTriggered = false;

  if (section1) {
    // Définir les positions initiales des plans avec GSAP
    gsap.set(plans[0], { y: 0 });
    gsap.set(plans[1], { y: 50 });
    gsap.set(plans[2], { y: 100 });
    gsap.set(plans[3], { y: 150 });
    gsap.set(plans[4], { y: 200 });

    window.addEventListener('scroll', function(event) {
      const scrollPosition = window.scrollY;
      const section1Top = section1.offsetTop;
      const section1Height = section1.offsetHeight;

      if (scrollPosition >= section1Top && scrollPosition < section1Top + section1Height && !animationTriggered) {
        animationTriggered = true;
        scrollLocked = true;

        // Détruire Lenis pour désactiver le défilement fluide
        destroyLenis();

        // Forcer le défilement à la position souhaitée
        window.scrollTo({
          top: section1Top,
          behavior: 'instant'
        });

        body.classList.add('no-scroll');

        setTimeout(() => {
          medplan.classList.remove('disabled');
        }, 4500);

        // Animer les plans avec GSAP vers leurs positions finales
        gsap.to(plans[0], { y: -250, duration: 3, ease: "power1.out" });
        gsap.to(plans[1], { y: -250, duration: 3, ease: "power1.out" });
        gsap.to(plans[2], { y: -100, duration: 3.5, ease: "power1.out" });
        gsap.to(plans[3], { y: -150, duration: 4, ease: "power1.out" });
        gsap.to(plans[4], { y: -200, duration: 5, ease: "power1.out" });
        firstscrollanimation = true;
        headerfixbutton.style.display = 'none';

        setTimeout(() => {
          luciole.style.opacity = '1';
        }, 4500);

        // Réactiver le défilement après 6 secondes
        setTimeout(() => {
          body.classList.remove('no-scroll');
          scrollLocked = false;
          headerfixbutton.style.animationDelay = '0.3s';
          const children = headerfixbutton.children;
          let delay = 0.5;

          for (let i = 0; i < children.length; i++) {
            children[i].style.animationDelay = `${delay}s`;
            children[i].classList.add('your-animation-class');
            delay += 0.2;
          }
          headerfixbutton.style.display = 'flex';
          section2.style.opacity = 1;
          section3.style.opacity = 1;
          section1Passed = true;

          // Réinitialiser Lenis pour permettre à nouveau le défilement fluide
          initLenis();
        }, 6000);
      }
    }, { passive: false });

    // Empêcher le défilement via les touches du clavier
    window.addEventListener('keydown', function(event) {
      if (scrollLocked && [32, 33, 34, 35, 36, 38, 40].includes(event.keyCode)) {
        event.preventDefault();
      }
    });

    // Empêcher le défilement via la souris et le pavé tactile
    window.addEventListener('wheel', function(event) {
      if (scrollLocked) {
        event.preventDefault();
      }
    }, { passive: false });

    // Empêcher le défilement via les écrans tactiles
    window.addEventListener('touchmove', function(event) {
      if (scrollLocked) {
        event.preventDefault();
      }
    }, { passive: false });
  }
});


    const canvasL = document.getElementById('luciole-canvas');
    const ctxL = canvasL.getContext('2d');
    let lucioles = [];

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

    lucioles = [];
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

    document.querySelectorAll('.cardproject').forEach(card => {
        const hoverCard = card.querySelector('.hovercard');

        card.addEventListener('mouseenter', () => {
            hoverCard.classList.add('active');
        });

        card.addEventListener('mouseleave', () => {
            hoverCard.classList.remove('active');
        });
    });
    document.querySelectorAll('.cardproject-2').forEach(card => {
        const hoverCard = card.querySelector('.hovercard');

        card.addEventListener('mouseenter', () => {
            hoverCard.classList.add('active');
        });

        card.addEventListener('mouseleave', () => {
            hoverCard.classList.remove('active');
        });
    });
 
