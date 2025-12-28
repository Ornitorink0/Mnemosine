'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Calendar,
  Clock,
  Target,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { difficultyLabels } from '@/lib/exercises';
import exercises from '@/lib/exercises';
import type { ExerciseDifficulty } from '@/types';

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
  }>;
  assignedOn: string;
  completedOn?: string;
  totalErrors: number;
  totalDuration: number;
}

interface Patient {
  _id: string;
  username: string;
  role: string;
}

export default function ViewResultsPage() {
  const { data: session } = useSession();
  const [sessions, setSessions] = useState<SessionResult[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role === 'patient') {
    redirect('/');
  }

  const fetchData = useCallback(async () => {
    try {
      const [sessionsRes, patientsRes] = await Promise.all([
        fetch('/api/sessions'),
        fetch('/api/users'),
      ]);

      if (sessionsRes.ok) {
        const sessionsData = await sessionsRes.json();
        setSessions(sessionsData);
      }

      if (patientsRes.ok) {
        const patientsData = await patientsRes.json();
        const patientsList = patientsData.filter(
          (u: Patient) => u.role === 'patient'
        );
        setPatients(patientsList);
      }
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtra le sessioni
  const filteredSessions = sessions.filter((sess) => {
    const patientMatch =
      selectedPatient === 'all' || sess.patientId === selectedPatient;
    const statusMatch =
      selectedStatus === 'all' || sess.status === selectedStatus;
    return patientMatch && statusMatch;
  });

  // Calcola statistiche
  const completedSessions = filteredSessions.filter(
    (s) => s.status === 'completed'
  );
  const avgScore =
    completedSessions.length > 0
      ? Math.round(
          completedSessions.reduce((acc, sess) => {
            const exercisesWithScore = sess.exercises.filter(
              (ex) => ex.score !== undefined
            );
            const sessScore =
              exercisesWithScore.length > 0
                ? exercisesWithScore.reduce(
                    (sum, ex) => sum + (ex.score || 0),
                    0
                  ) / exercisesWithScore.length
                : 0;
            return acc + sessScore;
          }, 0) / completedSessions.length
        )
      : 0;

  const totalErrors = completedSessions.reduce(
    (acc, sess) => acc + sess.totalErrors,
    0
  );
  const avgTime =
    completedSessions.length > 0
      ? Math.round(
          completedSessions.reduce((acc, sess) => acc + sess.totalDuration, 0) /
            completedSessions.length
        )
      : 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Da iniziare',
      'in-progress': 'In corso',
      completed: 'Completata',
      cancelled: 'Annullata',
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="container mx-auto py-6 px-4 md:py-10 md:px-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
          <BarChart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Visualizza Risultati
          </h1>
          <p className="text-muted-foreground">
            Analizza le performance dei pazienti
          </p>
        </div>
      </div>

      {/* Filtri */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Paziente</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Tutti i pazienti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i pazienti</SelectItem>
                {patients.map((patient) => (
                  <SelectItem key={patient._id} value={patient._id}>
                    {patient.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Stato</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Tutti gli stati" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli stati</SelectItem>
                <SelectItem value="completed">Completate</SelectItem>
                <SelectItem value="in-progress">In corso</SelectItem>
                <SelectItem value="pending">Da iniziare</SelectItem>
                <SelectItem value="cancelled">Annullate</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Punteggio Medio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}%</div>
            <p className="text-xs text-muted-foreground">
              {completedSessions.length} sessioni completate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Tempo Medio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(avgTime / 60)}:
              {(avgTime % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalErrors} errori totali
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista Sessioni */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      ) : filteredSessions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Nessun risultato</p>
            <p className="text-muted-foreground">
              Nessuna sessione corrisponde ai filtri selezionati.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredSessions.map((sess) => {
            const patient = patients.find((p) => p._id === sess.patientId);
            const assignedDate = new Date(sess.assignedOn).toLocaleDateString(
              'it-IT',
              {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }
            );
            const completedDate = sess.completedOn
              ? new Date(sess.completedOn).toLocaleDateString('it-IT', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : null;

            const sessionAvgScore =
              sess.exercises.length > 0
                ? Math.round(
                    sess.exercises
                      .filter((ex) => ex.score !== undefined)
                      .reduce((sum, ex) => sum + (ex.score || 0), 0) /
                      sess.exercises.filter((ex) => ex.score !== undefined)
                        .length
                  )
                : 0;

            return (
              <Card key={sess._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(sess.status)}
                        <Badge
                          variant={
                            sess.status === 'completed'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {getStatusLabel(sess.status)}
                        </Badge>
                      </div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="h-4 w-4" />
                        {patient ? (
                          <Link
                            href={`/dashboard/patient-detail/${patient._id}`}
                            className="hover:underline hover:text-primary transition-colors"
                          >
                            {patient.username}
                          </Link>
                        ) : (
                          'Paziente sconosciuto'
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Assegnata: {assignedDate}
                        </span>
                        {completedDate && (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Completata: {completedDate}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    {sess.status === 'completed' && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {sessionAvgScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Punteggio
                        </p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sess.exercises.map((ex, idx) => {
                      const exerciseDef = exercises.find(
                        (e) => e.code === ex.exerciseId
                      );
                      const minutes = Math.floor(ex.timeSpent / 60);
                      const seconds = ex.timeSpent % 60;

                      return (
                        <div
                          key={`${sess._id}-ex-${idx}-${ex.exerciseId}`}
                          className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">
                                {exerciseDef?.name ||
                                  `Esercizio ${ex.exerciseId}`}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {difficultyLabels[ex.difficulty]}
                              </Badge>
                            </div>
                            {ex.description && (
                              <p className="text-sm text-muted-foreground">
                                {ex.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-6 text-sm">
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
                                {minutes}:{seconds.toString().padStart(2, '0')}
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

                  {sess.status === 'completed' && (
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Errori totali:{' '}
                          </span>
                          <span className="font-medium">
                            {sess.totalErrors}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Durata totale:{' '}
                          </span>
                          <span className="font-medium">
                            {Math.floor(sess.totalDuration / 60)}:
                            {(sess.totalDuration % 60)
                              .toString()
                              .padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
