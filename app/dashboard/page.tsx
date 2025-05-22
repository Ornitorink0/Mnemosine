"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-4em)] bg-surface">
      <div className="container flex flex-col items-center justify-center px-4 py-16 mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-bold">
          Il tuo dashboard,{" "}
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -z-10 blur-3xl opacity-75 transform rotate-2 scale-105 dark:opacity-75" />
            <span className="relative dark:text-white text-black font-semibold drop-shadow-lg">
              {session.user.username}
            </span>
          </span>
        </h1>
        <p className="mt-4 text-lg text-center">
          Gestisci le sessioni, visualizza i risultati e amministra gli utenti
        </p>
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {[
            {
              icon: <Calendar className="w-8 h-8 mb-2 text-primary" />,
              title: "Assegna Sessione",
              description:
                "Gestisci le sessioni e assegnale ai pazienti in base alle loro necessità.",
              link: "/dashboard/assign-session",
              buttonText: "Assegna",
            },
            {
              icon: <BarChart className="w-8 h-8 mb-2 text-primary" />,
              title: "Visualizza Risultati",
              description:
                "Visualizza e analizza i risultati delle sessioni dei pazienti.",
              link: "/dashboard/view-results",
              buttonText: "Visualizza",
            },
            {
              icon: <Users className="w-8 h-8 mb-2 text-primary" />,
              title: "Gestisci Utenti",
              description:
                "Crea, modifica ed elimina account utente nel sistema.",
              link: "/dashboard/manage-users",
              buttonText: "Gestisci",
            },
          ].map((card, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader>
                {card.icon}
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
              <div className="flex-grow" />
              <CardFooter>
                <Link href={card.link} className="w-full">
                  <Button className="w-full">{card.buttonText}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
