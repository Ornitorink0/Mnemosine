# Security Policy

## Versioni supportate

| Versione | Supportata         |
| -------- | ------------------ |
| 4.x.x    | :white_check_mark: |
| 3.x.x    | :white_check_mark: |
| < 3.0    | :x:                |

## Segnalazione di una vulnerabilità

Se scopri una vulnerabilità di sicurezza in Mnemosine, ti preghiamo di segnalarla in modo responsabile.

### Come segnalare

1. **Non creare una issue pubblica** per vulnerabilità di sicurezza
2. Invia una email a: <ornitorink0.dev@gmail.com>
3. Includi:
   - Descrizione della vulnerabilità
   - Passi per riprodurla
   - Impatto potenziale
   - Eventuali suggerimenti per la risoluzione

### Riconoscimenti

Apprezziamo chi segnala responsabilmente le vulnerabilità. I contributori alla sicurezza saranno riconosciuti nel changelog (se desiderato).

## Best Practices per gli sviluppatori

1. Non commitare mai segreti, credenziali o chiavi API
2. Usa variabili d'ambiente per dati sensibili
3. Mantieni le dipendenze aggiornate
4. Esegui controlli di sicurezza regolari con `pnpm audit`
