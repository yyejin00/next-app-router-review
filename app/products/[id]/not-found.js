import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>페이지를 찾을 수 없습니다</h1>
      <p className={styles.message}>
        요청하신 페이지가 존재하지 않습니다. 주소를 확인해 주세요.
      </p>
    </div>
  );
}
