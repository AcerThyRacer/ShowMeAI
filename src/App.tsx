import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { ThemeBackground } from './components/backgrounds/ThemeBackground';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { ComparisonBar } from './components/ComparisonBar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { PageTransition } from './components/PageTransition';
import { SkeletonPage } from './components/Skeleton';
import { SEO } from './components/SEO';

// Eagerly loaded homepage components (above the fold)
import { Hero } from './components/Hero';
import { AiGuide } from './components/AiGuide';
import { ModelRecommender } from './components/ModelRecommender';
import { PersonalPicks } from './components/PersonalPicks';

// Code-split route components
const ModelsGrid = lazy(() => import('./components/ModelsGrid').then(m => ({ default: m.ModelsGrid })));
const ModelPage = lazy(() => import('./components/ModelPage').then(m => ({ default: m.ModelPage })));
const ProvidersGrid = lazy(() => import('./components/ProvidersGrid').then(m => ({ default: m.ProvidersGrid })));
const ProviderPage = lazy(() => import('./components/ProviderPage').then(m => ({ default: m.ProviderPage })));
const HowToUseAI = lazy(() => import('./components/HowToUseAI').then(m => ({ default: m.HowToUseAI })));
const CompareModels = lazy(() => import('./components/CompareModels').then(m => ({ default: m.CompareModels })));
const Playground = lazy(() => import('./components/Playground').then(m => ({ default: m.Playground })));
const OmegaPrompt = lazy(() => import('./components/OmegaPrompt').then(m => ({ default: m.OmegaPrompt })));
const PromptLibrary = lazy(() => import('./components/PromptLibrary').then(m => ({ default: m.PromptLibrary })));
const FavoritesPage = lazy(() => import('./components/FavoritesPage').then(m => ({ default: m.FavoritesPage })));
const AdvancedSearch = lazy(() => import('./components/AdvancedSearch').then(m => ({ default: m.AdvancedSearch })));
const ComparisonMatrix = lazy(() => import('./components/ComparisonMatrix').then(m => ({ default: m.ComparisonMatrix })));
const ModelWizard = lazy(() => import('./components/ModelWizard').then(m => ({ default: m.ModelWizard })));
const PricingCalculator = lazy(() => import('./components/PricingCalculator').then(m => ({ default: m.PricingCalculator })));
const ThemeCustomizer = lazy(() => import('./components/ThemeCustomizer').then(m => ({ default: m.ThemeCustomizer })));
const NotFound = lazy(() => import('./components/NotFound').then(m => ({ default: m.NotFound })));

function HomePage() {
  return (
    <>
      <SEO />
      <Hero />
      <AiGuide />
      <ModelRecommender />
      <PersonalPicks />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition locationKey={location.pathname}>
      <Suspense fallback={<SkeletonPage />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/models" element={<><SEO title="AI Models Directory" description="Browse every major AI model in 2026 with in-depth essays and comparisons." path="/models" /><ModelsGrid /></>} />
          <Route path="/models/:id" element={<ModelPage />} />
          <Route path="/providers" element={<><SEO title="AI Providers" description="Explore the companies building the future of AI — from OpenAI to Anthropic to Meta." path="/providers" /><ProvidersGrid /></>} />
          <Route path="/providers/:id" element={<ProviderPage />} />
          <Route path="/ai-guide" element={<><SEO title="How to Use AI Correctly" description="Master AI with custom prompts, hooks, presets, and the OMEGA-SENTINEL configuration." path="/ai-guide" /><HowToUseAI /></>} />
          <Route path="/compare" element={<><SEO title="Compare AI Models" description="Side-by-side comparison of any two AI models — benchmarks, pricing, strengths, and weaknesses." path="/compare" /><CompareModels /></>} />
          <Route path="/playground" element={<><SEO title="AI Playground" description="Try out AI models with preset prompts and see simulated responses in real time." path="/playground" /><Playground /></>} />
          <Route path="/omega-prompt" element={<><SEO title="The Omega Prompt Setup" description="The definitive guide to setting up Claude Code with the Omega Prompt for maximum intelligence." path="/omega-prompt" /><OmegaPrompt /></>} />
          <Route path="/prompt-library" element={<><SEO title="Prompt Template Library" description="50+ curated prompt templates for every AI task - coding, writing, analysis, business, learning, and more." path="/prompt-library" /><PromptLibrary /></>} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<AdvancedSearch />} />
          <Route path="/matrix" element={<><SEO title="Comparison Matrix" description="Side-by-side multi-model comparison matrix." path="/matrix" /><ComparisonMatrix /></>} />
          <Route path="/wizard" element={<ModelWizard />} />
          <Route path="/pricing" element={<PricingCalculator />} />
          <Route path="/customize" element={<ThemeCustomizer />} />
          <Route path="*" element={<><SEO title="Page Not Found" description="The page you're looking for doesn't exist." /><NotFound /></>} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ToastProvider>
            <FavoritesProvider>
              <ComparisonProvider>
                <div className="min-h-screen relative">
                  <ThemeBackground />
                  <ScrollToTop />
                  <ScrollProgressBar />
                  <Navbar />
                  <KeyboardShortcuts />
                  <div className="relative z-10">
                    <AnimatedRoutes />
                    <footer className="py-8 text-center opacity-50 text-sm">
                      <p>© 2026 AI Masterclass. Built with React & Tailwind CSS.</p>
                    </footer>
                  </div>
                  <ComparisonBar />
                </div>
              </ComparisonProvider>
            </FavoritesProvider>
          </ToastProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
