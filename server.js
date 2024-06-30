// imports
const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = 8000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/check-url") {
    // get the URL from the request body
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // parse the URL and construct a file path
    req.on("end", () => {
      const { url: inputUrl } = JSON.parse(body);
      const parsedUrl = new URL(inputUrl);
      const pathname = path.join(__dirname, parsedUrl.pathname);
    });
  }
});

//make the server listen for requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
