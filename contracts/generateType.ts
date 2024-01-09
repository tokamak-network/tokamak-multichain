import fs from "fs";
import path from "path";

const rootFolder = "./data"; // Change this to your root folder

function generateTypeFile(data) {
  let typeFile = "type TokamakContracts = {\n";

  for (const mainKey in data) {
    typeFile += `  ${mainKey}: {\n`;
    const mainObj = data[mainKey];
    for (const subKey in mainObj) {
      typeFile += `    ${subKey}: '${mainObj[subKey]}';\n`;
    }
    typeFile += "  },\n";
  }

  typeFile += "};";

  return typeFile;
}

// Function to generate typings for each folder
function generateTypingsForFolders(folderPath) {
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const jsonFilePath = path.join(filePath, `data.json`);

      // Check if the folder contains a JSON file
      if (fs.existsSync(jsonFilePath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
        const typeFileContent = generateTypeFile(jsonData);

        const typeFile = `type TokamakContracts = ${jsonData}`;

        // Write the generated types to a TypeScript file
        fs.writeFileSync(`ExtractedKeys.d.ts`, typeFileContent);
      }
    }
  });
}

// Generate typings for each folder in the root directory
generateTypingsForFolders(rootFolder);
