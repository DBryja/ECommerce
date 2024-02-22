import {signOut} from "@/auth";
import Link from "next/link";

export default function Dashboard(){
    return <div className={"flex flex-col gap-y-5 [*>a]:text-bold"}>
        <h1 className={"text-5xl text-white text-bold"}>Dashboard</h1>
        <Link href={"/admin/dashboard"}>AdminDashboard</Link>
        <Link href={"/admin/dashboard/products/add"}>AdminProductsAdd</Link>
        <Link href={"/admin/dashboard/addEmployee"}>AddEmployee</Link>

        <form action={async () => {
            'use server';
            await signOut();
        }}>
            <button type="submit" className={"bg-white py-8 px-16"}>Sign Out</button>
        </form>
    </div>
}
