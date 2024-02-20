'use server';

import {errorHandling} from "@/utils";
import {z} from "zod";
import {db} from "@/db";
import {Employee} from "@prisma/client";
import bcrypt from "bcrypt";

interface SignInAdminFormState {
    errors: {
        login?: string[];
        password?: string[];
        _form?: string[];
    };
}

const signInAdminSchema = z.object({
    login: z.string(),
    password: z.string().min(8),
});
export async function signInEmployee(formState : SignInAdminFormState, formData : FormData) : Promise<SignInAdminFormState> {
    const result = signInAdminSchema.safeParse({
        login: formData.get("login"),
        password: formData.get("password"),
    });
    if (!result.success)
        return {errors: result.error.flatten().fieldErrors};

    const password = result.data.password;

    let employee;
    try {
        employee = await db.employee.findUnique({
            where: {
                login: result.data.login,
            }
        });
    } catch (e) {
        return errorHandling(e);
    }

    if (!employee)
        return {errors: {login: ["Employee not found"]}};

    const match = await bcrypt.compare(password, employee.password);
    console.log(match);
    if (!match)
        return {errors: {password: ["Invalid password"]}};

    return {errors: {}};
}

