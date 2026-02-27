import ThemeSelect from './components/ThemeSelect';
import styles from './page.module.css';

export default function Settings() {
  return (
    <div>
      <h1 className={styles.title}>설정</h1>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>테마 설정</h2>
        <ThemeSelect />
      </section>
    </div>
  );
}
