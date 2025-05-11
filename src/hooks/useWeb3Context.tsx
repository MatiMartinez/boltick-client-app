import { useContext } from 'react'
import { Web3Context } from '../contexts/Web3Context'

export default function useWeb3Context () {
  const context = useContext(Web3Context);
 
  if (!context) {
    throw new Error("useWeb3Context must be used inside the Provider");
  }
 
  return context;
};
