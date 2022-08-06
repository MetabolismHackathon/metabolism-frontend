import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connectorLocalStorageKey, injected } from './connectors';
import { useAuth } from './useAuth';
import { ConnectorNames } from './types';
import { Web3Provider } from '@ethersproject/providers';

export function useEagerConnect() {
  const { active } = useWeb3React<Web3Provider>();
  const [tried, setTried] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(
      connectorLocalStorageKey,
    ) as ConnectorNames;
    if (connectorId) {
      injected.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized && connectorId) {

          login(connectorId);
          setTried(true);
        }
      });
    }
    // }
  }, [login]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React<Web3Provider>();
  const connectorId = window.localStorage.getItem(
    connectorLocalStorageKey,
  ) as ConnectorNames;

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate, connectorId]);
}
