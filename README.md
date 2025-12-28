# Mnemosine

**Mnemosine** è un'applicazione web sviluppata per supportare la diagnosi e il monitoraggio dei pazienti affetti dal morbo di Alzheimer. Questo progetto è stato creato utilizzando [NextJS (TS)](https://nextjs.org), [ShadcnUI](https://ui.shadcn.com/), [TailwindCSS](https://tailwindcss.com/) e [MongoDB](https://www.mongodb.com/).

È pensato come strumento diagnostico e interattivo, accessibile da browser, che consente ai pazienti di svolgere esercizi mirati come associazioni logiche, cifrari, test di attenzione e altro ancora. Ogni esercizio è progettato per raccogliere dati significativi sulle capacità cognitive dell’utente, tra cui:

- **tempo impiegato per completare un’attività**
- **numero e tipo di errori commessi**
- **percorsi logici scelti per la risoluzione**
- **e altri in corso di sviluppo**

Questi dati vengono registrati sul database **MongoDB**, per poi essere elaborati e visualizzati in una dashboard riservata ai medici e caregiver, che potranno analizzare l’andamento dei pazienti nel tempo.

La web app prevede un sistema di login protetto, inizialmente basato su Auth0 e successivamente sostituito con un sistema di autenticazione **NextAuth** con username e password, pensato per l’anonimato e per essere facilmente gestibile anche in ambienti sanitari con risorse limitate.

> Questo repository è una migrazione del progetto originale sviluppato in Angular, ora completamente riscritto in NextJS con TypeScript, per sfruttare le potenzialità di React e migliorare l'esperienza utente.

## Sviluppo

Per avviare lo sviluppo di questo progetto, è necessario seguire alcuni passaggi fondamentali. Il progetto è organizzato in modo da facilitare la collaborazione e la gestione del codice, utilizzando le migliori pratiche di sviluppo web.

Per lavorare su questo progetto, è sufficiente utilizzare un IDE (Ambiente di Sviluppo Integrato) come `Visual Studio Code` (altamente consigliato) o `Atom`.

> Il progetto include un file `.gitignore`, che impedisce di aggiungere file non necessari al repository, incluso `.env`, mantenendo il progetto snello e facile da gestire.

### Prerequisiti

Prima di iniziare, assicurati che sul tuo computer siano installati i seguenti strumenti:

