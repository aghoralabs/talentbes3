# Talentbes (v3)

Public website for Talentbes HR Consultants, rebuilt with a calm, editorial look inspired by arva.com:
a bone canvas, forest-green bands, pastel cards, pill buttons, a serif (Newsreader) for headlines and Inter for body copy.

All copy comes from the previous site (`talentbes2`). Service text, FAQs and stats are in `lib/content.ts`.

## Run

```bash
npm install
npm run dev
```

Jobs and blog posts load from the talentbes-api backend (`TALENTBES_API_URL`, default `http://localhost:8080`).
Without the API, those pages show their empty states.

## Motion

Smooth scrolling (Lenis) and scroll reveals (GSAP ScrollTrigger + SplitText) live in
`components/ScrollFx.tsx`. Elements opt in with `data-fx`: `lines`, `up`, `small`, `stagger`,
`parallax`, `hero`, `count`. Everything is skipped when the visitor prefers reduced motion.

## Videos

- `public/videos/hero.mp4` (1080p) and `hero-960.mp4` (mobile): a 14.5s crossfaded montage of three
  Pexels clips, all free under the Pexels license:
  3255228 (team at a table, moving camera), 6534116 (collaboration by a plant wall),
  5977050 (low-angle tracking walk).
  https://www.pexels.com/video/3255228/ · https://www.pexels.com/video/6534116/ · https://www.pexels.com/video/5977050/
- `public/videos/story/*`: the three clips from the previous site, used in cards further down the home page.
