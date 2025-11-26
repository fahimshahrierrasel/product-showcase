import { api } from '@/lib/api';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Tokyo Device Hub - Premium Electronics in Tokyo',
  description: 'Discover the latest in technology and electronics at Tokyo Device Hub.',
};

export default async function Home() {
  const t = await getTranslations('home');
  
  const [homeInfo, featuredProducts, newArrivals, bestSellers, categories] = await Promise.all([
    api.getHomeInfo().catch(() => ({ slides: [] })),
    api.getProducts({ featured: true }).catch(() => []),
    api.getProducts({ newArrival: true }).catch(() => []),
    api.getProducts({ bestSeller: true }).catch(() => []),
    api.getCategories().catch(() => []),
  ]);

  return (
    <main>
      <HeroSection slides={homeInfo.slides} />
      
      {/* Exciting Offers */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('offers.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Static Offers for now, could be dynamic */}
          <div className="bg-gray-100 p-8 rounded-lg flex flex-col justify-between h-64">
            <div>
              <h3 className="text-xl font-bold mb-2">MacBook Pro M3</h3>
              <p className="text-gray-600 text-sm">Professional laptop with M3 chip</p>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs font-semibold bg-white px-2 py-1 rounded">{t('offers.limitedTime')}</span>
              <Button variant="link" className="p-0 h-auto font-semibold">{t('offers.bookNow')}</Button>
            </div>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg flex flex-col justify-between h-64">
            <div>
              <h3 className="text-xl font-bold mb-2">Samsung Galaxy S24</h3>
              <p className="text-gray-600 text-sm">Latest Android flagship device</p>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs font-semibold bg-white px-2 py-1 rounded">{t('offers.exclusive')}</span>
              <Button variant="link" className="p-0 h-auto font-semibold">{t('offers.bookNow')}</Button>
            </div>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg flex flex-col justify-between h-64">
            <div>
              <h3 className="text-xl font-bold mb-2">AirPods Pro</h3>
              <p className="text-gray-600 text-sm">Premium wireless earbuds</p>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs font-semibold bg-white px-2 py-1 rounded">{t('offers.bestSeller')}</span>
              <Button variant="link" className="p-0 h-auto font-semibold">{t('offers.bookNow')}</Button>
            </div>
          </div>
        </div>
      </section>

      <CategorySection categories={categories} />

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{t('featured.title')}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">{t('featured.all')}</Button>
            <Button variant="ghost" size="sm">{t('featured.newArrivals')}</Button>
            <Button variant="ghost" size="sm">{t('featured.bestSellers')}</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">{t('featured.viewAll')}</Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('contact.title')}</h2>
            <p className="text-gray-600 text-lg">{t('contact.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Call Us Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl mb-6 w-fit">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('contact.call.title')}</h3>
              <a 
                href={`tel:${t('contact.call.number').replace(/[^0-9+]/g, '')}`}
                className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors block mb-2"
              >
                {t('contact.call.number')}
              </a>
              <p className="text-sm text-gray-500">{t('contact.call.hours')}</p>
            </div>

            {/* Email Us Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl mb-6 w-fit">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('contact.email.title')}</h3>
              <a 
                href={`mailto:${t('contact.email.address')}`}
                className="text-green-600 font-semibold text-lg hover:text-green-700 transition-colors block mb-2"
              >
                {t('contact.email.address')}
              </a>
              <p className="text-sm text-gray-500">{t('contact.email.response')}</p>
            </div>

            {/* Visit Store Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl mb-6 w-fit">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('contact.visit.title')}</h3>
              <Link href="/contact">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold mb-2">
                  {t('contact.visit.action')}
                </Button>
              </Link>
              <p className="text-sm text-gray-500">{t('contact.visit.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
