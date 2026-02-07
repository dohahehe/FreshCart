'use client'
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./_components/ProductCard/ProductCard";
import {  Product, ProductsApiResponse } from "./types/productInterface";
import getProducts from "@/services/products/getProducts";
import Loader from "@/Loader/Loader";

export default function Home() {
  const {data: allProducts, isLoading, isError} = useQuery<Product[]>({
    queryKey: ['get-products'],
    queryFn: getProducts,
    refetchOnMount: 'always',
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

// SSG: force-cache