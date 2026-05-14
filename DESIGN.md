---
name: System Overflow
description: A gamified course catalog for ML System Design and Data Engineering
colors:
  void-bg: "#0d0f14"
  screen-surface: "#161922"
  surface-hover: "#1f2335"
  surface-elevated: "#1c2030"
  scanline-border: "#2a2f45"
  scanline-border-hover: "#3d4470"
  screen-text: "#e0e4ec"
  dim-text: "#9aa3b8"
  bright-text: "#f0f4fc"
  power-up-blue: "#60a5fa"
  power-up-blue-hover: "#93c5fd"
  rare-purple: "#a78bfa"
  hp-green: "#34d399"
  coin-yellow: "#fbbf24"
  progress-track: "rgba(255,255,255,0.06)"
  surface-glass: "rgba(13,15,20,0.65)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans Variable, Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif"
    fontSize: "clamp(1.6rem, 4vw, 2.8rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: normal
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
  label:
    fontFamily: "Press Start 2P, monospace"
    fontSize: "0.65rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.03em"
rounded:
  xs: "4px"
  sm: "6px"
  default: "10px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  card:
    backgroundColor: "{colors.screen-surface}"
    textColor: "{colors.screen-text}"
    rounded: "{rounded.xs}"
    border: "3px solid {colors.scanline-border}"
  card-hover:
    backgroundColor: "{colors.surface-hover}"
    rounded: "{rounded.xs}"
    border: "3px solid {colors.scanline-border-hover}"
  card-category:
    padding: "{spacing.lg}"
  card-subsection:
    padding: "20px 24px"
  card-article:
    padding: "14px 20px"
  button-secondary:
    backgroundColor: "{colors.screen-surface}"
    textColor: "{colors.power-up-blue}"
    rounded: "{rounded.xs}"
    padding: "10px 20px"
    border: "2px solid {colors.scanline-border}"
  button-secondary-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.power-up-blue-hover}"
    rounded: "{rounded.xs}"
    border: "2px solid {colors.power-up-blue}"
  input:
    backgroundColor: "{colors.screen-surface}"
    textColor: "{colors.screen-text}"
    rounded: "{rounded.sm}"
    padding: "9px 14px 9px 36px"
  nav-back:
    textColor: "{colors.power-up-blue}"
    rounded: "999px"
  badge-order:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "{colors.dim-text}"
    rounded: "{rounded.sm}"
    size: "24px"
  badge-xp:
    textColor: "{colors.coin-yellow}"
    rounded: "{rounded.sm}"
---

# Design System: System Overflow

## 1. Overview

**Creative North Star: "The Retro Console"**

System Overflow is a CRT-lit game console for self-guided learning. Every surface evokes the feel of a booting system: a dark void of deepest navy-black, layered panels that catch faint inner highlights like glass over an old monitor, and accent colors that glow with the energy of player stats — Power-Up Blue for interactivity, Rare Purple for world-level navigation, HP Green for category progress, Coin Yellow for quest rewards. The screen is never flat or dead; it hums with subtle life.

This system explicitly rejects SaaS-dashboard sterility, corporate blues, glassmorphism as default, and the hero-metric template. It is not a tool; it is a console you sit down at. The retro-futurism comes not from pixel art or chunky borders but from the *feel*: dark depths, glowing accents, tactile hover states, and the occasional pixel-font badge that snaps you into game mode.

**Key Characteristics:**

- **Console-dark.** The palette lives in the deep end: backgrounds at #0d0f14, surfaces climbing through subtle brightness steps. No true black, no true white.
- **Glow as hierarchy.** Purple, green, and gold glows signal your depth in the content tree (world > level > quest). The accent tells you what you can interact with.
- **Tactile response.** Cards lift 3px on hover. Borders shift from muted scanline-gray to the level's glow color. Shadows deepen. Everything responds.
- **Occasional pixel.** Press Start 2P is reserved for HUD metadata (level number, XP count, order badges) — the machine's internal readout. Never for body text.
- **3px borders.** The card language is deliberately chunky. Not subtle 1px strokes; tangible borders that separate surfaces with intention.

## 2. Colors: The Console Palette

