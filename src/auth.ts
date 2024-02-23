import NextAuth, {User, Session} from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import {db} from "@/db";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials, request) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string()})
                    .safeParse(credentials);

                console.log(parsedCredentials);

                if(parsedCredentials.success){
                    const {email, password} = parsedCredentials.data;
                    const client = await db.user.findUnique({
                        where: {
                            email,
                        }
                    });
                    if(!client) return null;

                    const match = await bcrypt.compare(password, client.password);
                    const role = await db.roles.findUnique({
                        where: {
                            id: client.role
                        }
                    });
                    if(!role || !role.name){
                        console.log("Role not found");
                        return null;
                    }

                    if(match){
                        const user: Session["user"] = {
                            name: role.name,
                            email: client.email,
                        }
                        return user;
                    } else {
                        console.log("Invalid password");
                        return null;
                    }
                }

                console.log("Invalid credentials");
                return null;
            }
        }),
    ],
});