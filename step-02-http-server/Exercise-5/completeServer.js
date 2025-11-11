const http = require("node:http");
const fs = require("node:fs");
const url = require("node:url");

function handleFileRoute(pathname, res) {
  const routes = {
    "/": "index.html",
    "/about": "about.html",
    "/contact": "contact.html",
  };
  const filename = routes[pathname];
  if (!filename) {
    return false;
  }
  const path = `./views/${filename}`;
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

function handleGreetRoute(query, res) {
  const name = query.name || "Guest";
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <h1>Hello, ${name}</h1>
    <p>Welcome to our server</p>
    <p><a href="/">Go to Home</a></p>
    `);
}

function handleSearchRoute(query, res) {
  const searchQuery = query.q || "";
  res.writeHead(200, { "Content-Type": "text/html" });
  if (searchQuery) {
    res.end(`
      <h1>Search Results</h1>
      <p>You searched for: <strong>${searchQuery}</strong></p>
      <p>Here are your results for "${searchQuery}" ...</p>
      <p><a href="/search">New Search</a></p>

      `);
  } else {
    res.end(`
      <h1>Search</h1>
      <p>Please provide a search query</p>
      `);
  }
}

function handleApiProducts(res) {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 999,
      category: "Electronics",
      inStock: true,
    },
    {
      id: 2,
      name: "Phone",
      price: 699,
      category: "Electronics",
      inStock: true,
    },
    {
      id: 3,
      name: "Desk Chair",
      price: 199,
      category: "Furniture",
      inStock: false,
    },
    {
      id: 4,
      name: "Coffee Mug",
      price: 12,
      category: "Kitchen",
      inStock: true,
    },
    {
      id: 5,
      name: "Monitor",
      price: 299,
      category: "Electronics",
      inStock: true,
    },
  ];
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(products, null, 2));
}

function handle404(pathname, res) {
  console.log(`404 - Route not found:${pathname}`);
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(`
    <h1>404 - Page not found</h1>
    <p>The route ${pathname} does not exist</p>
    <p></p>
    `);
}

const server = http.createServer((req, res) => {
  try {
    const parseurl = url.parse(req.url, true);
    const pathname = parseurl.pathname;
    const query = parseurl.query;
    if (pathname === "/api/products") {
      handleApiProducts(res);
    } else if (pathname === "/greet") {
      handleGreetRoute(query, res);
    } else if (pathname === "/search") {
      handleSearchRoute(query, res);
    } else if (handleFileRoute(pathname, res)) {
    } else {
      handle404(pathname, res);
    }
  } catch (error) {
    console.error("Server Error: ", error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/html" });
      req.end(`
        <h1>500 - Internal Server Error</h1>
        <p>Something went wrong on the server.</p>
        <p><a href="/">Go to Home</a></p>
        `);
    }
  }
});

server.listen(3000, "localhost", () => {
  console.log("===========================================");
  console.log("Complete Server running at http://localhost:3000/");
  console.log("===========================================");
});
