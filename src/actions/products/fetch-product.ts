"use server";
import {db} from "@/db";
import {Product} from "@prisma/client";
import {cache} from "react";

export type SearchParams = {
    id?: number | 0,
}
export const fetchProduct = cache(({id} : SearchParams) : Promise<Product | null> => {
    return db.product.findUnique({
        where: {
            id: id,
        }
    });
});