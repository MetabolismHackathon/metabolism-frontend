import { useParams, Link } from 'react-router-dom';
import { SmallPicture, Header } from 'src/components';
import { persistLocation } from 'src/helpers';
import { IArtworkPageProps } from './ArtworkPageProps';
import styles from './ArtworkPage.module.scss';
import { useEffect } from 'react';

const pieces = [...Array(9)];
export const ArtworkPage: React.FC<IArtworkPageProps> = () => {
  const params: { artworkId: string } = useParams();

  useEffect(() => {
    persistLocation(`/artworks/${params.artworkId}`);
  }, [params.artworkId]);

  return (
    <div className={styles.container}>
      <Header>
        <Link to="/">
          <div className={styles.backButton}>Back To Artwork List</div>
        </Link>
      </Header>

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
