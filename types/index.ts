/*
 * Supported chains for the tokenlist and contractlist
 * If adding a new chain consider keeping the name
 * consistent with wagmi
 */
export type Chain =
  | "ethereum" //chainId : 1
  | "goerli" //chainId : 5
  | "sepolia" //chainId : 11155111
  | "titan" //chainId : 55004
  | "titan-goerli" //chainId : 5050
  | "titan-sepolia";
export const l2Chains = ["titan", "titan-goerli", "titan-sepolia"] as const;
