---
name: System Overflow
description: A self-guided course catalog and lesson browser for ML System Design and Data Engineering
colors:
  bg: "#0d0f14"
  surface: "#161922"
  surface-hover: "#1f2335"
  surface-elevated: "#1c2030"
  border: "#2a2f45"
  border-hover: "#3d4470"
  text: "#c8ced8"
  text-muted: "#7a8299"
  text-heading: "#e8ecf4"
  accent: "#60a5fa"
  accent-hover: "#93c5fd"
  level-course: "#a78bfa"
  level-category: "#34d399"
  level-section: "#fbbf24"
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.6
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    fontSize: "clamp(2rem, 5vw, 2.8rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    fontSize: "clamp(1.4rem, 3vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "10px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border}"
  card-hover:
    backgroundColor: "{colors.surface-hover}"
    borderColor: "{colors.border-hover}"
  search-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    border: "1px solid {colors.border}"
    padding: "9px 14px"
  filter-pill:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "999px"
    border: "1px solid {colors.border}"
    padding: "4px 10px"
  lesson-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "14px"
    padding: "40px 36px"
---

# Design System: System Overflow

## 1. Overview

**Creative North Star: "The Syllabus Notebook"**

Like a well-organized course binder that never loses your place. The interface is quietly structured — sections are tabbed, progress is marked, and every page answers "where am I and what's next?" without asking. Nothing is flashy because nothing needs to be: the content is the point, the navigation is the bookmark.

The system is friendly and calm, with soft edges, muted surfaces, and a dark backdrop that makes lesson text the brightest thing on screen. It explicitly rejects corporate sterility, sharp lines, and aggressive gradients. Every transition is smooth, every card has a gentle hover lift, and the atmosphere stays warm even in monochrome.

**Key Characteristics:**
- Dark-by-default with warm-tinted neutrals (no pure black or white)
- Layered depth through surface colors, not heavy shadows
- Progress indicators as primary navigation affordance (dots, badges, checkmarks)
- Refined and tactile interactions — subtle hover lifts, smooth transitions, gentle glow
- Readability-first: body text is the highest-contrast element on every page

## 2. Colors

The palette is restrained — tinted dark neutrals with a single blue accent used sparingly. Three hierarchy colors (purple, green, gold) mark the content level and carry progress state; they're decorative-recognizable, not attention-grabbing.

### Primary
- **Soft Blue Accent** (`#60a5fa`): Used for interactive elements — links, focus rings, search results, accent bars. Hover state shifts lighter (`#93c5fd`).

### Neutral
- **Deep Charcoal** (`#0d0f14`): Page background. The canvas.
- **Surface Dark** (`#161922`): Card and container backgrounds. Sits just above the page canvas.
- **Surface Hover** (`#1f2335`): Card hover state, subtle highlight.
- **Surface Elevated** (`#1c2030`): Dropdowns and floating overlays.
- **Border Muted** (`#2a2f45`): Default borders and dividers.
- **Border Hover** (`#3d4470`): Hover and focus border states.
- **Text Heading** (`#e8ecf4`): Page titles, card headings. Highest luminance.
- **Text Body** (`#c8ced8`): Paragraph and body copy. The primary reading color.
- **Text Muted** (`#7a8299`): Secondary information, breadcrumbs, metadata, placeholders.

### Hierarchy Indicators
- **Course Purple** (`#a78bfa`): Course-level navigation, progress dots, card icons.
- **Category Green** (`#34d399`): Category-level progress dots, section indicators.
- **Section Gold** (`#fbbf24`): Subsection-level progress dots, article checkmarks, lesson navigation accents.

### Named Rules
**The Variable-Only Rule.** Every color value in CSS must be referenced through a `var(--color-X)` custom property. No hardcoded hex or rgba values anywhere in component styles. The `@theme` block in `app.css` is the single source of truth.

**The Accent-Scarce Rule.** The blue accent occupies ≤5% of any given screen — links, focus rings, and the search result highlight. Its rarity is what makes it meaningful. Hierarchy colors (purple, green, gold) appear only as dots and small indicators.

## 3. Typography

**Display & Body Font:** System stack (SF Pro, Segoe UI, Roboto, etc.)
**Mono Font:** System monospace (SF Mono, Monaco, Cascadia Code, etc.)

**Character:** Unobtrusive and highly readable. The system stack loads instantly, respects platform preferences, and disappears into the background — exactly what a reading interface should do. No custom font file to download, no FOUT, no tradeoff between aesthetics and performance.

### Hierarchy
- **Display** (800, clamp(2rem, 5vw, 2.8rem), 1.15): Hero headings on the homepage. Rare — only the site name.
- **Headline** (700, clamp(1.4rem, 3vw, 2rem), 1.2, -0.02em): Page titles. One per page, with a left accent bar.
- **Title** (600, 1rem, 1.3): Card headings, section titles, lesson titles.
- **Body** (400, 0.92rem, 1.6): All paragraph and running text. Capped at ~70ch.
- **Label** (400, 0.8rem, 1.4): Metadata, progress counts, breadcrumbs, footer text.

### Named Rules
**The No-Numbers Rule.** Never use a font-weight below 400 for body text and below 600 for headings at scales ≤1rem. Thin or light weights sacrifice readability on dark backgrounds at small sizes.

## 4. Elevation

The system uses layered depth — surfaces distinguish themselves through background color, not shadow. Cards sit one step lighter than the page canvas. Shadows are subtle and ambient: a soft inner top highlight creates the impression of a gently raised surface without harsh drop shadows.

Hover states lift the card with a brighter inner highlight, a slightly stronger shadow, and a border color transition. The effect is tactile and refined, never floaty.

### Surface Stack (bottom to top)
- **Canvas** (bg `#0d0f14`): The page background. Never directly overlapped.
- **Surface** (`#161922`): Cards, containers, inputs. The default interaction layer.
- **Surface Elevated** (`#1c2030`): Dropdowns, floating overlays. Same border but higher background.
- **Header** (bg `var(--surface-glass)` + blur): Sticky top bar. Glass layer that sits above scroll content.

### Shadow Palette
- **Card Rest** (`inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)`): Default card state. Subtle inner highlight + low drop shadow.
- **Card Hover** (`inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px var(--border-hover)`): Hovered card. Stronger highlight, deeper shadow, visible border.
- **Dropdown** (`0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px var(--border)`): Floating panels. Deep shadow for separation from all surfaces.

## 5. Components

### Cards
The foundational container for all list and grid content. Soft and approachable.

- **Corner Style:** Gently rounded (10px default, 14px for lesson card)
- **Background:** Surface dark (`#161922`) with inner top highlight for depth. Lesson card shares the same surface color.
- **Shadow Strategy:** Subtle at rest, lifted on hover with border brightening
- **Border:** 1px solid border color at rest; hover transitions to border-hover
- **Internal Padding:** 20–24px vertical, 24–32px horizontal
- **Hover:** Background shifts one step lighter, border brightens, card lifts 2–3px on category cards

Four variants:
- **Category card** (`.card--category`): Course-grid layout. Hover border turns purple (course level), lifts 3px.
- **Subsection card** (`.card--subsection`): Category-grid layout. Hover border turns green (category level).
- **Article card** (`.card--article`): Lesson list layout. Horizontal flex with order badge, title, checkmark. Hover border turns gold (section level). Read state dims to 40% opacity.
- **Hero course card** (`.hero-course-card`): Homepage card linking to a course. Hover border turns blue accent, icon and arrow brighten.

### Buttons & Pills

- **Shape:** Fully rounded for pills (999px), standard radius (10px) for full-width buttons
- **Filter Pill / Reset Button:** Transparent background, muted text, border-only at rest. On hover, text picks up accent or hierarchy color, border brightens.
- **CTA Button (lesson source):** Full-width, surface background, accent-colored text, border outline. Hover activates border and background.

### Search Input
- **Style:** Surface background, 1px border, left-icon (magnifier), right-side keyboard shortcut hint
- **Focus:** Blue accent border + 3px glow ring (`box-shadow: 0 0 0 3px var(--accent-glow)`)
- **Dropdown:** Elevated surface background, top-6px offset, deep shadow. Results highlight on hover with accent-tinted background.

### Navigation
- **Header:** Sticky top bar, glass background (75% opacity bg + 12px blur), bottom border 1px. Auto-hides on scroll-down, reveals on scroll-up. Logo left, search right.
- **Breadcrumbs:** Inline list with chevron separators (small SVG mask). Current page is muted text; ancestors are accent-colored links.
- **Lesson Nav:** Two-column grid (prev / next). Each link is a card with order badge and lesson title. Next link is right-aligned. Hover brightens the order badge to gold.

### Progress Indicators
- **Dots** (`.section-dots`, `.course-dots`): Inline `Circle` icons (8px). Filled = read, outline = unread. Color-coded by hierarchy level.
- **Order Badge** (`.article-order`): Small dark badge (24x24px, 6px radius) with the lesson number. On hover, fills with hierarchy color.
- **Checkmark** (`.article-read-checkmark`): Gold check icon on read articles.
- **Read Badge** (`.lesson-read-badge`): Fixed-position pill at bottom-right. Green with blur backdrop, appears when lesson is marked read.

## 6. Do's and Don'ts

### Do:
- **Do** use `var(--color-X)` for every color reference in component CSS. No exceptions.
- **Do** let body text be the brightest element on the page — it's what the user came for.
- **Do** keep the blue accent below 5% of any screen surface. Its rarity is its power.
- **Do** use hierarchy colors (purple, green, gold) only for progress indicators and level-specific hover borders.
- **Do** make cards feel tactile with the subtle inner highlight and hover lift.
- **Do** stagger list animations by ~40ms per item for a natural cascading reveal.
- **Do** use the system font stack — no custom font downloads, no FOUT, no tradeoffs.

### Don't:
- **Don't** hardcode any color value (hex, rgba, hsl) directly in component CSS. Always use the `@theme` variables.
- **Don't** use side-stripe borders (`border-left:` greater than 1px as a colored accent on cards or callouts).
- **Don't** use gradient text (`background-clip: text` with gradients).
- **Don't** use glassmorphism as a default pattern (the header blur is the single exception).
- **Don't** follow the hero-metric template (big number, small label, gradient accent — SaaS cliche).
- **Don't** create identical card grids with icon + heading + text repeated endlessly.
- **Don't** use modal dialogs as a first resort — exhaust inline and progressive alternatives first.
- **Don't** use em dashes in any copy. Use commas, colons, semicolons, or periods.
- **Don't** use corporate, sharp, or sterile aesthetics. No aggressive gradients, no jarring lines.
- **Don't** use font-weight below 400 for body text and below 600 for small headings (<1rem) on dark backgrounds.
