/**
 * Registry centralizzato degli esercizi disponibili in Mnemosine
 *
 * Categorie:
 * - 1xx: Memoria
 * - 2xx: Attenzione
 * - 3xx: Funzioni Esecutive
 * - 4xx: Linguaggio
 * - 5xx: Abilità Visuo-spaziali
 */

import type { IExerciseDefinition, ExerciseCategory } from '@/types';

const exercises: IExerciseDefinition[] = [
  // ============================================================================
  // 1xx - MEMORIA
  // ============================================================================
  {
    id: 101,
    code: '101',
    name: 'Memorizza la lista di parole',
    description:
      'Memorizza il maggior numero di parole della lista e trascrivi gli elementi memorizzati',
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
    instructions:
      'Osserva attentamente le parole che appariranno sullo schermo. Dopo la fase di memorizzazione, trascrivi tutte le parole che ricordi.',
  },
  {
    id: 102,
    code: '102',
    name: 'Trova le coppie',
    description:
      'Memorizza la dislocazione di coppie di stimoli uguali appartenenti alla categoria della frutta',
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 103,
    code: '103',
    name: 'Span numerico',
    description: 'Memorizza e digita la corretta sequenza di numeri',
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 3,
  },
  {
    id: 104,
    code: '104',
    name: 'Span di lettere',
    description: 'Memorizza e digita la corretta sequenza di lettere',
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 3,
  },
  {
    id: 105,
    code: '105',
    name: "Ricorda l'immagine",
    description: "Memorizza l'immagine complessa e rispondi alle domande",
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 7,
  },
  {
    id: 106,
    code: '106',
    name: 'Ricorda il percorso',
    description:
      'Memorizza il percorso di luci e ripeti la sequenza cliccando sulle caselle',
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 107,
    code: '107',
    name: 'Trova la parola mancante',
    description:
      'Ascolta due liste di parole e trova la parola che non è stata nominata nella seconda lista',
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 108,
    code: '108',
    name: 'Span numerico inverso',
    description:
      "Memorizza e digita la corretta sequenza di numeri nell'ordine inverso rispetto a quello presentato",
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 109,
    code: '109',
    name: 'Span alfabetico inverso',
    description:
      "Memorizza e digita la corretta sequenza di lettere nell'ordine inverso rispetto a quello presentato",
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 110,
    code: '110',
    name: 'Ricorda le città',
    description:
      'Memorizza i nomi delle città che scorrono sullo schermo e alla fine seleziona quelle che hai visto',
    category: 'memory',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },

  // ============================================================================
  // 2xx - ATTENZIONE
  // ============================================================================
  {
    id: 201,
    code: '201',
    name: 'Barrage',
    description: 'Identifica sullo schermo gli stimoli target da selezionare',
    category: 'attention',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 202,
    code: '202',
    name: 'Unisci i punti numerici',
    description: 'Unisci i punti numerati in ordine crescente',
    category: 'attention',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 203,
    code: '203',
    name: 'Unisci i punti alfanumerici',
    description: 'Unisci i punti numerici alternandoli a quelli alfabetici',
    category: 'attention',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 204,
    code: '204',
    name: 'Ricerca visiva',
    description: 'Tocca sullo schermo lo stimolo target da trovare',
    category: 'attention',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 205,
    code: '205',
    name: 'Trova la differenza',
    description:
      'Trova le differenze tra due immagini apparentemente identiche',
    category: 'attention',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 206,
    code: '206',
    name: 'Rilevazione visiva',
    description:
      'Osserva una serie di immagini scorrere sullo schermo. Premi la barra spaziatrice ogni volta che appare lo stimolo target',
    category: 'attention',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 207,
    code: '207',
    name: 'Ascolto selettivo',
    description:
      'Ascolta il brano e premi la barra spaziatrice ogni volta che sarà pronunciata la parola target',
    category: 'attention',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 208,
    code: '208',
    name: 'Attenzione alternata',
    description:
      'Somma se i numeri sono scritti in blu, sottrai se sono scritti in rosso. Seleziona poi il risultato corretto',
    category: 'attention',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 209,
    code: '209',
    name: 'Tempi di reazione',
    description:
      "Premi la barra spaziatrice ogni volta che appare un'immagine o senti un numero",
    category: 'attention',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 3,
  },

  // ============================================================================
  // 3xx - FUNZIONI ESECUTIVE
  // ============================================================================
  {
    id: 301,
    code: '301',
    name: 'Ordina i numeri in ordine crescente',
    description:
      'Metti in ordine i numeri dal più piccolo al più grande digitando sullo schermo',
    category: 'executive',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 302,
    code: '302',
    name: 'Ordina i numeri in ordine decrescente',
    description:
      'Metti in ordine i numeri dal più grande al più piccolo sullo schermo',
    category: 'executive',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 303,
    code: '303',
    name: 'Ordina le parole in ordine alfabetico',
    description: 'Osserva la lista e metti in ordine alfabetico le parole',
    category: 'executive',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 304,
    code: '304',
    name: 'Completa la sequenza',
    description:
      'Osserva la sequenza numerica / alfabetica / di figure e completa',
    category: 'executive',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 305,
    code: '305',
    name: 'Trova la soluzione',
    description:
      'Trova la soluzione, tra le alternative date, per risolvere il problema',
    category: 'executive',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 6,
  },
  {
    id: 306,
    code: '306',
    name: 'Domino',
    description:
      'Completa la serie logica scegliendo tra le alternative la tessera domino esatta',
    category: 'executive',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 307,
    code: '307',
    name: 'Alternanza di operazioni',
    description: 'Somma i numeri pari e sottrai i numeri dispari in sequenza',
    category: 'executive',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 308,
    code: '308',
    name: 'Calcoli veloci',
    description: 'Risolvi le operazioni scegliendo la risposta corretta',
    category: 'executive',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 309,
    code: '309',
    name: 'Cambia la regola',
    description:
      "Risolvi il compito scegliendo l'indicazione. Dopo un certo numero di risposte la regola cambia",
    category: 'executive',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 6,
  },

  // ============================================================================
  // 4xx - LINGUAGGIO
  // ============================================================================
  {
    id: 401,
    code: '401',
    name: 'Anagramma',
    description: 'Riordina le lettere e scrivi la parola corretta',
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 402,
    code: '402',
    name: 'Completa la parola ascoltata',
    description: 'Ascolta la parola e digita le lettere mancanti',
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 403,
    code: '403',
    name: 'Come si chiama?',
    description: "Osserva l'immagine e denomina l'oggetto",
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 3,
  },
  {
    id: 404,
    code: '404',
    name: 'Fluenza semantica',
    description: 'Distribuisci le immagini nella categoria di appartenenza',
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 405,
    code: '405',
    name: 'Fluenza fonemica',
    description:
      'Elenca il maggior numero di parole che iniziano per la lettera indicata',
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 406,
    code: '406',
    name: 'Completa le frasi',
    description: 'Inserisci la parola mancante e completa le frasi',
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 407,
    code: '407',
    name: 'Trova il sinonimo',
    description: 'Scegli il sinonimo corretto tra le opzioni presentate',
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 3,
  },
  {
    id: 408,
    code: '408',
    name: 'Trova il contrario',
    description: 'Scegli il contrario corretto tra le opzioni presentate',
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 3,
  },
  {
    id: 409,
    code: '409',
    name: 'Associazione di parole',
    description: 'Seleziona tutte le parole associate alla parola target',
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 410,
    code: '410',
    name: 'Completa il dialogo',
    description: 'Leggi il dialogo e inserisci le parole mancanti',
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },

  // ============================================================================
  // 5xx - ABILITÀ VISUO-SPAZIALI
  // ============================================================================
  {
    id: 501,
    code: '501',
    name: 'Copia il disegno',
    description: 'Ricopia la figura presentata',
    category: 'visuospatial',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 502,
    code: '502',
    name: 'Associa il dettaglio',
    description: 'Associa il dettaglio alla figura corrispondente',
    category: 'visuospatial',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 503,
    code: '503',
    name: 'Unisci i punti e completa la figura',
    description:
      'Unisci i punti della figura di destra come mostrato nella figura a sinistra',
    category: 'visuospatial',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 504,
    code: '504',
    name: 'Puzzle',
    description: "Ricostruisci l'immagine mettendo insieme i pezzi del puzzle",
    category: 'visuospatial',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 6,
  },
  {
    id: 505,
    code: '505',
    name: 'Identifica la forma corretta',
    description:
      'Completa la figura selezionando la parte corretta tra le alternative',
    category: 'visuospatial',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 506,
    code: '506',
    name: 'Sequenza di immagini',
    description: "Seleziona le immagini mostrate nell'ordine corretto",
    category: 'visuospatial',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 507,
    code: '507',
    name: 'Traccia il percorso',
    description:
      "Traccia il percorso per arrivare all'obiettivo finale senza uscire dai confini",
    category: 'visuospatial',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 5,
  },
  {
    id: 508,
    code: '508',
    name: 'Individua la prospettiva',
    description: 'Individua la prospettiva di una figura tra quelle presentate',
    category: 'visuospatial',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
  {
    id: 509,
    code: '509',
    name: 'Riconosci la sagoma',
    description:
      "Osserva la sagoma e individua l'immagine piena corrispondente o scegli tra le alternative scritte",
    category: 'visuospatial',
    difficulty: ['easy', 'medium', 'hard'],
    estimatedDuration: 4,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Ottieni tutti gli esercizi disponibili
 */
export const getExercises = (): IExerciseDefinition[] => exercises;

/**
 * Ottieni un esercizio per ID
 */
export const getExerciseById = (id: number): IExerciseDefinition | undefined =>
  exercises.find((ex) => ex.id === id);

/**
 * Ottieni un esercizio per codice
 */
export const getExerciseByCode = (
  code: string
): IExerciseDefinition | undefined => exercises.find((ex) => ex.code === code);

/**
 * Ottieni esercizi per categoria
 */
export const getExercisesByCategory = (
  category: ExerciseCategory
): IExerciseDefinition[] => exercises.filter((ex) => ex.category === category);

/**
 * Mappa delle categorie con nomi italiani
 */
export const categoryLabels: Record<ExerciseCategory, string> = {
  memory: 'Memoria',
  attention: 'Attenzione',
  executive: 'Funzioni Esecutive',
  language: 'Linguaggio',
  visuospatial: 'Abilità Visuo-spaziali',
};

/**
 * Mappa delle difficoltà con nomi italiani
 */
export const difficultyLabels = {
  easy: 'Facile',
  medium: 'Intermedio',
  hard: 'Difficile',
} as const;

/**
 * Verifica se un esercizio ha un componente implementato
 */
export const hasImplementedComponent = (id: number): boolean => {
  const implementedExercises = [101]; // Lista degli esercizi implementati
  return implementedExercises.includes(id);
};

// Export di default per retrocompatibilità
export default exercises;
