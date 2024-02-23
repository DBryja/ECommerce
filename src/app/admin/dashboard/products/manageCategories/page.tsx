import {fetchCategories, removeCategory} from "@/db/queries";
import React from "react";
import SelectCategory from "@/app/components/SelectCategory";
import AddCategoryForm from "@/app/components/AddCategoryForm";
import RemoveCategoryButton from "@/app/components/RemoveCategoryButton";

export default async function ManageCategories(){
    const categories = await fetchCategories();

    return (
        <div>
            <h1>Add Category</h1>
            <ul>
            {categories.map((cat)=> {
                return <li key={cat.id} className={"flex w-96 justify-between border-b-2 border-orange-50 mb-4"}>
                    {cat.name}
                    <RemoveCategoryButton id={cat.id}/>
                </li>
            })}
            </ul>
            <AddCategoryForm/>
        </div>
    )
}