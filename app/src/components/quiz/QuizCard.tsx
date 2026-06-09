'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../types';
import { useProgressStore } from '../../stores/useProgressStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, onNext }) => {
  const { soundEnabled } = useProgressStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const speak = (text: string) => {
    if (!soundEnabled) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOptionClick = (optionText: string, isCorrect: boolean) => {
    if (isAnswered) return;

    setSelectedOption(optionText);
    setIsAnswered(true);

    if (isCorrect) {
      // Play success tone
      if (soundEnabled && typeof window !== 'undefined') {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 4000);

      // Play failure tone
      if (soundEnabled && typeof window !== 'undefined') {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    }

    onAnswer(isCorrect);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Question Card */}
      <motion.div
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <Card variant="raised" className="relative p-6 border-b-4 border-border/80">
          <div className="flex justify-between items-start gap-4 mb-4">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              {question.topic}
            </span>
            
            {/* Pronounce Trigger */}
            <button
              onClick={() => speak(question.question_text.replace('______', '...'))}
              className="text-text-secondary hover:text-text-primary p-1 rounded-full hover:bg-background transition-colors"
              aria-label="Ascolta frase"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>
          
          <h2 className="font-display text-xl md:text-2xl font-bold text-text-primary leading-snug">
            {question.question_text}
          </h2>

          {question.hint && (
            <div className="mt-4 pt-3 border-t border-border/40">
              {showHint || isAnswered ? (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Suggerimento (Hint):</span>
                  <p className="text-xs text-text-secondary leading-normal italic">{question.hint}</p>
                </div>
              ) : (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mostra suggerimento (Hint)
                </button>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Options Stack */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option.text;
          const isCorrect = option.is_correct;
          
          let btnStyle = 'border-2 border-border bg-surface text-text-primary';
          
          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'border-2 border-primary bg-primary/10 text-primary font-semibold';
            } else if (isSelected) {
              btnStyle = 'border-2 border-error bg-error/10 text-error';
            } else {
              btnStyle = 'border-2 border-border bg-surface text-text-secondary opacity-60';
            }
          } else {
            btnStyle = 'border-2 border-border bg-surface text-text-primary hover:bg-background focus:ring-2 focus:ring-primary/40';
          }

          return (
            <motion.button
              key={index}
              disabled={isAnswered}
              whileTap={{ scale: isAnswered ? 1 : 0.98 }}
              onClick={() => handleOptionClick(option.text, isCorrect)}
              className={`w-full min-h-[52px] rounded-md px-4 py-3 text-left text-sm transition-all focus:outline-none cursor-pointer flex items-center justify-between ${btnStyle}`}
            >
              <span>{option.text}</span>
              {isAnswered && isCorrect && (
                <span className="text-primary font-bold text-sm">✓</span>
              )}
              {isAnswered && isSelected && !isCorrect && (
                <span className="text-error font-bold text-sm">✗</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation Block */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2"
        >
          <Card variant="flat" className="p-4 bg-background border border-border/80">
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-1">
              Spiegazione
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              {question.explanation}
            </p>
            <Button variant="primary" fullWidth onClick={onNext}>
              Continua
            </Button>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
