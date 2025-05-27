export default function Exercise105() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Caricamento della sessione...</h1>
      <p>La somma di 1 + 3?</p>
      <input
        type="text"
        className="border p-2 rounded w-full mt-2"
        placeholder="Inserisci la risposta"
        autoFocus
      />
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Invia
      </button>
    </div>
  );
}
