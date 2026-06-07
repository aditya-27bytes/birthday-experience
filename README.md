# 🎂 Digital Birthday Experience

## Overview
A premium, cinematic, and interactive personalized digital birthday journey built using Next.js, Framer Motion, and WebGL. This application allows users to generate a customized storytelling experience containing photos, a timeline, interactive 3D elements (like blowing out a candle), and hidden surprises. 

## ✨ Features
- **Interactive Storytelling:** Fluid scroll-driven animations powered by Framer Motion.
- **Custom Experience Generator:** A multi-step form to upload photos, input timelines, and write letters.
- **WebGL Backgrounds:** Features a beautiful flowing Aurora gradient built with `ogl`.
- **3D Interactive Cake:** Users can interact with a 3D birthday cake and "blow out" the candle by clicking on it, using Three.js and `@react-three/fiber`.
- **Memory Timeline & Polaroids:** An elegant visual showcase of cherished moments.
- **State Management:** Zustand is used to pass the customized data from the Generator down to the Experience pages via local storage persistence.

## 🛠️ Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4 (with PostCSS configuration)
- **Animations:** Framer Motion, GSAP
- **3D & WebGL:** Three.js, React Three Fiber, React Three Drei, OGL
- **State Management:** Zustand (with Persist)
- **Icons:** Lucide React

## 📂 Project Structure & Code Explanation

### 1. `src/app`
- **`page.tsx`:** The landing page that welcomes the user. Offers buttons to view a demo or start creating a custom experience.
- **`create/page.tsx`:** The custom experience generator. A multi-step form that captures photos (auto-compresses them to Base64 to respect localStorage limits), timelines, quotes, and a letter. When complete, it saves the data to Zustand and generates a copyable sharing link.
- **`birthday/[id]/page.tsx`:** The core engine of the app. It reads the `id` from the URL. If the ID is `"custom"`, it loads data from Zustand. Otherwise, it loads `mockData.ts` (the demo). It renders all the animated components stacked inside an `ExperienceContainer`.

### 2. `src/components`
- **`Aurora.tsx` & `Aurora.css`:** A stunning, interactive WebGL gradient background that sits fixed behind the entire experience.
- **`PersonalizedIntro.tsx`:** The opening sequence. Includes an animated counting number (`CountUp.tsx`) for the age and a beautiful curved scrolling marquee (`CurvedLoop.tsx`).
- **`MemoryJourney.tsx` & `PolaroidWall.tsx`:** Displays the recipient's life timeline and photo gallery with beautiful scroll-linked fade-in animations and stagger effects.
- **`InteractiveCake.tsx`:** Uses `<Canvas>` from `@react-three/fiber` to render a 3D birthday cake. It features a clickable candle flame that extinguishes when clicked, triggering a confetti explosion!
- **`BalloonWishes.tsx`:** Displays balloons that float upwards. Users can click to "pop" them, revealing hidden messages and quotes.
- **`FinalSurprise.tsx`:** The closing sequence. A final "gift" button that unleashes fireflies and confetti, wrapping up the cinematic journey.

### 3. `src/store` & `src/data`
- **`useBirthdayStore.ts`:** A Zustand store that utilizes the `persist` middleware. This saves the custom generated experience into the browser's `localStorage` so it doesn't get lost on refresh.
- **`mockData.ts`:** Contains beautifully formatted placeholder data to power the "Priya 2026" demo experience.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd birthday-experience
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App Locally
Start the development server:
```bash
npm run dev
```
Then, open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands
- `npm run dev` - Starts the development server with Hot-Module Replacement.
- `npm run build` - Builds the application for production deployment.
- `npm start` - Starts the built production server.
- `npm run lint` - Runs ESLint to catch syntax and style issues.

## 🚢 Deployment
This project is fully optimized for deployment on **Vercel** or **Netlify**. 
1. Push your code to a GitHub repository.
2. Log into Vercel or Netlify.
3. Import your repository and click "Deploy". 
Because there is no heavy backend required, the build will complete in minutes!

---
*Made for creating unforgettable digital memories.*
