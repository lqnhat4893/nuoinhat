# Nuôi Tôi

Nền tảng ủng hộ cá nhân với cam kết minh bạch 100%.

**Live:** [nuoitoi.khuong.dev](https://nuoitoi.khuong.dev)

## Tính năng

- **Giao diện Light Mode Clean**: Thiết kế tối giản, chuyên nghiệp
- **Responsive**: Hỗ trợ đầy đủ mobile, tablet, desktop
- **Animations mượt mà**: Fade-in, counter, progress ring (tôn trọng `prefers-reduced-motion`)
- **Hỗ trợ đa phương thức donate**:
  - VietQR Bank (MB Bank)
  - Momo
  - Buy Me A Coffee (Quốc tế)
- **Copy to clipboard**: Sao chép thông tin ngân hàng nhanh chóng
- **Auto update date**: Ngày cập nhật sao kê tự động theo thời gian thực
- **Accessibility**: Skip link, ARIA labels, semantic HTML
- **SEO Ready**: Meta tags, Open Graph, Twitter Cards

## Cấu trúc

```text
nuoitoi/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions auto deploy
├── assets/
│   ├── favicon.svg         # Favicon
│   └── og-image.svg        # Open Graph image (1200x630)
├── css/
│   └── styles.css          # Styles
├── js/
│   └── main.js             # JavaScript
├── index.html              # Trang chính
├── CNAME                   # Custom domain
└── README.md
```

## Phương thức donate

| Phương thức     | Thông tin                                                                |
| --------------- | ------------------------------------------------------------------------ |
| MB Bank         | STK: `0987199439` (VietQR)                                               |
| Momo            | [me.momo.vn/khuong](https://me.momo.vn/khuong)                           |
| Buy Me A Coffee | [buymeacoffee.com/lamngockhuong](https://buymeacoffee.com/lamngockhuong) |

## Cài đặt local

```bash
# Clone repository
git clone https://github.com/lamngockhuong/nuoitoi.git
cd nuoitoi

# Mở trực tiếp
open index.html

# Hoặc sử dụng local server
python -m http.server 8000
# hoặc
npx serve
```

## Deploy

### GitHub Pages (Auto)

Project đã cấu hình sẵn GitHub Actions. Mỗi khi push lên `main`, sẽ tự động deploy.

1. Push code lên GitHub
2. Vào **Settings > Pages**
3. Source: **GitHub Actions**
4. Custom domain: `nuoitoi.khuong.dev`

**Cấu hình DNS:**

```text
Type: CNAME
Name: nuoitoi
Value: lamngockhuong.github.io
```

## Tùy chỉnh

### VietQR

Thay đổi URL trong `index.html`:

```html
<img src="https://img.vietqr.io/image/MB-0987199439-compact.png" ... />
```

Format: `https://img.vietqr.io/image/{BANK_CODE}-{ACCOUNT_NUMBER}-compact.png`

### Momo

```html
<a href="https://me.momo.vn/khuong" ...></a>
```

### Buy Me A Coffee

```html
<a href="https://buymeacoffee.com/lamngockhuong" ...></a>
```

### Màu sắc

Chỉnh sửa CSS variables trong `css/styles.css`:

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #10b981;
  --color-accent: #f59e0b;
}
```

## Tech Stack

- HTML5 semantic (`<main>`, `<section>`, `<header>`, `<footer>`)
- CSS3 (Custom Properties, Flexbox, Grid, `prefers-reduced-motion`)
- Vanilla JavaScript (ES6+, IntersectionObserver)
- [Inter](https://fonts.google.com/specimen/Inter) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) fonts
- [Remix Icons](https://remixicon.com/)
- [VietQR API](https://vietqr.io/)

## Liên hệ

- Email: [nuoitoi@khuong.dev](mailto:nuoitoi@khuong.dev)
- Facebook: [lamngockhuong](https://facebook.com/lamngockhuong)

## License

MIT
