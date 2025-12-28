'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Brain,
  AlertTriangle,
  ArrowLeft,
  FileText,
  BarChart3,
  LineChart,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { difficultyLabels } from '@/lib/exercises';
import exercises from '@/lib/exercises';
import type { ExerciseDifficulty } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SessionResult {
  _id: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  patientId?: string;
  exercises: Array<{
    exerciseId: string;
    difficulty: ExerciseDifficulty;
    description?: string;
    timeSpent: number;
    nErrors: number;
    score?: number;
    completedAt?: string;
    metadata?: Record<string, unknown>;
  }>;
  assignedOn: string;
  startedOn?: string;
  completedOn?: string;
  totalErrors: number;
  totalDuration: number;
}

interface Patient {
  _id: string;
  username: string;
  role: string;
  notes: string;
  createdAt: string;
}

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [patientId, setPatientId] = useState<string>('');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [sessions, setSessions] = useState<SessionResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => setPatientId(p.id));
  }, [params]);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role === 'patient') {
    redirect('/');
  }

  const fetchPatientData = useCallback(async () => {
    try {
      const [patientRes, sessionsRes] = await Promise.all([
        fetch(`/api/users/${patientId}`),
        fetch(`/api/sessions`),
      ]);

      if (patientRes.ok) {
        const patientData = await patientRes.json();
        setPatient(patientData);
      }

      if (sessionsRes.ok) {
        const allSessions = await sessionsRes.json();
        const patientSessions = allSessions.filter(
          (s: SessionResult & { patientId?: string }) =>
            s.patientId === patientId
        );
        setSessions(patientSessions);
      }
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId, fetchPatientData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto py-10 px-6">
        <Card>
          <CardContent className="py-12 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <p className="text-lg font-medium">Paziente non trovato</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calcola statistiche cliniche
  const completedSessions = sessions.filter((s) => s.status === 'completed');
  const totalSessions = sessions.length;
  const completionRate =
    totalSessions > 0
      ? Math.round((completedSessions.length / totalSessions) * 100)
      : 0;

  // Analisi progressi
  const allScores = completedSessions
    .flatMap((s) => s.exercises)
    .filter((e) => e.score !== undefined)
    .map((e) => e.score as number);

  const avgScore =
    allScores.length > 0
      ? Math.round(allScores.reduce((sum, s) => sum + s, 0) / allScores.length)
      : 0;

  const recentScores = allScores.slice(-5);
  const olderScores = allScores.slice(0, -5);
  const recentAvg =
    recentScores.length > 0
      ? recentScores.reduce((sum, s) => sum + s, 0) / recentScores.length
      : 0;
  const olderAvg =
    olderScores.length > 0
      ? olderScores.reduce((sum, s) => sum + s, 0) / olderScores.length
      : 0;

  const trend =
    recentAvg > olderAvg
      ? 'improving'
      : recentAvg < olderAvg
        ? 'declining'
        : 'stable';

  // Errori e tempo
  const totalErrors = completedSessions.reduce(
    (sum, s) => sum + s.totalErrors,
    0
  );
  const avgErrors =
    completedSessions.length > 0
      ? Math.round(totalErrors / completedSessions.length)
      : 0;

  const totalTime = completedSessions.reduce(
    (sum, s) => sum + s.totalDuration,
    0
  );
  const avgTime =
    completedSessions.length > 0
      ? Math.round(totalTime / completedSessions.length)
      : 0;

  // Analisi per difficoltà
  const difficultyStats = {
    easy: { total: 0, avgScore: 0, avgErrors: 0 },
    medium: { total: 0, avgScore: 0, avgErrors: 0 },
    hard: { total: 0, avgScore: 0, avgErrors: 0 },
  };

  completedSessions.forEach((s) => {
    s.exercises.forEach((ex) => {
      if (ex.score !== undefined) {
        difficultyStats[ex.difficulty].total++;
        difficultyStats[ex.difficulty].avgScore += ex.score;
        difficultyStats[ex.difficulty].avgErrors += ex.nErrors;
      }
    });
  });

  Object.keys(difficultyStats).forEach((key) => {
    const diff = key as ExerciseDifficulty;
    if (difficultyStats[diff].total > 0) {
      difficultyStats[diff].avgScore = Math.round(
        difficultyStats[diff].avgScore / difficultyStats[diff].total
      );
      difficultyStats[diff].avgErrors = Math.round(
        difficultyStats[diff].avgErrors / difficultyStats[diff].total
      );
    }
  });

  // Analisi per tipo di esercizio
  const exerciseTypeStats: Record<
    string,
    { count: number; avgScore: number; avgErrors: number; totalTime: number }
  > = {};

  completedSessions.forEach((s) => {
    s.exercises.forEach((ex) => {
      if (!exerciseTypeStats[ex.exerciseId]) {
        exerciseTypeStats[ex.exerciseId] = {
          count: 0,
          avgScore: 0,
          avgErrors: 0,
          totalTime: 0,
        };
      }
      exerciseTypeStats[ex.exerciseId].count++;
      if (ex.score !== undefined) {
        exerciseTypeStats[ex.exerciseId].avgScore += ex.score;
      }
      exerciseTypeStats[ex.exerciseId].avgErrors += ex.nErrors;
      exerciseTypeStats[ex.exerciseId].totalTime += ex.timeSpent;
    });
  });

  Object.keys(exerciseTypeStats).forEach((key) => {
    const stats = exerciseTypeStats[key];
    if (stats.count > 0) {
      stats.avgScore = Math.round(stats.avgScore / stats.count);
      stats.avgErrors = Math.round(stats.avgErrors / stats.count);
    }
  });

  return (
    <div className="container mx-auto py-6 px-4 md:py-10 md:px-6">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Indietro
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{patient.username}</h1>
            <p className="text-muted-foreground">
              Paziente dal{' '}
              {new Date(patient.createdAt).toLocaleDateString('it-IT')}
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {totalSessions} sessioni
          </Badge>
        </div>
      </div>

      {/* Statistiche Generali */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Performance Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{avgScore}%</div>
            <div className="flex items-center gap-2 mt-2">
              {trend === 'improving' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : trend === 'declining' ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <Activity className="h-4 w-4 text-gray-500" />
              )}
              <span className="text-sm text-muted-foreground">
                {trend === 'improving'
                  ? 'In miglioramento'
                  : trend === 'declining'
                    ? 'In calo'
                    : 'Stabile'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Errori Medi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgErrors}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {totalErrors} totali in {completedSessions.length} sessioni
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Tempo Medio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.floor(avgTime / 60)}:
              {(avgTime % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-sm text-muted-foreground mt-2">per sessione</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-500" />
              Completamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completionRate}%</div>
            <p className="text-sm text-muted-foreground mt-2">
              {completedSessions.length} / {totalSessions} completate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs per analisi dettagliate */}
      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">
            <FileText className="h-4 w-4 mr-2" />
            Sessioni
          </TabsTrigger>
          <TabsTrigger value="difficulty">
            <BarChart3 className="h-4 w-4 mr-2" />
            Per Difficoltà
          </TabsTrigger>
          <TabsTrigger value="exercises">
            <LineChart className="h-4 w-4 mr-2" />
            Per Esercizio
          </TabsTrigger>
          <TabsTrigger value="clinical">
            <Brain className="h-4 w-4 mr-2" />
            Dati Clinici
          </TabsTrigger>
        </TabsList>

        {/* Tab Sessioni */}
        <TabsContent value="sessions" className="space-y-4">
          {completedSessions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Nessuna sessione completata
                </p>
              </CardContent>
            </Card>
          ) : (
            completedSessions.map((sess) => {
              const assignedDate = new Date(sess.assignedOn).toLocaleDateString(
                'it-IT'
              );
              const completedDate = sess.completedOn
                ? new Date(sess.completedOn).toLocaleDateString('it-IT')
                : null;

              const sessionScore =
                sess.exercises.filter((e) => e.score !== undefined).length > 0
                  ? Math.round(
                      sess.exercises
                        .filter((e) => e.score !== undefined)
                        .reduce((sum, e) => sum + (e.score || 0), 0) /
                        sess.exercises.filter((e) => e.score !== undefined)
                          .length
                    )
                  : 0;

              return (
                <Card key={sess._id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Sessione del {assignedDate}</CardTitle>
                        <CardDescription>
                          Completata il {completedDate} •{' '}
                          {sess.exercises.length} esercizi
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {sessionScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {sess.exercises.map((ex) => {
                        const exerciseDef = exercises.find(
                          (e) => e.code === ex.exerciseId
                        );
                        return (
                          <div
                            key={`${sess._id}-${ex.exerciseId}-${ex.completedAt}`}
                            className="flex items-center justify-between p-3 rounded-lg border"
                          >
                            <div className="flex-1">
                              <div className="font-medium">
                                {exerciseDef?.name ||
                                  `Esercizio ${ex.exerciseId}`}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {difficultyLabels[ex.difficulty]}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              {ex.score !== undefined && (
                                <div className="text-center">
                                  <div className="font-bold text-primary">
                                    {ex.score}%
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Score
                                  </div>
                                </div>
                              )}
                              <div className="text-center">
                                <div className="font-medium">{ex.nErrors}</div>
                                <div className="text-xs text-muted-foreground">
                                  Errori
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">
                                  {Math.floor(ex.timeSpent / 60)}:
                                  {(ex.timeSpent % 60)
                                    .toString()
                                    .padStart(2, '0')}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Tempo
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Tab Difficoltà */}
        <TabsContent value="difficulty" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {(['easy', 'medium', 'hard'] as ExerciseDifficulty[]).map(
              (diff) => (
                <Card key={diff}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{difficultyLabels[diff]}</span>
                      <Badge variant="outline">
                        {difficultyStats[diff].total} esercizi
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Punteggio Medio
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {difficultyStats[diff].avgScore}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Errori Medi
                      </div>
                      <div className="text-xl font-semibold">
                        {difficultyStats[diff].avgErrors}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </TabsContent>

        {/* Tab Esercizi */}
        <TabsContent value="exercises" className="space-y-4">
          {Object.keys(exerciseTypeStats).length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Nessun dato disponibile</p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(exerciseTypeStats).map(([exerciseId, stats]) => {
              const exerciseDef = exercises.find((e) => e.code === exerciseId);
              return (
                <Card key={exerciseId}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>
                        {exerciseDef?.name || `Esercizio ${exerciseId}`}
                      </span>
                      <Badge variant="outline">{stats.count} volte</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Score Medio
                        </div>
                        <div className="text-xl font-bold text-primary">
                          {stats.avgScore}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Errori Medi
                        </div>
                        <div className="text-xl font-semibold">
                          {stats.avgErrors}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Tempo Totale
                        </div>
                        <div className="text-xl font-semibold">
                          {Math.floor(stats.totalTime / 60)}:
                          {(stats.totalTime % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Tab Dati Clinici */}
        <TabsContent value="clinical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dati Clinici Dettagliati</CardTitle>
              <CardDescription>
                Analisi approfondita per valutazione medica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Note paziente */}
              {patient.notes && (
                <div>
                  <h3 className="font-semibold mb-2">Note Cliniche</h3>
                  <p className="text-sm text-muted-foreground p-3 rounded-lg bg-muted">
                    {patient.notes}
                  </p>
                </div>
              )}

              {/* Analisi temporale */}
              <div>
                <h3 className="font-semibold mb-3">Analisi Temporale</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-3 rounded-lg border">
                    <div className="text-sm text-muted-foreground mb-1">
                      Tempo totale di esercizio
                    </div>
                    <div className="text-lg font-semibold">
                      {Math.floor(totalTime / 3600)}h{' '}
                      {Math.floor((totalTime % 3600) / 60)}m
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="text-sm text-muted-foreground mb-1">
                      Sessioni completate
                    </div>
                    <div className="text-lg font-semibold">
                      {completedSessions.length} / {totalSessions}
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicatori di performance */}
              <div>
                <h3 className="font-semibold mb-3">
                  Indicatori di Performance
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Accuratezza</span>
                      <span className="text-lg font-bold text-primary">
                        {avgScore}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${avgScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Tasso di completamento
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {completionRate}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trend cognitivo */}
              <div>
                <h3 className="font-semibold mb-3">Trend Cognitivo</h3>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-3 mb-2">
                    {trend === 'improving' ? (
                      <>
                        <TrendingUp className="h-6 w-6 text-green-500" />
                        <span className="font-medium text-green-500">
                          In miglioramento
                        </span>
                      </>
                    ) : trend === 'declining' ? (
                      <>
                        <TrendingDown className="h-6 w-6 text-red-500" />
                        <span className="font-medium text-red-500">
                          In calo
                        </span>
                      </>
                    ) : (
                      <>
                        <Activity className="h-6 w-6 text-gray-500" />
                        <span className="font-medium text-gray-500">
                          Stabile
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {trend === 'improving'
                      ? 'Il paziente mostra progressi nelle ultime sessioni'
                      : trend === 'declining'
                        ? 'Il paziente mostra un calo di performance nelle ultime sessioni'
                        : 'Il paziente mantiene performance costanti'}
                  </p>
                </div>
              </div>

              {/* Metadata esercizi */}
              <div>
                <h3 className="font-semibold mb-3">Metadata Raccolti</h3>
                <div className="p-3 rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-2">
                    Tutti i dati degli esercizi includono timestamp precisi,
                    errori, tempo impiegato, score di accuratezza, informazioni
                    sul dispositivo utilizzato e metadata specifici per ogni
                    tipo di esercizio. Questi dati sono disponibili per analisi
                    cliniche approfondite attraverso l'API o il database.
                  </div>
                  <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
                    Total data points:{' '}
                    {completedSessions.reduce(
                      (sum, s) => sum + s.exercises.length,
                      0
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
