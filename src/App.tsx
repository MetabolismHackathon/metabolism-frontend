import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UploadArtworkPage, HomePage, SingInPage, ArtworkPage, StakePage } from 'src/routes';
import './App.css';

const Page404 = () => <div>404 page</div>;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
