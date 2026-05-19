/* SAKHI — Navigation (nav.js) */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-overlay');

    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }, { passive: true });
    }

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        if (overlay) overlay.classList.toggle('visible');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
      });

      if (overlay) {
        overlay.addEventListener('click', () => {
          hamburger.classList.remove('open');
          navLinks.classList.remove('open');
          overlay.classList.remove('visible');
          document.body.style.overflow = '';
        });
      }

      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          navLinks.classList.remove('open');
          if (overlay) overlay.classList.remove('visible');
          document.body.style.overflow = '';
        });
      });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  });
})();
