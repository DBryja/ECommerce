import {cookies} from "next/headers";
export default async function Page() {
    const cart = cookies().getAll();
    const itemCookies =
        cart.filter(obj => obj.name.startsWith('item_'));

    //TODO: Add styling
    return (
        <div>
            Shopping Cart
            <ul>
                {itemCookies.map((item, index) => (
                    <li key={index}>{item.name} : {item.value}</li>
                ))}
            </ul>
        </div>
  );
}