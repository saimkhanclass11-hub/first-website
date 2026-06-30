/* ===================================================================
   SAIM KHAN — PORTFOLIO  |  script.js
   Handles: loading screen, custom cursor, particle background,
   navbar scroll/active links, mobile menu, dark/light toggle,
   typing animation, scroll reveals, skill bars, counters,
   contact form validation, tilt effect, smooth scroll, back-to-top.
=================================================================== */


/* -------------------------------------------------------------
   1. LOADING SCREEN
------------------------------------------------------------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  // Wait for the loader bar's CSS animation (2.4s) to finish, then hide
  setTimeout(() => {
    loader.classList.add('gone');
    revealOnScroll();   // reveal anything already in view
    startCounters();    // start hero stat counters
  }, 2600);
});


/* -------------------------------------------------------------
   2. CUSTOM CURSOR
------------------------------------------------------------- */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth-follow ring using linear interpolation
function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Enlarge ring on hoverable elements
const hoverTargets = document.querySelectorAll(
  'a, button, .proj-card, .srv-card, .sk-card, input, textarea'
);
hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('big'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('big'));
});


/* -------------------------------------------------------------
   3. NAVBAR — SCROLL STYLE + ACTIVE LINK HIGHLIGHTING
------------------------------------------------------------- */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('section[id]');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  // Glassmorphism navbar on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link based on scroll position
  let current = '';
  allSections.forEach((section) => {
    const sectionTop = section.offsetTop - 110;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Run scroll-based animations
  revealOnScroll();
  animateSkillBars();

  // Show/hide back-to-top button
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});


/* -------------------------------------------------------------
   4. MOBILE HAMBURGER MENU
------------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});


/* -------------------------------------------------------------
   5. SMOOTH SCROLL FOR ANCHOR LINKS
------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* -------------------------------------------------------------
   6. BACK TO TOP BUTTON
------------------------------------------------------------- */
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* -------------------------------------------------------------
   7. DARK / LIGHT MODE TOGGLE
------------------------------------------------------------- */
const themeBtn  = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const bodyEl    = document.body;

// Load saved theme preference on page load
if (localStorage.getItem('saim-theme') === 'light') {
  bodyEl.classList.remove('dark-mode');
  bodyEl.classList.add('light-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

themeBtn.addEventListener('click', () => {
  if (bodyEl.classList.contains('dark-mode')) {
    bodyEl.classList.remove('dark-mode');
    bodyEl.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('saim-theme', 'light');
  } else {
    bodyEl.classList.remove('light-mode');
    bodyEl.classList.add('dark-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('saim-theme', 'dark');
  }
});


/* -------------------------------------------------------------
   8. TYPING ANIMATION (HERO SECTION)
------------------------------------------------------------- */
const typedOutput = document.getElementById('typed-output');
const typingWords = [
  'modern websites.',
  'clean interfaces.',
  'smart Python tools.',
  'creative experiences.',
  'fast, reliable apps.'
];

let wordIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typeSpeed   = 100;

function typeLoop() {
  const currentWord = typingWords[wordIndex];

  if (isDeleting) {
    typedOutput.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 45;
  } else {
    typedOutput.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 95;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1700;       // pause at full word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    typeSpeed = 350;
  }

  setTimeout(typeLoop, typeSpeed);
}
setTimeout(typeLoop, 900);


/* -------------------------------------------------------------
   9. SCROLL REVEAL ANIMATIONS
------------------------------------------------------------- */
function revealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal');

  revealEls.forEach((el, index) => {
    const windowHeight = window.innerHeight;
    const elementTop   = el.getBoundingClientRect().top;
    const revealPoint  = 100;

    if (elementTop < windowHeight - revealPoint && !el.classList.contains('visible')) {
      const staggerDelay = (index % 4) * 90; // small stagger per group
      setTimeout(() => el.classList.add('visible'), staggerDelay);
    }
  });
}


/* -------------------------------------------------------------
   10. ANIMATED SKILL BARS
------------------------------------------------------------- */
let skillBarsDone = false;

function animateSkillBars() {
  if (skillBarsDone) return;

  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100) {
    document.querySelectorAll('.bar-fill').forEach((bar) => {
      const widthValue = bar.getAttribute('data-w');
      bar.style.width = widthValue + '%';
    });
    skillBarsDone = true;
  }
}


/* -------------------------------------------------------------
   11. ANIMATED COUNTERS (HERO STATS)
------------------------------------------------------------- */
let countersDone = false;

function startCounters() {
  if (countersDone) return;
  countersDone = true;

  document.querySelectorAll('.count').forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    let current  = 0;
    const step   = Math.ceil(target / 50);

    const counterInterval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(counterInterval);
      }
      counter.textContent = current;
    }, 35);
  });
}


