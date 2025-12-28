'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-4em)] bg-muted/50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">Termini e Condizioni</h1>
          <p className="text-muted-foreground mb-12">
            Ultimo aggiornamento: Dicembre 2025
          </p>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Accettazione dei Termini</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Accedendo e utilizzando la piattaforma Mnemosine, accetti di
                  essere vincolato da questi Termini e Condizioni. Se non
                  accetti questi termini, non utilizzare il Servizio.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Licenza e Utilizzo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Ti concediamo una licenza limitata, non esclusiva e revocabile
                  per accedere e utilizzare la piattaforma Mnemosine per scopi
                  legittimi legati ai servizi sanitari.
                </p>
                <p>
                  Non puoi riprodurre, distribuire, trasmettere, visualizzare,
                  eseguire, copiare, pubblicare, concedere in licenza, creare
                  opere derivate da, trasferire o vendere qualsiasi contenuto
                  ottenuto dal Servizio.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Account Utente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Sei responsabile di mantenere la confidenzialità delle tue
                  credenziali di accesso e di tutte le attività che si
                  verificano con il tuo account. Devi avvisarci immediatamente
                  di qualsiasi uso non autorizzato del tuo account.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Limitazione di Responsabilità</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Mnemosine è fornito "così com'è" senza garanzie di alcun tipo.
                  Non siamo responsabili per danni diretti, indiretti,
                  incidentali, speciali o consequenziali derivanti dall'uso
                  della piattaforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Indennizzo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Accetti di difendere, indennizzare e proteggere Mnemosine da
                  qualsiasi reclamo, danno, perdita o spesa derivante da:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>La tua violazione di questi Termini</li>
                  <li>Il tuo utilizzo del Servizio</li>
                  <li>Violazione dei diritti di terzi</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Contenuto Sanitario - Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  I contenuti e gli esercizi forniti da Mnemosine sono a scopo
                  informativo e di supporto professionale. Non costituiscono una
                  diagnosi medica, una prescrizione o un trattamento medico.
                </p>
                <p>
                  I professionisti sanitari rimangono responsabili di tutte le
                  decisioni cliniche e devono sempre utilizzare il loro giudizio
                  professionale indipendente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Conformità Normativa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  L'utilizzo di Mnemosine deve essere conforme a tutte le leggi
                  e i regolamenti applicabili, incluso il GDPR, il Codice della
                  Privacy e le normative sulla protezione dei dati sanitari.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Modifiche ai Termini</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Potremmo modificare questi Termini in qualsiasi momento.
                  Continuerai a essere vincolato da tali modifiche utilizzando
                  il Servizio dopo la pubblicazione di tali modifiche.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Rescissione</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Possiamo rescindere o sospendere il tuo account e accesso al
                  Servizio immediatamente, senza preavviso, per motivi legittimi
                  inclusa la violazione di questi Termini.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Legge Applicabile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Questi Termini e Condizioni sono disciplinati e interpretati
                  secondo le leggi dell'Italia, indipendentemente dai suoi
                  conflitti di leggi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contattaci</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Se hai domande su questi Termini e Condizioni, contattaci a:
                </p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:legal@mnemosine.com"
                    className="hover:underline"
                  >
                    legal@mnemosine.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
