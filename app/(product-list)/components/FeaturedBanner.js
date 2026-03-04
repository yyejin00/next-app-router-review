import { getFeaturedBanner } from '@/lib/data';
import styles from './FeaturedBanner.module.css';

export default async function FeaturedBanner() {
  const data = await getFeaturedBanner();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.message}>{data.message}</div>
      </div>
      <a href="#" className={styles.cta}>
        {data.ctaText}
      </a>
    </div>
  );
}
