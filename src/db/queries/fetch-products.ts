"use server";
import {db} from "@/db";
import {Product} from "@prisma/client";

interface IFetchProducts{
    categoryId: number | undefined;
    priceMin: number | undefined;
    priceMax: number | undefined;
}
export const fetchProducts = ({categoryId, priceMin, priceMax} : IFetchProducts) : Promise<Product[]> => {
    if (categoryId === 0) categoryId = undefined;
    return db.product.findMany({
        where: {
            categoryId,
            price: {
                gte: priceMin ? priceMin : 0,
                lte: priceMax ? priceMax : 1000000,
            },
        }
    });
}