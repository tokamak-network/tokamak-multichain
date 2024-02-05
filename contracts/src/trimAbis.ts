import fs from 'fs'
import path from 'path'

const dir = path.join(__dirname, '../data')
const trimAbis = () => {
  const contracts = fs.readdirSync(dir)

  for (const contract of contracts) {
    const thisAbiDirectory = path.join(dir, contract, 'abi')
    const abiFiles = fs.readdirSync(thisAbiDirectory)
    for (const abiFileName of abiFiles) {
      const abiFilePath = path.join(dir, contract, 'abi', abiFileName)
      const abiFileContent = fs.readFileSync(abiFilePath, 'utf8')
      const abiObject = JSON.parse(abiFileContent)
      if (!Array.isArray(abiObject) && abiObject.abi) {
        fs.writeFile(
          path.join(thisAbiDirectory, abiFileName),
          JSON.stringify(abiObject.abi, null, 2),
          'utf8',
          (err) => {
            if (err) {
              console.error(`Error writing JSON file : ${abiFileName}`, err)
            } else {
              console.log(`${abiFileName}.json has been written successfully.`)
            }
          }
        )
      }
    }
  }
  console.log('****Process to trim abis is done.****')
}

trimAbis()
