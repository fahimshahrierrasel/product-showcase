import { AdminProductList } from '@/components/AdminProductList';

export const metadata = {
  title: 'Admin Dashboard - Product Management',
};

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <AdminProductList />
    </div>
  );
}
