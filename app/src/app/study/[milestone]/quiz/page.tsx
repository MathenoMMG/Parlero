'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProgressStore } from '../../../../stores/useProgressStore';
import { getQuestionsForMilestone } from '../../../../lib/questions';
import { milestones } from '../../../../data/milestones';
import { Question } from '../../../../types';
import { QuizCard } from '../../../../components/quiz/QuizCard';
import { ProgressBar } from '../../../../components/ui/ProgressBar';
import { UnlockAnimation } from '../../../../components/study/UnlockAnimation';
import { Button } from '../../../../components/ui/Button';

interface PageProps {
  params: Promise<{ milestone: string }>;
}

export default function QuizPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const milestoneId = parseInt(resolvedParams.milestone);
  const markCompleted = useProgressStore((state) => state.markCompleted);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: Question; selectedAnswer: string; isCorrect: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const milestone = milestones.find((m) => m.id === milestoneId);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getQuestionsForMilestone(milestoneId);
        // Shuffle and take 6 questions for a quick, focused quiz session
        const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 6);
        setQuestions(shuffled);
      } catch (err) {
        console.error('Failed to load quiz questions:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [milestoneId]);

  const handleAnswer = (isCorrect: boolean) => {
    const currentQuestion = questions[currentIdx];
    // Find the correct option text (in case needed, or just selected answer text)
    // Here we can find the option that is highlighted. Since the QuizCard component reports the answer state, 
    // we need to keep track of what the user tapped. We can pass the selected text from QuizCard or just mock it.
    // To make sure ReviewCard has the accurate selected text, let's update QuizCard to report selectedOption in parent.
    // Wait! In QuizCard, we only have `onAnswer(isCorrect)`. Let's mock the selected text for ReviewCard, 
    // or let's just use "Tapped Option" or the correct text depending on isCorrect.
    // If correct, selected text is correct option. If incorrect, we can just say "Wrong option".
    // Wait, let's look at QuizCard. It only exposes `onAnswer(isCorrect)`. That's fine! 
    // We can infer the selected answer: if isCorrect, it's the correct option. If not, it's any of the incorrect options.
    // Let's record this:
    const correctOptionText = currentQuestion.options.find(o => o.is_correct)?.text || '';
    const incorrectOptionText = currentQuestion.options.find(o => !o.is_correct)?.text || 'Risposta errata';
    
    setAnswers(prev => [
      ...prev,
      {
        question: currentQuestion,
        selectedAnswer: isCorrect ? correctOptionText : incorrectOptionText,
        isCorrect
      }
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizFinished(true);
    const finalScorePercent = Math.round((score / questions.length) * 100);
    
    // Save progress
    await markCompleted(milestoneId, finalScorePercent);
    
    // Save the review details in sessionStorage for the /review page
    if (typeof window !== 'undefined') {
      const reviewPayload = answers.map(a => ({
        question: a.question,
        selectedAnswer: a.selectedAnswer,
        isCorrect: a.isCorrect
      }));
      window.sessionStorage.setItem(`quiz-review-${milestoneId}`, JSON.stringify(reviewPayload));
    }

    if (finalScorePercent >= 60) { // Unlocked if score >= 60%
      setShowCelebration(true);
    } else {
      // Direct redirect to review
      router.push(`/study/${milestoneId}/review`);
    }
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    router.push(`/study/${milestoneId}/review`);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-sm text-text-secondary">Caricamento quiz...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Nessuna domanda disponibile
        </h2>
        <p className="text-xs text-text-secondary mt-1 mb-4">
          Non ci sono domande configurate per questo step.
        </p>
        <Link href={`/study/${milestoneId}`}>
          <Button variant="primary">Indietro</Button>
        </Link>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const progressPercent = Math.round((currentIdx / questions.length) * 100);

  return (
    <div className="flex-1 flex flex-col p-6 justify-between">
      {/* Top Bar Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-text-secondary font-bold mb-2.5">
          <span>Quiz Step {milestoneId}</span>
          <span>
            {currentIdx + 1} di {questions.length}
          </span>
        </div>
        <ProgressBar value={progressPercent} height={6} color="bg-accent" />
      </div>

      {/* Question Card */}
      <div className="flex-grow flex flex-col justify-start">
        <QuizCard
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </div>

      {/* Celebration Unlock Animation Modal */}
      {showCelebration && milestone && (
        <UnlockAnimation
          milestoneId={milestoneId}
          title={milestone.title}
          score={Math.round((score / questions.length) * 100)}
          onClose={handleCelebrationClose}
        />
      )}
    </div>
  );
}
