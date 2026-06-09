'use client';

import React, { useState } from 'react';
import { Milestone } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ExamConfigProps {
  milestones: Milestone[];
  onStart: (config: {
    selectedMilestoneIds: number[];
    timeLimitEnabled: boolean;
    questionCount: number;
  }) => void;
}

export const ExamConfig: React.FC<ExamConfigProps> = ({ milestones, onStart }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(milestones.map(m => m.id));
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(true);
  const [questionCount, setQuestionCount] = useState(50);

  const toggleMilestone = (id: number) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(prev => prev.filter(itemId => itemId !== id));
      }
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const selectAll = () => {
    setSelectedIds(milestones.map(m => m.id));
  };

  const selectNone = () => {
    // Keep at least one
    setSelectedIds([1]);
  };

  const handleStart = () => {
    onStart({
      selectedMilestoneIds: selectedIds,
      timeLimitEnabled,
      questionCount,
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <Card variant="raised" className="p-6">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-1">
          Configura Esame
        </h2>
        <p className="text-sm text-text-secondary mb-6">
          Personalizza la tua simulazione d&apos;esame CLA per il Politecnico di Torino.
        </p>

        {/* 1. Question Count Selection */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Numero di domande
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[20, 50].map((count) => (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={`py-3 rounded-md border-2 text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
                  questionCount === count
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-surface text-text-secondary hover:bg-background'
                }`}
              >
                {count === 20 ? 'Rapido (20 domande)' : 'Standard (50 domande)'}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Timer Toggle */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Limite di tempo (Simulatore CLA)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTimeLimitEnabled(true)}
              className={`py-3 rounded-md border-2 text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
                timeLimitEnabled
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-surface text-text-secondary hover:bg-background'
              }`}
            >
              Abilitato ({questionCount === 50 ? '45 min' : '20 min'})
            </button>
            <button
              onClick={() => setTimeLimitEnabled(false)}
              className={`py-3 rounded-md border-2 text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
                !timeLimitEnabled
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-surface text-text-secondary hover:bg-background'
              }`}
            >
              Nessun limite
            </button>
          </div>
        </div>

        {/* 3. Topics Selection */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
              Argomenti inclusi ({selectedIds.length})
            </label>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="text-[10px] text-primary hover:underline font-bold bg-transparent border-0 cursor-pointer"
              >
                Seleziona Tutti
              </button>
              <span className="text-[10px] text-border">|</span>
              <button
                onClick={selectNone}
                className="text-[10px] text-text-secondary hover:underline bg-transparent border-0 cursor-pointer"
              >
                Resetta
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1 border border-border/40 p-2 rounded-md bg-background/30 mt-1">
            {milestones.map((milestone) => {
              const selected = selectedIds.includes(milestone.id);
              return (
                <div
                  key={milestone.id}
                  onClick={() => toggleMilestone(milestone.id)}
                  className={`flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors ${
                    selected ? 'bg-surface border border-primary/20 shadow-sm' : 'hover:bg-background/50 border border-transparent'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      selected ? 'bg-primary border-primary text-white' : 'border-border bg-surface'
                    }`}
                  >
                    {selected && <span className="text-xs font-bold">✓</span>}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-primary">
                      {milestone.id}. {milestone.title}
                    </span>
                    <span className="text-[10px] text-text-secondary leading-none">
                      {milestone.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <Button variant="primary" fullWidth size="lg" onClick={handleStart}>
          Inizia Simulazione
        </Button>
      </Card>
    </div>
  );
};
