import Link from "next/link";
import {auth, signOut} from "@/auth";

export default async function Header(){
    const session = await auth();
    // console.log(session?.user)

    return (
        <div className={"w-full h-32 flex flex-row p-8 justify-left gap-x-2"}>
            <Link href={"/"} className={"font-bold"}>Home</Link>
            <Link href={"/shop"}>Shop</Link>
            <Link href={"/auth"}>SignIn</Link>
            <Link href={"/auth/register"}>Register</Link>
            <Link href={"/admin"}>AdminDashboard</Link>

            {session?.user && <Link href={`/${session.user.image}`} className={"font-bold text-blue-500"}>{session.user.name} :: {session.user.email}</Link>}

            {session?.user &&
                <form action={async () => {
                    'use server';
                    await signOut();
                }}>
                    <button type="submit" className={"bg-white py-4 px-6"}>Sign Out</button>
                </form>
            }

        </div>
    )
}