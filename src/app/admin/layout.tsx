import React from "react";
import NavLinks from "@/app/components/NavLinks.jsx";

const links = [
    {name: "Add Products", href: "/admin/products/add"},
    {name: "Manage Products", href: "/admin/products"},
    {name: "Add Employee", href: "/admin/addEmployee"},
    {name: "Manage Categories", href: "/admin/products/manageCategories"},
    {name: "Manage Orders", href: "/admin/manageOrders"},
]

export default function Layout({children} : {children: React.ReactNode}){
    return(
    <div className={"w-screen h-screen flex p-12 gap-x-12"}>
        <nav className={"flex flex-col gap-y-5 [*>a]:text-bold w-80 h-3/4 p-8 border-4 border-white"}>
            <h1 className={"text-5xl text-white text-bold"}>Admin</h1>
            <NavLinks links={links}/>
        </nav>
        {children}
    </div>)
}