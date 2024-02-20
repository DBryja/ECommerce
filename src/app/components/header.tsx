import Link from "next/link";

export default  function Header(){
    return (
        <div className={"w-full h-32 flex flex-row p-8 justify-left gap-x-2"}>
            <Link href={"/"} className={"font-bold"}>Home</Link>
            <Link href={"/admin/products/add"}>AdminProductsAdd</Link>
        </div>
    )
}