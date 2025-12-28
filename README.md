# Football Logo Reveal Ceremony

A cinematic reveal experience for the Jorethang JFA football tournament website.

## 🎯 Objective

Create a ceremonial, premium reveal sequence featuring:

- 3D-like logo animation for Jorethang JFA
- Smooth transition to official fixture display
- Formal, powerful presentation suitable for national sports events

## 🧱 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** - Primary animation engine
- **GSAP** - Timeline sequencing and shine effects

## 🎬 Animation Sequence

### Phase 1: Logo Reveal

- Dark screen with soft spotlight fade-in
- Logo rotates slightly on Y-axis with scale animation (0.85 → 1)
- Metallic gold shine sweep across logo
- Ceremonial pause for emphasis (1-1.5s)

### Phase 2: Fixture Reveal

- Logo transitions out smoothly
- Fixture slides in from bottom with scale animation
- Stadium lighting ambience
- Premium presentation with vignette effects

## 📱 Responsive Design

- **Desktop**: Full cinematic experience
- **Mobile**: Optimized animations, reduced effects for performance

## 🚀 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## 📦 Component Architecture

```
components/
├── CeremonyWrapper.tsx    # Main timeline controller
├── LogoReveal.tsx         # Logo animation component
└── FixtureReveal.tsx      # Fixture display component
```

## 🎨 Design Notes

- Maintains official Jorethang JFA branding colors (navy blue, gold, white)
- No gradients except metallic shine effects
- GPU-friendly animations for smooth performance
- Professional, formal aesthetic for government-level sports events

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
