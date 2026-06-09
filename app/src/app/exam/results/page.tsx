'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScoreBreakdown } from '../../../components/exam/ScoreBreakdown';
import { Card } from '../../../components/ui/Card';

export default function ExamResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<any | null>(null);
  const [showReviewList, setShowReviewList] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.sessionStorage.getItem('exam-results');
      if (stored) {
        setResults(JSON.parse(stored));
      } else {
        router.replace('/exam');
      }
    }
  }, [router]);

  if (!results) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-sm text-text-secondary">Caricamento risultati...</p>
      </div>
    );
  }

  const handleRestart = () => {
    router.push('/exam');
  };

  const handleHome = () => {
    router.push('/');
  };

  const {
    score,
    totalQuestions,
    correctAnswers,
    topicScores,
    timeSpentSeconds,
    reviewItems,
    autoSubmitted,
  } = results;

  return (
    <div className="flex-1 flex flex-col p-6">
      {/* Auto submission warning */}
      {autoSubmitted && (
        <div className="bg-error/10 border border-error/20 rounded-md p-3 mb-6 text-center text-xs font-bold text-error">
          Tempo scaduto! L&apos;esame è stato consegnato automaticamente.
        </div>
      )}

      {/* Main Results Dashboard */}
      <ScoreBreakdown
        score={score}
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
        topicScores={topicScores}
        timeSpentSeconds={timeSpentSeconds}
        onRestart={handleRestart}
        onHome={handleHome}
      />

      {/* Accordion list for question review */}
      <div className="mt-8 border-t border-border/40 pt-6">
        <button
          onClick={() => setShowReviewList(!showReviewList)}
          className="w-full flex items-center justify-between py-3 px-1 hover:bg-background/40 transition-colors font-display text-lg font-bold text-text-primary focus:outline-none cursor-pointer border-0 bg-transparent text-left"
        >
          <span>Vedi Correzione Domande</span>
          <span className="text-text-secondary text-sm">
            {showReviewList ? 'Nascondi ▲' : 'Mostra ▼'}
          </span>
        </button>

        {showReviewList && (
          <div className="flex flex-col gap-4 mt-4">
            {reviewItems.map((item: any, index: number) => {
              const correctOption = item.question.options.find((o: any) => o.is_correct)?.text;
              
              return (
                <Card
                  key={index}
                  variant="raised"
                  className={`border-l-4 ${
                    item.isCorrect ? 'border-l-primary' : 'border-l-error'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">
                      Domanda {index + 1} &bull; Step {item.question.milestone_id}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        item.isCorrect ? 'text-primary' : 'text-error'
                      }`}
                    >
                      {item.isCorrect ? 'Esatta' : 'Errata'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-text-primary mb-3">
                    {item.question.question_text}
                  </p>

                  <div className="flex flex-col gap-1.5 text-xs mb-3 bg-background/50 p-2.5 rounded-md border border-border/40">
                    <div className="flex items-center gap-1.5">
                      <span className="text-text-secondary">La tua risposta:</span>
                      <span
                        className={`font-semibold ${
                          item.isCorrect ? 'text-primary' : 'text-error'
                        }`}
                      >
                        {item.selectedAnswer || 'Nessuna risposta'}
                      </span>
                    </div>
                    {!item.isCorrect && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-text-secondary">Risposta corretta:</span>
                        <span className="font-semibold text-primary">
                          {correctOption}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-text-secondary border-t border-border/40 pt-2.5">
                    <span className="font-bold text-text-primary">Spiegazione: </span>
                    {item.question.explanation}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
