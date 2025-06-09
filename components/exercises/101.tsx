/**
 * @file        components/exercises/101.tsx
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-06-04
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       [TODO]
 *
 * @description [TODO]
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/components/exercises/101.tsx
 */

'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = {
  difficulty: 'easy' | 'medium' | 'hard';
};

const wordPool = [
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
];

const getWordsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  const count = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  const shuffled = [...wordPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Exercise101: React.FC<Props> = ({ difficulty }) => {
  const [phase, setPhase] = useState<'memorize' | 'recall' | 'result'>(
    'memorize'
  );
  const [words, setWords] = useState<string[]>([]);
  const [inputs, setInputs] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const selectedWords = getWordsByDifficulty(difficulty);
    setWords(selectedWords);
    setInputs(Array(selectedWords.length).fill(''));

    // Passaggio automatico alla fase successiva dopo 5 secondi
    const timer = setTimeout(() => setPhase('recall'), 5000);
    return () => clearTimeout(timer);
  }, [difficulty]);

  const handleChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    let correct = 0;
    const normalizedInputs = inputs.map((i) => i.trim().toLowerCase());
    const normalizedWords = words.map((w) => w.toLowerCase());

    normalizedInputs.forEach((input) => {
      if (normalizedWords.includes(input)) correct += 1;
    });

    setScore(correct);
    setPhase('result');
  };

  return (
    <div>
      {phase === 'memorize' && (
        <div className="space-y-2">
          <p className="text-muted-foreground">Memorizza queste parole:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {words.map((word, idx) => (
              <span key={idx} className="px-3 py-1 rounded">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {phase === 'recall' && (
        <div className="space-y-4">
          <p className="mb-2">Scrivi le parole che ricordi:</p>
          {inputs.map((input, idx) => (
            <div key={idx} className="flex flex-col items-start gap-2">
              <Label>Parola {idx + 1}</Label>
              <Input
                type="text"
                value={input}
                onChange={(e) => handleChange(e.target.value, idx)}
              />
            </div>
          ))}
          <Button onClick={handleSubmit} className="mt-4">
            Conferma
          </Button>
        </div>
      )}

      {phase === 'result' && score !== null && (
        <div className="space-y-2">
          <p>
            Hai ricordato <strong>{score}</strong> parole su{' '}
            <strong>{words.length}</strong>!
          </p>
          <p className="text-muted-foreground">
            Parole corrette: {words.join(', ')}
          </p>
          <Button onClick={() => window.location.reload()}>Riprova</Button>
        </div>
      )}
    </div>
  );
};

export default Exercise101;
