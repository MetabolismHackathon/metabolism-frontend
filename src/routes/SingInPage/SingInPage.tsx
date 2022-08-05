import { useHistory } from 'react-router-dom';
import { ISingInPageProps } from './SingInPageProps';
import styles from './SingInPage.module.scss';
export const SingInPage: React.FC<ISingInPageProps> = () => {
  const history = useHistory();
  const signInButtonHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    history.push('/');
  };
  return (
    <div className={styles.container}>
      <div>
        <button className={styles.signinButton} onClick={signInButtonHandler}>
          Sing In with Metamask
        </button>
      </div>
    </div>
  );
};
