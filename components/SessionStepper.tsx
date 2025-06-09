/**
 * @file        components/SessionStepper.tsx
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-04-05
 * @updated     2025-06-08
 * @license     MIT
 * @version     0.1.0
 * @brief       Visualizzatore di sessione con esercizi dinamici
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/components/SessionStepper.tsx
 */

'use client';

import Stepper, { Step } from './stepper';
import { loadExerciseComponent } from '@/utils/loadExerciseComponent';

type Exercise = {
  exerciseId: string;
  description: string;
  timeSpent: number;
  nErrors: number;
};

type Props = {
  exercises: Exercise[];
};

export default function SessionStepperClient({ exercises }: Props) {
  return (
    <Stepper
      initialStep={0}
      onStepChange={(step) => console.log('Step changed:', step)}
      onFinalStepCompleted={() => alert('Sessione completata!')}
      backButtonText="Indietro"
      nextButtonText="Avanti"
    >
      {exercises.map((exercise) => {
        const DynamicExercise = loadExerciseComponent(exercise.exerciseId);
        return (
          <Step key={exercise.exerciseId}>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                Esercizio {exercise.exerciseId}: {exercise.description}
              </h2>
              <DynamicExercise />
            </div>
          </Step>
        );
      })}
    </Stepper>
  );
}
