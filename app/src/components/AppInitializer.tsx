'use client';

import React, { useEffect } from 'react';
import { useProgressStore } from '../stores/useProgressStore';

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initializeStore, syncWithSupabase } = useProgressStore();

  useEffect(() => {
    // Initialize device UUID and theme settings
    initializeStore();
    // Sync with database
    syncWithSupabase();
  }, [initializeStore, syncWithSupabase]);

  return <>{children}</>;
};
