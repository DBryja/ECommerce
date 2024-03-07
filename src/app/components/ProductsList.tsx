"use server";
import {Product} from "@prisma/client";
import React from "react";
import ProductCard from "@/app/components/ProductCard";
import {fetchProducts} from "@/actions/products";
import type {SearchParams} from "@/actions/products";

interface IProductsList {
    params: SearchParams
}
//@ts-ignore
export default async function ProductsList({params}: IProductsList){
    const products = await fetchProducts(params);

    return (
        <div className={"flex flex-row gap-y-4 w-full flex-wrap gap-x-8"}>
            {products.length === 0 && <p>No products found</p>}
        {products.map((product : Product) =>{
            return (
                <ProductCard product={product} key={product.id}/>
            )}
        )}
        </div>
    )
}