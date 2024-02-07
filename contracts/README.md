# Multi Chain Tokmak Contract List

The Multi Chain Tokamak contract list is a list of contracts managed by Tokamak Network and the maintainers of this repo. These contracts have been deployed on Titan, Ethereum and Testnets.

# Review and Merge Process

## Overview

1. Create a PR following the [instructions](#Instructions) below
2. Wait for a [automated checks](#automated-checks).
3. After the automated checks pass and a reviewer approves the PR, then it will automatically be merged.

## Instructions

**Create a folder for your contract**  

Create a folder inside of the data folder with your contract name(contract unit).  
For example, if you are trying to add a contract with name ```"bridge"```, you must create a folder called ```bridge```.

**Create a data file**  
Add a file to your folder called ```data.json``` with the following format:
```
{
  "address": {
    "1": {
      "L1Bridge": "0x59aa194798Ba87D26Ba6bEF80B85ec465F4bbcfD",
      "L1Messenger": "0xfd76ef26315Ea36136dC40Aeafb5D276d37944AE"
    },
    "11155111": {
      "L1Bridge": "0x7377F3D0F64d7a54Cf367193eb74a052ff8578FD",
      "L1Messenger": "0x2878373BA3Be0Ef2a93Ba5b3F7210D76cb222e63"
    },
    "55004": {
      "L2Bridge": "0x4200000000000000000000000000000000000010"
    },
    "5050": {
      "L2Bridge": "0x4200000000000000000000000000000000000010"
    }
  }
}
```
Then you need to create a JSON file with the same name as the key you entered in the data file under the abi folder.
```
Tokamak/
│
├── data.json
├── abi/
│   ├── L1Bridge.json
│   ├── L1Messenger.json
│   ├── L2Bridge.json
```

These keys are representing chains supported. We currently accept chains on the following:  
- ```Titan (55004)```
- ```Titan-goerli (5050)```
- ```Ethereum (1)```
- ```Goerli (5)```
- ```Sepolia (11155111)```


## Automated checks
Our Ci conducts a sequence of automated verifications for each pull request. The execution of these automated checks is integrated within the Validate PR procedure. Certain CI-detected issues will prompt an error, necessitating resolution before PR approval. These issues are labeled as 'auto-reject.' Others will generate a warning, demanding a manual review from a designated reviewer. These issues are marked as 'requires manual review' below.
* Given a contract actually exist on specified chains (auto-reject)
* A contract is not verified on main-network(Titan or Ethereum)
* contract address does not match to the hash type(Keccak-256)  

**Debugging Amutomated checks failures**  
If the automated checks didn't pass, you can review the cause of the failure by validating on your local. you'll find a validation_results.txt file containing details on the reasons for the failure. Follow these steps to validate your change:  

1. Run ```"npm run validate-contracts"``` or ```tsx ./bin/cli.ts validate-contracts``` command 
2. It will make validation_result.txt in root directory where it's located after validation.
3. Open ```validation_result.txt``` to view the validation results. 


**Final approval**  
Every pull request undergoes a final lightweight approval process, regardless of whether it's marked as requiring manual review or not.


## Crate a pull request

Submit a [pull request](https://github.com/tokamak-network/titan.github.io/pulls) with the changes that you've made, adding only one change for one contract per pull request to streamline the review process. If you're adding multiple changes, please create separate pull requests for each contract to ensure clarity and manageability during the review.
