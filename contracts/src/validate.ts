import fs from 'fs'
import path from 'path'

import { isAddress } from 'ethers/lib/utils'

import { ValidationResult } from '../../tokens/src/types'

const basePath = path.join(__dirname, '../data')
const tryToValidate = async (): Promise<ValidationResult[]> => {
  const result: ValidationResult[] = []
  // Read the contracts directory
  const contractNames = fs.readdirSync(basePath)

  for (const contractName of contractNames) {
    const contractPath = path.join(basePath, contractName)
    const data = JSON.parse(
      fs.readFileSync(path.join(contractPath, 'data.json'), 'utf8')
    )

    const abiPath = path.join(basePath, contractName, 'abi')

    if (!data) {
      result.push({
        type: 'error',
        message: `${contractName} folder doesn't have data.json file`,
      })
      break
    }

    let contractNameForABI = ''

    try {
      for (const [chianId] of Object.entries(data)) {
        const chainContracts = data[chianId]
        for (const [eachContractName] of Object.entries(chainContracts)) {
          const contractAddress = chainContracts[eachContractName]

          if (!isAddress(contractAddress)) {
            result.push({
              type: 'error',
              message: `In ${contractName} with chainId ${chianId}, ${eachContractName} is not valid address on Ethereum`,
            })
          }

          contractNameForABI = eachContractName
          const abiFilePath = path.join(abiPath, `${eachContractName}.json`)
          fs.accessSync(abiFilePath, fs.constants.F_OK)
        }
      }
    } catch (e) {
      result.push({
        type: 'error',
        message: `In ${contractName}, ${contractNameForABI} contract doesn't have its abi file inside abis folder.`,
      })
    }
  }

  return result
}

/**
 * Validates a token list data folder.
 *
 * @param datadir Directory containing data files.
 *
 * @return Validation results.
 */
export const validateContractsList = async (): Promise<ValidationResult[]> => {
  const validated = await tryToValidate()
  return validated
}
