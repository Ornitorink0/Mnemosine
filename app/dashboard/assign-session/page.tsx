"use client";

import { useState } from "react";
import { Check, Plus, Trash } from "lucide-react";

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
import { toast } from "sonner";

// MANCA IMPLEMENTAZIONE API

const patients = [
  { id: 1, name: "Marco Rossi" },
  { id: 2, name: "Giulia Bianchi" },
  { id: 3, name: "Luca Verdi" },
  { id: 4, name: "Sofia Esposito" },
  { id: 5, name: "Matteo Russo" },
];

const availableExercises = [
  {
    id: 105,
    code: "105",
    name: "Trova i sinonimi",
    description: "Identifica parole con significato simile",
  },
  {
    id: 106,
    code: "106",
    name: "Trova i contrari",
    description: "Identifica parole con significato opposto",
  },
  {
    id: 201,
    code: "201",
    name: "Sequenze logiche",
    description: "Completa la sequenza seguendo il pattern",
  },
  {
    id: 304,
    code: "304",
    name: "Memoria visiva",
    description: "Ricorda e riproduci gli elementi mostrati",
  },
  {
    id: 401,
    code: "401",
    name: "Completa il puzzle",
    description: "Ricostruisci l'immagine dai frammenti",
  },
  {
    id: 402,
    code: "402",
    name: "Labirinto",
    description: "Trova il percorso dall'inizio alla fine",
  },
  {
    id: 503,
    code: "503",
    name: "Calcolo mentale",
    description: "Risolvi operazioni matematiche senza carta",
  },
  {
    id: 601,
    code: "601",
    name: "Comprensione del testo",
    description: "Rispondi a domande sul brano letto",
  },
];

export default function AssignExercisesPage() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientPopoverOpen, setPatientPopoverOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleSelectExercise = (exercise) => {
    if (selectedExercises.some((ex) => ex.id === exercise.id)) {
      setSelectedExercises(
        selectedExercises.filter((ex) => ex.id !== exercise.id)
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleRemoveExercise = (exerciseId) => {
    setSelectedExercises(
      selectedExercises.filter((ex) => ex.id !== exerciseId)
    );
  };

  const handleAssignSession = () => {
    if (!selectedPatient) {
      toast({
        title: "Nessun paziente selezionato",
        description: "Seleziona un paziente prima di assegnare la sessione",
        variant: "destructive",
      });
      return;
    }

    if (selectedExercises.length === 0) {
      toast({
        title: "Nessun esercizio selezionato",
        description: "Seleziona almeno un esercizio per la sessione",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    toast({
      title: "Sessione assegnata con successo",
      description: `${selectedExercises.length} esercizi assegnati a ${selectedPatient.name}`,
    });

    // Reset form after successful assignment
    setSelectedExercises([]);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Assegnazione Esercizi</h1>

      <Card>
        <CardHeader>
          <CardTitle>Nuova Sessione di Esercizi</CardTitle>
          <CardDescription>
            Seleziona un paziente e gli esercizi da assegnare per la sessione
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Selection */}
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
                    ? selectedPatient.name
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
                        {patients.map((patient) => (
                          <CommandItem
                            key={patient.id}
                            value={patient.name}
                            onSelect={() => {
                              setSelectedPatient(patient);
                              setPatientPopoverOpen(false);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                selectedPatient?.id === patient.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {patient.name}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Exercise Selection */}
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
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="w-20">Codice</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Descrizione
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableExercises.map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedExercises.some(
                            (ex) => ex.id === exercise.id
                          )}
                          onCheckedChange={() => handleSelectExercise(exercise)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {exercise.code}
                      </TableCell>
                      <TableCell>{exercise.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {exercise.description}
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
                    {selectedExercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between p-2 rounded-md border"
                      >
                        <div>
                          <div className="font-medium">
                            {exercise.code} - {exercise.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {exercise.description}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveExercise(exercise.id)}
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
