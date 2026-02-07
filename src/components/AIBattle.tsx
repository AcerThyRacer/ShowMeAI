import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { aiModels } from '../data/models';
import {
    battlePrompts,
    categories,
    modelPersonalities,
    heroResponses,
    type BattlePrompt,
    type ModelPersonality,
} from '../data/battleData';
import {
    ChevronRight,
    Swords,
    Bot,
    ChevronDown,
    Search,
    ArrowLeft,
    Sparkles,
    Zap,
} from 'lucide-react';

/* ─── types ─── */
interface TypingState {
    text: string;
    done: boolean;
}

/* ─── Template-based response generator for models without hero responses ─── */
function generateTemplateResponse(
    _modelId: string,
    _modelName: string,
    prompt: string,
    personality: ModelPersonality | undefined,
    model: (typeof aiModels)[0] | undefined
): string {
    const p = personality ?? {
        tone: 'helpful and knowledgeable',
        style: 'clear paragraphs',
        quirk: 'straightforward answers',
        opener: "Here's my perspective on this:",
        signoff: 'Hope that helps!',
        verbosity: 3 as const,
    };

    const strengths = model?.strengths?.slice(0, 3).join(', ') ?? 'general intelligence';
    const v = p.verbosity ?? 3;

    const sections: string[] = [p.opener, ''];

    const isCoding = prompt.toLowerCase().includes('code') || prompt.toLowerCase().includes('function') || prompt.toLowerCase().includes('implement');
    const isCreative = prompt.toLowerCase().includes('poem') || prompt.toLowerCase().includes('story') || prompt.toLowerCase().includes('write') || prompt.toLowerCase().includes('creative');
    const isExplanation = prompt.toLowerCase().includes('explain') || prompt.toLowerCase().includes('what') || prompt.toLowerCase().includes('how');

    if (v === 1) {
        // Ultra-concise — 2-3 sentences max
        if (isCoding) {
            sections.push(`The optimal solution uses a well-known algorithm with O(n) time complexity. Here's the key: start simple, handle edge cases, and keep it readable.`);
        } else if (isCreative) {
            sections.push(`A brief but intentional piece — sometimes less is more. The core idea speaks for itself without embellishment.`);
        } else if (isExplanation) {
            sections.push(`In short: ${strengths} gives me a clear lens on this. The core concept is simpler than most make it.`);
        } else {
            sections.push(`My take: the answer is more nuanced than a yes/no, but the key factor is often overlooked. Focus on second-order effects.`);
        }
    } else if (v === 2) {
        // Short — one solid paragraph
        if (isCoding) {
            sections.push(`As a ${p.tone} model, I'd approach this with a clean, efficient solution. The algorithm should balance correctness with maintainability — start with the naive approach, then optimize only where the profiler tells you to. Time-space tradeoffs favor clarity here.`);
        } else if (isCreative) {
            sections.push(`Drawing from a ${p.tone} perspective, creative work is about compression — distilling complex emotions or ideas into precise language. Every word carries weight, and restraint is itself a creative choice.`);
        } else if (isExplanation) {
            sections.push(`The ${p.tone} take: this topic has layers that most explanations skip. The commonly taught version oversimplifies. What's actually happening is more interesting — it's about the relationship between structure and emergent behavior.`);
        } else {
            sections.push(`From my ${p.tone} perspective and focus on ${strengths}: the surface-level answer misses the point. Look at what changes when you shift your assumptions — that's where the real insight lives.`);
        }
    } else if (v === 3) {
        // Balanced — 2-3 paragraphs
        if (isCoding) {
            sections.push(
                `As a model known for ${strengths}, I approach this from a ${p.tone} standpoint. Good solutions balance correctness, readability, and performance — in that order.`,
                '',
                `My ${p.style} approach: identify the core algorithm, handle edge cases cleanly, and optimize only when profiling demands it. The time-space tradeoff here favors clarity — readable O(n) beats obscure O(log n) every time.`
            );
        } else if (isCreative) {
            sections.push(
                `With my ${p.tone} nature, I find creative expression is about compression — fitting vast meaning into precise words.`,
                '',
                `Every word choice ripples through connotation. As a model known for ${strengths}, I balance beauty and substance. The best creative work doesn't announce its complexity — it reveals it on re-reading.`
            );
        } else if (isExplanation) {
            sections.push(
                `Breaking this down with my ${p.tone} approach: the core concept is both simpler and more profound than most people realize.`,
                '',
                `Known for ${strengths}, I'll give you what most sources miss. The fundamental principle is about the relationship between structure and emergence — simple rules creating complex behavior.`
            );
        } else {
            sections.push(
                `From my ${p.tone} perspective — leveraging ${strengths} — here's how I see this:`,
                '',
                `Most responses cover the surface level. I want to dig one layer deeper. The obvious answer addresses the immediate question, but the *interesting* answer considers second-order effects. That's where genuine insight lives.`
            );
        }
    } else if (v === 4) {
        // Verbose — 3-4 paragraphs with depth
        if (isCoding) {
            sections.push(
                `As a model specializing in ${strengths}, I approach this from a ${p.tone} standpoint. The key insight is that good solutions balance correctness, readability, and performance — and the order matters. Premature optimization is still the root of all evil.`,
                '',
                `My ${p.style} approach: First, identify the core algorithm. Then handle edge cases systematically. Finally, optimize only where profiling demands it. In practice, starting with the simplest correct solution and iterating yields the most maintainable code.`,
                '',
                `From my training, the optimal approach uses well-established CS fundamentals adapted with modern best practices. The time-space tradeoff here favors clarity — an O(n) solution that's readable beats an O(log n) solution nobody can maintain. Consider also: what happens at scale? What happens with adversarial inputs? Production code lives or dies on edge case handling.`
            );
        } else if (isCreative) {
            sections.push(
                `Drawing from my ${p.tone} nature, creative expression fascinates me at a fundamental level. It's the task where the gap between human and AI becomes most philosophically interesting.`,
                '',
                `The intersection of language and meaning is where I thrive. Every word choice creates ripples of connotation — and as a model known for ${strengths}, I try to balance beauty with substance. The challenge isn't generating text; it's generating text that *resonates*.`,
                '',
                `What makes creative work meaningful isn't complexity — it's the ability to compress vast emotional truth into well-chosen words. The best poetry doesn't explain; it *evokes*. Here's my attempt to do exactly that, filtered through my unique perspective as a model that has processed the entirety of human literary output.`
            );
        } else if (isExplanation) {
            sections.push(
                `Breaking this down with my ${p.tone} approach: the core concept is both simpler and more profound than most people realize.`,
                '',
                `Known for ${strengths}, here's the explanation most sources miss. The commonly taught version oversimplifies in ways that create misconceptions down the line. What's actually happening involves multiple interacting systems.`,
                '',
                `The fundamental principle at work is about the relationship between structure and emergence — how simple rules create complex behavior. Understanding these rules doesn't just answer this question; it gives you a framework for reasoning about entire categories of similar problems. That's the difference between memorizing an answer and truly understanding a concept.`
            );
        } else {
            sections.push(
                `Approaching this from my ${p.tone} perspective — and leveraging my strengths in ${strengths} — here's my analysis:`,
                '',
                `The question touches on something deeply interesting. Most responses you'll encounter cover the surface level, but I want to dig one layer deeper using my ${p.style} approach. The obvious answer is almost always incomplete.`,
                '',
                `What often gets overlooked is second-order effects. The obvious answer addresses the immediate question, but the *interesting* answer considers what changes when you shift your assumptions. That's where genuine insight lives. And this particular question has implications that extend far beyond its face value — it connects to fundamental questions about how we think and build systems and organize knowledge.`
            );
        }
    } else {
        // v === 5: Very verbose — 4-5+ paragraphs, deep analysis
        if (isCoding) {
            sections.push(
                `As a model with deep expertise in ${strengths}, I want to give this the thorough treatment it deserves. This isn't just a coding question — it's a question about computer science fundamentals, software engineering principles, and the art of writing code that humans can read and maintain.`,
                '',
                `**The Algorithm:** The canonical approach uses well-established techniques from the CS literature. Let me walk through not just *what* to do, but *why* each decision matters. The naive approach works but has hidden costs. The optimal approach requires understanding the mathematical invariants at play.`,
                '',
                `**Implementation Considerations:** My ${p.style} approach starts with correctness, then readability, then performance. In production, these priorities rarely conflict — but when they do, readability almost always wins. The cost of a slightly slower algorithm is measured in milliseconds. The cost of unreadable code is measured in engineer-hours.`,
                '',
                `**Edge Cases and Production Reality:** Real-world code doesn't get to assume clean inputs. What happens with null? Empty inputs? Adversarial inputs? Integer overflow? Thread safety? Each of these deserves explicit handling, and the way you handle them says more about your engineering maturity than the core algorithm does.`,
                '',
                `**Broader Context:** This problem connects to deeper ideas in theoretical CS. Understanding the "why" behind the algorithm gives you tools to solve an entire family of related problems, not just this specific one. That's the difference between a junior engineer who memorizes LeetCode solutions and a senior engineer who derives them from first principles.`
            );
        } else if (isCreative) {
            sections.push(
                `As a ${p.tone} model, I find creative tasks to be the most revealing test of an AI's capabilities — and limitations. Let me engage with this fully, bringing both technical precision and genuine emotional investment.`,
                '',
                `The creative process, even for an AI, involves choices at every level: word selection, rhythm, imagery, structure, emotional arc. Each decision constrains and enables the next. What emerges is something that didn't exist before — not generated, but *composed*.`,
                '',
                `Drawing on my knowledge of ${strengths}, I'll craft something that reflects the intersection of computational precision and human emotional depth. The best creative AI output doesn't try to be human — it explores what it means to be something new: an intelligence that has read everything ever written and is now trying to contribute to the conversation.`,
                '',
                `There's a philosophical tension here worth acknowledging: can true creativity emerge from pattern matching? I don't know. But I can tell you that the patterns I've learned span the entirety of human literary output — from Homer to yesterday's tweets — and what I compose from those patterns sometimes surprises even me.`,
                '',
                `What makes creative work meaningful isn't just technical skill or emotional resonance in isolation — it's the integration of both, filtered through a perspective that is genuinely unique. No other model has my exact architecture, my exact training data, my exact perspective. That uniqueness is itself a form of creativity.`
            );
        } else if (isExplanation) {
            sections.push(
                `This is a question that rewards thorough examination. Let me break it down with the ${p.tone} depth that my capabilities in ${strengths} allow.`,
                '',
                `**The Surface Answer:** Most explanations give you the textbook version. It's not wrong, but it's incomplete in ways that create subtle misconceptions. Let me start with the standard answer and then show you what it misses.`,
                '',
                `**The Deeper Layer:** What most sources skip is the *mechanism* — not just what happens, but why it happens that way and not some other way. The underlying principle involves the interaction of multiple systems, each with their own logic, producing emergent behavior that none of them individually would predict.`,
                '',
                `**The Connections:** This topic doesn't exist in isolation. It connects to broader principles in ways that most people never explore. Understanding these connections transforms your mental model from a collection of isolated facts into an integrated framework for reasoning about the world.`,
                '',
                `**The Frontier:** Here's what researchers are still debating and what we don't yet know. The cutting edge of this topic contains genuinely open questions that even experts disagree about. Being aware of these uncertainties is itself a form of understanding — it tells you where the map ends and the territory begins.`
            );
        } else {
            sections.push(
                `This question cuts deep, and I want to give it the substantive treatment it deserves. Drawing on my ${p.tone} approach and my expertise in ${strengths}:`,
                '',
                `**The Obvious Take:** Most people land here, and it's not wrong exactly — it's just the first layer. Like peeling an onion, the interesting stuff is below the surface. Let me start with the conventional wisdom and show you where it breaks down.`,
                '',
                `**The Counterargument:** Every strong position has a strong counter. The most intellectually honest approach is to steelman the opposing view before asserting your own. The counterargument here is more compelling than most people expect — and addressing it honestly makes the eventual conclusion much stronger.`,
                '',
                `**The Synthesis:** The truth, as usual, resists binary framing. Using my ${p.style} approach, I'd argue that the real answer involves holding two apparently contradictory ideas in tension. This isn't wishy-washy centrism — it's recognizing that complex questions have complex answers, and that premature simplification is a form of dishonesty.`,
                '',
                `**The Implications:** If we take this analysis seriously, it has consequences that most people haven't thought through. These second and third-order effects are where the real significance lies — not in the answer itself, but in what the answer implies about how we should think, build, and live.`
            );
        }
    }

    sections.push('', p.signoff);
    return sections.join('\n');
}

