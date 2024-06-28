import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/utils/db";
import { compare } from "bcrypt";

const handler = nextAuth(authOptions);

export const authOptions ={
    adapter: PrismaAdapter(db),
    session: {
      strategy: 'jwt'
    },
    pages: {
        signIn: '/signIn',
    },
    providers: [
        CredentialsProvider({            
            name: "Credentials",          
            credentials: {
              email: { label: "Email", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
              if(!credentials?.email || !credentials?.password){
                return null;
              }
              
              const existingUser = await db.user.findUnique({
                where:{email: credentials?.email}
              });
              if(!existingUser){
                return null;
              }

              const passwordMatch = await compare(credentials.password,existingUser.password)

              if(!passwordMatch){
                return null;
              }
              return {
                id: existingUser.id,
                username: existingUser.email,
              }
        
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                
                return null
              }
            }
          })
    ]
}