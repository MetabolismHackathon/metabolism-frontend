import { useHistory, Link, useParams } from 'react-router-dom';
import { Header } from 'src/components';
import { IUploadArtworkPageProps } from './UploadArtworkPageProps';
import { useAuthContext } from 'src/context/authContext';
import api from 'src/api';
import styles from './UploadArtworkPage.module.scss';
import { useState } from 'react';
export const UploadArtworkPage: React.FC<IUploadArtworkPageProps> = () => {
  const { currentUser } = useAuthContext();
  const [file, setFile] = useState<any>(null);
  const [isSending, setSending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();
  const params: { artworkId: string; pieceId: string } = useParams();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setSending(true);

    const formData = new FormData();
    try {
      if (!!file && !!currentUser) {
        formData.set('file', file);
        formData.set('userId', currentUser);
        const response = await api.uploadImage(formData);
        setErrorMessage(null);
        setSuccessMessage(!!response ? 'Success!' : null);
        if (params?.artworkId) {
          history.push(`/artworks/${params.artworkId}`);
          return;
        }
      }
    } catch (error) {
      console.log('error', error);
      setSuccessMessage(null);
      setErrorMessage('Error!');
    } finally {
      setSending(false);
    }
  };

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.files);
    if (!!event.target && event.target.files) setFile(event.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <Header>
        {!params?.artworkId ? (
          <Link to="/">
            <div className={styles.backButton}>Back To Artworks List</div>
          </Link>
        ) : (
          <Link to={`/artworks/${params.artworkId}`}>
            <div className={styles.backButton}>Back To Artwork</div>
          </Link>
        )}
      </Header>
      <div>
        <h1>Upload your artwork</h1>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.userId}>Your ID: {currentUser}</div>
          <div className={styles.inputGroup}>
            <label>Chose you file:</label>
            <input type="file" onChange={changeHandler}></input>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSending}>
            Submit
          </button>
          {successMessage && <div className={styles.success}>{successMessage}</div>}
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};
