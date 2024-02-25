'use server';

import {Product} from "@prisma/client";
import {db} from "@/db";
import {z} from "zod";
import {writeFile} from "fs/promises";
import fs from "fs";
import {errorHandling} from "@/utils";
import {revalidatePath} from "next/cache";
import path from "path";
import paths from "@/paths";

const createProductSchema = z.object({
    name: z.string().min(3),
    price: z.number().min(0).max(1000000),
    description: z.string().min(10),
    quantity: z.number().min(1),
    category: z.number().min(1),
});

interface CreateProductFormState {
    errors: {
        name?: string[];
        price?: string[];
        description?: string[];
        quantity?: string[];
        images?: string[];
        _form?: string[];
    };
    success?: boolean;
}

export async function createProduct(formState : CreateProductFormState, formData : FormData) : Promise<CreateProductFormState> {
    const result = createProductSchema.safeParse({
        name: formData.get("name"),
        price: Number(formData.get("price")),
        description: formData.get("description"),
        quantity: Number(formData.get("quantity")),
        category: Number(formData.get("category")),
    });


    if (!result.success)
        return {
            errors: result.error.flatten().fieldErrors
    };
    //move images to product directory
    let images: File[] = [];
    // @ts-ignore
    for(const pair of formData.entries()){
        if(pair[0] === "image")
            images.push(pair[1]);
    }
    if(images.length < 1)
        return {
            errors: {
                images: ["At least one image is required"]
            }
        };

    let product: Product | undefined;
    try {
    product = await db.product.create({
        data: {
            name: result.data.name,
            price: result.data.price,
            description: result.data.description,
            quantity: result.data.quantity,
            sold: 0,
            categoryId: result.data.category,
            imageQty: images.length,
        }
    });
    } catch (err : unknown) {
        errorHandling(err);
    }

    if(!product || !product.id) return errorHandling(new Error("Product not created"));
    //create directory for product images
    if(!fs.existsSync(path.join(process.cwd(), 'public/products/' + product.id.toString()))){
        fs.mkdirSync(path.join(process.cwd(), 'public/products/' + product.id.toString()));
    }

    for (const image of images) {
        const index = images.indexOf(image);
        if(image !instanceof File) errorHandling(new Error("Invalid image"));
        const buffer = Buffer.from(await image.arrayBuffer());
        // const extension = image.name.split('.').pop();
        const filename = `img${index}.webp`;
        try {
            await writeFile(
                path.join(process.cwd(), `public/products/${product.id.toString()}/` + filename),
                buffer
            );
        } catch (error) {
            errorHandling(error);
        }
    }
    
    return {errors: {}, success: true};
}
