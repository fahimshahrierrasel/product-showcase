'use client';

import Link from 'next/link';
import { Laptop, Smartphone, Tablet, Watch, Headphones, Cable, Package } from 'lucide-react';
import { Category } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const iconMap: Record<string, any> = {
  laptops: Laptop,
  smartphones: Smartphone,
  tablets: Tablet,
  smartwatches: Watch,
  audio: Headphones,
  accessories: Cable,
};

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {categories.map((cat) => {
                const Icon = iconMap[cat.slug] || Package;
                return (
                  <CarouselItem key={cat.slug} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                    <Link 
                      href={`/category/${cat.slug}`}
                      className="flex flex-col items-center group"
                    >
                      <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow text-gray-600 group-hover:text-black">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-medium text-gray-900">{cat.name}</h3>
                      <p className="text-xs text-gray-500">{cat.productCount || 0} Products</p>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
