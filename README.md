# Neon Idea Arcade 🎮⚡

A retro-futuristic random idea generator with cyberpunk aesthetics featuring purple/pink neon gradients and arcade-style interactions.

![Tech Stack](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

- **4 Creative Categories**: Writing, Drawing, Business, and Coding prompts
- **20+ Unique Ideas per Category**: Carefully curated creative prompts
- **Neon Arcade Aesthetics**: Dark theme with purple/pink neon glows and retro CRT effects
- **Favorites System**: Save up to 20 ideas with timestamps
- **Copy to Clipboard**: One-click copy functionality
- **No Immediate Repeats**: Smart random generation avoiding consecutive duplicates
- **Fully Responsive**: Mobile-first design (320px+)
- **LocalStorage Persistence**: Your favorites persist across sessions

## 🎨 Design Workflow

This project leverages **Stitch MCP** (Model Context Protocol) for design generation:

### Step 1: MCP Setup
Configure `.mcp.json` with Stitch server:
```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "stitch-mcp"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "stitch-mcp-485600"
      }
    }
  }
}
```

### Step 2: Generate Design with Stitch
```
@stitch Random Idea Generator 웹앱 만들어줘.
- 다크 테마, 퍼플/핑크 네온 그라디언트 포인트
- 중앙에 큰 아이디어 카드 (슬롯머신 느낌)
- 카테고리 버튼들 (Writing, Drawing, Business, Coding)
- Generate 버튼 크고 눈에 띄게
- 저장된 아이디어 리스트
- 재미있고 영감 주는 느낌
```

### Step 3: Extract Design System
```
@stitch 디자인 컨텍스트 추출해서 DESIGN.md 작성해줘
```

### Step 4: Apply to Codebase
```
DESIGN.md 보고 기존 index.html 디자인 개선해줘.
기능(JS)은 그대로 유지.
```

See [docs/PROMPTS-STITCH.md](docs/PROMPTS-STITCH.md) for complete workflow.

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **Tailwind CSS v3+**: Utility-first CSS (CDN)
- **Vanilla JavaScript (ES6+)**: No framework dependencies
- **Space Grotesk Font**: Modern geometric typeface
- **Material Symbols**: Icon library
- **LocalStorage API**: Client-side persistence

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd day2-idea-generator
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   npx serve .
   # or
   python -m http.server 8000
   ```

3. **Start generating ideas!**
   - Select a category (Writing, Drawing, Business, Coding)
   - Click the ⚡ Generate button
   - Save favorites, copy to clipboard

## 📁 Project Structure

```
day2-idea-generator/
├── index.html              # Main HTML with Neon Arcade UI
├── js/
│   ├── app.js             # Main application logic & UI
│   ├── ideas.js           # Idea pools & random generation
│   └── storage.js         # LocalStorage operations
├── docs/
│   ├── DESIGN.md          # Complete design system
│   ├── PROMPTS-STITCH.md  # Stitch MCP workflow
│   ├── PROMPTS-DAY2.md    # Development session history
│   └── IMPLEMENTATION.md  # Phase-by-phase implementation
├── CLAUDE.md              # Development guidelines
├── .mcp.json              # Stitch MCP configuration
└── README.md              # This file
```

## 🧪 Testing

### Run Tests in Browser Console
```javascript
// Test all modules
runIdeasTests();  // Test idea generation & randomness
runStorageTests(); // Test LocalStorage operations
runAppTests();     // Test UI updates & category switching
```

### Test Requirements (from CLAUDE.md)
- ✅ Random generation: no immediate repeats in 10+ generations
- ✅ All 4 categories: 20+ unique ideas each
- ✅ Favorites: save, load, remove, max 20 limit
- ✅ LocalStorage: error handling (quota exceeded, try-catch)
- ✅ Copy to clipboard functionality
- ✅ Mobile responsive (320px+)

## 🎯 Development Workflow

### TDD Approach (CRITICAL)
1. Write test cases FIRST
2. Run tests - confirm they FAIL
3. Implement minimum code to pass
4. Verify tests PASS
5. Refactor if needed

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-category

# Make changes, test thoroughly
# Commit with prefix
git commit -m "feat: add Music category with 20+ ideas"

# Before committing, ALWAYS verify:
# - All 4 categories generate correctly
# - No immediate repeats
# - No console errors
```

### Commit Prefixes
- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Test additions/changes
- `docs:` - Documentation updates

## 🎨 Design System

### Color Palette
- **Primary**: `#a855f7` (Purple)
- **Accent**: `#f472b6` (Pink)
- **Background**: `#09090b` (Deep Black)
- **Card Dark**: `#1a1023` (Dark Purple)

### Typography
- **Font**: Space Grotesk (300, 400, 500, 600, 700)
- **Style**: Uppercase, wide tracking for labels
- **Headings**: Bold (700), uppercase

### Effects
- **Neon Glow**: Purple text-shadow on interactive elements
- **Scanlines**: Retro CRT effect on central card
- **Flicker Animation**: 3s infinite on neon elements
- **Smooth Transitions**: 200-300ms ease-in-out

See [docs/DESIGN.md](docs/DESIGN.md) for complete design specifications.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column grid)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (4 columns)

## 🔒 Code Conventions

- Tailwind utility classes ONLY (no inline styles)
- Modular JS files (app.js, ideas.js, storage.js)
- Semantic HTML elements
- Smooth animations (200-300ms)
- Comment complex logic only

## ⚠️ Critical Rules

### MUST
✅ Each category MUST have 20+ unique ideas
✅ Random selection MUST avoid immediate repeats
✅ UI MUST be one-click simple
✅ Validate category before generation
✅ Show clear feedback on actions
✅ Test on mobile viewport

### NEVER
❌ Generate same idea twice in a row
❌ Use external API calls
❌ Create complex UI that slows generation
❌ Store unnecessary data
❌ Use mock data in production
❌ Commit without testing all categories

## 📚 Documentation

- [DESIGN.md](docs/DESIGN.md) - Complete design system & component specs
- [IMPLEMENTATION.md](docs/IMPLEMENTATION.md) - Phase-by-phase development
- [PROMPTS-STITCH.md](docs/PROMPTS-STITCH.md) - Stitch MCP workflow
- [PROMPTS-DAY2.md](docs/PROMPTS-DAY2.md) - Development session history
- [CLAUDE.md](CLAUDE.md) - Development guidelines & rules

## 🤝 Contributing

1. Read [CLAUDE.md](CLAUDE.md) for development guidelines
2. Follow TDD approach (tests first!)
3. Use proper commit prefixes
4. Test all categories before committing
5. Ensure mobile responsiveness

## 📄 License

MIT License - feel free to use this project for inspiration!

## 🎮 Credits

- **Design**: Generated with Stitch MCP
- **Fonts**: Space Grotesk by Google Fonts
- **Icons**: Material Symbols by Google
- **Framework**: Tailwind CSS

---

**Made with ⚡ and 💜 using Stitch MCP + Claude Code**
