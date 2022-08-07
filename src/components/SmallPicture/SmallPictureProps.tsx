export interface ISmallPictureProps {
  children?: React.ReactNode;
  width: number;
  height: number;
  imageUrl: string;
  id: string;
  artworkId: string;
  ownerId: string | null;
  likes: number;
  dislikes: number;
}
