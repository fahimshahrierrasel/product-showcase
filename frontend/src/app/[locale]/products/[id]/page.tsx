import { api } from '@/lib/api';
import { ProductGallery } from '@/components/product/ProductGallery';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Star, Heart, Mail, Phone, Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await api.getProduct(id);
  const similarProducts = await api.getProducts({ category: product.categoryId?.toString() });
  const t = await getTranslations('productDetails');

  // Filter out current product from similar products
  const relatedProducts = similarProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        {t('home')} {'>'} {t('products')} {'>'} <span className="text-black font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <ProductGallery
          mainImage={product.image}
          images={product.images?.map(img => img.url) || []}
        />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.price > 1000 && (
              <span className="text-lg text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
            )}
            {product.price > 1000 && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded">{t('off', { percent: 20 })}</span>
            )}
          </div>

          <div className="prose prose-sm mb-8">
            <p>{product.description}</p>
          </div>

          {/* Key Specs Preview */}
          {product.specifications && (
            <div className="mb-8">
              <h3 className="font-semibold mb-4">{t('specifications')}</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2 pr-2">
                    <span className="text-gray-500">{key}</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('contactBooking')}</h3>
            <Button className="w-full bg-black text-white hover:bg-gray-800 h-12 text-lg">
              <Phone className="w-4 h-4 mr-2" />
              {t('call', { number: '+1 (555) 123-4567' })}
            </Button>
            <Button variant="outline" className="w-full h-12">
              <Mail className="w-4 h-4 mr-2" />
              {t('email', { email: 'sales@techstore.com' })}
            </Button>
          </div>

          {/* Tags */}
          <div className="mt-8 flex gap-2 items-center">
            <span className="text-sm text-gray-500">{t('tags')}</span>
            <div className="flex gap-2">
              <span className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-600">Tech</span>
              <span className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-600">Electronics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">{t('similarProducts')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
