/**
 * @file        app/api/auth/[...nextauth]/route.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-04-05
 * @updated     2025-06-08
 * @license     MIT
 * @version     0.1.0
 * @brief       Funzioni server-side per la gestione dell'autenticazione
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/app/api/auth/%5B...nextauth%5D/route.ts
 */

import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
