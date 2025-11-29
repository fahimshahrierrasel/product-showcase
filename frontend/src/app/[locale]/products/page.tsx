import { api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { SortDropdown } from '@/components/product/SortDropdown';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('products');
  return {
    title: `${t('title')} | TechStore`,
    description: 'Browse our extensive collection of premium electronics.',
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const t = await getTranslations('products');
  const tFilters = await getTranslations('filters');


  const products = await api.getProducts({
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    isStockAvailable: params.isStockAvailable === 'true',
    sort: params.sort as string,
    search: params.search as string,
  }).catch(() => []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">{tFilters('title')}</h2>
            <FilterSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">{t('title')}</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden flex-1 sm:flex-none">
                    <Filter className="w-4 h-4 mr-2" />
                    {tFilters('title')}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>{tFilters('title')}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 px-1">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
              <SortDropdown />
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600">{t('notFound')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
