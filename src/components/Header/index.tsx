import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d, MMMM', {
    locale: ptBr,
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="logo" />

      <p>O melhor para voce ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  );
}
