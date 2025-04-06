"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, BarChart } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  console.log("DashboardPage", { session, status });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100dvh-4em)] px-4 py-8 mx-auto">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <Calendar className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>Assegna Sessione</CardTitle>
            <CardDescription>
              Assegna una sessione ad un paziente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gestisci le sessioni e assegnale ai pazienti in base alle loro
              necessità.
            </p>
          </CardContent>
          <div className="flex-grow" />
          <CardFooter>
            <Link href="/dashboard/assign-session" className="w-full">
              <Button className="w-full">Assegna</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <BarChart className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>Visualizza Risultati</CardTitle>
            <CardDescription>Analizza i dati e i risultati</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visualizza e analizza i risultati delle sessioni dei pazienti.
            </p>
          </CardContent>
          <div className="flex-grow" />
          <CardFooter>
            <Link href="/dashboard/view-results" className="w-full">
              <Button className="w-full">Visualizza</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <Users className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>Gestisci Utenti</CardTitle>
            <CardDescription>Amministra gli account utente</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Crea, modifica ed elimina account utente nel sistema.
            </p>
          </CardContent>
          <div className="flex-grow" />
          <CardFooter>
            <Link href="/dashboard/manage-users" className="w-full">
              <Button className="w-full">Gestisci</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
