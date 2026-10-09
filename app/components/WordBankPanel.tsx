'use client';

import { motion } from 'framer-motion';
import type { WordEntry } from '@/lib/types';

export function WordBankPanel({ words }: { words: WordEntry[] }) {
  return (
    <div className="duo-card p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-duolingo-muted">My Word Bank</p>
          <h3 className="mt-2 text-2xl font-black">字詞庫</h3>
        </div>
        <div className="rounded-full bg-duolingo-greenSoft px-3 py-1 text-xs font-bold text-duolingo-green">
          {words.length} words
        </div>
      </div>

      <div className="space-y-3">
        {words.map((word) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-black">{word.english}</span>
                <button className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">🔊</button>
              </div>
              <p className="mt-1 text-sm font-medium text-duolingo-muted">{word.chinese}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-bold text-sky-700">{word.category}</span>
              <span className="rounded-full bg-duolingo-greenSoft px-2 py-1 text-xs font-bold text-duolingo-green">
                {word.mastery >= 3 ? 'Mastered' : word.mastery >= 2 ? 'Learning' : 'New'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
