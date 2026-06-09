export interface Option {
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  milestone_id: number;
  topic: string;
  question_text: string;
  options: Option[];
  explanation: string;
  difficulty: number;
  source: string;
  created_at?: string;
}

export interface GrammarExample {
  it: string;
  es: string;
}

export interface GrammarSection {
  title: string;
  content: string;
  examples: GrammarExample[];
}

export interface VocabularyWord {
  word: string;
  translation: string;
  category: string;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  grammar: GrammarSection[];
  vocabulary: VocabularyWord[];
}

export interface MilestoneProgress {
  completed: boolean;
  score: number;
  lastAttempt: string;
}

export interface ProgressState {
  milestones: Record<number, MilestoneProgress>;
  deviceId: string;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
  initializeStore: () => void;
  markCompleted: (milestoneId: number, score: number) => Promise<void>;
  setSoundEnabled: (enabled: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  syncWithSupabase: () => Promise<void>;
}
