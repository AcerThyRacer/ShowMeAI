<div align="center">

# 🌐 THE WEBSITE IS NOW LIVE! 🌐

<br>

<a href="https://showmeai.dev/">
  <img src="https://img.shields.io/badge/🚀_VISIT_SHOWMEAI-showmeai.dev-00d4ff?style=for-the-badge&labelColor=0a0a0a&logo=googlechrome&logoColor=white" alt="Visit ShowMeAI" height="50"/>
</a>

<br><br>

### 🔗 **[https://showmeai.dev/](https://showmeai.dev/)**

> **The definitive interactive guide to AI in 2026 is live and accessible worldwide.**
> No installation needed — just click the link above and explore!

</div>

---

## ⚡ Quick Install (Run Locally)

Want to run the site locally? Use these **one-liner** commands:

**🪟 Windows (PowerShell):**
```powershell
git clone https://github.com/AcerThyRacer/ShowMeAI.git && cd ShowMeAI && npm install && npm run dev
```

**🐧 Linux / macOS (Bash):**
```bash
git clone https://github.com/AcerThyRacer/ShowMeAI.git && cd ShowMeAI && npm install && npm run dev
```

> After running, open **http://localhost:5173** in your browser.

---

# ShowMeAI - AI Masterclass 2026

<div align="center">

