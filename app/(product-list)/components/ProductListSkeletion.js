import styles from './ProductListSkeleton.module.css';

export default function ProductListSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.image} />
          <div className={styles.text} />
          <div className={styles.textShort} />
          <div className={styles.row}>
            <div className={styles.badge} />
            <div className={styles.badgeSmall} />
          </div>
        </div>
      ))}
    </div>
  );
}
