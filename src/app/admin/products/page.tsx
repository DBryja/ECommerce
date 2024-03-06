import SelectCategory from "@/app/components/SelectCategory";
import FiltersForm from "@/app/components/clientWrappers/FiltersForm";
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
        <FiltersForm >
            <SelectCategory/>
        </FiltersForm>

        <Suspense fallback={"Waiting for products"}>
            <ProductsList params={values} />
        </Suspense>
    </div>
}