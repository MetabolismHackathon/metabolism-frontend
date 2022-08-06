import { useParams, Link, useHistory } from 'react-router-dom';
import { Header } from 'src/components';
import { IStakePageProps } from './StakePageProps';
import styles from './StakePage.module.scss';
export const StakePage: React.FC<IStakePageProps> = () => {
  const params: { pieceId: string; artworkId: string } = useParams();
  const history = useHistory();
  

  const submitStakeHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    history.push(`/artworks/${params.artworkId}`);
  };
  return (
    <div className={styles.container}>
      <Header>
        <Link to={`/artworks/${params.artworkId}`}>
          <div className={styles.backButton}>Back To Artwork List</div>
        </Link>
      </Header>
      <h1>Place stake</h1>
      <form className={styles.form} onSubmit={submitStakeHandler}>
        <div className={styles.artworkId}>ArtworkId: {params.artworkId}</div>
        <div className={styles.pieceId}>PieceId: {params.pieceId}</div>
        <div className={styles.inputGroup}>
          <label>Your Stake:</label>
          <input type="text" placeholder={'Type your stake...'} />
        </div>
        <div className={styles.inputGroup}>
          <label>Your Login:</label>
          <input type="text" placeholder={'Type your login'} />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit your stake
        </button>
      </form>
    </div>
  );
};
