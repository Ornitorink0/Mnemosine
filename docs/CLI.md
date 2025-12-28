# CLI - User Management

La CLI di Mnemosine consente di gestire gli utenti del database direttamente da terminale.

## Installazione

Assicurati che le variabili d'ambiente siano configurate nel file `.env.local`:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## Comandi disponibili

### 1. **Creare un utente**

```bash
pnpm cli -- create
```

Il comando richiederà in modo interattivo:

- **Username**: Nome utente univoco
- **Password**: Password (verrà hashata automaticamente)
- **Ruolo** (opzionale, default: `patient`): `super`, `admin`, o `patient`
- **Note** (opzionale): Appunti o informazioni aggiuntive

**Esempio:**

```bash
$ pnpm cli -- create
✓ Connesso a MongoDB

📝 Creazione nuovo utente

Username: dottore1
Password: ****
Ruolo (super/admin/patient) [default: patient]: admin
Note [opzionale]: Medico generico

✓ Utente creato con successo!
  ID: 507f1f77bcf86cd799439011
  Username: dottore1
  Ruolo: admin
```

### 2. **Eliminare un utente**

```bash
pnpm cli -- delete
```

Il comando richiederà:

- **Username**: Nome utente da eliminare
- **Conferma**: Digitare `s` per confermare l'eliminazione

**Esempio:**

```bash
$ pnpm cli -- delete
✓ Connesso a MongoDB

🗑️  Eliminazione utente

Username da eliminare: dottore1
⚠️  Sei sicuro di voler eliminare "dottore1"? (s/n): s
✓ Utente "dottore1" eliminato con successo
```

### 3. **Elencare tutti gli utenti**

```bash
pnpm cli -- list
```

Mostra una tabella con tutti gli utenti del database.

**Esempio:**

```bash
$ pnpm cli -- list
✓ Connesso a MongoDB

📋 Lista utenti

┌─────────────────┬─────────┬────────────────────────┐
│ Username        │ Ruolo   │ Creato                 │
├─────────────────┼─────────┼────────────────────────┤
│ dottore1        │ admin   │ 07/05/2025, 23:50:43   │
│ paziente1       │ patient │ 06/05/2025, 14:30:12   │
│ admin_main      │ super   │ 01/05/2025, 09:15:00   │
└─────────────────┴─────────┴────────────────────────┘

Totale: 3 utenti
```

## Note di sicurezza

⚠️ **La password viene hashata automaticamente** usando bcryptjs prima di essere salvata nel database.

⚠️ **Eliminazione irreversibile**: L'eliminazione di un utente è permanente e non può essere annullata.

⚠️ **Devi avere accesso** alle variabili d'ambiente corrette per connetterti al database.

## Troubleshooting

### "MONGODB_URI non configurato"

Assicurati che il file `.env.local` sia presente nella root del progetto e contenga:

```bash
MONGODB_URI=your-mongodb-connection-string
```

### "L'utente esiste già"

Usa `pnpm cli -- delete` per rimuovere l'utente, oppure scegli un username diverso.

### "Errore di connessione a MongoDB"

Verifica che:

1. Il tuo cluster MongoDB sia accessibile
2. La connessione string sia corretta
3. Tu abbia connessione internet
