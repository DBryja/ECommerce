'use client'
import React, {useRef, useState} from 'react';
import {useFormState} from "react-dom";
import * as actions from "@/actions/products";
import Input from "@/app/components/Input";
import {useRouter} from "next/router";
import ProductCard from "@/app/components/ProductCard";

export default function ClientProductsAdd({children}: {children: React.ReactNode}){
    const [formState, action] = useFormState(actions.createProduct, {errors: {}, success: false});
    const imagesRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const succesRef = useRef<HTMLParagraphElement>(null);
    const [formValuesState, setFormValuesState] = useState({name: "", price: 0, description: "", quantity: 0, category: 0});
   const inputOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormValuesState({...formValuesState, [e.target.name]: e.target.value});
       if(succesRef.current) succesRef.current?.remove();
   }

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
        <div className={"flex justify-center align-center flex-row gap-x-12"}>
            <form className={"flex flex-col w-96 gap-y-2"} onSubmit={onSubmit} ref={formRef}>
                <Input onChange={inputOnChange} name={"name"} placeholder={"Product Name"} errors={formState.errors.name} defaultValue={"Food1"}/>
                <Input onChange={inputOnChange} type="number" name="price" placeholder="Product Price" errors={formState.errors.price}
                       defaultValue={"150"}/>
                <Input onChange={inputOnChange} type="text" name="description" placeholder="Product Description"
                       errors={formState.errors.description} defaultValue={"description of a product"}/>
                <Input onChange={inputOnChange} type="number" name="quantity" placeholder="Product Quantity" errors={formState.errors.quantity}
                       defaultValue={"1000"}/>
                <select onChange={inputOnChange} name="category" defaultValue={0} className={"text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 px-2"}>
                    {children}
                </select>
                {formState.errors.category?.map((error, index) => <p key={index} className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{error}</p>)}
                <input onChange={inputOnChange} type="file" name="image" accept={"image/*"} multiple required={true}/>
                <button type="submit" className={"bg-blue-200 px-5 py-3"}>Dodaj</button>
            </form>

            <ProductCard noAction={true}
                         product={{id: 1,
                             name: formValuesState.name || "",
                             price: formValuesState.price || 0,
                             description: formValuesState.description || "description of a product",
                             quantity: formValuesState.quantity,
                             categoryId: formValuesState.category,
                             sold: 0,
                             imageQty: 0}}/>
            {formState.success && <p className={"text-green-500"} ref={succesRef}>Produkt dodany pomyślnie.</p>}
        </div>
    );
}