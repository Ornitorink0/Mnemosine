"use client";

import { create } from "zustand";
import { User } from "@/components/user-table";

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user._id !== id),
    })),
}));

export async function fetchUsers() {
  try {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Errore nel recupero utenti");
    const data: User[] = await res.json();
    useUserStore.getState().setUsers(data);
  } catch (err) {
    console.error("Errore fetchUsers:", err);
    alert("Errore durante il caricamento utenti");
  }
}

export async function addUser(
  username: string,
  password: string,
  role: "super" | "admin" | "patient"
) {
  try {
    const res = await fetch("/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert("Username già in uso");
      return;
    }

    const newUser: User = await res.json();
    useUserStore.getState().addUser(newUser);
    return newUser;
  } catch (err) {
    console.error("Errore addUser:", err);
    alert("Errore nell'aggiunta utente");
  }
}

export async function updateUser(updatedUser: User) {
  try {
    const res = await fetch(`/api/users/${updatedUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    if (!res.ok) throw new Error(`Failed to update user: ${res.statusText}`);

    const updated: User = await res.json();
    useUserStore.getState().updateUser(updated);
    return updated;
  } catch (err) {
    console.error("Errore updateUser:", err);
    alert("Errore aggiornamento utente");
    throw err;
  }
}

export async function deleteUser(id: string) {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Errore nella cancellazione dell’utente");

    useUserStore.getState().deleteUser(id);
  } catch (err) {
    console.error("Errore deleteUser:", err);
    alert("Errore durante la cancellazione utente");
  }
}
