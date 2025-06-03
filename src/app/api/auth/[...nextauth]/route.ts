// import { AuthOptions } from "next-auth";
// import NextAuth from 'next-auth';
// import KeycloakProvider from "next-auth/providers/keycloak"
// export const authOptions: AuthOptions = {
//   providers: [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_CLIENT_ID!,
//       clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
//       issuer: process.env.KEYCLOAK_ISSUER!,
//     })
//   ],
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//         if (url === `${baseUrl}/login`) {
//           return baseUrl;
//         }
//         return url.startsWith(baseUrl) ? url : baseUrl;
//     },
//   }
// }
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST }

import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  callbacks: {
  async jwt({ token, account }) {
    if (account) {
      token.accessToken = account.access_token;
      token.idToken = account.id_token;
    }
    return token;
  },
  async session({ session, token }) {
    session.accessToken = token.accessToken;
    session.idToken = token.idToken;
    return session;
  },
    async redirect({ url, baseUrl }) {
      if (url === `${baseUrl}/login`) {
        return baseUrl;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
