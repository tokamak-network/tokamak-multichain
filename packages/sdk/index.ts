import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/abstract-provider'
import { Contract } from 'ethers'

import {
  ContractsLike,
  KeyOfContractsLike,
  L1ChainId,
  L2ChainID,
  NumberLike,
  SignerOrProviderLike,
} from './interface/types'
import { DeepPartial } from './utils/type-utils'
import { isL2ChainID, toNumber, toSignerOrProvider } from './utils/coercion'
import {
  getAllContracts,
  getAllERC20Contracts,
  getAllERC20Tokens,
  getContract,
} from './utils/contract'
import { getProvider } from './utils/provider'
import { TokamakTokenListT } from './utils/getList'

export class MultiChainSDK {
  /**
   * Provider connected to the chain.
   */
  public signerOrProvider: Signer | Provider

  /**
   * Chain ID for the network.
   */
  public chainId: L1ChainId | L2ChainID

  /**
   * Boolean value to check this chain is on L2
   */
  public isL2: boolean

  /**
   * Contract objects attached to their respective providers and addresses.
   */
  public contracts: ContractsLike

  /**
   * ERC20 Tokens objects from Tokens folder
   */
  public tokens: TokamakTokenListT
  /**
   * ERC20 Tokens contract objects attached to their respective providers and addresses.
   */
  public erc20contracts: Record<string, Contract>

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
    signerOrProvider?: SignerOrProviderLike
    chainId: NumberLike
    depositConfirmationBlocks?: NumberLike
    l1BlockTimeSeconds?: NumberLike
    contracts?: DeepPartial<ContractsLike>
    // bridges?: BridgeAdapterData
  }) {
    // this.signerOrProvider = toSignerOrProvider(opts.signerOrProvider)
    try {
      this.chainId = toNumber(opts.chainId)
    } catch (err) {
      throw new Error(`This chain ID is missing or invalid: ${opts.chainId}`)
    }

    this.isL2 = isL2ChainID(this.chainId)

    this.signerOrProvider = opts.signerOrProvider
      ? toSignerOrProvider(opts.signerOrProvider)
      : getProvider(toNumber(this.chainId))

    this.contracts = getAllContracts(this.chainId, {
      signerOrProvider: this.signerOrProvider,
      overrides: opts.contracts,
    })

    this.tokens = getAllERC20Tokens(this.chainId)

    this.erc20contracts = getAllERC20Contracts(this.tokens, {
      signerOrProvider: this.signerOrProvider,
    })

    // this.bridges = getBridgeAdapters(this.l2ChainId, this, {
    //   overrides: opts.bridges,
    //   contracts: opts.contracts,
    // })
  }

  /**
   * Signer connected to the chain.
   */
  get signer(): Signer {
    if (Provider.isProvider(this.signerOrProvider)) {
      throw new Error(`messenger has no signer`)
    } else {
      return this.signerOrProvider
    }
  }

  get provider(): Provider {
    if (Provider.isProvider(this.signerOrProvider)) {
      return this.signerOrProvider
    } else {
      return this.signerOrProvider.provider as Provider
    }
  }

  public getContract(contractName: KeyOfContractsLike) {
    return getContract(contractName, this.chainId, {
      signerOrProvider: this.signerOrProvider,
    })
  }

  public getToken(symbol: string) {
    const result = this.tokens.filter((token) => token.symbol === symbol)
    if (!result || result.length > 1) {
      throw new Error(
        `${symbol} token doesn't exist on this chain(id : ${this.chainId})`
      )
    } else {
      return result[0]
    }
  }

  public getTokenContract(symbol: string): Contract {
    const result = Object.fromEntries(
      Object.entries(this.erc20contracts).filter(([key]) => key === symbol)
    )

    if (!result || Object.keys(result).length !== 1) {
      throw new Error(
        `${symbol} token doesn't exist on this chain(id : ${this.chainId})`
      )
    } else {
      const [tokenContract] = Object.values(result)
      return tokenContract as Contract
    }
  }
}
