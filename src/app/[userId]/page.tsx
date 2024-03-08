import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {fetchOrderHistory} from "@/actions/orders";
import {fetchStatusNames} from "@/actions/orders";
import {fetchProduct} from "@/actions/products";

export default async function OrderHistory({params}:{params:{userId:string}}) {
    const session = await auth();
    if (session?.user.image !== params.userId) {
        redirect('/auth');
    }
    const orderHistory = await fetchOrderHistory(params.userId);
    const statusNames = await fetchStatusNames();
    console.log(orderHistory)

    return (
        <div>
            <h1>Order History</h1>

            {orderHistory.map(order => {
                const products = order.products.slice(0,-1).split("&").map(pair => pair.split("="));
                return (
                    <div key={order.id}>
                        <h2>Order {order.id}</h2>
                        {products.map( async ([id, qty]) => {
                            const item = await fetchProduct({id: Number(id)});
                            if(item) return <p key={item.id}>{item.name} x {qty}</p>
                            return ""
                        })}
                        <p>Total: {order.totalPrice}</p>
                        {order.acceptedDate && <p>Accepted Date: {order.acceptedDate.toDateString()}</p>}
                        {order.packedDate && <p>Packed Date: {order.packedDate.toDateString()}</p>}
                        {order.sentDate && <p>Sent Date: {order.sentDate.toDateString()}</p>}
                        {order.deliveredDate && <p>Delivered Date: {order.deliveredDate.toDateString()}</p>}
                        {order.canceledDate && <p>Canceled Date: {order.canceledDate.toDateString()}</p>}
                        {order.refundDate && <p>Refund Date: {order.refundDate.toDateString()}</p>}
                    </div>
                )
            })}
        </div>
    )
}