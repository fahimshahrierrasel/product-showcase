export interface ProductImage {
  id: number;
  productId: number;
  url: string;
  altText?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  categoryId?: number;
  userId?: number;
  meta_title?: string;
  meta_description?: string;
  sku?: string;
  specifications?: Record<string, string>;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isStockAvailable?: boolean;
  originalPrice?: number;
  images?: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  specificationTemplate?: string[];
  isActive: boolean;
  productCount?: string | number;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  isActive: boolean;
}

export interface HomeInfo {
  slides: HeroSlide[];
  // Future additions:
  // popups?: any[];
  // features?: any[];
}


export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  category_interest: string;
  message: string;
  productSku?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  categoryId?: number;
  meta_title?: string;
  meta_description?: string;
  specifications?: Record<string, string>;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}
