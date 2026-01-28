# Random Idea Generator - Design System

## Overview
"Neon Idea Arcade" - A dark-themed, retro-futuristic web application with cyberpunk aesthetics featuring purple/pink neon gradients and arcade-style interactions.

## Color Palette

### Primary Colors
```css
--primary: #a855f7          /* Purple - Main brand color */
--accent-pink: #f472b6      /* Pink - Accent highlights */
--background-dark: #09090b  /* Deep black background */
--card-dark: #1a1023        /* Dark purple card background */
```

### Secondary Colors
```css
--slate-900: #0f172a        /* Dark text */
--slate-700: #334155        /* Border inactive */
--slate-500: #64748b        /* Muted text */
--slate-400: #94a3b8        /* Secondary text */
--slate-200: #e2e8f0        /* Light text */
--white: #ffffff            /* Primary text on dark */
```

### Category Colors
```css
--writing: #a855f7          /* Purple */
--drawing: #06b6d4          /* Cyan */
--business: #fb923c         /* Orange */
--coding: #ec4899           /* Pink */
```

## Typography

### Font Family
```css
font-family: 'Space Grotesk', sans-serif;
```
- **Primary Font**: Space Grotesk (weights: 300, 400, 500, 600, 700)
- **Style**: Modern, geometric, tech-inspired
- **Source**: Google Fonts

### Text Styles
- **Headings**: Bold (700), uppercase, wide tracking
- **Body**: Medium (500), regular tracking
- **Labels**: Bold (700), uppercase, extra-wide tracking (0.3em - 0.4em)
- **Small Text**: 10px-12px, bold, uppercase

## Visual Effects

### Neon Glow
```css
.neon-glow {
    text-shadow:
        0 0 10px rgba(168, 85, 247, 0.8),
        0 0 20px rgba(168, 85, 247, 0.5);
}
```

### Neon Border
```css
.neon-border {
    box-shadow:
        0 0 15px rgba(168, 85, 247, 0.4),
        inset 0 0 5px rgba(168, 85, 247, 0.2);
}
```

### Flicker Animation
```css
@keyframes flicker {
    0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
    20%, 24%, 55% { opacity: 0.8; }
}
```

### Scanlines (Retro CRT Effect)
```css
.scanlines {
    background:
        linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
        linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    background-size: 100% 4px, 3px 100%;
}
```

## Components

### 1. Header
- Sticky navigation with backdrop blur
- Logo with neon glow
- Navigation links (hover: primary color)
- Profile avatar with primary border

### 2. Category Pills
**Active State:**
- Background: `bg-primary/20`
- Border: `border-primary` (2px)
- Text: White, bold, uppercase
- Effect: Neon border glow
- Scale on hover: 105%

**Inactive State:**
- Border: `border-slate-700` (2px)
- Text: `text-slate-400`
- Hover: `border-accent-pink/50`, `text-accent-pink`

### 3. Central Idea Card
**Container:**
- Max width: 4xl (56rem)
- Background gradient blur effect
- Black background with slate-800 border (4px)
- Min height: 300px
- Rounded: xl (1.5rem)
- Shadow: 2xl

**Content:**
- Scanlines overlay (opacity: 30%)
- Label: Primary color, uppercase, extra-wide tracking, flicker
- Main text: 3xl-5xl, white, neon glow, flicker
- Action buttons: White/10 background, hover White/20

**Effects:**
- Gradient background pulse on hover
- Scanlines for retro CRT feel
- Neon glow on text
- Flicker animation

### 4. Generate Button
**Design:**
- Shape: Circle (h-32 w-32)
- Background: Primary with heavy neon shadow
- Icon: Bolt symbol (text-4xl)
- Border: Dashed white/20 border (inner circle)

**States:**
- Default: Shadow `0 0 50px rgba(168,85,247,0.6)`
- Hover: Scale 105%
- Active: Scale 90%, inner shadow

### 5. Saved Ideas Cards
**Layout:**
- Grid: 1 col mobile, 2 cols tablet, 4 cols desktop
- Gap: 6 (1.5rem)

**Card Design:**
- Background: `bg-card-dark`
- Border: `border-slate-800`, hover: `border-primary/50`
- Padding: 5 (1.25rem)
- Rounded: lg

**Content:**
- Category label: 10px, bold, uppercase, category color
- Idea text: Small (14px), medium weight, slate-200
- Timestamp: 10px, uppercase, bold, slate-500
- Actions: Delete (hover visible), Copy icon

## Layout Structure

```
┌─────────────────────────────────────┐
│          Header (Sticky)             │
├─────────────────────────────────────┤
│                                      │
│     [Writing] [Drawing] [Business]  │
│              [Coding]                │
│                                      │
│    ┌──────────────────────────┐     │
│    │                          │     │
│    │    Central Idea Card     │     │
│    │    (with scanlines)      │     │
│    │                          │     │
│    └──────────────────────────┘     │
│                                      │
│            ┌───────┐                 │
│            │  ⚡   │                 │
│            │GENER- │                 │
│            │ ATE   │                 │
│            └───────┘                 │
│                                      │
├──────────────────────────────────────┤
│          THE VAULT                   │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐    │
│  │Card│  │Card│  │Card│  │Card│    │
│  └────┘  └────┘  └────┘  └────┘    │
└──────────────────────────────────────┘
```

## Spacing Scale
- Extra small: 2-3 (0.5rem - 0.75rem)
- Small: 4-6 (1rem - 1.5rem)
- Medium: 8-12 (2rem - 3rem)
- Large: 16-24 (4rem - 6rem)

## Border Radius
- Default: 0.5rem
- Large: 1rem
- Extra large: 1.5rem
- Full: 9999px (pills, circles)

## Transitions
- Duration: 200-300ms (quick), 1000ms (gradients)
- Timing: ease-in-out (default)
- Properties: colors, transform, opacity, border-color

## Responsive Breakpoints
- Mobile: < 768px (md)
- Tablet: 768px - 1024px
- Desktop: > 1024px (lg)

## Icons
- Library: Material Symbols Outlined
- Weight: 100-700
- Fill: 0-1
- Common icons: videogame_asset, bolt, bookmark, share, content_copy, delete

## Design Principles
1. **Arcade Aesthetic**: Retro gaming vibes with modern polish
2. **Neon Emphasis**: Purple/pink glows on interactive elements
3. **High Contrast**: Dark backgrounds with bright accents
4. **Tactile Feedback**: Scales, shadows, and color shifts on interaction
5. **Scanline Nostalgia**: CRT-style effects for authenticity
6. **Uppercase Energy**: Bold, wide-tracked text for impact
7. **Smooth Animations**: Everything feels responsive and alive

## Accessibility Notes
- High contrast ratios (white on dark backgrounds)
- Clear focus states needed for keyboard navigation
- Icon buttons should have aria-labels
- Flicker animation may need prefers-reduced-motion consideration

## Implementation Notes
- Built with Tailwind CSS v3+ (CDN)
- Vanilla JavaScript (no framework dependencies)
- Mobile-first responsive design
- LocalStorage for persistence
- No build process required
