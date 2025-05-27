"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

function ExercisePicker() {
  const { data: session } = useSession();
  const [exerciseCode, setExerciseCode] = useState("");
  const [DynamicExercise, setDynamicExercise] =
    useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (session?.user?.role !== "super" && session?.user?.role !== "admin") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Card className="w-full max-w-md py-8 px-6 shadow-lg">
          <CardTitle className="text-3xl font-bold text-center mb-2">
            Access Denied
          </CardTitle>
          <CardHeader className="text-gray-600 text-center mb-4">
            You do not have permission to access this page.
          </CardHeader>
          <div className="text-center">
            <p className="text-red-500 mb-4">
              Please contact an administrator if you believe this is an error.
            </p>
            <a href="/dashboard" className="text-blue-500 hover:underline">
              Return to Dashboard
            </a>
          </div>
        </Card>
      </div>
    );
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDynamicExercise(null);
    if (!exerciseCode.trim()) return;
    try {
      const DynamicComp = dynamic(() =>
        import(`@/components/exercises/${exerciseCode.trim()}.tsx`).catch(
          () => {
            throw new Error("Exercise not found");
          }
        )
      );
      setDynamicExercise(() => DynamicComp);
    } catch (err) {
      setError("Exercise not found");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md py-8 px-6 shadow-lg">
        <CardTitle className="text-3xl font-bold text-center">
          Debug Exercises
        </CardTitle>
        <CardHeader className="text-gray-600 text-center">
          Inserisci il codice dell'esercizio da provare.
        </CardHeader>
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <Input
            placeholder="Codice esercizio (es: 105)"
            className="w-full h-10"
            value={exerciseCode}
            onChange={(e) => setExerciseCode(e.target.value)}
          />
          <Button type="submit" className="h-10">
            Cerca
          </Button>
        </form>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        <div className="mt-4">{DynamicExercise && <DynamicExercise />}</div>
      </Card>
    </div>
  );
}

export default ExercisePicker;
