'use client'
import React, {useRef, useState} from 'react';
import {useFormState} from "react-dom";
import * as actions from "@/actions/products";

export default function productsAddPage(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imagesRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formState, action] = useFormState(actions.createProduct, {errors: {}});
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const images = imagesRef.current?.files;
        if (images) {
            for (const key in images)
                formData.append("image[]", images[key]);
        }
        console.log(formData);
        action(formData);
    }

    console.log(formState.errors);

    return (
        <div className={"flex justify-center align-center flex-col"}>
            <form className={"flex flex-col w-96 gap-y-2"} onSubmit={onSubmit}>
                <input type="text" placeholder="Product Name" name="name" defaultValue={"food1"}/>
                <input type="number" placeholder="Product Price" name="price" defaultValue={12.50}/>
                <input type="text" placeholder="Product Description" name="description" defaultValue={"description of a product"}/>
                <input type="text" placeholder="Product filters" name="filters" defaultValue={"filter1 filter2"}/>
                <input type="number" name="quantity" placeholder="Product Quantity" defaultValue={"1000"}/>
                <select name="category">
                    <option value="1">żywność</option>
                    <option value="2">odzież i akcesoria</option>
                    <option value="3">suplementy diety</option>
                </select>
                <input type="file" name="image" accept={"image/*"} multiple/>
                <button type="submit" className={"bg-blue-200 px-5 py-3"}>Dodaj</button>
            </form>
        </div>
    );
}