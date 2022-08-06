import { useAuth } from 'src/network';
import { ISignOutButtonProps } from './SignOutButtonProps';
import styles from './SignOutButton.module.scss';
export const SignOutButton: React.FC<ISignOutButtonProps> = () => {
  const { logout } = useAuth();
  const signOutHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    logout();
  };
  return (
    <button className={styles.signOutButton} onClick={signOutHandler}>
      Sign Out
    </button>
  );
};
