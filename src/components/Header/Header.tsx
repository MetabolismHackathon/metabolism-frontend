import { SignOutButton } from '../SignOutButton';
import { IHeaderProps } from './HeaderProps';
import styles from './Header.module.scss';
export const Header: React.FC<IHeaderProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <SignOutButton />
    </div>
  );
};
