# Design System — Neon Idea Arcade

## Product Context
- **What this is:** Random creative idea generator (Writing, Drawing, Business, Coding prompts)
- **Who it's for:** 크리에이터, 개발자, 아이디어가 필요한 누구나
- **Space/industry:** Creative tools / Inspiration apps
- **Project type:** Single-page web app (Vanilla JS + Tailwind CSS)

## Aesthetic Direction
- **Direction:** Retro-Futuristic — 80년대 아케이드 게임기 + 사이버펑크. CRT 스캔라인, 네온 글로우, 플리커.
- **Decoration level:** Expressive — 네온 글로우, 스캔라인 오버레이, 박스쉐도우가 전체 분위기를 정의
- **Mood:** 어둡고 몰입감 있는 아케이드. 버튼 누르면 뭔가 나올 것 같은 기대감.
- **Note:** 보라색 그라디언트가 AI 슬롭으로 오인될 수 있으나, 네온/아케이드 맥락에서 의도적인 선택.

## Typography
- **Display/Hero:** Space Grotesk 700 — uppercase, tracking-wide, neon-glow 효과
- **Body:** Space Grotesk 400 — 가독성 높은 기하학적 산세리프
- **UI/Labels:** Space Grotesk 500-600 — uppercase, tracking-widest (카테고리 필)
- **Data:** Space Grotesk 400
- **Code:** N/A
- **Loading:** Google Fonts `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap`
- **Scale:**
  - Hero: 5xl~6xl (3rem~3.75rem) / 700 / uppercase / tracking-wide / neon-glow
  - Section: 2xl (1.5rem) / 700
  - Body: base (1rem) / 400
  - Label: sm (0.875rem) / 500-600 / uppercase / tracking-widest
  - Caption: xs (0.75rem) / 400

## Color
- **Approach:** Expressive — 네온 발광이 핵심. 색상이 분위기를 만드는 디자인.
- **Primary:** `#a855f7` (purple-500) — 네온 보라. 글로우, 버튼, 강조에 사용.
- **Accent:** `#f472b6` (pink-400) — 네온 핑크. 보조 강조, 즐겨찾기, 호버.
- **Background:** `#09090b` (zinc-950) — 거의 순흑. 네온이 빛나려면 배경이 어두워야 함.
- **Card:** `#1a1023` — 보라 톤의 다크. 배경과 미세한 차이로 elevation 표현.
- **Text:**
  - primary: `#ffffff` (white) — 헤딩, 주요 콘텐츠
  - secondary: `#94a3b8` (slate-400) — 부제, 설명
  - muted: `#64748b` (slate-500) — 비활성, 메타
- **Neon Glow values:**
  - text-shadow: `0 0 10px rgba(168,85,247,0.8), 0 0 20px rgba(168,85,247,0.5)`
  - box-shadow: `0 0 15px rgba(168,85,247,0.4), inset 0 0 5px rgba(168,85,247,0.2)`
  - button glow: `0 0 50px rgba(168,85,247,0.6)` → hover `0 0 70px rgba(168,85,247,0.8)`
- **Semantic:** N/A (단일 테마, 시맨틱 색상 불필요)
- **Dark mode:** 다크 전용. 라이트 모드 없음.

## Spacing
- **Base unit:** 4px (Tailwind default)
- **Density:** Spacious — 크리에이티브 앱은 여유 있는 간격이 맞음
- **Key values:** gap-3(12px) 카테고리 필, mb-12(48px) 섹션 간, py-8(32px) 페이지 패딩

## Layout
- **Approach:** Grid-disciplined — 단일 컬럼, 중앙 정렬
- **Grid:** Single column, centered
- **Max content width:** max-w-4xl (896px) — day1보다 넓음, 카드가 크니까
- **Border radius:** lg(8px) 카테고리 필, xl(12px) 카드, full(9999px) 버튼

## Motion
- **Approach:** Expressive — 모션이 앱의 정체성
- **Animations:**
  - `flicker` — 3s infinite, 네온 사인 깜빡임 (hero 타이틀)
  - `scanlines` — CSS pseudo-element, 상시 CRT 효과
  - `neon-glow` — text-shadow/box-shadow로 발광
  - `generate-btn-glow` — hover 시 글로우 확대
- **Easing:** 기본 ease (네온 깜빡임은 step 느낌)
- **Duration:** flicker 3s, hover transitions 200ms
- **Safety:** `prefers-reduced-motion` 존중 필요 (현재 미구현 — TODO)

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01 | Retro-Futuristic + 네온 보라/핑크 | Stitch MCP로 생성, 사이버펑크 아케이드 컨셉 |
| 2026-01 | Space Grotesk 선택 | 기하학적 + 레트로 균형, uppercase와 궁합 좋음 |
| 2026-01 | 다크 전용 (라이트 모드 없음) | 네온 글로우는 어두운 배경에서만 의미 |
| 2026-03-24 | DESIGN.md 작성 | /design-consultation으로 기존 디자인 문서화 |
