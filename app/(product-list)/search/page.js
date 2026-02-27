import { getInitialProducts } from '@/lib/data';
import LoadMoreProductList from '../components/LoadMoreProductList';
import styles from './page.module.css';

export default async function Search({ searchParams }) {
  const { q } = await searchParams;
  const { results: products, next } = await getInitialProducts(q);

  return (
    <div>
      <h2 className={styles.title}>
        <span className={styles.keyword}>{q}</span> 검색 결과
      </h2>
      <LoadMoreProductList
        key={q || 'all'}
        initialProducts={products}
        initialNext={next}
      />
    </div>
  );
}
