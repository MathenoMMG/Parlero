import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'raised' | 'flat' | 'outline' | 'glass';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'raised',
  hoverable = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg p-5 transition-all duration-300';
  
  const variants = {
    raised: 'bg-surface shadow-sm border border-border/40',
    flat: 'bg-background border border-transparent',
    outline: 'border border-border bg-transparent',
    glass: 'bg-surface/60 backdrop-blur-md border border-border/40',
  };

  const hoverEffect = hoverable ? 'hover:shadow-md hover:translate-y-[-2px]' : '';

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverEffect} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
