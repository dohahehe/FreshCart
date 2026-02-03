import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { failedLogin, successLogin } from './app/types/authInterface';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            name:'credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                // call api
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

                const payload : failedLogin | successLogin = await res.json()
                console.log(payload);
                // return object of type user, and id has to be string
                if ('token' in payload) {
                   return {
                    id: payload.user.email,
                    user: payload.user,
                    token: payload.token
                }
                } else {
                  throw new Error('error signing in!')
                }
                
            }
        })
    ],
    callbacks: {
        jwt: ({token, user}) => {
            if(user){
                token.user= user.user
                token.token = user.token
            }
            return token
        },
        session: ({session, token}) => {
            session.user = token.user
            return session
        }, 
    }
}

// useSession, getSession, getServerSession
// useSession ==> Client Component