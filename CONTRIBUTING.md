# Contribuire a Mnemosine

Grazie per il tuo interesse nel contribuire a Mnemosine! 🎉

## Codice di condotta

Partecipando a questo progetto, ti impegni a mantenere un ambiente rispettoso e inclusivo per tutti.

## Come contribuire

### Segnalare bug

1. Verifica che il bug non sia già stato segnalato nelle [Issues](https://github.com/Ornitorink0/Mnemosine/issues)
2. Se non esiste, crea una nuova issue usando il template "Bug Report"
3. Includi quanti più dettagli possibile

### Suggerire nuove funzionalità

1. Controlla le [Issues](https://github.com/Ornitorink0/Mnemosine/issues) esistenti
2. Apri una nuova issue usando il template "Feature Request"
3. Descrivi chiaramente la funzionalità e il suo valore

### Inviare modifiche

1. **Fork** il repository
2. **Crea un branch** dal `develop`:
   ```bash
   git checkout -b feature/nome-funzionalità
   # oppure
   git checkout -b fix/nome-bug
   ```
3. **Installa le dipendenze**:
   ```bash
   pnpm install
   ```
4. **Sviluppa** le tue modifiche
5. **Testa** le modifiche localmente:
   ```bash
   pnpm dev
   pnpm lint
   pnpm build
   ```
6. **Commit** con messaggi chiari:
   ```bash
   git commit -m "feat: aggiungi nuova funzionalità X"
   ```
7. **Push** al tuo fork:
   ```bash
   git push origin feature/nome-funzionalità
   ```
8. **Apri una Pull Request** verso `develop`

## Convenzioni

### Commit Messages

Seguiamo [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nuova funzionalità
- `fix:` - Correzione bug
- `docs:` - Solo documentazione
- `style:` - Formattazione (non cambia la logica)
- `refactor:` - Refactoring del codice
- `perf:` - Miglioramenti delle performance
- `test:` - Aggiunta o modifica test
- `chore:` - Manutenzione, aggiornamento dipendenze

### Stile del codice

- Usa **TypeScript** per tutti i file
- Segui la configurazione ESLint del progetto
- Formatta con Prettier: `pnpm format`
- Usa componenti funzionali React
- Preferisci `const` a `let`

### Struttura dei file

```
app/           # Next.js App Router pages
components/    # Componenti React riutilizzabili
lib/           # Utility e configurazioni
models/        # Schemi Mongoose
types/         # Tipi TypeScript
utils/         # Funzioni helper
```

## Sviluppo locale

### Prerequisiti

- Node.js 20+
- pnpm 10+
- MongoDB (locale o Atlas)

### Setup

```bash
# Clona il repository
git clone https://github.com/Ornitorink0/mnemosine.git
cd mnemosine

# Installa le dipendenze
pnpm install

# Copia le variabili d'ambiente
cp .env.example .env

# Configura le variabili in .env
# MONGODB_URI=...
# NEXTAUTH_SECRET=...

# Avvia il server di sviluppo
pnpm dev
```

### Script disponibili

| Comando       | Descrizione                     |
| ------------- | ------------------------------- |
| `pnpm dev`    | Avvia il server di sviluppo     |
| `pnpm build`  | Crea la build di produzione     |
| `pnpm start`  | Avvia la build di produzione    |
| `pnpm lint`   | Esegue il linter                |
| `pnpm format` | Formatta il codice con Prettier |

## Domande?

Se hai domande, apri una [Discussion](https://github.com/Ornitorink0/mnemosine/discussions) o contattaci nelle issue.

Grazie per il tuo contributo! 💙
