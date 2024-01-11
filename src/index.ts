import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/abstract-provider'
import { Contract } from 'ethers'

import {
  ContractsLike,
  L1ChainId,
  NumberLike,
  SignerOrProviderLike,
} from './interface/types'
import { DeepPartial } from './utils/type-utils'
import { toNumber, toSignerOrProvider } from './utils/coercion'

export class TitanSDK {
  /**
   * Provider connected to the L1 chain.
   */
  public l1SignerOrProvider: Signer | Provider

  /**
   * Provider connected to the L2 chain.
   */
  public l2SignerOrProvider: Signer | Provider

  /**
   * Chain ID for the L1 network.
   */
  public l1ChainId: L1ChainId

  /**
   * Chain ID for the L2 network.
   */
  public l2ChainId: number

  /**
   * Contract objects attached to their respective providers and addresses.
   */
  public contracts: Contract

  /**
   * List of custom bridges for the given network.
   */
  // public bridges: BridgeAdapters

  /**
   * Creates a new CrossChainProvider instance.
   *
   * @param opts Options for the provider.
   * @param opts.l1SignerOrProvider Signer or Provider for the L1 chain, or a JSON-RPC url.
   * @param opts.l2SignerOrProvider Signer or Provider for the L2 chain, or a JSON-RPC url.
   * @param opts.l1ChainId Chain ID for the L1 chain.
   * @param opts.l2ChainId Chain ID for the L2 chain.
   * @param opts.depositConfirmationBlocks Optional number of blocks before a deposit is confirmed.
   * @param opts.l1BlockTimeSeconds Optional estimated block time in seconds for the L1 chain.
   * @param opts.contracts Optional contract address overrides.
   * @param opts.bridges Optional bridge address list.
   */
  constructor(opts: {
    l1SignerOrProvider: SignerOrProviderLike
    l2SignerOrProvider: SignerOrProviderLike
    l1ChainId: NumberLike
    l2ChainId: NumberLike
    depositConfirmationBlocks?: NumberLike
    l1BlockTimeSeconds?: NumberLike
    contracts?: DeepPartial<ContractsLike>
    // bridges?: BridgeAdapterData
    bedrock?: boolean
  }) {
    this.l1SignerOrProvider = toSignerOrProvider(opts.l1SignerOrProvider)
    this.l2SignerOrProvider = toSignerOrProvider(opts.l2SignerOrProvider)

    try {
      this.l1ChainId = toNumber(opts.l1ChainId)
    } catch (err) {
      throw new Error(`L1 chain ID is missing or invalid: ${opts.l1ChainId}`)
    }

    try {
      this.l2ChainId = toNumber(opts.l2ChainId)
    } catch (err) {
      throw new Error(`L2 chain ID is missing or invalid: ${opts.l2ChainId}`)
    }

    this.contracts = getAllOEContracts(this.l2ChainId, {
      l1SignerOrProvider: this.l1SignerOrProvider,
      l2SignerOrProvider: this.l2SignerOrProvider,
      overrides: opts.contracts,
    })

    this.bridges = getBridgeAdapters(this.l2ChainId, this, {
      overrides: opts.bridges,
      contracts: opts.contracts,
    })
  }
}
