import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatYen } from '@/lib/utils/currency';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('products');
  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `http://localhost:5000${product.image}`;

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold text-primary">{formatYen(product.price)}</p>
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-sm text-muted-foreground line-through">{formatYen(product.originalPrice)}</p>
          )}
        </div>
        {!product.isStockAvailable && (
          <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-1">
            {t('outOfStock')}
          </span>
        )}
        <div 
          className="text-muted-foreground line-clamp-2 mt-2 text-sm"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>{t('viewDetails')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
