"use server";
import {db} from "@/db";
import {Category} from "@prisma/client";
import {cache}  from "react"

export const fetchCategories = cache(() : Promise<Category[]> => {
    return db.category.findMany();
});