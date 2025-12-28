#!/usr/bin/env tsx
/**
 * CLI per gestire gli utenti nel database di Mnemosine
 * Uso:
 *   pnpm run cli -- create
 *   pnpm run cli -- delete
 *   pnpm run cli -- list
 */

import dotenv from 'dotenv';
import path from 'path';
import readline from 'readline';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import User from '@/models/User';

// Carica le variabili d'ambiente dal file .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
};

async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI non configurato in .env.local');
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log('✓ Connesso a MongoDB');
  } catch (error) {
    console.error('❌ Errore di connessione:', error);
    process.exit(1);
  }
}

async function createUser() {
  console.log('\n📝 Creazione nuovo utente\n');

  try {
    const username = await question('Username: ');
    const password = await question('Password: ');
    const role =
      (await question('Ruolo (super/admin/patient) [default: patient]: ')) ||
      'patient';
    const notes = (await question('Note [opzionale]: ')) || '';

    // Validazione
    if (!username || !password) {
      console.error('❌ Username e password sono obbligatori');
      return;
    }

    if (!['super', 'admin', 'patient'].includes(role)) {
      console.error('❌ Ruolo non valido. Usa: super, admin, patient');
      return;
    }

    // Verifica se l'utente esiste
    const existing = await User.findOne({ username });
    if (existing) {
      console.error(`❌ L'utente "${username}" esiste già`);
      return;
    }

    // Hash della password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Crea l'utente
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
      notes,
      sessionIds: [],
    });

    console.log('\n✓ Utente creato con successo!');
    console.log(`  ID: ${newUser._id}`);
    console.log(`  Username: ${newUser.username}`);
    console.log(`  Ruolo: ${newUser.role}`);
  } catch (error) {
    console.error('❌ Errore durante la creazione:', error);
  }
}

async function deleteUser() {
  console.log('\n🗑️  Eliminazione utente\n');

  try {
    const username = await question('Username da eliminare: ');

    if (!username) {
      console.error('❌ Username è obbligatorio');
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      console.error(`❌ L'utente "${username}" non esiste`);
      return;
    }

    // Conferma
    const confirm = await question(
      `⚠️  Sei sicuro di voler eliminare "${username}"? (s/n): `
    );
    if (confirm.toLowerCase() !== 's') {
      console.log('❌ Operazione annullata');
      return;
    }

    await User.deleteOne({ username });
    console.log(`✓ Utente "${username}" eliminato con successo`);
  } catch (error) {
    console.error("❌ Errore durante l'eliminazione:", error);
  }
}

async function listUsers() {
  console.log('\n📋 Lista utenti\n');

  try {
    const users = await User.find().select('username role createdAt');

    if (users.length === 0) {
      console.log('Nessun utente nel database');
      return;
    }

    console.log('┌─────────────────┬─────────┬────────────────────────┐');
    console.log('│ Username        │ Ruolo   │ Creato                 │');
    console.log('├─────────────────┼─────────┼────────────────────────┤');

    for (const user of users) {
      const createdAt = new Date(user.createdAt).toLocaleString('it-IT');
      const username = String(user.username).padEnd(15);
      const role = String(user.role).padEnd(7);
      console.log(`│ ${username} │ ${role} │ ${createdAt} │`);
    }

    console.log('└─────────────────┴─────────┴────────────────────────┘');
    console.log(
      `\nTotale: ${users.length} utente${users.length !== 1 ? 'i' : ''}`
    );
  } catch (error) {
    console.error('❌ Errore durante la lettura:', error);
  }
}

async function main() {
  await connectDB();

  // Filtra gli argomenti per trovare il comando
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
  const command = args[0];

  switch (command) {
    case 'create':
      await createUser();
      break;
    case 'delete':
      await deleteUser();
      break;
    case 'list':
      await listUsers();
      break;
    default:
      console.log(`
╔════════════════════════════════════════════╗
║  Mnemosine - User Management CLI          ║
╚════════════════════════════════════════════╝

Comandi disponibili:
  pnpm run cli -- create    Crea un nuovo utente
  pnpm run cli -- delete    Elimina un utente
  pnpm run cli -- list      Elenca tutti gli utenti

Esempi:
  pnpm run cli -- create
  pnpm run cli -- delete
      `);
  }

  rl.close();
  await mongoose.connection.close();
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Errore:', error);
  process.exit(1);
});
