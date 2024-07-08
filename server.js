// imports
const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const { setCORSHeaders, handleError, sleep } = require("./serverModules.js");

const PORT = 8000;

// create a server
const server = http.createServer((req, res) => {
  // add a delay to simulate server response time
  let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  delay(500).then(() => {
    // Code to be executed after the delay

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

        // server response if URL is not within allowed hostnames
        const allowedHostnames = ["localhost", "127.0.0.1"]; // Add your server's IP here if needed
        if (!allowedHostnames.includes(parsedUrl.hostname)) {
          handleError(res, 403);
          return;
        }
        const pathname = path.join(__dirname, parsedUrl.pathname);

        fs.stat(pathname, (err, stats) => {
          // server response if URL does not point to a file or folder
          if (err) {
            handleError(res, 404);
            return;
          }
          // check if URL points to a file or folder
          if (stats.isFile() || stats.isDirectory()) {
            // server response if URL points to a file or folder
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                code: 200,
                type: stats.isFile() ? "file" : "directory",
                path: pathname,
              })
            );
          }
        });
      });
    }
  });
});

// listen for requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
