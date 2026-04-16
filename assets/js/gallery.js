// Lightbox for gallery
(function() {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');
  const lbCounter = document.getElementById('lb-counter');

  if (!lb || !lbImg) return;

  let current = 0;
  const srcs = items.map(el => el.querySelector('img').getAttribute('data-full') || el.querySelector('img').src);
  const alts = items.map(el => el.querySelector('img').alt || '');

  function open(index) {
    current = index;
    lbImg.style.opacity = '0';
    lbImg.src = srcs[current];
    lbImg.alt = alts[current];
    lbImg.onload = () => { lbImg.style.opacity = '1'; };
    if (lbCounter) lbCounter.textContent = `${current + 1} / ${items.length}`;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prev() { open((current - 1 + items.length) % items.length); }
  function next() { open((current + 1) % items.length); }

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));

  if (lbClose) lbClose.addEventListener('click', close);
  if (lbPrev) lbPrev.addEventListener('click', prev);
  if (lbNext) lbNext.addEventListener('click', next);

  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
