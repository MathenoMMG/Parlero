'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Milestone } from '../../types';

interface MilestoneMapProps {
  milestones: Milestone[];
  progress: Record<number, { completed: boolean; score: number }>;
}

export const MilestoneMap: React.FC<MilestoneMapProps> = ({ milestones, progress }) => {
  // Determine if a milestone is unlocked.
  // Milestone 1 is always unlocked. Milestone N is unlocked if N-1 is completed.
  const isUnlocked = (id: number) => {
    if (id === 1) return true;
    const prevMilestone = progress[id - 1];
    return prevMilestone && prevMilestone.completed;
  };

  return (
    <div className="relative w-full py-10 px-4 flex flex-col items-center">
      {/* SVG Connecting Path */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <path
          d={milestones
            .map((m, index) => {
              const y = index * 140 + 70;
              // Alternate x positions: 30%, 70%, 30%, 70%...
              const x = index % 2 === 0 ? '30%' : '70%';
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ')}
          fill="none"
          stroke="var(--border)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10 10"
        />
        {/* Animated active path line */}
        <motion.path
          d={milestones
            .map((m, index) => {
              const y = index * 140 + 70;
              const x = index % 2 === 0 ? '30%' : '70%';
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ')}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </svg>

      {/* Nodes */}
      <div className="relative w-full max-w-[400px] flex flex-col gap-[80px]" style={{ zIndex: 10 }}>
        {milestones.map((milestone, index) => {
          const unlocked = isUnlocked(milestone.id);
          const completed = progress[milestone.id]?.completed || false;
          const score = progress[milestone.id]?.score || 0;
          const isCurrent = unlocked && !completed;
          const alignRight = index % 2 !== 0;

          return (
            <div
              key={milestone.id}
              className={`flex w-full items-center ${
                alignRight ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Link
                  href={unlocked ? `/study/${milestone.id}` : '#'}
                  onClick={(e) => !unlocked && e.preventDefault()}
                  className="group focus:outline-none"
                >
                  <motion.div
                    whileHover={unlocked ? { scale: 1.1 } : {}}
                    whileTap={unlocked ? { scale: 0.95 } : {}}
                    className={`w-[72px] h-[72px] rounded-full flex items-center justify-center border-4 shadow-md transition-all relative ${
                      completed
                        ? 'bg-accent border-accent text-white'
                        : isCurrent
                        ? 'bg-primary border-primary text-white ring-4 ring-primary/30 animate-pulse-light'
                        : unlocked
                        ? 'bg-surface border-primary text-primary'
                        : 'bg-border/60 border-border text-text-secondary cursor-not-allowed'
                    }`}
                  >
                    <span className="font-display text-xl font-bold">
                      {milestone.id}
                    </span>

                    {/* Status Badge */}
                    {completed ? (
                      <span className="absolute -top-1 -right-1 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-white shadow-sm">
                        ✓
                      </span>
                    ) : !unlocked ? (
                      <span className="absolute -top-1 -right-1 bg-text-secondary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-white shadow-sm">
                        🔒
                      </span>
                    ) : null}
                  </motion.div>
                </Link>

                {/* Title and score details */}
                <div
                  className={`text-center max-w-[140px] px-2 ${
                    unlocked ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <h3 className="font-semibold text-xs text-text-primary leading-tight">
                    {milestone.title}
                  </h3>
                  {completed ? (
                    <span className="text-[10px] text-primary font-bold">
                      Puntaggio: {score}%
                    </span>
                  ) : isCurrent ? (
                    <span className="text-[10px] text-accent font-bold animate-pulse">
                      Inizia ora!
                    </span>
                  ) : unlocked ? (
                    <span className="text-[10px] text-text-secondary">
                      Sbloccato
                    </span>
                  ) : (
                    <span className="text-[10px] text-text-secondary">
                      Bloccato
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
