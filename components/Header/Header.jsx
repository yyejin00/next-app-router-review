import Link from 'next/link';
import logoWhite from '@/assets/logo-white.svg';
import settingWhite from '@/assets/setting-white.svg';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <img src={logoWhite.src} alt="CodeitMall" width={155} height={29} />
        </Link>
        <Link href="/settings">
          <img src={settingWhite.src} alt="Settings" width={20} height={20} />
        </Link>
      </div>
    </header>
  );
}
