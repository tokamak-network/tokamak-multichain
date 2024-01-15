import { ethers } from 'ethers'

import { NumberLike, SupportedChainID } from '../interface/types'

const EthereumProvider = new ethers.providers.JsonRpcProvider('')
const SepoliaProvider = new ethers.providers.JsonRpcProvider('')
const TitanProvider = new ethers.providers.JsonRpcProvider(
  'https://rpc.titan.tokamak.network'
)
const TitanGoerliProvider = new ethers.providers.JsonRpcProvider(
  'https://rpc.titan-goerli.tokamak.network'
)
const TitanSepoliaProvider = new ethers.providers.JsonRpcProvider('')

const providers: {
  [K in SupportedChainID]: ethers.providers.JsonRpcProvider
} = {
  '1': EthereumProvider,
  '11155111': SepoliaProvider,
  '55004': TitanProvider,
  '5050': TitanGoerliProvider,
  '0': TitanSepoliaProvider,
}

export const getProvider = (chainId: number | string) => {
  return providers[chainId]
}
