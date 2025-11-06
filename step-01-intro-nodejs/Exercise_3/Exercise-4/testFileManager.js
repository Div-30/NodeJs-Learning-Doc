const fileManager = require("./fileManager.js");
const fileName = "data.txt";

// Test1: Checking if file exist
if (fileManager.fileExists(fileName)) {
  console.log("The file exists");
} else {
  console.log("The file doesn't exist");
}

// Test2: Writing to the file

