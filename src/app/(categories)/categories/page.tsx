'use client'
import CategoryCard from '@/app/_components/CategoryCard/CategoryCard';
import getCategories from '@/services/categories/getCategories';
import { useQuery } from '@tanstack/react-query';
import { Category } from '@/app/types/productInterface';
import Loader from '@/Loader/Loader';
import ErrorComponent from '@/app/_components/Error/Error';

function AllCategories() {
  const {data: categories, isLoading, isError, error } =  useQuery<Category[]>({
    queryKey: ['get-categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    }
  });
  // console.log(categories);
  
  if (isLoading) return <Loader />

  if (isError) return <ErrorComponent message={error.message} showContactButton={false} />
   
  
  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-br from-green-100 to-emerald-100 rounded-full">
                <span className="text-sm font-medium text-green-600">Categories</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Categories</h1>
            <p className="text-gray-600 max-w-2xl">
              Explore our curated selection of categories
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="font-medium">{categories?.length} Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="mx-auto container px-4 py-6 gap-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {
        categories?.map((category: Category) => <CategoryCard key={category._id} category={category}/>)
      }
    </div>  
    </div>
     
  )
}

export default AllCategories