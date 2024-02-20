'use client'

import {useFormState} from "react-dom";
import * as actions from "@/actions/auth";

export default function SignIn(){
    const [formState, action] = useFormState(actions.signInEmployee, {errors: {}});

    return (
        <div>
            <form className={"flex flex-col gap-y-2 w-96"} action={action}>
                <input type="text" placeholder="Login" name="login"/>
                <input type="password" placeholder="Password" name="password"/>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}