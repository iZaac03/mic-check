const http = require("http");
const db = require("./databis");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/login") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      const { email, password } = JSON.parse(body);

      db.query("SELECT * FROM users WHERE NAME = ? AND password_hash = ?", [email, password], (err, results) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "Server error" }));
        }

        if (results.length > 0) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "✅ Login successful" }));
        } else {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "❌ Invalid email or password" }));
        }
      });
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
