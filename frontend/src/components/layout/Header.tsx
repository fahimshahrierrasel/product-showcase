'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';

import { useEffect, useState } from 'react';
import { Category } from '@/types';
import { api } from '@/lib/api';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Use Next.js API route proxy (runs on server, can use Docker service names)
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Tokyo Device Hub"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-bold text-black hidden sm:inline">
              {t('logo')}
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="hover:text-black transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-64">
              <Input
                type="search"
                placeholder={t('search')}
                className="pl-4 pr-10 rounded-full bg-gray-100 border-transparent focus:bg-white transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="w-5 h-5" />
            </Button>

            {/* Language Switcher */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => switchLocale('en')}
                    className={locale === 'en' ? 'bg-gray-100' : ''}
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => switchLocale('ja')}
                    className={locale === 'ja' ? 'bg-gray-100' : ''}
                  >
                    日本語
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="hidden md:block">
              <Link href="/contact">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('contact')}
                </Button>
              </Link>
            </div>
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">{t('logo')}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-4">
                    {categories.map((category) => (
                      <SheetClose asChild key={category.id}>
                        <Link
                          href={`/category/${category.slug}`}
                          className="text-lg font-medium text-gray-600 hover:text-black transition-colors py-2 px-2 hover:bg-gray-50 rounded-md"
                        >
                          {category.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="h-px bg-gray-100" />

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Language</span>
                      <div className="flex gap-2">
                        <Button
                          variant={locale === 'en' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => switchLocale('en')}
                        >
                          EN
                        </Button>
                        <Button
                          variant={locale === 'ja' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => switchLocale('ja')}
                        >
                          JP
                        </Button>
                      </div>
                    </div>

                    <SheetClose asChild>
                      <Link href="/contact">
                        <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-full">
                          <Phone className="w-4 h-4 mr-2" />
                          {t('contact')}
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
