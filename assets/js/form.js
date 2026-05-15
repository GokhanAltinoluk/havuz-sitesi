// Contact form — validation + mailto submit
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

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let allValid = true;
    form.querySelectorAll('input, select, textarea').forEach(input => {
      if (!validate(input)) allValid = false;
    });
    if (!allValid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Yönlendiriliyor…';

    const data = new FormData(form);
    const labelMap = {
      name:       'Ad Soyad',
      phone:      'Telefon',
      email:      'E-posta',
      pool_type:  'Havuz Tipi',
      pool_size:  'Tahmini Büyüklük',
      message:    'Mesaj'
    };

    const lines = [];
    data.forEach(function(val, key) {
      if (val && val.toString().trim()) {
        const label = labelMap[key] || key;
        lines.push(label + ': ' + val);
      }
    });

    const subject = encodeURIComponent('Yeni Havuz Proje Talebi — BODRUMPOOL');
    const body    = encodeURIComponent(lines.join('\n') + '\n\n— bodrumpool.com iletişim formu');
    window.location.href = 'mailto:info@bodrumpool.com?subject=' + subject + '&body=' + body;

    // Kısa gecikme sonrası başarı mesajı göster
    setTimeout(function() {
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 800);
  });
})();
