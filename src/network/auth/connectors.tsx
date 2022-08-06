import { InjectedConnector } from '@web3-react/injected-connector';
import { Config, ConnectorNames } from './types';

const chains = [137];
export const injected = new InjectedConnector({ supportedChainIds: chains });

export const connectors: Config[] = [
  {
    title: 'Metamask',
    connectorId: ConnectorNames.Injected,
  },
];

export const connectorLocalStorageKey = 'connectorId';
