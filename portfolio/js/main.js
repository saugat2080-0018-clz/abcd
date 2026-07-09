(function () {
  'use strict';

  // ---- Typing Effect ----
  const typingEl = document.getElementById('typingText');
  const phrases = [
    'Backend Developer',
    'Python & Flask Enthusiast',
    'API Architect',
    'IT Student'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingEl) typeEffect();

  // ---- Navbar Scroll ----
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---- Mobile Nav Toggle ----
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---- Active Nav Link on Scroll ----
  const observerNav = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkEls.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => observerNav.observe(section));

  // ---- Scroll Reveal Animations ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  // ---- Skill Bar Animation ----
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const barObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = `${width}%`;
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach(bar => barObserver.observe(bar));

  // ---- Counter Animation ----
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersStarted = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += step;
          if (current >= target) {
            stat.textContent = target;
          } else {
            stat.textContent = Math.floor(current);
            requestAnimationFrame(update);
          }
        };
        update();
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);

    contactForm.reset();
  });

  // ---- Smooth anchor offset fix ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
