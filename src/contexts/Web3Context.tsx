import { createContext, useEffect, useState, ReactNode } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";

import SolanaRpc from "../web3/solanaRPC";

interface UserInfo {
  name?: string;
  email?: string;
  profileImage?: string;
}

interface Web3ContextType {
  isConnected: boolean;
  walletAddress: string;
  balance: string;
  userInfo: UserInfo | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
}

export const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  walletAddress: "",
  balance: "0.0000",
  userInfo: null,
  connect: async () => {},
  disconnect: async () => {},
  refreshBalance: async () => {},
});

interface Web3ProviderProps {
  children: ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("0.0000");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (isConnected && provider) {
      loadWalletData();
    }
  }, [isConnected, provider]);

  const init = async () => {
    try {
      const privateKeyProvider = new SolanaPrivateKeyProvider({
        config: {
          chainConfig: {
            chainId: "0x65",
            chainNamespace: CHAIN_NAMESPACES.SOLANA,
            rpcTarget: import.meta.env.VITE_SOLANA_RPC_URL,
            tickerName: "Solana",
            ticker: "SOL",
            decimals: 9,
            blockExplorerUrl: "https://explorer.solana.com",
            logo: "https://images.toruswallet.io/solana.svg",
            displayName: "Solana Mainnet",
          },
        },
      });

      const web3auth = new Web3Auth({
        clientId: import.meta.env.VITE_WEB3AUTH_CLIENTE_ID,
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
        privateKeyProvider: privateKeyProvider,
      });

      setWeb3auth(web3auth);
      await web3auth.initModal();

      if (web3auth.connected) {
        setProvider(web3auth.provider);
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Error initializing Web3Auth:", error);
    }
  };

  const connect = async () => {
    try {
      if (!web3auth) return;

      const web3authProvider = await web3auth.connect();

      if (web3authProvider && web3auth.connected) {
        setProvider(web3authProvider);
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  const disconnect = async () => {
    try {
      if (!web3auth) return;

      await web3auth.logout();
      setProvider(null);
      setIsConnected(false);
      setWalletAddress("");
      setBalance("0.0000");
      setUserInfo(null);
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  const loadWalletData = async () => {
    try {
      if (!provider) return;

      const rpc = new SolanaRpc(provider);

      const address = await rpc.getWalletAddress();
      setWalletAddress(address);

      const currentBalance = await rpc.getBalance();
      setBalance(currentBalance);

      await getUserInfo();
    } catch (error) {
      console.error("Error loading wallet data:", error);
    }
  };

  const getUserInfo = async () => {
    try {
      if (!web3auth) return;

      const user = await web3auth.getUserInfo();

      setUserInfo({
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      });
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };

  const refreshBalance = async () => {
    try {
      if (!provider) return;
      const rpc = new SolanaRpc(provider);
      const currentBalance = await rpc.refreshBalance();
      setBalance(currentBalance);
    } catch (error) {
      console.error("Error refreshing balance:", error);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        walletAddress,
        balance,
        userInfo,
        connect,
        disconnect,
        refreshBalance,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
