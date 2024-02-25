'use client';

import {Product} from "@prisma/client";
import React from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {removeProduct} from "@/db/queries";
import {useRef} from "react";


export default function ProductCard({product}:{product: Product}) {
    const cardRef = useRef<HTMLDivElement>(null);
    let images = [];
    for(let i = 0; i < product.imageQty; i++){
        images.push(<Image key={i} src={`/products/${product.id}/img${i}.webp`} alt={product.name} width={200} height={200}/>)
    }
    const isAdmin = usePathname()?.includes("/admin");
    const onClick = () => {
        removeProduct(product.id);
        cardRef.current?.remove();
    }

    return (
        <div key={product.id} className={"border-2 border-black p-4"} ref={cardRef}>
            <h2>name: {product.name}</h2>
            <p>description: {product.description}</p>
            <p>price: ${product.price}</p>
            {isAdmin && <>
                <p>quantity: {product.quantity}</p>
            </>}
            <div className={"flex flex-row gap-x-4"}>
            {images.map((image) => image)}
            </div>
            {isAdmin && <button onClick={onClick} className={"bg-red-500"}>Delete</button>}
        </div>
    )
}