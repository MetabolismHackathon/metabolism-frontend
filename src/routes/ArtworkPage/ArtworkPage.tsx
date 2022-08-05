import { useParams, Link, useHistory } from 'react-router-dom';
import { SmallPicture } from 'src/components';
import { IArtworkPageProps } from './ArtworkPageProps';
import styles from './ArtworkPage.module.scss';

const pieces = [...Array(9)];
export const ArtworkPage: React.FC<IArtworkPageProps> = () => {
  const params: { artworkId: string } = useParams();
  const history = useHistory();
  const signOutHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.push('/signin');
  };
  return (
    <div className={styles.container}>
      <Link to="/">
        <div className={styles.backButton}>Back To Artwork List</div>
      </Link>
      <button className={styles.signOutButton} onClick={signOutHandler}>
        Sign Out
      </button>
      <h1 className={styles.title}>Your artwork {params.artworkId}</h1>
      <div className={styles.artwork}>
        {pieces.map((_, index) => (
          <SmallPicture
            key={index}
            width={300}
            height={300}
            imgUrl={`${index}-picture`}
            pieceId={String(index)}
            artworkId={params.artworkId}
          />
        ))}
      </div>
    </div>
  );
};
