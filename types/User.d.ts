/**
 * @file        types/User.d.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-05-22
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Interfaccia per sessione e utente
 *
 * @description Dichiara i tipi a next-auth
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/types/User.d.ts
 */

// Questa interfaccia viene usata per rappresentare l'utente nella sessione
// di next-auth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      role: 'super' | 'admin' | 'patient';
      createdAt: Date;
      updatedAt: Date;
      sessionIds: string[];
      notes: string;
    };
  }
}

// Questa interfaccia rappresenta l'utente nel database
export interface User {
  id: string;
  name: string;
  role: 'super' | 'admin' | 'patient';
  createdAt: Date;
  updatedAt: Date;
  sessionIds: string[];
  notes: string;
}

// Questa interfaccia viene usata per rappresentare l'utente nel token JWT
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    role: 'super' | 'admin' | 'patient';
    createdAt: Date;
    updatedAt: Date;
    sessionIds: string[];
    notes: string;
  }
}