A restrained but luminous dark palette. The background is a near-black navy at 96% chroma compression. Surfaces step up through subtle brightness deltas (from #0d0f14 to #161922 to #1f2335). Hierarchy accents pull hue, saturation, and glow intensity from the content tree depth.

### Primary

- **Power-Up Blue** (#60a5fa | oklch(68% 0.12 250)): The interactive accent. Used for links, back buttons, search focus rings, player HUD level number, and hover borders on world-level cards. On hover, shifts to Power-Up Blue Hover (#93c5fd). Capped at ~10% of any screen surface by surface area.

### Secondary

- **Rare Purple** (#a78bfa | oklch(67% 0.16 280)): World-level (course) hierarchy color. Appears in category card hover glows, page-header accent bars on course pages, and the `.page-level--course` modifier glow. It marks the top of the content tree.

### Tertiary

- **HP Green** (#34d399 | oklch(75% 0.15 165)): Level-level (category) hierarchy color. Used for XP fill bars, category card hover glows, lesson-read badges, and the player HUD XP count. Suggests progress, health, growth.
- **Coin Yellow** (#fbbf24 | oklch(82% 0.16 85)): Quest-level (subsection) hierarchy color. Used for subsection card hover glows, XP badge labels, lesson-back-link borders, and lesson-nav hover borders. The reward color.

### Neutral

- **Void BG** (#0d0f14 | oklch(10% 0.008 270)): The deepest surface. Page background and base layer. Never pure black.
- **Screen Surface** (#161922 | oklch(14% 0.01 270)): Default surface for cards, inputs, buttons, and the app header. The primary container color.
- **Surface Hover** (#1f2335 | oklch(18% 0.015 270)): Lifted state for hovered cards and elevated surfaces. The `:hover` background.
- **Surface Elevated** (#1c2030 | oklch(16% 0.012 270)): Used for floating panels — the search dropdown sits on this surface.
- **Scanline Border** (#2a2f45 | oklch(23% 0.02 270)): Default border for all containers. 3px on cards, 2px on buttons and nav links.
- **Scanline Border Hover** (#3d4470 | oklch(30% 0.04 270)): Hover state for card borders. Brighter and more saturated.
- **Screen Text** (#e0e4ec | oklch(88% 0.008 270)): Primary body text. High contrast on Void BG and Screen Surface.
- **Dim Text** (#9aa3b8 | oklch(68% 0.015 270)): Muted secondary text for metadata, subtitles, and category counts.
- **Bright Text** (#f0f4fc | oklch(95% 0.005 270)): Heading text. The brightest value on the neutral scale.

### Named Rules

**The Glow-as-Hierarchy Rule.** Purple, green, and gold are not decoration. They encode your position in the content tree. A card glowing purple means "you're at the world level." Gold means "this is a quest within a level." Never apply a hierarchy glow outside its tree depth.

**The Rarity Rule.** Power-Up Blue is the only interactive accent. Hierarchy colors (purple, green, gold) signal *where you are*, not *what you can click*. A link inside a gold-glowing zone still uses Power-Up Blue for its link color.

## 3. Typography

**Display Font:** Plus Jakarta Sans Variable (with system sans-serif fallback)
**Body Font:** System font stack (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, etc.)
**Label/Mono Font:** Press Start 2P (monospace)

**Character:** A refined binary. Plus Jakarta Sans provides a clean, modern voice with subtle personality in its apertures and curves. It carries all navigation, reading, and structure. Press Start 2P is the machine readout — tight, uppercase, pixel-perfect — reserved exclusively for UI chrome that mimics game HUD elements. The contrast between these two voices (modern humanist vs. retro machine) is the defining tension of the system.

### Hierarchy

- **Display** (800, clamp(1.6rem, 4vw, 2.8rem), 1.15): Hero page headings on the world select screen. Single-use; only one display heading per page.
- **Headline** (700, 2rem, 1.2): Page header titles on course, category, and quest pages. The `h1` for interior pages.
- **Title** (600, 1.1rem, 1.3): Card and section headings (`h2` on category cards, subsection cards).
- **Body** (400, 0.95rem, 1.5): All reading text, lesson content, page descriptions. Cap line length at 65–75ch.
- **Label** (400, 0.65rem, 1.2, 0.03em letter-spacing): Pixel-font labels — player rank title, level number, XP count. Set in Press Start 2P. Tight and uppercase by font nature.

### Named Rules

**The Pixel-Restriction Rule.** Press Start 2P is only for HUD-like readouts: player rank, level number, XP count, order badges, and page-header hierarchy badges. Never for body text, headings, navigation, or instructional copy. The font's low legibility at small sizes and uppercase-only feel make it a precision tool, not a general-purpose one.

**The One-H1 Rule.** Only one display or headline heading per page. The hierarchy is a path, not a menu.

## 4. Elevation

Depth is conveyed through two systems working together: tonal surface stacking and ambient glow. True CSS box-shadows exist but play a supporting role — the primary depth signal comes from surfaces getting brighter as they get closer to the user.

The CRT Layered Glow model: the Void BG (#0d0f14) is the deepest layer. Screen Surface (#161922) sits one step above. Surface Hover (#1f2335) and Surface Elevated (#1c2030) sit above that. Each step is a ~4% lightness increase. The effect is like looking through stacked panes of glass on a CRT monitor — each layer faintly illuminated from within.

Every surface gets a subtle inner highlight via `::after` pseudo-element: a linear gradient from 1% white at top to transparent. This gives the "CRT screen" feel — a faint phosphor glow across the top edge of every panel.

### Shadow Vocabulary

- **Card Shadow** (`inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)`): Resting state for all cards, nav links, and secondary buttons. The inset highlight is the CRT glow; the drop shadows provide ambient depth.
- **Card Shadow Hover** (`inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px var(--color-border-hover)`): Lifted state. The highlight brightens slightly, the drop shadow spreads and deepens, and a 1px border outline sharpens the edge.
- **Hierarchy Hover Glow** (adds `0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px var(--border-glow-{hierarchy}), 0 0 32px var(--glow-{hierarchy})`): On hover, cards at each hierarchy level gain a colored ambient glow ring plus a 1px accent border outline. Purple for course-level, green for category-level, gold for subsection-level cards.
- **Dropdown Shadow** (`0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px var(--color-border)`): The search dropdown. Deepest shadow in the system; floats above all other surfaces.
- **Lesson Card Shadow** (`0 4px 32px rgba(0,0,0,0.3)`): The reading pane — deep and wide but soft. No inner highlight; the surface itself (Surface Hover) provides the elevation signal.

### Named Rules

**The Lift-on-Hover Rule.** Every interactive surface gains elevation on hover — never on click or focus alone. The hover lift is 3px translateY on category cards, deeper shadows on all cards, and brighter borders throughout. Resting surfaces are flat; only interaction triggers depth.

**The No-Stacked-Surface Rule.** Never nest a card inside a card. Tonal layering happens across distinct UI elements (sidebar, main content, floating dropdown), never as parent-child containment.

## 5. Components

### Cards

The fundamental container. A 3px chunky border anchors everything to the retro-arcade feel. The base `.card` has Screen Surface background, Scanline Border, 4px radius, and the Card Shadow with its characteristic inset highlight.

- **Shape:** Chunky straight corners (4px radius).
- **Background:** Screen Surface (#161922) at rest, Surface Hover (#1f2335) on hover.
- **Border:** 3px solid Scanline Border (#2a2f45) at rest, shifting to border glow + hierarchy color on hover.
- **Inner Highlight:** Every card has a `::after` pseudo-element with a subtle white-to-transparent linear gradient (180deg, 1% white at top). This gives the CRT phosphor glow.
- **Hover Behavior:** 3px translateY lift on category cards. Border shifts to hierarchy glow color. Shadow deepens to Card Shadow Hover plus hierarchy ambient glow ring.
- **Variants:**
  - `.card--category` (world level): 24px padding, hovers with Rare Purple glow.
  - `.card--subsection` (level): 20px 24px padding, hovers with Coin Yellow glow.
  - `.card--article` (quest): 14px 20px padding, hovers with Coin Yellow glow. Contains an order badge (pixel font) and XP badge.
  - `.card--article--read` (completed): Dimmed — 60% opacity background, muted text, muted XP badge.

### Buttons

No primary "call to action" button — the system is content-first, not action-first. Buttons are secondary/ghost style.

- **Shape:** 4px radius, 2px border.
- **Default:** Screen Surface background, Power-Up Blue text, Scanline Border.
- **Hover:** Surface Hover background, Power-Up Blue Hover border and text. Shadow deepens to the hover pattern.
- **Padding:** 10px 20px (lesson source button).
- **Full-width variants:** The lesson source button spans full width with centered text and icon.

### Inputs

Only one input: the search field.

- **Shape:** 6px radius, no distinct border (the container provides it).
- **Background:** Screen Surface (#161922).
- **Text:** Screen Text (#e0e4ec), 0.88rem.
- **Padding:** 9px 14px 9px 36px (left padding accounts for the search icon).
- **Focus:** 3px Power-Up Blue glow ring (`0 0 0 3px var(--accent-glow)`).
- **Dropdown:** Slides beneath the input — Surface Elevated background (#1c2030), Dropdown Shadow, 6px radius, with result items at 10px 14px padding.

### Badges / Chips

Small metadata indicators in Press Start 2P pixel font. Read-only; not interactive.

- **Order Badge** (`.article-order`): 24x24px square, 6px radius, dark background (`rgba(255,255,255,0.04)`) with 1px Scanline Border. Shows the lesson number in the quest sequence. On card hover, the badge takes the hierarchy tint and border glow.
- **XP Badge** (`.article-xp-badge`): Inline text in Coin Yellow pixel font. Shows "+N XP". Muted at 50% opacity with Dim Text color when the lesson is read.
- **Hierarchy Badge** (`.page-header__badge`): Page-level indicator ("LEVEL" / "QUEST" / "OBJECTIVE"). Pixel font, 0.65rem. The badge's parent page modifier drives its border glow.
- **Lesson Read Badge** (`.lesson-read-badge`): A floating capsule (999px radius) fixed to the bottom-right of the lesson page. HP Green text and border on a tinted background with backdrop-filter blur. Appears after scroll-tracking marks the lesson read.

### Navigation

- **Breadcrumbs:** Inline list with arrow separators. Display font at 0.9rem. Current page is Screen Text; ancestors are Dim Text with Power-Up Blue hover.
- **Lesson Nav:** Two-column grid at the bottom of each lesson page. Each link is a bordered panel (2px, 4px radius) with an order badge and title. Hover lifts border to Coin Yellow with glow. Flex alignment flips for prev vs. next (left vs. right aligned).
- **Back Link** (`.back-link`): Inline Power-Up Blue link below page titles. Display font, 0.9rem, with `←` prefix.
- **Lesson Back Link** (`.lesson-back-link`): Fixed-position pill (999px radius) at top-left of the lesson page. Surface Glass background with backdrop-filter blur, Coin Yellow border and text. Hover deepens the shadow and brightens the border.

### Player HUD

The signature component — lives in the top app header.

- **Layout:** Flex row with 10px gap, min-width 250px.
- **Avatar:** 45px circle, dark background. Contains a 36px pixel-art SVG (`image-rendering: pixelated`, `brightness(1.2)`) selected by level tier. Border and glow are driven by level thresholds (6 tiers from "no glow" to "level 20 gold + dual-layer glow").
- **Info Column:** Three rows: player rank title (Press Start 2P, 0.7rem, Bright Text), XP progress bar, and stats row (level number + XP count).
- **XP Progress Bar:** 5px tall track with 1px border inside a 4px radius track. The fill is HP Green with 0.5s ease width transition.
- **Level Label:** Press Start 2P, 0.6rem, Power-Up Blue.
- **XP Count Label:** Press Start 2P, 0.6rem, HP Green.
- **Level-Up Animation:** On level transition, the avatar pulses (scale 1→1.06→1), the title flashes Power-Up Blue, and the level number scales up and flashes Coin Yellow — all 0.6s ease-out. No layout animation; only transform and color.

## 6. Do's and Don'ts

### Do:

- **Do** use the 3px card border. It's the signature structural element of the system — chunky, retro, intentional.
- **Do** tint every neutral toward the navy-blue hue (oklch hue ~270). Even "white" text (#e0e4ec) carries a faint blue cast.
- **Do** reserve Press Start 2P for HUD metadata only — level numbers, XP counts, order badges, hierarchy badges.
- **Do** apply hierarchy glows (purple → green → gold) by tree depth. This is how the user navigates without thinking.
- **Do** use the CRT inner highlight (`::after` with 1% white gradient) on every elevated surface.
- **Do** let cards lift 3px on hover. Physical feedback rewards exploration.
- **Do** keep Power-Up Blue as the sole interactive accent. Hierarchy colors are positional, not action-oriented.

### Don't:

- **Don't** use true black (#000) or true white (#fff). Every neutral is tinted toward the 270-degree hue at low chroma.
- **Don't** use glassmorphism (backdrop-filter blur) as a default surface treatment. The only exceptions are the two fixed-position pills on lesson pages. Every other surface is solid.
- **Don't** nest cards. Tonal layering happens across distinct elements, never as parent-child containment.
- **Don't** replace Power-Up Blue with a hierarchy color for interactive elements. A link inside a gold-glowing subsection card is still Power-Up Blue.
- **Don't** apply the hero-metric template (big number, small label, gradient accent). XP and levels are displayed as HUD readouts, not as marketing metrics.
- **Don't** use gradient text (`background-clip: text`). Emphasis comes from weight and size, not decoration.
- **Don't** use border-left or border-right greater than 1px as a colored accent stripe. The 3px border is full, not one-sided.
- **Don't** add bounce or elastic easings. Transitions use 0.2s ease or 0.4s cubic-bezier(0.4, 0, 0.2, 1) — the latter is the standard ease-out curve for progress bars and extended transitions.
- **Don't** animate `width`, `height`, `top`, `left`, or `margin`. Animatable properties are `opacity`, `transform`, `border-color`, `background`, `box-shadow`, and `color`.

