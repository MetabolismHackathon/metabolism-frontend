import { useParams, Link, useHistory } from 'react-router-dom';
import { Header } from 'src/components';
import { IStakePageProps } from './StakePageProps';
import { useArtworkContext } from 'src/context/artworkContext';
import { useAuthContext } from 'src/context/authContext';
// import { abi } from 'src/slugs/abi';
import styles from './StakePage.module.scss';
import { useState } from 'react';
// import Web3 from 'web3';
export const StakePage: React.FC<IStakePageProps> = () => {
  const params: { pieceId: string; artworkId: string } = useParams();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const history = useHistory();
  const { artworks, setArtworks } = useArtworkContext();
  const { currentUser } = useAuthContext();
  const submitStakeHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSuccess(false);
    setSubmitting(true);
    const actualArtwork = artworks.find(({ id }) => id === params.artworkId);
    // console.log(actualArtwork);
    const updatedPieces = actualArtwork?.pieces.map((piece) =>
      piece.id === params.pieceId ? { ...piece, ownerId: currentUser } : piece,
    );

    const updatedArtworks = artworks.map((artwork) =>
      artwork.id === params.artworkId
        ? { ...artwork, pieces: !!updatedPieces ? updatedPieces : artwork.pieces }
        : artwork,
    );

    console.log('updatedArtwork', updatedArtworks);
    setArtworks!(updatedArtworks);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);

      setTimeout(() => {
        history.push(`/artworks/${params.artworkId}`);
      }, 2000);
    }, 3000);
  };

  // const web3 = new Web3();

  // const abi = [
  //   {
  //     inputs: [
  //       {
  //         internalType: 'contract Sketch',
  //         name: 'sketch_',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'string',
  //         name: 'name_',
  //         type: 'string',
  //       },
  //       {
  //         internalType: 'uint256',
  //         name: 'sketchId_',
  //         type: 'uint256',
  //       },
  //       {
  //         internalType: 'uint8',
  //         name: 'rows_',
  //         type: 'uint8',
  //       },
  //       {
  //         internalType: 'uint8',
  //         name: 'columns_',
  //         type: 'uint8',
  //       },
  //     ],
  //     stateMutability: 'nonpayable',
  //     type: 'constructor',
  //   },
  //   {
  //     inputs: [],
  //     name: 'MAX_PIECES_PER_SKETCH',
  //     outputs: [
  //       {
  //         internalType: 'uint8',
  //         name: '',
  //         type: 'uint8',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'TIMESTAMP',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'columns',
  //     outputs: [
  //       {
  //         internalType: 'uint8',
  //         name: '',
  //         type: 'uint8',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'daoAddress',
  //     outputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'uint8',
  //         name: '',
  //         type: 'uint8',
  //       },
  //     ],
  //     name: 'downvotes',
  //     outputs: [
  //       {
  //         internalType: 'bool',
  //         name: '',
  //         type: 'bool',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'encodedAddPermittedData',
  //     outputs: [
  //       {
  //         internalType: 'bytes',
  //         name: '',
  //         type: 'bytes',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint8[]',
  //         name: 'upvotes_',
  //         type: 'uint8[]',
  //       },
  //       {
  //         internalType: 'uint8[]',
  //         name: 'downvotes_',
  //         type: 'uint8[]',
  //       },
  //     ],
  //     name: 'evaluatePieces',
  //     outputs: [
  //       {
  //         internalType: 'uint8',
  //         name: '',
  //         type: 'uint8',
  //       },
  //     ],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'id',
  //     outputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'initiator',
  //     outputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'name',
  //     outputs: [
  //       {
  //         internalType: 'string',
  //         name: '',
  //         type: 'string',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'piecesNumber',
  //     outputs: [
  //       {
  //         internalType: 'uint8',
  //         name: '',
  //         type: 'uint8',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'rows',
  //     outputs: [
  //       {
  //         internalType: 'uint8',
  //         name: '',
  //         type: 'uint8',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'bytes',
  //         name: 'signature',
  //         type: 'bytes',
  //       },
  //     ],
  //     name: 'setupPermitted',
  //     outputs: [],
  //     stateMutability: 'nonpayable',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'totalDownvotes',
  //     outputs: [
  //       {
  //         internalType: 'uint8',
  //         name: '',
  //         type: 'uint8',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'uint256',
  //         name: '',
  //         type: 'uint256',
  //       },
  //     ],
  //     name: 'totalUpvotes',
  //     outputs: [
  //       {
  //         internalType: 'uint8',
  //         name: '',
  //         type: 'uint8',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [],
  //     name: 'txHash',
  //     outputs: [
  //       {
  //         internalType: 'bytes32',
  //         name: '',
  //         type: 'bytes32',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: 'address',
  //         name: '',
  //         type: 'address',
  //       },
  //       {
  //         internalType: 'uint8',
  //         name: '',
  //         type: 'uint8',
  //       },
  //     ],
  //     name: 'upvotes',
  //     outputs: [
  //       {
  //         internalType: 'bool',
  //         name: '',
  //         type: 'bool',
  //       },
  //     ],
  //     stateMutability: 'view',
  //     type: 'function',
  //   },
  // ];
  // // @ts-ignore
  // const contract = new web3.eth.Contract(abi, '0x9CE2dB615e88306F31fDE35AFa232089378971B1');
  // console.log('contrat', contract);
  return (
    <div className={styles.container}>
      <Header>
        <Link to={`/artworks/${params.artworkId}`}>
          <div className={styles.backButton}>Back To Artwork List</div>
        </Link>
      </Header>
      <h1>Place stake</h1>
      <form className={styles.form} onSubmit={submitStakeHandler}>
        <div className={styles.artworkId}>ArtworkId: {params.artworkId}</div>
        <div className={styles.pieceId}>PieceId: {params.pieceId}</div>
        <div className={styles.inputGroup}>
          <label>Your Stake: 0.003 WETH</label>
          {/* <input type="text" placeholder={'Type your stake...'} /> */}
        </div>
        {/* <div className={styles.inputGroup}>
          <label>Your Login:</label>
          <input type="text" placeholder={'Type your login'} />
        </div> */}

        <button type="submit" className={styles.submitButton}>
          {isSubmitting
            ? 'Submitting...'
            : isSuccess
            ? 'You stake accepted!'
            : 'Submit your stake'}
        </button>
      </form>
    </div>
  );
};
