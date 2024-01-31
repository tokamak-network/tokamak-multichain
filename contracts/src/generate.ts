import fs from 'fs'
import path from 'path'

// type AnyObject = Record<string, any>
// const pickValues = <T extends AnyObject, K extends keyof T>(
//   obj: T,
//   keys: K[]
// ): T[K][] => keys.map((key) => obj[key]).filter((value) => value !== undefined)

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
      console.error('Error writing Contract List JSON file:', err)
    } else {
      console.log(`Contract List JSON data has been written to ${outputFile}`)
    }
  })
}

const readDirectory = (directoryPath: any) => {
  const dir = path.resolve(__dirname, directoryPath)

  const files = fs.readdirSync(dir)
  const result = {}

  for (const file of files) {
    const filePath = path.join(dir, file, 'abi')

    const abiFiles = fs.readdirSync(filePath)

    for (const abiFile of abiFiles) {
      const abiPath = path.join(filePath, abiFile)
      const contractName = path.parse(abiFile).name
      /*eslint-disable*/
      const contractData = require(abiPath)

      result[contractName] = contractData
    }
  }

  return result
}

export const generateAbisPath = () => {
  try {
    const baseDirectory = '../data' // Base directory containing nested folders
    const outputFilePath = path.resolve(__dirname, '../abis.ts') // Output file path
    // Generate code to export the nested object
    // Generate nested object structure from base directory
    const abiData = readDirectory(baseDirectory)
    const exportCode = `${JSON.stringify(abiData, null, 2)};\n`

    fs.writeFileSync(outputFilePath, exportCode)
    console.log(`Abi List JSON data has been written to ${outputFilePath}`)
  } catch (e) {
    console.error('Error writing Abi List JSON file:', e)
  }
}

const init = () => {
  generate()
  generateAbisPath()
}

init()
