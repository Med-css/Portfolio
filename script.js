// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed: ', err));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // --- Initialisation GSAP ---
    gsap.registerPlugin(ScrollTrigger);

    // Animations principales
    gsap.from('.logo', { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
    gsap.from('nav ul li', { opacity: 0, y: -20, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.2 });
    gsap.from('.greeting', { opacity: 0, x: -50, duration: 1, ease: 'power3.out', delay: 0.5 });
    gsap.from('h1', { opacity: 0, x: -50, duration: 1, ease: 'power3.out', delay: 0.7 });
    gsap.from('.description', { opacity: 0, x: -50, duration: 1, ease: 'power3.out', delay: 0.9 });
    gsap.from('.hero-image img', { opacity: 0, scale: 0.9, duration: 1.2, ease: 'power3.out', delay: 1 });
    gsap.from('.scroll-indicator', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 1.5, repeat: -1, yoyo: true, repeatDelay: 0.5 });
    gsap.from('.bodyshape1 img', { opacity: 0, x: -100, duration: 1.5, ease: 'power3.out', delay: 0.3 });
    gsap.from('.bodyshape2 img', { opacity: 0, x: 100, duration: 1.5, ease: 'power3.out', delay: 0.3 });
    gsap.utils.toArray('.realisation-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: 0.2 * i,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none none' }
        });
    });

    // --- Gestion langue ---
    let translations = {};
    const dropdown = document.querySelector(".lang-dropdown");
    const button = dropdown.querySelector(".lang-button");
    const menu = dropdown.querySelector(".lang-menu");
    const languages = {
        en: { code: "EN", flag: "fi fi-gb", label: "English" },
        fr: { code: "FR", flag: "fi fi-fr", label: "Français" }
    };

    function getCurrentLang() {
        return button.getAttribute("data-lang") || "en";
    }

    function t(key) {
        const lang = getCurrentLang();
        const keys = key.split('.');
        let text = translations[lang];
        keys.forEach(k => { if (text[k] !== undefined) text = text[k]; });
        return typeof text === 'string' ? text : '';
    }

    function translatePage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const keys = key.split('.');
            let text = translations[lang];
            keys.forEach(k => { if(text[k]!==undefined) text = text[k]; });
            if(typeof text==='string') el.textContent = text;
        });
        updateAllToggleTexts();
    }

    function updateMenu(currentLang) {
        menu.innerHTML = '';
        Object.keys(languages).forEach(lang => {
            if (lang !== currentLang) {
                const li = document.createElement('li');
                li.innerHTML = `<a href="#" class="lang-option" data-lang="${lang}" aria-label="${languages[lang].label}"><span class="${languages[lang].flag}"></span> ${languages[lang].code}</a>`;
                menu.appendChild(li);
            }
        });
        menu.querySelectorAll(".lang-option").forEach(option => {
            option.addEventListener("click", e => {
                e.preventDefault();
                const newLang = option.dataset.lang;
                button.setAttribute("data-lang", newLang);
                button.innerHTML = `<span class="${languages[newLang].flag}"></span> <span class="lang-code">${languages[newLang].code}</span>`;
                updateMenu(newLang);
                dropdown.classList.remove("active");
                translatePage(newLang);
            });
        });
    }

    fetch('./lang/lang.json')
        .then(r => r.json())
        .then(data => {
            translations = data;
            const defaultLang = (navigator.language || 'en').startsWith('fr') ? 'fr' : 'en';
            button.setAttribute("data-lang", defaultLang);
            button.innerHTML = `<span class="${languages[defaultLang].flag}"></span> <span class="lang-code">${languages[defaultLang].code}</span>`;
            updateMenu(defaultLang);
            translatePage(defaultLang);
        });

    button.addEventListener("click", e => { e.preventDefault(); dropdown.classList.toggle("active"); });
    document.addEventListener("click", e => { if(!dropdown.contains(e.target)) dropdown.classList.remove("active"); });

    // --- Toggle sections ---
    function scrollToElement(el) {
        const blockType = window.innerWidth <= 768 ? 'start' : 'center';
        el.scrollIntoView({ behavior: 'smooth', block: blockType });
    }

    const toggleButton = document.querySelector('.toggle-projets-3d');
    const realisations3d = document.getElementById('realisations-3d');
    const toggleButton2 = document.querySelector('.toggle-details-web');
    const webdetails = document.getElementById('competence-tech-details');
    const toggleButton3 = document.querySelector('.toggle-wordpress');
    const wordpressdetail = document.getElementById('competence-wordpress-details');

    function updateToggleText(button, target, keyBase, hideText) {
        const lang = getCurrentLang();
        const isActive = target.classList.contains('active');
        if (isActive) {
            button.innerHTML = `${hideText} <i class="fas fa-arrow-up"></i>`;
        } else {
            button.innerHTML = `${t(keyBase + '.cta')} <i class="fas fa-arrow-right"></i>`;
        }
    }

    function updateAllToggleTexts() {
        updateToggleText(toggleButton, realisations3d, 'unity', getCurrentLang()==='fr'?'Masquer les projets':'Hide Projects');
        updateToggleText(toggleButton2, webdetails, 'website-creation', getCurrentLang()==='fr'?'Masquer les détails':'Hide Details');
        updateToggleText(toggleButton3, wordpressdetail, 'wordpress', getCurrentLang()==='fr'?'Masquer les plugins':'Hide Plugins');
    }

    function setupToggle(button, target, keyBase, hideText) {
        button.addEventListener('click', e => {
            e.preventDefault();
            target.classList.toggle('active');
            updateToggleText(button, target, keyBase, hideText);
            if(target.classList.contains('active')) scrollToElement(target);
        });
    }

    setupToggle(toggleButton, realisations3d, 'unity', getCurrentLang()==='fr'?'Masquer les projets':'Hide Projects');
    setupToggle(toggleButton2, webdetails, 'website-creation', getCurrentLang()==='fr'?'Masquer les détails':'Hide Details');
    setupToggle(toggleButton3, wordpressdetail, 'wordpress', getCurrentLang()==='fr'?'Masquer les plugins':'Hide Plugins');

    // --- Grille beige ---
    (function(){
        function createBeigeGrid(gridId, layout, shades=9) {
            const grid = document.getElementById(gridId);
            const squares = [];
            function getShadeClass(){ return 'n'+(1+Math.floor(Math.random()*shades)); }
            layout.forEach(count=>{
                const row = document.createElement('div'); row.className='row';
                for(let i=0;i<count;i++){ 
                    const square = document.createElement('div'); 
                    square.className='square '+getShadeClass(); 
                    row.appendChild(square); 
                    squares.push(square);
                }
                grid.appendChild(row);
            });
            function pickRandomSquare(){ return squares[Math.floor(Math.random()*squares.length)]; }
            function triggerFlipOnce(square){ 
                if(!square||Math.random()>0.9) return;
                square.classList.add('flip'); 
                const newClass=getShadeClass();
                setTimeout(()=>{ square.className='square '+newClass+' flip'; },400);
                setTimeout(()=>{ square.classList.remove('flip'); },1000);
            }
            function scheduleNext(){
                const delay = 800 + Math.floor(Math.random()*1200);
                setTimeout(()=>{ triggerFlipOnce(pickRandomSquare()); scheduleNext(); }, delay);
            }
            setTimeout(scheduleNext,1000 + Math.floor(Math.random()*1500));
        }
        createBeigeGrid("beigeGrid",[2,3,3,4]);
        createBeigeGrid("beigeGridTopRight",[2,2,2,1]);
    })();

});
