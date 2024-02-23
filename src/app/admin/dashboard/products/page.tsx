import SelectCategory from "@/app/components/SelectCategory";
import ClientProductsList from "@/app/components/clientWrappers/ClientProductsList";
export default function ProductsPage(){
    return <div>
        <h1>Products</h1>
        <ClientProductsList >
            <SelectCategory/>
        </ClientProductsList>
    </div>
}