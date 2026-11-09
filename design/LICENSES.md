# Direction A "Night Shift": adopted components and fonts

## Components

| Component | File | Source URL | Licence (verbatim name) | Attribution required | Date |
|---|---|---|---|---|---|
| Threads (React Bits, JS + Tailwind variant, self-contained WebGL2, no ogl) | src/components/fx/Threads.jsx | https://github.com/DavidHDev/react-bits/blob/main/src/tailwind/Backgrounds/Threads/Threads.jsx | MIT + Commons Clause License Condition v1.0 | no (copyright notice kept in source header) | 2026-11-09 |
| DecryptedText (React Bits, JS + Tailwind variant) | src/components/fx/DecryptedText.jsx | https://github.com/DavidHDev/react-bits/blob/main/src/tailwind/TextAnimations/DecryptedText/DecryptedText.jsx | MIT + Commons Clause License Condition v1.0 | no | 2026-11-09 |
| NumberTicker (Magic UI; TypeScript stripped, cn() and direction/startValue/decimalPlaces removed, spring tuned, reduced-motion shows final value) | src/components/fx/NumberTicker.jsx | https://magicui.design/r/number-ticker.json | MIT License | no (licence text kept at https://github.com/magicuidesign/magicui) | 2026-11-09 |
| CardSpotlight (Aceternity UI; only the pointer-following mask kept, CanvasRevealEffect left out because it needs three) | src/components/fx/CardSpotlight.jsx | https://ui.aceternity.com/registry/card-spotlight.json | Aceternity License (https://ui.aceternity.com/licence) | no | 2026-11-09 |

React Bits licence: components may be used in an application, website or product; they may not be sold, sublicensed or redistributed as components. This site is a personal portfolio and does not redistribute them.

## Fonts (all SIL Open Font License 1.1, delivered through @fontsource)

| Package | Version | Use | Licence |
|---|---|---|---|
| @fontsource/bricolage-grotesque | 5.3.0 | display (weights 600, 700) | SIL OFL 1.1 |
| @fontsource/manrope | 5.3.0 | body (weights 400, 500, 600) | SIL OFL 1.1 |
| @fontsource/jetbrains-mono | 5.3.0 | mono (weights 400, 500), already installed | SIL OFL 1.1 |

## npm packages added

| Package | Licence |
|---|---|
| @fontsource/bricolage-grotesque | OFL-1.1 |
| @fontsource/manrope | OFL-1.1 |

No other package was added (no ogl, three, gsap, clsx or tailwind-merge).
