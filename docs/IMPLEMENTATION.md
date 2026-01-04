# Random Idea Generator - Implementation Plan

**Total Time:** 40 minutes
**Approach:** TDD (Test-Driven Development)

---

## Phase 1: Basic Structure (8 min)

### Setup
- [ ] Create `index.html` with Tailwind CDN
- [ ] Create `js/` folder structure
- [ ] Create empty `js/app.js`, `js/ideas.js`, `js/storage.js`

### HTML Structure
- [ ] Header with title "Idea Generator"
- [ ] Category tabs: Writing, Drawing, Business, Coding
- [ ] Generation area (large centered box)
- [ ] Generate button
- [ ] Save to Favorites button
- [ ] Favorites section (empty list)

### Test: Phase 1 Verification
- [ ] Open `index.html` in browser - page renders
- [ ] All 4 category tabs visible
- [ ] Generate button visible
- [ ] No console errors

---

## Phase 2: Core Logic (10 min)

### TDD Step 1: Write Tests FIRST
```javascript
// Test: ideas.js has all categories
console.assert(ideas.writing.length >= 20, 'Writing needs 20+ ideas');
console.assert(ideas.drawing.length >= 20, 'Drawing needs 20+ ideas');
console.assert(ideas.business.length >= 20, 'Business needs 20+ ideas');
console.assert(ideas.coding.length >= 20, 'Coding needs 20+ ideas');

// Test: getRandomIdea returns string
console.assert(typeof getRandomIdea('writing') === 'string', 'Should return string');

// Test: No immediate repeats
let prev = getRandomIdea('writing');
for (let i = 0; i < 10; i++) {
  let curr = getRandomIdea('writing');
  console.assert(curr !== prev, 'No immediate repeats');
  prev = curr;
}
```

### TDD Step 2: Run Tests - Confirm FAIL
- [ ] Run tests in console - all should fail (functions don't exist)

### TDD Step 3: Implement
- [ ] Create `ideas.js` with 4 category arrays (20+ each)
- [ ] Implement `getRandomIdea(category)` function
- [ ] Track last idea per category to prevent repeats

### TDD Step 4: Verify Tests PASS
- [ ] Run tests again - all should pass

### Test: Phase 2 Verification
- [ ] `ideas.writing.length >= 20`
- [ ] `ideas.drawing.length >= 20`
- [ ] `ideas.business.length >= 20`
- [ ] `ideas.coding.length >= 20`
- [ ] Generate 10 times - no immediate repeats

---

## Phase 3: Categories & UI Connection (8 min)

### TDD Step 1: Write Tests FIRST
```javascript
// Test: Category switching
console.assert(getCurrentCategory() === 'writing', 'Default is writing');
setCategory('drawing');
console.assert(getCurrentCategory() === 'drawing', 'Category switched');

// Test: Generate returns from correct category
setCategory('coding');
let idea = generateIdea();
console.assert(ideas.coding.includes(idea), 'Idea from correct category');
```

### TDD Step 2: Run Tests - Confirm FAIL
- [ ] Run tests - should fail

### TDD Step 3: Implement
- [ ] Add category state variable
- [ ] Implement tab click handlers
- [ ] Connect Generate button to `getRandomIdea()`
- [ ] Display idea in generation area with fade animation
- [ ] Highlight active category tab

### TDD Step 4: Verify Tests PASS
- [ ] Run tests - should pass

### Test: Phase 3 Verification
- [ ] Click each tab - highlights correctly
- [ ] Generate shows idea from selected category
- [ ] Fade animation works (200-300ms)
- [ ] Category badge shows on idea

---

## Phase 4: Favorites System (10 min)

### TDD Step 1: Write Tests FIRST
```javascript
// Test: storage.js functions
clearFavorites();
console.assert(getFavorites().length === 0, 'Empty after clear');

saveFavorite({id: 1, category: 'writing', text: 'Test idea'});
console.assert(getFavorites().length === 1, 'One favorite saved');

removeFavorite(1);
console.assert(getFavorites().length === 0, 'Favorite removed');

// Test: Max 20 limit
for (let i = 0; i < 25; i++) {
  saveFavorite({id: i, category: 'test', text: 'Idea ' + i});
}
console.assert(getFavorites().length <= 20, 'Max 20 enforced');

// Test: LocalStorage error handling
// (manually test by filling storage)
```

### TDD Step 2: Run Tests - Confirm FAIL
- [ ] Run tests - should fail

### TDD Step 3: Implement
- [ ] Create `storage.js` with LocalStorage wrapper
- [ ] Implement `getFavorites()`, `saveFavorite()`, `removeFavorite()`
- [ ] Add max 20 limit check
- [ ] Add try-catch for quota errors
- [ ] Connect Save button to `saveFavorite()`
- [ ] Display favorites list
- [ ] Add remove (X) button to each favorite

### TDD Step 4: Verify Tests PASS
- [ ] Run tests - should pass

### Test: Phase 4 Verification
- [ ] Save idea - appears in favorites list
- [ ] Refresh page - favorites persist
- [ ] Click X - removes from favorites
- [ ] Save 21 ideas - oldest removed (max 20)
- [ ] Empty favorites shows placeholder text

---

## Phase 5: Polish & Mobile (4 min)

### TDD Step 1: Write Tests FIRST
```javascript
// Test: Copy to clipboard
// (requires user interaction, manual test)

// Test: All ideas are non-empty strings
Object.keys(ideas).forEach(cat => {
  ideas[cat].forEach((idea, i) => {
    console.assert(idea && idea.length > 0, `${cat}[${i}] not empty`);
  });
});
```

### Implement
- [ ] Add copy to clipboard button
- [ ] Show "Copied!" feedback (1.5s)
- [ ] Test on mobile viewport (320px)
- [ ] Ensure buttons are touch-friendly (44px min)
- [ ] Verify animations smooth (no jank)

### Test: Phase 5 Verification
- [ ] Copy button copies idea text
- [ ] "Copied!" feedback shows
- [ ] Works on 320px viewport
- [ ] All buttons tappable on mobile
- [ ] No console errors

---

## Final Verification Checklist

### Functional
- [ ] All 4 categories work
- [ ] Each category has 20+ ideas
- [ ] No immediate repeats (test 10x)
- [ ] Favorites save/load correctly
- [ ] Copy to clipboard works

### Non-Functional
- [ ] Generation feels instant
- [ ] Animations smooth (200-300ms)
- [ ] Works on mobile (320px+)
- [ ] No console errors
- [ ] Intuitive single-click UX

### Edge Cases
- [ ] Empty favorites handled
- [ ] LocalStorage full handled (try-catch)
- [ ] Rapid clicking doesn't break
- [ ] Refresh preserves favorites

---

## File Checklist

```
day2-idea-generator/
├── index.html          # [ ] Created
├── js/
│   ├── app.js          # [ ] Created
│   ├── ideas.js        # [ ] Created (80+ ideas)
│   └── storage.js      # [ ] Created
└── docs/
    ├── PRD.md          # [x] Exists
    └── IMPLEMENTATION.md # [x] This file
```

---

## Git Commits

1. `feat: Phase 1 - HTML structure with Tailwind`
2. `test: Phase 2 - Add ideas.js tests`
3. `feat: Phase 2 - Implement ideas database and random selection`
4. `test: Phase 3 - Add category switching tests`
5. `feat: Phase 3 - Implement category tabs and UI connection`
6. `test: Phase 4 - Add storage.js tests`
7. `feat: Phase 4 - Implement favorites with LocalStorage`
8. `feat: Phase 5 - Add copy, animations, mobile polish`
