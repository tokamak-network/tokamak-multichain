import fs from 'fs'
import path from 'path'

const dir = path.join(__dirname, '../data')
const trimAbis = () => {
  const contracts = fs.readdirSync(dir)

  for (const contract of contracts) {
    const abiFiles = fs.readdirSync(path.join(dir, contract, 'abi'))
    for (const abiFileName of abiFiles) {
      const abiFilePath = path.join(dir, contract, 'abi', abiFileName)
      const abiFileContent = fs.readFileSync(abiFilePath, 'utf8')
      const abiObject = JSON.parse(abiFileContent)
      //   console.log('fileContent', fileContent)
      //   const firstFewChars = fileContent.slice(0, 10)
      if (!Array.isArray(abiObject) && abiObject.abi) {
        console.log('test')
        console.log(JSON.stringify(abiObject.abi, null, 2))
        fs.writeFile(
          path.join(abiFilePath, `${abiFileName}.json`),
          JSON.stringify(abiObject.abi, null, 2),
          'utf8',
          (err) => {
            if (err) {
              console.error(`Error writing JSON file :`, err)
            } else {
              console.log(`JSON file  has been written successfully.`)
            }
          }
        )
      }
      //   if (firstChar !== '[') {
      //     fs.writeFile(
      //       path.join(__dirname, `${abi}.json`),
      //       JSON.stringify(abi.abi),
      //       'utf8',
      //       (err) => {}
      //     )
      //   }
    }
  }
}

trimAbis()
