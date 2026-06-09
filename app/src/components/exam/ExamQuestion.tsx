'use client';

import React from 'react';
import { Question } from '../../types';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

interface ExamQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const ExamQuestion: React.FC<ExamQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onPrev,
  onNext,
  isFirst,
  isLast,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
          Domanda {questionNumber} di {totalQuestions}
        </span>
        <span className="text-xs font-bold text-accent uppercase tracking-widest">
          {question.topic}
        </span>
      </div>

      {/* Question Text Card */}
      <Card variant="raised" className="p-6 border-b-4 border-border/85 bg-surface">
        <h2 className="font-display text-xl md:text-2xl font-bold text-text-primary leading-snug">
          {question.question_text}
        </h2>
      </Card>

      {/* Options Grid */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option.text;

          return (
            <motion.button
              key={index}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectAnswer(option.text)}
              className={`w-full min-h-[52px] rounded-md px-4 py-3 text-left text-sm transition-all focus:outline-none cursor-pointer flex items-center justify-between border-2 ${
                isSelected
                  ? 'border-primary bg-primary/5 text-primary font-semibold'
                  : 'border-border bg-surface text-text-primary hover:bg-background'
              }`}
            >
              <span>{option.text}</span>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected ? 'border-primary bg-primary text-white' : 'border-border bg-background'
                }`}
              >
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="py-3 rounded-md border border-border bg-surface hover:bg-background text-sm font-semibold transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex justify-center items-center gap-1.5 focus:outline-none text-text-primary"
        >
          ← Indietro
        </button>

        <button
          onClick={onNext}
          className="py-3 rounded-md bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all cursor-pointer flex justify-center items-center gap-1.5 focus:outline-none"
        >
          {isLast ? 'Termina Esame ✓' : 'Avanti →'}
        </button>
      </div>
    </div>
  );
};
