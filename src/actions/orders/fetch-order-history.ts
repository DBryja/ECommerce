import {db} from "@/db"
export function fetchOrderHistory(userId: string) {
    return db.order.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            orderDate: "desc"
        }
    });
}