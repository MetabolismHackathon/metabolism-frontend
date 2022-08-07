import { useHistory, Link, useParams } from 'react-router-dom';
import { Header } from 'src/components';
import { PieceI } from 'src/types';

import { IUploadArtworkPageProps } from './UploadArtworkPageProps';
import { useAuthContext } from 'src/context/authContext';
import { useArtworkContext } from 'src/context/artworkContext';
import { ipfsURLConverter, getRandomInteger } from 'src/helpers';
import api from 'src/api';
import styles from './UploadArtworkPage.module.scss';
import { useState } from 'react';
import axios from 'axios';
import { ArtworkI } from 'src/types';

const generatePieces = (quant: number): PieceI[] => {
  const p = [...Array(quant)].map((_, index) => ({
    id: String(index),
    ownerId:
      (index + 1) % 3 === 0
        ? '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91'
        : index % 4 === 0
        ? '0x1215991085d541A586F0e1968355A36E58C9b2b4'
        : (index + 2) % 5 === 0
        ? 'oneAnotherUser'
        : null,
    imageUrl: `/images/tmp/processpics/${getRandomInteger(1, 6)}.jpeg`,
    likes: 0,
    dislikes: 0,
  }));
  return p;
};
export const UploadArtworkPage: React.FC<IUploadArtworkPageProps> = () => {
  const { artworks, setArtworks } = useArtworkContext();
  const { currentUser } = useAuthContext();
  const [file, setFile] = useState<any>(null);
  const [isSending, setSending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();
  const params: { artworkId: string; pieceId: string } = useParams();
  const submitHandler2: React.FormEventHandler<HTMLFormElement> = async (event) => {
    console.log('submitHandler2');
    setSending(true);
    event.preventDefault();
    const formData = new FormData();

    formData.set('file', file);
    formData.set('meta', '{"name":"Hello","image":null,"properties":{"videoClip":null}}');

    axios
      .post('https://api.nft.storage/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY3Y2NmMWU0OEU4NWViNzVFQzUzRmEzODU2NzZGOEVEM0Q2OWYxOWMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzcxMDM1NDA0OSwibmFtZSI6Im15a2V5In0.uem5KZz7-dLM4cgMoYgiBj9wwn4RV7hvhbvAtmrriQI',
        },
      })
      .then((res) => {
        console.log('res', res);
        const { data } = res;
        const fileUrl: string = data.value.data.file;
        const ipnft: string = data.value.ipnft;
        const meta = data.value.url;
        console.log(fileUrl, ipnft, meta);

        const newArtWork: ArtworkI = {
          id: ipnft,
          url: ipfsURLConverter(fileUrl),
          rows: 2,
          cols: 2,
          piecesQuantity: 4,
          launched: false,
          width: 800,
          height: 800,
          pieces: generatePieces(4),
        };

        const updatedArtworks = [...artworks, newArtWork];
        const localartworks = window.localStorage.getItem('slapArtworks');

        setArtworks!(updatedArtworks);

        if (!!localartworks) {
          const parsed = JSON.parse(localartworks);
          console.log('parsed', parsed);
          return;
        }
        window.localStorage.setItem('slapArtworks', JSON.stringify(updatedArtworks));

        // window.localStorage.setItem('metaArtwork', JSON.stringify({ }))
        // const localartworks = window.localStorage.getItem('slapArtworks');
        // if (!!localartworks) {
        //   const parsed = JSON.parse(localartworks);
        //   return;
        // }
        // window.localStorage.setItem(
        //   'slapArtworks',
        //   JSON.stringify({
        //     id: 'bafyreiahflenoycpaj2p43ozu32762wez3e4zwfvwpklldjdx2axqvz4iu',
        //     url: 'ipfs://bafybeigjxv6lsf4s5jiwaih5yxkfzvyktmpswgag7od2s4zjc5xscmbsee/DSC00022.jpeg',
        //     meta: 'ipfs://bafyreiahflenoycpaj2p43ozu32762wez3e4zwfvwpklldjdx2axqvz4iu/metadata.json',
        //   }),
        // );
      })
      .catch((error) => {
        console.log('errr', error);
        setSuccessMessage(null);
        setErrorMessage('Error!');
      });

    // const newArtWork: ArtworkI = {
    //   id: 'bafyreiahflenoycpaj2p43ozu32762wez3e4zwfvwpklldjdx2axqvz4iu',
    //   url: ipfsURLConverter(
    //     'ipfs://bafybeigjxv6lsf4s5jiwaih5yxkfzvyktmpswgag7od2s4zjc5xscmbsee/DSC00022.jpeg',
    //   ),
    //   rows: 2,
    //   cols: 2,
    //   piecesQuantity: 4,
    //   launched: false,
    //   width: 800,
    //   height: 800,
    //   pieces: generatePieces(4),
    // };

    // const updatedArtworks = [...artworks, newArtWork];
    // setArtworks!(updatedArtworks);
    // const localartworks = window.localStorage.getItem('slapArtworks');
    // if (!!localartworks) {
    //   const parsed = JSON.parse(localartworks);
    //   console.log('parsed', parsed);
    //   return;
    // }
    // window.localStorage.setItem('slapArtworks', JSON.stringify(updatedArtworks));
  };

  // const submitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
  //   event.preventDefault();
  //   setSending(true);

  //   const formData = new FormData();
  //   try {
  //     if (!!file && !!currentUser) {
  //       formData.set('file', file);
  //       formData.set('userId', currentUser);
  //       const response = await api.uploadImage(formData);
  //       setErrorMessage(null);
  //       setSuccessMessage(!!response ? 'Success!' : null);
  //       if (params?.artworkId) {
  //         history.push(`/artworks/${params.artworkId}`);
  //         return;
  //       }
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //     setSuccessMessage(null);
  //     setErrorMessage('Error!');
  //   } finally {
  //     setSending(false);
  //   }
  // };

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.files);
    if (!!event.target && event.target.files) setFile(event.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <Header>
        {!params?.artworkId ? (
          <Link to="/">
            <div className={styles.backButton}>Back To Artworks List</div>
          </Link>
        ) : (
          <Link to={`/artworks/${params.artworkId}`}>
            <div className={styles.backButton}>Back To Artwork</div>
          </Link>
        )}
      </Header>
      <div>
        <h1>Upload your artwork</h1>
        <form
          className={styles.form}
          onSubmit={submitHandler2}
          // method="post"
          // encType="multipart/form-data"
          // action="https://quantumoracle.app/store"
        >
          <div className={styles.userId}>Your ID: {currentUser}</div>
          <div className={styles.inputGroup}>
            <label htmlFor="file">Chose you file:</label>
            <input type="file" name="file" id="file" onChange={changeHandler}></input>
          </div>
          {/* <input
            type="hidden"
            id="meta"
            name="meta"
            value={JSON.stringify({
              name: 'Hello',
              image: null,
              properties: { videoClip: null },
            })}
          /> */}

          <button type="submit" className={styles.submitButton} disabled={isSending}>
            Submit
          </button>
          {successMessage && <div className={styles.success}>{successMessage}</div>}
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </form>

        {/* <form
          // method="post"
          // encType="multipart/form-data"
          // action="https://quantumoracle.app/store"
          onSubmit={submitHandler2}
        >
          <div>
            <label htmlFor="file">Choose file to upload</label>
            <input type="file" id="file" name="file" onChange={changeHandler} />
          </div>
          <input
            type="hidden"
            id="meta"
            name="meta"
            value='
   {
    "name": "Hello",
    "image": null,
    "properties": {
    "videoClip": null
    }
  }
 '
          /> */}
        {/* <div>
            <button type="submit">Submit</button>
          </div>
        </form> */}
      </div>
    </div>
  );
};
