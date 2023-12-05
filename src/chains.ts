import { ethers } from "ethers";

import { Chain, L1Chain, L2Chain, Network } from "./types";

const DEFAULT_INFURA_KEY = "84842078b09946638c03157f83405213";

export const NETWORK_DATA: Record<Chain, Network> = {
  ethereum: {
    id: 1,
    name: "Mainnet",
    provider: new ethers.providers.InfuraProvider("homestead"),
    layer: 1,
  },

  goerli: {
    id: 5,
    name: "Goerli",
    provider: new ethers.providers.InfuraProvider("goerli"),
    layer: 1,
  },
  sepolia: {
    id: 11155111,
    name: "Sepolia",
    provider: new ethers.providers.StaticJsonRpcProvider(
      `https://sepolia.infura.io/v3/${DEFAULT_INFURA_KEY}`,
      11155111
    ),
    layer: 1,
  },
  titan: {
    id: 55004,
    name: "Titan",
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.titan.tokamak.network"
    ),
    layer: 2,
  },
  "titan-goerli": {
    id: 5050,
    name: "Titan-goerli",
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.titan-goerli.tokamak.network"
    ),
    layer: 2,
  },
  "titan-sepolia": {
    id: 50505050,
    name: "Titan-sepolia",
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.titan.tokamak.network"
    ),
    layer: 2,
  },
};

interface L2BridgeInformation {
  l2StandardBridgeAddress: string;
}

interface L1BridgeInformation {
  l2Chain: L2Chain;
  l1StandardBridgeAddress: string;
}

export const L2_STANDARD_BRIDGE_INFORMATION: Record<
  L2Chain,
  L2BridgeInformation
> = {
  titan: {
    l2StandardBridgeAddress: "0x4200000000000000000000000000000000000010",
  },
  "titan-sepolia": {
    l2StandardBridgeAddress: "0x4200000000000000000000000000000000000010",
  },
  "titan-goerli": {
    l2StandardBridgeAddress: "0x4200000000000000000000000000000000000010",
  },
};

export const L2_TO_L1_PAIR: Partial<Record<L2Chain, L1Chain>> = {
  titan: "ethereum",
  "titan-goerli": "goerli",
  "titan-sepolia": "sepolia",
};

export const L1_STANDARD_BRIDGE_INFORMATION: Record<
  L1Chain,
  L1BridgeInformation[]
> = {
  ethereum: [
    {
      l2Chain: "titan",
      l1StandardBridgeAddress: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1",
    },
  ],
  goerli: [
    {
      l2Chain: "titan-goerli",
      l1StandardBridgeAddress: "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8",
    },
  ],
  sepolia: [
    {
      l2Chain: "titan-sepolia",
      l1StandardBridgeAddress: "0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1",
    },
  ],
};
