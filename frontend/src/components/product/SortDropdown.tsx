'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from 'next-intl';

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';
  const t = useTranslations('sort');

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">{t('newest')}</SelectItem>
        <SelectItem value="price_asc">{t('priceLowHigh')}</SelectItem>
        <SelectItem value="price_desc">{t('priceHighLow')}</SelectItem>
        <SelectItem value="name_asc">{t('nameAZ')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
