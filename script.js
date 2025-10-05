document.addEventListener('DOMContentLoaded', function() {
    // --- Initialisation de GSAP et des animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Animation du logo
    gsap.from('.logo', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out'
    });

    // Animation des éléments de navigation
    gsap.from('nav ul li', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
    });

    // Animation du texte de salutation
    gsap.from('.greeting', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
    });

    // Animation du titre principal
    gsap.from('h1', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7
    });

    // Animation de la description
    gsap.from('.description', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9
    });

    // Animation de l'image héroïque
    gsap.from('.hero-image img', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power3.out',
        delay: 1
    });

    // Animation de l'indicateur de défilement
    gsap.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 1.5,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5
    });

    // Animation des formes de fond
    gsap.from('.bodyshape1 img', {
        opacity: 0,
        x: -100,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.bodyshape2 img', {
        opacity: 0,
        x: 100,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3
    });

    // Animation pour chaque projet 3D au défilement
    gsap.utils.toArray('.realisation-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: 0.2 * i,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // --- Gestion des boutons de bascule pour les sections ---

    // Bouton pour afficher/masquer les projets 3D
    const toggleButton = document.querySelector('.toggle-projets-3d');
    const realisations3d = document.getElementById('realisations-3d');

    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        realisations3d.classList.toggle('active');

        if (realisations3d.classList.contains('active')) {
            this.innerHTML = 'Masquer les projets <i class="fas fa-arrow-up"></i>';
            realisations3d.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            this.innerHTML = 'Explore 3D Projects <i class="fas fa-arrow-right"></i>';
        }
    });

    // Bouton pour afficher/masquer les détails techniques web
    const toggleButton2 = document.querySelector('.toggle-details-web');
    const webdetails = document.getElementById('competence-tech-details');

    toggleButton2.addEventListener('click', function(e) {
        e.preventDefault();
        webdetails.classList.toggle('active');

        if (webdetails.classList.contains('active')) {
            this.innerHTML = 'Masquer les détails <i class="fas fa-arrow-up"></i>';
            webdetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            this.innerHTML = 'See my Web Projects <i class="fas fa-arrow-right"></i>';
        }
    });

    // Bouton pour afficher/masquer les détails WordPress
    const toggleButton3 = document.querySelector('.toggle-wordpress');
    const wordpressdetail = document.getElementById('competence-wordpress-details');

    toggleButton3.addEventListener('click', function(e) {
        e.preventDefault();
        wordpressdetail.classList.toggle('active');

        if (wordpressdetail.classList.contains('active')) {
            this.innerHTML = 'Masquer les plugins <i class="fas fa-arrow-up"></i>';
            wordpressdetail.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            this.innerHTML = 'Discover the Plugins <i class="fas fa-arrow-right"></i>';
        }
    });

    // --- Animation de la grille beige en arrière-plan ---
    (function() {
        function createBeigeGrid(gridId, layout, shades = 9) {
            const grid = document.getElementById(gridId);
            const squares = [];

            function getShadeClass() {
                return 'n' + (1 + Math.floor(Math.random() * shades));
            }

            // Génération des rangées de carrés
            layout.forEach(count => {
                const row = document.createElement('div');
                row.className = 'row';

                for (let i = 0; i < count; i++) {
                    const square = document.createElement('div');
                    square.className = 'square ' + getShadeClass();
                    row.appendChild(square);
                    squares.push(square);
                }

                grid.appendChild(row);
            });

            // Sélection aléatoire d'un carré
            function pickRandomSquare() {
                return squares[Math.floor(Math.random() * squares.length)];
            }

            // Animation de retournement d'un carré
            function triggerFlipOnce(square) {
                if (!square) return;
                if (Math.random() > 0.9) return;

                square.classList.add('flip');
                const newClass = getShadeClass();

                setTimeout(() => {
                    square.className = 'square ' + newClass + ' flip';
                }, 400);

                setTimeout(() => {
                    square.classList.remove('flip');
                }, 1000);
            }

            // Planification de la prochaine animation
            function scheduleNext() {
                const delay = 800 + Math.floor(Math.random() * 1200);
                setTimeout(() => {
                    triggerFlipOnce(pickRandomSquare());
                    scheduleNext();
                }, delay);
            }

            // Démarrage des animations après un délai aléatoire
            setTimeout(scheduleNext, 1000 + Math.floor(Math.random() * 1500));
        }

        // Création des grilles
        createBeigeGrid("beigeGrid", [2, 3, 3, 4]); // Bas gauche (pyramide)
        createBeigeGrid("beigeGridTopRight", [2, 2, 2, 1]); // Haut droite (pattern)
    })();

    // --- Gestion du menu déroulant de langue ---
    const dropdown = document.querySelector(".lang-dropdown");
    const button = dropdown.querySelector(".lang-button");
    const menu = dropdown.querySelector(".lang-menu");

    // Définition des langues disponibles
    const languages = {
        en: { code: "EN", flag: "fi fi-gb", label: "English" },
        fr: { code: "FR", flag: "fi fi-fr", label: "Français" }
    };

    // Chargement des traductions
    let translations = {};
    fetch('./lang/lang.json')
        .then(response => response.json())
        .then(data => {
            translations = data;

            // Détection de la langue par défaut
            const userLang = navigator.language || navigator.languages[0];
            const defaultLang = userLang.startsWith('fr') ? 'fr' : 'en';

            // Mise à jour de l'interface avec la langue par défaut
            button.setAttribute("data-lang", defaultLang);
            button.innerHTML = `<span class="${languages[defaultLang].flag}"></span> <span class="lang-code">${languages[defaultLang].code}</span>`;
            updateMenu(defaultLang);
            translatePage(defaultLang);
        });

    // Fonction pour traduire la page
    function translatePage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let text = translations[lang];

            keys.forEach(k => {
                if (text[k] !== undefined) {
                    text = text[k];
                }
            });

            if (typeof text === 'string') {
                element.textContent = text;
            }
        });
    }

    // Fonction pour mettre à jour le menu des langues
    function updateMenu(currentLang) {
        menu.innerHTML = "";

        Object.keys(languages).forEach(lang => {
            if (lang !== currentLang) {
                const li = document.createElement("li");
                li.innerHTML = `
                    <a href="#" class="lang-option" data-lang="${lang}" aria-label="${languages[lang].label}">
                        <span class="${languages[lang].flag}"></span> ${languages[lang].code}
                    </a>
                `;
                menu.appendChild(li);
            }
        });

        // Réattache les événements aux nouvelles options
        menu.querySelectorAll(".lang-option").forEach(option => {
            option.addEventListener("click", (e) => {
                e.preventDefault();
                const newLang = option.dataset.lang;

                // Met à jour le bouton principal
                button.setAttribute("data-lang", newLang);
                button.innerHTML = `<span class="${languages[newLang].flag}"></span> <span class="lang-code">${languages[newLang].code}</span>`;

                // Recharge le menu avec l'autre langue
                updateMenu(newLang);

                // Ferme le menu
                dropdown.classList.remove("active");

                // Change la langue de la page
                translatePage(newLang);
            });
        });
    }

    // Gestion de l'ouverture/fermeture du menu déroulant
    button.addEventListener("click", (e) => {
        e.preventDefault();
        dropdown.classList.toggle("active");
    });

    // Fermeture du menu si clic en dehors
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });
});
