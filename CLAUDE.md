# Random Idea Generator

## Tech Stack
- HTML5, Tailwind CSS (CDN), Vanilla JavaScript (ES6+)
- LocalStorage API for persistence
- No build tools, no external dependencies

## Commands
- **Open:** `index.html` in browser
- **Test:** Run test suite in browser console

## Development Workflow
CRITICAL: Follow TDD approach:
1. Write test cases FIRST (in browser console or test file)
2. Run tests - confirm they FAIL
3. Implement minimum code to pass
4. Verify tests PASS
5. Refactor if needed

## Git Workflow
**Branches:** `feature/[name]`, `fix/[name]`
**Commits:** `feat:`, `fix:`, `test:` prefix

YOU MUST before ANY commit:
- Test all 4 categories generate correctly
- Verify no immediate repeats
- No console errors

## Testing Requirements
ALWAYS write tests FIRST for:
- Random generation: no immediate repeats in 10+ generations
- All 4 categories: Writing, Drawing, Business, Coding (20+ ideas each)
- Favorites: save, load, remove, max 20 limit
- LocalStorage: error handling (quota exceeded, try-catch)
- Copy to clipboard functionality

Test each component independently:
- `ideas.js` - random selection logic, category pools
- `storage.js` - LocalStorage operations
- `app.js` - UI updates, category switching

NEVER skip writing tests. NEVER commit failing tests.

## Code Conventions
- Tailwind utility classes ONLY (no inline styles)
- Modular JS files (app.js, ideas.js, storage.js)
- Semantic HTML elements
- Smooth animations (200-300ms)
- Comment complex logic only

## Critical Rules
**IMPORTANT:** Each category MUST have 20+ unique ideas. Random selection MUST avoid immediate repeats. UI MUST be one-click simple. Mobile responsive (320px+).

**YOU MUST:** Validate category before generation. Show clear feedback on actions. Handle empty states. Test on mobile viewport.

**NEVER:** Generate same idea twice in a row. Use external API calls. Complex UI that slows generation. Store unnecessary data. Use mock data in production.

**ALWAYS:** Show active category clearly. Provide instant visual feedback. Keep ideas inspiring. Make favorites accessible. Test random distribution.
