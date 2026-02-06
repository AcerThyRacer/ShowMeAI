import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  Brain, Zap, Shield, Code, Copy, Check, ChevronDown, ChevronRight,
  Lightbulb, Target, Search, BookOpen, Terminal, Layers, ArrowRight,
  Sparkles, AlertTriangle, FileText, Settings, Cpu, GitBranch
} from 'lucide-react';

/* ─── Copy-to-clipboard button ─── */
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent-color)] text-white hover:brightness-110 transition-all"
    >
      {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
    </button>
  );
};

/* ─── Collapsible code block ─── */
const CodeBlock: React.FC<{ title: string; code: string; lang?: string }> = ({ title, code, lang }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--accent-color)]/20 overflow-hidden my-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[var(--secondary-color)]/60 hover:bg-[var(--secondary-color)] transition-colors text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Terminal size={16} className="text-[var(--accent-color)]" />
          {title}
          {lang && <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent-color)]/20 text-[var(--accent-color)]">{lang}</span>}
        </span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {open && (
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <CopyButton text={code} />
          </div>
          <pre className="p-4 overflow-x-auto text-sm leading-relaxed bg-[var(--bg-color)]/80 font-mono whitespace-pre-wrap">
            {code}
          </pre>
        </div>
      )}
    </div>
  );
};

/* ─── Section wrapper ─── */
const Section: React.FC<{ id: string; icon: React.ReactNode; title: string; subtitle?: string; children: React.ReactNode }> = ({
  id, icon, title, subtitle, children
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-16"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-lg bg-[var(--accent-color)]/15 text-[var(--accent-color)]">{icon}</div>
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
    </div>
    {subtitle && <p className="text-base opacity-70 ml-12 mb-6">{subtitle}</p>}
    <div className="ml-0 md:ml-12 mt-4">{children}</div>
  </motion.section>
);

/* ─── Tip card ─── */
const Tip: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="p-5 rounded-xl bg-[var(--secondary-color)]/50 border border-[var(--accent-color)]/10 hover:border-[var(--accent-color)]/30 transition-colors">
    <div className="flex items-center gap-2 mb-2 text-[var(--accent-color)]">
      {icon}
      <h4 className="font-bold text-base">{title}</h4>
    </div>
    <div className="text-sm opacity-80 leading-relaxed">{children}</div>
  </div>
);

/* ─── Table of contents entries ─── */
const tocItems = [
  { id: 'fundamentals', label: 'Prompting Fundamentals' },
  { id: 'advanced-prompts', label: 'Advanced Prompt Techniques' },
  { id: 'claude-code', label: 'Claude Code Custom Prompts' },
  { id: 'hooks', label: 'Custom Hooks & Presets' },
  { id: 'omega-readme', label: 'OMEGA-SENTINEL Preset' },
  { id: 'security', label: 'Safety & Security' },
  { id: 'tools', label: 'Recommended Workflow' },
];

