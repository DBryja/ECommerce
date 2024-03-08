'use server';
import {errorHandling} from "@/utils";
import {z} from "zod";
import {db} from "@/db";
import bcrypt from "bcrypt";

interface addUserFormState {
    errors: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        _form?: string[];
    };
    success?: boolean;
}

const addUserFormState = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).superRefine(({password, confirmPassword}) => {
    if (password !== confirmPassword)
        return {confirmPassword: ["Passwords do not match"]};
});
export async function addUser(formState : addUserFormState, formData : FormData, roleId :number = 0) : Promise<addUserFormState> {
    const result = addUserFormState.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });
    if (!result.success){
        return {errors: result.error.flatten().fieldErrors};
    }

    const password = result.data.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.user.create({
            data: {
                email: result.data.email,
                password: hashedPassword,
                role: roleId, //id of role admin
            }
        });
    } catch (e) {
        return errorHandling(e);
    }

    return {errors: {}, success: true};
}

