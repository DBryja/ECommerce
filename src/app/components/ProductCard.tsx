import {Product} from "@prisma/client";
import React from "react";
import fs from "fs"
import Image from "next/image";

export default function ProductCard({product}:{product: Product}) {
    let images = [];
    for(let i = 0; i < product.imageQty; i++){
        images.push(<Image src={`/products/${product.id}/img${i}.webp`} alt={product.name} width={200} height={200}/>)
    }


    return (
        <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            {images.map((image) => image)}
        </div>
    )
}