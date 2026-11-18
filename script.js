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

// ===== FORMULÁRIO COM FORMSUBMIT =====
const form = document.getElementById('leadForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const cnpj = document.getElementById('cnpj').value.trim();
  const segmento = document.getElementById('segmento').value;
  const tipo = document.getElementById('tipo').value;
  const edital = document.getElementById('edital').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !telefone || !segmento || !tipo) {
    formMsg.classList.remove('hidden');
    formMsg.textContent = '⚠️ Preencha os campos obrigatórios (*) antes de enviar.';
    formMsg.className = 'text-center text-sm font-medium text-red-600 bg-red-50 rounded-lg px-4 py-3';
    return;
  }

  // Monta o payload para o FormSubmit
  const dados = new URLSearchParams({
    nome: nome,
    'e-mail': email,
    telefone: telefone,
    cnpj: cnpj || '—',
    segmento: segmento,
    'tipo de licitação': tipo,
    'link do edital': edital || '—',
    mensagem: mensagem || '—',
    _subject: `Novo lead do site — ${nome} (${segmento})`,
    _template: 'table'
  });

  // Desabilita o botão enquanto envia
  const btn = form.querySelector('button[type="submit"]');
  const btnText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  formMsg.classList.add('hidden');

  try {
    // Envia para o FormSubmit (e-mail configurado no HTML)
    const resposta = await fetch(form.getAttribute('action'), {
      method: 'POST',
      body: dados,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      mode: 'no-cors'
    });
    // Com no-cors não conseguimos ler a resposta, mas o envio é efetuado
    formMsg.classList.remove('hidden');
    formMsg.textContent = '✅ Recebemos seus dados! Nossa equipe entrará em contato em até 24h úteis.';
    formMsg.className = 'text-center text-sm font-medium text-green-600 bg-green-50 rounded-lg px-4 py-3';
    form.reset();
    formMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (erro) {
    formMsg.classList.remove('hidden');
    formMsg.textContent = '❌ Ocorreu um erro ao enviar. Tente novamente ou fale conosco pelo WhatsApp.';
    formMsg.className = 'text-center text-sm font-medium text-red-600 bg-red-50 rounded-lg px-4 py-3';
  } finally {
    btn.disabled = false;
    btn.textContent = btnText;
  }
});
