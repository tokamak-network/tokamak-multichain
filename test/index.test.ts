// import fs from 'fs'
// import path from 'path'

// import { ethers } from 'ethers'

// import { MultiChainSDK } from '../dist/packages'
// import { TitanSDK } from '../packages'
// import {TitanSDK} from "@titan/github"

import { MultiChainSDK } from '../packages'
import dd from '../contracts/abis'
import { generateAbisPath } from '../contracts/src/generate'
import abis from '../contracts/abis'
const init = async () => {
  const sdk = new MultiChainSDK({
    chainId: 5050,
  })
  const test = sdk.getContract('L2ProjectManagerProxy')
  const d = await test.projects('0x17904851ee325d35bbe511fd437b21dbbaf33d06')
  console.log(d)
  // generateAbisPath()
}

init()
