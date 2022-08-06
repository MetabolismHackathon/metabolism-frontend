import { useHistory } from 'react-router-dom';
import {
  connectorsByName,
  connectorLocalStorageKey,
  connectors,
  useAuth,
  useSetActivatingConnector,
} from 'src/network';

import { getChainOfId, MMRPCFactory } from 'src/constants';
import { ISingInPageProps } from './SingInPageProps';
import styles from './SingInPage.module.scss';
export const SingInPage: React.FC<ISingInPageProps> = () => {
  const history = useHistory();
  const signInButtonHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleWalletOpen();
  };

  const connector: any = (connectorsByName as any)['Injected'];

  const { login } = useAuth();

  const walletConfig = connectors.find((connector) => connector.connectorId === 'Injected');

  const { setActivatingConnector } = useSetActivatingConnector();

  const handleWalletOpen = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const isSupported = connector.supportedChainIds.find(
        (chain: number) => chain === Number(chainId),
      );
      const supportedChain = getChainOfId(connector.supportedChainIds[0]);
      const MetaMaskApi = MMRPCFactory(window.ethereum);
      if (!isSupported) {
        console.error('unsuppoeted network');
        await MetaMaskApi.walletSwitchEthChain(supportedChain);
        window.localStorage.removeItem(connectorLocalStorageKey);
      } else {
        login(walletConfig!.connectorId);
        setActivatingConnector(connector);
        window.localStorage.setItem(connectorLocalStorageKey, walletConfig!.connectorId);
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.disclaimer}>{'You need a wallet to use our platform.'}</div>

      <div>
        <div className={styles.metamask}></div>
        <button className={styles.signinButton} onClick={signInButtonHandler}>
          Sing In with Metamask
        </button>
      </div>
    </div>
  );
};
