import ClientProductsAdd from "@/app/components/clientWrappers/ClientProductsAdd";
import SelectCategory from "@/app/components/SelectCategory";

export default function Page(){
    return (
        <ClientProductsAdd>
            <SelectCategory/>
        </ClientProductsAdd>
    )
}