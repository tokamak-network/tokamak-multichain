// import fs from 'fs'
// import path from 'path'

// import { ethers } from 'ethers'

// import { TitanSDK } from '../dist/packages'
// import { TitanSDK } from '../packages'
// import {TitanSDK} from "@titan/github"
import { TitanSDK } from '../packages'

const init = async () => {
  const sdk = new TitanSDK({
    chainId: 5050,
  })
  const test = sdk.erc20contracts
  console.log(test)
}

init()
