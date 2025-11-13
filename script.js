document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LOGIQUE DE LA BARRE DE NAVIGATION (Inchangée) ---
    const nav = document.querySelector('.side-nav');
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('section, footer'); // Inclut le footer
    let hasAnimatedIn = false;
    const intro = document.querySelector('#intro');

    if (intro && nav) {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    nav.classList.remove('visible');
                    nav.classList.add('hidden');
                    if (hasAnimatedIn) {
                        nav.classList.add('hiding');
                    }
                } else {
                    nav.classList.remove('hidden', 'hiding');
                    nav.classList.add('visible');
                    if (!hasAnimatedIn) {
                        nav.style.animation = 'slideInRight 0.6s ease-out';
                        hasAnimatedIn = true;
                    }
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(intro);
    }

    // Observer pour le bouton ".active" de la nav
    // Observer pour le bouton ".active" de la nav
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeBtn = document.querySelector(`.nav-btn[data-section="${id}"]`);

                // 1. On efface TOUS les boutons actifs (en dehors du "if")
                navButtons.forEach((btn) => btn.classList.remove('active'));

                // 2. On active le bon bouton SEULEMENT s'il existe
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }
                // Si activeBtn n'existe pas (ex: c'est le footer),
                // tous les boutons restent simplement éteints.
            }
        });
    },
    { 
        threshold: 0.2 // 1. ON MET UN SEUIL TRÈS BAS (ex: 5%)
    }
);

sections.forEach((section) => sectionObserver.observe(section));
    sections.forEach((section) => sectionObserver.observe(section));

    // --- 2. NOUVELLE LOGIQUE : "REVEAL ON SCROLL" ---
    
    // On cible tous les éléments qui ont notre classe
    const revealItems = document.querySelectorAll('.reveal-item');

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                // Dès que l'élément est à l'écran
                if (entry.isIntersecting) {
                    // On lui ajoute la classe "visible" (définie dans notre CSS)
                    entry.target.classList.add('visible');
                    // On arrête de l'observer (pour la performance)
                    observer.unobserve(entry.target);
                }
            });
        },
        { 
            threshold: 0.15 // L'animation se déclenche quand 15% de l'élément est visible
        }
    );

    // On applique l'observateur à chacun de nos éléments
    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });

});