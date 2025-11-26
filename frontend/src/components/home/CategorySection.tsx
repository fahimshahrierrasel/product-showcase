import Link from 'next/link';
import { Laptop, Smartphone, Tablet, Watch, Headphones, Cable, Package } from 'lucide-react';
import { Category } from '@/types';

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((cat) => {
            const Icon = iconMap[cat.slug] || Package;
            return (
              <Link 
                key={cat.slug} 
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center group"
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow text-gray-600 group-hover:text-black">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-medium text-gray-900">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.productCount || 0} Products</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
