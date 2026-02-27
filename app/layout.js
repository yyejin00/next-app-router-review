import Header from '@/components/Header/Header';
import styles from './layout.module.css';
import './globals.css';
import { ThemeProvider } from '@/contexts/themeContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <div className={styles.container}>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
