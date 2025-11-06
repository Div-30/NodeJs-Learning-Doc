const fileManager = require("./fileManager.js");
const fileName = "data.txt";

// Test1: Checking if file exist
if (fileManager.fileExists(fileName)) {
  console.log("The file exists");
} else {
  console.log("The file doesn't exist");
}

// Test2: Writing to the file
fileManager.writeFile(fileName, "Always Hard working", (error) => {
  if (error) {
    console.log("Error writing file: ", error.message);
  } else {
    console.log("File written successfully");
  }
});

// Test3: reading file
fileManager.readFile(fileName, (error, content) => {
  if (error) {
    console.log("Error reading file: ", error.message);
  } else {
    console.log("File content: ", content);
  }
});
