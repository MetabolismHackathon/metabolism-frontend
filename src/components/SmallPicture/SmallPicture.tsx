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
}) => {
  const [ownedByCurrentUser, setOwnedByCurrentUse] = useState<boolean>(false);
  const { currentUser } = useAuthContext();
  const { hoveredOwnerId } = useArtworkContext();
  const history = useHistory();
  const stakeHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.push(`/stakes/${artworkId}/${id}`);
  };

  const likeHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    alert('like!');
  };

  const dislikeHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    alert('dislike!');
  };

  useEffect(() => {
    if (!!currentUser) {
      setOwnedByCurrentUse(currentUser === ownerId);
    }
  }, [currentUser, setOwnedByCurrentUse, ownerId]);
  // console.log(ownedByCurrentUser);
  return (
    <div
      className={cn(styles.container)}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {hoveredOwnerId && hoveredOwnerId === ownerId && <div className={styles.hover}></div>}
      SmallPicture {imageUrl} Yours: {String(ownedByCurrentUser)}
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
              Like
            </button>
          </div>
          <div className={styles.dislike}>
            <button className={cn(styles.evaluateButton)} onClick={dislikeHandler}>
              Dislike
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
