import fs from 'fs'
import path from 'path'

import { Contract, ethers } from 'ethers'

import { DeepPartial } from './type-utils'
import {
  AddressLike,
  ContractsLike,
  L1Contracts,
  L2Contracts,
} from '../interface/types'
import { toAddress } from './coercion'
import ERC20ABI from '../constants/abis/erc20.json'
import {
  TokamakContractList,
  TokamakTokenList,
  TokamakTokenListT,
} from './getList'

const TOKEN_LIST = TokamakTokenList
const CONTRACT_ADDRESSES = TokamakContractList

/**
 * Caching abi files
 */
const cache = new Map()
const dir = path.join(__dirname, '../../contracts/data')
const getContractInterface = (contractName: string) => {
  try {
    if (cache.has(contractName)) {
      return cache.get(contractName)
    }
    const files = fs.readdirSync(dir)

    for (const contract of files) {
      const filePath = path.join(dir, contract, 'abi', `${contractName}.json`)

      if (fs.existsSync(filePath)) {
        const abi = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        cache.set(contractName, abi)
        return abi
      }
    }
  } catch (error) {
    console.error(`Error reading ABI for _${contractName}:`, error)
    return null
  }
}

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
    iface?: ethers.utils.Interface
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
  // const name = NAME_REMAPPING[contractName] || contractName
  const iface: ethers.utils.Interface =
    opts.iface ?? getContractInterface(contractName)
  //   try {
  //     iface = getContractInterfaceBedrock(name)
  //   } catch (err) {
  //   iface = getContractInterface(name)
  //   }

  return new Contract(
    toAddress(opts.address || addresses[contractName] || [contractName]),
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
 * @param opts.l1SignerOrProvider: Signer or provider to connect to the contracts.
 * @param opts.overrides Custom contract address overrides for L1 or L2 contracts.
 * @returns An object containing ethers.Contract objects connected to the appropriate addresses on
 * both L1 and L2.
 */
export const getAllContracts = (
  chainId: number,
  opts: {
    signerOrProvider?: ethers.Signer | ethers.providers.Provider
    overrides?: DeepPartial<ContractsLike>
  } = {}
): ContractsLike => {
  const addresses: L1Contracts | L2Contracts = CONTRACT_ADDRESSES[
    chainId
  ] as ContractsLike

  // Attach all contracts.
  const contracts = {} as L1Contracts | L2Contracts
  for (const [contractName, contractAddress] of Object.entries(addresses)) {
    contracts[contractName] = getContract(
      contractName as keyof L1Contracts,
      chainId,
      {
        address:
          (opts.overrides?.[contractName] as AddressLike) || contractAddress,
        signerOrProvider: opts.signerOrProvider,
      }
    )
  }

  return contracts
}

export const getAllERC20Tokens = (chainId: number): TokamakTokenListT => {
  return TOKEN_LIST.filter((token) => token.chainId === chainId)
}

export const getAllERC20Contracts = (
  tokenList: TokamakTokenListT,
  opts: {
    signerOrProvider?: ethers.Signer | ethers.providers.Provider
    overrides?: DeepPartial<ContractsLike>
  } = {}
): Record<string, Contract> => {
  // Attach all erc20 contracts.
  const contracts = {}
  for (const [, value] of Object.entries(tokenList)) {
    contracts[value.symbol] = new Contract(
      toAddress(value.address as AddressLike),
      ERC20ABI,
      opts.signerOrProvider
    )
  }

  return contracts
}
