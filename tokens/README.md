# Multi Chain Tokmak Contract List

The Multi Chain Tokamak contract list is a list of contracts managed by Tokamak Network and the maintainers of this repo. These contracts have been deployed on Titan, Ethereum and Testnets.

# Review and Merge Process

## Overview

1. Create a PR following the [instructions](#Instructions) below
2. Wait for a [automated checks](#automated-checks).
3. After the automated checks pass and a reviewer approves the PR, then it will automatically be merged.

## Instructions

**Create a folder for your contract**

Create a folder inside of the data folder with your token symbol.  
For example, if you are trying to add a token with symbol "Tokamak", you must create a folder called Tokamak.

**Create a data file**  
Add a file to your folder called `data.json` with the following format:

```
{
  "name": "Token Name",
  "symbol": "SYMBOL",
  "decimals": 18,
  "description": "A Multi chain token",
  "website": "https://token.com",
  "twitter": "@token",
  "tokens": {
    "55004": {
      "address": "0x1234123412341234123412341234123412341234"
    },
    "5050": {
      "address": "0x2345234523452345234523452345234523452345"
    },
    "1": {
      "address": "0x5678567856785678567856785678567856785678"
    },
    "11155111": {
      "address": "0x6789678967896789678967896789678967896789"
    },
  }
}
```

These keys are representing chains supported. We currently accept chains on the following:

- `Titan (55004)`
- `Titan-goerli (5050)`
- `Ethereum (1)`
- `Sepolia (11155111)`

## Automated checks

Our Ci conducts a sequence of automated verifications for each pull request. The execution of these automated checks is integrated within the Validate PR procedure. Certain CI-detected issues will prompt an error, necessitating resolution before PR approval. These issues are labeled as 'auto-reject.' Others will generate a warning, demanding a manual review from a designated reviewer. These issues are marked as 'requires manual review' below.

- Given a contract actually exist on specified chains (auto-reject)
- A contract is not verified on main-network(Titan or Ethereum)
- contract address does not match to the hash type(Keccak-256)

**Debugging Amutomated checks failures**  
If the automated checks didn't pass, you can review the cause of the failure by downloading and extracting the validation-artifacts.zip file. Inside, you'll find a validation_results.txt file containing details on the reasons for the failure. Follow these steps to locate the validation-artifacts:

```
<!-- WIP --!>
1.
2.
3.
```

`npx tsx ./bin/cli.ts validate --datadir ./data --contracts <data folder name (e.g. bridge)>`

**Final approval**  
Every pull request undergoes a final lightweight approval process, regardless of whether it's marked as requiring manual review or not.

## Crate a pull request

Submit a [pull request](https://github.com/tokamak-network/titan.github.io/pulls) with the changes that you've made, adding only one change for one contract per pull request to streamline the review process. If you're adding multiple changes, please create separate pull requests for each contract to ensure clarity and manageability during the review.
