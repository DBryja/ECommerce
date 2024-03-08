import {db} from "@/db";

export function fetchShippingDetails(id:string){
    return db.shippingDetails.findFirst({
        where: {
            userId: id
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}