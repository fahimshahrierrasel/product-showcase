'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Map = dynamic(() => import('@/components/contact/Map'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Map...</div>
});

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">{t('form.title')}</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t('form.fullName')}</label>
              <Input placeholder={t('form.fullNamePlaceholder')} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('form.email')}</label>
              <Input type="email" placeholder={t('form.emailPlaceholder')} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('form.phone')}</label>
              <Input placeholder={t('form.phonePlaceholder')} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('form.subject')}</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option>{t('form.subjects.productInquiry')}</option>
                <option>{t('form.subjects.bookingRequest')}</option>
                <option>{t('form.subjects.support')}</option>
                <option>{t('form.subjects.other')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('form.message')}</label>
              <Textarea placeholder={t('form.messagePlaceholder')} className="h-32" />
            </div>
            <Button className="w-full bg-black text-white hover:bg-gray-800">{t('form.submit')}</Button>
          </form>
        </div>

        {/* Info & Map */}
        <div className="space-y-8">
          {/* Get in Touch */}
          <div className="bg-white p-8 rounded-lg border shadow-sm">
            <h2 className="text-2xl font-bold mb-6">{t('info.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('info.phone')}</h3>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('info.email')}</h3>
                  <p className="text-sm text-gray-600">info@techshowcase.com</p>
                  <p className="text-sm text-gray-600">sales@techshowcase.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('info.hours')}</h3>
                  <p className="text-sm text-gray-600">{t('info.hoursMonFri')}</p>
                  <p className="text-sm text-gray-600">{t('info.hoursSatSun')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Store Locations */}
          <div className="bg-white p-8 rounded-lg border shadow-sm">
            <h2 className="text-2xl font-bold mb-6">{t('locations.title')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {t('locations.downtown')}
                </h3>
                <p className="text-sm text-gray-600 ml-6">
                  123 Tech Avenue, Suite 100<br />
                  New York, NY 10001
                </p>
                <p className="text-sm text-gray-600 ml-6 mt-1">(555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {t('locations.mall')}
                </h3>
                <p className="text-sm text-gray-600 ml-6">
                  456 Shopping Center Blvd<br />
                  Brooklyn, NY 11201
                </p>
                <p className="text-sm text-gray-600 ml-6 mt-1">(555) 987-6543</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-sm border">
        <Map />
      </div>
    </div>
  );
}
