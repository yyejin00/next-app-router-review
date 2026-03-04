import { get } from '@/lib/fetch';
import { getProduct, getInitialProducts } from '@/lib/data';
import LoadMoreProductList from './components/LoadMoreProductList';
import FeaturedBanner from './components/FeaturedBanner';
import { Suspense } from 'react';
import ProductListSkeleton from './components/ProductListSkeletion';
import ProductResults from './components/ProductResults';
import BannerSkeleton from './components/BannerSkeleton';

export default async function Home() {
  return (
    <div>
      <Suspense fallback={<BannerSkeleton />}>
        <FeaturedBanner />
      </Suspense>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductResults />
      </Suspense>
    </div>
  );
}
