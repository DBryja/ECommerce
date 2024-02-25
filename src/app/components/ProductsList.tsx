import {Product} from "@prisma/client";
import React from "react";
import ProductCard from "@/app/components/ProductCard";

interface IProductsList{
    products: Product[];
}
export default function ProductsList({products} : IProductsList){

    return (
        <div className={"flex flex-col gap-y-4 w-full"}>
        {products.map((product : Product) =>{
            return (
                <ProductCard product={product} key={product.id}/>
            )}
        )}
        </div>
    )

}