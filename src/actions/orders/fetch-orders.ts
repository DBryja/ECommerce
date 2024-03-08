"use server"
import {db} from "@/db";
import {Order} from "@prisma/client";

const OrderKeys = {
    id: true,
    userId: true,
    detailsId: true,
    orderDate: true,
    products: true,
    totalPrice: true,
    status: true,
    acceptedDate: true,
    packedDate: true,
    sentDate: true,
    deliveredDate: true,
    canceledDate: true,
    refundDate: true,
    OrderStatus: false,
    User: false,
}

export type SearchParams = {
    email?: string,
    status?: number,
    minPrice?: number,
    maxPrice?: number,
    products?: string,
    secondName?: string,
    phone?: string,
    page: number,
}
interface IFetchOrders {
    searchParams: SearchParams,
    itemsPerPage: number,
}

export const fetchOrders = async ({email, status, minPrice, maxPrice, products, secondName, phone, page}:SearchParams, itemsPerPage:number)  => {
    return db.order.findMany({
        where: {
            shippingDetails: {
                email: email ? email : undefined,
                secondName: secondName ? secondName : undefined,
                phone: phone ? phone : undefined,
            },
            status: status ? status : undefined,
            totalPrice: {
                gte: minPrice ? minPrice : 0,
                lte: maxPrice ? maxPrice : 1000000,
            },
            products: products ? {
                contains: products,
            } : undefined,
        },
        select :{
            ...OrderKeys,
            shippingDetails: {
                select: {
                    email: true,
                },
            },
        },
        skip: itemsPerPage * (page - 1),
        take: itemsPerPage,
    });
}