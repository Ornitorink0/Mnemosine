import dynamic from 'next/dynamic';

export function loadExerciseComponent(exerciseId: string | number) {
  return dynamic(() => import(`@/components/exercises/${exerciseId}`), {
    ssr: false,
    loading: () => <p>Caricamento dell&apos;esercizio...</p>,
  });
}
