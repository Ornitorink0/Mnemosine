import NextAuth from "next-auth";

// Questa interfaccia viene usata per rappresentare l'utente nella sessione
// di next-auth
declare module "next-auth" {
  interface Session {
    user: {
      id: unknown;
      username: String;
      password: String;
      role: "super" | "admin" | "patient";
      createdAt: Date;
      updatedAt: Date;
      sessionIds: number[];
      notes: string;
    };
  }

  // Questa interfaccia rappresenta l'utente nel database
  interface User {
    username: String;
    password: String;
    role: "super" | "admin" | "patient";
    createdAt: Date;
    updatedAt: Date;
    sessionIds: number[];
    notes: string;
  }
}

// Questa interfaccia viene usata per rappresentare l'utente nel token JWT
declare module "next-auth/jwt" {
  interface JWT {
    username: String;
    password: String;
    role: "super" | "admin" | "patient";
    createdAt: Date;
    updatedAt: Date;
    sessionIds: number[];
    notes: string;
  }
}
