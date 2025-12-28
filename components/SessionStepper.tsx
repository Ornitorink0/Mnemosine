'use client';

import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import exercises, { difficultyLabels } from '@/lib/exercises';
import type { ExerciseDifficulty } from '@/types';
import type { ExerciseResult } from './exercises/BaseExercise';

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export interface SessionExercise {
  exerciseId: string;
  difficulty: ExerciseDifficulty;
  description?: string;
  timeSpent: number;
  nErrors: number;
}

interface SessionStepperProps {
  sessionId: string;
  exercises: SessionExercise[];
  onComplete?: (results: ExerciseResult[]) => void;
}

interface StepDefinition {
  id: string;
  title: string;
  description: string;
  exerciseId: string;
  difficulty: ExerciseDifficulty;
}

/* -------------------------------------------------------------------------- */
/*                            EXERCISE LOADER                                 */
/* -------------------------------------------------------------------------- */

interface ExerciseLoaderProps {
  exerciseId: string;
  difficulty: ExerciseDifficulty;
  onComplete: (result: ExerciseResult) => void;
}

function ExerciseLoader({
  exerciseId,
  difficulty,
  onComplete,
}: ExerciseLoaderProps) {
  const DynamicExercise = useMemo(
    () =>
      dynamic<{
        difficulty: ExerciseDifficulty;
        onComplete?: (result: ExerciseResult) => void;
      }>(
        () =>
          import(`@/components/exercises/${exerciseId}.tsx`).then(
            (mod) => mod.default
          ),
        {
          ssr: false,
          loading: () => (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Caricamento esercizio...</span>
            </div>
          ),
        }
      ),
    [exerciseId]
  );

  return <DynamicExercise difficulty={difficulty} onComplete={onComplete} />;
}

/* -------------------------------------------------------------------------- */
/*                            STEP INDICATOR                                  */
/* -------------------------------------------------------------------------- */

interface StepIndicatorProps {
  stepNumber: number;
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
}

