//EFFET RETRECISSEMENT 
 // Smooth scrolling et highlight de section active
 document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('.anchor-nav a');
    const sections = document.querySelectorAll('[id^="presentation"], [id^="technologies"], [id^="fonctionnalites"], [id^="defis"], [id^="liens"]');
    
    // Smooth scrolling
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Mise à jour de l'URL sans rechargement
            history.pushState(null, null, targetId);
        });
    });
    
    // Highlight de la section active
    function highlightActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
                currentSection = '#' + section.id;
            }
        });
        
        anchorLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Écouteurs d'événements
    window.addEventListener('scroll', highlightActiveSection);
    window.addEventListener('load', highlightActiveSection);
});