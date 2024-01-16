import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { Contract, BigNumber } from 'ethers'

import { TokamakContractList } from '../utils/getList'

/*
 * Supported chains for the tokenlist and contractlist
 * If adding a new chain consider keeping the name
 * consistent with wagmi
 */
export type Chain =
  | 'ethereum' //chainId : 1
  | 'goerli' //chainId : 5
  | 'sepolia' //chainId : 11155111
  | 'titan' //chainId : 55004
  | 'titan-goerli' //chainId : 5050
  | 'titan-sepolia'
export const l2Chains = ['titan', 'titan-goerli', 'titan-sepolia'] as const

/**
 * L1 network chain IDs
 */
export enum L1ChainId {
  MAINNET = 1,
  SEPOLIA = 11155111,
}

/**
 * L2 network chain IDs
 */
export enum L2ChainID {
  TITAN = 55004,
  TITAN_GOERLI = 5050,
  TITAN_SEPOLIA = 0,
}

export type SupportedChainID = L1ChainId | L2ChainID

/**
 * Convenience type for something that looks like the L1  contract interface but could be
 * addresses instead of actual contract objects.
 */
export type L1Contracts = {
  [K in keyof ((typeof TokamakContractList)[L1ChainId.MAINNET] &
    (typeof TokamakContractList)[L1ChainId.SEPOLIA])]: AddressLike
}

/**
 * Convenience type for something that looks like the L2 contract interface but could be
 * addresses instead of actual contract objects.
 */
export type L2Contracts = {
  [K in keyof ((typeof TokamakContractList)[L2ChainID.TITAN] &
    (typeof TokamakContractList)[L2ChainID.TITAN_GOERLI])]: AddressLike
}

/**
 * Convenience type for something that looks like the  contract interface but could be
 * addresses instead of actual contract objects.
 */
export type ContractsLike = L1Contracts | L2Contracts
export type KeyOfContractsLike = keyof L1Contracts | keyof L2Contracts

export type ERC20ContractsList = Record<KeyOfContractsLike, Contract>

/**
 * Stuff that can be coerced into a provider.
 */
export type ProviderLike = string | Provider

/**
 * Stuff that can be coerced into a signer.
 */
export type SignerLike = string | Signer

/**
 * Stuff that can be coerced into a signer or provider.
 */
export type SignerOrProviderLike = SignerLike | ProviderLike

/**
 * Stuff that can be coerced into a number.
 */
export type NumberLike = string | number | BigNumber

/**
 * Stuff that can be coerced into an address.
 */
export type AddressLike = string | Contract
