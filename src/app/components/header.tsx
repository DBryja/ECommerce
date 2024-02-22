import Link from "next/link";
import {auth} from "@/auth";

export default async function Header(){

    const session = await auth();
    console.log(session);

    return (
        <div className={"w-full h-32 flex flex-row p-8 justify-left gap-x-2"}>
            <Link href={"/"} className={"font-bold"}>Home</Link>
            <Link href={"/admin/dashboard"}>AdminDashboard</Link>
        </div>
    )
}