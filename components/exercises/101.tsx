'use client';

import { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useExercise,
  ExerciseContainer,
  ExerciseResult,
  pickRandom,
  type ExerciseProps,
  type DifficultyConfig,
} from './BaseExercise';

/* -------------------------------------------------------------------------- */
/*                            CONFIGURAZIONE                                  */
/* -------------------------------------------------------------------------- */

const EXERCISE_CODE = '101';

/** Pool di parole disponibili */
const WORD_POOL = [
  'gatto',
  'sole',
  'libro',
  'mare',
  'albero',
  'telefono',
  'penna',
  'montagna',
  'strada',
  'cane',
  'notte',
  'pizza',
  'cielo',
  'fiume',
  'casa',
  'treno',
  'porta',
  'finestra',
  'tavolo',
  'sedia',
  'fiore',
  'uccello',
  'pesce',
  'luna',
];

/** Numero di parole per difficoltà */
const WORD_COUNT_CONFIG: DifficultyConfig<number> = {
  easy: 4,
  medium: 6,
  hard: 8,
};

/** Tempo di memorizzazione in millisecondi per difficoltà */
const MEMORIZE_TIME_CONFIG: DifficultyConfig<number> = {
  easy: 8000,
  medium: 6000,
  hard: 4000,
};

/* -------------------------------------------------------------------------- */
/*                                 TIPI                                       */
/* -------------------------------------------------------------------------- */

type Phase = 'memorize' | 'recall' | 'result';

interface ExerciseState {
  phase: Phase;
  words: string[];
  inputs: string[];
  score: number | null;
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENTE                                    */
/* -------------------------------------------------------------------------- */

const Exercise101: React.FC<ExerciseProps> = ({ difficulty, onComplete }) => {
  // Configurazione basata sulla difficoltà
  const wordCount = WORD_COUNT_CONFIG[difficulty];
  const memorizeTime = MEMORIZE_TIME_CONFIG[difficulty];

  // Genera le parole una sola volta al mount
  const selectedWords = useMemo(
    () => pickRandom(WORD_POOL, wordCount),
    [wordCount]
  );

  // Hook esercizio
  const exercise = useExercise<ExerciseState>({
    exerciseCode: EXERCISE_CODE,
    difficulty,
    initialState: {
      phase: 'memorize',
      words: selectedWords,
      inputs: Array(wordCount).fill(''),
      score: null,
    },
    onComplete,
  });

  const { state, setState, errors, addError, completeExercise } = exercise;

  // Timer per passaggio automatico dalla fase memorize a recall
  useEffect(() => {
    if (state.phase !== 'memorize') return;

    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, phase: 'recall' }));
    }, memorizeTime);

    return () => clearTimeout(timer);
  }, [state.phase, memorizeTime, setState]);

  // Gestione cambio input
  const handleInputChange = (value: string, index: number) => {
    setState((prev) => {
      const newInputs = [...prev.inputs];
      newInputs[index] = value;
      return { ...prev, inputs: newInputs };
    });
  };

  // Gestione invio risposte
  const handleSubmit = () => {
    const normalizedInputs = state.inputs.map((i) => i.trim().toLowerCase());
    const normalizedWords = state.words.map((w) => w.toLowerCase());

    let correct = 0;
    let wrongCount = 0;

    normalizedInputs.forEach((input) => {
      if (input && normalizedWords.includes(input)) {
        correct += 1;
      } else if (input) {
        wrongCount += 1;
      }
    });

    // Aggiungi errori
    if (wrongCount > 0) {
      addError(wrongCount);
    }

    setState((prev) => ({ ...prev, score: correct, phase: 'result' }));

    // Completa l'esercizio
    const scorePercentage = Math.round((correct / state.words.length) * 100);
    completeExercise(scorePercentage, {
      correctWords: correct,
      totalWords: state.words.length,
      wordsShown: state.words,
      wordsRecalled: normalizedInputs.filter(Boolean),
    });
  };

  // Riprova esercizio
  const handleRetry = () => {
    const newWords = pickRandom(WORD_POOL, wordCount);
    setState({
      phase: 'memorize',
      words: newWords,
      inputs: Array(wordCount).fill(''),
      score: null,
    });
  };

  return (
    <ExerciseContainer>
      {/* Fase: Memorizzazione */}
      {state.phase === 'memorize' && (
        <div className="space-y-4">
          <p className="text-muted-foreground text-center">
            Memorizza queste parole ({Math.round(memorizeTime / 1000)} secondi):
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {state.words.map((word, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-full max-w-xs bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary animate-shrink"
                style={{
                  animationDuration: `${memorizeTime}ms`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Fase: Richiamo */}
      {state.phase === 'recall' && (
        <div className="space-y-4">
          <p className="text-center mb-4">Scrivi le parole che ricordi:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {state.inputs.map((input, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <Label htmlFor={`word-${idx}`}>Parola {idx + 1}</Label>
                <Input
                  id={`word-${idx}`}
                  type="text"
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value, idx)}
                  placeholder="..."
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button onClick={handleSubmit} size="lg">
              Conferma
            </Button>
          </div>
        </div>
      )}

      {/* Fase: Risultato */}
      {state.phase === 'result' && state.score !== null && (
        <ExerciseResult
          score={state.score}
          maxScore={state.words.length}
          errors={errors}
          message={`Parole corrette: ${state.words.join(', ')}`}
          onRetry={handleRetry}
        />
      )}
    </ExerciseContainer>
  );
};

export default Exercise101;
