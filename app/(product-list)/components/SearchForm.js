import styles from './SearchForm.module.css';

export default function SearchForm() {
  return (
    <form action="/search" className={styles.form}>
      <input
        name="q"
        type="text"
        placeholder="찾고 싶은 상품을 검색해보세요."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        검색
      </button>
    </form>
  );
}
