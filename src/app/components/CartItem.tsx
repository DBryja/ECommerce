import {fetchProduct} from "@/actions/products";
import Image from "next/image";
import React from "react";
import {addToCart, removeFromCart} from "@/actions/products";
import CartQtyEditor from "@/app/components/CartQtyEditor";

export default async function CartItem({itemId, qty}:{itemId: string, qty: string}) {
    const id = parseInt(itemId.replace("item_", ""));

    const product = await fetchProduct({id:id});
    if (!product) return "";
    if (qty === "0") return "";

    return <div className={"flex flex-row gap-x-4"}>
        {(product.imageQty > 0
            && <Image src={`/products/${id}/img0.webp`} alt={product.name} width={100} height={100}/>)
            || <Image src={`/products/default.webp`} alt={product.name} width={100} height={100}/>}

        <div>
            <h2>{product.name}</h2>
            <p>Price: ${product.price * parseInt(qty)}</p>
            <CartQtyEditor id={id}>
             <input type={"number"} value={qty} readOnly={true}/>
            </CartQtyEditor>
        </div>
    </div>
}