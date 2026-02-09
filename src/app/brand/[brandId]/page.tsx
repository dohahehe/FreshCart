'use client'
import ErrorComponent from "@/app/_components/Error/Error"
import { ProductCard } from "@/app/_components/ProductCard/ProductCard"
import { Product } from "@/app/types/productInterface"
import Loader from "@/Loader/Loader"
import getSingleBrand from "@/services/brands/getSingleBrand"
import getProductsByBrands from "@/services/products/getProductsByBrands"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

function BrandDetails() {
    const params = useParams()
    const id = params.brandId as string
    
    // fetch brand
    const {data:brand, isLoading, isError, error} = useQuery({
        queryKey: ['brand', id],
        queryFn: () => getSingleBrand(id),
        refetchOnMount: 'always',
    })

    //fetch products
    const {data: productsByBrands, isLoading: productsLoading, isError: productsIsError, error: productsError} = useQuery<Product[]>({
        queryKey: ['get-products-by-brand'],
        queryFn: () => getProductsByBrands(id),
        refetchOnMount: 'always',
    })

    console.log(productsByBrands);

    if (isLoading || productsLoading) return <Loader />

    if (isError) return <ErrorComponent message={error.message} showContactButton={false} />
    
    if (productsIsError) return <ErrorComponent message={productsError.message} showContactButton={false} />

  return (
     <div className="w-full">
      {/* Header */}
      <div className="w-full bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-br from-green-100 to-emerald-100 rounded-full">
                <span className="text-sm font-medium text-green-600">Brand</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{brand?.name}</h1>
            <p className="text-gray-600 max-w-2xl">
              Explore our curated selection of {brand?.name.toLowerCase()} products
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="font-medium">{productsByBrands?.length} Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Popular Products
              </h2>
              <p className="text-gray-600 text-sm">
                Best sellers in this brand
              </p>
            </div>
          </div>

          {productsByBrands?.length === 0 ? (
            <div className="container mx-auto px-4 py-4">
              <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3">
                    <div className="w-24 h-24 mx-auto bg-linear-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
            
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      New products Coming Soon
                    </h2>
              
                  <div className="space-y-4 ">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-600">
                        We're actively adding new {brand?.name?.toLowerCase()} products to our collection
                      </p>
                    </div>
                
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-600">
                        Check back in a few days 
                      </p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {productsByBrands?.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Category Information */}
        <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">About {brand?.name}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Premium {brand?.name} Experience
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Quality Guarantee</h4>
                    <p className="text-gray-300">
                      Every product is carefully curated and quality checked by our experts.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Fast Delivery</h4>
                    <p className="text-gray-300">
                      Free shipping on orders over 500 EGP. 1-3 business days delivery.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Secure Shopping</h4>
                    <p className="text-gray-300">
                      Your payments are protected with 256-bit SSL encryption.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Easy Returns</h4>
                    <p className="text-gray-300">
                      30-day return policy. No questions asked returns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default BrandDetails