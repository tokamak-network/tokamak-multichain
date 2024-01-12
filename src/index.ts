import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/abstract-provider'

import {
  ContractsLike,
  L1ChainId,
  L2ChainID,
  NumberLike,
  SignerOrProviderLike,
} from './interface/types'
import { DeepPartial } from './utils/type-utils'
import { toNumber, toSignerOrProvider } from './utils/coercion'
import { getAllContracts } from './utils/contract'

export class TitanSDK {
  /**
   * Provider connected to the chain.
   */
  public signerOrProvider: Signer | Provider

  /**
   * Chain ID for the L2 network.
   */
  public chainId: L1ChainId | L2ChainID

  /**
   * Contract objects attached to their respective providers and addresses.
   */
  public contracts: ContractsLike

  /**
   * List of custom bridges for the given network.
   */
  // public bridges: BridgeAdapters

  /**
   * Creates a new CrossChainProvider instance.
   *
   * @param opts Options for the provider.
   * @param opts.signerOrProvider Signer or Provider for the chain, or a JSON-RPC url.
   * @param opts.chainId Chain ID for the chain.
   * @param opts.depositConfirmationBlocks Optional number of blocks before a deposit is confirmed.
   * @param opts.contracts Optional contract address overrides.
   * @param opts.bridges Optional bridge address list.
   */
  constructor(opts: {
    signerOrProvider: SignerOrProviderLike
    chainId: NumberLike
    depositConfirmationBlocks?: NumberLike
    l1BlockTimeSeconds?: NumberLike
    contracts?: DeepPartial<ContractsLike>
    // bridges?: BridgeAdapterData
    bedrock?: boolean
  }) {
    this.signerOrProvider = toSignerOrProvider(opts.signerOrProvider)

    try {
      this.chainId = toNumber(opts.chainId)
    } catch (err) {
      throw new Error(`This chain ID is missing or invalid: ${opts.chainId}`)
    }

    this.contracts = getAllContracts(this.chainId, {
      signerOrProvider: this.signerOrProvider,
      overrides: opts.contracts,
    })

    // this.bridges = getBridgeAdapters(this.l2ChainId, this, {
    //   overrides: opts.bridges,
    //   contracts: opts.contracts,
    // })
  }
}
