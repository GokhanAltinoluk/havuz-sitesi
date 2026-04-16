# {{FIRMA_ADI}} — Havuz Sitesi

Yüzme havuzu yapım firması için statik web sitesi. GitHub Pages üzerinde barındırılır.

## Hızlı Başlangıç: Lokal Test

```bash
# Python ile lokal server (Python 3)
cd C:/claude/gun2
python -m http.server 8000
# Tarayıcıda: http://localhost:8000
```

## GitHub Pages ile Yayına Alma

1. GitHub'da yeni **public** repo oluşturun (örn. `havuz-site`)
2. Bu klasörü repo'ya bağlayın:
   ```bash
   git init
   git add .
   git commit -m "İlk yükleme"
   git remote add origin https://github.com/KULLANICI_ADI/havuz-site.git
   git push -u origin main
   ```
3. GitHub repo → **Settings → Pages → Source:** `Deploy from a branch` → `main` / `/ (root)` → **Save**
4. 1–2 dakika sonra `https://KULLANICI_ADI.github.io/havuz-site/` adresinde yayında

## Formspree Kurulumu (İletişim Formu)

1. [formspree.io](https://formspree.io) adresinde ücretsiz hesap açın
2. "New Form" → e-posta adresinizi girin → form ID alın (örn. `xyzabcde`)
3. `iletisim.html` dosyasında `{{FORMSPREE_ID}}` kısmını gerçek ID ile değiştirin:
   ```html
   action="https://formspree.io/f/xyzabcde"
   ```
4. İlk form gönderiminde gelen onay e-postasını onaylayın

## Kişiselleştirme: Placeholder'ları Değiştirin

Tüm HTML dosyalarında aşağıdaki placeholder'ları kendi bilgilerinizle değiştirin:

| Placeholder | Açıklama | Örnek |
|---|---|---|
| `{{FIRMA_ADI}}` | Firma/marka adı | AquaLux Havuz |
| `{{TELEFON}}` | Telefon numarası | 0 (532) 123 45 67 |
| `{{WHATSAPP}}` | WhatsApp numarası (uluslararası) | 905321234567 |
| `{{EMAIL}}` | E-posta adresi | info@aqualux.com.tr |
| `{{ADRES}}` | Firma adresi | Ataşehir, İstanbul |
| `{{ŞEHİR}}` | Şehir | İstanbul |
| `{{FORMSPREE_ID}}` | Formspree form ID | xyzabcde |
| `{{GITHUB_USER}}` | GitHub kullanıcı adı | kullanici |
| `{{REPO_NAME}}` | Repo adı | havuz-site |

### Toplu değiştirme (Windows PowerShell):
```powershell
Get-ChildItem -Path "C:\claude\gun2" -Filter "*.html" -Recurse |
  ForEach-Object {
    (Get-Content $_.FullName) -replace '{{FIRMA_ADI}}', 'AquaLux Havuz' |
    Set-Content $_.FullName
  }
```

## Custom Domain (Opsiyonel)

1. `CNAME` dosyası oluşturun (proje kök dizininde):
   ```
   alanadi.com
   ```
2. DNS yöneticisinde A kaydı ekleyin:
   ```
   @ → 185.199.108.153
   @ → 185.199.109.153
   @ → 185.199.110.153
   @ → 185.199.111.153
   ```
3. CNAME kaydı (www için):
   ```
   www → KULLANICI_ADI.github.io
   ```
4. GitHub Pages → Custom domain → alan adını girin → "Enforce HTTPS" işaretleyin

## Dosya Yapısı

```
/
├── index.html              Ana sayfa
├── havuz-tipleri.html      Backyard + Beach Pool
├── yapim-sureci.html       8 aşamalı yapım timeline
├── teknik-materyaller.html Kimyasallar + Ekipman
├── galeri.html             Lightbox galeri
├── blog.html               Blog listesi
├── iletisim.html           Formspree formu
├── 404.html                Hata sayfası
├── blog/
│   ├── havuz-bakim-rehberi.html
│   ├── kis-korumasi.html
│   └── kimyasal-dengeleme.html
├── assets/
│   ├── css/style.css       Tüm stiller
│   ├── js/
│   │   ├── main.js         Navbar, accordion, fade-in
│   │   ├── gallery.js      Lightbox
│   │   └── form.js         Form validasyon
│   └── img/favicon.svg
├── robots.txt
└── sitemap.xml
```

## Yeni Blog Yazısı Eklemek

1. `blog/` klasörüne yeni `.html` dosyası oluşturun (mevcut yazıları şablon olarak kullanın)
2. `blog.html`'deki yazı listesine yeni kartı ekleyin
3. `sitemap.xml`'e yeni URL'yi ekleyin

## Gereksinimler

- Sunucu gerekmez (saf statik HTML/CSS/JS)
- Hiçbir npm paketi veya build adımı yok
- Internet bağlantısı: Google Fonts ve Unsplash görselleri CDN'den yüklenir
