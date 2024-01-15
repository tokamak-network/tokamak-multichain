import fs from 'fs'
import path from 'path'

import { ethers } from 'ethers'

import titanGithub from '../dist/index'
import { TitanSDK } from '../src'
// import {TitanSDK} from "@titan/github"

const init = async () => {
  const sdk = new TitanSDK({
    chainId: 55004,
  })
  // const contracts = sdk.contracts
  // Output the structure of the tokenList
  const L2StandardBridge = sdk.getContract('L2StandardBridge')
  const L2Messenger = await L2StandardBridge.messenger()
  console.log('L2Messenger', L2Messenger)

  /*
The structure of the tokenList
tokenList =  [
  {
    chainId: 55004,
    address: '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2',
    name: 'Tokamak Network Token',
    symbol: 'TON',
    decimals: 6,
    logoURI: 'https://titan.github.io/data/TON/logo.svg',
    extensions: {
      bridgeAddress: '0x4200000000000000000000000000000000000010',
      titanListId: 'default',
      titanTokenId: 'TON'
    }
  },
  {
    chainId: 55004,
    address: '0x0000000000000000000000000000000000000000',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoURI: 'https://titan.github.io/data/ETH/logo.svg',
    extensions: {
      bridgeAddress: '0x4200000000000000000000000000000000000010',
      titanListId: 'default',
      titanTokenId: 'ETH'
    }
  },
  ... more token comes 
]
*/
}

init()
