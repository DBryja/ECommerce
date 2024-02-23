import {Product} from "@prisma/client";
import React from "react";
import ProductCard from "@/app/components/ProductCard";

export default function ProductsList({products} : {products: Product[]}){
    return (
        <div>
        {products.map((product : Product) =>
            <ProductCard product={product} key={product.id}/>
        )}
        </div>
    )

}