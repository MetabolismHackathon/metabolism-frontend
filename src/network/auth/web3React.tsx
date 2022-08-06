import { injected } from './connectors';
import { ConnectorNames } from './types';

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Metamask]: injected,
};
