const path = require("path");
const fs = require("fs");

const readFile = (fileName, callback) => {
  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, "utf-8", (error, content) => {
    if (error) {
      return callback(error, null);
    } else {
      callback(null, content);
    }
  });
};

const writeFile = (fileName, data, callback) => {
  const filePath = path.join(__dirname, fileName);
  fs.writeFile(filePath, data, { flag: "a" }, (error) => {
    if (error) {
      return callback(error);
    }
    callback(null);
  });
};

const fileExists = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  return fs.existsSync(filePath);
};

module.exports = {
  readFile,
  writeFile,
  fileExists,
};
