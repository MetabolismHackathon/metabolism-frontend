import { useHistory, Link } from 'react-router-dom';

import { IUploadArtworkPageProps } from './UploadArtworkPageProps';
import styles from './UploadArtworkPage.module.scss';
export const UploadArtworkPage: React.FC<IUploadArtworkPageProps> = () => {
  const history = useHistory();
  const signOutHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.push('/signin');
  };
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <Link to="/">
        <div className={styles.backButton}>Back To Artwork List</div>
      </Link>
      <button className={styles.signOutButton} onClick={signOutHandler}>
        Sign Out
      </button>
      <div>
        <h1>Upload your artwork</h1>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.userId}>Your ID: {'someUserIDbalbalbab'}</div>
          <div className={styles.inputGroup}>
            <label>Chose you file:</label>
            <input type="file"></input>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
