import { useCallback } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { ConnectorNames } from './types';
import { connectorsByName } from './web3React';
import { connectorLocalStorageKey } from './connectors';

import { Web3Provider } from '@ethersproject/providers';

export const useAuth = () => {
  const { activate, deactivate, active, account, connector } = useWeb3React<Web3Provider>();
  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID];
    const connectorId = window.localStorage.getItem(
      connectorLocalStorageKey,
    ) as ConnectorNames;
    if (connector) {
      if (connectorID === connectorId) {
        activate(connector);
      } else {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            console.error('unsupported network');
            window.localStorage.removeItem(connectorLocalStorageKey);
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (error instanceof NoEthereumProviderError) {
              console.error('no provider error');
            } else if (error instanceof UserRejectedRequestErrorInjected) {
              console.error('user rejected error');
            } else {
              console.log(error);
            }
          }
        }).then(() => {
          const isWindowsOS = window.navigator.userAgent.indexOf('Windows');
          if (isWindowsOS !== -1) {
            const timeout = setTimeout(() => window.location.reload(), 2000);
            return () => clearTimeout(timeout);
          }

          console.log(active, account);
        });
      }
    } else {
      console.error('unexpected error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    console.log('logout');
    deactivate();
    window.localStorage.removeItem(connectorLocalStorageKey);
  }, [deactivate]);

  return {
    login,
    logout,
  };
};
