'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  seconds: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ seconds, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = React.useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0 && isActive) {
        onTimeUp();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft <= 30; // Red alert under 30 seconds

  return (
    <div className="flex items-center gap-2 font-mono font-bold">
      <svg
        className={`w-5 h-5 ${isLowTime ? 'text-error animate-pulse' : 'text-text-secondary'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <motion.span
        key={timeLeft}
        animate={isLowTime ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
        className={`text-lg leading-none ${
          isLowTime ? 'text-error font-extrabold' : 'text-text-primary'
        }`}
      >
        {formatTime(timeLeft)}
      </motion.span>
    </div>
  );
};
