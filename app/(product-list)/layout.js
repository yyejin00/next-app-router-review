import SearchForm from './components/SearchForm';
import styles from './layout.module.css';

export default function ProductListLayout({ children }) {
  return (
    <div>
      <SearchForm />
      <div className={styles.container}>{children}</div>
    </div>
  );
}
