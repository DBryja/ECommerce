import {cookies} from "next/headers";
import {itemsInCart} from "@/utils";
import {fetchProduct} from "@/actions/products";
import CartQtyEditor from "@/app/components/CartQtyEditor";
import React from "react";
import {Product} from "@prisma/client";
import CheckoutForm from "@/app/components/CheckoutForm";
import {auth} from "@/auth"
import {fetchShippingDetails} from "@/actions/orders/fetch-shipping-details";

export default async function Page() {
    const itemCookies = itemsInCart(cookies().getAll());
    const products: [Product, number][] = [];
    let total = 0;
    let productPairs: string = ""; //productId=qty& :: &123=2&
    const session = await auth();
    let shippingDetails = null;
    if(session?.user.image) shippingDetails = await fetchShippingDetails(session.user.image);

    for (const cookie of itemCookies) {
        const id = parseInt(cookie.name.replace("item_", ""));
        const qty = parseInt(cookie.value);
        const product : Product | null = await fetchProduct({id: id});
        if (product && qty) {
            products.push([product, qty]);
            total += product.price * qty;
            productPairs = productPairs.concat(`${product.id}=${qty}&`);
        }
    }

    //TODO: Add CheckoutItem component

    return (
        <div className={"flex flex-row gap-x-12"}>
            <div className={"flex flex-col"}>
            {products.map(([product, qty], index) => {
                return <div key={index}>{product.name} :: Total {product.price * qty}
                    <CartQtyEditor id={product.id}>
                        {/*<input type={"number"} value={qty} readOnly={true} disabled/>*/}
                        <p>{qty}</p>
                    </CartQtyEditor>
                </div>
            }, [])
            }
            <p>TOTAL: {total}</p>
            </div>

        <CheckoutForm productPairs={productPairs} totalPrice={total} shippingDetails={shippingDetails}/>
        </div>
    )
}