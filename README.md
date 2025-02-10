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
  // If you want to initialize with a network other than Titan or Titan Testnet,
  // you should pass it for signerOrProvider.
  // Example - signerOrProvider: `https://infura.io/v3/${YOUR_KEY}`
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

const TokamakSDK = new MultiChainSDK({
  chainId: 55004,
})
const TON_CONTRACT = TokamakSDK.getTokenContract('TON')
const totalSupply = await TON_CONTRACT.totalSupply()
console.log('totalSupply :', totalSupply)
// totalSupply : BigNumber { _hex: '0x24d826680754da71d432', _isBigNumber: true }
```

- Get a contract instance

```javascript
import { MultiChainSDK } from 'tokamak-multichain'

const TokamakSDK = new MultiChainSDK({
  chainId: 55004,
})
const L2StandardBridge = TokamakSDK.getContract('L2StandardBridge')
const L2Messenger = await L2StandardBridge.messenger()
console.log('L2Messenger : ', L2Messenger)
// L2Messenger : 0x4200000000000000000000000000000000000007
```

## Example using CodeSandbox

You can try out the tokamak-multichain package in an online environment using CodeSandbox. Click the button below to open the project in CodeSandbox:

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/live/943669f4-e3cb-4ef7-96ad-e5ac2efc0202?file=%2Findex.js%3A5%2C23)

This CodeSandbox project includes a basic setup with the @titan/sdk package. You can explore and experiment with the functionalities in a live environment.

## 🌏  Open in other Cloud IDEs

Click any of the buttons below to start a new development environment to demo or contribute to the codebase without having to install anything on your machine:

[![Open in VS Code](https://img.shields.io/badge/Open%20in-VS%20Code-blue?logo=visualstudiocode)](https://vscode.dev/github/tokamak-network/tokamak-multichain)
[![Open in Glitch](https://img.shields.io/badge/Open%20in-Glitch-blue?logo=glitch)](https://glitch.com/edit/#!/import/github/tokamak-network/tokamak-multichain)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/tokamak-network/tokamak-multichain)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/tokamak-network/tokamak-multichain)
[![Open in Repl.it](https://replit.com/badge/github/withastro/astro)](https://replit.com/github/tokamak-network/tokamak-multichain)
[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/tokamak-network/tokamak-multichain)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/tokamak-network/tokamak-multichain)
## Contributing

- If you want to add a token or change to the token list, refer to [the contracts documentation](https://github.com/tokamak-network/tokamak-multichain/blob/main/tokens/README.md).
- If you want to add a contract or change to the contract list, refer to [the tokens documentation](https://github.com/tokamak-network/tokamak-multichain/blob/main/contracts/README.md).

## Production branch

The production branch is "main". This branch holds the codebase for the most recent "stable" releases. Any changes made to the main branch are initially integrated from the develop branch.

## Development branch

The primary development branch is "dev". The develop branch includes the latest software version that remains compatible with the most recent experimental network deployments. If you're implementing a change that maintains backward compatibility, please submit your pull request to the develop branch.
