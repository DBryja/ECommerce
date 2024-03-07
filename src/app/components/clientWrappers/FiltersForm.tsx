'use client'
import React, {Suspense} from "react";
import {UseSearch} from "@/utils";
import Input from "@/app/components/Input";
import type {SearchParams} from "@/actions/products";


export default function FiltersForm({children}:{children: React.ReactNode}){
    const {handleSearch, searchParams} = UseSearch();
    let values :SearchParams = {};
    values = {
        category: Number(searchParams.get("category")) || 0,
        priceMin: Number(searchParams.get("priceMin")) || undefined,
        priceMax: Number(searchParams.get("priceMax")) || undefined
    }

    return (
        <div>
            <form className={"flex flex-row gap-x-4 h-min"} action={""}>
                <select className={"text-sm sm:text-base relative border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none h-auto px-8 my-5"} name="category" onChange={handleSearch} defaultValue={values.category}>
                    {children}
                </select>
                <Input type="number" name="priceMin" placeholder="Min price" onChange={handleSearch} defaultValue={values.priceMin}/>
                <Input type="number" name="priceMax" placeholder="Max price" onChange={handleSearch} defaultValue={values.priceMax}/>
            </form>
        </div>
    )
}