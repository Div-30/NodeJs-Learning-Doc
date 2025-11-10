const http = require("http");
const fs = require("fs");
const url = require("url");

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
