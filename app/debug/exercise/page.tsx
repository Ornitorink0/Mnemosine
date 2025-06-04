'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ExerciseProps = {
  difficulty: 'easy' | 'medium' | 'hard';
};

function ExercisePicker() {
  const { data: session } = useSession();
  const [exerciseCode, setExerciseCode] = useState('');
  const [searchedCode, setSearchedCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy'
  );

  const difficultyLabel = {
    easy: 'Facile',
    medium: 'Intermedio',
    hard: 'Difficile',
  }[difficulty];

  if (session?.user?.role !== 'super' && session?.user?.role !== 'admin') {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Card className="w-full max-w-md py-8 px-6 shadow-lg">
          <CardTitle className="text-3xl font-bold text-center mb-2">
            Access Denied
          </CardTitle>
          <CardHeader className="text-gray-600 text-center mb-4">
            You do not have permission to access this page.
          </CardHeader>
          <div className="text-center">
            <p className="text-red-500 mb-4">
              Please contact an administrator if you believe this is an error.
            </p>
            <a href="/dashboard" className="text-blue-500 hover:underline">
              Return to Dashboard
            </a>
          </div>
        </Card>
      </div>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!exerciseCode.trim()) return;
    setSearchedCode(exerciseCode.trim());
  };

  // Caricamento dinamico solo se abbiamo un codice cercato
  const DynamicExercise = searchedCode
    ? dynamic<ExerciseProps>(
        () =>
          import(`@/components/exercises/${searchedCode}.tsx`).then(
            (mod) => mod.default
          ),
        {
          ssr: false,
          loading: () => <p className="text-center">Caricamento...</p>,
        }
      )
    : null;

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md py-8 px-6 shadow-lg">
        <CardTitle className="text-3xl font-bold text-center">
          Debug Exercises
        </CardTitle>
        <CardHeader className="text-gray-600 text-center">
          Inserisci il codice dell&apos;esercizio da provare.
        </CardHeader>
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <Input
            placeholder="Codice esercizio (es: 105)"
            className="w-full h-10"
            value={exerciseCode}
            onChange={(e) => setExerciseCode(e.target.value)}
          />
          <Button type="submit" className="h-10">
            Cerca
          </Button>
          {/* Difficoltà */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-10">{difficultyLabel}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDifficulty('easy')}>
                Facile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficulty('medium')}>
                Intermedio
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficulty('hard')}>
                Difficile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        <div className="mt-4">
          {DynamicExercise && <DynamicExercise difficulty={difficulty} />}
        </div>
      </Card>
    </div>
  );
}

export default ExercisePicker;
