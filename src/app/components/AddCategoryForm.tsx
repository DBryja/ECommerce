"use client";
import {useFormState} from "react-dom";
import * as actions from "@/actions/products";
import React from "react";
import Input from "@/app/components/Input";

export default function AddCategoryForm(){
    const [formState, action] = useFormState(actions.createCategory, {errors:{}});

    return (
            <form action={action}>
                <Input type="text" name="name" placeholder="Category name" errors={formState.errors.name}/>
                <button type={"submit"} className={"text-sm sm:text-base text-white relative w-full rounded py-4 px-2 bg-blue-500 mb-4 flex justify-center font-bold hover:bg-blue-600"}>Add category</button>
            </form>
    )
}