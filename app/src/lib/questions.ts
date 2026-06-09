import { Question } from '../types';
import { supabase } from './supabase';
import localQuestions from '../data/questions.json';

// Fetch questions for a specific milestone
export async function getQuestionsForMilestone(milestoneId: number): Promise<Question[]> {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('milestone_id', milestoneId);

    if (error) {
      console.warn('Database query failed, falling back to local JSON data:', error.message);
      return (localQuestions as Question[]).filter(q => q.milestone_id === milestoneId);
    }

    if (data && data.length > 0) {
      return data as Question[];
    }

    // Fallback if DB returns empty
    return (localQuestions as Question[]).filter(q => q.milestone_id === milestoneId);
  } catch (err) {
    console.warn('Network error or connection failed, falling back to local JSON:', err);
    return (localQuestions as Question[]).filter(q => q.milestone_id === milestoneId);
  }
}

// Fetch random questions for exam session
export async function getRandomQuestionsForExam(limit = 50): Promise<Question[]> {
  try {
    // PostgREST random order isn't natively supported, so we fetch all IDs or a subset and sample them
    const { data, error } = await supabase
      .from('questions')
      .select('*');

    if (error) {
      console.warn('Database query failed, falling back to local JSON data for exam:', error.message);
      return getRandomSample(localQuestions as Question[], limit);
    }

    if (data && data.length > 0) {
      return getRandomSample(data as Question[], limit);
    }

    return getRandomSample(localQuestions as Question[], limit);
  } catch (err) {
    console.warn('Network error, falling back to local JSON for exam:', err);
    return getRandomSample(localQuestions as Question[], limit);
  }
}

// Helper to shuffle and sample an array
function getRandomSample<T>(arr: T[], limit: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}
