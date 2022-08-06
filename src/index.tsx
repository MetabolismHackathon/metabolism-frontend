import React from 'react';
import ReactDOM from 'react-dom/client';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { AuthContextProvider } from './context/authContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
);
