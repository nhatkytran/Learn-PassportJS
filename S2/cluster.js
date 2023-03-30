const cluster = require("cluster");
const os = require("os");
const http = require("http");

console.log("Number of cores:", os.cpus().length);

if (cluster.isMaster) {
  console.log(`This is Cluster Master < ${process.pid} >`);

  const numWorkers = 2;
  Array.from({ length: numWorkers }).forEach(() => cluster.fork());
} else {
  console.log(`This is Cluster Worker < ${process.pid} >`);

  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Home page");
    } else if (req.url === "/slow-page") {
      for (let i = 0; i < 6000000000; i++) {} // Simulate CPU work
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Slow Page");
    }
  });

  server.listen(8000, () => console.log("Server is running on port 8000"));
}
