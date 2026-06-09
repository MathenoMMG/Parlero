'use client';

// Force rebuild trigger
import React from 'react';
import Link from 'next/link';
import { useProgressStore } from '../stores/useProgressStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Home() {
  const { milestones, soundEnabled, theme, setSoundEnabled, setTheme } = useProgressStore();

  // Calculate stats
  const completedCount = Object.values(milestones).filter((m) => m.completed).length;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6">
      {/* Top Header Controls */}
      <div className="flex justify-between items-center w-full">
        <div className="h-8 flex items-center">
          <img
            src={theme === 'dark' ? '/logo-text-dark.png' : '/logo-text-light.png'}
            alt="Parleró"
            className="h-8 w-auto object-contain transition-all duration-300"
          />
        </div>
        <div className="flex items-center gap-3">
          {/* Sound toggle button */}
          <button
            onClick={toggleSound}
            className="w-9 h-9 rounded-full bg-background hover:bg-border/60 text-text-secondary flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
            aria-label="Toggle sound effects"
          >
            {soundEnabled ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-text-secondary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>
 
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-background hover:bg-border/60 text-text-secondary flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
 
      {/* Main Title Hero */}
      <div className="flex flex-col items-center text-center my-auto py-8">
        <div className="relative w-24 h-24 mb-6 hover:scale-105 transition-transform duration-300 ease-out select-none">
          <img
            src="/logo-mark.png"
            alt="Parleró Isotipo"
            className="w-full h-full object-contain filter drop-shadow-md dark:drop-shadow-[0_4px_12px_rgba(232,149,110,0.15)]"
          />
        </div>
        <h1 className="font-display text-5xl font-black text-text-primary tracking-wide mb-1">
          Parleró
        </h1>
        <p className="text-sm text-text-secondary max-w-[280px] leading-relaxed">
          La tua guida mobile per l&apos;esame di lingua italiana A2 (Politecnico di Torino).
        </p>

        {/* Progress Card */}
        <Card variant="glass" className="w-full mt-10 mb-8 p-5 text-left border-b-2 border-primary/20">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            Il tuo progresso
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-primary">
              {completedCount}
            </span>
            <span className="text-sm text-text-secondary">/ 10 Milestones</span>
          </div>
          <div className="w-full bg-border h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / 10) * 100}%` }}
            />
          </div>
        </Card>

        {/* Call to Actions Grid */}
        <div className="w-full flex flex-col gap-4">
          <Link href="/study" className="w-full">
            <Button variant="primary" size="lg" fullWidth className="py-4 shadow-md font-semibold text-sm">
              Percorso di Studio (Mappa)
            </Button>
          </Link>

          <Link href="/exam" className="w-full">
            <Button variant="outline" size="lg" fullWidth className="py-4 font-semibold text-sm">
              Simulatore d&apos;Esame (CLA)
            </Button>
          </Link>
        </div>
      </div>

      {/* Editorial Footer */}
      <div className="text-center mt-auto pt-6 border-t border-border/40">
        <p className="font-display text-xs text-text-secondary italic">
          &ldquo;Una seconda lingua è una seconda anima.&rdquo;
        </p>
        <span className="text-[9px] text-text-secondary/60 block mt-1">
          Materiale CLA PoliTo &bull; Dieci A2
        </span>
      </div>
    </div>
  );
}
