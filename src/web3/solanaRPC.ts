import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { CustomChainConfig, IProvider } from "@web3auth/base";
import { SolanaWallet } from "@web3auth/solana-provider";

export default class SolanaRpc {
  private solanaWallet: SolanaWallet;

  constructor(provider: IProvider) {
    this.solanaWallet = new SolanaWallet(provider);
  }

  getWalletAddress = async (): Promise<string> => {
    try {
      const accounts = await this.solanaWallet.requestAccounts();
      return accounts[0];
    } catch (error) {
      console.error("Error getting wallet address:", error);
      throw new Error("Failed to get wallet address");
    }
  };

  getBalance = async (): Promise<string> => {
    try {
      const connectionConfig = await this.solanaWallet.request<
        string[],
        CustomChainConfig
      >({
        method: "solana_provider_config",
        params: [],
      });

      const conn = new Connection(connectionConfig.rpcTarget);
      const accounts = await this.solanaWallet.requestAccounts();

      const balance = await conn.getBalance(new PublicKey(accounts[0]));
      const balanceSol = balance / LAMPORTS_PER_SOL;

      return balanceSol.toFixed(4);
    } catch (error) {
      console.error("Error getting balance:", error);
      return "0.0000";
    }
  };

  refreshBalance = async (): Promise<string> => {
    return await this.getBalance();
  };
}
