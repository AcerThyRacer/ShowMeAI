import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { Trophy, ArrowRight, Star } from 'lucide-react';

const picks = [
  {
    rank: '🥇',
    title: 'Best Overall AI Model',
    model: 'Claude Opus 4.6',
    modelId: 'claude-opus-4',
    provider: 'Anthropic',
    reason: 'Claude Opus 4.6 is my #1 recommendation for February 2026. It dominated every major benchmark — 65.4% Terminal-Bench, 80.8% SWE-bench, 72.7% OSWorld. The 1M token context window processes entire codebases, and Agent Teams let multiple AIs collaborate on your project in parallel. It discovered 500+ previously unknown security vulnerabilities during testing. Nothing else comes close for serious knowledge work.',
  },
  {
    rank: '🥈',
    title: 'Best for Everyday Use',
    model: 'GPT-5.3 Codex',
    modelId: 'gpt-5',
    provider: 'OpenAI',
    reason: 'GPT-5.3 Codex is the most capable agentic coding model OpenAI has ever built — and the first AI that helped build itself. It\'s 25% faster, handles 400K tokens of context, and covers the full dev lifecycle from debugging to deployment to slide decks. If you want a single model that does everything and does it fast, this is it.',
  },
  {
    rank: '🥉',
    title: 'Best for Developers',
    model: 'GitHub Copilot',
    modelId: 'github-copilot',
    provider: 'GitHub',
    reason: 'For developers, nothing beats Copilot in 2026. The autonomous Coding Agent can be assigned GitHub issues and independently implements fixes, runs tests, and opens PRs. Agent Skills let you define custom workflows. Native Claude Opus 4.6 and GPT-5.3 integration means you get the best models right in your IDE. It\'s not just a tool — it\'s an AI development team.',
  },
  {
    rank: '🔍',
    title: 'Best for Research',
    model: 'Perplexity Pro',
    modelId: 'perplexity-pro',
    provider: 'Perplexity AI',
    reason: 'If you need to find accurate, up-to-date information with sources you can actually verify, Perplexity Pro is unbeatable. Every claim comes with a clickable citation. It searches the live web using multiple frontier models. For students, researchers, journalists, and anyone who values truth over confidence, this is the tool.',
  },
  {
    rank: '🎨',
    title: 'Best for Image Generation',
    model: 'Midjourney v7',
    modelId: 'midjourney-v7',
    provider: 'Midjourney',
    reason: 'For pure visual quality, nothing touches Midjourney v7. The images it produces are genuinely stunning — cinematic lighting, perfect composition, and an artistic sensibility that makes every generation feel intentional. If you need images that make people stop and stare, this is the only choice.',
  },
  {
    rank: '💰',
    title: 'Best Budget Pick',
    model: 'DeepSeek V3 / R1',
    modelId: 'deepseek-v3',
    provider: 'DeepSeek',
    reason: 'DeepSeek proves you don\'t need an expensive subscription for frontier-quality AI. Its math and coding capabilities rival models costing 10x more, and it\'s free or near-free for most use cases. If you\'re cost-conscious but still want serious AI power, start here.',
  },
];

export const PersonalPicks: React.FC = () => {
  const { theme } = useTheme();
  const { containerVariants, getItemVariants } = useThemeAnimations();

  return (
    <div className="py-20 px-8 relative z-10 theme-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-[var(--accent-color)] text-sm font-medium mb-6">
            <Star size={16} /> Editor's Picks
          </div>
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
            My <span className="text-[var(--accent-color)]">Personal Recommendations</span>
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            After extensively testing every major AI model in 2026, here are my honest picks for each category.
          </p>
        </motion.div>

        <div className="space-y-6">
          {picks.map((pick, index) => (
            <motion.div
              key={pick.modelId}
              variants={getItemVariants(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link
                to={`/models/${pick.modelId}`}
                className="theme-card block p-6 md:p-8 rounded-2xl bg-[var(--secondary-color)]/70 backdrop-blur border border-[var(--accent-color)]/15 hover:border-[var(--accent-color)] transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  <div className="flex items-center gap-3 md:flex-col md:items-center md:min-w-[100px]">
                    <span className="text-4xl">{pick.rank}</span>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-50 text-center">{pick.title}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold group-hover:text-[var(--accent-color)] transition-colors">
                        {pick.model}
                      </h3>
                      <span className="text-sm opacity-50">by {pick.provider}</span>
                    </div>
                    <p className="opacity-75 leading-relaxed text-sm md:text-base">
                      {pick.reason}
                    </p>
                  </div>
                  <div className="flex items-center text-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity self-center">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm opacity-50 mb-4">
            These are personal opinions based on extensive real-world testing. Your ideal model depends on your specific use case.
          </p>
          <Link
            to="/models"
            className="inline-flex items-center gap-2 text-[var(--accent-color)] hover:underline font-medium"
          >
            <Trophy size={16} /> Compare all 13 models yourself <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
