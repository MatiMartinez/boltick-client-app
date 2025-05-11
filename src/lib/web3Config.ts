import { createWeb3Modal } from '@web3modal/wagmi/react';
import { walletConnectProvider } from '@web3modal/wagmi';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

const projectId = 'YOUR_PROJECT_ID'; // Replace with your WalletConnect project ID

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [walletConnectProvider({ projectId }), publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: { projectId },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: 'EventHub' },
    }),
  ],
  publicClient,
});

createWeb3Modal({ wagmiConfig: config, projectId, chains });

export { chains };