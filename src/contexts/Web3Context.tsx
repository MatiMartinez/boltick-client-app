import { createContext, useEffect, useState, ReactNode } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK, UserInfo } from '@web3auth/base';
import { SolanaPrivateKeyProvider } from '@web3auth/solana-provider';
import SolanaRpc from '../web3/solanaRPC';

interface Web3ContextType {
  isConnected: boolean;
  address: string;
  userInfo: Partial<UserInfo> | null;
  balance: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  provider: IProvider | null;
}

export const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  address: '',
  userInfo: null,
  balance: '',
  connect: async () => {},
  disconnect: async () => {},
  provider: null,
});

interface Web3ProviderProps {
  children: ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | null>(null);
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (isConnected) {
      getAccounts();
      getBalance();
      getUserInfo();
    }
  }, [isConnected]);

  const init = async () => {
    try {
      const privateKeyProvider = new SolanaPrivateKeyProvider({
        config: {
          chainConfig: {
            chainId: '0x3',
            chainNamespace: CHAIN_NAMESPACES.SOLANA,
            rpcTarget: 'https://api.devnet.solana.com',
            tickerName: 'Solana',
            ticker: 'SOL',
            // decimals: 9,
            blockExplorerUrl: 'https://explorer.solana.com',
            logo: 'https://images.toruswallet.io/solana.svg',
            displayName: 'Solana Devnet',
          },
        },
      });

      const web3auth = new Web3Auth({
        clientId: 'BFS1buOGa-_nwycrTVNXUqilBoKONejneVzfgS-_DV7FcK3ZCoaYIzE1xZEp0uRRwVwyHufh9YAJ_HIbeKn5OZ8',
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        privateKeyProvider: privateKeyProvider,
      });

      setWeb3auth(web3auth);
      await web3auth.initModal();
      setProvider(web3auth.provider);

      if (web3auth.connected) {
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error initializing Web3Auth:', error);
    }
  };

  const connect = async () => {
    try {
      if (!web3auth) return;

      const web3authProvider = await web3auth.connect();

      if (web3authProvider) {
        if (web3auth.connected) {
          setIsConnected(true);
        }

        setProvider(web3authProvider);
      }

      // Codigo comentado para obtener informacion del usuario
      // if (web3authProvider) {
      //   const provider = getProvider();
      //   setProvider(provider);
      //   setIsConnected(true);
      //   const signer = await provider?.getSigner();
      //   const address = await signer?.getAddress();
      //   setAddress(address || null);
      //   const userInfo = await getUserInfo();
      //   setUserInfo(userInfo);
      // }
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const disconnect = async () => {
    try {
      if (!web3auth) return;

      await web3auth.logout();
      setProvider(null);
      setIsConnected(false);
      setUserInfo(null);
      setAddress('');
      setBalance('');
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const getUserInfo = async () => {
    try {
      if (!web3auth) return;

      const user = await web3auth.getUserInfo();
      setUserInfo(user);
    } catch (error) {
      console.error('Error getting user information:', error);
    }
  };

  const getAccounts = async () => {
    try {
      if (!provider) return;

      const rpc = new SolanaRpc(provider);
      const address = await rpc.getAccounts();
      setAddress(address[0]);
    } catch (error) {
      console.error('Error getting user address:', error);
    }
  };

  const getBalance = async () => {
    try {
      if (!provider) return;

      const rpc = new SolanaRpc(provider);
      const currentBalance = await rpc.getBalance();
      setBalance(currentBalance);
    } catch (error) {
      console.error('Error getting user balance:', error);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        userInfo,
        address,
        balance,
        connect,
        disconnect,
        provider,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
