# ShowMeAI - AI Masterclass

Welcome to **AI Masterclass**, a comprehensive, interactive guide designed to teach users how to **PROPERLY** use AI and discover the **BEST** AI models for every task.

This project is a modern, responsive React application featuring a dynamic theme system (Dark, Light, Rave, Neon, Hacker) with immersive, theme-aware animations that adapt to the user's aesthetic choice.

## 🌟 Key Features

### 🎨 Immersive Theming System
Switch between 5 unique themes, each with its own visual identity, background simulation, and scroll animations:
*   🌙 **Dark:** Sleek, professional, and easy on the eyes.
*   ☀️ **Light:** Clean, minimal, and high-contrast.
*   🎉 **Rave:** Vibrant colors, particle effects, and **bouncy spring animations**.
*   🌃 **Neon:** Cyberpunk aesthetic with glowing lines and **glow/blur scroll effects**.
*   💻 **Hacker:** Matrix-style digital rain with **glitch-style entry animations**.

### ⚡ Interactive Elements
*   **Intensity Control:** A slider to adjust the speed and density of background animations (e.g., matrix rain speed, particle count).
*   **Theme-Aware Motion:** Components enter the viewport with animations matching the active theme (e.g., glitching in for Hacker, bouncing in for Rave).
*   **Smooth Transitions:** Motion blur and fade effects when navigating or scrolling.

### 📚 Comprehensive AI Content
*   **Interactive Guide:** Step-by-step principles on how to use AI effectively (Prompt Engineering, Iterative Refinement, Multi-Model Workflows).
*   **Model Directory:** Detailed profiles of top AI models (GPT-5.3, Claude Opus 4.6, Gemini 3 Pro, DeepSeek V3, etc.) including essays, strengths/weaknesses lists, and pricing.
*   **Provider Profiles:** Deep dives into key AI organizations (OpenAI, Anthropic, Google, xAI, etc.).
*   **Task-Based Recommendations:** Smart logic to recommend the best model for Coding, Creative Writing, Logic, and more.
*   **Personal Picks:** Curated "Editor's Choice" recommendations for specific categories (Best Overall, Best Budget, Best for Devs).

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/AcerThyRacer/ShowMeAI.git
    cd ShowMeAI
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5555`.

## 🛠️ Tech Stack

*   **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/) + HTML5 Canvas
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Routing:** [React Router](https://reactrouter.com/)

## 📂 Project Structure

```
src/
├── components/          # UI Components
│   ├── backgrounds/     # Canvas-based theme backgrounds
│   └── ...
├── context/             # React Context (Theme, etc.)
├── data/                # Static data for Models & Providers
├── hooks/               # Custom hooks (useThemeAnimations)
└── ...
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**AcerThyRacer**

*   GitHub: [@AcerThyRacer](https://github.com/AcerThyRacer)

---
*Built with AI, for AI.*
