// Attendre que le DOM soit prêt
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.side-nav');
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('section');

  if (!nav) return console.error("❌ Barre de nav introuvable");

  // Masque la barre tant que #intro est visible
  const intro = document.querySelector('#intro');
  const introObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Intro visible -> cacher la nav
        nav.classList.remove('visible');
        nav.classList.add('hidden');
      } else {
        // Intro quittée -> afficher la nav
        nav.classList.remove('hidden');
        nav.classList.add('visible');
      }
    },
    { threshold: 0.5 } // seuil : si >50% de #intro visible, on cache
  );

  if (intro) introObserver.observe(intro);

  // Observer des sections pour activer le bouton actif
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const activeBtn = document.querySelector(`.nav-btn[data-section="${id}"]`);

          if (activeBtn) {
            navButtons.forEach((btn) => btn.classList.remove('active'));
            activeBtn.classList.add('active');
          }
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
});
