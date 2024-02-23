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

const sdk = new MultiChainSDK({
  chainId: 55004,
})
const tokenList = sdk.tokens
// Output the structure of the tokenList
console.log('Token List:', tokenList)

/*
The structure of the tokenList
tokenList =  [
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

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/devbox/example-tokamak-multichain-v799tz?file=%2Findex.js%3A14%2C1&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clru959b30006356ke6yf2s5n%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clru959b20002356kacumgm7l%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clru959b20004356ku66ul83r%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clru959b20005356k70xqu7d7%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clru959b20002356kacumgm7l%2522%253A%257B%2522id%2522%253A%2522clru959b20002356kacumgm7l%2522%252C%2522activeTabId%2522%253A%2522clru98zes0002356kujrtt06c%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clru959b20001356kb3l80m92%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522id%2522%253A%2522clru98zes0002356kujrtt06c%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A14%252C%2522startColumn%2522%253A1%252C%2522endLineNumber%2522%253A14%252C%2522endColumn%2522%253A1%257D%255D%252C%2522filepath%2522%253A%2522%252Findex.js%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fnode_modules%252F%2522%252C%2522id%2522%253A%2522clruaiz6200q5356kt0buyfh5%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%257D%252C%2522clru959b20005356k70xqu7d7%2522%253A%257B%2522id%2522%253A%2522clru959b20005356k70xqu7d7%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clru959b20003356k6t2j46og%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clru959b20003356k6t2j46og%2522%257D%252C%2522clru959b20004356ku66ul83r%2522%253A%257B%2522id%2522%253A%2522clru959b20004356ku66ul83r%2522%252C%2522activeTabId%2522%253A%2522clru9vsue00c3356k9vbq1dfk%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clru9vsue00c3356k9vbq1dfk%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clru9vu6p00jbdqg62mi5dg8y%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

This CodeSandbox project includes a basic setup with the @titan/sdk package. You can explore and experiment with the functionalities in a live environment.

## Contributing

- If you want to add a token or change to the token list, refer to [the contracts documentation](https://github.com/tokamak-network/tokamak-multichain/blob/main/tokens/README.md).
- If you want to add a contract or change to the contract list, refer to [the tokens documentation](https://github.com/tokamak-network/tokamak-multichain/blob/main/contracts/README.md).

## Directory Structure

```
├── contracts:
├── tokens:
├── bin:
├── test:
├── src
│   ├──
```

## Production branch

The production branch is "main". This branch holds the codebase for the most recent "stable" releases. Any changes made to the main branch are initially integrated from the develop branch.

## Development branch

The primary development branch is "dev". The develop branch includes the latest software version that remains compatible with the most recent experimental network deployments. If you're implementing a change that maintains backward compatibility, please submit your pull request to the develop branch.
