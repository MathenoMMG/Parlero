'use client';

import React, { useState } from 'react';
import { VocabularyWord } from '../../types';
import { useProgressStore } from '../../stores/useProgressStore';
import { Card } from '../ui/Card';

interface VocabularyListProps {
  words: VocabularyWord[];
}

export const VocabularyList: React.FC<VocabularyListProps> = ({ words }) => {
  const { soundEnabled } = useProgressStore();
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const speak = (text: string) => {
    if (!soundEnabled) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.85; // Slightly slower for language learning clarity
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleWordClick = (word: string) => {
    setActiveWord(word);
    speak(word);
    setTimeout(() => {
      setActiveWord(null);
    }, 4000);
  };

  // Group words by category
  const categories = Array.from(new Set(words.map(w => w.category)));

  return (
    <div className="w-full flex flex-col gap-6">
      {categories.map((category) => {
        const categoryWords = words.filter(w => w.category === category);

        return (
          <div key={category} className="flex flex-col gap-2.5">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider pl-1">
              {category}
            </h3>
            <Card variant="raised" className="p-0 overflow-hidden">
              <div className="divide-y divide-border/60">
                {categoryWords.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleWordClick(item.word)}
                    className={`flex items-center justify-between p-4 cursor-pointer transition-colors active:bg-background ${
                      activeWord === item.word ? 'bg-primary/5 hover:bg-primary/5' : 'hover:bg-background/40'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-text-primary">
                        {item.word}
                      </span>
                      <span className="text-xs text-text-secondary mt-0.5">
                        {item.translation}
                      </span>
                    </div>

                    {/* Audio Tigger Button */}
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        activeWord === item.word
                          ? 'bg-primary text-white'
                          : 'bg-background hover:bg-border text-text-secondary hover:text-text-primary'
                      }`}
                      aria-label={`Ascolta la pronuncia di ${item.word}`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