function StepIndicator({
  stepNumber,
  isActive,
  isCompleted,
  onClick,
}: StepIndicatorProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isCompleted && !isActive}
      className={`
        flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all
        ${
          isCompleted
            ? 'bg-primary border-primary text-primary-foreground cursor-pointer hover:bg-primary/90'
            : isActive
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-muted-foreground/30 text-muted-foreground'
        }
      `}
    >
      {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                           SESSION STEPPER                                  */
/* -------------------------------------------------------------------------- */

export default function SessionStepperClient({
  sessionId,
  exercises: sessionExercises,
  onComplete,
}: SessionStepperProps) {
  // Stato corrente dello stepper
  const [currentIndex, setCurrentIndex] = useState(0);

  // Risultati degli esercizi completati
  const [results, setResults] = useState<Map<string, ExerciseResult>>(
    new Map()
  );
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);

  // Crea steps per lo stepper
  const steps: StepDefinition[] = useMemo(
    () =>
      sessionExercises.map((ex, index) => {
        const definition = exercises.find((e) => e.code === ex.exerciseId);
        return {
          id: `step-${index}`,
          title: definition?.name ?? `Esercizio ${ex.exerciseId}`,
          description: definition?.description ?? ex.description ?? '',
          exerciseId: ex.exerciseId,
          difficulty: ex.difficulty,
        };
      }),
    [sessionExercises]
  );

  // Proprietà helper dello stepper
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;
  const currentStep = steps[currentIndex];

  // Navigazione
  const goToNext = useCallback(() => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLast]);

  const goToPrev = useCallback(() => {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isFirst]);

  const goToStep = useCallback(
    (index: number) => {
      const targetId = `step-${index}`;
      if (results.has(targetId) || index === currentIndex) {
        setCurrentIndex(index);
      }
    },
    [results, currentIndex]
  );

  // Gestione completamento esercizio
  const handleExerciseComplete = useCallback(
    async (result: ExerciseResult) => {
      const currentStepId = `step-${currentIndex}`;

      setResults((prev) => {
        const newResults = new Map(prev);
        newResults.set(currentStepId, result);
        return newResults;
      });

      // Salva il risultato nel database
      try {
        const response = await fetch(`/api/sessions/${sessionId}/update`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            exerciseIndex: currentIndex,
            result: result,
            status: isLast ? 'completed' : 'in-progress',
          }),
        });

        if (!response.ok) {
          console.error('Errore nel salvataggio del risultato');
        }
      } catch (error) {
        console.error('Errore nella chiamata API:', error);
      }

      // Se è l'ultimo step, completa la sessione
      if (isLast) {
        setIsSessionCompleted(true);
        if (onComplete) {
          const allResults = Array.from(results.values());
          allResults.push(result);
          onComplete(allResults);
        }
      } else {
        // Vai al prossimo step
        goToNext();
      }
    },
    [currentIndex, isLast, results, onComplete, goToNext, sessionId]
  );

  // Schermata finale
  if (isSessionCompleted) {
    const totalScore = Array.from(results.values()).reduce(
      (acc, r) => acc + r.score,
      0
    );
    const avgScore =
      results.size > 0 ? Math.round(totalScore / results.size) : 0;
    const totalErrors = Array.from(results.values()).reduce(
      (acc, r) => acc + r.errors,
      0
    );
    const totalTime = Array.from(results.values()).reduce(
      (acc, r) => acc + r.timeSpent,
      0
    );

    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Check className="h-8 w-8 text-green-500" />
              Sessione Completata!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{avgScore}%</p>
                <p className="text-sm text-muted-foreground">Punteggio medio</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{totalErrors}</p>
                <p className="text-sm text-muted-foreground">Errori totali</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {Math.floor(totalTime / 60)}:
                  {(totalTime % 60).toString().padStart(2, '0')}
                </p>
                <p className="text-sm text-muted-foreground">Tempo totale</p>
              </div>
            </div>
            <Button
              onClick={() => {
                window.location.href = '/';
              }}
              className="w-full mt-4"
            >
              Torna alla Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Nessun esercizio
  if (steps.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-8">
            <p className="text-muted-foreground">
              Nessun esercizio in questa sessione.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col p-4">
      <Card className="mx-auto w-full max-w-3xl">
        {/* Header con Step Indicators */}
        <CardHeader className="border-b">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-lg">
              Esercizio {currentIndex + 1} di {steps.length}
            </CardTitle>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {difficultyLabels[currentStep.difficulty]}
            </span>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {steps.map((step, index) => {
              const isCompleted = results.has(step.id);
              const isActive = index === currentIndex;
              return (
                <React.Fragment key={step.id}>
                  <StepIndicator
                    stepNumber={index + 1}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    onClick={() => goToStep(index)}
                  />
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-8 transition-colors ${
                        results.has(step.id)
                          ? 'bg-primary'
                          : 'bg-muted-foreground/30'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </CardHeader>

        {/* Contenuto Esercizio */}
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">{currentStep.title}</h2>
            <p className="text-muted-foreground">{currentStep.description}</p>
          </div>

          {/* Render dell'esercizio corrente */}
          <ExerciseLoader
            key={`${currentStep.id}-${currentStep.difficulty}`}
            exerciseId={currentStep.exerciseId}
            difficulty={currentStep.difficulty}
            onComplete={handleExerciseComplete}
          />
        </CardContent>

        {/* Footer con navigazione */}
        <div className="border-t p-4 flex justify-between">
          <Button variant="outline" onClick={goToPrev} disabled={isFirst}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Indietro
          </Button>
          <span className="text-sm text-muted-foreground self-center">
            {results.size} / {steps.length} completati
          </span>
          <Button
            onClick={goToNext}
            disabled={isLast || !results.has(`step-${currentIndex}`)}
          >
            Avanti
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
