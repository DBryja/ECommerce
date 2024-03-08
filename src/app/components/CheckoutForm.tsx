"use client";
import {useFormState} from "react-dom";
import Input from "@/app/components/Input";
import React from "react";
import {createOrder} from "@/actions/orders";
import type {CreateOrderFormState} from "@/actions/orders";
import type {ShippingDetails} from "@prisma/client";
import {useRouter} from "next/router";
import {redirect} from "next/navigation";

export default function CheckoutForm({productPairs, totalPrice, shippingDetails}:{productPairs:string, totalPrice:number, shippingDetails:ShippingDetails | null}) {
    const [formState, action] = useFormState(
        (formState:CreateOrderFormState, formData:FormData) => createOrder(formState, formData, productPairs, totalPrice),
        {errors: {}});
    if(formState.success) redirect("/checkout/thankYou");

    return <>
        <form className={"flex flex-row gap-x-8 relative"} action={action}>
        <div>
            <Input defaultValue={shippingDetails?.firstName} name="firstName" type={"text"} placeholder={"First Name"} errors={formState.errors.firstName} required/>
            <Input defaultValue={shippingDetails?.secondName} name="secondName" type={"text"} placeholder={"Second Name"} errors={formState.errors.secondName} required/>
            <Input defaultValue={shippingDetails?.email} name="email" type={"email"} placeholder={"Email"} errors={formState.errors.email} required/>
            <Input defaultValue={shippingDetails?.phone} name="phone" type={"tel"} placeholder={"Phone"} errors={formState.errors.phone} required/>
        </div>
        <div>
            <Input defaultValue={shippingDetails?.city} name="city" type={"text"} placeholder={"City"} errors={formState.errors.city} required/>
            <Input defaultValue={shippingDetails?.street} name="street" type={"text"} placeholder={"Street"} errors={formState.errors.street} required/>
            <Input defaultValue={shippingDetails?.building} name="building" type={"text"} placeholder={"Building"} errors={formState.errors.building} required/>
            <Input defaultValue={shippingDetails?.apartment || undefined} name="apartment" type={"text"} placeholder={"Apartment"} errors={formState.errors.apartment}/>
            <Input defaultValue={shippingDetails?.postalCode} name="postalCode" type={"text"} placeholder={"Postal Code"} errors={formState.errors.postalCode} required/>
            {/*<Input name="firmName" type={"text"} placeholder={"Firm Name"} errors={formState.errors.firmName}/>*/}
        </div>
        <button className={"absolute bottom-0 bg-blue-500 text-white rounded px-2 py-4"}>Proceed purchase</button>
    </form>
    </>
}