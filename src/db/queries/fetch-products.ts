"use server";
import {db} from "@/db";
import {Product} from "@prisma/client";

interface IFetchProducts{
    categoryId: number | undefined;
    priceMin: number | undefined;
    priceMax: number | undefined;
}
export const fetchProducts = ({categoryId, priceMin, priceMax} : IFetchProducts) : Promise<Product[]> => {
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