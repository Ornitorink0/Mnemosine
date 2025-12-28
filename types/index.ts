/**
 * Tipi centralizzati per Mnemosine
 * Questo file contiene tutti i tipi condivisi tra client e server
 */

/* -------------------------------------------------------------------------- */
/*                                   UTENTI                                   */
/* -------------------------------------------------------------------------- */

export type UserRole = 'super' | 'admin' | 'patient';

export interface IUser {
  _id: string;
  username: string;
  password?: string; // Opzionale lato client
  role: UserRole;
  sessionIds: string[];
  notes: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type UserCreateInput = {
  username: string;
  password: string;
  role: UserRole;
  notes?: string;
};

export type UserUpdateInput = Partial<
  Omit<IUser, '_id' | 'password' | 'createdAt' | 'updatedAt'>
>;

/* -------------------------------------------------------------------------- */
/*                                  ESERCIZI                                  */
/* -------------------------------------------------------------------------- */

export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';

export type ExerciseCategory =
  | 'memory' // Memoria
  | 'attention' // Attenzione
  | 'language' // Linguaggio
  | 'executive' // Funzioni esecutive
  | 'visuospatial'; // Abilità visuo-spaziali

export interface IExerciseDefinition {
  id: number;
  code: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty[];
  estimatedDuration: number; // minuti
  instructions?: string;
}

export interface IExerciseResult {
  exerciseId: string;
  difficulty: ExerciseDifficulty;
  description?: string;
  timeSpent: number; // secondi
  nErrors: number;
  score?: number;
  completedAt?: Date | string;
  // Dati specifici per ogni esercizio
  metadata?: Record<string, unknown>;
}

export interface IExerciseSelection {
  id: number;
  code: string;
  name: string;
  description: string;
  difficulty: ExerciseDifficulty;
}

/* -------------------------------------------------------------------------- */
/*                                  SESSIONI                                  */
/* -------------------------------------------------------------------------- */

export type SessionStatus =
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface ISession {
  _id: string;
  patientId: string;
  assignedBy?: string; // ID del medico che ha assegnato
  status: SessionStatus;
  exercises: IExerciseResult[];
  assignedOn: Date | string;
  startedOn?: Date | string;
  completedOn?: Date | string;
  totalErrors: number;
  totalDuration: number; // secondi
  notes?: string;
}

export type SessionCreateInput = {
  patientId: string;
  exercises: IExerciseSelection[];
  notes?: string;
};

/* -------------------------------------------------------------------------- */
/*                               NEXT-AUTH TYPES                              */
/* -------------------------------------------------------------------------- */

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      role: UserRole;
      sessionIds: string[];
      notes: string;
    };
  }

  interface User {
    id: string;
    username: string;
    role: UserRole;
    sessionIds: string[];
    notes: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    role: UserRole;
    sessionIds: string[];
    notes: string;
  }
}
