'use client'
import getProducts from "@/services/products/getProducts";
import { ProductCard } from "../_components/ProductCard/ProductCard";
import { Product } from "../types/productInterface";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/Loader/Loader";

export default function Products() {
   const {data: allProducts, isLoading, isError} = useQuery<Product[]>({
    queryKey: ['get-products'],
    queryFn: getProducts
  })

  if(isLoading) return <Loader />
    
    return (
     <>
      <div className="mx-auto container px-4 py-6 gap-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {
          allProducts?.map((product) => <ProductCard key={product._id} product={product}/>)
        }
      </div>   
    </> 
    );
}
