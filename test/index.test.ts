// import fs from 'fs'
// import path from 'path'

// import { ethers } from 'ethers'

// import { MultiChainSDK } from '../dist/packages'
// import { TitanSDK } from '../packages'

import { MultiChainSDK } from '../packages'
import dd from '../contracts/abis'
import { generateAbisPath } from '../contracts/src/generate'
import abis from '../contracts/abis'
const init = async () => {
  const sdk = new MultiChainSDK({
    chainId: 5,
  })
  const test = sdk.getContract('L1ProjectManager')
  sdk.contracts
  sdk.tokens
  // generateAbisPath()
}

init().catch((e) => {
  console.log('**e**')
  console.log(e)
})
