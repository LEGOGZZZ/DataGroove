document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.side-nav');
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('section');

  let hasAnimatedIn = false; // pour limiter l'animation d'entrée

  const intro = document.querySelector('#intro');
  if (intro && nav) {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          // Intro visible -> cacher la nav
          nav.classList.remove('visible');
          nav.classList.add('hidden');

          if (hasAnimatedIn) {
            nav.classList.add('hiding'); // animation de sortie
          }
        } else {
          // Intro quittée -> montrer la nav
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

  // Observer pour bouton actif en fonction de la section
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
