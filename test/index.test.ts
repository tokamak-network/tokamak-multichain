// import fs from 'fs'
// import path from 'path'

// import { ethers } from 'ethers'
// import { MultiChainSDK } from '../packages'
import { MultiChainSDK } from '../dist/packages'
import dd from '../contracts/abis'
import { generateAbisPath } from '../contracts/src/generate'
import abis from '../contracts/abis'
const init = async () => {
  const sdk1 = new MultiChainSDK({
    chainId: 1,
  })
  const sdk2 = new MultiChainSDK({
    chainId: 5,
  })
  const sdk3 = new MultiChainSDK({
    chainId: 55004,
  })
  const sdk4 = new MultiChainSDK({
    chainId: 5050,
  })
  console.log(sdk4.getContract('L2AirdropTonVault'))
  // sdk.contracts
  // sdk.tokens
  // generateAbisPath()
}

init().catch((e) => {
  console.log('**e**')
  console.log(e)
})
