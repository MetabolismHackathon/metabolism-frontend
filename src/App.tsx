import { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useAuthContext } from './context/authContext';
import { UploadArtworkPage, HomePage, SingInPage, ArtworkPage, StakePage } from 'src/routes';
import './App.css';

const Page404 = () => <div>404 page</div>;

function App() {
  const { active, account } = useWeb3React<Web3Provider>();
  const { setCurrentUser, currentUser } = useAuthContext();
  console.log(currentUser);

  useEffect(() => {
    if (!active && !account) {
      return setCurrentUser!(null);
    }
    if (!!account) setCurrentUser!(account);
  }, [account, setCurrentUser, active]);
  return (
    <div className="App">
      <BrowserRouter>
        {!currentUser && <Redirect to="/signin" />}

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
