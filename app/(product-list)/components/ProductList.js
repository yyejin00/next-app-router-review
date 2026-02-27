import Link from 'next/link';
import styles from './ProductList.module.css';
import StarRating from '@/components/StarRating';
import heartIcon from '@/assets/heart.svg';

export default function ProductList({ className = '', products }) {
  return (
    <ul className={`${styles.productList} ${className}`}>
      {products.map((product) => (
        <li key={product.id}>
          <Link className={styles.product} href={`/products/${product.id}`}>
            <div className={styles.imageContainer}>
              <img
                src={product.imgUrl}
                alt={product.name}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <div>
                <span className={styles.name}>{product.name}</span>
                <div className={styles.prices}>
                  <span className={styles.originalPrice}>
                    {product.price.toLocaleString()}원
                  </span>
                  {product.salePrice.toLocaleString()}원
                </div>
              </div>
              <hr className={styles.divider} />
              <div>
                <div className={styles.starRating}>
                  <StarRating value={product.starRating} />
                  {product.starRatingCount.toLocaleString()}
                </div>
                <div className={styles.likeCount}>
                  <img src={heartIcon.src} alt="좋아요" />
                  {product.likeCount.toLocaleString()}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
