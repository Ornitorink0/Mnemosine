'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import type React from 'react';
import { Button } from '@/components/ui/button';
import exercises, { difficultyLabels } from '@/lib/exercises';
import type { ExerciseDifficulty, IExerciseDefinition } from '@/types';

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

/**
 * Props base per ogni esercizio
 */
export interface ExerciseProps {
  /** Livello di difficoltà dell'esercizio */
  difficulty: ExerciseDifficulty;
  /** Callback chiamata quando l'esercizio è completato */
  onComplete?: (result: ExerciseResult) => void;
  /** Callback chiamata quando l'esercizio viene saltato */
  onSkip?: () => void;
}

/**
 * Risultato di un esercizio completato
 */
export interface ExerciseResult {
  /** Punteggio ottenuto (percentuale 0-100) */
  score: number;
  /** Numero di errori commessi */
  errors: number;
  /** Tempo impiegato in secondi */
  timeSpent: number;
  /** Dati aggiuntivi specifici per l'esercizio */
  metadata?: Record<string, unknown>;
}

/**
 * Stato base di un esercizio
 */
export type ExercisePhase = 'instructions' | 'active' | 'result';

/**
 * Configurazione difficoltà per un esercizio
 */
export interface DifficultyConfig<T = unknown> {
  easy: T;
  medium: T;
  hard: T;
}

/* -------------------------------------------------------------------------- */
/*                               HOOK: useExercise                            */
/* -------------------------------------------------------------------------- */

interface UseExerciseOptions<TState = unknown> {
  /** Codice esercizio (es: "101") */
  exerciseCode: string;
  /** Difficoltà corrente */
  difficulty: ExerciseDifficulty;
  /** Stato iniziale dell'esercizio */
  initialState?: TState;
  /** Configurazione per difficoltà */
  difficultyConfig?: DifficultyConfig<unknown>;
  /** Mostra istruzioni iniziali (default: false) */
  showInstructions?: boolean;
  /** Callback al completamento */
  onComplete?: (result: ExerciseResult) => void;
}

interface UseExerciseReturn<TState> {
  /** Definizione dell'esercizio da exercises.ts */
  definition: IExerciseDefinition | undefined;
  /** Fase corrente dell'esercizio */
  phase: ExercisePhase;
  /** Cambia fase */
  setPhase: React.Dispatch<React.SetStateAction<ExercisePhase>>;
  /** Stato custom dell'esercizio */
  state: TState;
  /** Aggiorna stato */
  setState: React.Dispatch<React.SetStateAction<TState>>;
  /** Numero di errori */
  errors: number;
  /** Incrementa errori */
  addError: (count?: number) => void;
  /** Tempo di inizio (timestamp) */
  startTime: number | null;
  /** Avvia il timer */
  startTimer: () => void;
  /** Ottieni tempo trascorso in secondi */
  getElapsedTime: () => number;
  /** Completa l'esercizio */
  completeExercise: (score: number, metadata?: Record<string, unknown>) => void;
  /** Resetta l'esercizio */
  resetExercise: () => void;
  /** Label della difficoltà corrente */
  difficultyLabel: string;
  /** Configurazione per la difficoltà corrente */
  currentConfig: unknown;
}

/**
 * Hook per gestire lo stato e la logica comune degli esercizi
 */
export function useExercise<TState = unknown>(
  options: UseExerciseOptions<TState>
): UseExerciseReturn<TState> {
  const {
    exerciseCode,
    difficulty,
    initialState,
    difficultyConfig,
    showInstructions = false,
    onComplete,
  } = options;

  // Trova la definizione dell'esercizio
  const definition = useMemo(
    () => exercises.find((ex) => ex.code === exerciseCode),
    [exerciseCode]
  );

  // Stati
  const [phase, setPhase] = useState<ExercisePhase>(
    showInstructions ? 'instructions' : 'active'
  );
  const [state, setState] = useState<TState>(initialState as TState);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Label difficoltà
  const difficultyLabel = difficultyLabels[difficulty];

  // Configurazione per la difficoltà corrente
  const currentConfig = useMemo(
    () => (difficultyConfig ? difficultyConfig[difficulty] : undefined),
    [difficultyConfig, difficulty]
  );

  // Avvia il timer automaticamente quando si entra in fase attiva
  useEffect(() => {
    if (phase === 'active' && startTime === null) {
      setStartTime(Date.now());
    }
  }, [phase, startTime]);

  // Aggiungi errori
  const addError = useCallback((count = 1) => {
    setErrors((prev) => prev + count);
  }, []);

  // Avvia timer manualmente
  const startTimer = useCallback(() => {
    setStartTime(Date.now());
  }, []);

  // Ottieni tempo trascorso
  const getElapsedTime = useCallback(() => {
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 1000);
  }, [startTime]);

  // Completa esercizio
  const completeExercise = useCallback(
    (score: number, metadata?: Record<string, unknown>) => {
      const result: ExerciseResult = {
        score,
        errors,
        timeSpent: getElapsedTime(),
        metadata,
      };

      setPhase('result');

      if (onComplete) {
        onComplete(result);
      }
    },
    [errors, getElapsedTime, onComplete]
  );

  // Reset esercizio
  const resetExercise = useCallback(() => {
    setPhase(showInstructions ? 'instructions' : 'active');
    setState(initialState as TState);
    setErrors(0);
    setStartTime(null);
  }, [initialState, showInstructions]);

  return {
    definition,
    phase,
    setPhase,
    state,
    setState,
    errors,
    addError,
    startTime,
    startTimer,
    getElapsedTime,
    completeExercise,
    resetExercise,
    difficultyLabel,
    currentConfig,
  };
}

