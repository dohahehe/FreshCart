'use client'
import getProducts from "@/services/products/getProducts";
import { ProductCard } from "../_components/ProductCard/ProductCard";
import { Product } from "../types/productInterface";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/Loader/Loader";
import ErrorComponent from "../_components/Error/Error";

export default function Products() {
   const {data: allProducts, isLoading, isError, error} = useQuery<Product[]>({
    queryKey: ['get-products'],
    queryFn: getProducts
  })

  if(isLoading) return <Loader />

  if (isError) return <ErrorComponent message={error.message} showContactButton={false} />
    
    return (
      <div className="w-full">
        {/* Header */}
        <div className="w-full bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-br from-green-100 to-emerald-100 rounded-full">
                  <span className="text-sm font-medium text-green-600">Products</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
              <p className="text-gray-600 max-w-2xl">
                Explore our curated selection of products
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium">{allProducts?.length} Products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mx-auto container px-4 py-6 gap-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {
            allProducts?.map((product) => <ProductCard key={product._id} product={product}/>)
          }
        </div>   
      <div/> 
      </div>

    );
}
