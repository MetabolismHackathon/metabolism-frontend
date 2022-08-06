import { IArtworksThumbnailProps } from './ArtworksThumbnailProps';
import { useHistory } from 'react-router-dom';
import { useArtworkContext } from 'src/context/artworkContext';
import styles from './ArtworksThumbnail.module.scss';

export const ArtworksThumbnail: React.FC<IArtworksThumbnailProps> = ({ title, artwork }) => {
  const history = useHistory();
  const { setCurrentArtwork, setCurrentArtworkId } = useArtworkContext();
  const { id, url } = artwork;
  const containerClickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    setCurrentArtwork!(artwork);
    setCurrentArtworkId!(id);
    history.push(`/artworks/${id}`);
  };

  return (
    <div className={styles.container} onClick={containerClickHandler}>
      {url && <img src={url} alt={`thumb-${id}`} />}
      <h1>{title}</h1>
    </div>
  );
};
