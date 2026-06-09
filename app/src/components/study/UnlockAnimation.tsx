'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface UnlockAnimationProps {
  milestoneId: number;
  title: string;
  score: number;
  onClose: () => void;
}

export const UnlockAnimation: React.FC<UnlockAnimationProps> = ({
  milestoneId,
  title,
  score,
  onClose,
}) => {
  // Generate random particles coords
  const particles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 300 - 150,
    y: Math.random() * -300 - 50,
    size: Math.random() * 8 + 4,
    color: i % 3 === 0 ? '#7CB894' : i % 3 === 1 ? '#E8956E' : '#FAF6F1',
    delay: Math.random() * 0.2,
  }));

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4" style={{ zIndex: 100 }}>
      <div className="relative w-full max-w-[360px] bg-surface rounded-lg p-8 shadow-xl border border-border/60 text-center overflow-hidden">
        {/* Glow Ring background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 pointer-events-none" />

        {/* Confetti Spawns */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: 0,
              scale: 0.5,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 1.2,
              delay: p.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: p.id % 2 === 0 ? '50%' : '20%',
              backgroundColor: p.color,
              zIndex: 1,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.2 }}
            className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center text-3xl font-display font-bold shadow-md mb-5"
          >
            ✓
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Traguardo Raggiunto!
            </span>
            <h2 className="font-display text-2xl font-bold text-text-primary mt-1 mb-2">
              Milestone {milestoneId} Completato
            </h2>
            <p className="text-sm text-text-secondary mb-5 px-2">
              Congratulazioni! Hai terminato lo studio di <span className="font-semibold text-text-primary">{title}</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: 'spring' }}
            className="bg-background border border-border/80 rounded-md py-3 px-6 mb-6 w-full flex flex-col items-center"
          >
            <span className="text-[10px] text-text-secondary uppercase tracking-wider">
              Puntaggio Ottenuto
            </span>
            <span className="text-3xl font-extrabold text-primary mt-0.5">
              {score}%
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="w-full"
          >
            <Button variant="primary" fullWidth onClick={onClose}>
              Torna alla Mappa
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
