'use client';

import {Product} from "@prisma/client";
import React, {useRef} from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {addToCart} from "@/actions/products";


export default function ProductCard({product, noAction}:{product: Product, noAction?: boolean}) {
    const cardRef = useRef<HTMLDivElement>(null);

    const images = [];
    if (product.imageQty > 0){
        for(let i = 0; i < product.imageQty; i++){
            images.push(<Image key={i} src={`/products/${product.id}/img${i}.webp`} alt={product.name} width={200} height={200}/>)
        }
    } else {
        images.push(<Image key={0} src={`/products/default.webp`} alt={product.name} width={200} height={200}/>)
    }

    const isAdmin =  usePathname()?.includes("/admin")

    return (
        <div key={product.id} className={"border-2 border-black p-4"} ref={cardRef}>
            <h2>name: {product.name}</h2>
            <p>description: {product.description}</p>
            <p>price: ${product.price}</p>
            {isAdmin && <>
                <p>quantity: {product.quantity}</p>
            </>}
            <p>Sold: {product.sold}</p>
                {noAction && <p>Live preview of images is currently not implemented</p>}
            <div className={"flex flex-row gap-x-4"}>
            {!noAction && images.map((image) => image)}
            </div>
            {!isAdmin && <button className={"bg-blue-500"} onClick={()=>addToCart(product.id)}>Add to cart</button>}
            {/*{isAdmin && !noAction && <button onClick={()=>removeProduct(product.id)} className={"bg-red-500"}>Delete</button>}*/}
        </div>
    )
}