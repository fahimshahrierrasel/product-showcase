import { api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { SortDropdown } from '@/components/product/SortDropdown';
import { Laptop, Smartphone, Tablet, Watch, Headphones, Cable, Camera, Gamepad } from 'lucide-react';

// Map categories for sidebar (could be dynamic)
const categories = [
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Smartphones', slug: 'smartphones' },
  { name: 'Tablets', slug: 'tablets' },
  { name: 'Smartwatches', slug: 'smartwatches' },
  { name: 'Audio', slug: 'audio' },
  { name: 'Cameras', slug: 'cameras' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'Accessories', slug: 'accessories' },
];

export const metadata = {
  title: 'All Products | TechStore',
  description: 'Browse our extensive collection of premium electronics.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
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
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Filters</h2>
            <FilterSidebar categories={categories} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">All Products</h1>
            <SortDropdown />
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
