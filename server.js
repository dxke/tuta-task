// imports
const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const { setCORSHeaders, handleError } = require("./serverModules.js");

const PORT = 8000;

// create a server
const server = http.createServer((req, res) => {
  // Set CORS headers
  setCORSHeaders(res);

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // handle POST request to /check-url
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

      setTimeout(() => {
        fs.stat(
          pathname,
          (err, stats) => {
            if (err) {
              handleError(res, 404);
              return;
            }
            // check if URL points to a file or folder
            if (stats.isFile() || stats.isDirectory()) {
              // send response
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  code: 200,
                  type: stats.isFile() ? "file" : "directory",
                  path: pathname,
                })
              );
            }
          },
          500
        );
      });
    });
  }
});

// listen for requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
