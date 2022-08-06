export class Chain {
  hexId: string;
  decimalId: number;
  name: string;
  URL_RPC: string;
  explorerURL: string;

  constructor(
    decimalId: number,
    name: string,
    URL_RPC: string,
    explorerURL: string
  ) {
    this.hexId = '0x' + decimalId.toString(16);
    this.decimalId = decimalId;
    this.name = name;
    this.URL_RPC = URL_RPC;
    this.explorerURL = explorerURL;
  }
}

const Eth = new Chain(
  1,
  'Сеть Ethereum Mainnet',
  'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  'https://etherscan.io'
);
const Matic = new Chain(
  137,
  'Matic',
  'https://rpc-mainnet.maticvigil.com/',
  'https://explorer.matic.network/'
);
const Kovan = new Chain(
  42,
  'Тестовая сеть Kovan',
  'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  'https://kovan.etherscan.io'
);
const BinanceSC = new Chain(
  56,
  'Binance Smart Chain Mainnet',
  'https://bsc-dataseed1.binance.org',
  'https://bscscan.com'
);
export const Chains = [Eth, Matic, Kovan, BinanceSC];

export function getChainOfId(id: String): Chain {
  return Chains.find((chain) => chain.decimalId === Number(id)) || BinanceSC;
}

class MetaMaskRPCFactory {
  ethereum: any;

  constructor(ethereum: any) {
    this.ethereum = ethereum;
  }

  async ethRequestAccount() {
    try {
      let res = await this.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('ETH_REQUEST_ACCOUNTS=', res);
    } catch (e) {
      console.log(e);
    }
  }

  async walletSwitchEthChain(chain: Chain) {
    try {
      await this.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chain.hexId }],
      });
    } catch (e: any) {
      if (e.code === 4902) {
        try {
          await this.addEthereumChain(chain);
        } catch (e: any) {
          console.log(e.message);
        }
      }
    }
  }

  async addEthereumChain(chain: Chain) {
    try {
      await this.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chain.hexId,
            chainName: chain.name,
            rpcUrls: [chain.URL_RPC] /* ... */,
          },
        ],
      });
    } catch (e: any) {
      console.log(e.message);
    }
  }
}

export const MMRPCFactory = (ethereum: Object) =>
  new MetaMaskRPCFactory(ethereum);
