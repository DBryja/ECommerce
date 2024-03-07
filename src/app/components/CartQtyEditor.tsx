"use client"
import {addToCart, removeFromCart} from "@/actions/products";
import React, {ReactNode} from "react";

export default function CartQtyEditor({children, id} : {children: ReactNode, id: number}) {
    return(<div className={"flex flex-row gap-x-2"}>
    <button className="border-2 border-black p-2" onClick={() => removeFromCart(id)}> - </button>
        {children}
    <button className="border-2 border-black p-2" onClick={() => addToCart(id)}> + </button>
    </div>)
}
