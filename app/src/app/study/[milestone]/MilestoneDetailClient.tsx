'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { milestones } from '../../../data/milestones';
import { ExplanationCard } from '../../../components/study/ExplanationCard';
import { VocabularyList } from '../../../components/study/VocabularyList';
import { Button } from '../../../components/ui/Button';

interface ClientProps {
  milestoneId: number;
}

export default function MilestoneDetailClient({ milestoneId }: ClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'grammar' | 'vocab'>('grammar');

  const milestone = milestones.find((m) => m.id === milestoneId);

  if (!milestone) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Milestone non trovato
        </h2>
        <Link href="/study" className="mt-4">
          <Button variant="primary">Torna alla Mappa</Button>
        </Link>
      </div>
    );
  }

  const handleGrammarComplete = () => {
    setActiveTab('vocab');
  };

  const handleStartQuiz = () => {
    router.push(`/study/${milestoneId}/quiz`);
  };

  return (
    <div className="flex-1 flex flex-col p-6 justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-5">
          <Link
            href="/study"
            className="w-9 h-9 rounded-full bg-background hover:bg-border/60 text-text-primary flex items-center justify-center transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none block">
              Passo {milestone.id} di 10
            </span>
            <h1 className="font-display text-xl md:text-2xl font-bold text-text-primary truncate">
              {milestone.title}
            </h1>
          </div>
        </div>

        {/* Custom Tab Selector */}
        <div className="flex bg-background p-1 rounded-md border border-border/40 mb-6">
          <button
            onClick={() => setActiveTab('grammar')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer focus:outline-none ${
              activeTab === 'grammar'
                ? 'bg-surface text-primary shadow-sm font-bold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Spiegazione Grammatica
          </button>
          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer focus:outline-none ${
              activeTab === 'vocab'
                ? 'bg-surface text-primary shadow-sm font-bold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Vocabolario ({milestone.vocabulary.length})
          </button>
        </div>
      </div>

      {/* Main Tab Panel */}
      <div className="flex-grow flex flex-col justify-start mb-6">
        {activeTab === 'grammar' ? (
          <ExplanationCard
            sections={milestone.grammar}
            onComplete={handleGrammarComplete}
          />
        ) : (
          <div className="flex flex-col gap-6 w-full">
            <p className="text-xs text-text-secondary italic pl-1 leading-normal">
              Clicca su una parola per ascoltare la corretta pronuncia in italiano.
            </p>
            <VocabularyList words={milestone.vocabulary} />
          </div>
        )}
      </div>

      {/* Persistent Quiz Launch Action at bottom of Vocab Tab */}
      {activeTab === 'vocab' && (
        <div className="mt-auto pt-4 border-t border-border/40">
          <Button variant="primary" fullWidth size="lg" onClick={handleStartQuiz}>
            Inizia il Quiz dello Step
          </Button>
        </div>
      )}
    </div>
  );
}
