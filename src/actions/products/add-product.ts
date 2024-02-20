'use server';

import {Product} from "@prisma/client";
import {db} from "@/db";
import {z} from "zod";
import path from "path";
import {writeFile} from "fs/promises";
import fs from "fs";

const errorHandling = (err: unknown) => {
    if(err instanceof Error){
        return {
            errors: {
                _form: [err.message]
            }
        }
    }else{
        return{
            errors:{
                _form: ["Unknown error"]
            }
        };
    }
}

const createProductSchema = z.object({
    name: z.string().min(3),
    price: z.number().min(0),
    description: z.string().min(10),
    filters: z.string(),
    quantity: z.number().min(0),
    category: z.number().min(1),
    // image: z.instanceof(File),
});

interface CreateProductFormState {
    errors: {
        name?: string[];
        price?: string[];
        description?: string[];
        filters?: string[];
        quantity?: string[];
        images?: string[];
        _form?: string[];
    };
}

// TODO: Add admin authentication
export async function createProduct(formState : CreateProductFormState, formData : FormData) : Promise<CreateProductFormState> {
    const result = createProductSchema.safeParse({
        name: formData.get("name"),
        price: Number(formData.get("price")),
        description: formData.get("description"),
        filters: formData.get("filters"),
        quantity: Number(formData.get("quantity")),
        category: Number(formData.get("category")),
    });

    if (!result.success)
        return {errors: result.error.flatten().fieldErrors};

    let product: Product | undefined;
    try {
    product = await db.product.create({
        data: {
            name: result.data.name,
            price: result.data.price,
            description: result.data.description,
            filters: result.data.filters,
            image: "aaaaaaa.jpg",
            quantity: result.data.quantity,
            sold: 0,
            categoryId: result.data.category,
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
    //move images to product directory
    let images: File[] = [];
    // @ts-ignore
    for(const pair of formData.entries()){
        if(pair[0] === "image")
            images.push(pair[1]);
    }
    if(!images) return{
        errors:{
            images: ["No images received"]
        }
    };
    for (const image of images) {
        const index = images.indexOf(image);
        if(image !instanceof File) errorHandling(new Error("Invalid image"));
        const buffer = Buffer.from(await image.arrayBuffer());
        const extension = image.name.split('.').pop();
        const filename = `img${index}.${extension}`;
        try {
            await writeFile(
                path.join(process.cwd(), `public/products/${product.id.toString()}/` + filename),
                buffer
            );
        } catch (error) {
            errorHandling(error);
        }
    }


    return {errors: {}}; // No errors

}
