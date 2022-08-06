import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEagerConnect, useInactiveListener } from './hooks';

export const useSetActivatingConnector = () => {
  const context = useWeb3React<Web3Provider>();
  const { connector } = context;

  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !!activatingConnector);

  return { setActivatingConnector, triedEager, activatingConnector };
};
