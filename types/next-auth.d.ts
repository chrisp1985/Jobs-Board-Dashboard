import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     refreshToken?: string;
//     expiresAt?: number;
//   }

//   interface JWT {
//     accessToken?: string;
//     refreshToken?: string;
//     expiresAt?: number;
//   }
// }
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
  }

  interface JWT {
    accessToken?: string;
    idToken?: string;
  }
}