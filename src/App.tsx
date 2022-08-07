import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useAuthContext } from './context/authContext';
import { useArtworkContext } from './context/artworkContext';
import { getRandomInteger } from './helpers';
import { ArtworkI, PieceI } from './types';
import { tiles } from './slugs';
import { UploadArtworkPage, HomePage, SingInPage, ArtworkPage, StakePage } from 'src/routes';
import './App.css';

const Page404 = () => <div>404 page</div>;

// just a slug before backend is available

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
    imageUrl: `/images/tileset/${tiles[getRandomInteger(1, 6)].file}`,
    likes: 0,
    dislikes: 0,
  }));
  return p;
};
// const artworks: ArtworkI[] = [
//   {
//     id: '0',
//     url: 'images/tmp/island.jpeg',
//     rows: 2,
//     cols: 2,
//     piecesQuantity: 4,
//     width: 700,
//     height: 700,
//     pieces: generatePieces(4),
//     launched: false,
//   },
//   {
//     id: '1',
//     url: 'images/tmp/field.jpeg',
//     rows: 3,
//     cols: 4,
//     piecesQuantity: 12,
//     width: 900,
//     height: 800,
//     pieces: generatePieces(12),
//     launched: false,
//   },
// ];

function App() {
  const [location, setLocation] = useState<string>('');
  const { active, account } = useWeb3React<Web3Provider>();
  const { setCurrentUser, currentUser } = useAuthContext();
  const { setArtworks, setInitialState } = useArtworkContext();

  useEffect(() => {
    if (!active && !account) {
      return setCurrentUser!(null);
    }
    if (!!account) setCurrentUser!(account);
  }, [account, setCurrentUser, active]);

  useEffect(() => {
    const artworksString = window.localStorage.getItem('slapArtworks');
    if (!!artworksString) {
      const parsedArtworks: ArtworkI[] = JSON.parse(artworksString);
      console.log(parsedArtworks);
      setArtworks!(parsedArtworks);
      const initialState = parsedArtworks.map(({ id, pieces }) => {
        const evalsQuantity = pieces.reduce<number>(
          (acc, { likes, dislikes }) => likes + dislikes + acc,
          0,
        );
        return { id, evalsQuantity };
      });
      setInitialState!(initialState);
      return;
    }
  }, [setArtworks, setInitialState]);

  useEffect(() => {
    const previousState = window.localStorage.getItem('slapsketch');
    // console.log('previousState', previousState);

    if (!!previousState) {
      const parsedPreviousState: { location: string } = JSON.parse(previousState);
      const { location } = parsedPreviousState;
      setLocation(location);
    }
  }, []);

  // console.log('current user', currentUser);

  // useEffect(() => {
  //   const localartworks = window.localStorage.getItem('slapArtworks');
  //   if (!!localartworks) {
  //     const parsed = JSON.parse(localartworks);
  //     // console.log('parsed', parsed);
  //     // return;
  //   }
  //   // console.log('localartworks', localartworks);
  // });
  return (
    <div className="App">
      <BrowserRouter>
        {!currentUser && <Redirect to="/signin" />}
        {!!currentUser && <Redirect to={`${location}`} />}

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signin" exact component={SingInPage} />
          <Route path="/artworks" exact component={ArtworkPage} />
          <Route path="/artworks/:artworkId" exact component={ArtworkPage} />
          <Route path="/stakes/:artworkId/:pieceId" exact component={StakePage} />
          <Route path="/uploadartwork" exact component={UploadArtworkPage} />
          <Route
            path="/uploadartwork/:artworkId/:pieceId"
            exact
            component={UploadArtworkPage}
          />
          <Route path="*" component={Page404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
