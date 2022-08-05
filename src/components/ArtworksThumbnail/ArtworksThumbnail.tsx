import { IArtworksThumbnailProps } from './ArtworksThumbnailProps';
import { useHistory } from 'react-router-dom';
import styles from './ArtworksThumbnail.module.scss';
export const ArtworksThumbnail: React.FC<IArtworksThumbnailProps> = ({ title, id }) => {
  const history = useHistory();
  const containerClickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    history.push(`/artworks/${id}`);
  };
  return (
    <div className={styles.container} onClick={containerClickHandler}>
      <h1>{title}</h1>
    </div>
  );
};
