import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arthera } from "./artheraChain.js";
export const account = privateKeyToAccount("your private key");
export const publicClient = createPublicClient({
  chain: arthera,
  transport: http(),
});
export const walletClient = createWalletClient({
  account,
  chain: arthera,
  transport: http(),
});
