export default function OrderHistory(){
    return (
        <div>
            <form className={"flex flex-col gap-y-2 w-96"}>
                <input type="text" placeholder="Login" name="login"/>
                <input type="password" placeholder="Password" name="password"/>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}