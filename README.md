# 🌌 Vishwa Madusanka — Personal Portfolio

> *"I build distributed systems, ship mobile apps, and play the violin."*
> — 3rd-year Software Engineering undergrad at SLIIT

🔥 **A futuristic, fully responsive personal portfolio** built with **Next.js 15**, **Tailwind CSS**, **Three.js**, and **Framer Motion** — designed to impress at first glance with glassmorphism, WebGL particle backgrounds, and buttery-smooth animations.

---

## ✨ Features

✅ **Ultra-Premium Design**

* Glassmorphism UI with liquid gradient typography
* Animated 3D WebGL particle background (Three.js / React Three Fiber)
* Holographic avatar with dark mode by default + light mode toggle
* Graceful fallback to 2D mode when WebGL is unavailable

✅ **Interactive & Dynamic Sections**

* 🏠 **Hero** — Animated name reveal, holographic avatar, CV download
* 👤 **About** — Personal bio and background
* 🚀 **Projects** — Filterable project showcase with 3D galaxy view
* 🛠️ **Skills** — Animated skill matrix with hover effects
* 🏆 **Certifications & Credentials** — Timeline of achievements
* 📝 **Blog** — Articles and writing
* 📬 **Contact** — Contact form with social links

✅ **Modern Tech Stack**

* Next.js 15 (App Router)
* Tailwind CSS & Radix UI components
* Framer Motion for smooth page and element animations
* Three.js & React Three Fiber for 3D WebGL scenes
* next-themes for seamless dark/light mode
* React Hook Form + Zod for validated contact form
* SEO-optimized with OpenGraph metadata

✅ **Developer-Friendly**

* Clean, modular, and reusable component structure
* TypeScript throughout
* Easily customizable — swap out content to make it your own

---

## 🚀 Live Demo

🌐 [**Visit Portfolio**](https://portfolio-rho-murex-17.vercel.app/)

---

## 🖥️ Tech Stack

| Layer | Tech |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS, Radix UI |
| **Animations** | Framer Motion |
| **3D / WebGL** | Three.js, React Three Fiber, Drei |
| **Forms** | React Hook Form, Zod |
| **Theming** | next-themes |
| **Language** | TypeScript |
| **Hosting** | Vercel |

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/vishwa-madusanka/Portfolio.git

# Go to the project directory
cd Portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

```bash
npm run build   # Build for production
npm run start   # Run production build
npm run lint    # Run ESLint
```

---

## 📁 Project Structure

```
Portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with theme provider
│   └── page.tsx            # Main page
├── components/
│   ├── 3d/                 # Three.js / WebGL components
│   │   ├── particle-background.tsx
│   │   ├── holographic-avatar.tsx
│   │   ├── project-galaxy.tsx
│   │   └── skill-wheel.tsx
│   ├── sections/           # Page sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── certifications-section.tsx
│   │   ├── blog-section.tsx
│   │   └── contact-section.tsx
│   ├── navigation.tsx
│   ├── interactive-timeline.tsx
│   └── ui/                 # Radix UI / shadcn components
├── public/
│   └── cv.pdf              # Your downloadable CV
├── styles/
└── lib/
```

---

## 📄 CV Download

Place your CV at `public/cv.pdf` to enable the **Download CV** button on the hero section. It will be served as `Vishwa_Madusanka_CV.pdf` when downloaded.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 About Me

**Vishwa Madusanka** — Software Engineering undergraduate at SLIIT, Sri Lanka.
Building distributed systems, shipping mobile apps, and occasionally playing the violin.

* 🐙 GitHub: [@vishwa-madusanka](https://github.com/vishwa-madusanka)
