"use client"

import Link from "next/link"
import {usePathname} from "next/navigation";
import clsx from "clsx";

export default function NavLinks({links}: {links:{name: string, href: string}[]}){
    const pathname = usePathname();
    return(
        <>
            {links.map((link)=>{
                return(
                    <Link key={link.name} href={link.href} className={clsx("block w-full h-min px-6 py-4 bg-gray-400 rounded hover:bg-blue-400 hover:text-white transition-colors", {
                        "bg-blue-600 text-white": pathname === link.href
                    })}>
                        {link.name}
                    </Link>
                )
            })}
        </>
    )
}
