'use client';
import {useFormState} from "react-dom";
import * as actions from "@/actions/auth";

export default function SignIn(){
    const [formState, action] = useFormState(actions.addEmployee, {errors: {}});

    return (
        <div>
            <h1>{formState.errors.login}</h1>
            <h1>{formState.errors.password}</h1>
            <h1>{formState.errors.confirmPassword}</h1>
            <h1>{formState.errors._form}</h1>
            <form className={"flex flex-col gap-y-2 w-96"} action={action}>
                <input type="text" placeholder="Login" name="login"/>
                <input type="password" placeholder="Password" name="password"/>
                <input type="password" placeholder="Confirm Password" name="confirmPassword"/>
                <button type="submit">Add employee</button>
            </form>
        </div>
    )
}