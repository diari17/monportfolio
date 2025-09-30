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
    const animatedElements = document.querySelectorAll('.skill-item, .fonctionnalite-groupe, .project-screenshots img');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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

    // Smooth scrolling pour la navigation interne
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

    // Lightbox pour les images (optionnel)
    const images = document.querySelectorAll('.project-screenshots img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            // Créer une lightbox simple
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                cursor: pointer;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            // Fermer la lightbox en cliquant
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });

    // Mise à jour automatique de l'année dans le footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('footer p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
    }

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