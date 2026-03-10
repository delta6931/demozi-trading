// Interactive elements and scroll behaviors

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Translation Logic
    const langBtns = document.querySelectorAll('.lang-btn');

    function setLanguage(lang) {
        // Update HTML attributes for layout
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else if (lang === 'tr') {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = 'tr';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = 'en';
        }

        // Apply translations
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.translations[lang] && window.translations[lang][key] !== undefined) {
                el.innerText = window.translations[lang][key];
            }
        });

        // Apply translations to placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (window.translations[lang] && window.translations[lang][key] !== undefined) {
                el.placeholder = window.translations[lang][key];
            }
        });

        // Update active class on buttons
        langBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.classList.add('active');

        // Save preference
        localStorage.setItem('preferredLang', lang);
    }

    // Set initial language
    let savedLang = localStorage.getItem('preferredLang');
    if (!savedLang) {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (tz === 'Asia/Baghdad' || tz.startsWith('Asia/Riyadh') || tz.startsWith('Asia/Dubai')) {
                savedLang = 'ar';
            } else if (tz === 'Europe/Istanbul') {
                savedLang = 'tr';
            } else {
                const navLang = navigator.language || navigator.userLanguage;
                savedLang = navLang.startsWith('tr') ? 'tr' : (navLang.startsWith('ar') ? 'ar' : 'en');
            }
        } catch (e) {
            savedLang = 'en';
        }
    }
    setLanguage(savedLang);

    // Add click listeners
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            setLanguage(e.target.getAttribute('data-lang'));
        });
    });
});
