"use client";

import { useEffect, useState } from "react";
import { Calendar, Check, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import availableExercises from "@/lib/availableExercises";

export type User = {
  id: string;
  _id: string;
  username: string;
  password: string;
  role: "super" | "admin" | "patient";
  createdAt: Date;
  updatedAt: Date;
  sessionIds: number[];
  notes: string;
};

export type Exercise = {
  id: number;
  code: string;
  name: string;
  description: string;
  difficulty?: Array<"easy" | "medium" | "hard">; // Array di difficoltà, può essere vuoto
};

type ExerciseSelected = {
  id: number;
  code: string;
  name: string;
  description: string;
  difficulty: string; // string perché può essere qualsiasi valore presente nell'array delle difficoltà
};

export default function AssignExercisesPage() {
  const [selectedPatient, setSelectedPatient] = useState<User | null>(null);
  const [patientPopoverOpen, setPatientPopoverOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<
    ExerciseSelected[]
  >([]);

  const { data: session, status } = useSession();
  console.log("DashboardPage", { session, status });
  if (!session) {
    redirect("/login");
  }

  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Network response was not ok");
      const users = await res.json();
      setData(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const patients = data.filter((user) => user.role === "patient");

  function handleToggleExerciseDifficulty(
    exercise: Exercise,
    difficulty: string
  ) {
    const exists = selectedExercises.some(
      (ex) => ex.id === exercise.id && ex.difficulty === difficulty
    );
    if (exists) {
      setSelectedExercises((prev) =>
        prev.filter(
          (ex) => !(ex.id === exercise.id && ex.difficulty === difficulty)
        )
      );
    } else {
      setSelectedExercises((prev) => [...prev, { ...exercise, difficulty }]);
    }
  }

  function isExerciseDifficultySelected(
    exerciseId: number,
    difficulty: string
  ) {
    return selectedExercises.some(
      (ex) => ex.id === exerciseId && ex.difficulty === difficulty
    );
  }

  function handleToggleAll(checked: boolean) {
    if (checked) {
      setSelectedExercises(
        availableExercises.flatMap((exercise) =>
          (exercise.difficulty ?? []).map((d) => ({
            ...exercise,
            difficulty: d,
          }))
        )
      );
    } else {
      setSelectedExercises([]);
    }
  }

  async function handleAssignSession() {
    if (!selectedPatient) {
      toast.error("Seleziona un paziente prima di assegnare la sessione.");
      return;
    }

    if (selectedExercises.length === 0) {
      toast.error("Seleziona almeno un esercizio da assegnare.");
      return;
    }

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: selectedPatient._id,
          exercises: selectedExercises,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign session");
      }

      const result = await response.json();
      toast.success("Sessione assegnata con successo!");
      setSelectedExercises([]);
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error assigning session:", error);
      toast.error("Errore durante l'assegnazione della sessione.");
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                    LOGS                                    */
  /* -------------------------------------------------------------------------- */

  console.log("Selected Patient:", selectedPatient);
  console.log("Selected Exercises:", selectedExercises);

  /* -------------------------------------------------------------------------- */

  return (
    <div className="container mx-auto py-6 px-4 md:py-10 md:px-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Assegna Sessione</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nuova Sessione di Esercizi</CardTitle>
          <CardDescription>
            Seleziona un paziente e gli esercizi da assegnare per la sessione
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Paziente</label>
            <Popover
              open={patientPopoverOpen}
              onOpenChange={setPatientPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {selectedPatient
                    ? selectedPatient.username
                    : "Seleziona un paziente"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Cerca paziente..." />
                  <CommandList>
                    <CommandEmpty>Nessun paziente trovato.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-[200px]">
                        {patients.map((patient, idx) => (
                          <CommandItem
                            key={`${patient.id ?? patient.username}-${idx}`}
                            value={patient.username}
                            onSelect={() => {
                              setSelectedPatient(patient);
                              setPatientPopoverOpen(false);
                            }}
                          >
                            {selectedPatient?.id === patient.id && (
                              <Check className="mr-2 h-4 w-4 opacity-100" />
                            )}
                            {patient.username}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">
                Esercizi Disponibili
              </label>
              <span className="text-sm text-muted-foreground">
                {selectedExercises.length} selezionati
              </span>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="flex items-center justify-center">
                      <Checkbox
                        className="accent-primary"
                        checked={availableExercises.every((exercise) =>
                          exercise.difficulty?.every((d) =>
                            isExerciseDifficultySelected(exercise.id, d)
                          )
                        )}
                        onCheckedChange={(checked) =>
                          handleToggleAll(checked ? true : false)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">Codice</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell className="hidden md:table-cell">
                      Descrizione
                    </TableCell>
                    <TableCell>Difficoltà</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableExercises.map((exercise) => (
                    <TableRow key={exercise.id} className="cursor-pointer">
                      <TableCell className="flex items-center justify-center"></TableCell>
                      <TableCell className="font-medium">
                        {exercise.code}
                      </TableCell>
                      <TableCell>{exercise.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {exercise.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col xl:flex-row gap-4 flex-nowrap overflow-x-auto xl:min-w-[220px] mr-4">
                          {(exercise.difficulty ?? []).map((d) => {
                            const selected = isExerciseDifficultySelected(
                              exercise.id,
                              d
                            );
                            return (
                              <label
                                key={d}
                                className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-colors cursor-pointer
                                  ${
                                    selected
                                      ? "bg-primary/10 border-primary text-primary font-semibold shadow-sm"
                                      : "bg-muted border-muted-foreground/20 text-muted-foreground"
                                  }
                                  hover:border-primary hover:bg-primary/20`}
                                style={{
                                  minWidth: 90,
                                  justifyContent: "center",
                                }}
                              >
                                <Checkbox
                                  className="hidden"
                                  checked={selected}
                                  onCheckedChange={() =>
                                    handleToggleExerciseDifficulty(
                                      {
                                        id: exercise.id,
                                        code: exercise.code,
                                        name: exercise.name,
                                        description: exercise.description,
                                      },
                                      d
                                    )
                                  }
                                />
                                <span className="capitalize">{d}</span>
                              </label>
                            );
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Selected Exercises */}
          {selectedExercises.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Esercizi Selezionati
              </label>
              <Card>
                <ScrollArea className="h-[200px]">
                  <div className="p-4 space-y-2">
                    {selectedExercises.map((exercise, idx) => (
                      <div
                        key={`${exercise.id}-${exercise.difficulty}-${idx}`}
                        className="flex items-center justify-between p-2 rounded-md border"
                      >
                        <div>
                          <div className="font-medium">
                            {exercise.code} - {exercise.name} (
                            {exercise.difficulty})
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {exercise.description}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleToggleExerciseDifficulty(
                              {
                                id: exercise.id,
                                code: exercise.code,
                                name: exercise.name,
                                description: exercise.description,
                                // Difficoltà da non includere qui
                              },
                              exercise.difficulty
                            )
                          }
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setSelectedExercises([])}>
            Cancella
          </Button>
          <Button onClick={handleAssignSession}>
            <Plus className="mr-2 h-4 w-4" /> Assegna Sessione
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
