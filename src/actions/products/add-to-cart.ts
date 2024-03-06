"use server";
import {cookies} from "next/headers";

export const addToCart = (id: number) => {
    const cookieStore = cookies();
    const getQty = cookieStore.get("item_" + id.toString())?.value;
    const newQty = getQty ? (parseInt(getQty) + 1).toString() : "1";
    cookieStore.set("item_" + id.toString(), newQty);
}