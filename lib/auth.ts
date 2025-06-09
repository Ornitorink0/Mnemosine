/**
 * @file        lib/auth.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-04-05
 * @updated     2025-06-08
 * @license     MIT
 * @version     0.1.0
 * @brief       Autentificazione con NextAuth
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/lib/auth.ts
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ name: credentials?.name });

        if (!user) {
          console.log('User not found');
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          console.log('Password incorrect');
          return null;
        }

        console.log('User authorized:', user);
        return {
          id: user._id.toString(),
          name: user.name,
          role: user.role,
          sessionIds: user.sessionIds.map(
            (id: import('mongoose').Types.ObjectId) => id.toString()
          ),
          notes: user.notes,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) { // eslint-disable-line
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.sessionIds = user.sessionIds;
        token.notes = user.notes;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) { // eslint-disable-line
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.sessionIds = token.sessionIds;
        session.user.notes = token.notes;
      }
      return session;
    },
  },
};
