# 🌐 Ishak Portfolio

A minimal, dark-first personal portfolio built with **React** and **SCSS**.  
The website showcases my projects, skills, and experience in a clean and modern interface.

Portfolio content is driven from `src/data/profile.ts`, making it easy to update personal information, projects, and skills from a single source.

The UI includes subtle reveal animations, animated skill meters, and a responsive layout optimized for both desktop and mobile devices.

---

## 🚀 Features

- Dark-first modern design
- Fully responsive layout
- Subtle reveal animations
- Animated skill meters
- Projects showcase
- Centralized content configuration (`profile.ts`)
- Fast and lightweight build

---

## 🛠️ Tech Stack

- **React**
- **SCSS**
- **Vite**
- **TypeScript**
- **HashRouter** for static hosting compatibility

---

## 📂 Project Structure

```
src/
│
├── components/      # Reusable UI components
├── pages/           # Main pages (Home, Contact, Blog, etc.)
├── data/
│   └── profile.ts   # Portfolio content configuration
├── styles/          # Global styles and SCSS
└── assets/          # Images and static assets
```

---

## 💻 Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app will run locally on the development server.

---

## 📦 Build

To create a production build:

```bash
npm run build
```

The optimized build output will be generated in:

```
dist/
```

---

## 🌍 GitHub Pages Deployment

This project uses **HashRouter**, which allows client-side routes like:

```
/contact
/blog/...
```

to work correctly on static hosting without server rewrites.

If deploying to a **GitHub Pages project site**:

```
https://github.com/<user>/<repo>/
```

set the following environment variable during build:

```
VITE_BASE_URL=/<repo>/
```

If not set, the default value will be:

```
./
```

This ensures safer relative asset paths.

---

## 📄 CV Download

The CV is located at:

```
public/resume.pdf
```

It is used by the **"Download CV"** buttons on the portfolio.

To update your CV, simply replace the file.

---

## 📸 Preview

You can add a screenshot of the portfolio here.

```
/public/preview.png
```

---

## 📬 Contact

Feel free to reach out or explore more of my work.

- GitHub: https://github.com/yourusername
- Portfolio: https://your-portfolio-link.com

---

⭐ If you like the project, consider giving it a star!
