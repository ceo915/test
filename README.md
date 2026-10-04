# Chimu — clickable prototype

Mobile prototype for user testing. Mock data only: no backend, no AI, no login.

```bash
npm install
npm run dev      # http://localhost:5173 (390px phone; centered phone frame on desktop)
npm run build    # type-check + production build
```

- **All content** (names, dates, amounts, scripted replies, memory items) lives in `src/data/mock.ts`.
- **Design tokens** (colors, radii, shadows, type scale, motion) live in `tailwind.config.ts`; brand colors in `src/theme.ts`.
- **Mascot**: `src/components/Mascot.tsx`, `<Mascot expression="happy" />` with 9 expressions.
- Brand board expected at `design/chimu-board.png` (not present when this was built).
