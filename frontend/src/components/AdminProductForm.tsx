'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '@/types';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdminProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

export function AdminProductForm({ product, onSuccess }: AdminProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    image: '',
    isActive: true,
    meta_title: '',
    meta_description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        image: product.image,
        isActive: product.isActive,
        meta_title: product.meta_title || '',
        meta_description: product.meta_description || '',
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;

      if (file) {
        setUploading(true);
        imageUrl = await api.uploadImage(file);
        setUploading(false);
      }

      const dataToSubmit = { ...formData, image: imageUrl, price: Number(formData.price) };

      if (product) {
        await api.updateProduct(product.id, dataToSubmit);
        toast.success('Product updated');
      } else {
        await api.createProduct(dataToSubmit);
        toast.success('Product created');
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Operation failed');
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (HTML supported)</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="h-32" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input id="image" type="file" onChange={handleFileChange} accept="image/*" />
          {formData.image && <p className="text-xs text-muted-foreground">Current: {formData.image}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="isActive">Status</Label>
          <Select 
            value={formData.isActive ? 'active' : 'inactive'} 
            onValueChange={(val) => setFormData(prev => ({ ...prev, isActive: val === 'active' }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta_title">Meta Title</Label>
          <Input id="meta_title" name="meta_title" value={formData.meta_title} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea id="meta_description" name="meta_description" value={formData.meta_description} onChange={handleChange} />
        </div>

        <Button type="submit" disabled={uploading} className="w-full">
          {uploading ? 'Uploading...' : (product ? 'Update Product' : 'Create Product')}
        </Button>
      </form>
    </div>
  );
}
