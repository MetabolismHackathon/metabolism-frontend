import { useParams, Link } from 'react-router-dom';
import cn from 'classnames';
import { SmallPicture, Header, Owner } from 'src/components';
import api from 'src/api';
import { persistLocation } from 'src/helpers';
import { useArtworkContext } from 'src/context/artworkContext';
import { IArtworkPageProps } from './ArtworkPageProps';
import styles from './ArtworkPage.module.scss';
import { useEffect, useState } from 'react';
import { ArtworkI } from 'src/types';

export const ArtworkPage: React.FC<IArtworkPageProps> = () => {
  const [currentArtwork, setCurrentArtwork] = useState<ArtworkI | null>(null);
  const [isSubmitAllowed, setSubmitAllowed] = useState<boolean>(false);
  const [ownersList, setOwnersList] = useState<{ id: string; piecesQuantity: number }[]>([]);
  const [pieceSize, setPieceSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const params: { artworkId: string } = useParams();
  const { artworks, setPiecesEvaluation, piecesEvaluation, initialState } =
    useArtworkContext();
  // console.log('piecesEvaluation', piecesEvaluation);
  // console.log('initialState', initialState);

  const changesSubmitHandler = async () => {
    if (currentArtwork) {
      const piecesToUpdate = currentArtwork.pieces.slice(0).map((piece) => {
        const pieceEvals = piecesEvaluation.find(({ id }) => piece.id === id);
        return {
          ...piece,
          likes: pieceEvals ? pieceEvals.likes : piece.likes,
          dislikes: pieceEvals ? pieceEvals.dislikes : piece.dislikes,
        };
      });
      const updatedArtwork = { ...currentArtwork, pieces: piecesToUpdate };

      const result = await api.sendUpdatedArtwork(updatedArtwork);

      if (result) alert('updates successfully sent');
      if (!result) alert('sending updates failed');
    }
  };

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
    if (currentArtwork) {
      const currentArtworkInitaState = initialState.find(({ id }) => currentArtwork.id === id);
      const currentEvalsQuantity = piecesEvaluation.reduce<number>(
        (acc, { likes, dislikes }) => likes + dislikes + acc,
        0,
      );
      setSubmitAllowed(currentArtworkInitaState?.evalsQuantity !== currentEvalsQuantity);
    }
  }, [initialState, currentArtwork, piecesEvaluation]);

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
      const evaluation = currentArtwork.pieces.map(({ id, likes, dislikes }) => ({
        id,
        likes,
        dislikes,
      }));
      setPiecesEvaluation!(evaluation);
      setOwnersList(owners);
    }
  }, [currentArtwork, setPiecesEvaluation]);

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
          <button
            className={cn(styles.submitButton, isSubmitAllowed ? null : styles.disabled)}
            onClick={changesSubmitHandler}
          >
            Submit Updates
          </button>
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
