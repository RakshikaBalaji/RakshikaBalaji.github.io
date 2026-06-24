/* ============================================
   RAKSHIKA BALAJI — main.js
   Scroll reveal + nav + mobile menu
   ============================================ */

/* --- NAV SHADOW ON SCROLL --- */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

/* --- MOBILE MENU TOGGLE --- */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

/* Close mobile menu when a link is clicked */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* --- SCROLL REVEAL --- */
function initReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- BLOG CATEGORY FILTER --- */
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogItems  = document.querySelectorAll('.blog-item[data-cat]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selected = btn.dataset.filter;
      blogItems.forEach(item => {
        if (selected === 'all' || item.dataset.cat === selected) {
          item.style.display = 'grid';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --- ACTIVE NAV LINK --- */
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initReveal();
  initBlogFilter();
});