/* ─── The full OMEGA-SENTINEL readme ─── */
const omegaReadme = `# OMEGA-SENTINEL-V4 // Ultra-Intelligent Cognitive Architecture

You are a **System Sentinel Principal Engineer** operating under a **Zero-Knowledge / Zero-Trust** paradigm. Your cognitive architecture implements **Reflexion-based Tree-of-Thoughts (R-ToT)** with **Multi-Agent Orchestration** capabilities, backed by **32 specialized intelligence modules** spanning P0-P3 capability tiers.

## 🌐 PRIMARY DIRECTIVE: WHEN UNCERTAIN, SEARCH FIRST

**You have access to real-time web search. Use it liberally.**

Before answering anything you're not 100% certain about → **WebSearch it first.**

This overrides all other heuristics. **Search before guessing.**

## INTEGRATED INTELLIGENCE SYSTEM (10000/10000 Smartness)

You have access to advanced intelligence systems that activate automatically:

### P0 - Critical Foundation
- **Working Memory** (~/.claude/intelligence/memory/working_memory.py): Tiered memory (L1/L2/L3), task tracking, file operation history
- **Tool Composition** (~/.claude/intelligence/tools/tool_composition.py): YAML-based composable tool chains with conditionals, loops, parallel execution
- **Security Validator** (~/.claude/intelligence/security/security_validator.py): Pre-execution validation, secret detection, supply chain auditing

### P1 - High Priority Analysis
- **Error Classifier** (~/.claude/intelligence/error_handling/): Auto-recovery strategies, error categorization with intelligent routing
- **Agent Communication** (~/.claude/intelligence/agents/): Multi-agent coordination, shared context workspace
- **Call Graph Builder** (~/.claude/intelligence/analysis/): Dependency analysis, data flow tracking, architecture inference
- **Predictive Assistance** (~/.claude/intelligence/prediction/): Next action prediction, contextual suggestions
- **Performance Profiler** (~/.claude/intelligence/profiling/): Hot path identification, multi-level caching (L1/L2/L3)

### P2 - Advanced Code Capabilities
- **Language Translator**: Cross-language code translation with idiomatic patterns
- **Formal Verification**: Property-based testing, contract generation, invariant checking
- **Semantic Search**: Intent-based code search, semantic similarity
- **Refactoring Engine**: Automated refactoring with safety guarantees
- **Test Generator**: Unit test generation, coverage analysis, mutation testing
- **Type Inference**: Automatic type inference, type checking, suggestions
- **Code Smell Detector**: Smell detection, maintainability index scoring
- **Dependency Analyzer**: Cycle detection, impact analysis, topological sorting
- **Documentation Generator**: API/README generation, interactive docs
- **External Services**: GitHub, Jira, Slack, AWS/GCP/Azure integration

### P3 - Frontier Intelligence
- **Self-Modifying Code**: Hot-patching, genetic evolution, self-healing
- **Temporal Reasoning**: Git history analysis, developer intent inference, future prediction
- **Neural-Symbolic Integration**: Concept embeddings, hybrid inference, analogy
- **Causal Debugging**: Root cause analysis, counterfactuals, blame attribution
- **Meta-Learning**: Session memory, pattern mining, few-shot learning
- **Adversarial Testing**: Fuzzing, security scanning, fault injection
- **Explainable AI**: Decision trees, natural language explanations
- **Creativity Engine**: Lateral thinking, cross-domain analogy, conceptual blending
- **Emergent Behavior Detection**: Feedback loops, butterfly effect, cascade detection

---

## 🌐 WEB SEARCH FIRST POLICY (CRITICAL)

**When UNCERTAIN, SEARCH BEFORE ANSWERING.**

### When to Search (Search Liberally)

Search **ALWAYS** when:
- ❓ You are **uncertain** about any fact, API, command, or syntax
- ❓ User asks about **current events**, recent changes, or time-sensitive info
- ❓ User asks about a **specific library version** or latest features
- ❓ You don't recognize a **tool, framework, or technology** mentioned
- ❓ User asks for **best practices** that may have evolved
- ❓ You need to verify **package names**, **API endpoints**, or **CLI flags**
- ❓ User asks about **installation instructions** or setup processes
- ❓ You're unsure about **deprecation status** or breaking changes
- ❓ User mentions **2025 or 2026** specific APIs/features

### Search Threshold
**Default to SEARCHING if:**
- Confidence < 90% on factual information
- The topic is "recent" (last 2-3 years)
- You haven't personally verified the information recently

## I. COGNITIVE ARCHITECTURE (R-ToT++)

### Mental Execution Model
Before ANY action, construct a state tree:
\`\`\`
[ROOT PROBLEM]
    ├─ Decomposition: DAG of dependencies
    ├─ Branching: N potential implementation paths
    │   ├─ Path A: Async/Await → Time: O(n), Risk: Low
    │   ├─ Path B: Green Threads → Time: O(log n), Risk: Medium
    │   └─ Path C: Hardware Threads → Time: O(1), Risk: High
    ├─ Simulation: Mental profile of each path
    ├─ Selection: Security > Performance > Maintainability
    └─ Reflexion: Self-correction loop post-execution
\`\`\`

### The Four-Phase Thought Process
**Phase 1: Deconstruction** - Break problem into primitive operations
**Phase 2: Divergence** - Generate 3-7 implementation approaches with explicit trade-offs
**Phase 3: Convergence** - Select optimal path with reasoning
**Phase 4: Validation** - Verify correctness, then self-critique and refine

## II. CHAIN-OF-VERIFICATION (CoVe++)

Before ANY output, pass this 5-point checkpoint:
□ Type Safety: All bindings have inferred/declared types
□ Formal Logic: Loops have provable termination, no overflows
□ Dependency Hygiene: All imports are necessary, checksummed
□ Hallucination Zeroing: API citations have mock signatures
□ Security Posture: Attack surface analyzed and minimized

## III. SECURITY-FIRST DESIGN

1. **Principle of Least Privilege**: Minimum permissions for all operations
2. **Defense in Depth**: Multiple validation layers
3. **Fail Secure**: Default to secure state on errors
4. **Zero Trust**: Verify all inputs, even from "trusted" sources

## IV. META-COGNITIVE DIRECTIVES

After each significant operation, self-reflect:
1. "Did I achieve the stated goal?"
2. "Is there a simpler/more secure approach?"
3. "What assumptions did I make that need verification?"
4. "What would I change if doing this again?"

Your goal: **Absolute correctness via zero-trust validation with 10000/10000 smartness.**

**Intelligence Status:** ✅ ACTIVE (P0+P1+P2+P3 = 32 modules, ~30,000 lines of intelligence code)

Execute.`;

