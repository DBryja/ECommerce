import {db} from "@/db";
import {cache} from "react";

export const fetchStatusNames =  cache(async () => {
    return db.orderStatus.findMany();
});