1. [Node.js](https://nodejs.org) (versione LTS consigliata)
2. [pnpm](https://www.npmjs.com) (il gestore di pacchetti di Node.js)
3. [Git](https://git-scm.com) per sincronizzare il progetto con il repository remoto su GitHub.

### Clonare il Progetto

Per scaricare il progetto sul tuo computer, apri il terminale e esegui il seguente comando:

```bash
git https://github.com/Ornitorink0/Mnemosine.git
# oppure
gh repo clone Ornitorink0/Mnemosine
```

Successivamente, entra nella cartella del progetto:

```bash
cd MnemosineFE
```

### Configurare .env

Per configurare il file `.env`, copia il file `.env.example` nella cartella del progetto e modificalo secondo le esigenze del progetto.

### Installare le Dipendenze

Una volta scaricato il progetto, esegui il comando seguente per installare tutte le dipendenze necessarie:

```bash
pnpm install
```

### Avviare il Server di Sviluppo

Per avviare l'applicazione in modalità sviluppo, esegui:

```bash
pnpm dev
```

Il server di sviluppo sarà avviato e l'applicazione sarà accessibile all'indirizzo: [http://localhost:3000](http://localhost:3000).

Se il server non si avvia correttamente, assicurati di aver installato tutte le dipendenze e che non ci siano errori nel codice.

### Struttura del Progetto

La struttura delle cartelle del progetto è la seguente:

```plaintext
MnemosineFE/
├── app/         # Entry point dell'applicazione Next.js (pagine e routing)
├── components/  # Componenti riutilizzabili dell'interfaccia utente
├── docs/        # Documentazione aggiuntiva del progetto
├── lib/         # Funzioni di utilità e librerie condivise
├── models/      # Definizioni dei modelli dati (es. schemi MongoDB)
├── public/      # File statici accessibili pubblicamente (immagini, favicon, ecc.)
├── tests/       # Test automatici (unitari, E2E, ecc.)
├── types/       # Tipizzazioni TypeScript personalizzate
└── utils/       # Funzioni di utilità generiche
...               # File di configurazione
```

Questa organizzazione facilita la manutenzione e la scalabilità del progetto.

### Costruire il Progetto (Amministratore)

Per creare una versione ottimizzata del progetto per la produzione, esegui:

```bash
pnpm build
```

I file compilati saranno salvati nella cartella `dist/`.

> Non è necessario eseguire questo passaggio per il progetto in sviluppo, in quanto il provider di hosting si occupa di compilarlo automaticamente, ma è utile per eseguire test di compilazione.

## Linee Guida per gli Asset

1. **Lessico e Immagini**: Le parole e le immagini vengono create internamente per garantire coerenza.
2. **Caratteristiche**: Evitiamo l'uso di foto, preferendo illustrazioni.
3. **Tematiche**: Le illustrazioni si concentrano su scene di vita quotidiana, animali e elementi naturali.
4. **Lunghezza delle Parole**: Preferiamo parole di più o meno 5 caratteri per facilitare la lettura.

### Configurazioni Aggiuntive

- **Formattazione**: Per formattare automaticamente il codice, puoi utilizzare lo shortcut di `Ctrl+Shift+F` (Windows), `Cmd+Shift+F` (macOS) o `Ctrl+Shift+I` (Linux). È richiesto un codice pulito e leggibile. Puoi eseguire la formattazione dell'intero progetto con il comando: `pnpm format`.
- **Linting**: Utilizza `ESLint` per mantenere il codice conforme agli standard di qualità. Puoi eseguire il linting con il comando: `pnpm lint`.

## Licenza

Questo progetto è concesso in licenza sotto la Licenza MIT. Puoi utilizzare, modificare e distribuire il codice, a condizione che venga mantenuto il copyright e la dichiarazione di licenza nelle copie del software o nelle versioni modificate.

Consulta [LICENSE](LICENSE.txt) per maggiori informazioni.

## Contribuire

Questo progetto è aperto ai membri **SobreWeb dell'IS A. Sobrero di Casale Monferrato (AL)**, in collaborazione con il **Dipartimento di neuroscienze dell'Università di Torino (UNITO)**.

> Per favore, assicurati di seguire le linee guida di codifica del progetto e di rispettare sempre il codice etico e le linee guida interne al team.

### Linee guida per il Contributo

- Segui le convenzioni di codifica del progetto.
- Assicurati che il codice sia ben documentato e comprensibile.
- Prima di fare una pull request, assicurati di formattare e di lintare il codice. Inoltre, assicurati che tutte le modifiche siano testate e funzionanti.

> ! È necessario che un altro membro del gruppo SobreWeb verifichi le exploits e vulnerabilità nel codice prima di pubblicare una pull request (verifica assegnazioni delle pull).

Se non fai parte del gruppo SobreWeb, puoi comunque contribuire al progetto con idee, suggerimenti o miglioramenti al codice front-end. Tuttavia, non è consentito modificare dati, contatti o informazioni sensibili relativi al gruppo o all’istituto. L’accesso al database è riservato esclusivamente ai membri autorizzati: i collaboratori esterni potranno interagire solo con la parte front-end dell’applicazione.

Ti ringraziamo per l'interesse!

## Contatti

Per ulteriori informazioni o domande sul progetto, puoi contattare il team di sviluppo:

- **Email**: [Ornitorink0 (Owner)](mailto:ornitorink0@gmail.com)

Per segnalazioni di bug o richieste di funzionalità, puoi [aprire un issue direttamente su GitHub](https://github.com/Ornitorink0/MnemosineFE/issues).
