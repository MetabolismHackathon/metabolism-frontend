import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { useAuthContext } from 'src/context/authContext';
import { useArtworkContext } from 'src/context/artworkContext';
import { ISmallPictureProps } from './SmallPictureProps';
import styles from './SmallPicture.module.scss';
import { useEffect, useState } from 'react';
export const SmallPicture: React.FC<ISmallPictureProps> = ({
  width,
  height,
  imageUrl,
  id,
  ownerId,
  artworkId,
  likes,
  dislikes,
}) => {
  const [ownedByCurrentUser, setOwnedByCurrentUse] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<{ likes: number; dislikes: number }>({
    likes: 0,
    dislikes: 0,
  });
  const [hovered, setHovered] = useState<boolean>(false);
  const { currentUser } = useAuthContext();
  const {
    hoveredOwnerId,
    piecesEvaluation,
    setPiecesEvaluation,
    setHoveredOwnerId,
  } = useArtworkContext();
  const history = useHistory();
  const stakeHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.push(`/stakes/${artworkId}/${id}`);
  };

  const likeHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    // alert('like!');
    const evalIndex = piecesEvaluation.findIndex((piecesEval) => piecesEval.id === id);
    if (evalIndex >= 0) {
      const evaluationClone = piecesEvaluation.slice(0);
      evaluationClone[evalIndex].likes += 1;
      setPiecesEvaluation!(evaluationClone);
    }
  };

  const dislikeHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    // alert('dislike!');
    const evalIndex = piecesEvaluation.findIndex((piecesEval) => piecesEval.id === id);
    if (evalIndex >= 0) {
      const evaluationClone = piecesEvaluation.slice(0);
      evaluationClone[evalIndex].dislikes += 1;
      setPiecesEvaluation!(evaluationClone);
    }
  };

  const mouseOverHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    setHoveredOwnerId!(ownerId);
  };

  const mouseLeavehandler: React.MouseEventHandler<HTMLDivElement> = () => {
    // console.log('mouse out');
    setHoveredOwnerId!(null);
  };

  useEffect(() => {
    setHovered(!!hoveredOwnerId && hoveredOwnerId === ownerId);
  }, [hoveredOwnerId, ownerId]);

  useEffect(() => {
    if (!!currentUser) {
      setOwnedByCurrentUse(currentUser === ownerId);
    }
  }, [currentUser, setOwnedByCurrentUse, ownerId]);

  useEffect(() => {
    const currentPieceEvaluation = piecesEvaluation.find((pieceEval) => id === pieceEval.id);
    if (!!currentPieceEvaluation) {
      setEvaluation({
        likes: currentPieceEvaluation.likes,
        dislikes: currentPieceEvaluation.dislikes,
      });
    }
  }, [id, piecesEvaluation]);
  // console.log(ownedByCurrentUser);
  const containerClickHandler = () => {
    console.log('click');
    history.push(`/uploadartwork/${artworkId}/${id}`);
  };
  return (
    <div
      className={cn(styles.container)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        cursor: ownedByCurrentUser ? 'pointer' : undefined,
      }}
      onClick={ownedByCurrentUser ? containerClickHandler : undefined}
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeavehandler}
    >
      {!!ownerId && (
        <div className={styles.picture}>
          <img src={imageUrl} alt="" width={`${width}px`} height={`${height}px`} />
        </div>
      )}
      {hovered && <div className={styles.hover}></div>}
      Yours: {String(ownedByCurrentUser)}
      {!ownerId && (
        <div className={styles.stake}>
          <button className={styles.stakeButton} onClick={stakeHandler}>
            Take and stake
          </button>
        </div>
      )}
      {ownerId && !ownedByCurrentUser && (
        <div className={styles.evaluate}>
          <div className={styles.like}>
            <button className={cn(styles.evaluateButton)} onClick={likeHandler}>
              {evaluation.likes} x Likes
            </button>
          </div>
          <div className={styles.dislike}>
            <button className={cn(styles.evaluateButton)} onClick={dislikeHandler}>
              {evaluation.dislikes} x Dislikes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
