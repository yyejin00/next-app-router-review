import styles from './BannerSkeleton.module.css';

export default function BannerSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.left}>
        <div className={styles.titleBar} />
        <div className={styles.messageBar} />
      </div>
    </div>
  );
}
