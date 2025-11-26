'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="/logo.png" 
                alt="Tokyo Device Hub" 
                width={40} 
                height={40}
                className="object-contain brightness-0 invert"
              />
              <h3 className="text-xl font-bold text-white">{t('brand')}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('contactInfo.title')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span>{t('contactInfo.phone')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span>{t('contactInfo.email')}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0" />
                <span style={{ whiteSpace: 'pre-line' }}>{t('contactInfo.address')}</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('support.title')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('support.contact')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('support.booking')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('support.faq')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('support.productInfo')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('support.warranty')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
