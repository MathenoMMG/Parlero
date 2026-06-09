'use client';

import React from 'react';
import { Question } from '../../types';
import { Card } from '../ui/Card';

interface ReviewItem {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
}

interface ReviewCardProps {
  items: ReviewItem[];
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ items }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide px-1">
        Riepilogo Risposte
      </h3>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => {
          const correctOption = item.question.options.find(o => o.is_correct)?.text;

          return (
            <Card
              key={index}
              variant="raised"
              className={`border-l-4 ${
                item.isCorrect ? 'border-l-primary' : 'border-l-error'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  Domanda {index + 1}
                </span>
                <span
                  className={`text-xs font-bold ${
                    item.isCorrect ? 'text-primary' : 'text-error'
                  }`}
                >
                  {item.isCorrect ? 'Corretto' : 'Errato'}
                </span>
              </div>

              <p className="text-sm font-semibold text-text-primary mb-3">
                {item.question.question_text}
              </p>

              {/* Answers breakdown */}
              <div className="flex flex-col gap-1.5 text-xs mb-3 bg-background/50 p-2.5 rounded-md border border-border/40">
                <div className="flex items-center gap-1">
                  <span className="text-text-secondary">Tua risposta:</span>
                  <span
                    className={`font-semibold ${
                      item.isCorrect ? 'text-primary' : 'text-error'
                    }`}
                  >
                    {item.selectedAnswer}
                  </span>
                </div>
                {!item.isCorrect && (
                  <div className="flex items-center gap-1">
                    <span className="text-text-secondary">Risposta corretta:</span>
                    <span className="font-semibold text-primary">
                      {correctOption}
                    </span>
                  </div>
                )}
              </div>

              {/* Spiegazione */}
              <div className="text-xs text-text-secondary border-t border-border/40 pt-2.5">
                <span className="font-bold text-text-primary">Spiegazione: </span>
                {item.question.explanation}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
