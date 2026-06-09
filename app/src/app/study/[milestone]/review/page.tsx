'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { milestones } from '../../../../data/milestones';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { ReviewCard } from '../../../../components/quiz/ReviewCard';

interface PageProps {
  params: Promise<{ milestone: string }>;
}

export default function ReviewPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const milestoneId = parseInt(resolvedParams.milestone);
  const [reviewItems, setReviewItems] = useState<any[]>([]);

  const milestone = milestones.find((m) => m.id === milestoneId);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.sessionStorage.getItem(`quiz-review-${milestoneId}`);
      if (stored) {
        setReviewItems(JSON.parse(stored));
      }
    }
  }, [milestoneId]);

  if (!milestone) return null;

  const correctCount = reviewItems.filter(item => item.isCorrect).length;
  const scorePercent = reviewItems.length > 0 ? Math.round((correctCount / reviewItems.length) * 100) : 0;
  const isPassed = scorePercent >= 60;

  return (
    <div className="flex-1 flex flex-col p-6 justify-between">
      <div>
        {/* Header */}
        <h1 className="font-display text-2xl font-bold text-text-primary mb-1">
          Revisione Quiz
        </h1>
        <p className="text-xs text-text-secondary mb-6">
          Step {milestoneId}: {milestone.title}
        </p>

        {/* Score Summary Banner */}
        <Card variant="raised" className="text-center p-6 mb-6 border-b-2 border-primary/20">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
            Risultato del tentativo
          </span>
          <span className={`text-4xl font-extrabold block mt-2 ${isPassed ? 'text-primary' : 'text-error'}`}>
            {scorePercent}%
          </span>
          <span className="text-xs text-text-secondary block mt-1 font-semibold">
            {correctCount} su {reviewItems.length} risposte corrette
          </span>
          
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              isPassed ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'
            }`}>
              {isPassed ? 'PROVA SUPERATA ✓' : 'PROVA NON SUPERATA ✗'}
            </span>
          </div>
        </Card>

        {/* Review List */}
        {reviewItems.length > 0 ? (
          <ReviewCard items={reviewItems} />
        ) : (
          <p className="text-sm text-text-secondary text-center italic my-8">
            Nessun dato di revisione disponibile.
          </p>
        )}
      </div>

      {/* Footer action buttons */}
      <div className="mt-8 pt-4 border-t border-border/40 flex flex-col gap-3">
        <Link href="/study" className="w-full">
          <Button variant="primary" fullWidth size="lg">
            Torna alla Mappa
          </Button>
        </Link>
        {!isPassed && (
          <Link href={`/study/${milestoneId}/quiz`} className="w-full">
            <Button variant="outline" fullWidth size="md">
              Riprova Quiz
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
