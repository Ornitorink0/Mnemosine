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
  ArrowDown,
  Brain,
  BarChart,
  User,
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
                  <CardContent className="grow">
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
      {/* Hero Section */}
      <div className="relative flex h-[calc(100dvh-4em)] w-full flex-col items-center justify-center overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            'mask-[radial-gradient(500px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-50%] h-[200%] skew-y-12'
          )}
        />
        <main className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 text-center">
          <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight mb-6">
            <span className="block">MNEMOSINE</span>
            <span className="block bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              ALLENA MENTI.
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
            Esercizi cognitivi interattivi per la diagnosi precoce
            dell'Alzheimer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="px-8">
                Accedi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="link"
              className="px-8"
              onClick={() => {
                const featuresSection =
                  document.querySelector('#features-section');
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Scopri di più
              <ArrowDown />
            </Button>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <section
        id="features-section"
        className="bg-muted/50 py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Come Funziona
            </h2>
            <p className="text-lg text-muted-foreground">
              Una piattaforma completa per supportare i professionisti sanitari
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-blue-700" />,
                title: 'Esercizi Cognitivi',
                description:
                  'Test interattivi progettati per valutare memoria, attenzione e funzioni cognitive',
              },
              {
                icon: <BarChart className="h-8 w-8 text-purple-700" />,
                title: 'Analisi Dettagliate',
                description:
                  'Traccia i progressi e identifica modelli per una diagnosi più accurata',
              },
              {
                icon: <User className="h-8 w-8 text-pink-700" />,
                title: 'Gestione Pazienti',
                description:
                  'Assegna sessioni, monitora risultati e condividi dati clinici con facilità',
              },
            ].map((feature, idx) => (
              <Card key={idx} className="border-none shadow-none bg-background">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Perché Mnemosine?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Basato su Ricerca
              </h3>
              <p className="text-muted-foreground">
                Esercizi sviluppati in base alle pratiche cliniche per
                l'identificazione precoce di declino cognitivo.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Facile da Usare
              </h3>
              <p className="text-muted-foreground">
                Interfaccia intuitiva sia per pazienti che per professionisti
                sanitari, accessibile e user-friendly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Dati Sicuri
              </h3>
              <p className="text-muted-foreground">
                I dati dei pazienti sono protetti con standard di sicurezza e
                privacy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Supporto Clinico
              </h3>
              <p className="text-muted-foreground">
                Dashboard completa per analizzare i risultati e supportare le
                decisioni cliniche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 md:p-12 text-center border border-blue-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto a Iniziare?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Accedi alla piattaforma o contatta il tuo amministratore per
            iniziare a utilizzare Mnemosine oggi stesso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="px-8">
                Accedi Ora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8">
              Contattaci
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