/* -------------------------------------------------------------
   12. CONTACT FORM VALIDATION
------------------------------------------------------------- */
const contactForm = document.getElementById('contact-form');
const sendBtn      = document.getElementById('send-btn');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    

    const nameField    = document.getElementById('f-name');
    const emailField   = document.getElementById('f-email');
    const msgField      = document.getElementById('f-msg');

    const nameError    = document.getElementById('err-name');
    const emailError   = document.getElementById('err-email');
    const msgError     = document.getElementById('err-msg');

    let isValid = true;

    // Reset previous error states
    [nameError, emailError, msgError].forEach((el) => (el.textContent = ''));
    [nameField, emailField, msgField].forEach((el) => (el.style.borderColor = ''));

    // Validate name (min 2 characters)
    if (nameField.value.trim().length < 2) {
      nameError.textContent = '⚠ Please enter your full name.';
      nameField.style.borderColor = '#ff4d6d';
      isValid = false;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value.trim())) {
      emailError.textContent = '⚠ Please enter a valid email address.';
      emailField.style.borderColor = '#ff4d6d';
      isValid = false;
    }

    // Validate message (min 10 characters)
    if (msgField.value.trim().length < 10) {
      msgError.textContent = '⚠ Message must be at least 10 characters.';
      msgField.style.borderColor = '#ff4d6d';
      isValid = false;
    }

    if (!isValid) return; // stop here if invalid

    // Show "sending" loading state
    const btnLabel  = document.getElementById('btn-label');
    const btnLoader = document.getElementById('btn-loader');
    btnLabel.style.display  = 'none';
    btnLoader.style.display = 'inline-flex';
    sendBtn.disabled = true;

    // Simulate sending (replace this with a real backend / EmailJS call)
    setTimeout(() => {
      btnLabel.style.display  = 'inline-flex';
      btnLoader.style.display = 'none';
      sendBtn.disabled = false;

      contactForm.reset();

      const successMsg = document.getElementById('form-success');
      successMsg.style.display = 'block';

      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }, 1700);
  });

  // Clear individual field errors as the user types
  ['f-name', 'f-email', 'f-msg'].forEach((id) => {
    const field = document.getElementById(id);
    field.addEventListener('input', function () {
      this.style.borderColor = '';
      const errorId = 'err-' + id.split('-')[1];
      const errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.textContent = '';
    });
  });
}


/* -------------------------------------------------------------
   13. PARTICLE BACKGROUND (HERO CANVAS)
------------------------------------------------------------- */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

let particlesArray = [];
const mousePos = { x: null, y: null };

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
});

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.8 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.6 + 0.15;

    // Mostly cyan, with some blue and purple for variety
    const colorRoll = Math.random();
    if (colorRoll < 0.55) {
      this.color = `rgba(0, 212, 255, ${this.opacity})`;
    } else if (colorRoll < 0.82) {
      this.color = `rgba(0, 98, 255, ${this.opacity})`;
    } else {
      this.color = `rgba(123, 47, 255, ${this.opacity})`;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Gentle repulsion away from mouse cursor
    if (mousePos.x !== null && mousePos.y !== null) {
      const dx = mousePos.x - this.x;
      const dy = mousePos.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        this.x -= dx * 0.015;
        this.y -= dy * 0.015;
      }
    }

    // Wrap particles around screen edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Draw thin connecting lines between nearby particles
function connectParticles() {
  const maxDistance = 120;

  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const lineOpacity = (1 - distance / maxDistance) * 0.25;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 212, 255, ${lineOpacity})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

// Create particles based on screen size (capped for performance)
function initParticles() {
  particlesArray = [];
  const total = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
  for (let i = 0; i < total; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();
window.addEventListener('resize', initParticles);

// Main particle animation loop
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();


/* -------------------------------------------------------------
   14. 3D TILT EFFECT ON PROJECT CARDS
------------------------------------------------------------- */
document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 6;
    const rotateX = -((y - midY) / midY) * 6;

    card.style.transition = 'transform 0.1s ease';
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = '';
  });
});


/* -------------------------------------------------------------
   15. GLOWING RADIAL HOVER ON SKILL CARDS
------------------------------------------------------------- */
document.querySelectorAll('.sk-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,212,255,0.08), var(--glass) 65%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});


/* -------------------------------------------------------------
   16. INITIAL TRIGGER ON PAGE READY
------------------------------------------------------------- */
// Run once more shortly after the loading screen disappears,
// in case some sections are already visible on first paint.
setTimeout(revealOnScroll, 2700);