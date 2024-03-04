"use server";
import {db} from "@/db";
import {Product} from "@prisma/client";

export type SearchParams = {
    category?: number | 0,
    priceMin?: number | undefined,
    priceMax?: number | undefined,
}
export const fetchProducts = ({category, priceMin, priceMax} : SearchParams) : Promise<Product[]> => {
    if (category === 0) category = undefined;

    return db.product.findMany({
        where: {
            categoryId: category,
            price: {
                gte: priceMin ? priceMin : 0,
                lte: priceMax ? priceMax : 1000000,
            },
        }
    });
}