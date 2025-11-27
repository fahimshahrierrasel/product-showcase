import { AdminProductList } from '@/components/AdminProductList';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admin.metadata' });
  return {
    title: t('title'),
  };
}

export default async function AdminPage() {
  const t = await getTranslations('admin');
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      <AdminProductList />
    </div>
  );
}
