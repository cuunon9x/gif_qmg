
# 🎁 QMG Gift — Quà Tặng Doanh Nghiệp

Website giới thiệu và đặt hàng quà tặng doanh nghiệp cao cấp: quà Tết, bánh Trung Thu, thiết kế hộp quà riêng, rượu vang nhập khẩu... tại Việt Nam.
Xây dựng bằng **React + Vite + Tailwind CSS**, triển khai miễn phí trên **GitHub Pages**.

---

## 🛠️ Tech Stack

- [React](https://react.dev) — UI framework
- [Vite](https://vite.dev) — Build tool
- [Tailwind CSS v3](https://tailwindcss.com) — Utility-first CSS
- [React Router](https://reactrouter.com) — Routing
- [GitHub Pages](https://pages.github.com) — Free hosting

---

## 📁 Cấu trúc thư mục

```
src/
├── components/      # Navbar, Footer, ProductCard, ...
├── pages/           # Trang chính, chi tiết, danh mục
├── sections/        # Hero, Testimonials, FeaturedProducts, ...
├── assets/          # Ảnh, icon, ...
├── hooks/           # Custom React hooks
├── context/         # React Context (Cart, ...)
├── data/            # Dữ liệu mẫu, danh mục
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Chạy dự án (Development)

### Yêu cầu
- [Node.js](https://nodejs.org) >= 18
- npm >= 8

### Các bước

```bash
# 1. Clone repo
git clone https://github.com/cuunon9x/gif_qmg.git
cd gif_qmg/gif_qmg

# 2. Cài đặt dependencies
npm install

# 3. Chạy dev server
npm run dev
```

Mở trình duyệt tại **http://localhost:5173**

---

## 📦 Build production

```bash
npm run build
```

File output trong thư mục `dist/`.

---

## 🌐 Deploy lên GitHub Pages

1. Cài package gh-pages:
	```sh
	npm install -D gh-pages
	```

2. Cập nhật `vite.config.js`:
	```js
	export default defineConfig({
	  base: '/gif_qmg/',
	  plugins: [react()]
	});
	```

3. Thêm scripts vào `package.json`:
	```json
	"scripts": {
	  "predeploy": "npm run build",
	  "deploy": "gh-pages -d dist"
	}
	```

4. Deploy:
	```sh
	npm run deploy
	```

Site sẽ live tại: `https://cuunon9x.github.io/gif_qmg/`

---

## 📞 Thông tin liên hệ

- **Hotline:** 0909 123 456
- **Email:** info@quatangqmg.vn
- **Địa chỉ:** 123 Đường Lê Văn Việt, TP. Thủ Đức, TP. Hồ Chí Minh
