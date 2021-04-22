import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import Link from 'next/link';

import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d, MMMM', {
    locale: ptBr,
  });

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="logo" />
        </a>
      </Link>

      <p>O melhor para voce ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  );
}
