import {SearchParams, fetchOrders} from "@/actions/orders/fetch-orders";
import FiltersForm from "@/app/admin/products/manageCategories/FiltersForm";
import {db} from "@/db";
import { PageButtons } from "@/app/components/PageButtons";

export default async function Page({searchParams}: { searchParams: SearchParams}){
    const itemsPerPage = 5;
    const values: SearchParams = {
        email: searchParams?.email,
        status: Number(searchParams?.status),
        minPrice: Number(searchParams?.minPrice),
        maxPrice: Number(searchParams?.maxPrice),
        products: searchParams?.products,
        secondName: searchParams?.secondName,
        phone: searchParams?.phone,
        page: searchParams?.page || 1,
    }
    const totalPages = Math.ceil(await db.order.count() / itemsPerPage);
    const orders = await fetchOrders(values, itemsPerPage);

    //TODO: Add a table to display the orders
    return <div className={"flex flex-row gap-x-8"}>
        <FiltersForm/>
        <table className={"h-min"}>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => {
                    return <tr key={order.id} className={"h-12"}>
                        <td className={"h-min border-2 bg-white px-2"}>{order.id}</td>
                        <td className={"h-min border-2 bg-white px-2"}>{order.shippingDetails.email} <br/>{order.userId}</td>
                        <td className={"h-min border-2 bg-white px-2"}>{order.products}</td>
                        <td className={"h-min border-2 bg-white px-2"}>{order.totalPrice}</td>
                        <td className={"h-min border-2 bg-white px-2"}>{order.status}</td>
                    </tr>
                })}
            </tbody>
        </table>

        <PageButtons currentPage={values.page} totalPages={totalPages}/>
        </div>
}

