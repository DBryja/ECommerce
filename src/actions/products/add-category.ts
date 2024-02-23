"use server";

import {Category} from "@prisma/client";
import {db} from "@/db";
import {z} from "zod";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {errorHandling} from "@/utils";

const createCategorySchema = z.object({
    name: z.string().min(3),
});

interface CreateCategoryFormState {
    errors: {
        name?: string[];
    };
}

export async function createCategory(formState: CreateCategoryFormState, formData: FormData): Promise<CreateCategoryFormState> {
    const result = createCategorySchema.safeParse({
        name: formData.get("name"),
    });

    if (!result.success)
        return {errors: result.error.flatten().fieldErrors};

    try{
        console.log("creating category");
        await db.category.create({
            data: {
                name: result.data.name,
            }
        });
    } catch (e : unknown) {
        errorHandling(e);
    }

    revalidatePath(paths.manageCategories());
    return {errors: {}};
}