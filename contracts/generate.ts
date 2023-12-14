import fs from "fs";
import path from "path";
import { glob } from "glob";
import { version } from "../package.json";
import { L2Chain } from "../src/types";
import { CONTRACT_EXPORT } from ".";

/**
 * Generates a token list from the data in the data folder.
 *
 * @param datadir Directory containing data files.
 *
 * @returns Generated token list JSON object.
 */
const basePath = "./contracts/data";

export const generate = () => {
  // Function to traverse directories recursively
  function collectAddresses() {
    const contracts = {};

    // Read the contracts directory
    const contractNames = fs.readdirSync(basePath);

    console.log("contractNames", contractNames);

    contractNames.forEach((contractName) => {
      const contractPath = path.join(basePath, contractName);
      const testnetNames = fs.readdirSync(contractPath);

      contracts[contractName] = {};

      console.log("testnetNames", testnetNames);

      testnetNames.forEach((testnetName) => {
        const networkNamePath = path.join(contractPath, testnetName);
        const data = JSON.parse(
          fs.readFileSync(path.join(networkNamePath, "address.json"), "utf8")
        );

        try {
          // Read the JSON file directly
          contracts[contractName][testnetName] = data;
        } catch (err) {
          console.error(`Error reading file ${testnetName}: ${err}`);
        }
      });
    });

    return contracts;
  }

  // Collect addresses based on provided directory path
  const collectedAddresses = collectAddresses();

  console.log("*result**", collectedAddresses);

  // Convert to JSON
  const jsonData = JSON.stringify(collectedAddresses, null, 2);

  // Write the JSON data to a file
  const outputFile = "./tokamak.contractlist.json"; // Replace with the desired output file path

  fs.writeFile(outputFile, jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log(`JSON data has been written to ${outputFile}`);
    }
  });
};

generate();
