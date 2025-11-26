'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface FilterSidebarProps {
  categories?: { name: string; slug: string }[];
  currentCategory?: string;
}

export function FilterSidebar({ categories = [], currentCategory }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [isStockAvailable, setIsStockAvailable] = useState(searchParams.get('isStockAvailable') === 'true');

  useEffect(() => {
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setIsStockAvailable(searchParams.get('isStockAvailable') === 'true');
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');
    
    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');
    
    if (isStockAvailable) params.set('isStockAvailable', 'true');
    else params.delete('isStockAvailable');

    // Reset page if pagination is implemented (not yet)
    // params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('isStockAvailable');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          <Link 
            href="/products" 
            className={`block text-sm ${!currentCategory ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`block text-sm ${currentCategory === cat.slug ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="flex items-center gap-2 mb-4">
          <Input 
            type="number" 
            placeholder="Min" 
            value={minPrice} 
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20"
          />
          <span>-</span>
          <Input 
            type="number" 
            placeholder="Max" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="stock" 
            checked={isStockAvailable} 
            onCheckedChange={(checked) => setIsStockAvailable(checked as boolean)}
          />
          <Label htmlFor="stock">In Stock Only</Label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
        <Button variant="outline" onClick={clearFilters} className="w-full">Clear Filters</Button>
      </div>
    </div>
  );
}
