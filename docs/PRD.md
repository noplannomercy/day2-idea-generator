## PRD.md (아티팩트)

# Random Idea Generator - Product Requirements Document

## Project Overview

**Name:** Random Idea Generator  
**Type:** Single Page Application  
**Target:** Creators needing inspiration  
**Timeline:** Day 2 (30-40 minutes)

---

## WHAT (Tech Stack)

**Frontend:**
- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript (ES6+)

**Storage:**
- LocalStorage API

**Structure:**
- Single HTML file
- Modular JS (app.js, ideas.js, storage.js)
- No build tools
- No external dependencies

---

## WHY (Purpose & Goals)

**Primary Goal:**  
Generate random creative prompts to fight creative block

**Target Users:**
- Writers needing story ideas
- Artists seeking drawing subjects
- Entrepreneurs brainstorming
- Developers practicing coding

**Key Differentiators:**
- Multiple categories
- Save favorites
- Share-friendly format
- Instant inspiration

---

## HOW (Features & Requirements)

### 1. Idea Categories

**Writing Prompts:**
- Story starters
- Character ideas
- Plot twists
- Genre mixes

**Drawing Ideas:**
- Subject combinations
- Style challenges
- Color palettes
- Composition themes

**Business Ideas:**
- Problem-solution pairs
- Target market + product
- Niche combinations
- Business models

**Coding Challenges:**
- Algorithm problems
- Project ideas
- Tech stack combinations
- Feature implementations

**Each category: 20+ unique prompts**

### 2. User Interface

**Layout Structure:**
```
[Header: Idea Generator]

[Category Selection]
[Writing] [Drawing] [Business] [Coding]

[Generation Area]
┌─────────────────────────────┐
│                             │
│   [Generated Idea Here]     │
│                             │
└─────────────────────────────┘

[Generate Button] [Save to Favorites]

[Favorites Section]
• Saved idea 1 [X]
• Saved idea 2 [X]
• Saved idea 3 [X]
```

**UI Requirements:**
- One-click generation
- Clear category indication
- Large readable text
- Mobile-friendly
- Smooth transitions

### 3. Generation Logic

**Random Selection:**
- Select from predefined arrays
- No repeats until all shown
- Category-specific pools
- Shuffle algorithm

**Display:**
- Fade-in animation
- Large, centered text
- Category badge
- Copy-to-clipboard button

### 4. Additional Features

**A. Favorites System**
- Save generated ideas
- Persist in LocalStorage
- Display as list
- Remove from favorites
- Max 20 saved ideas
- Export as text

**B. Share Functionality**
- Copy to clipboard
- Share text format
- "Share" button feedback

**C. History (Optional)**
- Last 5 generated ideas
- Quick access
- Lighter UI emphasis

### 5. Data Structure

**Ideas Database:**
```javascript
const ideas = {
  writing: [
    "A character who can only tell the truth in songs",
    "Two enemies stuck in an elevator",
    // ... 18+ more
  ],
  drawing: [
    "A cityscape made of food",
    "Portrait using only geometric shapes",
    // ... 18+ more
  ],
  business: [
    "Subscription service for busy parents",
    "Local marketplace for handmade goods",
    // ... 18+ more
  ],
  coding: [
    "Build a markdown editor with live preview",
    "Create a CLI tool for file organization",
    // ... 18+ more
  ]
}
```

**LocalStorage Schema:**
```javascript
{
  favorites: [
    {id, category, text, timestamp}
  ],
  settings: {
    lastCategory: "writing"
  }
}
```

---

## File Structure

```
day2-idea-generator/
├── index.html       # Main HTML + Tailwind
├── js/
│   ├── app.js       # Main logic
│   ├── ideas.js     # Idea database
│   └── storage.js   # LocalStorage
└── docs/
    ├── PRD.md
    └── IMPLEMENTATION.md
```

---

## Implementation Sequence

**Phase 1: Basic Structure (8 min)**
1. HTML with category tabs
2. Generation area
3. Generate button

**Phase 2: Core Logic (10 min)**
4. Ideas database (ideas.js)
5. Random selection
6. Display with animation

**Phase 3: Categories (8 min)**
7. Tab switching
8. Category-specific generation
9. Visual feedback

**Phase 4: Favorites (10 min)**
10. Save functionality
11. Display favorites list
12. Remove from favorites

**Phase 5: Polish (4 min)**
13. Copy to clipboard
14. Animations
15. Mobile responsive

---

## CRITICAL RULES

**IMPORTANT:**
- Each category MUST have 20+ unique ideas
- Random selection MUST avoid immediate repeats
- LocalStorage MUST handle quota errors
- UI MUST be one-click simple

**YOU MUST:**
- Validate category before generation
- Show clear feedback on actions
- Handle empty states gracefully
- Test on mobile viewport
- Smooth animations (200-300ms)

**NEVER:**
- Generate same idea twice in a row
- Use external API calls
- Complex UI that slows generation
- Store unnecessary data

**ALWAYS:**
- Show which category is active
- Provide instant visual feedback
- Keep ideas inspiring and positive
- Make favorites easily accessible
- Test random selection distribution

---

## Success Criteria

**Functional:**
- [ ] All 4 categories work
- [ ] Each category has 20+ ideas
- [ ] No immediate repeats
- [ ] Favorites save/load correctly
- [ ] Copy to clipboard works

**Non-Functional:**
- [ ] Generation feels instant
- [ ] Animations smooth
- [ ] Works on mobile (320px+)
- [ ] No console errors
- [ ] Intuitive single-click UX

---

## Testing Checklist

**Random Generation:**
- [ ] Generate 10 times - no immediate repeats
- [ ] All categories generate correctly
- [ ] Switch category mid-use works
- [ ] No undefined/null displays

**Favorites:**
- [ ] Save idea to favorites
- [ ] Load favorites on refresh
- [ ] Remove from favorites works
- [ ] Max 20 limit enforced
- [ ] Empty state shows correctly

**UI/UX:**
- [ ] Category tabs highlight active
- [ ] Animations smooth (no jank)
- [ ] Mobile responsive test
- [ ] Copy feedback visible
- [ ] All buttons accessible

**Edge Cases:**
- [ ] Empty favorites handled
- [ ] LocalStorage full handled
- [ ] Rapid clicking doesn't break
- [ ] Browser without LocalStorage works
