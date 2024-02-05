import assert from 'assert'

import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { BigNumber, ethers } from 'ethers'

import {
  AddressLike,
  L2ChainID,
  NumberLike,
  SignerOrProviderLike,
} from '../interface/types'

/**
 * Converts a SignerOrProviderLike into a Signer or a Provider. Assumes that if the input is a
 * string then it is a JSON-RPC url.
 *
 * @param signerOrProvider SignerOrProviderLike to turn into a Signer or Provider.
 * @returns Input as a Signer or Provider.
 */
export const toSignerOrProvider = (
  signerOrProvider: SignerOrProviderLike
): Signer | Provider => {
  if (typeof signerOrProvider === 'string') {
    return new ethers.providers.JsonRpcProvider(signerOrProvider)
  } else if (Provider.isProvider(signerOrProvider)) {
    return signerOrProvider
  } else if (Signer.isSigner(signerOrProvider)) {
    return signerOrProvider
  } else {
    throw new Error('Invalid provider')
  }
}

/**
 * Converts a number-like into an ethers BigNumber.
 *
 * @param num Number-like to convert into a BigNumber.
 * @returns Number-like as a BigNumber.
 */
export const toBigNumber = (num: NumberLike): BigNumber => {
  return ethers.BigNumber.from(num)
}

/**
 * Converts a number-like into a number.
 *
 * @param num Number-like to convert into a number.
 * @returns Number-like as a number.
 */
export const toNumber = (num: NumberLike): number => {
  return toBigNumber(num).toNumber()
}

/**
 * Converts an address-like into a 0x-prefixed address string.
 *
 * @param addr Address-like to convert into an address.
 * @returns Address-like as an address.
 */
export const toAddress = (addr: AddressLike): string => {
  if (typeof addr === 'string') {
    assert(ethers.utils.isAddress(addr), `${addr} : Invalid address`)
    return ethers.utils.getAddress(addr)
  } else {
    assert(ethers.utils.isAddress(addr.address), `${addr} : Invalid address`)
    return ethers.utils.getAddress(addr.address)
  }
}

/**
 * Check this chain is belong to L2
 *
 * @param chainId chain-id from the contructor
 * @returns Boolean to make sure this chain in on supported L2ChainIDs
 */
export const isL2ChainID = (chainId: number): chainId is L2ChainID => {
  return Object.values(L2ChainID).includes(chainId as L2ChainID)
}
