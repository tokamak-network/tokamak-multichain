import { ethers } from 'ethers'

import { Chain, L1Chain, L2Chain, Network } from './types'

const DEFAULT_INFURA_KEY = '84842078b09946638c03157f83405213'

export const NETWORK_DATA: Record<Chain, Network> = {
  ethereum: {
    id: 1,
    name: 'Mainnet',
    provider: new ethers.providers.InfuraProvider('homestead'),
    layer: 1,
  },

  goerli: {
    id: 5,
    name: 'Goerli',
    provider: new ethers.providers.InfuraProvider('goerli'),
    layer: 1,
  },
  sepolia: {
    id: 11155111,
    name: 'Sepolia',
    provider: new ethers.providers.StaticJsonRpcProvider(
      `https://sepolia.infura.io/v3/${DEFAULT_INFURA_KEY}`,
      11155111
    ),
    layer: 1,
  },
  titan: {
    id: 55004,
    name: 'Titan',
    provider: new ethers.providers.StaticJsonRpcProvider(
      'https://rpc.titan.tokamak.network'
    ),
    layer: 2,
  },
  'titan-goerli': {
    id: 5050,
    name: 'Titan-goerli',
    provider: new ethers.providers.StaticJsonRpcProvider(
      'https://rpc.titan-goerli.tokamak.network'
    ),
    layer: 2,
  },
  'titan-sepolia': {
    id: 50505050,
    name: 'Titan-sepolia',
    provider: new ethers.providers.StaticJsonRpcProvider(
      'https://rpc.titan.tokamak.network'
    ),
    layer: 2,
  },
  'thanos-sepolia': {
    id: 111551118080,
    name: 'Thanos-sepolia',
    provider: new ethers.providers.StaticJsonRpcProvider(
      'https://rpc.thanos-sepolia-test.tokamak.network'
    ),
    layer: 2,
  },
}

interface L2BridgeInformation {
  l2StandardBridgeAddress: string
}

interface L1BridgeInformation {
  l2Chain: L2Chain
  l1StandardBridgeAddress: string
}

export const L2_STANDARD_BRIDGE_INFORMATION: Record<
  L2Chain,
  L2BridgeInformation
> = {
  titan: {
    l2StandardBridgeAddress: '0x4200000000000000000000000000000000000010',
  },
  'titan-sepolia': {
    l2StandardBridgeAddress: '0x4200000000000000000000000000000000000010',
  },
  'titan-goerli': {
    l2StandardBridgeAddress: '0x4200000000000000000000000000000000000010',
  },
}

export const L2_TO_L1_PAIR: Partial<Record<L2Chain, L1Chain>> = {
  titan: 'ethereum',
  'titan-goerli': 'goerli',
  'titan-sepolia': 'sepolia',
}

export const L1_STANDARD_BRIDGE_INFORMATION: Record<
  L1Chain,
  L1BridgeInformation[]
> = {
  ethereum: [
    {
      l2Chain: 'titan',
      l1StandardBridgeAddress: '0x59aa194798Ba87D26Ba6bEF80B85ec465F4bbcfD',
    },
  ],
  goerli: [
    {
      l2Chain: 'titan-goerli',
      l1StandardBridgeAddress: '0x7377F3D0F64d7a54Cf367193eb74a052ff8578FD',
    },
  ],
  sepolia: [
    {
      l2Chain: 'titan-sepolia',
      l1StandardBridgeAddress: '0x7377F3D0F64d7a54Cf367193eb74a052ff8578FD',
    },
  ],
}
