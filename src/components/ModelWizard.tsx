import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { aiModels } from '../data/models';
import { Wand2, ArrowLeft, RotateCcw, ChevronRight, Share2 } from 'lucide-react';
import { useToast } from './Toast';
import { SEO } from './SEO';

interface Question {
  id: string;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

const questions: Question[] = [
  {
    id: 'useCase',
    question: "What's your primary use case?",
    options: [
      { label: 'Coding & Software', value: 'coding', emoji: '💻' },
      { label: 'Writing & Content', value: 'creative', emoji: '✍️' },
      { label: 'Data Analysis', value: 'reasoning', emoji: '📊' },
      { label: 'Research', value: 'research', emoji: '🔬' },
      { label: 'Business / Enterprise', value: 'enterprise', emoji: '🏢' },
      { label: 'Image / Video Generation', value: 'multimodal', emoji: '🎨' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    options: [
      { label: 'Free / Open Source', value: 'free', emoji: '🆓' },
      { label: 'Low Cost (Under $100/mo)', value: 'low', emoji: '💰' },
      { label: 'Enterprise Budget', value: 'enterprise', emoji: '🏦' },
      { label: 'No Limit', value: 'any', emoji: '💎' },
    ],
  },
  {
    id: 'local',
    question: 'Do you need local / on-premise deployment?',
    options: [
      { label: 'Yes, must run locally', value: 'yes', emoji: '🖥️' },
      { label: 'No, cloud is fine', value: 'no', emoji: '☁️' },
      { label: "Don't care", value: 'any', emoji: '🤷' },
    ],
  },
  {
    id: 'speed',
    question: 'How important is response speed?',
    options: [
      { label: 'Critical — need sub-second', value: 'critical', emoji: '⚡' },
      { label: 'Nice to have', value: 'nice', emoji: '🏃' },
      { label: 'Not important — quality first', value: 'notimportant', emoji: '🧠' },
    ],
  },
  {
    id: 'multimodal',
    question: 'Do you need multimodal capabilities?',
    options: [
      { label: 'Text only', value: 'text', emoji: '📝' },
      { label: 'Images + Text', value: 'image', emoji: '🖼️' },
      { label: 'Video + Audio + Text', value: 'video', emoji: '🎬' },
      { label: 'Everything', value: 'all', emoji: '🌐' },
    ],
  },
];

function scoreModel(model: typeof aiModels[number], answers: Record<string, string>): number {
  let score = 0;

  // Use case match
  if (answers.useCase && model.category.includes(answers.useCase)) score += 30;
  if (answers.useCase === 'coding' && model.category.includes('autonomous')) score += 10;

  // Budget match
  const pricing = model.pricing.toLowerCase();
  if (answers.budget === 'free') {
    if (pricing.includes('free') || pricing.includes('open') || model.category.includes('open-source')) score += 25;
  } else if (answers.budget === 'low') {
    if (pricing.includes('$0.') || pricing.includes('$1') || pricing.includes('$2') || pricing.includes('included')) score += 20;
  } else if (answers.budget === 'enterprise') {
    if (pricing.includes('enterprise') || pricing.includes('tier') || pricing.includes('seat')) score += 20;
  } else {
    score += 10; // any budget
  }

  // Local deployment
  if (answers.local === 'yes') {
    if (model.category.includes('open-source') || model.category.includes('open-weights') || model.category.includes('local') || model.category.includes('edge')) score += 25;
  } else {
    score += 10;
  }

  // Speed
  if (answers.speed === 'critical') {
    if (model.category.includes('speed') || model.category.includes('edge') || model.name.toLowerCase().includes('flash') || model.name.toLowerCase().includes('mini')) score += 20;
  } else if (answers.speed === 'notimportant') {
    if (model.category.includes('reasoning') || model.strengths.length >= 4) score += 15;
  } else {
    score += 8;
  }

  // Multimodal
  if (answers.multimodal === 'video' || answers.multimodal === 'all') {
    if (model.category.includes('multimodal') || model.category.includes('video') || model.category.includes('image')) score += 20;
  } else if (answers.multimodal === 'image') {
    if (model.category.includes('multimodal') || model.category.includes('image')) score += 15;
  } else {
    score += 5;
  }

  // Bonus for more strengths
  score += model.strengths.length * 2;

  return score;
}

export const ModelWizard: React.FC = () => {
  const { theme } = useTheme();
  const { panelVariants } = useThemeAnimations();
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setTimeout(() => setShowResults(true), 200);
    }
  };

  const recommendations = useMemo(() => {
    if (!showResults) return [];
    return aiModels
      .map(m => ({ model: m, score: scoreModel(m, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [showResults, answers]);

  const restart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const shareResults = () => {
    const params = new URLSearchParams(answers);
    navigator.clipboard.writeText(`${window.location.origin}/wizard?${params.toString()}`);
    showToast('Wizard result link copied!', 'success');
  };

  const currentQuestion = questions[step];
  const progress = ((step + (showResults ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <SEO title="Model Selector Wizard" description="Answer 5 questions and get personalized AI model recommendations." path="/wizard" />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div variants={panelVariants} initial="hidden" animate="visible">
          <div className="text-center mb-12">
            <Wand2 size={48} className="mx-auto mb-4 text-[var(--accent-color)]" />
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
              Model <span className="text-[var(--accent-color)]">Wizard</span>
            </h1>
            <p className="text-lg opacity-80">Answer 5 questions. Get your perfect AI model.</p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-[var(--secondary-color)] mb-8 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[var(--accent-color)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-8">
                  <span className="text-sm opacity-50 mb-2 block">Question {step + 1} of {questions.length}</span>
                  <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        answers[currentQuestion.id] === opt.value
                          ? 'bg-[var(--accent-color)]/15 border-[var(--accent-color)]'
                          : 'bg-[var(--secondary-color)]/60 border-[var(--accent-color)]/10 hover:border-[var(--accent-color)]/50'
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} className="mt-6 flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition-opacity">
                    <ArrowLeft size={14} /> Previous question
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-2 text-center">🎯 Your Top Recommendations</h2>
                <p className="text-center opacity-60 mb-8">Based on your answers, here are the best models for you:</p>

                <div className="space-y-4 mb-8">
                  {recommendations.map(({ model, score }, i) => (
                    <Link
                      key={model.id}
                      to={`/models/${model.id}`}
                      className="block p-6 rounded-2xl bg-[var(--secondary-color)]/80 border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-center">
                          <span className="text-3xl block">{model.icon}</span>
                          <span className={`text-xs font-bold mt-1 block ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : 'text-orange-400'}`}>
                            #{i + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold group-hover:text-[var(--accent-color)] transition-colors">{model.name}</h3>
                            {i === 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 font-bold">Best Match</span>}
                          </div>
                          <p className="text-sm opacity-60">{model.provider} · {model.tagline}</p>
                          <p className="text-sm opacity-70 mt-2">{model.description}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                              <div className="h-full rounded-full bg-[var(--accent-color)]" style={{ width: `${Math.min(100, score)}%` }} />
                            </div>
                            <span className="text-xs font-bold text-[var(--accent-color)]">{score}pts</span>
                          </div>
                        </div>
                        <ChevronRight size={20} className="opacity-30 group-hover:opacity-100 transition-opacity mt-2" />
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="flex justify-center gap-4">
                  <button onClick={restart} className="px-6 py-3 rounded-lg bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 font-medium flex items-center gap-2 hover:border-[var(--accent-color)] transition-all">
                    <RotateCcw size={16} /> Start Over
                  </button>
                  <button onClick={shareResults} className="px-6 py-3 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 font-medium flex items-center gap-2 hover:bg-[var(--accent-color)]/20 transition-all">
                    <Share2 size={16} /> Share Results
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
