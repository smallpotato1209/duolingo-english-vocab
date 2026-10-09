'use client';

import { useMemo, useState } from 'react';
import type { WordEntry } from '@/lib/types';

const buildQuestionSet = (words: WordEntry[]) => {
  if (!words.length) return [];

  return words.slice(0, 5).map((word, index) => ({
    id: word.id,
    prompt: word.english,
    choices: [
      word.chinese,
      index % 2 === 0 ? '家人' : '時間',
      index % 3 === 0 ? '學習' : '重新開始',
      index % 2 === 1 ? '快樂' : '理解'
    ].sort(() => Math.random() - 0.5),
    answer: word.chinese,
    pronunciation: word.pronunciation || word.english
  }));
};

export function QuizCard({ words }: { words: WordEntry[] }) {
  const questionSet = useMemo(() => buildQuestionSet(words), [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'game-over'>('idle');

  const current = questionSet[currentIndex];

  const playAudio = () => {
    if (!current) return;
    const utterance = new SpeechSynthesisUtterance(current.pronunciation);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (choice: string) => {
    if (!current) return;

    if (choice === current.answer) {
      setScore((prev) => prev + 10);
      setStatus('correct');
    } else {
      setHearts((prev) => Math.max(prev - 1, 0));
      setStatus('wrong');
    }

    setTimeout(() => {
      if (currentIndex >= questionSet.length - 1 || (hearts <= 1 && choice !== current.answer)) {
        setStatus('game-over');
        return;
      }

      setCurrentIndex((prev) => prev + 1);
      setStatus('idle');
    }, 700);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setHearts(5);
    setScore(0);
    setStatus('idle');
  };

  if (!questionSet.length) {
    return (
      <div className="duo-card p-5">
        <h3 className="text-2xl font-black">Practice</h3>
        <p className="mt-2 text-duolingo-muted">Add some words to begin your learning round.</p>
      </div>
    );
  }

  return (
    <div className="duo-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-duolingo-muted">Practice round</p>
          <h3 className="mt-2 text-2xl font-black">English ↔ Chinese</h3>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-sm font-black text-red-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>{index < hearts ? '❤️' : '🖤'}</span>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-duolingo-greenSoft to-sky-50 p-5">
        {status === 'game-over' ? (
          <div className="text-center">
            <p className="text-2xl font-black">Round complete</p>
            <p className="mt-2 text-duolingo-muted">Score: {score} XP</p>
            <button
              onClick={resetQuiz}
              className="mt-4 rounded-full bg-duolingo-green px-5 py-3 text-sm font-black text-white"
            >
              Restart
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-duolingo-ink">
                {currentIndex + 1}/{questionSet.length}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-duolingo-ink">
                +{score} XP
              </span>
            </div>

            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.25em] text-duolingo-muted">Listen and choose</p>
              <h4 className="mt-3 text-4xl font-black">{current.prompt}</h4>
              <button
                onClick={playAudio}
                className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-black text-duolingo-ink shadow-sm"
              >
                🔊 Pronounce it
              </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {current.choices.map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleAnswer(choice)}
                  className={`rounded-2xl px-4 py-4 text-left text-base font-bold transition ${
                    status === 'correct' && choice === current.answer
                      ? 'bg-emerald-100 text-emerald-700'
                      : status === 'wrong' && choice === current.answer
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-white text-duolingo-ink hover:bg-duolingo-greenSoft'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
