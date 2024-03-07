import ShoppingCart from "@/app/components/ShoppingCart";

export default function Layout({children} : {children: React.ReactNode}){
    return (
        <div className={"flex justify-between w-full"}>
            {children}
            <ShoppingCart/>
        </div>
    )
}