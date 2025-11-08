const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let path = "./step-02-http-server/views/";
  let statusCode = 200;
  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    case "/contact":
      path += "contact.html";
    default:
      path += "errorPage.html";
      statusCode = 404;
      break;
  }
  res.writeHead(statusCode, { "content-type": "text/html" });
  const readStream = fs.createReadStream(path, { encoding: "utf-8" });
  readStream.pipe(res);
  readStream.on("error", (error) => {
    console.error("File read error: ", error);
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.end();
    }
  });
});
server.listen(3000, "localhost", () => {
  console.log("Server running at http://localhost:3000/");
});
