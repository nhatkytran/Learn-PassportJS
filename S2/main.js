const http = require("http");

const getData = async () => {
  let j;
  for (let i = 0; i < 6000000000; i++) {
    j++;
  }
  return j;
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home page");
  } else if (req.url === "/slow-page") {
    // Simulate CPU work
    await getData();
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Slow Page");
  }
});

server.listen(8000, () => console.log("Server is running on port 8000"));
