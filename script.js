// ===== MENU MOBILE =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const iconOpen = document.getElementById('iconOpen');
const iconClose = document.getElementById('iconClose');
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden', !menuOpen);
  iconOpen.classList.toggle('hidden', menuOpen);
  iconClose.classList.toggle('hidden', !menuOpen);
}
menuBtn.addEventListener('click', toggleMenu);
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { if (menuOpen) toggleMenu(); }));

// ===== HEADER SCROLL =====
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== SCROLL PROGRESS =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  scrollProgress.style.width = pct + '%';
});

// ===== INTERSECTION OBSERVER - ANIMAÇÕES =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Counter animation
      if (entry.target.classList.contains('number-card')) {
        const counters = entry.target.querySelectorAll('[data-count]');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'));
          let current = 0;
          const step = target / 50;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            counter.textContent = Math.floor(current);
          }, 25);
        });
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-hero, .number-card').forEach(el => {
  observer.observe(el);
});

// ===== HERO ANIMATION ON LOAD =====
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-title, .reveal-hero').forEach(el => el.classList.add('visible'));
});

// ===== PARALLAX SUAVE =====
const parallaxElements = document.querySelectorAll('.hero-bg, .about-bg, .results-bg, .diff-bg, .services-bg, .plans-bg, .process-bg, .contact-bg');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  parallaxElements.forEach(el => {
    const rect = el.parentElement.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const speed = 0.15;
      const yPos = -(rect.top * speed);
      el.style.transform = `scale(1.1) translateY(${yPos}px)`;
    }
  });
});

// ===== FORMULÁRIO =====
const form = document.getElementById('leadForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const segmento = document.getElementById('segmento').value;
  const tipo = document.getElementById('tipo').value;
  if (!nome || !email || !telefone || !segmento || !tipo) {
    formMsg.classList.remove('hidden');
    formMsg.textContent = '⚠️ Preencha os campos obrigatórios (*) antes de enviar.';
    formMsg.className = 'text-center text-sm font-medium text-red-600 bg-red-50 rounded-lg px-4 py-3';
    return;
  }
  formMsg.classList.remove('hidden');
  formMsg.textContent = '✅ Recebemos seus dados! Nossa equipe entrará em contato em até 24h úteis.';
  formMsg.className = 'text-center text-sm font-medium text-green-600 bg-green-50 rounded-lg px-4 py-3';
  form.reset();
  formMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
