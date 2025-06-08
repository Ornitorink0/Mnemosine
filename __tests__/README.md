# **\_\_tests\_\_**

Questa cartella contiene i test automatici, che sono essenziali per garantire che le funzionalità dell'applicazione funzionino correttamente e per prevenire regressioni durante lo sviluppo.

Sono presenti test unitari per le singole funzioni e componenti dell'applicazione. Questi test verificano che ogni unità di codice funzioni come previsto in isolamento.

## Esecuzione dei Test

Per eseguire i test, assicurati che tutte le dipendenze siano installate e che l'ambiente di sviluppo sia correttamente configurato. Poi, esegui il seguente comando:

```bash
npm test
```

## Aggiunta di Nuovi Test

Quando aggiungi nuove funzionalità o apporti modifiche significative al codice esistente, è importante anche aggiungere o aggiornare i test per coprire le nuove modifiche. Assicurati che:

- Ogni nuova funzionalità abbia test che coprano i casi d'uso principali.
- Ogni bug risolto abbia test che impediscano regressioni future.

> Non è necessario fare test per ogni singolo componente, ma è importante che ogni funzione logica passi correttamente i test

## Strumenti Utilizzati

Utilizziamo **Jest** per i nostri test unitari. Assicurati di familiarizzare con questi strumenti per contribuire efficacemente allo sviluppo dei test.

Alcune risorse utili:

- [Testing: Jest | Next.js](https://nextjs.org/docs/app/guides/testing/jest)
