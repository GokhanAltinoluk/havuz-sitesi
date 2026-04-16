// Contact form validation + Formspree submit
(function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const success = document.getElementById('form-success');

  function validate(input) {
    const group = input.closest('.form-group');
    const msg = group ? group.querySelector('.form-msg') : null;
    let valid = true;
    let text = '';

    if (input.required && !input.value.trim()) {
      valid = false;
      text = 'Bu alan zorunludur.';
    } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      valid = false;
      text = 'Geçerli bir e-posta adresi giriniz.';
    } else if (input.name === 'phone' && input.value && !/^[\d\s\+\-\(\)]{7,}$/.test(input.value)) {
      valid = false;
      text = 'Geçerli bir telefon numarası giriniz.';
    }

    input.classList.toggle('error', !valid);
    if (msg) {
      msg.textContent = text;
      msg.classList.toggle('visible', !valid);
    }
    return valid;
  }

  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => validate(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validate(input);
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    let allValid = true;
    form.querySelectorAll('input, select, textarea').forEach(input => {
      if (!validate(input)) allValid = false;
    });
    if (!allValid) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Gönderiliyor…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        btn.disabled = false;
        btn.textContent = originalText;
        alert('Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = originalText;
      alert('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
    }
  });
})();
