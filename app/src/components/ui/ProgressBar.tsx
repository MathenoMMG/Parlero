'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0 to 100
  height?: number;
  color?: string;
  animate?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = 8,
  color = 'bg-accent',
  animate = true,
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className="w-full bg-border rounded-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      {animate ? (
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        />
      ) : (
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      )}
    </div>
  );
};
