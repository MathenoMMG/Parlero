'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExamConfig } from '../../components/exam/ExamConfig';
import { milestones } from '../../data/milestones';

export default function ExamConfigPage() {
  const router = useRouter();

  const handleStartExam = (config: {
    selectedMilestoneIds: number[];
    timeLimitEnabled: boolean;
    questionCount: number;
  }) => {
    // Save configuration in sessionStorage to retrieve it in the active session page
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('exam-config', JSON.stringify(config));
    }
    router.push('/exam/session');
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="w-9 h-9 rounded-full bg-background hover:bg-border/60 text-text-primary flex items-center justify-center transition-colors focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Simulatore CLA A2
          </h1>
          <p className="text-xs text-text-secondary leading-none">
            Mettiti alla prova con le domande ufficiali d&apos;esame.
          </p>
        </div>
      </div>

      {/* Configuration panel */}
      <div className="flex-grow flex flex-col justify-start">
        <ExamConfig milestones={milestones} onStart={handleStartExam} />
      </div>
    </div>
  );
}
