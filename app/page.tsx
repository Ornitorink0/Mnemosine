'use client';

import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { difficultyLabels } from '@/lib/exercises';
import type { ExerciseDifficulty } from '@/types';

interface Session {
  _id: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  exercises: Array<{
    exerciseId: string;
    difficulty: ExerciseDifficulty;
    description?: string;
    timeSpent: number;
    nErrors: number;
  }>;
  assignedOn: string;
  completedOn?: string;
  totalErrors: number;
  totalDuration: number;
}

export default function Home() {
  const { data: session } = useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === 'patient') {
      fetchPatientSessions();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchPatientSessions = async () => {
    try {
      const res = await fetch('/api/sessions');
      if (res.ok) {
        const data = await res.json();
        // Filtra solo sessioni pending o in-progress
        const activeSessions = data.filter(
          (session: Session) =>
            session.status === 'pending' || session.status === 'in-progress'
        );
        setSessions(activeSessions);
      }
    } catch (error) {
      console.error('Errore caricamento sessioni:', error);
    } finally {
      setLoading(false);
    }
  };

  // Visualizzazione per pazienti
  if (session?.user?.role === 'patient') {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4em)]">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Benvenuto, {session.user.username}
          </h1>
          <p className="text-muted-foreground">
            Le tue sessioni di esercizi cognitivi
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : sessions.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                Nessuna sessione assegnata
              </p>
              <p className="text-muted-foreground">
                Il tuo medico ti assegnerà presto una sessione di esercizi.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((sess) => {
              const statusConfig = {
                pending: {
                  label: 'Da iniziare',
                  color: 'text-blue-500',
                  icon: <Calendar className="h-4 w-4" />,
                },
                'in-progress': {
                  label: 'In corso',
                  color: 'text-orange-500',
                  icon: <Clock className="h-4 w-4" />,
                },
                completed: {
                  label: 'Completata',
                  color: 'text-green-500',
                  icon: <CheckCircle className="h-4 w-4" />,
                },
                cancelled: {
                  label: 'Annullata',
                  color: 'text-red-500',
                  icon: <AlertCircle className="h-4 w-4" />,
                },
              };

              const config = statusConfig[sess.status];
              const assignedDate = new Date(sess.assignedOn).toLocaleDateString(
                'it-IT',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }
              );

              return (
                <Card key={sess._id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={cn(
                          'flex items-center gap-1 text-sm font-medium',
                          config.color
                        )}
                      >
                        {config.icon}
                        {config.label}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      Sessione del {assignedDate}
                    </CardTitle>
                    <CardDescription>
                      {sess.exercises.length} esercizi assegnati
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2">
                      {sess.exercises.slice(0, 3).map((ex, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-muted-foreground">
                            Esercizio {ex.exerciseId} -{' '}
                            {difficultyLabels[ex.difficulty]}
                          </span>
                        </div>
                      ))}
                      {sess.exercises.length > 3 && (
                        <p className="text-xs text-muted-foreground ml-4">
                          +{sess.exercises.length - 3} altri esercizi
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {sess.status === 'pending' ||
                    sess.status === 'in-progress' ? (
                      <Link href={`/session/${sess._id}`} className="w-full">
                        <Button className="w-full">
                          {sess.status === 'pending' ? 'Inizia' : 'Continua'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : sess.status === 'completed' ? (
                      <div className="w-full text-center text-sm text-muted-foreground">
                        Completata il{' '}
                        {sess.completedOn
                          ? new Date(sess.completedOn).toLocaleDateString(
                              'it-IT'
                            )
                          : 'N/A'}
                      </div>
                    ) : (
                      <div className="w-full text-center text-sm text-muted-foreground">
                        Sessione annullata
                      </div>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Visualizzazione standard per visitatori/admin/super
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex h-[calc(100dvh-4em)] w-full flex-col items-center justify-center">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-50%] h-[200%] skew-y-12'
          )}
        />
        <main className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
          <h1 className="max-w-3xl text-4xl sm:text-6xl md:text-8xl font-light leading-tight tracking-tight">
            <span className="block">MNEMOSINE</span>
            <span className="block">
              ALLENA
              <br />
              MENTI.
            </span>
          </h1>
        </main>
      </div>
    </div>
  );
}
