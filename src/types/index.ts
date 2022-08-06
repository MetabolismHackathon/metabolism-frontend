// export interface ArtworkI {
//   artworkId: string;
//   author: string;
//   numPieces: number;
//   backgroundImage: string;
//   imageSample: string;
//   authorName: string;
//   title: string;
//   description: string;
//   variant: string;
//   cols: number;
//   rows: number;
//   commonDetailsIpfs: string;
//   minted: number;
//   tx: string;
//   startPiece?: number;
//   pieces?: PieceTokenI[];
// }

export interface IArtworkSlug {
  backgroundImage: string;
  variant: string;
  cols: number;
  rows: number;
  pieces: { [id: string]: any };
}

export interface PieceTokenI extends UserToken {
  data: null | PieceData;
  metaData: null;
  history: EventData[] | undefined;
  owner?: string;
}

export interface UserToken {
  tokenId: number | undefined;
}

export interface PieceData {
  x: number | string;
  y: number | string;
  artworkId: string;
  backgroundImage: string;
  name: string;
  author: string;
  description: string;
  image: string;
  numberOfPieces: string;
  artworkHash?: string;
  detailsHash?: string;
}

export interface EventData {
  returnValues: {
    [key: string]: any;
  };
  raw: {
    data: string;
    topics: string[];
  };
  event: string;
  signature: string;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  address: string;
}

export interface PuzzlePiecesQueryI {
  // artwork: ArtworksQueryI;
  id: string;
  owner: string;
}

export interface ArtworksQueryI {
  author: string;
  commonDetailsIpfs: string;
  id: string;
  minted: string;
  numPieces: number;
  tx: string;
  pieces: PuzzlePiecesQueryI[];
}
// export * from 'src/types/pieceTypes';
export * from 'src/types/userTypes';
