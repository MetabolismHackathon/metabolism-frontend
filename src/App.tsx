import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useAuthContext } from './context/authContext';
import { useArtworkContext } from './context/artworkContext';
import { ArtworkI, PieceI } from './types';
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
    imageUrl: '',
    likes: 0,
    dislikes: 0,
  }));
  return p;
};
const artworks: ArtworkI[] = [
  {
    id: '0',
    url: 'images/tmp/island.jpeg',
    rows: 2,
    cols: 2,
    piecesQuantity: 4,
    width: 700,
    height: 700,
    pieces: generatePieces(4),
  },
  {
    id: '1',
    url: 'images/tmp/field.jpeg',
    rows: 3,
    cols: 4,
    piecesQuantity: 12,
    width: 900,
    height: 800,
    pieces: generatePieces(12),
  },
];

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
    setArtworks!(artworks);
    const initialState = artworks.map(({ id, pieces }) => {
      const evalsQuantity = pieces.reduce<number>(
        (acc, { likes, dislikes }) => likes + dislikes + acc,
        0,
      );
      return { id, evalsQuantity };
    });
    setInitialState!(initialState);
  }, [setArtworks, setInitialState]);

  useEffect(() => {
    const previousState = window.localStorage.getItem('slapsketch');

    if (!!previousState) {
      const parsedPreviousState: { location: string } = JSON.parse(previousState);
      const { location } = parsedPreviousState;
      setLocation(location);
    }
  }, []);
  // console.log('current user', currentUser);
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
