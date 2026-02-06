import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { ThemeBackground } from './components/backgrounds/ThemeBackground';
import { Hero } from './components/Hero';
import { AiGuide } from './components/AiGuide';
import { ModelRecommender } from './components/ModelRecommender';
import { PersonalPicks } from './components/PersonalPicks';
import { ModelsGrid } from './components/ModelsGrid';
import { ModelPage } from './components/ModelPage';
import { ProvidersGrid } from './components/ProvidersGrid';
import { ProviderPage } from './components/ProviderPage';
import { HowToUseAI } from './components/HowToUseAI';

function HomePage() {
  return (
    <>
      <Hero />
      <AiGuide />
      <ModelRecommender />
      <PersonalPicks />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen relative">
          <ThemeBackground />
          <ScrollToTop />
          <Navbar />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/models" element={<ModelsGrid />} />
              <Route path="/models/:id" element={<ModelPage />} />
              <Route path="/providers" element={<ProvidersGrid />} />
              <Route path="/providers/:id" element={<ProviderPage />} />
              <Route path="/ai-guide" element={<HowToUseAI />} />
            </Routes>
            <footer className="py-8 text-center opacity-50 text-sm">
              <p>© 2026 AI Masterclass. Built with React & Tailwind CSS.</p>
            </footer>
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
