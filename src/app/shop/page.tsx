import ProductsList from "@/app/components/ProductsList";
import FiltersForm from "@/app/components/clientWrappers/FiltersForm";
import SelectCategory from "@/app/components/SelectCategory";
import type {SearchParams} from "@/actions/products";
import React, {Suspense} from "react";

export default function Shop({searchParams}: { searchParams: SearchParams }) {
    const values = {
        category: Number(searchParams?.category) || 0,
        priceMin: Number(searchParams?.priceMin) || undefined,
        priceMax: Number(searchParams?.priceMax) || undefined,
    }

    return (
        <div>
            <h1>Shop</h1>
            <FiltersForm >
                <SelectCategory/>
            </FiltersForm>

            <Suspense fallback={"Waiting for products"}>
                <ProductsList params={values} />
            </Suspense>
        </div>
    )
}