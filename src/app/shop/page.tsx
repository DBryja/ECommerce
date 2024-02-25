import ProductsList from "@/app/components/ProductsList";
import ClientProductsList from "@/app/components/clientWrappers/ClientProductsList";
import SelectCategory from "@/app/components/SelectCategory";

export default function Shop() {


    return (
        <div>
            <h1>Shop</h1>
                <ClientProductsList >
                    <SelectCategory/>
                </ClientProductsList>
        </div>
    )
}