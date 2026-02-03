import { JWT } from "next-auth/jwt"
import NextAuth, { User } from "next-auth"
import { UserResponse } from "./authInterface"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    user: UserResponse,
    token: string
  }
  // token shouldnt be in the session
  interface Session {
     user: UserResponse,
  }
}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User{
  }
}