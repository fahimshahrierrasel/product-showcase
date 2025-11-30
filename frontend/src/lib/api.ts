import { Product, ProductFormData, HeroSlide, HomeInfo, Category } from '@/types';

// Use different API URLs for server-side (Docker) and client-side (browser)
export const getApiUrl = () => {
  // Server-side: use internal Docker service name
  if (typeof window === 'undefined') {
    return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  }
  // Client-side: use public URL (localhost for browser)
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

export const API_URL = getApiUrl();

export const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = API_URL.replace('/api', '');
  return `${baseUrl}${path}`;
};

export const api = {
  getProducts: async (params?: { 
    featured?: boolean; 
    newArrival?: boolean; 
    bestSeller?: boolean; 
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    isStockAvailable?: boolean;
    sort?: string;
    search?: string;
  }): Promise<Product[]> => {
    const query = new URLSearchParams();
    if (params?.featured) query.append('featured', 'true');
    if (params?.newArrival) query.append('newArrival', 'true');
    if (params?.bestSeller) query.append('bestSeller', 'true');
    if (params?.category) query.append('category', params.category);
    if (params?.minPrice) query.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) query.append('maxPrice', params.maxPrice.toString());
    if (params?.isStockAvailable) query.append('isStockAvailable', 'true');
    if (params?.sort) query.append('sort', params.sort);
    if (params?.search) query.append('search', params.search);
    
    const res = await fetch(`${API_URL}/products?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getCategories: async (): Promise<Category[]> => {
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  getProduct: async (id: string): Promise<Product> => {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  getHomeInfo: async (): Promise<HomeInfo> => {
    const res = await fetch(`${API_URL}/home-info`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch home info');
    return res.json();
  },

  getAdminProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${API_URL}/products/admin/all`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch admin products');
    return res.json();
  },

  createProduct: async (data: ProductFormData): Promise<Product> => {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  updateProduct: async (id: number, data: ProductFormData): Promise<Product> => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  deleteProduct: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
  },

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload image');
    const data = await res.json();
    return data.filePath;
  },
};
