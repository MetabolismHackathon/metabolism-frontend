import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useAuthContext } from './context/authContext';
import { ArtworkContext, useArtworkContext } from './context/artworkContext';
import { ArtworkI } from './types';
import { UploadArtworkPage, HomePage, SingInPage, ArtworkPage, StakePage } from 'src/routes';
import './App.css';

const Page404 = () => <div>404 page</div>;

// just a slug before backend is available
const artworks: ArtworkI[] = [
  {
    id: '0',
    url: 'images/tmp/island.jpeg',
    rows: 2,
    cols: 2,
    piecesQuantity: 4,
    width: 700,
    height: 700,
  },
  {
    id: '1',
    url: 'images/tmp/field.jpeg',
    rows: 2,
    cols: 3,
    piecesQuantity: 6,
    width: 900,
    height: 800,
  },
];

function App() {
  const [location, setLocation] = useState<string>('');
  const { active, account } = useWeb3React<Web3Provider>();
  const { setCurrentUser, currentUser } = useAuthContext();
  const { setArtworks } = useArtworkContext();

  useEffect(() => {
    if (!active && !account) {
      return setCurrentUser!(null);
    }
    if (!!account) setCurrentUser!(account);
  }, [account, setCurrentUser, active]);

  useEffect(() => {
    setArtworks!(artworks);
  });
  
  useEffect(() => {
    const previousState = window.localStorage.getItem('slapsketch');

    if (!!previousState) {
      const parsedPreviousState: { location: string } = JSON.parse(previousState);
      const { location } = parsedPreviousState;
      setLocation(location);
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        {!currentUser && <Redirect to="/signin" />}
        {!!currentUser && <Redirect to={`${location}`} />}

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/uploadartwork" exact component={UploadArtworkPage} />
          <Route path="/artworkPage" exact component={UploadArtworkPage} />
          <Route path="/signin" exact component={SingInPage} />
          <Route path="/artworks" exact component={ArtworkPage} />
          <Route path="/artworks/:artworkId" exact component={ArtworkPage} />
          <Route path="/stakes/:artworkId/:pieceId" exact component={StakePage} />
          <Route path="*" component={Page404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
