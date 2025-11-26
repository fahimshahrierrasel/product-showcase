import { api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { SortDropdown } from '@/components/product/SortDropdown';
import { notFound } from 'next/navigation';

// Map categories for sidebar
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = categories.find(c => c.slug === slug)?.name || slug;
  return {
    title: `${categoryName} | TechStore`,
    description: `Browse our collection of ${categoryName}.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const searchParamsValues = await searchParams;

  const category = categories.find(c => c.slug === slug);
  
  // Ideally we should check if category exists via API, but for now we use the static list
  // or just fetch products and see if any return (or if API throws error)
  
  const products = await api.getProducts({
    category: slug,
    minPrice: searchParamsValues.minPrice ? Number(searchParamsValues.minPrice) : undefined,
    maxPrice: searchParamsValues.maxPrice ? Number(searchParamsValues.maxPrice) : undefined,
    isStockAvailable: searchParamsValues.isStockAvailable === 'true',
    sort: searchParamsValues.sort as string,
    search: searchParamsValues.search as string,
  }).catch(() => []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Filters</h2>
            <FilterSidebar categories={categories} currentCategory={slug} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold capitalize">{category?.name || slug}</h1>
            <SortDropdown />
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600">No products found in this category.</p>
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
