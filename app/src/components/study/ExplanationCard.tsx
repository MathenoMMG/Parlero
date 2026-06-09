'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GrammarSection } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ExplanationCardProps {
  sections: GrammarSection[];
  onComplete: () => void;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({ sections, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const section = sections[currentIndex];

  if (!section) return null;

  return (
    <div className="w-full flex flex-col gap-5 min-h-[420px] justify-between">
      {/* Cards Slider Container */}
      <div className="relative flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <Card variant="raised" className="min-h-[360px] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  Grammatica ({currentIndex + 1} di {sections.length})
                </span>
                <h2 className="font-display text-2xl font-bold text-text-primary mt-1 mb-3">
                  {section.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {section.content}
                </p>

                {/* Examples Section */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                    Esempi
                  </h4>
                  {section.examples.map((example, i) => (
                    <div
                      key={i}
                      className="pl-3 border-l-2 border-primary bg-background/50 p-2 rounded-r-md"
                    >
                      <p className="text-sm font-semibold text-primary">
                        {example.it}
                      </p>
                      <p className="text-xs text-text-secondary italic mt-0.5">
                        {example.es}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots & Navigation */}
      <div className="flex items-center justify-between mt-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Indietro
        </Button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>

        <Button variant="primary" size="sm" onClick={handleNext}>
          {currentIndex === sections.length - 1 ? 'Inizia Quiz' : 'Avanti'}
        </Button>
      </div>
    </div>
  );
};
