'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, MessageSquareWarning } from 'lucide-react';

interface RoastWidgetProps {
  stats: {
    totalContributions: number;
    currentStreak: number;
    peakStreak: number;
  };
  profile: {
    name: string;
    stats: {
      repositories: number;
      followers: number;
      stars: number;
    };
  };
}

interface CombinedStats {
  totalContributions: number;
  currentStreak: number;
  peakStreak: number;
  repositories: number;
  followers: number;
  stars: number;
}

const ROASTS = [
  () => `500+ contributions but 0 PRs? Do you even know how to work in a team? 🤡`,
  (s: CombinedStats) =>
    `${s.repositories} repos? And how many of those are abandoned side projects? 👻`,
  (s: CombinedStats) =>
    `Peak streak of ${s.peakStreak} days. Did your router break after that or what? 🔌`,
  () => `Your contribution graph looks like a barcode that scans as "Skill Issue". 💀`,
  (s: CombinedStats) =>
    `Only ${s.totalContributions} commits? The "Commit" button isn't going to bite you. 🐛`,
  (s: CombinedStats) =>
    `${s.followers} followers. Impressive. Do any of them actually read your code? 🧐`,
];

const HYPES = [
  (s: CombinedStats) =>
    `A ${s.currentStreak}-day streak! Your keyboard must be melting right now. 🔥`,
  (s: CombinedStats) =>
    `${s.totalContributions} commits! The open-source world rests on your shoulders. 🌍`,
  (s: CombinedStats) =>
    `${s.stars} stars earned! You're basically GitHub royalty at this point. 👑`,
  (s: CombinedStats) =>
    `${s.repositories} repositories? The devil works hard, but you work harder. ⚡`,
  (s: CombinedStats) => `With a peak streak of ${s.peakStreak}, you're literally unstoppable. 🚀`,
  (s: CombinedStats) => `${s.followers} followers! They're witnessing greatness in real-time. 📈`,
];

type Mode = 'roast' | 'hype';

export default function RoastWidget({ stats, profile }: RoastWidgetProps) {
  const [mode, setMode] = useState<Mode>('roast');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const combinedStats: CombinedStats = {
    ...stats,
    ...profile.stats,
  };

  const messages = mode === 'roast' ? ROASTS : HYPES;
  const currentMessage = messages[messageIndex](combinedStats);

  const handleGenerate = (newMode: Mode) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMode(newMode);

    // Pick a random index different from current if staying in same mode
    let nextIdx = Math.floor(Math.random() * messages.length);
    if (newMode === mode && nextIdx === messageIndex) {
      nextIdx = (nextIdx + 1) % messages.length;
    }

    setMessageIndex(nextIdx);

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-[1px] rounded-2xl overflow-hidden group"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-transparent to-orange-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white/50 dark:bg-[#0a0a0a] backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-5 flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquareWarning className="w-4 h-4 text-orange-500" />
            AI Vibe Check
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => handleGenerate('hype')}
              className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md transition-colors ${
                mode === 'hype'
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  : 'text-zinc-500 hover:text-emerald-500 border border-transparent'
              }`}
            >
              Hype Me
            </button>
            <button
              onClick={() => handleGenerate('roast')}
              className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md transition-colors ${
                mode === 'roast'
                  ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                  : 'text-zinc-500 hover:text-red-500 border border-transparent'
              }`}
            >
              Roast Me
            </button>
          </div>
        </div>

        <div className="relative flex-1 min-h-[60px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className={`text-sm leading-relaxed font-medium ${
                mode === 'roast' ? 'text-orange-400/90' : 'text-emerald-400/90'
              }`}
            >
              &quot;{currentMessage}&quot;
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={() => handleGenerate(mode)}
          disabled={isAnimating}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs font-semibold text-zinc-600 dark:text-zinc-400"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
          Spin Again
        </button>
      </div>
    </motion.div>
  );
}
