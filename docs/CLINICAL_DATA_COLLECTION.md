# Sistema di Raccolta Dati Clinici - Mnemosine

## Panoramica delle Modifiche

Questo documento descrive le implementazioni per trasformare Mnemosine in uno strumento medico professionale per la raccolta intensiva di dati sui movimenti e progressi cognitivi dei pazienti.

## 1. Salvataggio Automatico dei Risultati

### API: `/api/sessions/[id]/update`

- **Metodo**: PATCH
- **Funzione**: Salva i risultati di ogni esercizio completato in tempo reale
- **Dati raccolti per ogni esercizio**:
  - `timeSpent`: Tempo impiegato in secondi
  - `nErrors`: Numero di errori commessi
  - `score`: Punteggio percentuale (0-100)
  - `completedAt`: Timestamp esatto di completamento
  - `metadata`: Oggetto con dati estesi per analisi clinica

### Metadata Raccolti

```typescript
{
  completedTimestamp: string; // ISO timestamp preciso
  accuracyRate: number; // Tasso di accuratezza (0-1)
  errorRate: number; // Numero di errori
  timeSpentSeconds: number; // Tempo in secondi
  timeSpentMinutes: string; // Tempo in minuti (formattato)
  userAgent: string; // Info dispositivo utilizzato
  difficulty: string; // Livello di difficoltà
  exerciseId: string; // ID dell'esercizio
  // + metadata specifici per ogni tipo di esercizio
}
```

### SessionStepper

- Aggiornato per chiamare l'API dopo ogni esercizio completato
- Salva automaticamente lo stato della sessione
- Aggiorna lo status: `pending` → `in-progress` → `completed`
- Registra `startedOn` e `completedOn` automaticamente

## 2. Rimozione Sessioni Completate dalla Home

### Modifiche a `/app/page.tsx`

- Filtra automaticamente le sessioni per mostrare solo quelle attive
- Visualizza solo sessioni con status: `pending` o `in-progress`
- Le sessioni completate vengono rimosse dalla vista del paziente
- Il paziente vede solo le sessioni che deve ancora completare

## 3. Dashboard Medica - Visualizzazione Risultati

### Pagina: `/dashboard/view-results`

**Funzionalità esistenti migliorate**:

- Filtri per paziente e stato sessione
- Statistiche aggregate (punteggio medio, errori, tempo)
- Visualizzazione dettagliata di ogni sessione completata
- Link cliccabile sul nome del paziente per accedere ai dettagli

### Nuova Pagina: `/dashboard/patient-detail/[id]`

**Analisi clinica approfondita per singolo paziente**:

#### Tab "Sessioni"

- Lista completa di tutte le sessioni completate
- Dettagli di ogni esercizio svolto
- Punteggi, errori e tempi per ogni esercizio

#### Tab "Per Difficoltà"

- Statistiche aggregate per livello (facile/medio/difficile)
- Punteggio medio per difficoltà
- Errori medi per difficoltà
- Numero totale di esercizi per livello

#### Tab "Per Esercizio"

- Analisi per tipo di esercizio
- Performance medie su ogni esercizio
- Frequenza di esecuzione
- Tempo totale dedicato a ogni tipo

#### Tab "Dati Clinici"

**Sezione dedicata per valutazione medica**:

- Note cliniche del paziente
- Analisi temporale (ore totali di esercizio)
- Indicatori di performance con barre visuali
- **Trend cognitivo**:
  - In miglioramento (compare punteggi recenti vs vecchi)
  - In calo
  - Stabile
- Descrizione dei metadata raccolti
- Conteggio totale dei data points disponibili

## 4. Modello Dati Esteso

### Session Model (`models/Session.ts`)

- Aggiunta tipizzazione estesa per `metadata`
- Supporto per dati clinici intensivi
- Schema flessibile per metadata specifici per esercizio

### API Aggiuntiva: `/api/sessions/[id]` (GET)

- Recupera i dettagli di una sessione
- Aggiorna automaticamente lo status a `in-progress` quando aperta
- Registra `startedOn` al primo accesso

## 5. Dati Clinici Raccolti

### Per Ogni Esercizio

1. **Performance**:
   - Score percentuale
   - Numero errori
   - Accuratezza

2. **Temporali**:
   - Tempo totale impiegato
   - Timestamp preciso di completamento
   - Data e ora di inizio/fine

3. **Contestuali**:
   - Dispositivo utilizzato
   - Livello di difficoltà
   - Tipo di esercizio

4. **Specifici per esercizio**:
   - Dipendono dal tipo di esercizio
   - Salvati in `metadata`

### Per Ogni Sessione

1. **Aggregati**:
   - Errori totali
   - Durata totale
   - Punteggio medio

2. **Stato**:
   - Status (pending/in-progress/completed)
   - Data assegnazione
   - Data inizio
   - Data completamento

### Per Ogni Paziente

1. **Performance generali**:
   - Punteggio medio globale
   - Trend nel tempo
   - Tasso di completamento

2. **Analisi comparative**:
   - Per difficoltà
   - Per tipo di esercizio
   - Progressi temporali

## 6. Utilizzo per Scopi Clinici

### Accessibilità Dati

- Tutti i dati sono accessibili via API REST
- Database MongoDB con schema strutturato
- Facile esportazione per analisi esterne

### Indicatori Clinici

1. **Trend cognitivo**: Confronto performance recenti vs passate
2. **Consistenza**: Variabilità nei punteggi
3. **Difficoltà**: Performance per livello di complessità
4. **Tipologia**: Aree cognitive più/meno sviluppate
5. **Engagement**: Tasso di completamento sessioni

### Report Medici

- Dashboard visuale con grafici e statistiche
- Dati esportabili per documentazione clinica
- Tracciamento longitudinale dei progressi
- Confronto pre/post trattamento

## 7. Privacy e Sicurezza

- Autenticazione richiesta per accesso dati
- Solo medici/admin possono vedere risultati pazienti
- Pazienti vedono solo le proprie sessioni attive
- Log completi delle attività per audit

## Conclusione

Il sistema ora raccoglie dati intensivi e strutturati per ogni interazione del paziente, permettendo:

- Valutazione clinica oggettiva
- Monitoraggio progressi nel tempo
- Identificazione aree di miglioramento
- Personalizzazione interventi terapeutici
- Documentazione per ricerca clinica

Tutti i dati sono timestampati, strutturati e immediatamente disponibili per analisi medica professionale.
