import {fetchProduct} from "@/actions/products";
import ProductCard from "@/app/components/ProductCard";

export default async function Page({searchParams}: { searchParams: {id: number}}) {
    const product = await fetchProduct(searchParams);
    return (<>
        {product && <ProductCard product={product} noAction={true}/>}
    </>
    )
}