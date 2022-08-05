import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { ISmallPictureProps } from './SmallPictureProps';
import styles from './SmallPicture.module.scss';
export const SmallPicture: React.FC<ISmallPictureProps> = ({
  width,
  height,
  imgUrl,
  pieceId,
  artworkId,
}) => {
  const history = useHistory();
  const location = useLocation();
  console.log(history, location);
  const stakeHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.push(`/stakes/${artworkId}/${pieceId}`);
  };

  const likeHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    alert('like!');
  };

  const dislikeHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    alert('dislike!');
  };
  return (
    <div className={styles.container} style={{ width: `${width}px`, height: `${height}px` }}>
      SmallPicture {imgUrl}
      <div className={styles.stake}>
        <button className={styles.stakeButton} onClick={stakeHandler}>
          Take and stake
        </button>
      </div>
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
    </div>
  );
};
