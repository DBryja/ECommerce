"use server";
import { z } from 'zod';
import {db} from "@/db";
import {errorHandling} from "@/utils";
import {Order} from "@prisma/client";
import {auth} from "@/auth";
import {deleteCart} from "@/actions/auth";

const validationSchema = z.object({
    firstName: z.string(),
    secondName: z.string(),
    city: z.string(),
    street: z.string(),
    building: z.string(),
    apartment: z.string().optional(),
    postalCode: z.string(),
    firmName: z.string().optional().nullable(),
    email: z.string().email(),
    phone: z.string(),
});

export interface CreateOrderFormState {
    errors: {
        firstName?: string[];
        secondName?: string[];
        city?: string[];
        street?: string[];
        building?: string[];
        apartment?: string[];
        postalCode?: string[];
        firmName?: string[];
        email?: string[];
        phone?: string[];
        _form?: string[];
    };
    success?: boolean;
}
export async function createOrder(formState : CreateOrderFormState, formData : FormData, products: string, totalPrice: number) : Promise<CreateOrderFormState> {
    const result = validationSchema.safeParse({
        firstName: formData.get("firstName"),
        secondName: formData.get("secondName"),
        city: formData.get("city"),
        street: formData.get("street"),
        building: formData.get("building"),
        apartment: formData.get("apartment"),
        postalCode: formData.get("postalCode"),
        firmName: formData.get("firmName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
    });

    if (!result.success) {
        console.log(result.error.flatten().fieldErrors);
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    let userId = undefined;
    const session = await auth();
    if(session) userId = session.user.image;

    try {
        const pairs = products.slice(0,-1).split("&").map(pair => pair.split("=").map(Number));
        for (const [id, qty] of pairs) {
            // console.log(id, qty);
            const product = await db.product.findUnique({
                where: {id: id},
                select: {quantity: true}
            })
            if(!product) return errorHandling(new Error("Product not found"));

            if (product.quantity < qty) {
                return errorHandling(new Error("Not enough products in stock"));
            }
        }

        const ShippingDetails = await db.shippingDetails.create({
            data: {
                firstName: result.data.firstName,
                secondName: result.data.secondName,
                city: result.data.city,
                street: result.data.street,
                building: result.data.building,
                apartment: result.data.apartment,
                postalCode: result.data.postalCode,
                // firmName: result.data.firmName,
                email: result.data.email,
                phone: result.data.phone,
                userId : userId
            }
        })
        // console.log(ShippingDetails);

        if(!ShippingDetails.id) return errorHandling(new Error("Shipping details not created"));
        const order = await db.order.create({
            data: {
                userId: userId,
                acceptedDate: new Date(),
                status: 1,
                detailsId: ShippingDetails.id,
                products: products,
                totalPrice: totalPrice,
            }
        })
        // console.log(order)

        for (const [id, qty] of pairs) {
            // console.log(id, qty);
            const updatedProd = await db.product.update({
                where: {id: id},
                data: {
                    quantity: {decrement: qty},
                    sold: {increment: qty}
                },
            })
        }
    } catch (err: unknown){
            errorHandling(err)
    }

    await deleteCart();
    return {errors: {}, success: true};
}