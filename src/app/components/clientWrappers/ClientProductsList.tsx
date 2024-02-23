'use client'
import React, {useState, useEffect, useRef} from "react";
import {fetchProducts} from "@/db/queries";
import {Product} from "@prisma/client";
import ProductsList from "@/app/components/ProductsList";

export default function ClientProductsList({children}:{children: React.ReactNode}){
    const [products, setProducts] = useState<Product[]>([] as Product[]);
    const formRef = useRef<HTMLFormElement>(null);
    const fetchAndSetProducts = async (filters: any) => {
        const products = await fetchProducts(filters);
        setProducts(products);
    }

    useEffect(()=>{
        const filters = {
            categoryId: undefined,
            priceMin: undefined,
            priceMax: undefined,
        }
        fetchAndSetProducts(filters);
    }, [])
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const filters = {
            categoryId: Number(formData.get("category")) || undefined,
            priceMin: Number(formData.get("priceMin")) || undefined,
            priceMax: Number(formData.get("priceMax")) || undefined,
        }
        await fetchAndSetProducts(filters);
    }

    return (
        <div>
            <form onSubmit={onSubmit} className={"flex flex-col gap-y-4 w-96"} ref={formRef}>
                {children}
                <input type="number" name="priceMin" placeholder="Min price"/>
                <input type="number" name="priceMax" placeholder="Max price"/>
                <button type="submit">Find Products</button>
            </form>

            <ProductsList products={products} />
        </div>
    )
}