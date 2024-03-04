"use server";
import {db} from "@/db";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";
import {errorHandling} from "@/utils";

export async function removeCategory(id:number) {
    try{
        await db.category.delete({
            where: {
                id,
            }
        })
    } catch (e : unknown) {
        errorHandling(e);
    }

    revalidatePath(paths.manageCategories());
    return {errors: {}};
}