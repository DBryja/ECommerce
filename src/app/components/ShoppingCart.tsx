import {cookies} from "next/headers";
import CartItem from "@/app/components/CartItem";
import Link from "next/link";
import {itemsInCart} from "@/utils";
export default async function Page() {
    const itemCookies = itemsInCart(cookies().getAll());

    //TODO: Add styling
    return (
        <div className={"bg-gray-500 p-4 rounded-l-2xl fixed right-0 top-0 h-full justify-between flex flex-col"}>
            <ul className={"flex flex-col gap-y-5"}>
                {itemCookies.map((item, index) => (
                    <CartItem key={index} itemId={item.name} qty={item.value}/>
                ))}
            </ul>

            <Link href={"/checkout"} className={"mt-auto bg-white rounded py-4 px-2 flex justify-center hover:bg-blue-200"}>Checkout</Link>
        </div>
  );
}