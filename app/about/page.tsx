'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Users, Zap, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4em)] bg-muted/50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6">Chi Siamo</h1>
          <p className="text-xl text-muted-foreground">
            Mnemosine è una piattaforma web progettata per supportare medici e
            personale sanitario nella diagnosi precoce dell'Alzheimer, tramite
            esercizi interattivi studiati per stimolare e valutare le capacità
            cognitive degli utenti.
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">La Nostra Missione</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Mnemosine nasce da una profonda passione per l'informatica e
                dalla volontà di creare un impatto reale nella società. Sappiamo
                che l'Alzheimer è una malattia neurodegenerativa diffusa:
                vogliamo mettere le nostre competenze a servizio di un problema
                così importante.
              </p>
              <p>
                Forniamo ai professionisti sanitari uno strumento diagnostico
                affidabile, intuitivo e scientificamente valido per
                l'identificazione precoce dei disturbi cognitivi, migliorando
                gli esiti clinici e la qualità della vita dei pazienti e delle
                loro famiglie.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">Come Funziona</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Brain,
                title: 'Esercizi Interattivi',
                description:
                  'Puzzle, associazioni logiche, cifrari, test di attenzione e molto altro. Ogni esercizio è progettato per valutare specifiche capacità cognitive.',
              },
              {
                icon: Zap,
                title: 'Raccolta Dati Avanzata',
                description:
                  'Tempo di completamento, errori commessi, percorsi logici utilizzati. Tutti i dati sono registrati su MongoDB per analisi dettagliate.',
              },
              {
                icon: Users,
                title: 'Dashboard Medica',
                description:
                  "I professionisti sanitari possono analizzare l'andamento dei pazienti nel tempo tramite una dashboard riservata.",
              },
              {
                icon: Award,
                title: 'Accessibilità e Semplicità',
                description:
                  'Sistema di login protetto, interfaccia intuitiva e funzionale. Pensato anche per ambienti con risorse limitate.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx}>
                  <CardHeader className="flex flex-row items-start gap-4">
                    <Icon className="w-6 h-6 mt-1 shrink-0" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">La Nostra Storia</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>L'Inizio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Mnemosine è frutto di mesi di lavoro, sperimentazione e
                  collaborazione. Il progetto è nato su richiesta di un
                  professore, in collaborazione con il Dipartimento di
                  Neuroscienze e una neurologa che ha ideato gli esercizi
                  clinici.
                </p>
                <p>
                  Inizialmente eravamo convinti che avrebbe avuto breve durata,
                  visti gli insuccessi dei prototipi precedenti. Tuttavia,
                  grazie all'impegno costante e alla dedizione, siamo riusciti a
                  portare a termine lo sviluppo del prodotto.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evoluzione: Le Tre Versioni</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Versione 1 - Il Prototipo
                  </h4>
                  <p>
                    Rappresenta la fondazione del progetto con i primi esercizi
                    e il sistema di raccolta dati.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Versione 2 - Il Redesign UI/UX
                  </h4>
                  <p>
                    Riprogettazione completa dell'interfaccia con un design
                    moderno, accessibile e conforme alle linee guida per
                    applicazioni sanitarie.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Versione 3 - La Modernizzazione
                  </h4>
                  <p>
                    Una vera e propria rivoluzione che migliora manutenibilità,
                    performance e user experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Riconoscimenti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Mnemosine è stato presentato in conferenze scolastiche e
                  cittadine, ricevendo riscontri positivi da pubblico,
                  professionisti del settore sanitario e informatico.
                </p>
                <p>
                  Questo lavoro ha ottenuto il riconoscimento ufficiale con
                  borse di di studio, assegnate come premio per l'impegno,
                  l'originalità e il valore sociale del progetto.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">Il Nostro Team</h2>
          <Card>
            <CardContent className="pt-6 space-y-4 text-muted-foreground">
              <p>
                Mnemosine è il risultato della collaborazione di un team
                interdisciplinare composto da sei ragazzi, tra cui studenti
                delle superiori e professionisti del settore sanitario.
              </p>
              <p>
                Lavoriamo insieme ad una neurologa che ha ideato gli esercizi
                clinici, garantendo valore scientifico e rilevanza medica di
                ogni componente della piattaforma.
              </p>
              <p className="pt-4 border-t">
                <strong>Visione:</strong> Mnemosine non è solo codice, ma un
                mezzo per aiutare le persone. Crediamo che l'informatica debba
                essere messa al servizio della società, e siamo orgogliosi che
                il nostro software possa fare una reale differenza nella vita
                dei pazienti.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
