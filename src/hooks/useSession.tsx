import useWeb3Context from "./useWeb3Context";

export default function useSession() {
  const {
    isConnected,
    walletAddress,
    balance,
    userInfo,
    connect,
    disconnect,
    refreshBalance,
  } = useWeb3Context();

  return {
    isConnected,
    walletAddress,
    balance,
    userInfo,
    connect,
    disconnect,
    refreshBalance,
  };
}
