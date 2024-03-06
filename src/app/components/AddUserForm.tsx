'use client';
import {useFormState} from "react-dom";
import * as actions from "@/actions/auth";
import React from "react";
import Input from "@/app/components/Input";

type Role = "admin" | "customer";
interface AddUserFormProps {
    role: Role
}
export default function AddUserForm({role}: AddUserFormProps){
    const roleId = role === "admin" ? 1 : 0;
    const [formState, action] = useFormState(actions.addUser.bind(roleId), {errors: {}});

    return (
        <div>
            <form className={"flex flex-col gap-y-2 w-96"} action={action}>
                <Input type="text" name="email" placeholder="Email" errors={formState.errors.email}/>
                <Input  type="password" name="password" placeholder="Password" errors={formState.errors.password}/>
                <Input type="password" name="confirmPassword" placeholder="Confirm Password" errors={formState.errors.confirmPassword}/>
                <button type="submit" className={"bg-blue-200 px-5 py-3"}>Add {role}</button>
            </form>
        </div>
    )
}