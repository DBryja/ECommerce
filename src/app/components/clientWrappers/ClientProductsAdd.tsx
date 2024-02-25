'use client'
import React, {useEffect, useRef} from 'react';
import {useFormState} from "react-dom";
import * as actions from "@/actions/products";
import Input from "@/app/components/Input";
import {useRouter} from "next/router";

export default function ClientProductsAdd({children}: {children: React.ReactNode}){
    const imagesRef = useRef<HTMLInputElement>(null);
    const [formState, action] = useFormState(actions.createProduct, {errors: {}, success: false});
    const formRef = useRef<HTMLFormElement>(null);
    const succesRef = useRef<HTMLParagraphElement>(null);
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

    if(formState.success) formRef.current?.reset();

    //TODO: Remove default values
    return (
        <div className={"flex justify-center align-center flex-col"}>
            <form className={"flex flex-col w-96 gap-y-2"} onSubmit={onSubmit} ref={formRef}>
                <Input name={"name"} placeholder={"Product Name"} errors={formState.errors.name} defaultValue={"Food1"}/>
                <Input type="number" name="price" placeholder="Product Price" errors={formState.errors.price}
                       defaultValue={"150"}/>
                <Input type="text" name="description" placeholder="Product Description"
                       errors={formState.errors.description} defaultValue={"description of a product"}/>
                <Input type="number" name="quantity" placeholder="Product Quantity" errors={formState.errors.quantity}
                       defaultValue={"1000"}/>
                {children}
                <input type="file" name="image" accept={"image/*"} multiple required={true}/>
                <button type="submit" className={"bg-blue-200 px-5 py-3"}>Dodaj</button>
            </form>

            {formState.success && <p className={"text-green-500"} ref={succesRef}>Produkt dodany pomyślnie.</p>}
        </div>
    );
}