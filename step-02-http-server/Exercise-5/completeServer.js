const http = require("http");
const fs = require("fs");
const url = require("url");

function handleFileRoute(pathname, res) {
  const route = {
    "/": "index.html",
    "/about": "about.html",
    "/contact": "contact.html",
  };
  const filename = routes[pathname];
  if (!filename) {
    return false;
  }
  const path = `./step-02-http-server/views/${filename}`;
  res.writeHead(200, { "Content-Type": "text/html" });
  const readStream = fs.createReadStream(path, { encoding: "utf-8" });
  readStream.pipe(res);

  readStream.on("error", (error) => {
    console.error("File read error: ", error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error: Could not read file");
    } else {
      res.end();
    }
  });
  return true;
}
