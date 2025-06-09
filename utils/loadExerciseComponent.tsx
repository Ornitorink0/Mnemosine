/**
 * @file        utils/loadExerciseComponent.tsx
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-05-27
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Componente per aggiungere un esercizio dinamicamente
 *
 * @description Questo componente viene usato da /debug/exercise, ma anche dal gestore di sessione
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/utils/loadExerciseComponent.tsx
 */

import dynamic from 'next/dynamic';

export function loadExerciseComponent(exerciseId: string | number) {
  return dynamic(() => import(`@/components/exercises/${exerciseId}`), {
    ssr: false,
    loading: () => <p>Caricamento dell&apos;esercizio...</p>,
  });
}
