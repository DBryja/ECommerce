"use client";
import {useFormState} from "react-dom";
import * as actions from "@/actions/products";
import React from "react";

export default function AddCategoryForm(){
    const [formState, action] = useFormState(actions.createCategory, {errors:{}});

    return (
        <div>
            <h1>Add Category</h1>
            <form action={action}>
                <input type={"text"} name={"name"} placeholder={"Category name"}/>
                <button type={"submit"}>Add category</button>
            </form>
        </div>
    )
}