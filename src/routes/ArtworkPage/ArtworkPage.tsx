import { useParams, Link } from 'react-router-dom';
import { SmallPicture, Header, Owner } from 'src/components';
import { persistLocation } from 'src/helpers';
import { useArtworkContext } from 'src/context/artworkContext';
import { IArtworkPageProps } from './ArtworkPageProps';
import styles from './ArtworkPage.module.scss';
import { useEffect, useState } from 'react';
import { ArtworkI } from 'src/types';

export const ArtworkPage: React.FC<IArtworkPageProps> = () => {
  const [currentArtwork, setCurrentArtwork] = useState<ArtworkI | null>(null);
  const [ownersList, setOwnersList] = useState<{ id: string; piecesQuantity: number }[]>([]);
  const [pieceSize, setPieceSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const params: { artworkId: string } = useParams();
  const { artworks } = useArtworkContext();

  useEffect(() => {
    if (!!artworks) {
      const actualArtwork = artworks.find(({ id }) => id === params.artworkId);

      setCurrentArtwork(actualArtwork || null);
    }
  }, [artworks, params.artworkId]);

  useEffect(() => {
    persistLocation(`/artworks/${params.artworkId}`);
  }, [params.artworkId]);

  useEffect(() => {
    // console.log('currentArtwork', currentArtwork);
    if (currentArtwork) {
      const pieceWidth = currentArtwork.width / currentArtwork.cols;
      const pieceHeight = currentArtwork.height / currentArtwork.rows;
      setPieceSize({ width: pieceWidth, height: pieceHeight });
      const owners = currentArtwork.pieces.reduce<{ id: string; piecesQuantity: number }[]>(
        (acc, { ownerId }) => {
          if (!!ownerId) {
            const check = acc.findIndex((owner) => owner.id === ownerId);
            if (check >= 0) {
              acc[check].piecesQuantity += 1;
              return acc;
            }
            acc.push({ id: ownerId, piecesQuantity: 1 });
          }
          return acc;
        },
        [],
      );
      setOwnersList(owners);
    }
  }, [currentArtwork]);

  return (
    <div className={styles.container}>
      <Header>
        <Link to="/">
          <div className={styles.backButton}>Back To Artwork List</div>
        </Link>
      </Header>

      <h1 className={styles.title}>Your artwork {params.artworkId}</h1>
      <div className={styles.artworkContainer}>
        {!!currentArtwork && (
          <div
            className={styles.artwork}
            style={{
              width: `${currentArtwork?.width}px`,
              height: `${currentArtwork?.height}px`,
            }}
          >
            <img
              className={styles.artworkBackground}
              src={`/${currentArtwork.url}`}
              alt={currentArtwork.url}
              width={`${currentArtwork?.width}px`}
              height={`${currentArtwork?.height}px`}
            />

            {currentArtwork.pieces.map((piece) => (
              <SmallPicture
                key={piece.id}
                width={pieceSize.width}
                height={pieceSize.height}
                artworkId={params.artworkId}
                {...piece}
              />
            ))}
          </div>
        )}
        <div className={styles.panel}>
          <div className={styles.artworkDescription}>description</div>
          <div className={styles.ownersList}>
            {ownersList.map((owner) => (
              <Owner key={owner.id} {...owner} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
