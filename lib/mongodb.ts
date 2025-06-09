/**
 * @file        lib/mongodb.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-04-05
 * @updated     2025-06-08
 * @license     MIT
 * @version     0.1.0
 * @brief       Comunicazione con MongoDB
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/lib/mongodb.ts
 */

import mongoose from 'mongoose';

export const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MnemosineBE: MongoDB connesso');
  } catch (err) {
    console.error('MnemosineBE: Connessione fallita:', err);
  }
};

export const disconnectFromDB = async () => {
  if (mongoose.connection.readyState === 0) return;
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnesso');
  } catch (err) {
    console.error('Disconnessione fallita:', err);
  }
};

export default connectToDB;
