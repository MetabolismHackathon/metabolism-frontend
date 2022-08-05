import { Link, useHistory } from 'react-router-dom';

import { ArtworksThumbnail } from 'src/components';
import { IHomePageProps } from './HomePageProps';
import styles from './HomePage.module.scss';

const artworks = [...Array(3)];

// const artworks: any[] = [];

export const HomePage: React.FC<IHomePageProps> = () => {
  const history = useHistory();
  const signOutHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.push('/signin');
  };
  return (
    <div className={styles.container}>
      <button className={styles.signOutButton} onClick={signOutHandler}>
        Sign Out
      </button>
      <div className={styles.uploadLink}>
        <Link to="/uploadartwork">
          <h1>Upload your artwork</h1>
        </Link>
      </div>
      {artworks && artworks.length > 0 && (
        <p className={styles.checkNotice}>...or check artworks in progress:</p>
      )}
      {artworks && artworks.length > 0 && (
        <div className={styles.artworksList}>
          {artworks.map((_, id) => (
            <ArtworksThumbnail key={id} title={`Artwork-${id}`} id={String(id)} />
          ))}
        </div>
      )}
    </div>
  );
};
