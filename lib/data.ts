"use client";

import type { User } from "@/components/user-table";
import { create } from "zustand";

// Mock data store
interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: generateMockUsers(),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));

// Generate mock data
function generateMockUsers(): User[] {
  return [
    {
      id: "1",
      username: "admin",
      password: "admin123",
      role: "admin",
      createdAt: new Date(2023, 0, 15),
      updatedAt: new Date(2023, 2, 10),
      sessions: [
        {
          exercises: [
            {
              id: "ex1",
              description: "Reading comprehension",
              timeSpent: 30,
              usererrors: 2,
            },
            {
              id: "ex2",
              description: "Grammar practice",
              timeSpent: 45,
              usererrors: 1,
            },
          ],
          date: new Date(2023, 2, 5),
          duration: 75,
        },
        {
          exercises: [
            {
              id: "ex3",
              description: "Vocabulary building",
              timeSpent: 20,
              usererrors: 3,
            },
          ],
          date: new Date(2023, 2, 8),
          duration: 20,
        },
      ],
      notes: [
        "User is making good progress with grammar exercises.",
        "Needs more practice with vocabulary.",
      ],
    },
    {
      id: "2",
      username: "johndoe",
      password: "password123",
      role: "user",
      createdAt: new Date(2023, 1, 20),
      updatedAt: new Date(2023, 1, 20),
      sessions: [
        {
          exercises: [
            {
              id: "ex4",
              description: "Listening comprehension",
              timeSpent: 60,
              usererrors: 5,
            },
          ],
          date: new Date(2023, 2, 1),
          duration: 60,
        },
      ],
      notes: ["Struggles with listening exercises."],
    },
    {
      id: "3",
      username: "janedoe",
      password: "jane123",
      role: "user",
      createdAt: new Date(2023, 2, 5),
      updatedAt: new Date(2023, 2, 5),
      sessions: [],
      notes: ["New user, no sessions yet."],
    },
    {
      id: "4",
      username: "guest",
      password: "guest",
      role: "guest",
      createdAt: new Date(2023, 2, 10),
      updatedAt: new Date(2023, 2, 10),
      sessions: [
        {
          exercises: [
            {
              id: "ex5",
              description: "Basic grammar",
              timeSpent: 15,
              usererrors: 0,
            },
            {
              id: "ex6",
              description: "Simple vocabulary",
              timeSpent: 10,
              usererrors: 1,
            },
          ],
          date: new Date(2023, 2, 12),
          duration: 25,
        },
      ],
      notes: [],
    },
  ];
}

// Export functions to interact with the store
export const mockUsers = useUserStore.getState().users;

export function addUser(user: User) {
  useUserStore.getState().addUser(user);
}

export function updateUser(user: User) {
  useUserStore.getState().updateUser(user);
}

export function deleteUser(id: string) {
  useUserStore.getState().deleteUser(id);
}
