const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/api/products") {
    const products = [
      { id: 1, name: "Laptop", price: 999, category: "Electronics" },
      { id: 2, name: "Phone", price: 699, category: "Electronics" },
      { id: 3, name: "Desk Chair", price: 199, category: "Furniture" },
      { id: 4, name: "Coffee Mug", price: 12, category: "Kitchen" },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Not found",
        message: "The requested endpoint does not exist",
      })
    );
  }
});
server.listen(3000, "localhost", () => {
  console.log("Server running at http://localhost:3000/");
});
