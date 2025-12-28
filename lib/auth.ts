import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '@/lib/mongodb';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';
import '@/types';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        await connectToDB();
        const user = await UserModel.findOne({
          username: credentials?.username,
        });

        if (!user || !user.password) {
          console.log('User not found or no password');
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
          username: user.username,
          role: user.role,
          sessionIds: user.sessionIds.map(
            (id: import('mongoose').Types.ObjectId) => id.toString()
          ),
          notes: user.notes,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.sessionIds = user.sessionIds;
        token.notes = user.notes;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.sessionIds = token.sessionIds;
        session.user.notes = token.notes;
      }
      return session;
    },
  },
};
