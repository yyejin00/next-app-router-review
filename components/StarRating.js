import starFilledIcon from '@/assets/star-filled.svg';
import starEmptyIcon from '@/assets/star-empty.svg';
import styles from './StarRating.module.css';

const RATINGS = [1, 2, 3, 4, 5];

export default function StarRating({ value = 1, size = 16 }) {
  const sizeVar = typeof size === 'number' ? `${size}px` : size;

  return (
    <span style={{ '--star-size': sizeVar }} className={styles.starRating}>
      {RATINGS.map((rating) =>
        value >= rating ? (
          <img
            className={styles.starIcon}
            key={rating}
            src={starFilledIcon.src}
            alt="★"
          />
        ) : (
          <img
            className={styles.starIcon}
            key={rating}
            src={starEmptyIcon.src}
            alt="✩"
          />
        ),
      )}
    </span>
  );
}
