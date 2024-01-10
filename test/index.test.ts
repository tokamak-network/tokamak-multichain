import fs from 'fs'
import path from 'path'

import titanGithub from '../dist/index'

const getABI = (fileType) => {
  const filePath = path.join('./contracts/data/bridge/abi', `${fileType}.json`)

  try {
    const fileData = fs.readFileSync(filePath, 'utf8')
    const abi = JSON.parse(fileData)
    return abi
  } catch (error) {
    console.error(`Error reading ABI for _${fileType}:`, error)
    return null
  }
}

const init = () => {
  console.log(getABI('L1Bridge'))
}

init()
