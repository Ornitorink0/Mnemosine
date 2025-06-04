import mongoose from "mongoose";

// Questa interfaccia viene usata per rappresentare l'utente nella sessione
// di next-auth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: "super" | "admin" | "patient";
      createdAt: Date;
      updatedAt: Date;
      sessionIds: string[];
      notes: string;
    };
  }

  // Questa interfaccia rappresenta l'utente nel database
  interface User {
    id: string;
    username: string;
    role: "super" | "admin" | "patient";
    createdAt: Date;
    updatedAt: Date;
    sessionIds: string[];
    notes: string;
  }
}

// Questa interfaccia viene usata per rappresentare l'utente nel token JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: "super" | "admin" | "patient";
    createdAt: Date;
    updatedAt: Date;
    sessionIds: string[];
    notes: string;
  }
}
