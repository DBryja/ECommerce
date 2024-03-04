"use client"
import {removeCategory} from "@/actions/products";
import React from "react";

export default function RemoveCategoryButton({id}:{id: number}) {
    return (
        <button onClick={() => removeCategory(id)}>Usuń</button>
    )
}