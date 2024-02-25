"use server";
import {db} from "@/db";
import paths from "@/paths";
import {errorHandling} from "@/utils";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function removeProduct(id:number) {
    try{
        await db.product.delete({
            where: {
                id,
            }
        }).then()
    } catch (e : unknown) {
        errorHandling(e);
    }
    revalidatePath(paths.adminProducts());
    redirect(paths.adminProducts());
    // return {errors: {}};
}