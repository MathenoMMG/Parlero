'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRandomQuestionsForExam } from '../../../lib/questions';
import { Question } from '../../../types';
import { Timer } from '../../../components/ui/Timer';
import { ExamQuestion } from '../../../components/exam/ExamQuestion';
import { Card } from '../../../components/ui/Card';

export default function ExamSessionPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  
  // Timer state
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(true);
  const [durationSeconds, setDurationSeconds] = useState(45 * 60); // 45 minutes default
  const [startTime] = useState(Date.now());
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    async function initExam() {
      setLoading(true);
      let config = { selectedMilestoneIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], timeLimitEnabled: true, questionCount: 50 };

      if (typeof window !== 'undefined') {
        const stored = window.sessionStorage.getItem('exam-config');
        if (stored) {
          config = JSON.parse(stored);
        }
      }

      setTimeLimitEnabled(config.timeLimitEnabled);
      setDurationSeconds(config.questionCount === 50 ? 45 * 60 : 20 * 60);

      try {
        // Fetch all questions
        const allQuestions = await getRandomQuestionsForExam(300);
        
        // Filter by selected milestones
        const filtered = allQuestions.filter(q =>
          config.selectedMilestoneIds.includes(q.milestone_id)
        );

        // Slice to correct count
        const finalQuestions = filtered.slice(0, config.questionCount);
        setQuestions(finalQuestions);
        setIsTimerActive(true);
      } catch (err) {
        console.error('Failed to initialize exam:', err);
      } finally {
        setLoading(false);
      }
    }

    initExam();
  }, []);

  const handleSelectAnswer = (answer: string) => {
    const currentQuestion = questions[currentIdx];
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
    handleSubmit(true);
  };

  const handleSubmit = (timeUp = false) => {
    setIsTimerActive(false);
    
    // Calculate results
    let correctCount = 0;
    const topicBreakdown: Record<string, { topic: string; total: number; correct: number }> = {};
    const reviewItems: any[] = [];

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id] || '';
      const correctOption = q.options.find(o => o.is_correct)?.text || '';
      const isCorrect = selected === correctOption;

      if (isCorrect) {
        correctCount++;
      }

      // Populate topic breakdown
      if (!topicBreakdown[q.topic]) {
        topicBreakdown[q.topic] = { topic: q.topic, total: 0, correct: 0 };
      }
      topicBreakdown[q.topic].total++;
      if (isCorrect) {
        topicBreakdown[q.topic].correct++;
      }

      // Review payload
      reviewItems.push({
        question: q,
        selectedAnswer: selected,
        isCorrect
      });
    });

    const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    // Save results in sessionStorage
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('exam-results', JSON.stringify({
        score: scorePercent,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        topicScores: topicBreakdown,
        timeSpentSeconds: timeLimitEnabled && timeUp ? durationSeconds : Math.min(timeSpentSeconds, durationSeconds),
        reviewItems,
        autoSubmitted: timeUp
      }));
    }

    router.push('/exam/results');
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-sm text-text-secondary">Generazione simulazione...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-xl font-bold text-text-primary">
          Simulazione non riuscita
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          Nessuna domanda corrispondente ai filtri selezionati.
        </p>
        <button
          onClick={() => router.push('/exam')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm cursor-pointer border-0"
        >
          Riprova
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const selectedAnswer = selectedAnswers[currentQuestion.id] || null;

  return (
    <div className="flex-grow flex flex-col justify-between p-6">
      {/* Top Banner: Progress and Timer */}
      <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
        <div>
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
            Stato Avanzamento
          </span>
          <span className="text-sm font-bold text-text-primary">
            Completate: {Object.keys(selectedAnswers).length} / {questions.length}
          </span>
        </div>

        {/* Timer component */}
        {timeLimitEnabled ? (
          <Timer
            seconds={durationSeconds}
            isActive={isTimerActive}
            onTimeUp={handleTimeUp}
          />
        ) : (
          <span className="text-xs font-mono font-semibold text-text-secondary">
            Tempo Illimitato
          </span>
        )}
      </div>

      {/* Main Question Panel */}
      <div className="flex-grow flex flex-col justify-start">
        <ExamQuestion
          question={currentQuestion}
          questionNumber={currentIdx + 1}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          onPrev={handlePrev}
          onNext={handleNext}
          isFirst={currentIdx === 0}
          isLast={currentIdx === questions.length - 1}
        />
      </div>

      {/* Question Grid Map at Bottom */}
      <div className="mt-8 border-t border-border/40 pt-4">
        <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest block mb-2.5">
          Mappa Domande
        </span>
        <div className="grid grid-cols-10 gap-1.5 overflow-x-auto pb-1 max-h-[100px]">
          {questions.map((q, idx) => {
            const hasAnswered = selectedAnswers[q.id] !== undefined;
            const isCurrent = currentIdx === idx;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-7 h-7 rounded-sm flex items-center justify-center text-[10px] font-bold transition-all focus:outline-none cursor-pointer border ${
                  isCurrent
                    ? 'bg-primary border-primary text-white shadow-sm scale-110'
                    : hasAnswered
                    ? 'bg-primary/10 border-primary/25 text-primary'
                    : 'bg-background border-border/80 text-text-secondary hover:border-text-secondary'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
