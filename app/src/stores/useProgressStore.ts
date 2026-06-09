import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProgressState, MilestoneProgress } from '../types';
import { supabase } from '../lib/supabase';

// Generate a random UUID for device tracking
const generateUUID = () => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return 'device_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      milestones: {},
      deviceId: '',
      soundEnabled: true,
      theme: 'light',

      initializeStore: () => {
        if (!get().deviceId) {
          set({ deviceId: generateUUID() });
        }
        // Apply saved theme to HTML tag
        const currentTheme = get().theme;
        if (currentTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      markCompleted: async (milestoneId: number, score: number) => {
        const now = new Date().toISOString();
        const updatedMilestones = {
          ...get().milestones,
          [milestoneId]: {
            completed: true,
            score: Math.max(get().milestones[milestoneId]?.score || 0, score),
            lastAttempt: now,
          },
        };

        set({ milestones: updatedMilestones });

        // Try to sync with Supabase in the background
        const deviceId = get().deviceId;
        if (deviceId && supabase) {
          try {
            await supabase.from('user_progress').upsert(
              {
                device_id: deviceId,
                milestone_id: milestoneId,
                completed: true,
                score: Math.max(get().milestones[milestoneId]?.score || 0, score),
                last_attempt: now,
              },
              { onConflict: 'device_id,milestone_id' }
            );
          } catch (e) {
            console.error('Failed to sync progress with Supabase:', e);
          }
        }
      },

      setSoundEnabled: (enabled: boolean) => {
        set({ soundEnabled: enabled });
      },

      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      syncWithSupabase: async () => {
        const deviceId = get().deviceId;
        if (!deviceId || !supabase) return;

        try {
          const { data, error } = await supabase
            .from('user_progress')
            .select('milestone_id, completed, score, last_attempt')
            .eq('device_id', deviceId);

          if (error) throw error;

          if (data && data.length > 0) {
            const remoteMilestones: Record<number, MilestoneProgress> = {};
            data.forEach((row: any) => {
              remoteMilestones[row.milestone_id] = {
                completed: row.completed,
                score: row.score,
                lastAttempt: row.last_attempt,
              };
            });

            // Merge local and remote progress, keeping the highest score/most recent attempt
            const localMilestones = get().milestones;
            const mergedMilestones = { ...localMilestones };

            Object.entries(remoteMilestones).forEach(([mIdStr, remoteVal]) => {
              const mId = parseInt(mIdStr);
              const localVal = localMilestones[mId];

              if (!localVal) {
                mergedMilestones[mId] = remoteVal;
              } else {
                mergedMilestones[mId] = {
                  completed: localVal.completed || remoteVal.completed,
                  score: Math.max(localVal.score, remoteVal.score),
                  lastAttempt: new Date(localVal.lastAttempt) > new Date(remoteVal.lastAttempt)
                    ? localVal.lastAttempt
                    : remoteVal.lastAttempt,
                };
              }
            });

            set({ milestones: mergedMilestones });
          }
        } catch (e) {
          console.error('Failed to sync with Supabase:', e);
        }
      },
    }),
    {
      name: 'parlero-progress',
      partialize: (state) => ({
        milestones: state.milestones,
        deviceId: state.deviceId,
        soundEnabled: state.soundEnabled,
        theme: state.theme,
      }),
    }
  )
);
