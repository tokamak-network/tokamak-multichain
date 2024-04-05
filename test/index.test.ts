// import fs from 'fs'
// import path from 'path'

// import { ethers } from 'ethers'
import { Contract } from 'ethers'

import { MultiChainSDK } from '../packages'
import { getProvider } from '../packages/sdk/utils/provider'
import TOKEN_LIST from '../tokamak.tokenlist.json'
import CONTRACT_LIST from '../tokamak.contractlist.json'

const TitanSDKParams = {
  chainId: 55004,
  provider: getProvider(55004),
  isL2: true,
  contractName: 'L2StandardBridge',
  TON_ADDRESS: '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2',
}

describe('MultiChainSDK', () => {
  let sdk: MultiChainSDK

  beforeEach(() => {
    // Initialize the SDK with test options
    sdk = new MultiChainSDK({
      chainId: 55004,
    })
  })

  it('should have the correct properties', () => {
    expect(sdk.signerOrProvider).toBe(TitanSDKParams.provider)
    expect(sdk.chainId).toBe(TitanSDKParams.chainId)
    expect(sdk.isL2).toBe(TitanSDKParams.isL2)
    expect(sdk.tokens).toEqual(expect.any(Object))
    expect(sdk.erc20contracts).toEqual(expect.any(Object))
  })

  it('should return the correct contract', () => {
    const contract = sdk.getContract('L2StandardBridge')
    expect(contract).toEqual(expect.any(Object))
    expect(contract.address).toBe(
      CONTRACT_LIST[TitanSDKParams.chainId]['L2StandardBridge']
    )
  })

  it('should return the correct token', () => {
    const token = sdk.getToken('TON')
    expect(token).toEqual(expect.any(Object))
    expect(token.address).toBe(TitanSDKParams.TON_ADDRESS)
  })

  it('should return the correct a token contract', () => {
    const tokenContract = sdk.getTokenContract('TON')
    expect(tokenContract).toBeInstanceOf(Contract)
    expect(tokenContract.address).toBe(TitanSDKParams.TON_ADDRESS)
  })
})
