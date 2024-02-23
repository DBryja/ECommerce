import React from 'react';
import { fetchCategories } from "@/db/queries";
// import {Category} from "@prisma/client";

export default async function SelectCategory() {
    const categories = await fetchCategories();

    return (
        <select name="category">
            {categories?.map((category) => {
                return <option key={category.id} value={category.id}>{category.name}</option>
            })}
        </select>
    );
}