import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, PenTool, Image as ImageIcon, Search, BarChart, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';

const tasks = [
  {
    id: 'coding',
    label: 'Coding & Dev',
    icon: Code,
    bestModel: 'Claude Opus 4.6',
    bestModelId: 'claude-opus-4',
    alternatives: ['GPT-5.3 Codex', 'GitHub Copilot', 'DeepSeek V3'],
    desc: "The benchmark king — 65.4% Terminal-Bench, 80.8% SWE-bench, and a 1M token context that handles entire codebases. Agent Teams let multiple AIs collaborate on your project in parallel."
  },
  {
    id: 'creative',
    label: 'Creative Writing',
    icon: PenTool,
    bestModel: 'GPT-5.3 Codex',
    bestModelId: 'gpt-5',
    alternatives: ['Claude Opus 4.6', 'Gemini 3 Pro'],
    desc: "The self-improving agentic model that helped build itself. Its full-lifecycle capabilities extend to documentation, slide decks, and creative workflows beyond pure coding."
  },
  {
    id: 'reasoning',
    label: 'Logic & Math',
    icon: BarChart,
    bestModel: 'Grok 4.1',
    bestModelId: 'grok-4',
    alternatives: ['DeepSeek R1', 'GPT-5.3 Codex', 'Claude Opus 4.6'],
    desc: "DeepChain multi-step reasoning with the Enterprise Heavy variant for complex analysis. Real-time X integration and human-like conversational intelligence."
  },
  {
    id: 'vision',
    label: 'Image Generation',
    icon: ImageIcon,
    bestModel: 'Midjourney v7',
    bestModelId: 'midjourney-v7',
    alternatives: ['DALL-E 4', 'Stable Diffusion 3'],
    desc: "The gold standard for artistic quality and photorealism in 2026. Magazine-level visuals with cinematic lighting, 92% prompt adherence, and powerful style consistency."
  },
  {
    id: 'research',
    label: 'Web Research',
    icon: Search,
    bestModel: 'Perplexity Pro',
    bestModelId: 'perplexity-pro',
    alternatives: ['Gemini 3 Pro', 'Grok 4.1'],
    desc: "Real-time web search with verified inline citations. Uses multiple frontier models to synthesize accurate, source-linked answers for any research question."
  }
];

export const ModelRecommender: React.FC = () => {
  const { theme } = useTheme();
  const { containerVariants, panelVariants } = useThemeAnimations();
  const [selectedTask, setSelectedTask] = useState(tasks[0]);

  return (
    <div className="py-20 px-8 bg-[var(--secondary-color)]/30 relative z-10 theme-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
            Best Models for <span className="text-[var(--accent-color)]">Every Task</span>
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Select a task to see our top 2026 recommendation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all text-left ${
                  selectedTask.id === task.id
                    ? 'bg-[var(--accent-color)] text-white shadow-lg scale-105'
                    : 'bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/80'
                }`}
              >
                <task.icon size={24} />
                <span className="font-bold text-lg">{task.label}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTask.id}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full bg-[var(--bg-color)] p-8 rounded-2xl border-2 border-[var(--accent-color)] shadow-2xl relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-[var(--accent-color)] mb-4">
                    <selectedTask.icon size={48} />
                  </div>

                  <h3 className="text-3xl font-bold mb-2">Top Pick: {selectedTask.bestModel}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-sm opacity-60 uppercase tracking-wider font-semibold">Alternatives:</span>
                    {selectedTask.alternatives.map((alt, i) => (
                      <span key={i} className="text-sm px-2 py-1 rounded bg-[var(--secondary-color)] border border-[var(--text-color)]/20">
                        {alt}
                      </span>
                    ))}
                  </div>

                  <p className="text-lg leading-relaxed opacity-90 mb-6">
                    {selectedTask.desc}
                  </p>

                  <Link
                    to={`/models/${selectedTask.bestModelId}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-color)] text-white rounded-lg hover:brightness-110 transition-all text-sm font-medium"
                  >
                    Read full essay <ArrowRight size={14} />
                  </Link>
                </div>

                <selectedTask.icon
                  size={300}
                  className="absolute -bottom-10 -right-10 opacity-5 text-[var(--accent-color)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA to see all models */}
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="text-center mt-12"
        >
          <Link
            to="/models"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--secondary-color)] border-2 border-[var(--accent-color)] rounded-full font-bold text-lg hover:bg-[var(--accent-color)]/10 transition-all"
          >
            View All 13 AI Models <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
