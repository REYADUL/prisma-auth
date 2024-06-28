import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { userModel } from "./db/models/users.model";
import bcrypt from "bcryptjs"
import mongoClientPromise from "./db/mongoClientPromise";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: MongoDBAdapter(mongoClientPromise, { databaseName: "lws-kart" }),
    session: {
        strategy: 'jwt',
    },
    trustHost: true,
    trustHostedDomain: true,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (credentials == null) {
                    return null
                }
                try {
                    const user = await userModel.findOne({ email: credentials.email })
                    if (user) {
                        const isMatch = await bcrypt.compare(credentials.password, user.password)
                        if (isMatch) {
                            return user
                        }
                        else {
                            throw new Error("invalid password")
                        }
                    }
                    else {
                        throw new Error("user not found")
                    }
                } catch (error) {
                    throw new Error(error)
                }

            }

        }),
        
    ]
})