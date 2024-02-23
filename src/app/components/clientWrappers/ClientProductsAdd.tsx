'use client'
import React, {useRef} from 'react';
import {useFormState} from "react-dom";
import * as actions from "@/actions/products";

export default function ClientProductsAdd({children}: {children: React.ReactNode}){
    const imagesRef = useRef<HTMLInputElement>(null);
    const [formState, action] = useFormState(actions.createProduct, {errors: {}});
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const images = imagesRef.current?.files;
        if (images) {
            for (const key in images)
                formData.append("image[]", images[key]);
        }
        action(formData);
    }

    return (
        <div className={"flex justify-center align-center flex-col"}>
            <form className={"flex flex-col w-96 gap-y-2"} onSubmit={onSubmit}>
                <input type="text" placeholder="Product Name" name="name" defaultValue={"food1"}/>
                <input type="number" placeholder="Product Price" name="price" defaultValue={150} step={0.01}/>
                <input type="text" placeholder="Product Description" name="description" defaultValue={"description of a product"}/>
                <input type="text" placeholder="Product filters" name="filters" defaultValue={"filter1 filter2"}/>
                <input type="number" name="quantity" placeholder="Product Quantity" defaultValue={"1000"}/>
                {children}
                <input type="file" name="image" accept={"image/*"} multiple/>
                <button type="submit" className={"bg-blue-200 px-5 py-3"}>Dodaj</button>
            </form>
        </div>
    );
}