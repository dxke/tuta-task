function setCORSHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow requests from any origin (JUST FOR DEVELOPMENT)
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function handleError(res, code) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ code }));
}

module.exports = {
  setCORSHeaders,
  handleError,
};
