# Scroll Car Hero Animation

A scroll-driven hero section that matches the reference car-scroll interaction. The hero is pinned, the car drives across the track, the green trail reveals behind it, and each headline letter fades in once the car reaches it.

## Features

- Pinned hero section with scrubbed ScrollTrigger.
- Car travel across the road with trailing green reveal.
- Headline letters reveal based on the car position.
- Stat cards positioned and timed like the reference.

## Tech Stack

- React.js
- TailwindCSS
- GSAP + ScrollTrigger
- Vite

## Project Structure

```
src
├ components
│  ├ HeroSection.jsx
│  └ Stats.jsx
├ styles
│  ├ globals.css
│  └ hero.css
├ assets
│  └ car.png
├ App.jsx
└ main.jsx
```

## Getting Started

1. Install dependencies

```
npm install
```

2. Run the dev server

```
npm run dev
```

3. Build for production

```
npm run build
```

## Notes

- The hero car image lives at `src/assets/car.png`.
- Replace the PNG with your own top-view car image if you want a perfect visual match.
- GSAP timelines live in `src/components/HeroSection.jsx` and are cleaned up with `gsap.context`.

## Deployment

Deploy the `dist` folder to GitHub Pages or Vercel after running `npm run build`.
# car-scroll-animation
