const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.writeHead(200, { "Content-Type": "text/html" });

  if (pathName === "/greet") {
    const name = query.name || "Guest";
    res.end(`<h1>Hello ${name}</h1><p>Welcome to our server</p>`);
  } else if (pathName === "/search") {
    const searchQuery = query.q || "";
    if (searchQuery) {
      res.end(`
            <h1>Search Results</h1>
            <p>You searched for: <strong>${searchQuery}</strong></p>
            <p>Here are the results...</p>
            `);
    } else {
      req.end(`
            <h1>Search Query</h1>
            <p>Please provide a search query</p>
            `);
    }
  } else {
    res.writeHead(404, { "Content-Type": "text//html" });
    res.end(
      `<h1>404 -Not Found</h1><p>The route "${pathName}" does not exist.</p>`
    );
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server running at http://localhost:3000/");
});
