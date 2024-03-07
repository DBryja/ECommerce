"use server";
import {cookies} from "next/headers";

export const removeFromCart = (id: number) => {
    const cookieStore = cookies();
    const getQty = cookieStore.get("item_" + id.toString())?.value;

    if(getQty === undefined) return;

    if(getQty == "0"){
        cookieStore.delete("item_" + id.toString());
        return
    }

    const newQty = (parseInt(getQty) - 1).toString();
    cookieStore.set("item_" + id.toString(), newQty);
}