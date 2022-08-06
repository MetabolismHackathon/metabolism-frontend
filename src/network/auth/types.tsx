export enum ConnectorNames {
  Injected = 'Injected',
  Metamask = 'Injected',
}

export type Login = (connectorId: ConnectorNames | any) => void;

export interface Config {
  title: string;
  connectorId: ConnectorNames;
}
