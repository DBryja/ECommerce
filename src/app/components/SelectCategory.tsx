import React from 'react';
import { fetchCategories } from "@/actions/products";

export default async function SelectCategory() {
    const categories = await fetchCategories();

    return (
        <>
            <option key={0} value={0}>Wszystkie</option>
            {categories?.map((category) => {
                return <option key={category.id} value={category.id}>{category.name}</option>
            })}
        </>
    );
}