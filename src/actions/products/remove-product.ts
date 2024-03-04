"use server";
import {db} from "@/db";
import paths from "@/paths";
import {errorHandling} from "@/utils";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import fs from "fs";

export async function removeProduct(id:number) {
    try{
        await db.product.delete({
            where: {
                id,
            }
        }).then()
        fs.rmdirSync(`public/products/${id}`, {recursive: true});

    } catch (e : unknown) {
        errorHandling(e);
    }
    revalidatePath(paths.adminProducts());
    // return {errors: {}};
}