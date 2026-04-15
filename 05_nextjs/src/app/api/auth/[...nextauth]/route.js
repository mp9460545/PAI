import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: { label: 'Login', type: 'text' },
        password: { label: 'Hasło', type: 'password' },
      },
      async authorize(credentials) {
        const users = {
          admin: { id: '1', name: 'admin', role: 'admin', password: 'admin' },
          user:  { id: '2', name: 'user',  role: 'user',  password: 'user'  },
        };

        const user = users[credentials.login];
        if (user && user.password === credentials.password) {
          return { id: user.id, name: user.name, role: user.role };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
