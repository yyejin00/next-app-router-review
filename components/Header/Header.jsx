import styles from './Header.module.css';
export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/">홈</a>
      <a href="/settings">설정</a>
    </header>
  );
}
