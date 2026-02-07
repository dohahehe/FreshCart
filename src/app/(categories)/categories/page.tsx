'use client'
import CategoryCard from '@/app/_components/CategoryCard/CategoryCard';
import getCategories from '@/services/categories/getCategories';
import { useQuery } from '@tanstack/react-query';
import { Category } from '@/app/types/productInterface';
import Loader from '@/Loader/Loader';
import Error from '@/app/error';

function AllCategories() {
  const {data: categories, isLoading, isError } =  useQuery<Category[]>({
    queryKey: ['get-categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    }
  });
  // console.log(categories);
  
  if (isLoading) return <Loader />

  if (isError) return <Error />
   
  
  return (
    <div className="mx-auto container px-4 py-6 gap-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {
        categories?.map((category: Category) => <CategoryCard key={category._id} category={category}/>)
      }
    </div>   
  )
}

export default AllCategories