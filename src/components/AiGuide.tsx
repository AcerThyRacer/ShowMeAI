import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, Brain, Target, ShieldCheck, Layers, Cpu, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';

const steps = [
  {
    icon: MessageSquare,
    title: "Prompt Engineering",
    desc: "Be specific. Assign a persona. Provide context and examples. The quality of output depends entirely on the quality of input — clear, structured instructions yield dramatically better results."
  },
  {
    icon: Brain,
    title: "Iterative Refinement",
    desc: "Don't settle for the first answer. Ask follow-up questions, request self-critique, and refine your prompts based on initial outputs. The best results come from conversation, not one-shots."
  },
  {
    icon: Target,
    title: "Task-Specific Selection",
    desc: "Use Claude Opus for coding, Midjourney for art, Perplexity for research. Choosing the right model for each task is as important as how you prompt it."
  },
  {
    icon: ShieldCheck,
    title: "Verification & Safety",
    desc: "AI can hallucinate confidently. Always verify facts for critical tasks. Treat AI as a brilliant but unreliable intern, not an infallible oracle."
  },
  {
    icon: Layers,
    title: "Multi-Model Workflows",
    desc: "Combine models for best results — use a reasoning model to plan, a coding model to implement, and a review model to check. The future is orchestration, not single-model dependence."
  },
  {
    icon: Cpu,
    title: "Agentic AI",
    desc: "In 2026, AI agents can autonomously execute multi-step tasks. Learn to delegate effectively — assign issues to Copilot, schedule research with Perplexity, and let agents handle the routine."
  }
];

export const AiGuide: React.FC = () => {
  const { theme } = useTheme();
  const { getItemVariants, containerVariants } = useThemeAnimations();

  return (
    <div id="guide" className="py-20 px-8 relative z-10 theme-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
            How to Use AI <span className="text-[var(--accent-color)]">Properly</span> in 2026
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Unlock the full potential of artificial intelligence with these core principles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={getItemVariants(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4 }}
              className="theme-card p-6 rounded-2xl bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all group"
            >
              <div className="p-3 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] group-hover:bg-[var(--accent-color)] group-hover:text-white transition-colors w-fit mb-4">
                <step.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="opacity-75 leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/ai-guide"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-color)] text-white rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-[var(--accent-color)]/20"
          >
            Read the Full AI Mastery Guide <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
