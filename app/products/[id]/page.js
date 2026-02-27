import ProductInfo from './components/ProductInfo';
import SizeReviewList from './components/SizeReviewList';
import { getProduct, getSizeReviews } from '@/lib/data';
import styles from './page.module.css';

export default async function Product({ params }) {
  const { id } = await params;
  const [product, { results: sizeReviews }] = await Promise.all([
    getProduct(id),
    getSizeReviews(id),
  ]);

  return (
    <>
      <h1 className={styles.name}>
        {product.name}
        <span className={styles.englishName}>{product.englishName}</span>
      </h1>
      <div className={styles.content}>
        <img
          width={450}
          height={500}
          src={product.imgUrl}
          alt={product.name}
          className={styles.image}
        />
        <div className={styles.info}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제품 정보</h2>
            <ProductInfo product={product} />
          </section>
          {sizeReviews?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>사이즈 추천</h2>
              <SizeReviewList sizeReviews={sizeReviews} />
            </section>
          )}
        </div>
      </div>
    </>
  );
}
