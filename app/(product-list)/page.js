import { get } from '@/lib/fetch';
import { getProduct, getInitialProducts } from '@/lib/data';
import LoadMoreProductList from './components/LoadMoreProductList';

export default async function Home() {
  const { results: products, next } = await getInitialProducts();

  return (
    <div>
      <LoadMoreProductList
        key="all"
        initialProducts={products}
        initialNext={next}
      />
    </div>
  );
}
