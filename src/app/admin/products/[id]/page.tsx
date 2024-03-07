import {fetchProduct} from "@/actions/products";
import ProductCard from "@/app/components/ProductCard";

export default async function Page({params} : {params:any}) {
    const {id} = params;
    const product = await fetchProduct({id: parseInt(id as string)});
    return (<>
            {/*{product && <ProductCard product={product} noAction={true}/>}*/}
        </>
    )
}