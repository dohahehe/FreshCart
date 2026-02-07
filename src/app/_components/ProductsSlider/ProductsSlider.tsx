'use client'
import {
  Card,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

export default function ProductsSlider({images}: {images: string[]}) {
  return (
    <Carousel 
        className="w-full h-full"
        opts={{
            loop: true,
        }}
        plugins={[
            Autoplay({
            delay: 2000,
            }),
        ]}
    >
        <CarouselContent>
            {images?.map((src) => (
            <CarouselItem key={src}>
                <div className="p-1">
                <Card className="flex items-center justify-center">
                    <Image
                        src={src}
                        width={600}
                        height={500}
                        alt="any"
                        // loading="lazy" 
                        className="object-cover aspect-square md:aspect-auto object-center"
                    />
                </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>
  )
}
