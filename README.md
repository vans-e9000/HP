# Beats Studio Pro - Scrollytelling Landing Page

A premium, interactive landing page re-imagining the web experience for Beats Studio Pro. This project focuses on high-end visual storytelling, utilizing scroll-linked animations, 3D interactions, and a polished "strict light mode" aesthetic.

![Beats Studio Pro](public/images/lifestyle-black.png)

## 🚀 Features

- **🎧 Scrollytelling Hero**: A complex 3D deconstruction animation of the headphones that plays in sync with your scroll, rendered on an HTML5 Canvas for performance.
- **✨ GSAP Animations**:
  - **3D Tilt Effects**: Hover over sound features to see them tilt in 3D space.
  - **Split-Text Reveals**: Headers animate in character-by-character for a cinematic feel.
  - **Levitation**: Technical elements float and flip as you scroll.
- **🌊 Smooth Scrolling**: Integrated **Lenis** for buttery-smooth inertia scrolling that creates a premium feel.
- **🎨 Interactive Shop**: Dynamic color switching that instantly updates lifestyle imagery and UI accents.
- **💎 Premium UI**: Custom design using **Syne** (headers) and **Space Grotesk** (body) Google Fonts.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: 
  - [GSAP](https://greensock.com/gsap/) (ScrollTrigger)
  - [Lenis](https://github.com/studio-freight/lenis) (Smooth Scroll)
- **Graphics**: HTML5 Canvas + Frame Sequence

## 📦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/beats-landing-page.git
   cd beats-landing-page
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **View the site**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- **`app/`**: Core application code (Layout, Page, Globals).
- **`components/`**:
  - `BeatsScroll.tsx`: The logic for the canvas-based hero animation.
  - `SoundSection.tsx`: Audio features with 3D driver images.
  - `SpecsSection.tsx`: Technical specs with levitating blueprint.
  - `ShopSection.tsx`: Color selector and purchasing UI.
  - `SmoothScroll.tsx`: Lenis integration wrapper.
- **`public/`**:
  - `beats-frames/`: Sequence of 120+ frames for the hero animation.
  - `images/`: High-res static assets (lifestyle shots, diagrams).

## 🚀 Deployment

This project is optimized for deployment on **Netlify** or **Vercel**.

**Important for Netlify:**
Ensure you have pushed all assets to GitHub before deploying. The `public/beats-frames` folder contains over 100 images crucial for the hero animation.

```bash
git add .
git commit -m "Ready for deploy"
git push origin main
```

## 📄 License

This project is a concept/demo and is not affiliated with Beats by Dre or Apple.
