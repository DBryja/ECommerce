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
                    .object({login: z.string(), password: z.string()})
                    .safeParse(credentials);

                if(parsedCredentials.success){
                    const {login, password} = parsedCredentials.data;
                    const employee = await db.employee.findUnique({
                        where: {
                            login,
                        }
                    });
                    if(!employee) return null;

                    const match = await bcrypt.compare(password, employee.password);
                    if(match){
                        const user: Session["user"] = {
                            name: employee.login,
                            email: "email",
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