/* -------------------------------------------------------------------------- */
/*                            COMPONENTI WRAPPER                              */
/* -------------------------------------------------------------------------- */

interface ExerciseContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container base per gli esercizi con stili comuni
 */
export function ExerciseContainer({
  children,
  className = '',
}: ExerciseContainerProps) {
  return (
    <div className={`exercise-container space-y-4 ${className}`}>
      {children}
    </div>
  );
}

interface ExerciseHeaderProps {
  title?: string;
  description?: string;
  difficulty?: ExerciseDifficulty;
  showDifficulty?: boolean;
}

/**
 * Header dell'esercizio con titolo e descrizione
 */
export function ExerciseHeader({
  title,
  description,
  difficulty,
  showDifficulty = false,
}: ExerciseHeaderProps) {
  return (
    <div className="exercise-header space-y-2">
      <div className="flex items-center justify-between">
        {title && <h2 className="text-xl font-bold">{title}</h2>}
        {showDifficulty && difficulty && (
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {difficultyLabels[difficulty]}
          </span>
        )}
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}

interface ExerciseInstructionsProps {
  instructions: string;
  onStart: () => void;
  startLabel?: string;
}

/**
 * Schermata istruzioni pre-esercizio
 */
export function ExerciseInstructions({
  instructions,
  onStart,
  startLabel = 'Inizia',
}: ExerciseInstructionsProps) {
  return (
    <div className="exercise-instructions space-y-4 text-center py-8">
      <p className="text-lg">{instructions}</p>
      <Button onClick={onStart} size="lg">
        {startLabel}
      </Button>
    </div>
  );
}

interface ExerciseResultProps {
  score: number;
  maxScore: number;
  errors?: number;
  timeSpent?: number;
  message?: string;
  onRetry?: () => void;
  onNext?: () => void;
  retryLabel?: string;
  nextLabel?: string;
}

/**
 * Schermata risultati post-esercizio
 */
export function ExerciseResult({
  score,
  maxScore,
  errors,
  timeSpent,
  message,
  onRetry,
  onNext,
  retryLabel = 'Riprova',
  nextLabel = 'Avanti',
}: ExerciseResultProps) {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return (
    <div className="exercise-result space-y-4 text-center py-8">
      <div className="space-y-2">
        <p className="text-2xl font-bold">
          {score} / {maxScore}
        </p>
        <p className="text-muted-foreground">{percentage}% corretto</p>
        {errors !== undefined && (
          <p className="text-sm text-muted-foreground">Errori: {errors}</p>
        )}
        {timeSpent !== undefined && (
          <p className="text-sm text-muted-foreground">
            Tempo: {Math.floor(timeSpent / 60)}:
            {(timeSpent % 60).toString().padStart(2, '0')}
          </p>
        )}
        {message && <p className="text-muted-foreground mt-4">{message}</p>}
      </div>
      <div className="flex gap-2 justify-center">
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            {retryLabel}
          </Button>
        )}
        {onNext && <Button onClick={onNext}>{nextLabel}</Button>}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              UTILITY FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

/**
 * Mescola un array in modo casuale (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Seleziona N elementi casuali da un array
 */
export function pickRandom<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count);
}

/**
 * Ottieni configurazione per difficoltà
 */
export function getConfigForDifficulty<T>(
  config: DifficultyConfig<T>,
  difficulty: ExerciseDifficulty
): T {
  return config[difficulty];
}

/**
 * Crea una configurazione di difficoltà con valori numerici progressivi
 */
export function createNumericDifficultyConfig(
  easy: number,
  medium: number,
  hard: number
): DifficultyConfig<number> {
  return { easy, medium, hard };
}

/* -------------------------------------------------------------------------- */
/*                                  EXPORTS                                   */
/* -------------------------------------------------------------------------- */

export { difficultyLabels };
export type { IExerciseDefinition, ExerciseDifficulty };
