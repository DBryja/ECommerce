import SelectCategory from "@/app/components/SelectCategory";
import ClientProductsList from "@/app/components/clientWrappers/ClientProductsList";
import type {SearchParams} from "@/actions/products";
import React, {Suspense} from "react";
import ProductsList from "@/app/components/ProductsList";

export default function ProductsPage({searchParams}: { searchParams: SearchParams }){
    const values = {
        category: Number(searchParams?.category) || 0,
        priceMin: Number(searchParams?.priceMin) || undefined,
        priceMax: Number(searchParams?.priceMax) || undefined,
    }

    return <div className={"w-1/2"}>
        <ClientProductsList >
            <SelectCategory/>
        </ClientProductsList>

        <Suspense fallback={"Waiting for products"}>
            <ProductsList params={values} />
        </Suspense>
    </div>
}