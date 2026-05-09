const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

document.querySelector('.btn-submit').addEventListener('click', () => {
  const btn = document.querySelector('.btn-submit');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#2d6a4f';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
  }, 3000);
});