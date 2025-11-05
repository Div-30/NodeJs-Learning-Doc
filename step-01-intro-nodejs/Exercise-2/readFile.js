const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "data.txt");

fs.readFile(filePath, "utf-8", (error, content) => {
  if (error) {
    return console.error("Error reading the file: ", error);
  }
  console.log("File content: ", content);
});
