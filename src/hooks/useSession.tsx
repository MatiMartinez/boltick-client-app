import useWeb3Context from './useWeb3Context';

export default function useSession() {
  const { isConnected, address, balance, userInfo, connect, disconnect } = useWeb3Context();

  return { isConnected, address, balance, userInfo, connect, disconnect };
}
