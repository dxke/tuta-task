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

      // error handling for invalid URL
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
        //check if file or directory exists or not
        if (stats.isFile()) {
          message = `File exists: ${pathname}`;
        } else if (stats.isDirectory()) {
          message = `Directory exists: ${pathname}`;
        } else {
          message = "URL does not point to a file or folder that exists.";
        }
        // send the response
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message }));
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

//make the server listen for requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
