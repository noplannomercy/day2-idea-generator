# Day 2 - Random Idea Generator Prompts

## Session Summary
- **Project:** Random Idea Generator
- **Duration:** Single session
- **Approach:** TDD (Test-Driven Development)
- **Total Commits:** 11

---

## 1. CLAUDE.md Generation

```
Read: docs/PRD.md

Based on this PRD, generate CLAUDE.md following Anthropic best practices:

## Project: Random Idea Generator

### Tech Stack
[Extract from PRD]

### Commands
- Open: open index.html
- Test: Browser console verification

### Development Workflow
CRITICAL: Follow TDD approach:
1. Write test cases FIRST
2. Confirm tests FAIL
3. Implement minimum code to pass
4. Verify tests PASS
5. Refactor if needed

DO NOT implement without tests.
DO NOT skip verification.

### Git Workflow
Branch Strategy:
- feature/[name] for new features
- fix/[name] for bug fixes

Commit Format:
- feat: [description]
- fix: [description]
- test: [description]

Before ANY commit:
YOU MUST:
- Test all categories generate correctly
- Verify no immediate repeats
- No console errors

### Testing Requirements
Tests FIRST approach:

Write tests for:
- Random generation (no immediate repeats)
- All 4 categories (20+ ideas each)
- Favorites (save/load/remove)
- LocalStorage error handling
- Copy to clipboard

Test components:
- ideas.js: random selection logic
- storage.js: LocalStorage operations
- app.js: UI updates

NEVER:
- Skip writing tests
- Commit failing tests
- Use mock data in production

### Code Conventions
[Extract from PRD]

### Critical Rules
[Extract from PRD CRITICAL RULES]

Keep under 60 lines.
Strong keywords: IMPORTANT, YOU MUST, NEVER, ALWAYS, CRITICAL.

Save to: CLAUDE.md
```

---

## 2. IMPLEMENTATION.md Creation

```
Read:
- docs/PRD.md
- CLAUDE.md

Create detailed implementation plan:

Format as checklist:
## Phase 1: [Name]
- [ ] Task 1
- [ ] Task 2
- [ ] Test: [what to verify]

## Phase 2: [Name]
- [ ] Task 1
- [ ] Task 2
- [ ] Test: [what to verify]

Include:
- All phases from PRD Implementation Sequence
- TDD steps for each phase
- Specific test cases
- Time estimate per phase

Save to: docs/IMPLEMENTATION.md

STOP after saving.
Show me the plan.
```

---

## 3. Git Initialization

```
Initialize Git repository:

1. git init

2. Create .gitignore:
   - .DS_Store
   - node_modules/
   - *.log

3. Initial commit:
   git add docs/
   git add CLAUDE.md
   git commit -m "docs: Initial project setup with PRD and implementation plan"

4. Show status
```

---

## 4. Phase 1 Implementation

```
Read: docs/IMPLEMENTATION.md

Start Phase 1.

TDD approach:
- Implement as planned
- Test in browser
- STOP after Phase 1 complete
```

### Phase 1 Commit

```
테스트하고 커밋해주세요.
그리고 IMPLEMENTATION.md 업데이트 해주세요.
```

---

## 5. Phase 2 Implementation

```
Phase 2 진행해주세요
```

---

## 6. Phase 3 Implementation

```
Phase 3 진행해주세요
```

---

## 7. Phase 4 Implementation

```
Phase 4 진행해주세요
```

---

## 8. Phase 5 Implementation

```
Phase 5 진행해주세요
```

---

## 9. Final Testing

```
브라우저에서 최종 테스트해줘
```

---

## 10. Final Commit

```
테스트 통과, 최종 커밋해줘
```

---

## 11. Documentation

```
List all prompts I used today from start to finish.

Include:
1. CLAUDE.md generation
2. IMPLEMENTATION.md creation
3. Git initialization
4. All phase implementations
5. Test & commit steps
6. Everything

Chronological order.
Save to: docs/PROMPTS-DAY2.md
```

---

## Prompt Count Summary

| Category | Count |
|----------|-------|
| Setup (CLAUDE.md, IMPLEMENTATION.md, Git) | 3 |
| Phase implementations | 5 |
| Test & Commit | 2 |
| Documentation | 1 |
| **Total** | **11** |

---

## Key Patterns Used

1. **File Reference Pattern**
   ```
   Read: [file path]
   ```

2. **Implementation Request Pattern**
   ```
   Phase N 진행해주세요
   ```

3. **Test & Commit Pattern**
   ```
   테스트하고 커밋해주세요
   ```

4. **Save Output Pattern**
   ```
   Save to: [file path]
   ```

5. **TDD Instruction Pattern**
   ```
   TDD approach:
   - Implement as planned
   - Test in browser
   - STOP after Phase N complete
   ```
