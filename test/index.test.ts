import fs from 'fs'
import path from 'path'

import { ethers } from 'ethers'

import titanGithub from '../dist/index'
import { TitanSDK } from '../src'

const getABI = (fileType) => {
  const filePath = path.join('./contracts/data/bridge/abi', `${fileType}.json`)

  try {
    const fileData = fs.readFileSync(filePath, 'utf8')
    const abi = JSON.parse(fileData)
    return abi
  } catch (error) {
    console.error(`Error reading ABI for _${fileType}:`, error)
    return null
  }
}

const init = async () => {
  // console.log(getABI('L1Bridge'))
  const sdk = new TitanSDK({ chainId: 55004 })
  const contract = sdk.getTokenContract('TON')
  // console.log(sdk.signer)
  console.log(sdk.getTokenContract('TON'))
}

init()
