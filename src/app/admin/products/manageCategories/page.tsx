import {fetchCategories, removeCategory} from "@/actions/products";
import React from "react";
import AddCategoryForm from "@/app/components/AddCategoryForm";
import {useFormState} from "react-dom";
import RemoveCategoryButton from "@/app/components/RemoveCategoryButton";


export default async function ManageCategories(){
    const categories = await fetchCategories();


    return (
        <div className={"w-96"}>
            <ul>
            {categories.map((cat)=> {
                return <li key={cat.id} className={"text-sm sm:text-base relative w-full border rounded py-2 px-2 bg-white mb-4 flex justify-between items-center"}>
                    {cat.name}
                    <RemoveCategoryButton id={cat.id}/>
                </li>
            })}
            </ul>
            <AddCategoryForm/>
        </div>
    )
}