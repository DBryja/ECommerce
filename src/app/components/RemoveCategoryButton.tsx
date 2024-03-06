"use client"
import {removeCategory} from "@/actions/products";
import React from "react";
import {useFormState} from "react-dom";
import Input from "@/app/components/Input";

export default function RemoveCategoryButton({id}:{id: number}) {
    const [formState, action] = useFormState(removeCategory.bind(null, id), {errors:{}});

    return (<>
        <form action={action}>
            <Input type={"submit"} name={"deleteCategory"} errors={formState.errors.category} defaultValue={"Delete"} className={"text-black"}/>
        </form>
    </>)
}