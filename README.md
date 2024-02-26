# tokamak-multichain

The `tokamak-multichain` package provides a collection of tools for efficiently interacting with the Titan network.  
It achieves this by providing a unified token and contract list for Titan and other chains.

## Installation

```
npm install tokamak-multichain
```

## Quickstart Recipes

- Get all token data on each network

```javascript
import { MultiChainSDK } from 'tokamak-multichain'

const TokamakSDK = new MultiChainSDK({
  chainId: 55004,
})
const tokenList = TokamakSDK.tokens
// Output the structure of the tokenList
console.log('Token List : ', tokenList)

/*
The structure of the tokenList
Token List : [
  {
    chainId: 55004,
    address: '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2',
    name: 'Tokamak Network Token',
    symbol: 'TON',
    decimals: 18,
    logoURI: 'https://github.com/tokamak-network/tokamak-multichain/data/TON/logo.svg',
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
    logoURI: 'https://github.com/tokamak-network/tokamak-multichain/data/ETH/logo.svg',
    extensions: {
      bridgeAddress: '0x4200000000000000000000000000000000000010',
      titanListId: 'default',
      titanTokenId: 'ETH'
    }
  },
  ... more token comes 
]
*/
```

- Get a token contract

```javascript
import { MultiChainSDK } from 'tokamak-multichain'

const sdk = new MultiChainSDK({
  chainId: 55004,
})
const TON_CONTRACT = sdk.getTokenContract('TON')
const totalSupply = await TON_CONTRACT.totalSupply()
console.log('totalSupply :', totalSupply)
// totalSupply : BigNumber { _hex: '0x24d826680754da71d432', _isBigNumber: true }
```

- Get a contract instance

```javascript
import { MultiChainSDK } from 'tokamak-multichain'

const sdk = new MultiChainSDK({
  chainId: 55004,
})
const L2StandardBridge = sdk.getContract('L2StandardBridge')
const L2Messenger = await L2StandardBridge.messenger()
console.log('L2Messenger : ', L2Messenger)
// L2Messenger : 0x4200000000000000000000000000000000000007
```

## Example using CodeSandbox

You can try out the tokamak-multichain package in an online environment using CodeSandbox. Click the button below to open the project in CodeSandbox:

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/live/943669f4-e3cb-4ef7-96ad-e5ac2efc0202?file=%2Findex.js%3A5%2C23)

This CodeSandbox project includes a basic setup with the @titan/sdk package. You can explore and experiment with the functionalities in a live environment.

## Contributing

- If you want to add a token or change to the token list, refer to [the contracts documentation](https://github.com/tokamak-network/tokamak-multichain/blob/main/tokens/README.md).
- If you want to add a contract or change to the contract list, refer to [the tokens documentation](https://github.com/tokamak-network/tokamak-multichain/blob/main/contracts/README.md).

## Production branch

The production branch is "main". This branch holds the codebase for the most recent "stable" releases. Any changes made to the main branch are initially integrated from the develop branch.

## Development branch

The primary development branch is "dev". The develop branch includes the latest software version that remains compatible with the most recent experimental network deployments. If you're implementing a change that maintains backward compatibility, please submit your pull request to the develop branch.
