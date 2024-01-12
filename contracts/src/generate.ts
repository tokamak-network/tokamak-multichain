import fs from 'fs'
import path from 'path'

type AnyObject = Record<string, any>
const pickValues = <T extends AnyObject, K extends keyof T>(
  obj: T,
  keys: K[]
): T[K][] => keys.map((key) => obj[key]).filter((value) => value !== undefined)

// Function to traverse directories recursively
const collectAddresses = () => {
  const contracts = {}

  // Read the contracts directory
  const contractNames = fs.readdirSync(basePath)

  contractNames.forEach((contractName) => {
    const contractPath = path.join(basePath, contractName)
    const data = JSON.parse(
      fs.readFileSync(path.join(contractPath, 'data.json'), 'utf8')
    )

    if (!data) {
      return
    }

    Object.entries(data).map(([key]) => {
      contracts[key] = { ...contracts[key], ...data[key] }
    })

    // Object.entries(data).map(([key]) => {
    //   if (!contracts[key]) {
    //     contracts[key] = {}
    //   }

    //   if (!contracts[key][contractName]) {
    //     contracts[key][contractName] = {}
    //   }

    //   console.log(contracts, key, contractName)
    //   console.log(data[key])
    //   contracts[key][contractName] = data[key]
    // })
  })

  return contracts
}

/**
 * Generates a contract list from the data in the data folder.
 *
 * @property basePath Directory containing data files.
 *
 * @returns Generated contract list JSON object.
 */
const basePath = path.join(__dirname, '../data')

export const generate = () => {
  // Collect addresses based on provided directory path
  const collectedAddresses = collectAddresses()

  // Convert to JSON
  const jsonData = JSON.stringify(collectedAddresses, null, 2)

  // Write the JSON data to a file
  const outputFile = path.join(__dirname, '../tokamak.contractlist.json') // Replace with the desired output file path

  fs.writeFile(outputFile, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err)
    } else {
      console.log(`JSON data has been written to ${outputFile}`)
    }
  })
}

generate()
