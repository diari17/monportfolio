document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="ri-close-line"></i>' 
                : '<i class="ri-menu-line"></i>';
        });
    }

    // Animation au défilement
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.project-highlight, .skills-category, .social-links, .detail-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animation des statistiques
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
            }, 40);
        });
    }

    // Démarrer l'animation des stats quand la section hero est visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Effet de survol amélioré pour les cartes de projet
    const projectCards = document.querySelectorAll('.project-highlight');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Mise à jour automatique de l'année dans le footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('footer p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
    }

    // Animation de typing pour l'intro (optionnel)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Démarrer l'animation de typing sur l'élément intro
    const introText = document.querySelector('.intro-text p');
    if (introText) {
        const originalText = introText.textContent;
        typeWriter(introText, originalText);
    }

    // Smooth scrolling pour tous les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Fermer le menu mobile si ouvert
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="ri-menu-line"></i>';
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Effet de parallaxe simple pour l'image hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#hero');
        if (hero && window.innerWidth > 768) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Fermer le menu mobile en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (mainNav && mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="ri-menu-line"></i>';
        }
    });
});

// Ajouter des styles dynamiques
const dynamicStyles = `
    .stat-number {
        background: linear-gradient(45deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .project-highlight:nth-child(even) {
        direction: rtl;
    }
    
    .project-highlight:nth-child(even) .project-info {
        direction: ltr;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);