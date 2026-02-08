import { Brand, Category } from '@/app/types/productInterface'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/brand/${brand._id}`} className="block">
      <Card className="group py-0 gap-0 relative overflow-hidden rounded-2xl border-0 bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Image */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <div className="relative">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {brand.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Explore premium collection
            </p>
            
            {/* CTA Button */}
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
              <span>Browse Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </CardContent>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
      </Card>
    </Link>
  )
}

export default BrandCard