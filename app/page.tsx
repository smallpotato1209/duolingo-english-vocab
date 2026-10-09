'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { QuizCard } from '@/app/components/QuizCard';
import { WordBankPanel } from '@/app/components/WordBankPanel';
import { WordInputForm } from '@/app/components/WordInputForm';
import type { WordEntry } from '@/lib/types';

const seedWords: WordEntry[] = [
  { id: '1', english: 'hello', chinese: '你好', mastery: 1, pronunciation: 'həˈloʊ', category: 'greeting' },
  { id: '2', english: 'travel', chinese: '旅行', mastery: 2, pronunciation: 'ˈtrævəl', category: 'travel' },
  { id: '3', english: 'study', chinese: '學習', mastery: 3, pronunciation: 'ˈstʌdi', category: 'learning' },
  { id: '4', english: 'friend', chinese: '朋友', mastery: 1, pronunciation: 'frend', category: 'relationship' }
];

const navItems = [
  { label: 'Home', icon: '🏠', active: true },
  { label: 'Learn', icon: '🧠' },
  { label: 'My Word Bank', icon: '📚' },
  { label: 'Practice', icon: '🎯' },
  { label: 'Profile', icon: '👤' }
];

export default function HomePage() {
  const [words, setWords] = useState<WordEntry[]>(seedWords);

  const totalMastery = useMemo(
    () => words.reduce((sum, word) => sum + word.mastery, 0),
    [words]
  );

  const handleWordAdded = (newWord: WordEntry) => {
    setWords((current) => [newWord, ...current]);
  };

  return (
    <main className="min-h-screen bg-duolingo-cream text-duolingo-ink">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="lg:w-72">
            <div className="duo-card p-4">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-duolingo-green text-2xl font-black text-white shadow-duo">
                  E
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-duolingo-muted">English Quest</p>
                  <h1 className="text-xl font-black">Daily Path</h1>
                </div>
              </div>

              <nav className="space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold transition ${
                      item.active
                        ? 'bg-duolingo-green text-white shadow-duo'
                        : 'bg-white text-duolingo-ink hover:bg-duolingo-greenSoft'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <section className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="duo-card flex flex-col gap-6 p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-duolingo-green">Streak</p>
                <h2 className="mt-2 text-3xl font-black">7 day streak</h2>
                <p className="mt-2 text-sm text-duolingo-muted">Keep your momentum and unlock the next XP tier.</p>
              </div>

              <div className="grid min-w-[220px] grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-duolingo-greenSoft px-4 py-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-duolingo-muted">XP</div>
                  <div className="mt-1 text-2xl font-black text-duolingo-ink">520</div>
                </div>
                <div className="rounded-2xl bg-yellow-100 px-4 py-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-duolingo-muted">Hearts</div>
                  <div className="mt-1 text-2xl font-black text-duolingo-ink">5</div>
                </div>
                <div className="rounded-2xl bg-sky-100 px-4 py-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-duolingo-muted">Words</div>
                  <div className="mt-1 text-2xl font-black text-duolingo-ink">{words.length}</div>
                </div>
              </div>
            </motion.div>

            <WordInputForm onWordAdded={handleWordAdded} />

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <WordBankPanel words={words} />

              <div className="space-y-6">
                <div className="duo-card p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-black">Mastery</h3>
                    <span className="rounded-full bg-duolingo-greenSoft px-3 py-1 text-xs font-bold text-duolingo-green">
                      {Math.round((totalMastery / (words.length * 3)) * 100) || 0}%
                    </span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-duolingo-green to-emerald-400"
                      style={{ width: `${Math.min((totalMastery / (words.length * 3)) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="duo-card p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-duolingo-muted">Leaderboard</p>
                  <div className="mt-4 space-y-3">
                    {[
                      ['You', 520],
                      ['Mina', 490],
                      ['Leo', 470],
                      ['Ava', 440]
                    ].map(([name, xp], index) => (
                      <div key={name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-duolingo-green text-sm font-black text-white">
                            {index + 1}
                          </div>
                          <span className="font-bold">{name}</span>
                        </div>
                        <span className="text-sm font-bold text-duolingo-muted">{xp} XP</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <QuizCard words={words} />
          </section>
        </div>
      </div>
    </main>
  );
}
