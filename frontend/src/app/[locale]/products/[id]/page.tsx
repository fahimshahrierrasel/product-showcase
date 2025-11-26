import { api } from '@/lib/api';
import { ProductGallery } from '@/components/product/ProductGallery';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Star, Heart, Mail, Phone, Check } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await api.getProduct(id);
  const similarProducts = await api.getProducts({ category: product.categoryId?.toString() });

  // Filter out current product from similar products
  const relatedProducts = similarProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        Home {'>'} Products {'>'} <span className="text-black font-medium">{product.name}</span>
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
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.price > 1000 && (
               <span className="text-lg text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
            )}
            {product.price > 1000 && (
               <span className="bg-black text-white text-xs px-2 py-1 rounded">20% OFF</span>
            )}
          </div>

          <div className="prose prose-sm mb-8">
            <p>{product.description}</p>
          </div>

          {/* Key Specs Preview */}
          {product.specifications && (
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Key Specifications</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">{key}</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact for Booking</h3>
            <Button className="w-full bg-black text-white hover:bg-gray-800 h-12 text-lg">
              <Phone className="w-4 h-4 mr-2" />
              Call: +1 (555) 123-4567
            </Button>
            <Button variant="outline" className="w-full h-12">
              <Mail className="w-4 h-4 mr-2" />
              Email: sales@techstore.com
            </Button>
            <Button variant="ghost" className="w-full">
              <Heart className="w-4 h-4 mr-2" />
              Add to Wishlist
            </Button>
          </div>
          
          {/* Tags */}
          <div className="mt-8 flex gap-2">
            <span className="text-sm text-gray-500">Tags:</span>
            <div className="flex gap-2">
               <span className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-600">Tech</span>
               <span className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-600">Electronics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews (Static) */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        <div className="bg-gray-50 p-8 rounded-lg">
           <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl font-bold">4.8</div>
              <div>
                 <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                 </div>
                 <p className="text-sm text-gray-500">Based on 128 reviews</p>
              </div>
           </div>
           
           <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                 <div key={review} className="border-b pb-6 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="font-bold">John Doe</div>
                       <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 fill-current" />
                          ))}
                       </div>
                       <span className="text-xs text-gray-400">January 15, 2025</span>
                    </div>
                    <p className="text-gray-600 text-sm">Amazing product! The quality is top-notch and the delivery was super fast. Highly recommended.</p>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Similar Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
