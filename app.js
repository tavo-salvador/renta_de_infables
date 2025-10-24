// app.js
// Año dinámico y fecha mínima
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const fecha = document.getElementById('fecha');
  if (fecha) fecha.min = new Date().toISOString().split('T')[0];

  // Menú mobile
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

  // Scrollspy
  const links = document.querySelectorAll('.nav-link');
  const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));
  const onScroll = () => {
    const y = window.scrollY + 120;
    links.forEach((link, i) => {
      const sec = sections[i];
      if (!sec) return;
      if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) link.classList.add('active');
      else link.classList.remove('active');
    });
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Filtros catálogo
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const price = document.getElementById('price');
  const cards = [...document.querySelectorAll('#grid .card')];
  const emptyState = document.getElementById('emptyState');

  function applyFilters() {
    const q = (search?.value || '').toLowerCase();
    const cat = category?.value || 'all';
    const priceVal = price?.value || 'all';
    let visible = 0;
    cards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const c = card.dataset.category;
      const p = card.dataset.price; // 1..4
      const match = name.includes(q)
        && (cat === 'all' || c === cat)
        && (priceVal === 'all' || p === priceVal);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (emptyState) emptyState.classList.toggle('hidden', visible !== 0);
  }
  [search, category, price].forEach(el => el && el.addEventListener('input', applyFilters));

  // Lightbox
  window.openLightbox = (src) => {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!lb || !img) return;
    img.src = src;
    lb.style.display = 'flex';
  };
  window.closeLightbox = () => {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.style.display = 'none';
  };

  // Formulario (mock)
  const form = document.getElementById('form');
  const formMsg = document.getElementById('formMsg');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      formMsg.textContent = 'Por favor completa los campos requeridos.';
      formMsg.className = 'text-red-600';
      return;
    }
    formMsg.textContent = '¡Gracias! Te contactaremos en breve por WhatsApp o correo.';
    formMsg.className = 'text-emerald-600';
    form.reset();
  });
});
