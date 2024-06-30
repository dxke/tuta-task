// imports
const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = 8000;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/check-url") {
    // read the body of the request
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // parse the URL and construct the pathname
    req.on("end", () => {
      const { url: inputUrl } = JSON.parse(body);
      const parsedUrl = new URL(inputUrl);
      const pathname = path.join(__dirname, parsedUrl.pathname);

      // first: error handling
      fs.stat(pathname, (err, stats) => {
        if (err) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "URL does not point to a file or folder",
            })
          );
          return;
        }

        let message;
        // check if URL points to a file or folder
        if (stats.isFile()) {
          message = `File exists: ${pathname}`;
        } else if (stats.isDirectory()) {
          message = `Directory exists: ${pathname}`;
        } else {
          message = "URL does not point to a file or folder that exists.";
        }
        // send response
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message }));
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// listen for requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
