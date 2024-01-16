// import fs from 'fs'
// import path from 'path'

// import { ethers } from 'ethers'

import { MultiChainSDK } from '../dist'
// import { TitanSDK } from '../packages'
// import {TitanSDK} from "@titan/github"
// import { MultiChainSDK } from '../packages'

const init = async () => {
  const sdk = new MultiChainSDK({
    chainId: 5050,
  })
  const test = sdk.erc20contracts
  console.log(test)
}

init()
