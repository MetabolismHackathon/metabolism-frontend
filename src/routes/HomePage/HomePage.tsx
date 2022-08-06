import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { persistLocation } from 'src/helpers';
import { ArtworksThumbnail, Header } from 'src/components';
import { useArtworkContext } from 'src/context/artworkContext';
import { IHomePageProps } from './HomePageProps';
import styles from './HomePage.module.scss';

export const HomePage: React.FC<IHomePageProps> = () => {
  const { artworks } = useArtworkContext();
  useEffect(() => {
    persistLocation(`/`);
  }, []);
  return (
    <div className={styles.container}>
      <Header />
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
          {artworks.map((artwork) => (
            <ArtworksThumbnail
              key={artwork.id}
              title={`Artwork-${artwork.id}`}
              artwork={artwork}
            />
          ))}
        </div>
      )}
    </div>
  );
};