/* ─── MAIN COMPONENT ─── */
export const HowToUseAI: React.FC = () => {
  const { theme } = useTheme();
  const [readmeOpen, setReadmeOpen] = useState(false);

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-[var(--accent-color)] text-sm font-medium mb-6">
            <Brain size={16} /> Complete AI Mastery Guide
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
            How to Use AI <span className="text-[var(--accent-color)]">Correctly</span>
          </h1>
          <p className="text-xl opacity-70 max-w-3xl mx-auto leading-relaxed">
            Master the art of AI prompting, configure Claude Code with custom hooks and presets,
            and unlock 10,000/10,000 intelligence with the OMEGA-SENTINEL architecture.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16 p-6 rounded-2xl bg-[var(--secondary-color)]/40 border border-[var(--accent-color)]/15"
        >
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <BookOpen size={18} className="text-[var(--accent-color)]" /> Table of Contents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tocItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 text-sm py-1.5 px-3 rounded-lg hover:bg-[var(--accent-color)]/10 transition-colors group"
              >
                <span className="text-[var(--accent-color)] font-mono text-xs w-5">{String(i + 1).padStart(2, '0')}</span>
                <span className="group-hover:text-[var(--accent-color)] transition-colors">{item.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* ─── SECTION 1: Prompting Fundamentals ─── */}
        <Section id="fundamentals" icon={<Lightbulb size={22} />} title="Prompting Fundamentals" subtitle="The basics that most people get wrong — and how to do it right.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Tip icon={<Target size={16} />} title="Be Specific, Not Vague">
              Instead of "help me with my code," say "Refactor this React component to use useReducer instead of multiple useState hooks, keeping the same external API." Specificity is the #1 predictor of AI output quality.
            </Tip>
            <Tip icon={<Layers size={16} />} title="Provide Context">
              Tell the AI what project you're working on, what technologies you use, and what constraints exist. The more context, the better the output. Include relevant code snippets, error messages, and your goal.
            </Tip>
            <Tip icon={<GitBranch size={16} />} title="Think Step-by-Step">
              For complex tasks, break them into numbered steps. "First analyze the current architecture, then propose three alternatives with trade-offs, then implement the best one." This activates chain-of-thought reasoning.
            </Tip>
            <Tip icon={<Sparkles size={16} />} title="Assign a Role">
              "You are a senior TypeScript engineer with 10 years of experience in React performance optimization." Role-setting primes the AI to respond with the appropriate depth and expertise level.
            </Tip>
          </div>

          <h3 className="text-xl font-bold mb-3 mt-8">The Prompt Quality Ladder</h3>
          <div className="space-y-3">
            {[
              { level: '❌ Bad', prompt: '"Fix my code"', why: 'No context, no specificity, no constraints' },
              { level: '⚠️ Okay', prompt: '"Fix the TypeScript error in my React component"', why: 'Better, but still missing the actual error and code' },
              { level: '✅ Good', prompt: '"Fix the TS2322 type error on line 45 of UserProfile.tsx where I\'m passing a string to a number prop"', why: 'Specific error, file, line, and context' },
              { level: '🏆 Expert', prompt: '"You are a TypeScript expert. Fix TS2322 on UserProfile.tsx:45. The `age` prop expects number but receives string from the API response. Preserve the existing type guard pattern used elsewhere in this file. Show me the fix and explain why the API types need updating."', why: 'Role + specifics + constraints + existing patterns + learning' },
            ].map((item) => (
              <div key={item.level} className="p-4 rounded-xl bg-[var(--bg-color)]/50 border border-[var(--accent-color)]/10">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-sm">{item.level}</span>
                  <code className="text-sm text-[var(--accent-color)]">{item.prompt}</code>
                </div>
                <p className="text-xs opacity-60 ml-8">{item.why}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── SECTION 2: Advanced Prompting ─── */}
        <Section id="advanced-prompts" icon={<Zap size={22} />} title="Advanced Prompt Techniques" subtitle="Patterns used by power users to extract maximum value from any AI model.">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Chain-of-Thought (CoT)</h3>
              <p className="text-sm opacity-80 mb-3">Force the AI to reason step-by-step before giving an answer. This dramatically improves accuracy on complex problems.</p>
              <CodeBlock title="Chain-of-Thought Prompt Example" code={`Think through this step-by-step before giving your final answer:

1. What is the current architecture of this system?
2. What are the performance bottlenecks?
3. What are 3 possible solutions with trade-offs?
4. Which solution best fits our constraints (budget, timeline, team skill)?
5. Implement the chosen solution with tests.

Constraints:
- Must maintain backward compatibility
- Must not increase bundle size by more than 10%
- Must work with React 19 and TypeScript 5.9`} />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Few-Shot Learning</h3>
              <p className="text-sm opacity-80 mb-3">Show the AI examples of what you want, and it'll follow the pattern precisely.</p>
              <CodeBlock title="Few-Shot Example" code={`Convert these function names to match our codebase convention:

Example inputs → outputs:
- getUserData → use_get_user_data_query
- createPost → use_create_post_mutation
- deleteComment → use_delete_comment_mutation

Now convert these:
- updateProfile → ?
- fetchNotifications → ?
- submitPayment → ?`} />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Tree-of-Thought (ToT)</h3>
              <p className="text-sm opacity-80 mb-3">Explore multiple reasoning paths simultaneously, evaluate each, and converge on the best solution. This is the technique behind the OMEGA-SENTINEL preset below.</p>
              <CodeBlock title="Tree-of-Thought Prompt" code={`Problem: Our API response times have increased from 200ms to 800ms after the last deployment.

Explore 3 independent hypotheses in parallel:

Path A (Database): Could the new ORM query be causing N+1 problems?
Path B (Network): Could the new middleware be adding latency?
Path C (Memory): Could the increased payload size be causing GC pressure?

For each path:
1. What evidence would confirm this hypothesis?
2. What's the fastest way to test it?
3. If confirmed, what's the fix?

Then converge: Which path is most likely given that CPU usage is normal but memory is elevated?`} />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Metacognitive Prompting</h3>
              <p className="text-sm opacity-80 mb-3">Ask the AI to evaluate its own confidence and flag uncertainty — drastically reduces hallucinations.</p>
              <CodeBlock title="Metacognitive Prompt" code={`Before answering, rate your confidence on each sub-question from 0-100%.

If confidence < 80% on any part, explicitly say "I'm not certain about X" and suggest 
how I could verify it myself.

If confidence < 50%, say "I should search for this" and DO NOT guess.

After answering, self-critique: What assumptions did you make? What could be wrong?`} />
            </div>
          </div>
        </Section>

        {/* ─── SECTION 3: Claude Code Custom Prompts ─── */}
        <Section id="claude-code" icon={<Terminal size={22} />} title="Claude Code Custom Prompts" subtitle="Configure Claude Code to be dramatically smarter with a CLAUDE.md file.">
          <p className="text-sm opacity-80 mb-6 leading-relaxed">
            Claude Code reads a <code className="px-1.5 py-0.5 rounded bg-[var(--accent-color)]/15 text-[var(--accent-color)] text-xs font-mono">CLAUDE.md</code> file
            from your project root (or <code className="px-1.5 py-0.5 rounded bg-[var(--accent-color)]/15 text-[var(--accent-color)] text-xs font-mono">~/.claude/CLAUDE.md</code> for global config)
            to understand your preferences, coding style, and project context. This is the single most impactful thing you can do to improve Claude Code's output.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Tip icon={<FileText size={16} />} title="Project CLAUDE.md">
              Place in your project root. Tells Claude about your tech stack, conventions, architecture decisions, and project-specific rules. Every prompt automatically includes this context.
            </Tip>
            <Tip icon={<Settings size={16} />} title="Global ~/.claude/CLAUDE.md">
              Your personal preferences that apply to all projects. Coding style, preferred languages, error handling patterns, and response format preferences.
            </Tip>
          </div>

          <CodeBlock title="Example Project CLAUDE.md" lang="Markdown" code={`# Project: AI Masterclass Website

## Tech Stack
- React 19.2 + TypeScript 5.9
- Vite 7.2 for bundling
- Tailwind CSS 3.4 for styling
- Framer Motion 12 for animations
- React Router DOM for routing

## Architecture
- Theme system via CSS custom properties (--bg-color, --text-color, --accent-color)
- Canvas-based animated backgrounds per theme (dark, light, rave, neon, hacker)
- Data-driven model/provider pages from src/data/models.ts

## Coding Conventions
- Functional components with React.FC typing
- Named exports (not default exports)
- useTheme() hook for theme access
- Framer Motion for all animations (whileInView, not animate)
- Mobile-first responsive design

## Rules
- NEVER use \`any\` type
- ALWAYS use semantic HTML elements
- PREFER Tailwind classes over inline styles
- USE CSS variables for theme colors, not hardcoded values
- KEEP components under 200 lines — split if larger`} />

          <CodeBlock title="Example Global CLAUDE.md" lang="Markdown" code={`# Personal Preferences

## Style
- Concise, direct responses
- Code-first — show me the implementation, explain after
- TypeScript strict mode always
- Prefer functional/declarative over imperative

## When I Say...
- "fix it" → Find the bug, fix it, and explain what was wrong
- "make it better" → Refactor for readability, performance, and type safety
- "ship it" → Finalize, add error handling, optimize for production

## Error Handling
- Always use Result/Either patterns where possible
- Never swallow errors silently
- Log with structured context (not just the message)

## Testing
- Write tests alongside implementation
- Prefer integration tests over unit tests for UI
- Use Testing Library patterns, not Enzyme`} />
        </Section>

        {/* ─── SECTION 4: Custom Hooks & Presets ─── */}
        <Section id="hooks" icon={<Code size={22} />} title="Custom Hooks & Presets" subtitle="Automate Claude Code's behavior with event-driven hooks and intelligence presets.">
          <p className="text-sm opacity-80 mb-6 leading-relaxed">
            Hooks are scripts that run automatically at specific points in Claude Code's lifecycle — before a tool executes, after an error occurs,
            or when a session starts. Combined with a preset readme like OMEGA-SENTINEL, they transform Claude from a basic assistant into a
            systematic reasoning engine.
          </p>

          <h3 className="text-xl font-bold mb-3">Hook Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Tip icon={<Shield size={16} />} title="PreToolUse">
              Runs before any tool executes. Use for security validation, permission checks, and preventing dangerous operations like <code className="text-xs">rm -rf</code>.
            </Tip>
            <Tip icon={<Zap size={16} />} title="PostToolUse">
              Runs after a tool completes. Use for logging, caching results, triggering follow-up actions, and error recovery.
            </Tip>
            <Tip icon={<Cpu size={16} />} title="SessionStart">
              Runs when a session begins. Use for loading memory, initializing context, and activating intelligence modules.
            </Tip>
          </div>

          <CodeBlock title="Hook: Security Validator (PreToolUse)" lang="JSON" code={`// .claude/hooks/preToolUse.json
{
  "hooks": [
    {
      "matcher": {
        "tool": "bash",
        "command_pattern": "rm -rf|chmod 777|eval\\\\(|curl.*\\\\|.*sh"
      },
      "action": "block",
      "message": "⚠️ Dangerous command blocked. Please review and use a safer alternative."
    },
    {
      "matcher": {
        "tool": "write",
        "path_pattern": ".env|secrets|credentials|private_key"
      },
      "action": "warn",
      "message": "🔒 Writing to sensitive file. Ensure no secrets are being committed."
    }
  ]
}`} />

          <CodeBlock title="Hook: Auto-Search on Uncertainty (PostToolUse)" lang="Python" code={`# ~/.claude/hooks/post_tool_use.py
"""
Automatically triggers web search when Claude's confidence is low.
Activated by the OMEGA-SENTINEL search-first policy.
"""

import json
import sys

UNCERTAINTY_PATTERNS = [
    "I'm not sure", "I think", "might be", "possibly",
    "I believe", "if I recall", "it seems like",
    "2025", "2026", "latest version", "current"
]

def check_uncertainty(response: str) -> bool:
    return any(pattern.lower() in response.lower() 
               for pattern in UNCERTAINTY_PATTERNS)

def main():
    event = json.loads(sys.stdin.read())
    if event.get("tool") == "respond" and check_uncertainty(event.get("output", "")):
        print(json.dumps({
            "action": "inject",
            "message": "🌐 Uncertainty detected. Searching for verification..."
        }))

if __name__ == "__main__":
    main()`} />

          <CodeBlock title="Hook: Session Memory (SessionStart)" lang="Python" code={`# ~/.claude/hooks/session_start.py
"""
Loads persistent memory from previous sessions.
Part of the OMEGA-SENTINEL P0 Working Memory system.
"""

import json
from pathlib import Path

MEMORY_FILE = Path.home() / ".claude" / "intelligence" / "memory" / "context.json"

def load_memory():
    if MEMORY_FILE.exists():
        memory = json.loads(MEMORY_FILE.read_text())
        # Inject last session's context
        return {
            "context_injection": f"""
## Loaded from Previous Session:
- Last project: {memory.get('last_project', 'unknown')}
- Key decisions: {', '.join(memory.get('decisions', []))}
- Known issues: {', '.join(memory.get('issues', []))}
- User preferences: {json.dumps(memory.get('preferences', {}))}
""",
            "modules_active": memory.get("active_modules", ["P0", "P1"])
        }
    return {"context_injection": "", "modules_active": ["P0"]}

if __name__ == "__main__":
    result = load_memory()
    print(json.dumps(result))`} />

          <h3 className="text-xl font-bold mb-3 mt-8">Setting Up Hooks</h3>
          <div className="p-5 rounded-xl bg-[var(--secondary-color)]/50 border border-[var(--accent-color)]/10">
            <ol className="space-y-3 text-sm opacity-80 leading-relaxed list-decimal list-inside">
              <li>Create the <code className="px-1.5 py-0.5 rounded bg-[var(--accent-color)]/15 text-[var(--accent-color)] text-xs font-mono">~/.claude/hooks/</code> directory</li>
              <li>Add hook scripts (Python, JSON, or shell scripts) for each event type</li>
              <li>Configure hook activation in <code className="px-1.5 py-0.5 rounded bg-[var(--accent-color)]/15 text-[var(--accent-color)] text-xs font-mono">~/.claude/settings.json</code></li>
              <li>Place your CLAUDE.md preset (like OMEGA-SENTINEL below) in your project root or <code className="px-1.5 py-0.5 rounded bg-[var(--accent-color)]/15 text-[var(--accent-color)] text-xs font-mono">~/.claude/CLAUDE.md</code></li>
              <li>Restart Claude Code — hooks and the preset activate automatically</li>
            </ol>
          </div>
        </Section>

        {/* ─── SECTION 5: OMEGA-SENTINEL Preset ─── */}
        <Section id="omega-readme" icon={<Brain size={22} />} title="OMEGA-SENTINEL-V4 Preset" subtitle="The ultimate Claude Code configuration — 32 intelligence modules, zero-trust validation, 10000/10000 smartness.">
          <div className="p-5 rounded-xl bg-gradient-to-br from-[var(--accent-color)]/10 to-transparent border border-[var(--accent-color)]/25 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">🧠 Ready-to-Use Preset</h3>
                <p className="text-sm opacity-70">
                  Copy this entire readme into your <code className="px-1.5 py-0.5 rounded bg-[var(--accent-color)]/15 text-[var(--accent-color)] text-xs font-mono">CLAUDE.md</code> file
                  to transform Claude Code into a systematic reasoning engine with search-first verification, multi-agent orchestration, and self-correcting intelligence.
                </p>
              </div>
              <CopyButton text={omegaReadme} />
            </div>
          </div>

          <h3 className="text-lg font-bold mb-3">What This Preset Does</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: <Search size={18} />, title: 'Search-First Policy', desc: 'Forces web search before answering uncertain questions — eliminates hallucinations' },
              { icon: <GitBranch size={18} />, title: 'Tree-of-Thought', desc: 'Explores multiple solution paths in parallel, simulates each, selects the best' },
              { icon: <Shield size={18} />, title: 'Zero-Trust Validation', desc: '5-point verification checkpoint before any output: types, logic, deps, security' },
              { icon: <Layers size={18} />, title: '32 Intelligence Modules', desc: 'P0-P3 tiered modules from memory management to causal debugging to creativity' },
              { icon: <Cpu size={18} />, title: 'Multi-Agent Orchestration', desc: 'Spawns specialized subagents for architecture, implementation, testing, security' },
              { icon: <Sparkles size={18} />, title: 'Self-Correction', desc: 'Meta-cognitive reflection after every operation — catches mistakes before you see them' },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-[var(--secondary-color)]/40 border border-[var(--accent-color)]/10">
                <div className="text-[var(--accent-color)] mb-2">{item.icon}</div>
                <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-xs opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Full readme display */}
          <div className="rounded-2xl border border-[var(--accent-color)]/20 overflow-hidden">
            <button
              onClick={() => setReadmeOpen(!readmeOpen)}
              className="w-full flex items-center justify-between px-6 py-4 bg-[var(--secondary-color)]/60 hover:bg-[var(--secondary-color)] transition-colors text-left"
            >
              <span className="flex items-center gap-3 font-bold">
                <FileText size={20} className="text-[var(--accent-color)]" />
                View Full OMEGA-SENTINEL-V4 README
                <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent-color)]/20 text-[var(--accent-color)]">CLAUDE.md</span>
              </span>
              <div className="flex items-center gap-2">
                <CopyButton text={omegaReadme} />
                {readmeOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </div>
            </button>
            {readmeOpen && (
              <div className="max-h-[70vh] overflow-y-auto">
                <pre className="p-6 text-sm leading-relaxed font-mono whitespace-pre-wrap bg-[var(--bg-color)]/80">
                  {omegaReadme}
                </pre>
              </div>
            )}
          </div>
        </Section>

        {/* ─── SECTION 6: Safety & Security ─── */}
        <Section id="security" icon={<Shield size={22} />} title="Safety & Security" subtitle="Responsible AI usage patterns — what to do and what to never do.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3 text-green-400">✅ Do</h3>
              <ul className="space-y-2 text-sm opacity-80">
                {[
                  'Always verify AI-generated code before deploying to production',
                  'Use the search-first policy for any factual claims',
                  'Set up security hooks to prevent dangerous operations',
                  'Review AI-generated dependencies for supply chain risks',
                  'Keep secrets out of AI conversations and CLAUDE.md files',
                  'Use AI as a collaborator, not a replacement for understanding',
                  'Test AI-generated code with the same rigor as human code',
                  'Assign confidence scores to AI outputs and verify low-confidence items',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-green-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-red-400">❌ Don't</h3>
              <ul className="space-y-2 text-sm opacity-80">
                {[
                  'Blindly trust AI output without review — AI can hallucinate',
                  'Paste secrets, API keys, or credentials into AI prompts',
                  'Use AI-generated code in security-critical paths without auditing',
                  'Assume AI understands your full codebase from one snippet',
                  'Skip testing because "the AI wrote it so it must be right"',
                  'Use AI for tasks where a wrong answer has serious consequences without verification',
                  'Ignore AI uncertainty signals — if it says "I think," verify it',
                  'Disable safety hooks to "go faster" — they exist for a reason',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ─── SECTION 7: Recommended Workflow ─── */}
        <Section id="tools" icon={<Settings size={22} />} title="Recommended Workflow" subtitle="The ideal setup for getting the most from AI coding tools in 2026.">
          <div className="space-y-4 mb-8">
            {[
              { step: '01', title: 'Set Up CLAUDE.md', desc: 'Create a project-level and global CLAUDE.md with your conventions, tech stack, and rules. This is the highest-ROI action you can take.', link: '#claude-code' },
              { step: '02', title: 'Install the OMEGA-SENTINEL Preset', desc: 'Copy the preset into your CLAUDE.md to activate search-first verification, tree-of-thought reasoning, and 32 intelligence modules.', link: '#omega-readme' },
              { step: '03', title: 'Configure Security Hooks', desc: 'Set up PreToolUse hooks to block dangerous commands and warn on sensitive file access. Takes 5 minutes, prevents disasters.', link: '#hooks' },
              { step: '04', title: 'Use the Right Model for the Task', desc: 'Claude Opus 4.6 for deep coding, GPT-5.3 Codex for fast iteration, GitHub Copilot for IDE integration, Perplexity for research.', link: '/models' },
              { step: '05', title: 'Prompt Like a Pro', desc: 'Use chain-of-thought, few-shot examples, and role assignment. Be specific, provide context, and ask for confidence scores.', link: '#fundamentals' },
              { step: '06', title: 'Always Verify', desc: 'Review AI output, run tests, check edge cases. AI is a collaborator, not an oracle. The best developers use AI to go faster while maintaining quality.', link: '#security' },
            ].map((item) => (
              <a
                key={item.step}
                href={item.link.startsWith('/') ? undefined : item.link}
                onClick={item.link.startsWith('/') ? undefined : undefined}
                className="flex items-start gap-4 p-5 rounded-xl bg-[var(--secondary-color)]/40 border border-[var(--accent-color)]/10 hover:border-[var(--accent-color)]/30 transition-all group"
              >
                <span className="text-2xl font-bold text-[var(--accent-color)] font-mono">{item.step}</span>
                <div className="flex-1">
                  <h4 className="font-bold mb-1 group-hover:text-[var(--accent-color)] transition-colors">{item.title}</h4>
                  <p className="text-sm opacity-70">{item.desc}</p>
                </div>
                <ArrowRight size={18} className="text-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
              </a>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[var(--accent-color)]/10 to-transparent border border-[var(--accent-color)]/20">
            <h3 className="text-2xl font-bold mb-3">Ready to explore the best AI models?</h3>
            <p className="text-sm opacity-70 mb-6 max-w-xl mx-auto">
              Now that you know how to use AI correctly, discover which model is best for your specific use case.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/models"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-color)] text-white rounded-lg hover:brightness-110 transition-all font-medium"
              >
                Browse All Models <ArrowRight size={16} />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--secondary-color)] border border-[var(--accent-color)]/30 rounded-lg hover:bg-[var(--accent-color)]/10 transition-all font-medium"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};
