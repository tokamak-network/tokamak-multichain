import { Contract, ethers } from 'ethers'

import { DeepPartial } from './type-utils'
import {
  AddressLike,
  ContractsLike,
  L1Contracts,
  L2Contracts,
} from '../interface/types'
import CONTRACT_ADDRESSES from '../../dist/tokamak.contractlist.mjs'
import { toAddress } from './coercion'

/**
 * We've changed some contract names in this SDK to be a bit nicer. Here we remap these nicer names
 * back to the original contract names so we can look them up.
 */
const NAME_REMAPPING = {
  AddressManager: 'Lib_AddressManager' as const,
  OVM_L1BlockNumber: 'iOVM_L1BlockNumber' as const,
  WETH: 'WETH9' as const,
  BedrockMessagePasser: 'L2ToL1MessagePasser' as const,
}

const getContractInterface = () => {}

/**
 * Returns an ethers.Contract object for the given name, connected to the appropriate address for
 * the given L2 chain ID. Users can also provide a custom address to connect the contract to
 * instead. If the chain ID is not known then the user MUST provide a custom address or this
 * function will throw an error.
 *
 * @param contractName Name of the contract to connect to.
 * @param l2ChainId Chain ID for the L2 network.
 * @param opts Additional options for connecting to the contract.
 * @param opts.address Custom address to connect to the contract.
 * @param opts.signerOrProvider Signer or provider to connect to the contract.
 * @returns An ethers.Contract object connected to the appropriate address and interface.
 */
export const getContract = (
  contractName: keyof L1Contracts | keyof L2Contracts,
  chainId: number,
  opts: {
    address?: AddressLike
    signerOrProvider?: ethers.Signer | ethers.providers.Provider
  } = {}
): Contract => {
  const addresses = CONTRACT_ADDRESSES[chainId]
  if (addresses === undefined && opts.address === undefined) {
    throw new Error(
      `cannot get contract ${contractName} for unknown chain ID ${chainId}, you must provide an address`
    )
  }

  // Bedrock interfaces are backwards compatible. We can prefer Bedrock interfaces over legacy
  // interfaces if they exist.
  const name = NAME_REMAPPING[contractName] || contractName
  const iface: ethers.utils.Interface = getContractInterface(name)
  //   try {
  //     iface = getContractInterfaceBedrock(name)
  //   } catch (err) {
  //   iface = getContractInterface(name)
  //   }

  return new Contract(
    toAddress(
      opts.address || addresses.l1[contractName] || addresses.l2[contractName]
    ),
    iface,
    opts.signerOrProvider
  )
}

/**
 * Automatically connects to all contract addresses, both L1 and L2, for the given L2 chain ID. The
 * user can provide custom contract address overrides for L1 or L2 contracts. If the given chain ID
 * is not known then the user MUST provide custom contract addresses for ALL L1 contracts or this
 * function will throw an error.
 *
 * @param l2ChainId Chain ID for the L2 network.
 * @param opts Additional options for connecting to the contracts.
 * @param opts.l1SignerOrProvider: Signer or provider to connect to the L1 contracts.
 * @param opts.l2SignerOrProvider: Signer or provider to connect to the L2 contracts.
 * @param opts.overrides Custom contract address overrides for L1 or L2 contracts.
 * @returns An object containing ethers.Contract objects connected to the appropriate addresses on
 * both L1 and L2.
 */
export const getAllContracts = (
  chainId: number,
  opts: {
    l1SignerOrProvider?: ethers.Signer | ethers.providers.Provider
    l2SignerOrProvider?: ethers.Signer | ethers.providers.Provider
    overrides?: DeepPartial<ContractsLike>
  } = {}
): ContractsLike => {
  const addresses = CONTRACT_ADDRESSES[chainId] || undefined

  // Attach all L1 contracts.
  const l1Contracts = {} as L1Contracts
  for (const [contractName, contractAddress] of Object.entries(addresses.l1)) {
    l1Contracts[contractName] = getContract(
      contractName as keyof L1Contracts,
      chainId,
      {
        address: opts.overrides?.l1?.[contractName] || contractAddress,
        signerOrProvider: opts.l1SignerOrProvider,
      }
    )
  }

  // Attach all L2 contracts.
  const l2Contracts = {} as L2Contracts
  for (const [contractName, contractAddress] of Object.entries(addresses.l2)) {
    l2Contracts[contractName] = getContract(
      contractName as keyof L2Contracts,
      chainId,
      {
        address: opts.overrides?.l2?.[contractName] || contractAddress,
        signerOrProvider: opts.l2SignerOrProvider,
      }
    )
  }

  return {
    l1: l1Contracts,
    l2: l2Contracts,
  }
}
