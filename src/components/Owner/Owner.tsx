import { useAuthContext } from 'src/context/authContext';
import { useArtworkContext } from 'src/context/artworkContext';
import { IOwnerProps } from './OwnerProps';
import styles from './Owner.module.scss';
export const Owner: React.FC<IOwnerProps> = ({ id, piecesQuantity }) => {
  const { currentUser } = useAuthContext();
  const { setHoveredOwnerId } = useArtworkContext();

  const shrinkedId = [id?.substring(0, 5), id?.substring(id.length - 3, id.length)].join(
    '...',
  );

  const mouseOverHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    // console.log('mouse over id', id);
    setHoveredOwnerId!(id);
  };

  const mouseLeavehandler: React.MouseEventHandler<HTMLDivElement> = () => {
    // console.log('mouse out');
    setHoveredOwnerId!(null);
  };
  return (
    <div
      className={styles.container}
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeavehandler}
    >
      <div className={styles.id}>id: {shrinkedId}</div>
      <div className={styles.pieces}>peices: {piecesQuantity}</div>
      {id === currentUser && <div className={styles.current}>current</div>}
    </div>
  );
};