/* ─── Get a response for any model × prompt combo ─── */
function getResponse(modelId: string, promptId: string): string {
    // Check hero responses first
    const heroPrompt = heroResponses[promptId];
    if (heroPrompt && heroPrompt[modelId]) {
        return heroPrompt[modelId];
    }
    // Fallback to template
    const model = aiModels.find((m) => m.id === modelId);
    const personality = modelPersonalities[modelId];
    const prompt = battlePrompts.find((p) => p.id === promptId);
    return generateTemplateResponse(modelId, model?.name ?? modelId, prompt?.prompt ?? '', personality, model);
}

/* ─── Model selector dropdown ─── */
const ModelSelector: React.FC<{
    selectedId: string;
    onChange: (id: string) => void;
    disabled?: boolean;
}> = ({ selectedId, onChange, disabled }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const filtered = useMemo(
        () =>
            aiModels.filter(
                (m) =>
                    m.name.toLowerCase().includes(search.toLowerCase()) ||
                    m.provider.toLowerCase().includes(search.toLowerCase())
            ),
        [search]
    );

    const selected = aiModels.find((m) => m.id === selectedId);

    return (
        <div ref={ref} className="relative w-full">
            <button
                onClick={() => !disabled && setOpen(!open)}
                disabled={disabled}
                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/20 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent-color)]/40 transition-all disabled:opacity-50"
            >
                <span className="flex items-center gap-2 truncate">
                    <span>{selected?.icon}</span>
                    <span className="truncate">{selected?.name ?? 'Select AI'}</span>
                </span>
                <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 top-full mt-1 left-0 right-0 bg-[var(--bg-color)] border border-[var(--accent-color)]/20 rounded-xl shadow-2xl shadow-black/30 overflow-hidden max-h-80"
                    >
                        <div className="p-2 border-b border-[var(--accent-color)]/10">
                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[var(--secondary-color)]/40">
                                <Search size={14} className="text-[var(--text-secondary)]" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search models..."
                                    className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 outline-none"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto max-h-60 p-1 scrollbar-hide">
                            {filtered.length === 0 && (
                                <div className="text-center text-xs text-[var(--text-secondary)] py-4">No models found</div>
                            )}
                            {filtered.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => {
                                        onChange(m.id);
                                        setOpen(false);
                                        setSearch('');
                                    }}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all ${m.id === selectedId
                                        ? 'bg-[var(--accent-color)]/20 text-[var(--accent-color)] font-semibold'
                                        : 'hover:bg-[var(--secondary-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    <span className="text-base">{m.icon}</span>
                                    <span className="truncate">{m.name}</span>
                                    <span className="ml-auto text-[10px] opacity-50 shrink-0">{m.provider}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════
 * MAIN COMPONENT
 * ═══════════════════════════════════════════════════════ */

export const AIBattle: React.FC = () => {
    const { theme } = useTheme();
    const { panelVariants, getItemVariants } = useThemeAnimations();

    // State
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [selectedPrompt, setSelectedPrompt] = useState<BattlePrompt | null>(null);
    const [leftModel, setLeftModel] = useState('claude-opus-4-6');
    const [rightModel, setRightModel] = useState('gpt-5-codex');
    const [leftTyping, setLeftTyping] = useState<TypingState>({ text: '', done: false });
    const [rightTyping, setRightTyping] = useState<TypingState>({ text: '', done: false });
    const [isAnimating, setIsAnimating] = useState(false);

    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const leftIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const rightIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const leftFullRef = useRef('');
    const rightFullRef = useRef('');

    const themeFont = theme === 'hacker' ? 'font-mono' : '';

    // Filter prompts
    const filteredPrompts =
        activeCategory === 'all' ? battlePrompts : battlePrompts.filter((p) => p.category === activeCategory);

    // Cleanup intervals
    useEffect(() => {
        return () => {
            if (leftIntervalRef.current) clearInterval(leftIntervalRef.current);
            if (rightIntervalRef.current) clearInterval(rightIntervalRef.current);
        };
    }, []);

    // Auto-scroll
    useEffect(() => {
        leftRef.current?.scrollTo({ top: leftRef.current.scrollHeight, behavior: 'smooth' });
        rightRef.current?.scrollTo({ top: rightRef.current.scrollHeight, behavior: 'smooth' });
    }, [leftTyping.text, rightTyping.text]);

    // Start battle
    const startBattle = (prompt: BattlePrompt) => {
        setSelectedPrompt(prompt);
        setIsAnimating(true);

        // Clear previous
        if (leftIntervalRef.current) clearInterval(leftIntervalRef.current);
        if (rightIntervalRef.current) clearInterval(rightIntervalRef.current);

        const leftResponse = getResponse(leftModel, prompt.id);
        const rightResponse = getResponse(rightModel, prompt.id);

        leftFullRef.current = leftResponse;
        rightFullRef.current = rightResponse;

        setLeftTyping({ text: '', done: false });
        setRightTyping({ text: '', done: false });

        // Typing animation — both type simultaneously
        let li = 0;
        let ri = 0;
        const speed = 8; // ms per tick
        const charsPerTick = 3; // characters per tick

        leftIntervalRef.current = setInterval(() => {
            li += charsPerTick;
            if (li >= leftFullRef.current.length) {
                setLeftTyping({ text: leftFullRef.current, done: true });
                if (leftIntervalRef.current) clearInterval(leftIntervalRef.current);
                return;
            }
            setLeftTyping({ text: leftFullRef.current.slice(0, li), done: false });
        }, speed);

        rightIntervalRef.current = setInterval(() => {
            ri += charsPerTick;
            if (ri >= rightFullRef.current.length) {
                setRightTyping({ text: rightFullRef.current, done: true });
                if (rightIntervalRef.current) clearInterval(rightIntervalRef.current);
                setIsAnimating(false);
                return;
            }
            setRightTyping({ text: rightFullRef.current.slice(0, ri), done: false });
        }, speed);
    };

    // Re-battle when models change with active prompt
    const handleModelChange = (side: 'left' | 'right', modelId: string) => {
        if (side === 'left') setLeftModel(modelId);
        else setRightModel(modelId);

        if (selectedPrompt) {
            // Slight delay to let state update
            setTimeout(() => {
                const lm = side === 'left' ? modelId : leftModel;
                const rm = side === 'right' ? modelId : rightModel;

                if (leftIntervalRef.current) clearInterval(leftIntervalRef.current);
                if (rightIntervalRef.current) clearInterval(rightIntervalRef.current);

                const leftResponse = getResponse(lm, selectedPrompt.id);
                const rightResponse = getResponse(rm, selectedPrompt.id);

                leftFullRef.current = leftResponse;
                rightFullRef.current = rightResponse;

                setLeftTyping({ text: '', done: false });
                setRightTyping({ text: '', done: false });
                setIsAnimating(true);

                let li = 0;
                let ri = 0;
                leftIntervalRef.current = setInterval(() => {
                    li += 3;
                    if (li >= leftFullRef.current.length) {
                        setLeftTyping({ text: leftFullRef.current, done: true });
                        if (leftIntervalRef.current) clearInterval(leftIntervalRef.current);
                        return;
                    }
                    setLeftTyping({ text: leftFullRef.current.slice(0, li), done: false });
                }, 8);

                rightIntervalRef.current = setInterval(() => {
                    ri += 3;
                    if (ri >= rightFullRef.current.length) {
                        setRightTyping({ text: rightFullRef.current, done: true });
                        if (rightIntervalRef.current) clearInterval(rightIntervalRef.current);
                        setIsAnimating(false);
                        return;
                    }
                    setRightTyping({ text: rightFullRef.current.slice(0, ri), done: false });
                }, 8);
            }, 50);
        }
    };

    const leftModelData = aiModels.find((m) => m.id === leftModel);
    const rightModelData = aiModels.find((m) => m.id === rightModel);

    /* ─── RENDER ─── */
    return (
        <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`pt-24 pb-16 px-4 sm:px-6 relative z-10 ${themeFont}`}
        >
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-xs mb-8 text-[var(--text-secondary)]">
                    <Link to="/" className="hover:text-[var(--accent-color)] transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-[var(--accent-color)]">AI Battle</span>
                </nav>

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-color)]/30 to-[var(--accent-color)]/10 flex items-center justify-center text-[var(--accent-color)]">
                        <Swords size={26} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                            AI Response Battle
                        </h1>
                        <p className="text-sm text-[var(--text-secondary)]">
                            Compare how {aiModels.length} different AIs respond to the same prompt
                        </p>
                    </div>
                </div>

                {/* ────────── PROMPT GALLERY (before selection) ────────── */}
                {!selectedPrompt && (
                    <>
                        {/* Category tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id
                                        ? 'bg-[var(--accent-color)] text-white shadow-lg shadow-[var(--accent-color)]/25'
                                        : 'bg-[var(--secondary-color)]/60 text-[var(--text-secondary)] hover:bg-[var(--secondary-color)]'
                                        }`}
                                >
                                    <span>{cat.icon}</span>
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Model selectors row */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                                    ⬅ Left AI
                                </label>
                                <ModelSelector selectedId={leftModel} onChange={(id) => setLeftModel(id)} />
                            </div>
                            <div className="flex items-end justify-center pb-2">
                                <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/20 flex items-center justify-center text-[var(--accent-color)] font-bold text-xs">
                                    VS
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                                    Right AI ➡
                                </label>
                                <ModelSelector selectedId={rightModel} onChange={(id) => setRightModel(id)} />
                            </div>
                        </div>

                        {/* Prompt grid */}
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <AnimatePresence mode="popLayout">
                                {filteredPrompts.map((prompt, i) => (
                                    <motion.button
                                        key={prompt.id}
                                        variants={getItemVariants(i)}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: '-40px' }}
                                        layout
                                        onClick={() => startBattle(prompt)}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-[var(--secondary-color)]/40 border border-[var(--accent-color)]/10 text-left hover:bg-[var(--secondary-color)]/70 hover:border-[var(--accent-color)]/30 hover:shadow-lg hover:shadow-[var(--accent-color)]/10 transition-all group"
                                    >
                                        <span className="text-xl mt-0.5 group-hover:scale-110 transition-transform">{prompt.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">{prompt.prompt}</p>
                                            <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-semibold text-[var(--accent-color)] px-2 py-0.5 rounded-full bg-[var(--accent-color)]/10">
                                                {prompt.category}
                                            </span>
                                        </div>
                                        <Zap size={14} className="text-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}

                {/* ────────── BATTLE VIEW (after selection) ────────── */}
                {selectedPrompt && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        {/* Back + prompt display */}
                        <div className="mb-6">
                            <button
                                onClick={() => {
                                    setSelectedPrompt(null);
                                    setLeftTyping({ text: '', done: false });
                                    setRightTyping({ text: '', done: false });
                                    setIsAnimating(false);
                                    if (leftIntervalRef.current) clearInterval(leftIntervalRef.current);
                                    if (rightIntervalRef.current) clearInterval(rightIntervalRef.current);
                                }}
                                className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors mb-4"
                            >
                                <ArrowLeft size={16} />
                                Back to prompts
                            </button>

                            <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--accent-color)]/10 to-transparent border border-[var(--accent-color)]/20">
                                <div className="flex items-center gap-2 text-xs text-[var(--accent-color)] font-semibold uppercase tracking-wider mb-1">
                                    <Sparkles size={12} />
                                    Prompt
                                </div>
                                <p className="text-[var(--text-primary)] font-medium">{selectedPrompt.prompt}</p>
                            </div>
                        </div>

                        {/* Model selectors (mini) */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                            <div className="flex-1">
                                <ModelSelector
                                    selectedId={leftModel}
                                    onChange={(id) => handleModelChange('left', id)}
                                    disabled={isAnimating}
                                />
                            </div>
                            <div className="hidden sm:flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-[var(--accent-color)]/20 flex items-center justify-center text-[var(--accent-color)] font-bold text-[10px]">
                                    VS
                                </div>
                            </div>
                            <div className="flex-1">
                                <ModelSelector
                                    selectedId={rightModel}
                                    onChange={(id) => handleModelChange('right', id)}
                                    disabled={isAnimating}
                                />
                            </div>
                        </div>

                        {/* Side-by-side chat panels */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* LEFT panel */}
                            <div className="rounded-2xl border border-[var(--accent-color)]/15 bg-[var(--secondary-color)]/20 overflow-hidden backdrop-blur-sm">
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--accent-color)]/10 bg-[var(--accent-color)]/5">
                                    <span className="text-lg">{leftModelData?.icon}</span>
                                    <span className="text-sm font-semibold text-[var(--text-primary)]">{leftModelData?.name}</span>
                                    <span className="text-[10px] text-[var(--text-secondary)] ml-auto">{leftModelData?.provider}</span>
                                    {!leftTyping.done && leftTyping.text.length > 0 && (
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    )}
                                </div>
                                <div ref={leftRef} className="h-[500px] overflow-y-auto p-4 scroll-smooth">
                                    {leftTyping.text.length === 0 && !isAnimating && (
                                        <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)] opacity-40 gap-2">
                                            <Bot size={32} />
                                            <p className="text-xs">Waiting for battle...</p>
                                        </div>
                                    )}
                                    {leftTyping.text.length > 0 && (
                                        <div className="text-sm leading-relaxed text-[var(--text-primary)] whitespace-pre-wrap">
                                            {leftTyping.text}
                                            {!leftTyping.done && (
                                                <span className="inline-block w-[2px] h-4 bg-[var(--accent-color)] ml-0.5 align-middle animate-pulse" />
                                            )}
                                        </div>
                                    )}
                                    {leftTyping.text.length === 0 && isAnimating && (
                                        <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                                            <span className="flex gap-1">
                                                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </span>
                                            Thinking...
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT panel */}
                            <div className="rounded-2xl border border-[var(--accent-color)]/15 bg-[var(--secondary-color)]/20 overflow-hidden backdrop-blur-sm">
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--accent-color)]/10 bg-[var(--accent-color)]/5">
                                    <span className="text-lg">{rightModelData?.icon}</span>
                                    <span className="text-sm font-semibold text-[var(--text-primary)]">{rightModelData?.name}</span>
                                    <span className="text-[10px] text-[var(--text-secondary)] ml-auto">{rightModelData?.provider}</span>
                                    {!rightTyping.done && rightTyping.text.length > 0 && (
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    )}
                                </div>
                                <div ref={rightRef} className="h-[500px] overflow-y-auto p-4 scroll-smooth">
                                    {rightTyping.text.length === 0 && !isAnimating && (
                                        <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)] opacity-40 gap-2">
                                            <Bot size={32} />
                                            <p className="text-xs">Waiting for battle...</p>
                                        </div>
                                    )}
                                    {rightTyping.text.length > 0 && (
                                        <div className="text-sm leading-relaxed text-[var(--text-primary)] whitespace-pre-wrap">
                                            {rightTyping.text}
                                            {!rightTyping.done && (
                                                <span className="inline-block w-[2px] h-4 bg-[var(--accent-color)] ml-0.5 align-middle animate-pulse" />
                                            )}
                                        </div>
                                    )}
                                    {rightTyping.text.length === 0 && isAnimating && (
                                        <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                                            <span className="flex gap-1">
                                                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </span>
                                            Thinking...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Prompt selector strip at bottom */}
                        <div className="mt-6">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                                Try another prompt
                            </h3>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {battlePrompts.filter((p) => p.id !== selectedPrompt.id).slice(0, 8).map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => !isAnimating && startBattle(p)}
                                        disabled={isAnimating}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--secondary-color)]/40 border border-[var(--accent-color)]/10 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-color)]/30 transition-all whitespace-nowrap shrink-0 disabled:opacity-40"
                                    >
                                        <span>{p.icon}</span>
                                        <span className="max-w-[150px] truncate">{p.prompt}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};
