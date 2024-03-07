import {cookies} from "next/headers";
import {itemsInCart} from "@/utils";
import CartItem from "@/app/components/CartItem";
import {fetchProduct} from "@/actions/products";
import Image from "next/image";
import CartQtyEditor from "@/app/components/CartQtyEditor";
import React from "react";
import {Product} from "@prisma/client";
import Input from "@/app/components/Input";
export default async function Page() {
    const itemCookies = itemsInCart(cookies().getAll());
    const products: [Product, number][] = [];
    let total = 0;

    for (const cookie of itemCookies) {
        const id = parseInt(cookie.name.replace("item_", ""));
        const qty = parseInt(cookie.value);
        const product : Product | null = await fetchProduct({id: id});
        if (product && qty) {
            products.push([product, qty]);
            total += product.price * qty;
        }
    }

    //TODO: Add CheckoutItem component

    return (
        <div className={"flex flex-row gap-x-12"}>
            <div className={"flex flex-col"}>
            {products.map(([product, qty], index) => {
                return <div key={index}>{product.name} :: Total {product.price * qty}
                    <CartQtyEditor id={product.id}>
                        <input type={"number"} value={qty} readOnly={true}/>
                    </CartQtyEditor>
                </div>
            }, [])
            }
            <p>TOTAL: {total}</p>
            </div>


            <form className={"flex flex-row gap-x-8 relative"}>
                <div>
                <Input name="firstName" type={"text"} placeholder={"First Name"}/>
                <Input name="secondName" type={"text"} placeholder={"Second Name"}/>
                <Input name="email" type={"email"} placeholder={"Email"}/>
                <Input name="phone" type={"tel"} placeholder={"Phone"}/>
                </div>
                <div>
                <Input name="city" type={"text"} placeholder={"City"}/>
                <Input name="street" type={"text"} placeholder={"Street"}/>
                <Input name="building" type={"text"} placeholder={"Building"}/>
                <Input name="apartment" type={"text"} placeholder={"Apartment"}/>
                <Input name="postalCode" type={"text"} placeholder={"Postal Code"}/>
                {/*<Input name="firmName" type={"text"} placeholder={"Firm Name"}/>*/}
                </div>
                <button className={"absolute bottom-0 bg-blue-500 text-white rounded px-2 py-4"}>Proceed purchase</button>
            </form>
            {/*<a href={"/checkout"}>Proceed purchase in some payment API</a>*/}
        </div>
    )
}