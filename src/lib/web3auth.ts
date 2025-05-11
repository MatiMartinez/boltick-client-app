import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { ethers } from "ethers";

const clientId = "YOUR_WEB3AUTH_CLIENT_ID"; // Get from Web3Auth Dashboard

export const web3auth = new Web3Auth({
  clientId,
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1", // Ethereum Mainnet
    rpcTarget: "https://rpc.ankr.com/eth",
  },
  web3AuthNetwork: "cyan",
});

const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "none",
  },
  adapterSettings: {
    whiteLabel: {
      name: "EventHub",
      logoLight: "https://your-logo-url.com/logo.png",
      logoDark: "https://your-logo-url.com/logo-dark.png",
      defaultLanguage: "es",
      dark: true,
    },
  },
});

web3auth.configureAdapter(openloginAdapter);

export const initWeb3Auth = async () => {
  try {
    await web3auth.initModal();
    return web3auth;
  } catch (error) {
    console.error("Error initializing Web3Auth:", error);
    throw error;
  }
};

export const getProvider = () => {
  if (!web3auth.provider) return null;
  return new ethers.BrowserProvider(web3auth.provider);
};

export const getUserInfo = async () => {
  if (!web3auth.connected) return null;
  return await web3auth.getUserInfo();
};