import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Product } from "@/app/types/productInterface";
import Link from "next/link";
import Image from "next/image";

export function ProductCard({product}: {product: Product}) {
  return (
    <Card className="relative cursor-pointer mx-auto w-full sm:max-w-sm pt-0 rounded-2xl overflow-hidden gap-0">
      <Link href={`/productdetails/${product._id}`} >
        <Image
        src={product.imageCover}
        alt={product.title}
        width={400}
        height={300}
        // loading="lazy" 
        className="object-cover aspect-square text-center mx-auto"
      />
      <CardHeader className="pt-2">
          <div className="flex items-center justify-between w-full ">
            <Badge variant="secondary" className="text-xs px-2 py-1">
              <svg className="w-5 h-5 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" /></svg>
              {product.ratingsAverage} out of 5 ({product.ratingsQuantity})
            </Badge>
            <div className="relative h-6 overflow-hidden w-32">
            <ul 
            className={product.priceAfterDiscount !== undefined && product.quantity !== undefined && product.quantity < 100 ?
             'text-right animate-scroll-up space-y-1' 
             :
             'text-right space-y-1'}>
              {product.priceAfterDiscount !== undefined && (
                <li className="text-sm font-medium text-green-600 whitespace-nowrap">
                  {Math.round((product.priceAfterDiscount / product.price) * 100)}% OFF
                </li>
              )}
              {product.quantity !== undefined && product.quantity < 100 && (
                <li className="text-sm font-medium text-red-600 whitespace-nowrap">
                  Selling Out Fast
                </li>
              )}
              {product.priceAfterDiscount !== undefined && (
                <li className="text-sm font-medium text-green-600 whitespace-nowrap">
                  {Math.round((product.priceAfterDiscount / product.price) * 100)}% OFF
                </li>
              )}
              {product.quantity !== undefined && product.quantity < 100 && (
                <li className="text-sm font-medium text-red-600 whitespace-nowrap">
                  Selling Out Fast
                </li>
              )}
            </ul>
            </div>
          </div>
      </CardHeader >
      <CardAction  className="absolute px-2.5 w-full top-2.5 right-0 left-0 flex items-center justify-between">
        {product.priceAfterDiscount !== undefined && product.priceAfterDiscount < product.price &&
          <Badge
          className="px-3 bg-green-50 text-green-800 border border-primary">On Sale!</Badge>
        }
      </CardAction>
      {/* content */}
      <CardContent>
        <CardTitle className="line-clamp-1" title={product.title}>{product.title.split(' ').slice(0,4).join(' ')}</CardTitle>
        <CardDescription title={product.description} className="pt-3 mb-2 line-clamp-2 max-h-13">
        {product.description?.length 
            ? product.description
            : 'No description available'}
        </CardDescription>
      </CardContent>
      </Link>
      {/* footer */}
      <CardFooter className="flex items-center justify-between pt-4 sm:pt-0 mt-auto">
        {product.priceAfterDiscount !== undefined && product.priceAfterDiscount < product.price ?
         <p className="text-lg font-bold whitespace-nowrap text-right truncate">EGP  {product.priceAfterDiscount} <span className="line-through text-gray-300 font-normal">{product.price}</span></p> 
         : 
         <p className="text-lg font-bold whitespace-nowrap text-right truncate"> EGP {product.price}</p>
         }
        <div className="flex gap-2">
         {/* add to favourite */}
          <CardAction className="flex self-center items-center justify-center xl:absolute xl:top-68 xl:right-5">
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
          </CardAction>
          <Button className="inline-flex items-center  text-white bg-primary hover:bg-green-900 cursor-pointer focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-sm px-3 py-2 focus:outline-none">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" /></svg>
          Add to cart
        </Button>
        </div>
        
      </CardFooter>
    </Card>
  )
}
