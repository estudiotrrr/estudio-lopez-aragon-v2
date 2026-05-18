/* ============================================
   MAIN.JS - Slider, scroll reveal, navbar
   ============================================ */

// ============================================
// SLIDER DEL HERO
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 6000);

window.addEventListener('load', () => {
  const firstSlide = document.querySelector('.slide.active:first-of-type');
  if (firstSlide) {
    firstSlide.style.transition = 'opacity 1.2s ease';
  }
});

// ============================================
// SCROLL REVEAL
// ============================================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.height = '60px';
    nav.style.background = 'rgba(26, 58, 40, 0.98)';
  } else {
    nav.style.height = '72px';
    nav.style.background = 'rgba(26, 58, 40, 0.97)';
  }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.classList.toggle('open');
  });
}

// Cerrar menú al tocar un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active', 'open');
    navToggle.classList.remove('active', 'open');
  });
});

// Abrir/cerrar menú al tocar el logo en mobile
const navLogo = document.querySelector('.nav-logo');
if (navLogo && navToggle && navLinks) {
  navLogo.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.classList.toggle('open');
  });
}

// ============================================
// PRECARGA ANTICIPADA DE IMÁGENES
// ============================================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
}, {
  rootMargin: '600px 0px'
});

lazyImages.forEach(img => imageObserver.observe(img));