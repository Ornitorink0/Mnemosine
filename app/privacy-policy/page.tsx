'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-4em)] bg-muted/50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">Informativa sulla Privacy</h1>
          <p className="text-muted-foreground mb-12">
            Ultimo aggiornamento: Dicembre 2025
          </p>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Introduzione</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Mnemosine ("noi", "nostro" o "nostra") gestisce la piattaforma
                  Mnemosine (il "Servizio").
                </p>
                <p>
                  Questa pagina ti informa delle nostre politiche in materia di
                  raccolta, utilizzo e divulgazione dei dati personali quando usi
                  il nostro Servizio e delle scelte che hai a proposito di tali
                  dati.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Raccolta e Utilizzo dei Dati</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Raccogliamo diversi tipi di informazioni per vari scopi al fine
                  di fornirvi e migliorare il nostro Servizio.
                </p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Tipi di dati raccolti:
                  </h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Dati di contatto (nome, indirizzo email, numero di telefono)</li>
                    <li>Dati di profilo (ruolo professionale, specializzazione medica)</li>
                    <li>Dati di utilizzo (pagine visitate, funzioni utilizzate, orari di accesso)</li>
                    <li>Dati sanitari (risultati dei test cognitivi) - trattati con massima confidenzialità</li>
                    <li>Dati tecnici (indirizzo IP, tipo di browser, sistema operativo)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Base Giuridica per il Trattamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Trattiamo i dati personali sulla base del tuo consenso, per
                  l'esecuzione di un contratto, per il rispetto di obblighi legali
                  o per i nostri interessi legittimi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Sicurezza dei Dati</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  La sicurezza dei tuoi dati è importante per noi ma ricorda che
                  nessun metodo di trasmissione via Internet è sicuro al 100%.
                  Mentre ci sforziamo di proteggere i tuoi dati personali con
                  misure di sicurezza appropriate, non possiamo garantire la
                  sicurezza assoluta.
                </p>
                <p>
                  Utilizziamo crittografia TLS per proteggere i dati in transito
                  e autenticazione multi-fattore per proteggere gli account.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Conservazione dei Dati</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Conserveremo i tuoi dati personali per il tempo necessario per
                  fornire il Servizio e per il tempo previsto dalla legge
                  applicabile.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. I Tuoi Diritti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Hai il diritto di accedere, correggere, cancellare o
                  esportare i tuoi dati personali. Per esercitare questi diritti,
                  contattaci all'indirizzo email di supporto.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Modifiche a Questa Informativa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Potremmo aggiornare questa Informativa sulla Privacy di tanto
                  in tanto. Ti comunicheremo qualsiasi modifica pubblicando la
                  nuova Informativa sulla Privacy su questa pagina.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contattaci</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Se hai domande su questa Informativa sulla Privacy, contattaci
                  a:
                </p>
                <p>
                  Email:{' '}
                  <a href="mailto:privacy@mnemosine.com" className="hover:underline">
                    privacy@mnemosine.com
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
