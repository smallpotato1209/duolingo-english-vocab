'use client';

import { useEffect, useState } from 'react';
import type { WordEntry } from '@/lib/types';

const reverseDictionary: Record<string, string[]> = {
  你好: ['hello', 'hi'],
  旅行: ['travel', 'journey'],
  學習: ['study', 'learn'],
  朋友: ['friend', 'mate']
};

export function WordInputForm({ onWordAdded }: { onWordAdded: (word: WordEntry) => void }) {
  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!english.trim() && chinese.trim()) {
      const list = reverseDictionary[chinese.trim()] ?? ['good morning', 'family', 'language'];
      setSuggestions(list.slice(0, 4));
      return;
    }

    if (english.trim() && !chinese.trim()) {
      setSuggestions([]);
    }
  }, [english, chinese]);

  const fetchTranslation = async () => {
    if (!english.trim()) {
      setNotice('Type an English word first to auto-translate.');
      return;
    }

    setLoading(true);
    setNotice('');

    try {
      const response = await fetch(`/api/translate?text=${encodeURIComponent(english.trim())}&source=en&target=zh`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      if (!chinese.trim()) {
        setChinese(data.translation || '');
      }

      setNotice(`Auto-translation ready: ${data.translation || 'Chinese meaning loaded'}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error';
      setNotice(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const trimmedEnglish = english.trim();
    const trimmedChinese = chinese.trim();

    if (!trimmedEnglish || !trimmedChinese) {
      setNotice('Please provide both English and Chinese definitions.');
      return;
    }

    onWordAdded({
      id: crypto.randomUUID(),
      english: trimmedEnglish.toLowerCase(),
      chinese: trimmedChinese,
      mastery: 1,
      pronunciation: trimmedEnglish,
      category: 'custom'
    });

    setEnglish('');
    setChinese('');
    setNotice('Word saved to your vocabulary bank!');
  };

  return (
    <div className="duo-card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-duolingo-muted">Add a word</p>
          <h3 className="mt-2 text-2xl font-black">Custom vocabulary</h3>
        </div>
        <button
          onClick={fetchTranslation}
          className="rounded-full bg-duolingo-blue px-4 py-2 text-sm font-black text-white transition hover:brightness-105"
        >
          {loading ? 'Loading...' : 'Auto-Translate'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-duolingo-muted">English word or phrase</span>
          <input
            value={english}
            onChange={(event) => setEnglish(event.target.value)}
            placeholder="e.g. understand"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-duolingo-green"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-duolingo-muted">Chinese meaning</span>
          <input
            value={chinese}
            onChange={(event) => setChinese(event.target.value)}
            placeholder="e.g. 理解 / 明白"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-duolingo-green"
          />
        </label>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-bold text-duolingo-muted">Reverse lookup suggestions</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setEnglish(suggestion)}
                className="rounded-full bg-duolingo-greenSoft px-3 py-1 text-sm font-bold text-duolingo-ink"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {notice && (
        <div className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-duolingo-ink">{notice}</div>
      )}

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSubmit}
          className="rounded-full bg-duolingo-green px-5 py-3 text-sm font-black text-white shadow-duo transition hover:translate-y-[-1px]"
        >
          Save to Word Bank
        </button>
      </div>
    </div>
  );
}
