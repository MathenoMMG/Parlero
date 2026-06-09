'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

interface TopicScore {
  topic: string;
  total: number;
  correct: number;
}

interface ScoreBreakdownProps {
  score: number; // 0 to 100
  totalQuestions: number;
  correctAnswers: number;
  topicScores: Record<string, TopicScore>;
  timeSpentSeconds: number;
  onRestart: () => void;
  onHome: () => void;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  topicScores,
  timeSpentSeconds,
  onRestart,
  onHome,
}) => {
  const isPassed = score >= 60; // 60% is passing

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Overall Result Card */}
      <Card variant="raised" className="text-center p-8 border-b-4 border-border/80">
        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
          Simulazione completata
        </span>
        <h2 className="font-display text-3xl font-bold text-text-primary mt-1 mb-5">
          Risultato Finale
        </h2>

        {/* Big Ring Score */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-[140px] h-[140px] rounded-full border-8 flex flex-col items-center justify-center shadow-inner ${
              isPassed ? 'border-primary bg-primary/5' : 'border-error bg-error/5'
            }`}
          >
            <span
              className={`text-4xl font-extrabold leading-none ${
                isPassed ? 'text-primary' : 'text-error'
              }`}
            >
              {score}%
            </span>
            <span className="text-[10px] text-text-secondary mt-1 font-semibold">
              {correctAnswers}/{totalQuestions} Esatti
            </span>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
          {isPassed ? (
            <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">IDONEO ✓</span>
          ) : (
            <span className="text-error bg-error/10 px-3 py-1 rounded-full">NON IDONEO ✗</span>
          )}
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-4 border-t border-border pt-5 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-text-secondary uppercase">Tempo impiegato</span>
            <span className="text-sm font-bold text-text-primary mt-0.5">
              {formatTime(timeSpentSeconds)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-text-secondary uppercase">Soglia Idoneità</span>
            <span className="text-sm font-bold text-text-primary mt-0.5">60% (30/50)</span>
          </div>
        </div>
      </Card>

      {/* 2. Topic Breakdown Card */}
      <Card variant="raised" className="p-6">
        <h3 className="font-display text-lg font-bold text-text-primary mb-1">
          Rapporto per Argomento
        </h3>
        <p className="text-xs text-text-secondary mb-5">
          Identifica i tuoi punti deboli da studiare nelle prossime 48 ore.
        </p>

        <div className="flex flex-col gap-4">
          {Object.values(topicScores).map((ts) => {
            const percentage = ts.total > 0 ? Math.round((ts.correct / ts.total) * 100) : 0;
            const topicPassed = percentage >= 60;

            return (
              <div key={ts.topic} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-text-primary truncate max-w-[200px]">
                    {ts.topic}
                  </span>
                  <span className={`font-semibold ${topicPassed ? 'text-primary' : 'text-error'}`}>
                    {percentage}% ({ts.correct}/{ts.total})
                  </span>
                </div>
                <ProgressBar
                  value={percentage}
                  height={6}
                  color={topicPassed ? 'bg-primary' : 'bg-error'}
                  animate={false}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* 3. Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button variant="primary" size="lg" fullWidth onClick={onRestart}>
          Nuovo Tentativo
        </Button>
        <Button variant="secondary" size="md" fullWidth onClick={onHome}>
          Torna alla Home
        </Button>
      </div>
    </div>
  );
};
