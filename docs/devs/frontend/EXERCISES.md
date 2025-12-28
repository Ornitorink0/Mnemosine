# Guida per la Creazione di Esercizi

Questa guida spiega come creare nuovi esercizi per Mnemosine utilizzando la classe base `BaseExercise`.

## Struttura Base

Ogni esercizio deve:

1. Essere posizionato in `components/exercises/` con il nome del codice (es: `102.tsx`)
2. Utilizzare l'hook `useExercise` da `BaseExercise.tsx`
3. Accettare le props standard `ExerciseProps`
4. Chiamare `completeExercise()` quando l'esercizio è completato

## Esempio Completo

```tsx
'use client';

import { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
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

const EXERCISE_CODE = '102'; // Deve corrispondere al nome del file

// Configurazione per difficoltà
const PAIRS_COUNT: DifficultyConfig<number> = {
  easy: 4,
  medium: 6,
  hard: 8,
};

/* -------------------------------------------------------------------------- */
/*                                 TIPI                                       */
/* -------------------------------------------------------------------------- */

type Phase = 'active' | 'result';

interface ExerciseState {
  phase: Phase;
  // ... altri stati specifici dell'esercizio
  score: number | null;
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENTE                                    */
/* -------------------------------------------------------------------------- */

const Exercise102: React.FC<ExerciseProps> = ({ difficulty, onComplete }) => {
  // Configurazione basata sulla difficoltà
  const pairsCount = PAIRS_COUNT[difficulty];

  // Hook esercizio - gestisce stato, errori, timer automaticamente
  const exercise = useExercise<ExerciseState>({
    exerciseCode: EXERCISE_CODE,
    difficulty,
    initialState: {
      phase: 'active',
      score: null,
    },
    onComplete, // Callback opzionale dal SessionStepper
  });

  // Destruttura le utilità dall'hook
  const {
    definition, // Dati da exercises.ts (nome, descrizione, etc.)
    state, // Stato corrente
    setState, // Aggiorna stato
    errors, // Conteggio errori
    addError, // Incrementa errori
    completeExercise, // Completa l'esercizio
    difficultyLabel, // "Facile", "Intermedio", "Difficile"
  } = exercise;

  // Logica dell'esercizio...
  const handleComplete = () => {
    const score = 85; // Calcola punteggio 0-100

    // Completa l'esercizio con punteggio e metadati opzionali
    completeExercise(score, {
      customData: 'valore',
      anotherField: 123,
    });

    setState((prev) => ({ ...prev, phase: 'result', score }));
  };

  const handleRetry = () => {
    setState({
      phase: 'active',
      score: null,
    });
  };

  return (
    <ExerciseContainer>
      {state.phase === 'active' && (
        <div>
          {/* UI dell'esercizio */}
          <p>Difficoltà: {difficultyLabel}</p>
          <p>Descrizione: {definition?.description}</p>

          <Button onClick={handleComplete}>Completa</Button>
        </div>
      )}

      {state.phase === 'result' && state.score !== null && (
        <ExerciseResult
          score={state.score}
          maxScore={100}
          errors={errors}
          onRetry={handleRetry}
        />
      )}
    </ExerciseContainer>
  );
};

export default Exercise102;
```

## API Disponibili

### Hook `useExercise<TState>`

```typescript
const exercise = useExercise<MyState>({
  exerciseCode: string,        // Codice esercizio (es: "101")
  difficulty: ExerciseDifficulty, // 'easy' | 'medium' | 'hard'
  initialState?: TState,       // Stato iniziale personalizzato
  showInstructions?: boolean,  // Mostra istruzioni iniziali (default: false)
  onComplete?: (result) => void, // Callback al completamento
});

// Ritorna:
{
  definition,      // IExerciseDefinition da exercises.ts
  phase,           // 'instructions' | 'active' | 'result'
  setPhase,        // Cambia fase
  state,           // Stato custom
  setState,        // Aggiorna stato
  errors,          // Numero errori
  addError,        // Aggiungi errori
  startTime,       // Timestamp inizio
  startTimer,      // Avvia timer manualmente
  getElapsedTime,  // Tempo trascorso in secondi
  completeExercise,// Completa con punteggio
  resetExercise,   // Reset completo
  difficultyLabel, // Label localizzata
  currentConfig,   // Config per difficoltà corrente
}
```

### Componenti Helper

```tsx
// Container con stili base
<ExerciseContainer className="custom-class">
  {children}
</ExerciseContainer>

// Header con titolo e difficoltà
<ExerciseHeader
  title="Titolo Esercizio"
  description="Descrizione"
  difficulty="medium"
  showDifficulty={true}
/>

// Schermata istruzioni
<ExerciseInstructions
  instructions="Leggi attentamente..."
  onStart={() => setPhase('active')}
  startLabel="Inizia"
/>

// Schermata risultati
<ExerciseResult
  score={8}
  maxScore={10}
  errors={2}
  timeSpent={45}
  message="Messaggio personalizzato"
  onRetry={handleRetry}
  onNext={handleNext}
/>
```

### Utility Functions

```typescript
// Mescola array
const shuffled = shuffleArray(['a', 'b', 'c']);

// Seleziona N elementi casuali
const selected = pickRandom(['a', 'b', 'c', 'd'], 2);

// Ottieni config per difficoltà
const config: DifficultyConfig<number> = { easy: 4, medium: 6, hard: 8 };
const value = getConfigForDifficulty(config, 'medium'); // 6

// Crea config numerico
const numConfig = createNumericDifficultyConfig(4, 6, 8);
```

## Registrazione Esercizio

Dopo aver creato il componente, aggiorna `lib/exercises.ts`:

1. Aggiungi l'esercizio all'array `exercises`
2. Aggiungi l'ID alla lista `implementedExercises` in `hasImplementedComponent`

```typescript
// In exercises.ts
{
  id: 102,
  code: '102',
  name: 'Nome Esercizio',
  description: 'Descrizione breve',
  category: 'memory', // memory | attention | executive | language | visuospatial
  difficulty: ['easy', 'medium', 'hard'],
  estimatedDuration: 5, // minuti
  instructions: 'Istruzioni complete...',
}

// Aggiorna hasImplementedComponent
export const hasImplementedComponent = (id: number): boolean => {
  const implementedExercises = [101, 102]; // Aggiungi qui
  return implementedExercises.includes(id);
};
```

## Flusso di Esecuzione

1. **Inizializzazione**: L'hook `useExercise` imposta stato iniziale e timer
2. **Esecuzione**: L'utente interagisce con l'esercizio
3. **Completamento**: Chiama `completeExercise(score, metadata)`
4. **Risultato**: Mostra schermata risultati con `ExerciseResult`
5. **Navigazione**: Il SessionStepper riceve il callback `onComplete` e avanza

## Best Practices

- Usa `DifficultyConfig<T>` per configurare parametri per difficoltà
- Usa `pickRandom` per selezioni casuali invece di `Math.random()`
- Chiama `addError()` per tracciare errori dell'utente
- Usa `getElapsedTime()` per ottenere il tempo trascorso
- Il timer parte automaticamente quando `phase === 'active'`
- Passa sempre `onComplete` al componente per integrazione col SessionStepper
