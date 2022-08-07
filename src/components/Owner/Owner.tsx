import cn from 'classnames';
import { useAuthContext } from 'src/context/authContext';
import { useArtworkContext } from 'src/context/artworkContext';

import { IOwnerProps } from './OwnerProps';
import styles from './Owner.module.scss';
import { useEffect, useState } from 'react';
export const Owner: React.FC<IOwnerProps> = ({ id, piecesQuantity }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const { currentUser } = useAuthContext();
  const { setHoveredOwnerId, hoveredOwnerId } = useArtworkContext();

  const shrinkedId = [id?.substring(0, 5), id?.substring(id.length - 3, id.length)].join(
    '...',
  );

  const mouseOverHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    setHoveredOwnerId!(id);
  };

  const mouseLeavehandler: React.MouseEventHandler<HTMLDivElement> = () => {
    setHoveredOwnerId!(null);
  };

  useEffect(() => {
    setHovered(!!hoveredOwnerId && hoveredOwnerId === id);
  }, [hoveredOwnerId, id]);
  return (
    <div
      className={cn(styles.container, hovered ? styles.hovered : null)}
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeavehandler}
    >
      <div className={styles.id}>id: {shrinkedId}</div>
      <div className={styles.pieces}>peices: {piecesQuantity}</div>
      {id === currentUser && <div className={styles.current}>current</div>}
    </div>
  );
};
