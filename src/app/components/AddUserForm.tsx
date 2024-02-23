'use client';
import {useFormState} from "react-dom";
import * as actions from "@/actions/auth";
import React from "react";

type Role = "admin" | "customer";
interface AddUserFormProps {
    role: Role
}
export default function AddUserForm({role}: AddUserFormProps){
    const roleId = role === "admin" ? 1 : 0;
    const [formState, action] = useFormState(actions.addUser.bind(roleId), {errors: {}});

    return (
        <div>
            <h1>{formState.errors.email}</h1>
            <h1>{formState.errors.password}</h1>
            <h1>{formState.errors.confirmPassword}</h1>
            <h1>{formState.errors._form}</h1>
            <form className={"flex flex-col gap-y-2 w-96"} action={action}>
                <input type="text" placeholder="Email" name="email"/>
                <input type="password" placeholder="Password" name="password"/>
                <input type="password" placeholder="Confirm Password" name="confirmPassword"/>
                <button type="submit">Add {role}</button>
            </form>
        </div>
    )
}