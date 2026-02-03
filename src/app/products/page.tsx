import { ProductCard } from "../_components/ProductCard/ProductCard";
import { Product } from "../types/productInterface";

export default async function Products() {
   let response = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
      method: 'GET',
      // cache: 'force-cache'  SSG
      // cache: 'no-store'     SSR
      next: {
        revalidate: 60      // ISR
      }
    });
    let {data: allProducts}: {data: Product[]}= await response.json();
    
    return (
     <>
      <div className="mx-auto container max-w-7xl py-6 gap-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          allProducts.map((product) => <ProductCard key={product._id} product={product}/>)
        }
      </div>   
    </> 
    );
}