**Welcome to AI Masterclass** — the definitive interactive guide to mastering AI in 2026

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.33-ff69b4)](https://www.framer.com/motion/)

[Live Site](https://showmeai.dev) · [Features](#-key-features) · [Roadmap](ROADMAP_2026.md)

</div>

---

## 🌟 Overview

**AI Masterclass** is a sophisticated, production-ready React application that serves as the definitive guide to AI models and tools in 2026. It combines comprehensive, expertly-written content with an immersive theming system featuring **16 unique themes**, each with custom animations, backgrounds, and personalities.

This isn't just another AI directory — it's a complete educational platform with detailed model essays, provider profiles, task-based recommendations, an advanced prompt engineering guide, and a library of **50+ professional prompt templates**.

---

## ✨ What Makes It Special

### 🎨 Unmatched Theming System
- **16 complete themes** — not just color swaps, but entirely unique visual identities
- Each theme has: custom canvas animation, unique card hover effects, per-section accent lines, animated slider tracks, custom scrollbars, and unique Framer Motion variants
- Themes include: Dark, Light, Rave, Neon, Hacker, Toxic, Candy, Cyberpunk, Ocean, Sunset, Retro, Minimalist, Forest, Monochrome, SynthwaveX, and Seasonal

### ⚡ Dual Control System
- **Intensity Slider** — Control background animation speed and density (particles, rain speed, wave intensity)
- **Motion Slider** — Scale all UI animations from disabled (accessibility) to dramatic effects
- Both sliders feature **per-theme animated tracks** that respond in real-time
- Auto-detects `prefers-reduced-motion` for accessibility

### 🚀 Performance-First Canvas
- Industry-leading optimizations achieving **5-10x performance gains**
- Double-draw glow technique instead of expensive shadowBlur
- Typed arrays (Float32Array) for particle data
- Adaptive frame rate (15fps → native refresh rate based on intensity)
- Particle pool caps prevent garbage collection pressure

### 📚 Comprehensive AI Content
- **47 detailed model essays** covering GPT-5.3, Claude Opus 4.6, Gemini 3 Pro, DeepSeek V3, and more
- **16 provider profiles** with deep dives into OpenAI, Anthropic, Google, xAI, etc.
- **Task-based recommendations** for 8 verticals (Autonomous Labor, Deep Reasoning, Multimodal, Coding, Creative, Voice, Sovereign, Compliance)
- **7-section how-to guide** covering Claude Code, Cursor, Gemini CLI, infrastructure, and strategic outlook

### 🔧 Advanced Prompt Engineering
- **OMEGA-SENTINEL V4** system prompt with 32 intelligence modules across P0-P3 tiers
- Reflexion-based Tree-of-Thoughts (R-ToT++) and Chain-of-Verification (CoVe++) methodologies
- **Prompt Library** with 50+ professional templates across 8 categories with real-time search

### ♿ Accessibility-First Design
- Automatic reduced-motion detection and adaptation
- ARIA labels throughout
- Full keyboard navigation with shortcuts
- Semantic HTML structure
- Screen reader friendly

---

## 🎯 Key Features

### 1. Immersive Theme System

| Theme | Visual Style | Background | Special Effects |
|-------|--------------|------------|-----------------|
| 🌙 **Dark** | Professional blue accents | Floating particles with mouse gravitation | Soft glow aura follows cursor |
| ☀️ **Light** | Clean, minimal | Vibrant gradient blobs | Gentle color shifts |
| 🎉 **Rave** | Vibrant rainbow | Bouncy particles | Comic Sans font, scale/rotate icons, multi-layer text shadows |
| 🌃 **Neon** | Cyberpunk glow | Glowing lines | Dual-color glow effects, pulsing animations |
| 💻 **Hacker** | Matrix green | Digital rain | Monospace font, glitch shake animations, scanlines |
| ☢️ **Toxic** | Radioactive green/purple | Dripping bubbles | Toxic gradient effects |
| 🍬 **Candy** | Pink/purple sweet | Soft glowing orbs | Glowing dots on gradient |
| 🤖 **Cyberpunk** | Chrome orange/cyan | Perspective grid floor | Scanlines, dystopian aesthetic |
| 🌊 **Ocean** | Deep blue | 3-layer wave animation | Floating bubbles |
| 🌅 **Sunset** | Warm orange/purple | Sun glow at horizon | Floating embers |
| 📼 **Retro** | 80s synthwave | Synthwave sun + perspective grid | Twinkling stars, neon pulse |
| 🎯 **Minimalist** | Near-zero effects | Subtle dots with connecting lines | Clean, distraction-free |
| 🌲 **Forest** | Natural green/brown | Organic flowing patterns | Nature-inspired animations |
| ⚫ **Monochrome** | Grayscale elegance | Minimal particles | Sharp, clean aesthetic |
| 🎹 **SynthwaveX** | Extended retro-future | Enhanced grid + starfield | Intensified neon effects |
| 🎄 **Seasonal** | Auto-changing | Context-aware themes | Holiday/special occasion effects |

**Each theme features:**
- Unique color palette via CSS variables
- Custom canvas background simulation
- Per-theme card hover animations
- Animated section accent lines
- Custom scrollbar colors
- Custom text selection colors
- Per-theme slider track animations
- Unique icon animations
- Special title text effects
- Custom Framer Motion variants

### 2. Interactive Sliders

**Intensity Slider** (`IntensitySlider.tsx`)
- Controls canvas background animation intensity (0-100)
- Visual feedback: Snowflake icon → Flame icon
- Per-theme animated canvas tracks

**Motion Slider** (`MotionSlider.tsx`)
- Controls UI animation speed (0-100)
- Scales all Framer Motion animations
- At 0: Animations disabled (accessibility mode)
- At 100: Full dramatic entrance effects

### 3. Homepage Sections

**Hero** ([`Hero.tsx`](src/components/Hero.tsx))
- Per-theme animated icons (e.g., Rave: scale/rotate/rainbow glow, Hacker: glitch shake)
- Per-theme title text effects (e.g., Retro: neon pulse, Rave: multi-layer text shadow)
- Primary CTAs: "Read the Report" + "Explore Models"
- Secondary CTAs: "Compare Models", "Playground", "AI Guide"

**AI Guide** ([`AiGuide.tsx`](src/components/AiGuide.tsx))
- 6-card grid showcasing "Core Principles of 2026"
- Topics: Agentic Shift, Adaptive Reasoning, Use-Case Selection, Sovereignty, Developer's Arsenal, Memory Bandwidth
- Smooth scroll-reveal animations using `RevealCard` wrapper

**Model Recommender** ([`ModelRecommender.tsx`](src/components/ModelRecommender.tsx))
- Task-based recommendation system with 8 verticals
- Interactive tab selection with animated panel transitions
- Shows: Best Model, Alternatives, Description, "Read full essay" link

**Personal Picks** ([`PersonalPicks.tsx`](src/components/PersonalPicks.tsx))
- Ranked "Editor's Choice" recommendations (5 picks)
- Medal rankings (🥇🥈🥉🛡️⚡)
- Detailed reasoning for each pick

### 4. Model Directory

**Models Grid** ([`ModelsGrid.tsx`](src/components/ModelsGrid.tsx))
- Filterable grid with **12 category tabs**
- Categories: All, Autonomous, Reasoning, Multimodal, Coding, Creative, Enterprise, Research, Open Source, Science, Speed
- Smart category aliases
- Live count of models per category
- Layout animations with Framer Motion `AnimatePresence`
- **Favorite button** on each model card
- **Compare toggle** for multi-model comparison

**Data Structure** ([`models.ts`](src/data/models.ts))
- **47 AI models** with detailed essays across 5 tiers:
  - **Tier 1:** GPT-5.3 Codex, GPT-5, GPT-5.2, o3, o4-mini, Claude Opus 4.6, Sonnet 4.5, Haiku 4.5, Gemini 3 Pro/Flash/Thinking, Gemini 2.5 Pro, Veo 3, Imagen 4
  - **Tier 2:** Magic LTM-10M, Grok 4/3/3-mini, Aurora 2, DeepSeek V3/R1/V3.2, Command R7
  - **Tier 3:** Llama 4 Scout/Maverick/Behemoth, Mistral Large 3, Codestral, Devstral 2, Ministral 8B, Qwen3 Max
  - **Tier 4:** Sora 2, Midjourney v7, ElevenLabs V4, Suno V5
  - **Tier 5:** AlphaFold 4, GitHub Copilot, Perplexity Pro

**Model Detail Page** ([`ModelPage.tsx`](src/components/ModelPage.tsx))
- Full model essay with rich formatting
- Strengths and weaknesses checklists
- Pricing information
- Release year
- Provider link
- Breadcrumb navigation
- **Share button** for social sharing
- **Favorite toggle**

### 5. Favorites System

**Favorites Context** ([`FavoritesContext.tsx`](src/context/FavoritesContext.tsx))
- Persist favorites to localStorage
- Toggle favorites from any model card or detail page
- Favorites count badge in navbar

**Favorites Page** ([`FavoritesPage.tsx`](src/components/FavoritesPage.tsx))
- Dedicated page showing all favorited models
- Empty state with helpful CTA
- Quick access to model details

### 6. Comparison System

**Comparison Context** ([`ComparisonContext.tsx`](src/context/ComparisonContext.tsx))
- Select up to 4 models for comparison
- Persistent selection across navigation
- Quick clear all functionality

**Comparison Bar** ([`ComparisonBar.tsx`](src/components/ComparisonBar.tsx))
- Fixed bottom bar showing selected models
- Quick remove buttons
- "Compare Now" CTA

**Compare Models** ([`CompareModels.tsx`](src/components/CompareModels.tsx))
- Side-by-side model comparison (2 models)
- Auto-generated verdict based on strengths comparison
- Comparison table: Category, Release Year, Pricing
- Strengths/weaknesses lists with check/X icons

**Comparison Matrix** ([`ComparisonMatrix.tsx`](src/components/ComparisonMatrix.tsx))
- Multi-model comparison view (up to 4 models)
- Feature matrix with checkmarks
- Export-friendly layout

### 7. Advanced Search & Discovery

**Advanced Search** ([`AdvancedSearch.tsx`](src/components/AdvancedSearch.tsx))
- Full-text search across all models
- Filter by provider, category, pricing
- Real-time results
- Search history

**Model Wizard** ([`ModelWizard.tsx`](src/components/ModelWizard.tsx))
- Interactive questionnaire to find the perfect model
- Step-by-step guidance
- Personalized recommendations based on use case

**Pricing Calculator** ([`PricingCalculator.tsx`](src/components/PricingCalculator.tsx))
- Calculate estimated costs across different models
- Compare pricing tiers
- Token usage estimator

### 8. Provider Directory

**Providers Grid** ([`ProvidersGrid.tsx`](src/components/ProvidersGrid.tsx))
- Grid of all 16 AI providers
- Shows icon, name, description, model count
- Link to detailed provider page

**Provider Detail Page** ([`ProviderPage.tsx`](src/components/ProviderPage.tsx))
- Full provider essay
- List of all models from that provider
- Website link
- Breadcrumb navigation

### 9. AI Guide Section

**How To Use AI** ([`HowToUseAI.tsx`](src/components/HowToUseAI.tsx))
- Comprehensive 7-section guide on building with AI in 2026
- **Collapsible code blocks** with copy buttons
- Topics: Claude Code, Cursor, Gemini CLI, Infrastructure & Hardware, Strategic Outlook, Claude Code Setup, OMEGA-SENTINEL V4

### 10. Omega Prompt Setup

**Omega Prompt** ([`OmegaPrompt.tsx`](src/components/OmegaPrompt.tsx))
- Dedicated page for the "OMEGA-SENTINEL V4" system prompt
- Explains the cognitive architecture (R-ToT++)
- Details the **32 intelligence modules** across P0-P3 tiers
- Copy-ready system prompt for global CLAUDE.md

### 11. Prompt Library

**Prompt Library** ([`PromptLibrary.tsx`](src/components/PromptLibrary.tsx))
- **50+ curated prompt templates** across 8 categories
- Categories: Coding, Writing, Analysis, Business, Learning, Creative, Productivity, Communication
- Real-time search across titles, descriptions, tags, and templates
- Category filtering with visual tabs and counts
- One-click copy-to-clipboard with visual feedback
- Highlighted bracket variables like `[topic]`

### 12. UI/UX Enhancements

**Page Transitions** ([`PageTransition.tsx`](src/components/PageTransition.tsx))
- Smooth route transitions with Framer Motion
- Theme-aware animation styles

**Scroll Progress Bar** ([`ScrollProgressBar.tsx`](src/components/ScrollProgressBar.tsx))
- Visual reading progress indicator
- Theme-colored progress bar

**Tilt Cards** ([`TiltCard.tsx`](src/components/TiltCard.tsx))
- 3D hover effect on cards
- Interactive mouse-tracking tilt

**Toast Notifications** ([`Toast.tsx`](src/components/Toast.tsx))
- Non-intrusive notifications for actions
- Copy confirmation, favorites added, etc.

**Keyboard Shortcuts** ([`KeyboardShortcuts.tsx`](src/components/KeyboardShortcuts.tsx))
- `?` key to show shortcut help
- Quick navigation shortcuts
- Accessibility shortcuts

**Skeleton Loading** ([`Skeleton.tsx`](src/components/Skeleton.tsx))
- Theme-aware loading states
- Smooth shimmer effects

**Share Button** ([`ShareButton.tsx`](src/components/ShareButton.tsx))
- Native Web Share API integration
- Fallback to clipboard copy

### 13. Playground

**AI Playground** ([`Playground.tsx`](src/components/Playground.tsx))
- Simulated AI chat interface
- Theme-aware styling
- Demonstrates conversational AI concepts

---

## 🎬 Animation System

### Theme-Aware Animations

**useThemeAnimations** ([`useThemeAnimations.ts`](src/hooks/useThemeAnimations.ts))
- Per-theme Framer Motion variant sets
- Scales all properties by `motionLevel` (0-100)
- 16 theme profiles with unique easing curves and durations

**useConfetti** ([`useConfetti.ts`](src/hooks/useConfetti.ts))
- Celebration effects for user actions
- Theme-aware confetti colors

**RevealCard** ([`RevealCard.tsx`](src/components/RevealCard.tsx))
- Wrapper component for reliable scroll-reveal
- Uses native IntersectionObserver
- One-time trigger (doesn't reverse on scroll up)

---

## 🧭 Navigation & Routing

**Navbar** ([`Navbar.tsx`](src/components/Navbar.tsx))
- Fixed top nav with backdrop blur
- Desktop: Horizontal links with active state highlighting
- Mobile: Hamburger menu with animated dropdown
- Integrates both sliders with labels on mobile
- Theme switcher dropdown with all 16 themes
- Favorites count badge
- Comparison indicator

**Routing** ([`App.tsx`](src/App.tsx))
- Code-split routes with React.lazy + Suspense
- Loading skeleton with theme-aware styling
- SEO meta tags on every route via react-helmet-async
- Scroll-to-top on route change

**All Routes:**
- `/` — Homepage with all sections
- `/models` — Model directory
- `/models/:id` — Individual model detail page
- `/providers` — Provider directory
- `/providers/:id` — Individual provider detail page
- `/compare` — Side-by-side comparison (2 models)
- `/matrix` — Multi-model comparison matrix (up to 4)
- `/favorites` — Saved favorite models
- `/search` — Advanced search with filters
- `/wizard` — Model recommendation wizard
- `/pricing` — Pricing calculator
- `/customize` — Theme customizer
- `/playground` — Simulated AI chat
- `/ai-guide` — Full how-to guide
- `/omega-prompt` — Omega prompt setup
- `/prompt-library` — 50+ prompt templates

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 19.2 |
| **TypeScript** | Type Safety | 5.9 |
| **Vite** | Build Tool | 7.3 |
| **Tailwind CSS** | Styling | 3.4 |
| **Framer Motion** | Animations | 12.33 |
| **React Router** | Routing | 7.x |
| **react-helmet-async** | SEO | 2.x |
| **Lucide React** | Icons | Latest |
| **vite-plugin-pwa** | PWA Support | 1.2 |

---

## 📂 Project Structure

```
src/
├── App.tsx                          # Router + lazy loading + SEO
├── main.tsx                         # React 19 entry point
├── index.css                        # Tailwind + 16 theme CSS variables
│
├── components/
│   ├── backgrounds/
│   │   └── ThemeBackground.tsx      # 16 optimized canvas animations
│   ├── Hero.tsx                     # Landing with per-theme animations
│   ├── AiGuide.tsx                  # 6-card principles grid
│   ├── ModelRecommender.tsx         # Task-based recommendations
│   ├── PersonalPicks.tsx            # Ranked editor's choices
│   ├── ModelsGrid.tsx               # Filterable model directory
│   ├── ModelPage.tsx                # Individual model essay
│   ├── ProvidersGrid.tsx            # Provider directory
│   ├── ProviderPage.tsx             # Provider essay
│   ├── CompareModels.tsx            # Side-by-side comparison
│   ├── ComparisonMatrix.tsx         # Multi-model matrix view
│   ├── ComparisonBar.tsx            # Fixed bottom comparison bar
│   ├── FavoritesPage.tsx            # Saved favorites
│   ├── FavoriteButton.tsx           # Reusable favorite toggle
│   ├── AdvancedSearch.tsx           # Full search with filters
│   ├── ModelWizard.tsx              # Interactive model finder
│   ├── PricingCalculator.tsx        # Cost estimator
│   ├── ThemeCustomizer.tsx          # Theme settings panel
│   ├── Playground.tsx               # Simulated AI chat
│   ├── HowToUseAI.tsx               # 7-section comprehensive guide
│   ├── OmegaPrompt.tsx              # Omega prompt setup guide
│   ├── PromptLibrary.tsx            # 50+ prompt templates
│   ├── Navbar.tsx                   # Nav with sliders + theme picker
│   ├── IntensitySlider.tsx          # Canvas intensity control
│   ├── MotionSlider.tsx             # Animation speed control
│   ├── ThemeSwitcher.tsx            # Theme dropdown picker
│   ├── PageTransition.tsx           # Route transition wrapper
│   ├── ScrollProgressBar.tsx        # Reading progress indicator
│   ├── KeyboardShortcuts.tsx        # Shortcut help modal
│   ├── TiltCard.tsx                 # 3D hover effect card
│   ├── Toast.tsx                    # Notification system
│   ├── Skeleton.tsx                 # Loading states
│   ├── ShareButton.tsx              # Social sharing
│   ├── RevealCard.tsx               # Scroll-reveal wrapper
│   ├── ScrollToTop.tsx              # Route-change scroll reset
│   └── SEO.tsx                      # Meta tag wrapper
│
├── context/
│   ├── ThemeContext.tsx             # Theme + intensity + motionLevel state
│   ├── FavoritesContext.tsx         # Favorites management
│   └── ComparisonContext.tsx        # Multi-model comparison state
│
├── hooks/
│   ├── useThemeAnimations.ts        # Per-theme Framer variants
│   ├── useConfetti.ts               # Celebration effects
│   └── useOnScreen.ts               # IntersectionObserver hook
│
└── data/
    ├── models.ts                    # 47 models + 16 providers data
    └── promptTemplates.ts           # 50+ prompt templates
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AcerThyRacer/ShowMeAI.git
   cd ShowMeAI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Configuration

### Adding a New Theme

1. **Add CSS variables** in [`index.css`](src/index.css):
   ```css
   .theme-yourtheme {
     --bg-primary: #...;
     --text-primary: #...;
     /* etc */
   }
   ```

2. **Add canvas animation** in [`ThemeBackground.tsx`](src/components/backgrounds/ThemeBackground.tsx)

3. **Add animation variants** in [`useThemeAnimations.ts`](src/hooks/useThemeAnimations.ts)

4. **Add theme option** to [`ThemeContext.tsx`](src/context/ThemeContext.tsx)

### Adding a New Model

Edit [`models.ts`](src/data/models.ts):

```typescript
{
  id: "your-model",
  name: "Your Model",
  provider: "Provider Name",
  providerSlug: "provider-name",
  category: ["category1", "category2"],
  tagline: "Short description",
  description: "Longer description...",
  essay: "Full essay content...",
  strengths: ["strength1", "strength2"],
  weaknesses: ["weakness1", "weakness2"],
  pricing: "$X/month",
  releaseYear: 2026,
  icon: "🤖"
}
```

---

## 🔬 Technical Highlights

### Performance Optimizations

**Canvas Backgrounds:**
- Double-draw glow technique instead of shadowBlur (5-10x faster)
- Typed arrays (Float32Array) for particle data
- Batch path drawing operations
- Adaptive frame rate throttling (15fps → native refresh rate)
- Particle pool caps prevent GC pressure
- DPR-aware sizing for retina displays

**React:**
- React.lazy code-splitting for all routes
- useMemo for expensive computations
- useCallback for stable function references
- Context value memoization

**CSS:**
- CSS variables for instant theme switching
- Hardware-accelerated transforms (translate3d)
- Containment for layout stability
- Prefers-reduced-motion media queries

### Architecture Patterns

- **Context API** for global state (theme, favorites, comparison)
- **Custom hooks** for reusable logic
- **Composition pattern** for animation variants
- **Higher-order components** (RevealCard wrapper)
- **Separation of concerns** (backgrounds, components, data, hooks)
- **TypeScript interfaces** for type safety

---

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

### About GPL v3

The GNU General Public License is a free, copyleft license for software. The GPL ensures that:
- Users have the freedom to use, study, share, and modify the software
- All derivative works must also be licensed under GPL v3
- Source code must be made available when distributing the software
- Any distributed copies must include the same license and copyright notice

**Key implications:**
- ✅ You can freely use, modify, and distribute this software
- ✅ You can charge for distributing the software
- ❌ You cannot close the source or make it proprietary
- ❌ You cannot sublicense or impose additional restrictions

For more information, visit: [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)

---

## 👤 Author

**AcerThyRacer**

- GitHub: [@AcerThyRacer](https://github.com/AcerThyRacer)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- AI models and providers data based on 2026 landscape research
- Theme inspirations from various design movements
- Built with modern web technologies and best practices

---

<div align="center">

**Built with AI, for AI.** 🤖✨

[⬆ Back to Top](#showmeai---ai-masterclass-2026)

</div>
