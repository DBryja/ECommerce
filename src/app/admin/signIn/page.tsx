'use client'

import {useFormState, useFormStatus} from "react-dom";
import {authenticate} from "@/actions/auth";
import * as actions from "@/actions/auth";

export default function SignIn(){
    const [errorMessage, action] = useFormState(actions.authenticate, undefined);

    return (
        <div>
            <form className={"flex flex-col gap-y-2 w-96"} action={action}>
                <input type="text" placeholder="Login" name="login"/>
                <input type="password" placeholder="Password" name="password"/>
                <button type="submit">Sign In</button>
            </form>
            <div>
                {errorMessage}
            </div>
        </div>
    )
}