import { getInitialProducts } from '@/lib/data';
import ProductsLists from '../components/ProductsLists';
import LoadMoreProductList from '../components/LoadMoreProductList';

export default async function Search({ searchParams }) {
  const { q } = await searchParams;
  const { results: products, next } = await getInitialProducts(q);
  return (
    <div>
      <LoadMoreProductList
        key={q || 'all'}//false 값이 될 경우 all 갑ㅅ을 줘서 안정적으로 변화
        initialProducts={products}
        initialNext={next}
      />
    </div>
  );
}
