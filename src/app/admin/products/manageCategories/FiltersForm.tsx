'use client'
import React, {Suspense} from "react";
import {UseSearch} from "@/utils";
import Input from "@/app/components/Input";
import type {SearchParams} from "@/actions/products";


export default function FiltersForm(){
    const {handleSearch, searchParams} = UseSearch();
    const values = {
        email: searchParams.get("email") || undefined,
        status: Number(searchParams.get("status")) || undefined,
        minPrice: Number(searchParams.get("minPrice")) || undefined,
        maxPrice: Number(searchParams.get("maxPrice")) || undefined,
        products: searchParams.get("products") || undefined,
        secondName: searchParams.get("secondName") || undefined,
        phone: searchParams.get("phone") || undefined,
        page: searchParams.get("page") || 1,
    }
    return (
        <div>
            <form className={"flex flex-col gap-y-4 h-min"} action={""}>
                <Input type="text" name="email" placeholder="Email" onChange={handleSearch} defaultValue={values.email}/>
                <Input type="number" name="status" placeholder="Status" onChange={handleSearch} defaultValue={values.status}/>
                <Input type="number" name="minPrice" placeholder="Min Price" onChange={handleSearch} defaultValue={values.minPrice}/>
                <Input type="number" name="maxPrice" placeholder="Max Price" onChange={handleSearch} defaultValue={values.maxPrice}/>
                <Input type="text" name="products" placeholder="Products" onChange={handleSearch} defaultValue={values.products}/>
                <Input type="text" name="secondName" placeholder="Second Name" onChange={handleSearch} defaultValue={values.secondName}/>
                <Input type="text" name="phone" placeholder="Phone" onChange={handleSearch} defaultValue={values.phone}/>
         </form>
    </div>
)
}