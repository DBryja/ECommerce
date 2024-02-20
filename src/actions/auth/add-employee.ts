'use server';
import {errorHandling} from "@/utils";
import {z} from "zod";
import {db} from "@/db";
import {Employee} from "@prisma/client";
import bcrypt from "bcrypt";

interface addEmployeeFormState {
    errors: {
        login?: string[];
        password?: string[];
        confirmPassword?: string[];
        _form?: string[];
    };
}

const addEmployeeFormState = z.object({
    login: z.string().min(3),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).superRefine(({password, confirmPassword}) => {
    if (password !== confirmPassword)
        return {confirmPassword: ["Passwords do not match"]};
});
export async function addEmployee(formState : addEmployeeFormState, formData : FormData) : Promise<addEmployeeFormState> {
    const result = addEmployeeFormState.safeParse({
        login: formData.get("login"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });
    if (!result.success){
        return {errors: result.error.flatten().fieldErrors};
    }

    const password = result.data.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.employee.create({
            data: {
                login: result.data.login,
                password: hashedPassword,
            }
        });
    } catch (e) {
        return errorHandling(e);
    }

    return {errors: {}};
}

