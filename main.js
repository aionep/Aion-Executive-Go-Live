// ── Mobile Navigation ──────────────────────────────────────
const burgerBtn = document.getElementById('burger-btn');
const mobileNav = document.getElementById('mobile-nav');

if (burgerBtn && mobileNav) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    burgerBtn.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when link clicked
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burgerBtn.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', false);
    });
  });
}

// ── Active Nav Link ────────────────────────────────────────
const currentPath = window.location.pathname;
document.querySelectorAll('#site-header nav a, #mobile-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && href === '/') ||
      (currentPath !== '/' && href !== '/' && currentPath.startsWith(href))) {
    a.classList.add('active');
  }
});

// ── Cookie Consent ─────────────────────────────────────────
const CONSENT_KEY = 'cookie-consent';
const banner = document.getElementById('cookie-banner');

function showBanner() {
  if (banner && !localStorage.getItem(CONSENT_KEY)) {
    setTimeout(() => banner.classList.add('show'), 800);
  }
}

function acceptCookies(value) {
  localStorage.setItem(CONSENT_KEY, value);
  if (banner) banner.classList.remove('show');
}

if (banner) {
  showBanner();
  const btnAccept = banner.querySelector('.btn-accept');
  const btnEssential = banner.querySelector('.btn-essential');
  if (btnAccept) btnAccept.addEventListener('click', () => acceptCookies('all'));
  if (btnEssential) btnEssential.addEventListener('click', () => acceptCookies('essential'));
}

// ── FAQ Accordion ──────────────────────────────────────────
document.querySelectorAll('.faq-btn').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('.faq-icon');
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-icon').forEach(ic => ic.classList.remove('open'));

    // Toggle this one
    if (!isOpen) {
      answer.classList.add('open');
      if (icon) icon.classList.add('open');
    }
  });
});

// ── Testimonial Carousel ───────────────────────────────────
const track = document.querySelector('.carousel-track');
const btnLeft = document.querySelector('.carousel-btn-left');
const btnRight = document.querySelector('.carousel-btn-right');

function scrollCarousel(dir) {
  if (!track) return;
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  const cardWidth = isDesktop ? track.offsetWidth / 3 : track.offsetWidth;
  track.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
}

if (btnLeft) btnLeft.addEventListener('click', () => scrollCarousel('left'));
if (btnRight) btnRight.addEventListener('click', () => scrollCarousel('right'));
